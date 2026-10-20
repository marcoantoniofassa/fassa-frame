"""Explicit quality exceptions must stay narrow, validated, and visible."""
import importlib
import contextlib
import io
from unittest.mock import patch
import json
import shutil
import subprocess
from pathlib import Path
import sys
import tempfile
import unittest

HELPERS = Path(__file__).resolve().parents[2] / 'skills/editonny/engine/helpers'
sys.path.insert(0, str(HELPERS))


class QualityPolicyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.policy = importlib.import_module('quality_policy')

    def load(self, data, duration=10):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / 'policy.json'
            path.write_text(json.dumps(data), encoding='utf-8')
            return self.policy.load_policy(path, duration)

    def test_defaults_preserve_existing_thresholds(self):
        policy = self.policy.load_policy(None, 10)
        self.assertEqual(policy, dict(target_lufs=-14.0, margin_lufs=1.5,
            peak_max_db=-1.0, quiet_min_s=0.25, expected_silence=[], expected_black=[]))

    def test_custom_target_and_intentional_mourning_pause(self):
        data = dict(target_lufs=-16, expected_silence=[dict(start=1, end=4, reason='Mourning pause')])
        policy = self.load(data)
        self.assertEqual(policy['target_lufs'], -16)
        self.assertEqual(policy['expected_silence'], data['expected_silence'])

    def test_strict_schema_rejects_invalid_values(self):
        invalid = [[], None, {'unknown': 1}, {'target_lufs': True}, {'target_lufs': '-16'},
            {'target_lufs': 10 ** 1000}, {'target_lufs': float('nan')}, {'peak_max_db': float('inf')},
            {'target_lufs': -71}, {'target_lufs': -4}, {'peak_max_db': -10},
            {'peak_max_db': 1}, {'margin_lufs': -1}, {'margin_lufs': 100},
            {'quiet_min_s': 0}, {'quiet_min_s': 11}, {'expected_black': {}},
            {'expected_black': [None]}]
        for data in invalid:
            with self.subTest(data=data), self.assertRaises(ValueError):
                self.load(data)
        for interval in [dict(start=0, end=11, reason='Too long'),
                dict(start=-1, end=2, reason='Negative'), dict(start=2, end=2, reason='Empty'),
                dict(start=3, end=2, reason='Reversed'), dict(start=0, end=2, reason='  '),
                dict(start=0, end=2, reason=1), dict(start=0, end=2),
                dict(start=False, end=2, reason='Boolean'),
                dict(start=0, end=2, reason='Extra', extra=1)]:
            with self.subTest(interval=interval), self.assertRaises(ValueError):
                self.load({'expected_silence': [interval]})

    def test_only_full_containment_authorizes_a_detection(self):
        allowed = [dict(start=1, end=2, reason='Transition'), dict(start=2, end=3, reason='Card')]
        detected = [(1, 2), (1.2, 1.8), (0.99, 1.5), (1.5, 2.01), (1, 3)]
        remaining, accepted = self.policy.partition_intervals(detected, allowed)
        self.assertEqual(remaining, detected[2:])
        self.assertEqual([item['reason'] for item in accepted], ['Transition', 'Transition'])
        self.assertEqual((accepted[0]['start'], accepted[0]['end']), (1, 2))

    def test_duplicate_keys_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / 'policy.json'
            path.write_text('{"target_lufs": -14, "target_lufs": -16}')
            with self.assertRaises(ValueError):
                self.policy.load_policy(path, 10)

    def test_nonfinite_duration_rejected(self):
        for duration in [float('inf'), float('nan'), 0, -1]:
            with self.subTest(duration=duration), self.assertRaises(ValueError):
                self.policy.load_policy(None, duration)


class QualityPolicyGateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.gate = importlib.import_module('quality_gate')

    def run_gate(self, policy=None, silence=None, black=None, lufs=-16):
        gate = self.gate
        with tempfile.TemporaryDirectory() as temporary, contextlib.ExitStack() as stack:
            video = Path(temporary) / 'video.mp4'
            video.touch()
            args = [str(video), '--json']
            if policy is not None:
                path = Path(temporary) / 'policy.json'
                path.write_text(json.dumps(policy))
                args += ['--policy', str(path)]
            for name, value in [('require_binary', None), ('probe_video', dict(width=160, height=240, duration=10)),
                    ('black_intervals', black or []), ('volume', dict(lufs=lufs, peak_db=-2)),
                    ('text_outside', dict(reader=None, findings=[], safe_zone=None)), ('sheet_value', None)]:
                stack.enter_context(patch.object(gate, name, return_value=value))
            stack.enter_context(patch.object(gate.waveform, 'envelope', return_value=[]))
            stack.enter_context(patch.object(gate.waveform, 'threshold', return_value=-36))
            find = stack.enter_context(patch.object(gate.breaths, 'find', return_value=silence or []))
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                result = gate.main(args)
            return result, json.loads(output.getvalue()), find.call_args.args[-1]

    def test_invalid_policy_exits_before_detection_or_adjustment(self):
        with tempfile.TemporaryDirectory() as temporary:
            video, policy = Path(temporary) / 'video.mp4', Path(temporary) / 'policy.json'
            video.touch()
            policy.write_text('{"target_lufs": -100}')
            with patch.object(self.gate, 'require_binary'), patch.object(self.gate, 'probe_video',
                    return_value=dict(width=160, height=240, duration=10)), \
                    patch.object(self.gate, 'black_intervals') as detect, \
                    patch.object(self.gate, 'adjust_volume') as adjust, contextlib.redirect_stderr(io.StringIO()):
                result = self.gate.main([str(video), '--policy', str(policy), '--adjust-volume'])
            self.assertEqual(result, 2)
            detect.assert_not_called()
            adjust.assert_not_called()

    def test_policy_pass_preserves_measurements_reasons_and_missing_ocr_coverage(self):
        policy = dict(target_lufs=-16, quiet_min_s=0.5,
            expected_silence=[dict(start=1, end=4, reason='Mourning pause')],
            expected_black=[dict(start=5, end=6, reason='Intentional transition')])
        code, report, minimum = self.run_gate(policy, [(1, 4)], [(5, 6)])
        self.assertEqual(code, 0)
        self.assertEqual(minimum, 0.5)
        self.assertEqual(report['detected_silence'], [[1, 4]])
        self.assertEqual(report['detected_black'], [[5, 6]])
        self.assertEqual(report['accepted_silence'][0]['reason'], 'Mourning pause')
        self.assertEqual(report['accepted_black'][0]['reason'], 'Intentional transition')
        self.assertFalse(report['coverage']['complete'])
        self.assertFalse(report['coverage']['privacy_certified'])

    def test_no_policy_preserves_old_target_and_unexpected_silence_fails(self):
        code, report, minimum = self.run_gate()
        self.assertEqual(code, 1)
        self.assertEqual(minimum, 0.25)
        self.assertTrue(any('volume' in item for item in report['failures']))
        code, report, _ = self.run_gate(dict(target_lufs=-16,
            expected_silence=[dict(start=1, end=4, reason='Pause')]), [(0.9, 4)])
        self.assertEqual(code, 1)
        self.assertTrue(any('quiet interval' in item for item in report['failures']))

    @unittest.skipUnless(shutil.which('ffmpeg') and shutil.which('ffprobe'), 'FFmpeg is required')
    def test_real_normalization_reaches_custom_target_and_preserves_original(self):
        with tempfile.TemporaryDirectory() as temporary:
            video = Path(temporary) / 'video.mp4'
            subprocess.run(['ffmpeg', '-v', 'error', '-f', 'lavfi', '-i',
                'color=c=blue:s=160x240:r=24:d=3', '-f', 'lavfi', '-i',
                'sine=frequency=440:duration=3', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-shortest', str(video)], check=True)
            original = video.read_bytes()
            backup = self.gate.adjust_volume(video, target_lufs=-16, peak_max_db=-3)
            self.assertEqual(backup.read_bytes(), original)
            measured = self.gate.volume(video)
            self.assertLess(abs(measured['lufs'] + 16), 0.5)
            self.assertLessEqual(measured['peak_db'], -3)

    def test_normalization_uses_same_custom_target_in_both_passes(self):
        gate = self.gate
        import subprocess
        with tempfile.TemporaryDirectory() as temporary:
            video = Path(temporary) / 'video.mp4'
            video.write_bytes(b'original')
            calls = []
            def run(command, **kwargs):
                calls.append(command)
                if '-c:a' in command:
                    Path(command[-1]).write_bytes(b'adjusted')
                    return subprocess.CompletedProcess(command, 0, '', '')
                data = {key: '-1' for key in ('input_i', 'input_tp', 'input_lra', 'input_thresh', 'target_offset')}
                return subprocess.CompletedProcess(command, 0, '', json.dumps(data))
            with patch.object(gate.subprocess, 'run', side_effect=run):
                backup = gate.adjust_volume(video, target_lufs=-16, peak_max_db=-3)
            self.assertEqual(backup.read_bytes(), b'original')
            for command in calls:
                audio_filter = command[command.index('-af') + 1]
                self.assertIn('I=-16', audio_filter)
                self.assertIn('TP=-3.5', audio_filter)


if __name__ == '__main__':
    unittest.main()
