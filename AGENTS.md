# Working on Fassa Frame

Open-source local video editing through conversation. One portable skill owns the engine and visual library; the browser guide helps users build requests.

## Map

- `skills/editonny/SKILL.md`: portable agent entry point. Do not create per-agent engine copies.
- `skills/editonny/engine/`: locked Python/FFmpeg/Whisper engine, preview, references, and HyperFrames project template.
- `skills/editonny/visuals/`: scenes, catalog, bundled media, recipes, and scene application.
- `skills/editonny/visuals/media.json`: original-video manifest. `media status` verifies the bundled paths, sizes, and hashes; projects receive only clips they use.
- `install.py`: shared installation and agent registration through links.
- `skills/editonny/scripts/editonny.py`: canonical CLI; root `fassa-frame.py` is the public launcher; `editonny.py` remains compatible.
- `web/`: the public guide, a Next.js 16 App Router app (workspace `@editonny/web`). Normal server deployment uses Root Directory `web`; `scripts/export-web.mjs` builds the Firebase `/fassa-frame` guide as documented in `docs/hosting.md`. `src/app/` holds routes, `src/features/` the domain code, `messages/` the interface text per locale, and `content/` the localized examples and scene translations.
- `web/src/features/request/`: shared request builder, brief options, and the contextual editorial-intent policy per locale (English is canonical).
- `web/src/features/examples/records.ts`: canonical example list (ids, categories, presets); its text lives in `web/content/examples/<locale>.json`. Scene text comes from `skills/editonny/visuals/catalog.json`, translated in `web/content/scenes/<locale>.json`.
- `DESIGN.md`: visual contract and source of truth for design tokens (Google Labs DESIGN.md format).
- `design-system/`: React component library (workspace `@editonny/design-system`), tokens, preview templates, showcase (served at `/design-system` by the web app), lint plugin, and frozen reference HTML; map and component workflow in `design-system/README.md`.
- `PRODUCT.md`, `docs/architecture.md`, `docs/design.md`: scope, structure, and interface.
- `docs/installation.md`, `docs/validation.md`, `docs/setup.md`: onboarding, quality evidence, and development tooling. Do not create competing sources.
- `graphify-out/graph.json`: local code/document index; workflow and coverage in `docs/setup.md`.
- `.work/`: temporary test artifacts. Preserve evidence for this fork in `.work/validation/` locally; exclude it from distributions. Remove disposable task outputs after inspection.

## Language and contracts

First-party names, code, comments, commands, schema, paths, prompts, descriptions, and defaults use English. The guide's interface text and generated requests are localized for `en-US`, `pt-BR`, and `es` through `web/messages/`, `web/content/`, and the request phrases; English is the source and every locale must stay complete (tests enforce it). `README.md` and onboarding documentation are Portuguese by user request; technical contracts remain English. Preserve upstream names, licenses, speech lexicons, and user-supplied text as data. Do not force English transcription or translate recorded speech without a request.

New projects use `project.json` and English contracts. Do not add compatibility readers or aliases for previous experimental formats. Use descriptive identifiers without inherited product-edition labels.

Editorial decisions follow the footage, objective, audience, destination, identity, and intent. Inspect and listen before choosing cuts, pauses, breaths, ambient sound, voice, music, graphics, animation, captions, framing, privacy treatment, and checks. None is universally better or worse. Preserve complete words, meaning, originals, and approved choices; targeted revisions must not recut unrelated content. See skills/editonny/references/editorial.md. Fassa Frame policy supersedes inherited cleanup defaults.

Fassa Frame is a fork of Editonny by Matheus Gomes. Keep LICENSE.md and third-party notices intact; see NOTICE.md and docs/upstream.md. Public product name/agent invocation is fassa-frame; internal editonny paths, schemas and workspaces stay compatible. The skill is written in Portuguese for the Hub; code/contracts remain English. Keep private Hub media out of distribution.

## Design system

