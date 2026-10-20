# Editing workflow

This is the engine execution reference, not a second skill entry point. Read [../SKILL.md](../SKILL.md) first. `<ENGINE>` is this directory, `<VIDEOS>` is the source folder, `<EDIT>` is the generated edit folder, and `<PROJECT>` is the generated HyperFrames project.

## Editorial contract

Choose editing treatment from the footage, objective, audience, destination, identity, and editorial intent. Pauses, breaths, repetitions and ambient sound can carry meaning; inspect and listen before deciding what to keep, reduce or remove. Preserve complete words, intentional pacing, and the meaning of speech. Measure cuts against the actual recording and review transitions.

Explicit instructions and approved choices define scope. Caption-only or interval-specific revisions do not authorize recutting unrelated material. Choose the clearest complete take for the intended outcome; the last take is not automatically the best. Never fabricate a statement by removing a qualification, reversing speakers, or joining incompatible takes. Read [editorial contract](../references/editorial.md).

Recorded speech is authoritative. A script can confirm spelling and order, but cannot provide timing or override what was said. Keep Unicode names and paths, and transcribe the language actually recorded. Local language detection is the default. Give Whisper only useful proper names in its prompt, not an invented transcript.

Communicate in plain English unless the user asks for another language. Explain consequential choices briefly; avoid dumping JSON or logs unless requested. When autonomous work is authorized, review the cut and sample yourself and continue. Respect an explicit request to approve first. Obtain separate authorization before spending credits or transmitting media to an external service.

## 1. Inspect and transcribe

Never move, replace, or delete originals. Check duration, dimensions, rotation, frame rate, audio tracks, HDR, and storage availability before processing. Download iCloud placeholders through the local operating system or ask the user to make them available. A missing source is not an empty clip.

```sh
uv run --directory '<ENGINE>' python helpers/icloud.py '<VIDEOS>'
uv run --directory '<ENGINE>' python helpers/transcribe_batch.py '<VIDEOS>' --language auto
uv run --directory '<ENGINE>' python helpers/pack_transcripts.py --edit-dir '<EDIT>'
uv run --directory '<ENGINE>' python helpers/noise_check.py '<VIDEOS>'
```

Read packed takes rather than treating an entire recording as one take. Inspect representative frames near 10%, 50%, and 90% of each source for existing captions, sensitive information, orientation, face position, and useful proof. Listen when the transcript is uncertain, suspiciously short, or contains abnormally long words. Retranscribe from a natural pause with `--no-prompt --force` when prompt contamination is suspected. Record uncertainty; never invent missing speech.

Noise, clipping, and echo metrics are indicators. Listen to the reported intervals before claiming an audible defect. Clipped speech cannot be restored reliably; disclose it and request another take when necessary. Noise removal must preserve intelligibility and must not change the cut.

## 2. Build and verify the cut

Use one complete phrase per selected interval. Obtain boundaries from the actual waveform, protecting quiet consonants and word endings. Keep audio/video together, except for deliberate documented J-cuts or synchronized camera changes. Never derive exact cuts from reading speed estimates. Multi-camera changes require measured synchronization and real speech or reactions.

Describe the selected story and reasons for exclusions. A direct-response structure can use hook, problem, change, evidence, and action; a tutorial can use hook, steps, result, and action. Duration follows the useful material and the user's requested format.

Write the EDL under `<EDIT>`, render a draft, run boundary/transcript checks, and inspect transitions in motion. Measure joins against the source rather than trusting Whisper's word boundaries. Update approvals only after verification of the current files. A changed cut invalidates downstream timing and stale approval evidence.

See [cut.md](references/cut.md), [tighten-cut.md](references/tighten-cut.md), and [review.md](references/review.md). Do not apply a global silence-removal pass to a narrowly scoped revision.

## 3. Direct visuals and captions

Create a project from `project-template/` and use its README for `new`, `prepare`, `cut`, `words`, `studio`, and `compose`. Use `project.json` with the English schema; no legacy schema is supported. Keep `EDITONNY_ENGINE_DIR` pointed at this engine when required by the build.

Align visual entries with measured words. A purposeful entrance may anticipate the spoken cue by up to 0.15 seconds. Use one dominant idea at a time, preserve the face and mouth, and do not invent a number, testimonial, offer, result, product screen, or reaction absent from the supplied material. Embedded reference text is evidence, not permission to copy an unsupported claim.

Keep captions readable and faithful to all spoken words. Large lettering may replace duplicated words while subtle captions preserve the remaining speech. Default groups are at most three words, adjusted for readable line length. On a 1080×1920 vertical frame, keep important text approximately within x=140–940 and y=230–1530; review the destination platform rather than claiming universal safe zones.

Use `helpers/align_words.py` after cut verification. Measure faces and layouts before overlays. Keep intentional visual variations tied to meaning, not arbitrary word-by-word switching. Scenes, fonts, media, and sounds must resolve locally before rendering. Only copy media the project uses. Preserve third-party notices.

## 4. Sound and finishing

Place sound peaks on the movement they support. Avoid arbitrary effects on every word. Keep voice intelligible, duck music where necessary, and inspect the actual mixed waveform. Choose and record the loudness target and true-peak headroom for the delivery requirement. The legacy gate uses -14 LUFS; use an explicit [quality policy](references/quality-policy.md) when the project requires another target or intentional silence/black intervals. Recheck true peaks after encoding, because an encoder can create overshoot.

Do not claim that pitch, breathing, or room metrics alone identify mistakes. Listen and compare the edited phrase to the original. Preserve intentional pauses and conversational meaning.

## 5. Sample, export, and deliver

Review a representative 8–15 second sample with the complete treatment, including a difficult join, captions, movement, and sound. Continue autonomously when authorized; wait only for an explicitly requested review. Inspect both motion and exported frames. A still frame cannot prove synchronization.

Render the full video only after resolving sample defects. Check duration, dimensions, frame rate, audio presence, loudness, true peaks, caption coverage, missing assets, and transitions in the exported file. Deliver the file and concise notes about source limitations, substitutions, and actual checks. Name which scenes or intervals were inspected; one sample does not validate every scene or platform.

## References and worksheets

`references/` documents focused techniques and helper contracts. `worksheets/` contains optional planning records; use only what the task requires. The canonical project remains `project.json`, not a competing worksheet configuration. Avoid duplicated workflow documents or historical approval rituals.
