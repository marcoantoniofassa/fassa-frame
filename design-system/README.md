# editonny design system

The component library, tokens, templates, and visual references for editonny. [`DESIGN.md`](../DESIGN.md) at the repository root is the visual contract and the source of truth for every token; this folder implements it. Imported on 2026-10-18 from a Claude Design export (v2 "living studio"; landing patterns from Claude Design project `3279deec-b3c4-4cfc-846e-d93fb88627d5`). Its pt-BR copy was rewritten in English, its tool files (bundle manifest, thumbnails, uploaded third-party mood references, and agent-skill wrapper) were not imported, and its oxlint adherence rules became the ESLint configuration described below. Changes to the tokens, components, or folder layout invalidate this map.

The showcase is the `/design-system` route of the web app (`npm run dev`, then open `http://localhost:3000/design-system`): all 38 components, their states, the edit-preview template, and the tokens in the dark studio and light paper themes.

## Map

| Path | Contents |
|---|---|
| `package.json` | Workspace package `@editonny/design-system`; exports `.` (components), `./styles.css`, `./showcase`, `./assets/*`, and `./lint` |
| `tokens/` | `colors.css` (primitives, dark and light semantic roles), `typography.css` (font tokens read `--font-*-face` variables from the app's font loader), `spacing.css` (spacing, radius, shadows, blur, layout), `motion.css` (easings, durations, `ed-*` keyframes, `.ed-grain`, `.ed-text-fire`), `base.css` |
| `styles.css` | Entry point for a design-system page: tokens, document defaults, and every component sheet |
| `components/` | `index.ts` (the only public import), `lib.ts` (internal helpers and the `BaseProps` type), `components.css`, and one folder per category with a `.tsx` file per component plus the category stylesheet and its tests |
| `templates/preview/` | The edit-preview composition (top bar, cut, style, final) ported from the export's UI kit, with `preview.css`; the guide template became the web app in `web/` |
| `showcase/` | React sources of the showcase rendered by `web/src/app/design-system/` |
| `assets/` | `icons/` (Lucide 0.460.0, ISC, see its `LICENSE`), `flags/`, `brand/` (`favicon-v2.svg`, `og-image.png`), `imagery/matheus-gomes.jpeg` |
| `scripts/icons.mjs` | Generates `components/core/icon-data.ts` from `assets/icons/` (`npm run icons`; `npm run check:icons` fails when it is stale) |
| `lint/` | ESLint plugin with the `design/tokens` CSS rule, wired in `eslint.config.mjs` |
| `reference/` | Frozen HTML from the export: 24 guideline cards, 7 component cards, and the two UI kits (pt-BR originals), with their own `fonts.css` |

Components by category:

- `core/`: Button, IconButton, Icon, Wordmark, Eyebrow, Badge, Kbd
- `forms/`: TextField, Select, ChoiceCard, Switch, SegmentedControl
- `content/`: Card, MediaCard, SceneCard, PromptCard, StepItem, CommandLine, Accordion
- `feedback/`: Toast, Dialog, StatusLine, ProgressRing
- `editor/`: Transport, Timeline, MarkItem, Waveform, KineticCaption
- `motion/`: Marquee, KineticText, Counter, Aurora, Reveal
- `site/`: SiteHeader, LanguageSelect, CreatorChip, Highlight, Chip

Fonts come from `skills/editonny/engine/assets/fonts/` (licenses in the engine's `THIRD_PARTY_NOTICES.md`); the web app serves Latin WOFF2 subsets of them from `web/src/app/fonts/` (loaded by `web/src/app/fonts.ts`; regenerate them after changing a source font, see `web/src/app/fonts/README.md`), and the Open Graph image reads the engine's TrueType Anton. Other assets already in the skill are referenced, not copied: footage stills from `skills/editonny/visuals/assets/visuals/img/`, and 3D objects from `skills/editonny/visuals/library/3d-objects/png/`. Exported SVGs keep their embedded content credentials unchanged.

## Using the library

```tsx
import '@editonny/design-system/styles.css';
import { Button, Card } from '@editonny/design-system';

export const Example = () => <Card padding="var(--space-6)"><Button iconRight="arrow-up-right">Create request</Button></Card>;
```

Components are React 19 function components that take one typed props object. Set `data-theme="light"` for paper, the public guide’s default. The bare token layer and component showcase retain dark studio as their baseline. Interactive states use native pseudo-classes; `data-force="hover|active|focus"` previews them, and containers over footage set `data-surface="media"`. Live components are controlled through props (`Timeline` `playhead`, `Transport` `playing`, `Dialog` `open`). Files that use hooks or browser APIs start with `'use client'`; the rest render on the server. Every animated component respects `prefers-reduced-motion`, and `Reveal` content stays visible without JavaScript. Router links plug in through `Button`'s `href` + `as` and `SiteHeader`'s `linkAs`. Visible copy is a prop with an English default so apps can localize it.

The edit preview in `skills/editonny/engine/preview/` is part of the portable skill and keeps its own styles until a preview redesign is validated with its own browser checks.

## Creating a component

1. Confirm the need: compose existing components first. New UI must come from this library and the tokens.
2. Add `components/<category>/<Name>.tsx`: an exported props type (literal unions for variants, `BaseProps` for `className`/`style`) and one exported function component. Accessible names, keyboard behavior, and reduced motion are part of the component; add `'use client'` only when it needs hooks or browser APIs.
3. Style it in `components/<category>/<category>.css` with `ds-<name>` classes and `data-*` variants. Use only `var(--…)` tokens for color, font family and size, spacing, and radius; cover `:hover`, `:active`, `:focus-visible`, and `:disabled` with matching `[data-force~=…]` selectors.
4. Export it from `components/index.ts`, test it in `components/<category>/<category>.test.tsx`, and add a `<Specimen name="<Name>">` with every variant and state to the matching `showcase/*.tsx` file.
5. If it needs a new token, add it to `DESIGN.md` and the token CSS together.
6. Run `npm run check`; run `npm run test:browser` when the showcase changes.

`npm run check` enforces the rules: `design/tokens` rejects raw colors, font families, font sizes, spacing, and radii in design-system and web CSS (token files excepted); raw hex, px, and font literals are rejected in TypeScript; consumers must import from `@editonny/design-system`; and `npm run typecheck` rejects unknown props or variant values. `tests/design-system.test.mjs` keeps `DESIGN.md`, the token CSS, the public API, and the showcase in sync.

## Reference HTML

`reference/` keeps the export's visual references so they can be compared after the original folder was removed. Open any file directly in a browser: `reference/ui_kits/guia/index.html`, `reference/ui_kits/preview/index.html`, `reference/components/<category>/<category>.card.html`, and `reference/guidelines/*.card.html`. They load React 18.3.1, ReactDOM, and Babel 7.29.0 from unpkg with integrity hashes, so they need a network connection; `reference/_ds_bundle.js` is the export's compiled component bundle (its embedded SHA-256 source hashes matched every exported source at import time). `reference/styles.css` points them at the live tokens in `../tokens/` and the font faces in `reference/fonts.css`, and asset paths point at `../assets/` or the skill media. The UI kit screens are inlined in their `index.html` and the icon card embeds its SVG masks so both work from `file://`. These pages are not part of the library and are not linted.
