# Cutting recorded speech

Select complete, meaningful phrases and compare repeated takes. Preserve caveats, negation, speaker order, quiet consonants, and word endings. Scripts guide spelling but recorded speech determines words and timing.

See [WORKFLOW.md](../WORKFLOW.md) for scope, originals, source-language fidelity, and sample review.

## Helpers

Run the relevant helper with `--help` before supplying task-specific paths:

```sh
uv run --directory '<ENGINE>' python helpers/transcribe_batch.py --help
uv run --directory '<ENGINE>' python helpers/pack_transcripts.py --help
uv run --directory '<ENGINE>' python helpers/waveform_cut.py --help
uv run --directory '<ENGINE>' python helpers/render_cut.py --help
uv run --directory '<ENGINE>' python helpers/verify_cut.py --help
```

`render_cut.py` plans J-cuts from the measured noise floor in `<EDIT>/regions/<stem>.json`, creating it when missing. The same EDL therefore yields the same joins and duration in any edit folder and at any output size. A video composed from that cut (a different size or background) keeps its timing; size its mattes from the video itself, not from a timeline written for another size.
