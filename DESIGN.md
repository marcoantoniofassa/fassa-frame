---
version: alpha
name: fassa-frame
description: Studio visual language for Fassa Frame's guide, edit preview, landing surfaces, and design-system showcase. Dark studio is the default theme; light paper is the alternative theme visitors can choose.
colors:
  ink-950: "#050506"
  ink-900: "#0b0b0d"
  ink-850: "#111114"
  ink-800: "#17171b"
  ink-700: "#212126"
  ink-600: "#2c2c33"
  ink-500: "#3b3b44"
  ink-400: "#5a5a66"
  fog-50: "#fafafa"
  fog-200: "#e4e4e7"
  fog-400: "#a1a1aa"
  fog-500: "#8b8b94"
  fog-600: "#71717a"
  white: "#ffffff"
  orange-50: "#fff1ea"
  orange-100: "#ffd6c2"
  orange-300: "#f4c46f"
  orange-500: "#e8a838"
  orange-600: "#d69324"
  orange-700: "#b82f00"
  orange-800: "#7a1f00"
  orange-900: "#2b0b00"
  volt-300: "#e9ff8f"
  volt-400: "#d4ff3a"
  volt-600: "#a6d600"
  sun-300: "#ffe566"
  sun-400: "#ffd60a"
  rec-400: "#ff3b5c"
  sky-400: "#4dc3ff"
  paper-0: "#ffffff"
  paper-50: "#fafaf6"
  paper-100: "#f4f3ed"
  paper-200: "#e8ebdf"
  paper-300: "#d8dbcf"
  paper-400: "#bfc5b5"
  paper-500: "#aeb3a4"
  paper-600: "#6a6e61"
  paper-700: "#66695e"
  paper-750: "#606957"
  paper-900: "#242721"
  olive-100: "#e9eedc"
  olive-200: "#dce4ca"
  olive-250: "#d8e5b3"
  olive-300: "#c7d6b9"
  olive-350: "#b7c79e"
  olive-400: "#b3c78e"
  olive-450: "#91a56f"
  olive-500: "#84966c"
  olive-550: "#7e965b"
  olive-575: "#748858"
  olive-600: "#637d31"
  olive-650: "#627346"
  olive-700: "#557522"
  olive-800: "#526343"
  forest-700: "#354935"
  lime-400: "#d6f66b"
  lime-500: "#c9ec51"
  amber-700: "#7a5f00"
  crimson-700: "#c4122f"
  azure-700: "#0b6fa8"
  primary: "{colors.orange-500}"
  secondary: "{colors.volt-400}"
  tertiary: "{colors.sun-400}"
  neutral: "{colors.ink-900}"
  surface: "{colors.ink-900}"
  on-surface: "{colors.fog-50}"
  on-primary: "{colors.ink-950}"
  error: "{colors.rec-400}"
  light-surface: "{colors.paper-100}"
  light-on-surface: "{colors.paper-900}"
  light-secondary: "{colors.lime-400}"
  light-error: "{colors.crimson-700}"
typography:
  display:
    fontFamily: Figtree
    fontSize: 112px
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Figtree
    fontSize: 80px
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: -0.06em
  headline-md:
    fontFamily: Figtree
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.035em
  headline-sm:
    fontFamily: Figtree
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.04em
  title:
    fontFamily: Figtree
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.03em
  body-lg:
    fontFamily: Figtree
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.6
  body-md:
    fontFamily: Figtree
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Figtree
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
  label-md:
    fontFamily: Figtree
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
  label-button:
    fontFamily: Figtree
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.01em
  eyebrow:
    fontFamily: ui-monospace
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.16em
  timecode:
    fontFamily: ui-monospace
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
  kinetic:
    fontFamily: Anton
    fontSize: 56px
    fontWeight: 400
    lineHeight: 0.9
  caption-clean:
    fontFamily: Montserrat
    fontSize: 30px
    fontWeight: 900
    lineHeight: 1.05
  caption-hand:
    fontFamily: Caveat
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.05
  caption-marker:
    fontFamily: Permanent Marker
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.05
  editorial-body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  2xs: 4px
  xs: 6px
  sm: 10px
  md: 14px
  lg: 20px
  xl: 24px
  2xl: 32px
  3xl: 40px
  device: 54px
  full: 999px
