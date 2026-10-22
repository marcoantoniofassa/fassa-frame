"""Project sound plans must complete with copied licenses and explicit limits."""
import ast
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

HELPER = Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers/sound_plan.py'
BUILD = HELPER.parents[1] / 'project-template/build.py'


def load_sound_plan():
    spec = importlib.util.spec_from_file_location('sound_plan_processor', HELPER)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class SoundNameTests(unittest.TestCase):
    def test_every_sound_the_composer_suggests_is_a_plan_type(self):
        # build.py writes these names into suggested_sounds.json; sound_plan.py must accept every one.
        def literals(node):
            if isinstance(node, ast.Constant) and isinstance(node.value, str):
                return {node.value}
            if isinstance(node, ast.IfExp):
                return literals(node.body) | literals(node.orelse)
            return set()
        names = set()
        for node in ast.walk(ast.parse(BUILD.read_text(encoding='utf-8'))):
            if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute) and node.func.attr == 'sound' and node.args:
                names |= literals(node.args[0])
        self.assertIn('counting', names)
        module = load_sound_plan()
        unknown = sorted(n for n in names if module.normal_value(n) not in module.TYPE_NAMES)
        self.assertEqual(unknown, [])


@unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'FFmpeg is required')
class SoundPlanTests(unittest.TestCase):
    def test_project_plan_respects_tail_and_copies_woven_license(self):
        with tempfile.TemporaryDirectory(prefix='editonny sound plan ') as temporary:
            root = Path(temporary)
            edit, project = root / 'edit', root / 'project'
            edit.mkdir()
            project.mkdir()
            (edit / 'cut_timeline.json').write_text(json.dumps({'duration': 3}))
            (project / 'project.json').write_text(json.dumps({'edit': '../edit', 'endHold': 0.5,
                'endCard': {'enabled': True, 'seconds': 1},
                'sounds': [{'file': 'personal.wav', 'at': 0.2, 'note': 'Keep this manually chosen cue'}]}))
            (project / 'events.json').write_text(json.dumps([{'t': 1, 'type': 'pop'}]))
            for options in ([], ['--mode', 'speech', '--max', '1']):
                result = subprocess.run([sys.executable, str(HELPER), '--project', str(project), *options],
                                        capture_output=True, text=True, timeout=30)
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                plan = json.loads((project / 'sound_plan.json').read_text())
                self.assertEqual(plan['video_duration'], 4.5)
                self.assertEqual(len(plan['sounds']), 1)
                self.assertTrue(plan['verification']['checked'])
                cfg = json.loads((project / 'project.json').read_text())
                self.assertEqual(len(cfg['sounds']), 2)
                self.assertTrue(any(s.get('note') == 'Keep this manually chosen cue' for s in cfg['sounds']))
                self.assertTrue((project / 'assets/sfx/LICENSE-woven.md').is_file())
                self.assertIn('CC0', (project / 'assets/sfx/LICENSES.txt').read_text())

    def test_library_prefix_resolves_current_category_schema(self):
        module = load_sound_plan()
        with tempfile.TemporaryDirectory(prefix='editonny effects ') as temporary:
            library = Path(temporary)
            (library / 'effect.wav').write_bytes(b'Fixture only; resolution does not decode audio')
            (library / 'effects.json').write_text(json.dumps({'effects': {'pop-001': {
                'file': 'effect.wav', 'category': 'pop', 'name': 'Pop'}}}))
            module.LIBRARY = library
            self.assertEqual(module.resolve_sound('library:pop-001'), library / 'effect.wav')
            self.assertEqual(module.resolve_sound('library:pop'), library / 'effect.wav')


if __name__ == '__main__':
    unittest.main()
