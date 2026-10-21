"""Optional synthetic narration through Google Gemini TTS (paid per use).

The key comes from GEMINI_API_KEY in the environment or from `.env` in the skill root, and is sent in a
header, never in the URL. Without a key the helper exits 2. Generate only when the request asks for a
synthetic voice; a recorded human voice needs no helper.

One request is one take. Send each continuous passage whole: separate generations of the same voice
change interpretation, and spliced takes sound patched. Style goes as a short inline tag (`--style calm`
becomes "[calm] text"); long instructions or a "Say ...:" prefix are often read aloud. After generating,
run transcribe.py on the file and compare the first words and the end against the script: a leaked tag
or an invented opening means a new take, not a trim.

The WAV (16-bit mono PCM at the rate the service returns) goes to <edit>/assets/ with an entry in
<edit>/assets/credits.json. `--dry-run` prints the request without touching the network.

Usage:
    uv run python helpers/gen_voice.py "<text>" --edit-dir DIR [--voice Charon] [--style calm]
        [-o name.wav] [--model ID] [--dry-run]
    uv run python helpers/gen_voice.py --text-file script.txt --edit-dir DIR ...
"""

from __future__ import annotations

import argparse
import base64
import binascii
import hashlib
import json
import re
import sys
import wave
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import load_json, now_iso, save_json  # noqa: E402
from fetch_images import EnvFileError, read_env_key  # noqa: E402

MODEL = "gemini-3.8-flash-tts"
URL = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


class VoiceError(Exception):
    def __init__(self, message: str, code: int = 1):
        super().__init__(message)
        self.code = code


def build_request(text: str, voice: str, style: str | None) -> dict:
    return {"contents": [{"parts": [{"text": f"[{style.strip()}] {text}" if style and style.strip() else text}]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}


def request_speech(payload: dict, key: str, model: str = MODEL, timeout: float = 300) -> tuple[bytes, int]:
    """Return (16-bit PCM, sample rate). Errors never echo the response body, which may contain the key."""
    try:
        r = requests.post(URL.format(model=model), headers={"x-goog-api-key": key, "Content-Type": "application/json"},
                          data=json.dumps(payload), timeout=timeout)
    except requests.RequestException as e:
        raise VoiceError(f'could not reach the Gemini API ({e.__class__.__name__}). Check the connection.')
    if r.status_code in (401, 403):
        raise VoiceError('The Gemini API rejected GEMINI_API_KEY. Check the configured key and its access to TTS models.', 2)
    if r.status_code == 429:
        raise VoiceError('Gemini API quota or rate limit reached. Try again later or check the plan.')
    if r.status_code >= 400:
        raise VoiceError(f'The Gemini API returned error {r.status_code} for model {model}. Check the model ID and the service.')
    try:
        part = r.json()["candidates"][0]["content"]["parts"][0]["inlineData"]
        pcm = base64.b64decode(part["data"], validate=True)
    except (ValueError, KeyError, IndexError, TypeError, binascii.Error):
        raise VoiceError('Unexpected Gemini API response without audio. Nothing saved; retry.')
    rate = re.search(r'rate=(\d+)', str(part.get("mimeType", "")))
    if not pcm or len(pcm) % 2:
        raise VoiceError('The Gemini API returned incomplete audio. Nothing saved; retry.')
    return pcm, int(rate.group(1)) if rate else 24000


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description='Generate an optional synthetic narration take through Gemini TTS.')
    ap.add_argument('text', nargs='?', help='narration text (or use --text-file)')
    ap.add_argument('--text-file', type=Path, help='UTF-8 file with the narration text')
    ap.add_argument('--edit-dir', required=True, help='session edit folder')
    ap.add_argument('--voice', default='Charon', help='prebuilt voice name (default Charon; Puck is livelier)')
    ap.add_argument('--style', help='short style tag, e.g. "calm" or "upbeat"')
    ap.add_argument('-o', '--output', help='filename in assets/ (default: derived from the text)')
    ap.add_argument('--model', default=MODEL, help=f'TTS model (default {MODEL})')
    ap.add_argument('--dry-run', action='store_true', help='show the request without generating')
    args = ap.parse_args(argv)
    try:
        if (args.text is None) == (args.text_file is None):
            raise VoiceError('give the text or --text-file, not both', 2)
        text = (args.text_file.read_text(encoding='utf-8') if args.text_file else args.text).strip()
        if not text:
            raise VoiceError('the text is empty', 2)
        edit = Path(args.edit_dir).resolve()
        if not edit.is_dir():
            raise VoiceError(f'edit folder not found: {edit}', 2)
        try:
            key = read_env_key("GEMINI_API_KEY")
        except EnvFileError as e:
            raise VoiceError(str(e), 2)
        payload = build_request(text, args.voice, args.style)
        name = Path(args.output or f'voice-{hashlib.sha1((text + args.voice + (args.style or "")).encode()).hexdigest()[:8]}.wav').name
        name += '' if name.lower().endswith('.wav') else '.wav'
        out = edit / "assets" / name
        if args.dry_run:
            print(json.dumps({"url": URL.format(model=args.model), "payload": payload, "file": str(out),
                              "key": "configured" if key else "missing"}, ensure_ascii=False, indent=2))
            return 0
        if not key:
            raise VoiceError('GEMINI_API_KEY is not configured. Narration is optional; configure the key in the environment or the skill .env file after authorization.', 2)
        if out.exists():
            raise VoiceError(f'{out.name} already exists; choose another -o so an approved take is never replaced', 2)
        print(f'generating with {args.model} ({args.voice})...')
        pcm, rate = request_speech(payload, key, args.model)
        out.parent.mkdir(parents=True, exist_ok=True)
        tmp = out.with_name('.tmp-' + out.name)
        with wave.open(str(tmp), 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm)
        tmp.replace(out)
        credits_path = edit / "assets" / "credits.json"
        credits = load_json(credits_path, default=[])
        credits = credits if isinstance(credits, list) else []
        credits.append({"file": f'assets/{name}', "source": "gemini-tts", "model": args.model, "voice": args.voice,
                        "style": args.style, "text": text, "author": f'synthetic voice ({args.model}, {args.voice})',
                        "license": "AI-generated", "added_at": now_iso()})
        save_json(credits_path, credits)
        print(f'ok: assets/{name}  {len(pcm) / 2 / rate:.2f} s  {rate} Hz. Transcribe it before using the take.')
        return 0
    except VoiceError as e:
        print(f'error: {e}', file=sys.stderr)
        return e.code


if __name__ == "__main__":
    sys.exit(main())
