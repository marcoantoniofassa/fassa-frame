"""Shared utilities for the editonny-engine skill helpers.

Every helper imports this module as `from common import ...` (helpers run with
`uv run python helpers/<name>.py`, so the helpers directory is on sys.path).

This file is the contract other helpers rely on: keep signatures stable.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from fractions import Fraction
from pathlib import Path
from typing import Any

SKILL_ROOT = Path(__file__).resolve().parent.parent
HELPERS_DIR = SKILL_ROOT / "helpers"
ASSETS_DIR = SKILL_ROOT / "assets"
FONTS_DIR = ASSETS_DIR / "fonts"
SFX_DIR = ASSETS_DIR / "sfx"
PREVIEW_DIR = SKILL_ROOT / "preview"
STYLE_CATALOG_PATH = HELPERS_DIR / "style_catalog.json"

OUTPUT_FORMATS: dict[str, tuple[int, int]] = {
    "vertical": (1080, 1920),
    "horizontal": (1920, 1080),
    "square": (1080, 1080),
}

# Vertical 9:16 safe zones (pixels on a 1080x1920 canvas), validated on real
# Reels: platform UI covers the top ~210px, the bottom ~370px and a right rail.
SAFE_ZONE_VERTICAL = {
    "top": 210,
    "bottom": 1550,      # nothing important below this line
    "right_rail": 140,   # like/comment/share column on Reels and TikTok
    "caption_center_y": 1400,
    "disclaimer_y": 1548,
}

EDIT_SUBDIRS = ("transcripts", "regions", "clips", "verify", "samples", "assets", "preview_cache", "renders")


# ---------------------------------------------------------------- processes

def run(cmd: list[str], quiet: bool = False, check: bool = True, capture: bool = False) -> subprocess.CompletedProcess:
    """Run a command. quiet hides stdout/stderr unless it fails."""
    if not quiet:
        print("$ " + " ".join(str(c) for c in cmd), file=sys.stderr)
    proc = subprocess.run(
        [str(c) for c in cmd],
        capture_output=quiet or capture,
        text=True,
    )
    if check and proc.returncode != 0:
        tail = (proc.stderr or "")[-2000:] if (quiet or capture) else ""
        raise RuntimeError(f"command failed ({proc.returncode}): {' '.join((str(c) for c in cmd))}\n{tail}")
    return proc



def require_binary(name: str) -> str:
    path = shutil.which(name)
    if not path:
        hint = {
            "ffmpeg": "instale FFmpeg no sistema · macOS: brew install ffmpeg · Windows: winget install Gyan.FFmpeg",
            "ffprobe": 'included with FFmpeg',
            "node": "macOS: brew install node · Windows: winget install OpenJS.NodeJS.LTS",
        }.get(name, "")
        sys.exit(f"'{name}' not found in PATH. {hint}")
    return path


def has_ffmpeg_filter(name: str) -> bool:
    proc = subprocess.run(["ffmpeg", "-hide_banner", "-filters"], capture_output=True, text=True)
    for line in proc.stdout.splitlines():
        parts = line.split()
        if len(parts) >= 2 and parts[1] == name:
            return True
    return False


# ---------------------------------------------------------------- probing

def ffprobe_json(path: Path | str) -> dict:
    proc = run(
        ["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", str(path)],
        quiet=True,
    )
    return json.loads(proc.stdout or "{}")


def _rotation_of(stream: dict) -> int:
    rot = 0
    for sd in stream.get("side_data_list", []) or []:
        if "rotation" in sd:
            try:
                rot = int(round(float(sd["rotation"])))
            except (TypeError, ValueError):
                pass
    tags = stream.get("tags", {}) or {}
    if not rot and "rotate" in tags:
        try:
            rot = -int(tags["rotate"])
        except ValueError:
            pass
    return rot % 360 if rot else 0


def probe_video(path: Path | str) -> dict:
    """Normalized facts about a media file.

    Returns: duration, width, height (coded), display_width, display_height
    (after rotation), rotation (0/90/180/270), fps (float), fps_str ("30000/1001"),
    codec, pix_fmt, bit_depth, color_transfer, color_primaries, color_space,
    is_hdr, has_video, has_audio, audio_tracks, audio_channels, sample_rate.
    """
    info = ffprobe_json(path)
    streams = info.get("streams", [])
    v = next((s for s in streams if s.get("codec_type") == "video" and not s.get("disposition", {}).get("attached_pic")), None)
    audios = [s for s in streams if s.get("codec_type") == "audio"]
    fmt = info.get("format", {})
    duration = float(fmt.get("duration") or (v or {}).get("duration") or 0.0)
    out: dict[str, Any] = {
        "path": str(path),
        "duration": duration,
        "has_video": v is not None,
        "has_audio": bool(audios),
        "audio_tracks": len(audios),
        "audio_channels": int(audios[0].get("channels", 0)) if audios else 0,
        "sample_rate": int(audios[0].get("sample_rate", 0) or 0) if audios else 0,
    }
    if v is not None:
        width, height = int(v.get("width", 0)), int(v.get("height", 0))
        rotation = _rotation_of(v)
        if rotation in (90, 270):
            dw, dh = height, width
        else:
            dw, dh = width, height
        fps_str = v.get("avg_frame_rate") or v.get("r_frame_rate") or "0/1"
        if fps_str in ("0/0", "0/1"):
            fps_str = v.get("r_frame_rate") or "30/1"
        try:
            fps = float(Fraction(fps_str))
        except (ValueError, ZeroDivisionError):
            fps, fps_str = 30.0, "30/1"
        pix_fmt = v.get("pix_fmt", "")
        bit_depth = 10 if ("10" in pix_fmt or "p010" in pix_fmt) else 12 if "12" in pix_fmt else 8
        transfer = v.get("color_transfer", "") or ""
        out.update(
            width=width,
            height=height,
            display_width=dw,
            display_height=dh,
            rotation=rotation,
            fps=fps,
            fps_str=fps_str,
            codec=v.get("codec_name", ""),
            pix_fmt=pix_fmt,
            bit_depth=bit_depth,
            color_transfer=transfer,
            color_primaries=v.get("color_primaries", "") or "",
            color_space=v.get("color_space", "") or "",
            is_hdr=transfer in ("arib-std-b67", "smpte2084"),
        )
    return out


_COMMON_RATES = (23.976, 24.0, 25.0, 29.97, 30.0, 48.0, 50.0, 59.94, 60.0, 120.0)


def nominal_fps(fps: float) -> float:
    """Snap a measured average fps (e.g. 59.9971) to the nearest common rate."""
    return min(_COMMON_RATES, key=lambda r: abs(r - fps)) if fps > 0 else 30.0


def output_fps_for(source_fps: float) -> int:
    """Delivery fps for short-form: 30 when the source is ~30 or faster, else 24/25."""
    n = nominal_fps(source_fps)
    if n >= 29.0:
        return 30
    return 25 if abs(n - 25.0) < 0.5 else 24


def file_signature(path: Path | str) -> str:
    """Cheap change detector for caches: size + mtime_ns."""
    st = os.stat(path)
    return f'{st.st_size}:{st.st_mtime_ns}'


# ---------------------------------------------------------------- paths & json

def edit_dir_for(videos_dir: Path | str) -> Path:
    return Path(videos_dir).resolve() / "edit"


def ensure_edit_dirs(edit_dir: Path | str) -> Path:
    edit = Path(edit_dir)
    edit.mkdir(parents=True, exist_ok=True)
    for sub in EDIT_SUBDIRS:
        (edit / sub).mkdir(exist_ok=True)
    return edit


def load_json(path: Path | str, default: Any = None) -> Any:
    p = Path(path)
    if not p.exists():
        return default
    with p.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def save_json(path: Path | str, obj: Any) -> Path:
    """Atomic write (temp file + replace) so the preview never reads half a file."""
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=".tmp-", suffix=".json", dir=str(p.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(obj, fh, ensure_ascii=False, indent=2)
        os.replace(tmp, p)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)
    return p


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def fmt_time(seconds: float) -> str:
    """12.345 -> '00:12.34' (mm:ss.cc)."""
    if seconds is None:
        return "--:--"
    s = max(0.0, float(seconds))
    m = int(s // 60)
    return f'{m:02d}:{s - 60 * m:05.2f}'


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    h = value.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        raise ValueError(f'invalid color: {value!r}')
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


# ---------------------------------------------------------------- fonts

def font_path(key: str) -> Path:
    """Resolve a bundled font by key using assets/fonts/fonts.json.

    fonts.json maps key -> {"file": "<file in assets/fonts>", "variation": <int|null>}.
    Raises FileNotFoundError with the list of known keys when missing.
    """
    manifest = load_json(FONTS_DIR / "fonts.json", default={}) or {}
    entry = manifest.get(key)
    if not entry:
        raise FileNotFoundError(f"font '{key}' is absent from assets/fonts/fonts.json; available keys: {sorted(manifest)})")
    path = FONTS_DIR / entry["file"]
    if not path.exists():
        raise FileNotFoundError(f"font file '{key}' not found: {path}")
    return path


def load_font(key: str, size: int):
    """PIL ImageFont for a bundled font key, applying the variable-font weight if declared."""
    from PIL import ImageFont

    manifest = load_json(FONTS_DIR / "fonts.json", default={}) or {}
    entry = manifest.get(key) or {}
    font = ImageFont.truetype(str(font_path(key)), size=size)
    variation = entry.get("variation")
    if variation is not None:
        try:
            font.set_variation_by_axes([variation])
        except Exception:
            pass
    return font


# ---------------------------------------------------------------- style catalog

def load_style_catalog() -> dict:
    return load_json(STYLE_CATALOG_PATH, default={}) or {}


if __name__ == "__main__":
    import pprint

    if len(sys.argv) > 1:
        pprint.pprint(probe_video(sys.argv[1]))
    else:
        print("uso: uv run python helpers/common.py <video>")
