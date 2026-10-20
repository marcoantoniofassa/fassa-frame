"""Quality checks must use the same English timing and OCR contracts as the editor."""
import importlib.util
import json
import shutil
import subprocess
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

HELPERS = Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers'


class QualityGateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        sys.path.insert(0, str(HELPERS))
        spec = importlib.util.spec_from_file_location('quality_gate_processor', HELPERS / 'quality_gate.py')
        cls.module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.module)

    def test_footage_exclusions_resolve_repeated_speech_anchors(self):
        with tempfile.TemporaryDirectory(prefix='editonny quality anchors ') as temporary:
            root = Path(temporary)
            project, edit = root / 'project', root / 'edit'
            project.mkdir()
            (edit / 'transcripts').mkdir(parents=True)
            (edit / 'cut_timeline.json').write_text(json.dumps({'duration': 10}))
            (edit / 'transcripts/cut.json').write_text(json.dumps({'words': [
                {'text': word, 'start': t, 'end': t + 0.2}
                for word, t in [('Hello', 1), ('End', 3), ('Hello', 6), ('End', 8)]]}))
            cfg = {'edit': '../edit', 'blocks': [{'scene': 'evidence', 'start': 'Hello',
                    'startAfter': 5, 'end': 'End', 'endAfter': 7}]}
            self.assertEqual(self.module.footage_intervals(cfg, project, 10), [(6, 8)])

    def test_ocr_uses_current_extractor_and_reports_english_fields(self):
        module = self.module
        line = {'t': 'Sample', 'x': 0.01, 'y': 0.5, 'w': 0.2, 'h': 0.05, 'c': 1}
        with patch.object(module.cd, 'reader_value', return_value=('fixture', None)), \
             patch.object(module, 'probe_video', return_value={'fps': 24, 'duration': 1}), \
             patch.object(module.cd, 'extract_frames', return_value=1) as extract, \
             patch.object(module.cd, 'read_directory', return_value={'f_00001.jpg': [line]}):
            result = module.text_outside(Path('fixture.mp4'), 1080, 1920, 1)
        extract.assert_called_once()
        self.assertEqual(result['reader'], 'fixture')
        self.assertEqual(len(result['findings']), 1)
        self.assertEqual(result['findings'][0]['reason'], 'touching the frame edge')

    def test_volume_adjustment_refuses_an_occupied_backup_without_writing(self):
        with tempfile.TemporaryDirectory(prefix='editonny protected volume ') as temporary:
            root = Path(temporary)
            video = root / 'final.mp4'
            backup = root / 'final_before_volume.mp4'
            prior_temporary = root / 'final_new_volume.mp4'
            video.write_bytes(b'Current original')
            backup.write_bytes(b'Unrelated existing backup')
            prior_temporary.write_bytes(b'Unrelated existing output')
            with patch.object(self.module, 'volume') as measure:
                with self.assertRaises(RuntimeError):
                    self.module.adjust_volume(video)
            measure.assert_not_called()
            self.assertEqual(video.read_bytes(), b'Current original')
            self.assertEqual(backup.read_bytes(), b'Unrelated existing backup')
            self.assertEqual(prior_temporary.read_bytes(), b'Unrelated existing output')

    @unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'FFmpeg is required')
    def test_volume_adjustment_preserves_original_and_unrelated_temporary_file(self):
        with tempfile.TemporaryDirectory(prefix='editonny normalize volume ') as temporary:
            root = Path(temporary)
            video = root / 'final.mp4'
            subprocess.run(['ffmpeg', '-v', 'error', '-f', 'lavfi', '-i',
                'color=c=blue:s=160x240:r=24:d=1', '-f', 'lavfi', '-i',
                'sine=frequency=440:duration=1', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-shortest', str(video)], check=True)
            original = video.read_bytes()
            prior_temporary = root / 'final_new_volume.mp4'
            prior_temporary.write_bytes(b'Unrelated existing output')
            backup = self.module.adjust_volume(video)
            self.assertEqual(backup.read_bytes(), original)
            self.assertEqual(prior_temporary.read_bytes(), b'Unrelated existing output')
            self.assertNotEqual(video.read_bytes(), original)
            self.assertLess(abs(self.module.volume(video)['lufs'] + 14), 1)
            self.assertEqual(sorted(p.name for p in root.iterdir()),
                             ['final.mp4', 'final_before_volume.mp4', 'final_new_volume.mp4'])

    def test_failed_volume_publication_keeps_the_current_original_recoverable(self):
        with tempfile.TemporaryDirectory(prefix='editonny failed volume ') as temporary:
            video = Path(temporary) / 'final.mp4'
            video.write_bytes(b'Current original')
            def encode(command, **_kwargs):
                Path(command[-1]).write_bytes(b'Normalized output')
                return subprocess.CompletedProcess(command, 0, '', '')
            measurement = {'_loudnorm': {key: '0' for key in
                ('input_i', 'input_tp', 'input_lra', 'input_thresh', 'target_offset')}}
            with patch.object(self.module, 'volume', return_value=measurement), \
                 patch.object(self.module.subprocess, 'run', side_effect=encode), \
                 patch.object(self.module.os, 'replace', side_effect=OSError('Publication failed')):
                with self.assertRaises(OSError):
                    self.module.adjust_volume(video)
            self.assertEqual(video.read_bytes(), b'Current original')
            self.assertEqual(video.with_name('final_before_volume.mp4').read_bytes(), b'Current original')
            self.assertEqual(len(list(video.parent.iterdir())), 2)


if __name__ == '__main__':
    unittest.main()
