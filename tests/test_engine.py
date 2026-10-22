"""Regression checks for the bundled engine and visual resources."""
import contextlib
import io
import json
import os
import re
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock
import warnings

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

    def test_project_config_points_at_hyperframes_hosts(self):
        config = json.loads((ENGINE / 'project-template/hyperframes.json').read_text())
        self.assertEqual(config['$schema'], 'https://hyperframes.heygen.com/schema/hyperframes.json')
        self.assertEqual(config['registry'], 'https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry')

    def test_scene_copies_keep_runtime_built_selectors(self):
        sys.path.insert(0, str(VISUALS))
        import apply
        outside = lambda html: set(re.findall(r'(?<![\w-])id="([^"]+)"', re.sub(r'<script\b.*?</script>', '', html, flags=re.S))) - {'root'}
        for scene in apply.catalog():
            source = (VISUALS / 'scenes' / (scene + '.html')).read_text()
            copies = []
            for new in (scene + '-01', scene + '-02'):
                copies.append(apply.replace_id(source, scene, new))
                with self.subTest(copy=new):
                    self.assertEqual(apply.check_ids(copies[-1], new, '_' + re.sub(r'[^a-z0-9]', '', new)), [])
            self.assertFalse(outside(copies[0]) & outside(copies[1]), scene)
        copy = apply.replace_id((VISUALS / 'scenes/three-steps.html').read_text(), 'three-steps', 'three-steps-01')
        self.assertIn('id="c3_threesteps01-p1"', copy)
        self.assertIn('T.fromTo("#c3_threesteps01-p" + n,', copy)
        # A family renamed at the end of the ID no longer matches "#c3-p" + n.
        broken = '<div id="c3-p1_threesteps01"></div><script>T.fromTo("#c3-p" + n, {}, {});</script>'
        self.assertEqual(apply.check_ids(broken, 'three-steps-01', '_threesteps01'), ['c3-p...'])

    def test_fixed_scene_holds_through_the_final_frame(self):
        sys.path.insert(0, str(VISUALS))
        import apply
        with tempfile.TemporaryDirectory() as tmp:
            project, edit = Path(tmp) / 'project', Path(tmp) / 'edit'
            project.mkdir(); edit.mkdir()
            (project / 'project.json').write_text('{}')
            (edit / 'cut_timeline.json').write_text('{"duration": 8.733}')
            with mock.patch.object(apply, 'copy_assets', return_value=0), contextlib.redirect_stdout(io.StringIO()), warnings.catch_warnings():
                warnings.simplefilter('ignore', ResourceWarning)
                apply.use_scene(str(project), 'three-steps', 3.5, 8.733)
                apply.use_scene(str(project), 'three-steps', 0, 6)
            held, plain = ((project / f'compositions/scenes/three-steps-{n}.html').read_text() for n in ('01', '02'))
        # The exit fades start 0.36 s before the 6 s source end (0.46 s in step-by-step); the hold drops them only while the scene reaches the end.
        self.assertIn('if (typeof C.end === "number" && C.end >= 8.733 - .3) tl.getChildren(false, true, false).forEach(function (t) { if (t.startTime() >= 5.5 && t.vars.opacity === 0) t.kill(); });', held)
        self.assertIn('tl.tweenFromTo(0, 6.0, { duration: 5.233,', held)
        self.assertNotIn('t.kill()', plain)
        self.assertIn('window.__timelines["three-steps-02"] = tl;', plain)


class CaptionPlacementTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        import importlib.util
        spec = importlib.util.spec_from_file_location('template_build', ENGINE / 'project-template/build.py')
        cls.build = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.build)

    def place(self, face, captions=None):
        from types import SimpleNamespace
        M = SimpleNamespace(F=self.build.FORMATS['9:16'], W=1080, H=1920, rectangles=[],
                            P=SimpleNamespace(cfg={'captions': captions or {}}),
                            face_screen=lambda t: face, block=lambda t: {'scene': 'fullscreen'})
        with contextlib.redirect_stderr(io.StringIO()), contextlib.redirect_stdout(io.StringIO()):
            return self.build.top_caption(M, 1.0, 2.0, 80)

    def test_low_face_moves_captions_off_the_face(self):
        # A bust with the chin at 1450 px covers the whole 1100-1400 band; above the head is free.
        face = dict(x0=300, x1=780, y0=880, y1=1450, top=680)
        y = self.place(face)
        self.assertFalse(y < face['y1'] and face['y0'] < y + 80, y)
        self.assertGreaterEqual(y, self.build.FORMATS['9:16']['safeArea'][1])

    def test_project_can_pin_caption_height(self):
        face = dict(x0=300, x1=780, y0=500, y1=900, top=360)
        self.assertEqual(self.place(face, {'y': 1450}), 1450)
        for bad in (True, 'low', -5, 1900):
            with self.subTest(bad=bad), self.assertRaises(self.build.BuildError):
                self.place(face, {'y': bad})


if __name__ == '__main__':
    unittest.main()