spacing:
  half: 2px
  "1": 4px
  "1-5": 6px
  "2": 8px
  "2-5": 10px
  "3": 12px
  "3-5": 14px
  "4": 16px
  "5": 20px
  "6": 24px
  "7": 28px
  "8": 32px
  "10": 40px
  "12": 48px
  "14": 56px
  "16": 64px
  "20": 80px
  "24": 96px
  "28": 112px
  "32": 128px
  gutter: 56px
  container: 1440px
  content: 1360px
  topbar: 64px
components:
  button-primary:
    backgroundColor: "{colors.orange-500}"
    textColor: "{colors.ink-950}"
    typography: "{typography.label-button}"
    rounded: "{rounded.full}"
    height: 50px
    padding: 24px
  button-primary-hover:
    backgroundColor: "{colors.orange-300}"
    textColor: "{colors.ink-950}"
  button-volt:
    backgroundColor: "{colors.volt-400}"
    textColor: "{colors.ink-950}"
    rounded: "{rounded.full}"
  button-sm:
    height: 38px
    padding: 16px
  button-lg:
    height: 60px
    padding: 28px
  icon-button-tile:
    backgroundColor: "{colors.ink-600}"
    textColor: "{colors.fog-50}"
    rounded: "{rounded.md}"
    size: 44px
  badge:
    backgroundColor: "{colors.ink-700}"
    textColor: "{colors.fog-50}"
    rounded: "{rounded.full}"
    height: 26px
    padding: 12px
  input-field:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.fog-50}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 14px
  select:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.fog-50}"
    rounded: "{rounded.md}"
    height: 52px
  choice-card-selected:
    backgroundColor: "{colors.ink-700}"
    textColor: "{colors.fog-50}"
    rounded: "{rounded.lg}"
  chip:
    textColor: "{colors.fog-200}"
    rounded: "{rounded.full}"
    height: 36px
  chip-selected:
    backgroundColor: "{colors.fog-50}"
    textColor: "{colors.ink-950}"
  card:
    backgroundColor: "{colors.ink-800}"
    textColor: "{colors.fog-50}"
    rounded: "{rounded.xl}"
    padding: 24px
  dialog:
    backgroundColor: "{colors.ink-800}"
    textColor: "{colors.fog-50}"
    rounded: "{rounded.2xl}"
    padding: 32px
    width: 520px
  toast:
    backgroundColor: "{colors.fog-50}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.full}"
  guide-button:
    backgroundColor: "{colors.lime-400}"
    textColor: "{colors.paper-900}"
    rounded: "{rounded.2xs}"
    padding: 16px
---

# editonny design system

This file is the visual contract and the source of truth for tokens. The YAML front matter is normative; `design-system/tokens/*.css` implements it and `npm test` fails when a primitive color, radius, or spacing step drifts between the two. The component library, its map, and the reference pages live in [`design-system/`](design-system/README.md).

## Overview

A local video studio directed through conversation. The interface speaks like a calm editing director: direct, honest about what it does, and focused on the next decision. Visually it is solid color plus purposeful motion — near-black studio surfaces, saturated orange for the one main action, electric volt for live state and focus, and sun for caption highlights. No brown, sepia, or muddy gradients; light is an effect, not a UI background.

Two themes share every component:

- **Dark studio** (default, `:root` or `data-theme="dark"`): the export's v2 language for the preview, landing surfaces, and showcase.
- **Light paper** (`data-theme="light"`): the editorial palette — paper, ink, olive, and lime — with the same orange brand accent. The guide in `web/` renders in the dark studio theme by default and switches to light paper through a saved visitor preference.

## Colors

Primitives never change with the theme; components consume only semantic roles, which each theme maps to primitives.