`DESIGN.md` is the versioned visual contract and the source of truth for tokens; `design-system/tokens/` implements it and `npm test` fails when they drift. Read it before UI work. New components and UI come from `@editonny/design-system` (`design-system/components/index.ts`), created as described in `design-system/README.md`. Never hard-code colors, font families or sizes, spacing, or radii; use `var(--…)` tokens. The `design/tokens` lint rule, the raw-literal rules, and `npm run typecheck` enforce this. The web app imports `@editonny/design-system/styles.css`, defaults to light paper, and offers dark studio through a saved preference. `design-system/reference/` holds frozen export pages for comparison only.

## Verify

```sh
npm ci --ignore-scripts
npm run build
npm run check
python3 editonny.py doctor
```

`npm run check` includes lint, both typechecks, the Python, Node, and Vitest suites, and the icon registry check. `npm run test:browser` builds the web app and runs the Playwright suite (desktop and phone projects, locale detection, flows, preferences, axe accessibility, overflow, and the showcase); it needs Playwright's Chromium once (`npx playwright install chromium`). Run it after guide or design-system changes. Engine/preview changes also need `npm run test:engine`, `npm run test:preview`, and `python3 scripts/smoke_engine.py` with sample inspection. The smoke needs FFmpeg, Node/npx, and network on first use. Guide-only changes do not need another video render.

Preserve dependency pins and third-party notices. New render evidence applies only to the tested scenes and environment; never infer universal validation from one sample. Keep `docs/validation.md` aligned with observed results and limits.

## Boundaries

Preserve user footage, `.env`, projects, libraries, and unrelated local changes. Test installers with a temporary `--home`. Do not include virtual environments, caches, secrets, personal media, graph exports, or development artifacts in the plugin archive or the deployed site. The site is the `web/` app; it reads only public catalog fields from the skill. First-party MIT licensing does not replace third-party resource terms.

Do not publish, transmit media to external services, spend credits, send messages to others, or change personal installations without authorization. Existing tools do not imply authorization. Do not add Git hooks or impose a branch/worktree; respect the requested checkout.

## Execution agreements

Read relevant code and instructions before edits. State assumptions, acceptance criteria, and checks. Use the smallest complete change; preserve validations, meaningful errors, accessibility, and working capabilities. Fix shared causes once and update callers, tests, fixtures, configuration, exports, and the responsible documentation together. Reproduce bugs and prove regression when feasible.

Answer status requests and continue authorized work. Pause only affected dependencies; respect cancellation. On resumption, inspect checkout, files, checks, and processes before trusting a handoff. Temporary progress belongs in `docs/superpowers/`; durable knowledge belongs in canonical docs with source, date, and invalidation conditions.

Use installed Ponytail full and Caveman for focused changes and concise conversation when available; code, docs, commits, and accessibility keep normal clear wording. Use Superpowers proportionally and preserve existing authorization. Use Context7 for current library/API documentation when needed, without private data in queries. Use the existing RTK hook for supported shell commands; do not add wrappers. UI review uses web-design-guidelines when available. Reusable security-review policy belongs in `docs/validation.md`.

Coordinate through the user's current native client: Codex/Atlas or Claude Code/SF, using that client's configured authentication and model. Follow the current task when choosing a client or model; do not impose a provider, switch silently, or introduce proxy/API-key billing without authorization. Delegate when isolation or independent review justifies it: one writer per file, read-only reviewers, independent or serialized resources. The coordinator controls Git, lockfiles, and integration, then verifies diffs and checks before accepting results.

Non-trivial work receives independent review of the exact range and working tree with concrete scenarios and evidence. Additional rounds require an explicit request or unresolved risk/finding. Reviews never justify weakening tests to hide a real defect.

## Local graph

Use the graph for navigation, then inspect current source. Exclude secrets, media, vendor files, environments, generated bundles, and exports. `npm run graph:update` prepares `.work/graphify/pending.json`; native Codex agents complete assigned extraction tasks and community labels, then the command is repeated until promotion. No terminal command starts an LLM or selects another provider. Coverage and provenance belong in `graphify-out/run.json`; unknown native token counters remain unknown. Details and recovery are in `docs/setup.md`.
