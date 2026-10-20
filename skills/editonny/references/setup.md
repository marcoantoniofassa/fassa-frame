# Set up Fassa Frame

The launcher requires Python 3.9+. The engine requires Python >=3.10,<3.14, managed by uv, plus FFmpeg/ffprobe and Node.js 22.13+ or 24+ with npx. The locked environment selects local MLX Whisper on supported Apple Silicon systems and Faster Whisper on other supported platforms. Transcription models may download on first use; processing remains local.

From the complete project checkout:

```sh
python3 install.py --target both
python3 ~/.local/share/fassa-frame/scripts/editonny.py doctor
```

For an already installed plugin, resolve this skill directory and prepare its engine without registering a second copy:

```text
uv sync --locked --directory <EDITONNY>/engine
python3 <EDITONNY>/scripts/editonny.py doctor
```

Use the HyperFrames version pinned in `engine/project-template/package.json`. Its first command may download the package and rendering browser. Do not silently switch to latest. Optional service keys belong in local settings, never archives, prompts, documentation, or logs.

A standard installation stores one copy in `~/.local/share/fassa-frame` and links the chosen agents to it. The installer respects `CLAUDE_CONFIG_DIR` when installing under the real home and does not rewrite general agent settings. Start a new conversation after installation. Windows directory links may require Developer Mode or suitable permissions; validate on the target operating system.

## Included videos

All 79 original videos are bundled under `<VISUALS>`, together with scenes, images, fonts, and audio. Of the 145 scenes, 35 use bundled clips; the others do not reference video clips. No separate media-library download is needed.

```text
python3 <EDITONNY>/scripts/editonny.py media status
python3 <EDITONNY>/scripts/editonny.py media status --json
```

The command checks paths, sizes, and SHA-256 against `visuals/media.json`; missing or corrupt files return status 1. `doctor` does not replace this check. Reinstall the complete package if resources are missing. Do not replace a requested effect with an approximation while claiming identical results.

To recover missing files, `media import /path/to/backup/visuals` accepts a folder containing every manifest path. It validates the inputs before copying, preserves the source, and refuses conflicting destination files. Recovery is optional; a fresh installation already includes the videos.

`scene --project ... --use ...` copies only a scene's required clips. Existing project videos are preserved, and a materialized project reads its own copies during rendering. Keep user-created resources outside the installed package.

If diagnosis fails, report and address the specific missing requirement. Official installation sources: [uv](https://docs.astral.sh/uv/getting-started/installation/), [FFmpeg](https://ffmpeg.org/download.html), [Node.js](https://nodejs.org/en/download).
