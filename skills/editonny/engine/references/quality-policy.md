# Per-video quality policy

Quality targets depend on the material and delivery intent. Supply an optional JSON file to `helpers/quality_gate.py final.mp4 --policy policy.json --json`. A -16 LUFS deliverable, a mourning pause, or an intentional black transition can be legitimate; no genre selects or disables checks automatically.

```json
{
  "target_lufs": -16,
  "margin_lufs": 1.5,
  "peak_max_db": -1,
  "quiet_min_s": 0.25,
  "expected_silence": [{"start": 12, "end": 16, "reason": "Approved mourning pause"}],
  "expected_black": [{"start": 30, "end": 31, "reason": "Intentional chapter transition"}]
}
```

All fields are optional. Omitted fields preserve the original defaults: -14 LUFS, margin 1.5 LUFS, maximum true peak -1 dBTP, minimum detected quiet duration 0.25 seconds, and no explicit exceptions. Existing brief opening-black and project `endHold`/`endCard` exclusions remain in effect. A policy never recuts or modifies video unless `--adjust-volume` is explicitly supplied.

The root must be an object. Unknown or duplicate keys, numeric strings, booleans in numeric fields, NaN and infinity are rejected. Limits:

- `target_lufs`: -70 through -5, the FFmpeg loudnorm integrated target range.
- `margin_lufs`: nonnegative; the target plus/minus margin must stay within -70 through 0 LUFS.
- `peak_max_db`: -9 through 0, the loudnorm true-peak range.
- `quiet_min_s`: positive and, when explicitly supplied, no longer than the video. The default remains 0.25 even for shorter videos.
- Each expected interval has exactly `start`, `end`, and `reason`. Times are finite seconds on the final exported timeline, with `0 <= start < end <= duration`. The reason must be nonempty text. Both expected fields must be arrays.

An exception approves only a detected interval entirely inside one authorized interval. There is **no time tolerance** and adjacent/overlapping authorizations are not merged. A detection crossing any boundary stays a failure; account for measured timing explicitly when recording the authorization. Invalid policy input exits with status 2 before analysis or audio adjustment.

JSON reports include the effective `policy`, raw `detected_black` and `detected_silence` intervals, accepted intervals with their reason and authorization boundaries, and `legacy_exclusions` with reasons. Black detections include brief opening frames before the legacy exclusion; silence detections use the selected `quiet_min_s`. These are detector measurements, not every black pixel or every sub-threshold pause. The measured volume and quiet threshold remain visible. Unexpected intervals and other failed checks still fail the gate.

`--adjust-volume` uses the same target in both loudnorm passes. Its true-peak target is 0.5 dB below the policy limit, clamped to loudnorm's -9 dB minimum. The existing exclusive `<name>_before_volume.mp4` backup and atomic publication remain intact; an existing backup prevents adjustment. The output is measured again, so an unattainable loudness/peak combination or codec overshoot still fails. This option can adjust audio even when other checks fail; it does not repair those failures.

Without an OCR reader, `coverage.complete` and `coverage.text_checked` are false and the text output explicitly reports incomplete coverage. The original nonblocking exit behavior is retained: `passed` means the performed checks passed, not that every check ran. Even with OCR, this is sampled text-placement inspection, with the existing footage exclusions, and **never privacy certification** (`coverage.privacy_certified` is always false). Review the video and contact sheet before delivery.
