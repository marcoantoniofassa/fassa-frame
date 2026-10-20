"""Regression checks for the bundled engine and visual resources."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
ENGINE = ROOT / 'skills/editonny/engine'
VISUALS = ROOT / 'skills/editonny/visuals'


class EngineTests(unittest.TestCase):
    def test_missing_media_does_not_modify_project(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            project = root / 'project'
            project.mkdir()
            config = project / 'project.json'
            config.write_text('{}')
            bundle = root / 'incomplete bundle'
            bundle.mkdir()
            for name in ('apply.py', 'resources.py', 'media.py', 'media.json', 'catalog.json', 'numbers.json'):
                (bundle / name).write_bytes((VISUALS / name).read_bytes())
            (bundle / 'scenes').mkdir()
            scene = 'object-card.html'
            (bundle / 'scenes' / scene).write_bytes((VISUALS / 'scenes' / scene).read_bytes())
            result = subprocess.run([sys.executable, str(bundle / 'apply.py'),
                '--project', str(project), '--use', 'object-card', '--start', '0'],
                env=dict(os.environ, EDITONNY_MEDIA_DIR=str(root / 'absent')), capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('media import', result.stderr)
            self.assertNotIn('Traceback', result.stderr)
            self.assertEqual(config.read_text(), '{}')
            self.assertEqual(list(project.iterdir()), [config])

    def test_scene_without_arguments_does_not_create_an_installation(self):
        with tempfile.TemporaryDirectory(prefix='editonny motion entry ') as tmp:
            home = Path(tmp)
            bundle = home / 'bundle'
            bundle.mkdir()
            for name in ('apply.py', 'resources.py', 'media.py', 'numbers.json'):
                (bundle / name).write_bytes((VISUALS / name).read_bytes())
            result = subprocess.run([sys.executable, str(bundle / 'apply.py')],
                                    env=dict(os.environ, HOME=str(home)),
                                    capture_output=True, text=True)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn('--project', result.stderr)
            self.assertFalse((home / '.local/share/editonny').exists())

    def test_scene_copy_names_preserve_edits_and_gaps(self):
        for option, name, prefix, suffix in (
                ('--transition', 'glow', 'transition', 'glow'),
                ('--pointer', 'down-arrow', 'pointer', 'down-arrow')):
            with self.subTest(option=option), tempfile.TemporaryDirectory() as tmp:
                project = Path(tmp)
                scenes = project / 'compositions/scenes'
                scenes.mkdir(parents=True)
                (project / 'project.json').write_text('{}')
                # A gap must not make the next copy collide with a later edit.
                for number in (1, 3):
                    (scenes / f'{prefix}-{number:02d}-{suffix}.html').write_text('PERSONAL EDIT')
                extra = ['--cuts', '1,2'] if option == '--transition' else ['--count', '2']
                result = subprocess.run(
                    [sys.executable, str(VISUALS / 'apply.py'), '--project',
                     str(project), option, name, *extra], capture_output=True, text=True)
                self.assertEqual(result.returncode, 0, result.stderr)
                for number in (1, 3):
                    self.assertEqual((scenes / f'{prefix}-{number:02d}-{suffix}.html').read_text(),
                                     'PERSONAL EDIT')
                self.assertEqual(len(list(scenes.glob('*.html'))), 4)

    def test_catalog_scenes_are_bundled(self):
        scenes = json.loads((VISUALS / 'catalog.json').read_text())['scenes']
        self.assertGreater(len(scenes), 100)
        self.assertEqual(len({c['id'] for c in scenes}), len(scenes))
        for scene in scenes:
            with self.subTest(scene=scene['id']):
                self.assertTrue((VISUALS / 'scenes' / (scene['id'] + '.html')).is_file())

    def test_scene_uses_its_bundle_in_an_isolated_home(self):
        with tempfile.TemporaryDirectory(prefix='editonny engine ') as tmp:
            home = Path(tmp)
            project = home / 'project with spaces'
            result = subprocess.run(
                [sys.executable, str(ENGINE / 'project-template/build.py'),
                 'new', str(project)], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            cfg = json.loads((project / 'project.json').read_text())
            self.assertEqual(Path(cfg['skill']), ENGINE)
            result = subprocess.run(
                [sys.executable, str(VISUALS / 'apply.py'), '--project',
                 str(project), '--transition', 'glow', '--cuts', '1'],
                env=dict(os.environ, HOME=str(home)), capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue((project / 'compositions/scenes/transition-01-glow.html').is_file())
            result = subprocess.run(
                [sys.executable, str(VISUALS / 'apply.py'), '--project',
                 str(project), '--use', 'transition-glow', '--cut', '1'],
                env=dict(os.environ, HOME=str(home)), capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            cfg = json.loads((project / 'project.json').read_text())
            self.assertEqual(len(cfg['scenes']), 1)


if __name__ == '__main__':
    unittest.main()
