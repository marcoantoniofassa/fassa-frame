# Optional integrations

Reviewed on 2026-10-18 against package boundaries. This reference records integration policy, not proof that external products are connected or supported in every environment.

The standard path is native agent conversation plus local Python, FFmpeg, Whisper, and pinned HyperFrames. There is no mandatory external generation service, hosted editing backend, or separate LLM API.

## Render and scene tools

**HyperFrames** is the composition runtime. Use the version pinned by the project, currently 0.8.171. An upgrade requires isolated dependency changes, lint/check, snapshots, a real render, audio inspection, arbitrary seeking, and review of affected scene families. Documentation alone does not prove compatibility.

**Anatomy** may help author an explanatory isometric SVG/HTML scene when available. Its mechanism must clarify the speech, respect licenses, and use frame/time-driven animation. No built-in adapter is claimed.

**Remotion** is an alternative external React video workflow, not this project's runtime. It has its own licensing terms; the first-party MIT license does not apply to it.

**Shotcut/Kdenlive** can finish an exported MP4 manually. Layers are flattened and no timeline interchange exporter is implemented. Do not imply round-trip editing support.

## External generation

Use external image, voice, music, or video generation only when the task needs it and authorization covers the service, inputs, media transmission, and cost. Identify limitations and validate a short sample before integration. Do not invoke a paid generator to hide a missing bundled asset or promise visual equivalence without evidence.

Keep credentials in local configuration excluded from distribution. Never put secrets into prompts, documentation queries, shell substitutions, or logs. Do not treat an installed plugin as authorization to spend, publish, send messages, or transmit footage.

Prefer existing local scenes, original code compositions, or supplied media with usage rights. Illustrative visuals are not factual evidence, testimonials, or guarantees of platform approval.

## Licensing

First-party code and documentation are MIT licensed. Dependencies, models, fonts, audio, and media retain their own notices and terms. Inspect the resource-level records before redistribution or adding a new asset; a filename or an available download does not establish ownership.
