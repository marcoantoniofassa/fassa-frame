"""Optional synthetic narration through Google Gemini TTS (paid per use).

The key comes from GEMINI_API_KEY in the environment or from `.env` in the skill root, and is sent in a
header, never in the URL. Without a key the helper exits 2. Generate only when the request asks for a
synthetic voice; a recorded human voice needs no helper.

One request is one take. Send each continuous passage whole: separate generations of the same voice
change interpretation, and spliced takes sound patched. Sustained delivery goes in `--style`, sent as
speech metadata and not as text: directions written into the text ("Say calmly: ...") can be read aloud.
Point events such as <breath> or <short pause> may stay inline. After generating, run transcribe.py on
the file and compare the first words and the end against the script; an invented or cut passage means a
new take, not a trim.

The take goes to <edit>/assets/ as a 16-bit mono WAV, with an entry in <edit>/assets/credits.json. The
name is reserved before the paid request, so an existing take is never replaced. `--dry-run` prints the
request without touching the network.

Usage:
    uv run python helpers/gen_voice.py "<text>" --edit-dir DIR [--voice Charon] [--style "calm, warm"]
        [-o name.wav] [--model ID] [--dry-run]
    uv run python helpers/gen_voice.py --text-file script.txt --edit-dir DIR ...
"""

from __future__ import annotations

import argparse
import base64
import binascii
import hashlib
import io
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
    part = {"text": text}
    if style and style.strip():
        part["speech_metadata"] = {"style": style.strip()}
    return {"contents": [{"parts": [part]}],
            "generationConfig": {"responseModalities": ["AUDIO"],
                                 "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}


def request_speech(payload: dict, key: str, model: str = MODEL, timeout: float = 300) -> tuple[bytes, int]:
    """Return (16-bit mono PCM, sample rate). Errors never echo the response body, which may contain the key."""
    try:
        r = requests.post(URL.format(model=model), headers={"x-goog-api-key": key, "Content-Type": "application/json"},
                          data=json.dumps(payload), timeout=timeout, allow_redirects=False)
    except requests.RequestException as e:
        raise VoiceError(f'could not reach the Gemini API ({e.__class__.__name__}). Check the connection.')
    if r.status_code in (401, 403):
        raise VoiceError('The Gemini API rejected GEMINI_API_KEY. Check the configured key and its access to TTS models.', 2)
    if r.status_code == 429:
        raise VoiceError('Gemini API quota or rate limit reached. Try again later or check the plan.')
    if r.status_code >= 300:  # a redirect would carry the key header to another host
        raise VoiceError(f'The Gemini API returned status {r.status_code} for model {model}. Check the model ID and the service.')
    try:
        candidate = r.json()["candidates"][0]
        part = candidate["content"]["parts"][0]["inlineData"]
        audio = base64.b64decode(part["data"], validate=True)
    except (ValueError, KeyError, IndexError, TypeError, binascii.Error):
        raise VoiceError('Unexpected Gemini API response without audio. Nothing saved; retry.')
    if candidate.get("finishReason") == "MAX_TOKENS":
        raise VoiceError('The take hit the output limit and was cut. Nothing saved; split the passage at a natural pause.')
    if audio[:4] == b'RIFF':  # Gemini 3.8 TTS answers WAV by default; earlier TTS models answer raw L16
        try:
            with wave.open(io.BytesIO(audio)) as w:
                if (w.getnchannels(), w.getsampwidth()) != (1, 2):
                    raise VoiceError('The Gemini API returned a WAV that is not 16-bit mono. Nothing saved.')
                return w.readframes(w.getnframes()), w.getframerate()
        except (wave.Error, EOFError):
            raise VoiceError('The Gemini API returned an unreadable WAV. Nothing saved; retry.')
    rate = re.search(r'rate=(\d+)', str(part.get("mimeType", "")))
    if not audio or len(audio) % 2:
        raise VoiceError('The Gemini API returned incomplete audio. Nothing saved; retry.')
    return audio, int(rate.group(1)) if rate else 24000


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description='Generate an optional synthetic narration take through Gemini TTS.')
    ap.add_argument('text', nargs='?', help='narration text (or use --text-file)')
    ap.add_argument('--text-file', type=Path, help='UTF-8 file with the narration text')
    ap.add_argument('--edit-dir', required=True, help='session edit folder')
    ap.add_argument('--voice', default='Charon', help='prebuilt voice name (default Charon; Puck is livelier)')
    ap.add_argument('--style', help='sustained delivery, e.g. "calm, warm Brazilian narrator"')
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
        credits_path = edit / "assets" / "credits.json"
        try:
            credits = load_json(credits_path, default=[])
        except ValueError:
            credits = None
        if not isinstance(credits, list):
            raise VoiceError(f'{credits_path} is not a JSON list; fix it before a paid take so no credit is lost', 2)
        out.parent.mkdir(parents=True, exist_ok=True)
        try:
            reserved = out.open('xb')  # reserve the name before paying, so a parallel run cannot replace this take
        except FileExistsError:
            raise VoiceError(f'{out.name} already exists; choose another -o so an approved take is never replaced', 2)
        try:
            print(f'generating with {args.model} ({args.voice})...')
            pcm, rate = request_speech(payload, key, args.model)
            with reserved, wave.open(reserved, 'wb') as w:
                w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm)
        except BaseException as e:
            reserved.close(); out.unlink(missing_ok=True)
            if isinstance(e, OSError):
                raise VoiceError(f'could not write {out.name}: {e.strerror or e}')
            raise
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
