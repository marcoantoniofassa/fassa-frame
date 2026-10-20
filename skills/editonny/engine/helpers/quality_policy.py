"""Per-video quality thresholds and explicit, fully contained exceptions."""
from __future__ import annotations

import json
import math
from pathlib import Path

DEFAULTS = dict(target_lufs=-14.0, margin_lufs=1.5, peak_max_db=-1.0, quiet_min_s=0.25)
INTERVAL_KEYS = ('expected_silence', 'expected_black')


def finite_number(value, name: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f'{name} must be a finite number')
    try:
        number = float(value)
    except OverflowError as error:
        raise ValueError(f'{name} must be a finite number') from error
    if not math.isfinite(number):
        raise ValueError(f'{name} must be a finite number')
    return number


def unique_object(pairs: list) -> dict:
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f'Duplicate policy key: {key}')
        result[key] = value
    return result


def load_policy(path: Path | None, duration: float) -> dict:
    duration = finite_number(duration, 'duration')
    if duration <= 0:
        raise ValueError('duration must be positive')
    data = json.loads(path.read_text(encoding='utf-8'), object_pairs_hook=unique_object) if path else {}
    if not isinstance(data, dict) or set(data) - (DEFAULTS.keys() | set(INTERVAL_KEYS)):
        raise ValueError('Policy must be an object containing only documented quality fields')
    policy = {**DEFAULTS, **data}
    for name in DEFAULTS:
        policy[name] = finite_number(policy[name], name)
    target, margin = policy['target_lufs'], policy['margin_lufs']
    if not -70 <= target <= -5:
        raise ValueError('target_lufs must be between -70 and -5 (loudnorm range)')
    if margin < 0 or target - margin < -70 or target + margin > 0:
        raise ValueError('margin_lufs must be nonnegative and keep the acceptance band within -70 to 0')
    if not -9 <= policy['peak_max_db'] <= 0:
        raise ValueError('peak_max_db must be between -9 and 0 (loudnorm range)')
    if policy['quiet_min_s'] <= 0 or ('quiet_min_s' in data and policy['quiet_min_s'] > duration):
        raise ValueError('quiet_min_s must be positive and no greater than the video duration')
    for name in INTERVAL_KEYS:
        intervals = data.get(name, [])
        if not isinstance(intervals, list):
            raise ValueError(f'{name} must be a list')
        for interval in intervals:
            if not isinstance(interval, dict) or set(interval) != {'start', 'end', 'reason'}:
                raise ValueError(f'{name} entries require exactly start, end, and reason')
            start = finite_number(interval['start'], f'{name}.start')
            end = finite_number(interval['end'], f'{name}.end')
            if not 0 <= start < end <= duration:
                raise ValueError(f'{name} intervals must satisfy 0 <= start < end <= duration')
            if not isinstance(interval['reason'], str) or not interval['reason'].strip():
                raise ValueError(f'{name}.reason must be nonempty text')
        policy[name] = intervals
    return policy


def partition_intervals(detected: list, expected: list) -> tuple[list, list]:
    """Authorize only full containment in one interval; no time tolerance or unions."""
    remaining, accepted = [], []
    for start, end in detected:
        match = next((item for item in expected if item['start'] <= start and end <= item['end']), None)
        if match is None:
            remaining.append((start, end))
        else:
            accepted.append(dict(start=start, end=end, reason=match['reason'],
                                 authorized_start=match['start'], authorized_end=match['end']))
    return remaining, accepted
