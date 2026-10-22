"""Exercise the English EDL, render, caption, and verification contracts together."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

HELPERS = Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers'


@unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'FFmpeg is required')
class CutPipelineTests(unittest.TestCase):
    def test_cut_maps_only_selected_words_and_detects_stale_edl(self):
        with tempfile.TemporaryDirectory(prefix='editonny cut pipeline ') as temporary:
            root = Path(temporary)
            edit = root / 'edit'
            (edit / 'transcripts').mkdir(parents=True)
            source = root / 'source.mp4'
            subprocess.run(['ffmpeg', '-v', 'error', '-f', 'lavfi', '-i',
                'testsrc2=s=160x240:r=24:d=3', '-f', 'lavfi', '-i',
                r"aevalsrc=0.2*sin(2*PI*440*t)*(between(t\,0.4\,0.9)+between(t\,1.4\,1.9)+between(t\,2.4\,2.9)):s=48000:d=3",
                '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', str(source)], check=True)
            original_hash = hashlib.sha256(source.read_bytes()).hexdigest()
            (edit / 'transcripts/source.json').write_text(json.dumps({'words': [
                {'text': word, 'start': start, 'end': start + 0.5}
                for word, start in [('Opening', 0.4), ('Excluded', 1.4), ('Closing', 2.4)]]}))
            edl = edit / 'edl.json'
            data = {'sources': {'source': str(source)}, 'output': {'width': 160, 'height': 240, 'fps': 24},
                    'ranges': [{'id': 'first', 'source': 'source', 'start': 0.25, 'end': 1.125},
                               {'id': 'last', 'source': 'source', 'start': 2.25, 'end': 3.0}]}
            edl.write_text(json.dumps(data))
            def run(helper, *arguments):
                result = subprocess.run([sys.executable, str(HELPERS / helper), *map(str, arguments)],
                                        capture_output=True, text=True, timeout=60)
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                return result.stdout
            run('render_cut.py', edl, '--no-jcut')
            timeline = json.loads((edit / 'cut_timeline.json').read_text())
            self.assertEqual([s['id'] for s in timeline['segments']], ['first', 'last'])
            run('captions.py', '--edit-dir', edit)
            captions = json.loads((edit / 'captions.json').read_text())
            self.assertIn('Opening', json.dumps(captions))
            self.assertIn('Closing', json.dumps(captions))
            self.assertNotIn('Excluded', json.dumps(captions))
            state = (edit / 'state.json').read_bytes()
            run('verify_cut.py', edl, edit / 'cut.mp4', '--without-approval')
            report = json.loads((edit / 'verify/cut_report.json').read_text())
            self.assertNotIn('STALE-TIMELINE', [f['code'] for f in report['flags']])
            self.assertEqual((edit / 'state.json').read_bytes(), state)
            data['ranges'][0]['end'] = 1.0
            edl.write_text(json.dumps(data))
            run('verify_cut.py', edl, edit / 'cut.mp4', '--without-approval')
            report = json.loads((edit / 'verify/cut_report.json').read_text())
            self.assertIn('STALE-TIMELINE', [f['code'] for f in report['flags']])
            self.assertEqual(hashlib.sha256(source.read_bytes()).hexdigest(), original_hash)

    def test_same_edl_plans_the_same_joins_in_any_edit_folder(self):
        # J-cut gaps come from the measured noise floor in edit/regions; a folder without that file used to
        # fall back to -35 dB and render the same EDL to a different length.
        with tempfile.TemporaryDirectory(prefix='editonny cut folders ') as temporary:
            root = Path(temporary)
            source = root / 'source.mp4'
            subprocess.run(['ffmpeg', '-v', 'error', '-f', 'lavfi', '-i', 'testsrc2=s=160x240:r=30:d=4',
                '-f', 'lavfi', '-i', 'anoisesrc=a=0.012:c=pink:d=4:r=48000', '-f', 'lavfi', '-i',
                r"aevalsrc=0.3*sin(2*PI*220*t)*(between(t\,0.3\,1.2)+between(t\,1.5\,2.4)+between(t\,2.8\,3.8)):s=48000:d=4",
                '-filter_complex', '[1:a][2:a]amix=inputs=2:normalize=0[a]', '-map', '0:v', '-map', '[a]',
                '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', str(source)], check=True)
            timelines = []
            for name in ('first', 'second'):
                edit = root / name
                edit.mkdir()
                (edit / 'edl.json').write_text(json.dumps({'sources': {'source': str(source)},
                    'output': {'width': 160, 'height': 240, 'fps': 30},
                    'ranges': [{'source': 'source', 'start': 0.2, 'end': 1.35},
                               {'source': 'source', 'start': 1.45, 'end': 2.55},
                               {'source': 'source', 'start': 2.7, 'end': 3.9}]}))
                result = subprocess.run([sys.executable, str(HELPERS / 'render_cut.py'), str(edit / 'edl.json')],
                                        capture_output=True, text=True, timeout=120)
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                regions = json.loads((edit / 'regions/source.json').read_text())
                self.assertEqual(regions['noise_mode'], 'auto')
                timelines.append(json.loads((edit / 'cut_timeline.json').read_text()))
            frames = [[(s['lead_frames'], s['tail_trim_frames'], s['frames']) for s in t['segments']] for t in timelines]
            self.assertEqual(frames[0], frames[1])


if __name__ == '__main__':
    unittest.main()