| Role | Dark studio | Light paper | Use |
|---|---|---|---|
| `--bg-page` / `--bg-deep` | ink-900 / ink-950 | paper-100 / paper-200 | Page and top bars |
| `--surface-card` / `--surface-raised` / `--surface-tile` | ink-800 / ink-700 / ink-600 | paper-50 / paper-0 / paper-200 | Panels, raised items, tool tiles |
| `--surface-well` / `--surface-selected` | ink-850 / ink-700 | paper-50 / olive-100 | Fields, selected choices |
| `--line-1` / `--line-2` / `--line-strong` | white 7% / 12% / 22% | paper-300 / 400 / 500 | Hairlines and borders |
| `--text-1` / `--text-2` / `--text-3` | fog-50 / fog-400 / fog-500 | paper-900 / 700 / 600 | Primary, secondary, tertiary text |
| `--accent` / `--text-accent` | orange-500 / orange-500 | orange-500 / orange-700 | Main action, accent text |
| `--accent-2` / `--focus-ring` | volt-400 / volt-400 | lime-400 / olive-700 | Live, success, focus |
| `--success` `--warning` `--danger` `--info` | volt, sun, rec, sky | olive-700, amber-700, crimson-700, azure-700 | Status text and outlines |

- Orange carries black text (`--text-on-accent`), never white. One primary orange action per view.
- Solid blocks (orange, volt, white, fire gradient) are the main compositional motif for call-outs, bento tiles, and tapes.
- Footage, captions, and glass controls over media use the theme-independent `--on-media`, `--glass-*`, and `--media-*` tokens.
- Text pairs meet WCAG AA 4.5:1 for body text. `--fog-500` was added because the export's `--fog-600` measured 3.7:1 on cards; `--fog-600` remains for decorative strokes only.

## Typography

- **Figtree** (`--font-sans`, `--font-display`) for interface and display; display weight 800 with −0.05 to −0.06em tracking and 0.9 leading.
- **Anton** (`--font-kinetic`) uppercase for impact: tapes, large numbers, call-outs, step numbers (outlined, then filled).
- **Mono** (`--font-mono`) for eyebrows with an index chip, commands, and timecodes.
- **Caption lettering** inside rendered videos: Anton (impact), Montserrat (clean), Caveat (hand), Permanent Marker (marker).
- **Editorial stacks** for editorial surfaces: `--font-editorial` (Inter, system sans) with `--font-serif` (Georgia) italic emphasis.

Sizes come only from `--size-*` tokens (10–160 px) and the fluid `--size-fluid-*` headline tokens. Highlight the keyword of a headline with a solid block (`Highlight` or `KineticText`), one per headline.

## Layout

Spacing uses the `--space-*` scale (2–128 px, including the 2, 6, 10, 14, and 28 px half steps). Containers are 1360–1440 px with a 56 px gutter. Guide pages are airy (about 110 px between sections); the preview is compact (14–16 px card padding). Hero layouts use two columns (copy × 9:16 phone), bento sections use 12 columns, and every layout collapses to one column without horizontal scrolling at 390 px.

## Elevation & Depth

Depth comes from solid tonal steps and 1 px lines first, shadows second. Cards are solid `--surface-card` with `--line-1`. Use `--shadow-md` for lift on clickable cards, `--shadow-lg` for dialogs and popovers, `--shadow-glow` only on the active orange action or tool, and glass (`--surface-glass`, blur 20 px, `--inner-glass`) for headers and controls over media. The animated `beam` border marks a single hero object per view.

## Shapes

Radii come from `--radius-*`: tiles and fields 10–14 px, cards 24 px, hero blocks 32–40 px, devices 54/44 px, and every action is a pill. Text-relative shapes (highlight blocks, the wordmark "e") use em values. The wordmark block keeps its asymmetric corners (0.26 × size, 0.05 × size).

## Components

All 38 components live in `design-system/components/` and are imported from the workspace package `@editonny/design-system` (entry point `design-system/components/index.ts`). Every interactive one supports default, hover, active, focus-visible, and disabled; the showcase also shows loading, error, empty, and selected where they apply.

