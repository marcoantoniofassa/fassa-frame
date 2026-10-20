# README artwork

Original geometric motion artwork created for Fassa Frame. No upstream animation, client footage, generated voice or stock media is used. This is an editorial illustration, not a product UI recording.

The 12-second GIF uses the existing DESIGN.md palette and bundled Figtree font (SIL Open Font License). The PNG offers a static alternative.

Regenerate from the repository root after setting up the engine dependencies:

```sh
skills/editonny/engine/.venv/bin/python scripts/render-readme.py
```

The renderer checks dimensions, frame count and total duration. Pillow can merge identical frames without changing playback duration.
