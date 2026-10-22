"""Speaker mattes must match the video they are composited on."""
import contextlib
import importlib.util
import io
from pathlib import Path
import sys
import unittest

HELPERS = Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers'


def load_matte():
    sys.path.insert(0, str(HELPERS))
    spec = importlib.util.spec_from_file_location('matte_processor', HELPERS / 'matte.py')
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module   # dataclasses resolve their module while it executes
    spec.loader.exec_module(module)
    return module


class MatteSizeTests(unittest.TestCase):
    def test_video_size_wins_over_a_timeline_made_for_another_size(self):
        matte = load_matte()
        out = io.StringIO()
        with contextlib.redirect_stdout(out):
            # A vertical plate composed from a landscape cut keeps the landscape timeline.
            size = matte.matte_size({'width': 1280, 'height': 720}, (1080, 1920), 'cut.mp4')
        self.assertEqual(size, (1080, 1920))
        self.assertIn('1280x720', out.getvalue())
        with contextlib.redirect_stdout(io.StringIO()) as quiet:
            self.assertEqual(matte.matte_size(None, (721, 1281), 'cut.mp4'), (720, 1280))
            self.assertEqual(matte.matte_size({'width': 1080, 'height': 1920}, (1080, 1920), 'cut.mp4'), (1080, 1920))
        self.assertEqual(quiet.getvalue(), '')


if __name__ == '__main__':
    unittest.main()