- **Core:** Button (primary, volt, white, dark, glass, outline, ghost; sm/md/lg; loading), IconButton (tile, glass, accent, volt, ghost; pressed), Icon, Wordmark, Eyebrow, Badge (nine tones, mono, live), Kbd.
- **Forms:** TextField (help, error, counter, multiline), Select, ChoiceCard (icon, media, compact; selected), Switch (row), SegmentedControl (glass or solid; awaiting dot).
- **Content:** Card (surface, raised, glass, orange, volt, white, fire; beam, spotlight, lift), MediaCard, SceneCard (eight schematic motifs), PromptCard, StepItem, CommandLine, Accordion.
- **Feedback:** Toast, Dialog (native modal or inline), StatusLine (idle, working, awaiting, offline, done), ProgressRing.
- **Editor:** Transport, Timeline (seekable slider), MarkItem, Waveform, KineticCaption.
- **Motion:** Marquee, KineticText, Counter, Aurora, Reveal.
- **Site:** SiteHeader, LanguageSelect, CreatorChip, Highlight, Chip.

The edit-preview composition template is in `design-system/templates/preview/`; the guide's compositions live in the web app (`web/src/features/`).

## Do's and Don'ts

- Do build new UI from the library and tokens; do not hard-code colors, font families, font sizes, spacing, or radii. ESLint (`design/tokens`, raw-literal rules) and `npm run typecheck` enforce this.
- Do keep one orange primary per view and black text on orange.
- Do use volt or olive for focus rings: 2 px, 3 px offset.
- Do respect `prefers-reduced-motion`; components already stop their timers.
- Do not use emoji; glyphs (↗ → ⧉ × ✦ ✓) only sparingly.
- Do not put light effects (aurora, beam) behind more than one object per view.
- Do not present schematic previews as rendered video; say they are illustrative.
- Do not invent product names, prices, results, or testimonials in examples.

## Motion

Easings: `--ease-out` (expo) for entrances, `--ease-spring` for interactions, `--ease-snap` for wipes and highlighter sweeps, `--ease-in-out` for loops. Durations: 120, 200, 320, 600, and 1200 ms with a 70 ms stagger. Hover lifts 2 px with a glow and a shine sweep; press scales to 0.95 with the spring. Entrances blur and slide up (`ed-word-in`, `Reveal`). Loops (waves, live pulses, floating chips, marquees) are decorative. The `ed-*` keyframe library is in `design-system/tokens/motion.css`.

## Iconography

Lucide line icons with a 2 px round stroke, inheriting `currentColor`. The bundled set (Lucide 0.460.0, ISC) is in `design-system/assets/icons/` and is rendered inline by `Icon`; pass `base` only for an external folder served over HTTP. Tool icons sit in rounded tiles; controls over media sit in glass circles. Round flags for the language picker are in `design-system/assets/flags/`.

## Content

Commands, code, and source text are English (see `AGENTS.md`); the guide's interface and requests are also localized for Brazilian Portuguese and Spanish, following the same voice. Speak to the reader as "you"; the product says "we" only when it takes on work, and the AI is "your AI" or "the agent". Use sentence case for titles and buttons, mono uppercase eyebrows with an index ("HOW IT WORKS / 01"), verb-first actions (Create, Copy request, Use in my request, Approve, Mark start), and "For example," in placeholders. House vocabulary: request, cut, sample, finish, hook, call to action, scene, mark, section, raw footage. State limits honestly: "The guide does not access or upload files."

## Implementation

- Tokens: `design-system/tokens/` (`colors.css` holds primitives and both themes); apps import them through `@editonny/design-system/styles.css`.
- Change a token in this front matter and in the token CSS together; `tests/design-system.test.mjs` checks primitives, radii, and spacing.
- Fonts are the engine's bundled OFL/Apache files, loaded by the web app with `next/font` and exposed to the tokens as `--font-*-face`; footage stills and 3D objects are referenced from the skill rather than copied.
- The showcase at `/design-system` (web app route) renders every component, state, and the preview template in both themes.
