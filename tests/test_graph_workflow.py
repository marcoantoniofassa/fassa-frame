import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import graph_runtime as graph


class GraphWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='editonny graph ')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.source = self.root / 'guide.md'
        self.source.write_text('A guide about editing videos.')
        self.files = {str(self.source): graph.digest(self.source)}
        self.fragment = {
            'provenance': {'provider': 'native-codex', 'auth': 'chatgpt', 'model': 'gpt-6-astra'},
            'nodes': [{'id': 'guide_editor', 'label': 'Editor', 'file_type': 'concept',
                       'source_file': str(self.source)}],
            'edges': [], 'hyperedges': [],
        }

    def test_native_result_requires_complete_current_sources_and_model(self):
        graph.validate_fragment(self.fragment, self.files, self.root)
        for field, value in [('provider', 'claude'), ('auth', 'api-key'), ('model', 'cheap-model')]:
            altered = json.loads(json.dumps(self.fragment))
            altered['provenance'][field] = value
            with self.subTest(field=field), self.assertRaises(ValueError):
                graph.validate_fragment(altered, self.files, self.root)
        with self.assertRaises(ValueError):
            graph.validate_fragment({**self.fragment, 'nodes': []}, self.files, self.root)
        self.source.write_text('Changed during extraction')
        with self.assertRaises(ValueError):
            graph.validate_fragment(self.fragment, self.files, self.root)

    def test_rejects_dangling_edges_invalid_confidence_and_external_sources(self):
        edge = {'source': 'guide_editor', 'target': 'missing', 'relation': 'references',
                'source_file': str(self.source), 'confidence': 'EXTRACTED', 'confidence_score': 1.0}
        with self.assertRaises(ValueError):
            graph.validate_fragment({**self.fragment, 'edges': [edge]}, self.files, self.root)
        edge.update(target='guide_editor', confidence_score=0.5)
        with self.assertRaises(ValueError):
            graph.validate_fragment({**self.fragment, 'edges': [edge]}, self.files, self.root)
        self.fragment['nodes'][0]['source_file'] = '/tmp/private.env'
        with self.assertRaises(ValueError):
            graph.validate_fragment(self.fragment, self.files, self.root)

    def test_refuses_symlink_source_and_secret(self):
        link = self.root / 'link.md'
        link.symlink_to(self.source)
        with self.assertRaises(ValueError):
            graph.source_path(str(link), self.root)
        for name in ['.env', 'credentials.json', 'nested/.env.local']:
            with self.subTest(name=name), self.assertRaises(ValueError):
                graph.source_path(name, self.root)

    def test_promotion_restores_previous_graph_if_rename_fails(self):
        output = self.root / 'graphify-out'
        stage = self.root / '.work/graphify'
        output.mkdir(); stage.mkdir(parents=True)
        (output / 'graph.json').write_text('old valid graph')
        before = graph.digest(output / 'graph.json')
        (stage / 'graph.json').write_text('new graph')
        original = Path.replace

        def fail_stage(path, target):
            if path == stage:
                raise OSError('simulated promotion failure')
            return original(path, target)

        with patch.object(Path, 'replace', fail_stage), self.assertRaises(OSError):
            graph.promote(stage, output)
        self.assertEqual(before, graph.digest(output / 'graph.json'))

    def test_subprocess_boundary_keeps_paths_as_arguments(self):
        with patch('graph_runtime.subprocess.run') as run:
            run.return_value.returncode = 0
            graph.run_native(['python with spaces', str(self.source)], self.root, {})
        args, kwargs = run.call_args
        self.assertEqual(args[0], ['python with spaces', str(self.source)])
        self.assertFalse(kwargs.get('shell', False))

    def test_unmodified_snapshot_has_no_pending_files(self):
        self.assertTrue(graph.unchanged(self.files, self.files))
        self.assertFalse(graph.unchanged(self.files, {}))
        self.assertFalse(graph.unchanged(self.files, {**self.files, 'new.md': 'hash'}))

    def test_tool_environment_cannot_select_external_llm(self):
        original = {'PATH': '/bin', 'GRAPHIFY_BACKEND': 'claude', 'OPENAI_API_KEY': 'synthetic'}
        safe = graph.subscription_env(self.root, original)
        self.assertEqual(safe, {'PATH': '/bin', 'GRAPHIFY_NO_AUTO_REFRESH': '1'})
        self.assertEqual(original['GRAPHIFY_BACKEND'], 'claude')


if __name__ == '__main__':
    unittest.main()
