# editonny project template

Create a project from this template with `python3 build.py new DIRECTORY --edit EDIT --style paper`. The destination must be empty. `project.json` records the engine directory and references the prepared edit directory. Original recordings remain outside the project.

The edit directory supplies `cut.mp4`, `cut_timeline.json`, and `transcripts/cut.json`. Optional `face_layout.json`, `face_track.json`, and `waveform_words.json` improve framing and spoken-word timing. Speech stays in its original language.

## Build and review

- `python3 build.py prepare` downloads the pinned GSAP runtime for local rendering.
- `python3 build.py words [START] [END]` lists spoken words and their times.
- `python3 build.py cut` builds the cut with captions for review.
- `python3 build.py sample START END` builds a representative interval.
- `python3 build.py compose` builds the complete composition.
- `python3 build.py studio [--port PORT] [--no-open]` starts the local Studio. `--stop` stops only this project's instance.
- `python3 build.py hf lint` and `python3 build.py hf check` verify the generated composition.
- `python3 build.py hf render --quality draft --output renders/sample.mp4` renders a review copy.

Use the pinned HyperFrames version in `package.json`; do not upgrade it while editing. Python 3.10–3.13, FFmpeg, and Node.js 22.13+ or 24+ are required. The original template's `update DIRECTORY` command backs up replaced template files while preserving project configuration, media, custom scenes, sounds, and renders.

## Project contract

Top-level fields include `title`, `skill`, `edit`, `format`, `style`, `corrections`, `blocks`, `captions`, `animations`, `scenes`, `sounds`, `endHold`, and `endCard`. Styles are `paper`, `night`, and `amber`; formats are `9:16`, `16:9`, `4:5`, and `1:1`. Caption styles are `standard` and `subtle`. Captions avoid the face inside the format's band; when a low face fills that band they move under the chin or above the head. `captions.y` pins the caption top in pixels for every block except `frame`.

Blocks use `scene`, `start`, and optional `end`. Scene modes are `fullscreen`, `evidence`, `frame`, `greenScreen`, `contain`, and `compare`. Times may be seconds or spoken-word anchors; `after` disambiguates repeated words. `captions.enabled` controls captions globally; a block's `captions: false` disables them locally. `corrections` applies only explicitly requested transcript corrections.

Animations use `type`, `id`, `at`, and `exit`. Supported types are `label`, `stamp`, `checklist`, `steps`, `counter`, `notification`, `polaroid`, `inHand`, `hud`, `behindPerson`, and `lettering`. Custom scenes use `file`, `start`, `end`, optional `name`, `track`, `hidesCaptions`, and `overPerson`.

Use `tools/person_cutout.py` for `assets/person.webm` and `assets/person.json`, `tools/track_hands.py` for `assets/hands.json`, and `tools/measure_fonts.py` to refresh `assets/fonts/widths.json`. Consult their help before running. Keep licensed font and Three.js files with their notices.

Generated `index.html` and composition layers are overwritten on rebuild. Store lasting changes in `project.json` or custom scene source. Unexpected edits to generated layers are backed up in `.studio-edits`. Blurred copies do not remove readable originals: remove originals from any shared project copy when necessary.
