"""Project sound plans must complete with copied licenses and explicit limits."""
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

HELPER = Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers/sound_plan.py'


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
        spec = importlib.util.spec_from_file_location('sound_plan_processor', HELPER)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
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
