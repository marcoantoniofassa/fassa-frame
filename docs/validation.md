> Fassa Frame 0.1.0: evidências desta entrega em [fork-validation.md](fork-validation.md). O conteúdo abaixo registra o histórico upstream e não substitui os testes do fork.

# Validation evidence

Reviewed on 2026-10-19 on macOS Apple Silicon with Node.js 24.21.0, launcher Python 3.9.6, and engine Python 3.13.16; rows marked 2026-10-18 were not rerun after the guide rebuild because the engine, preview, and scenes did not change. Results apply to this checkout and environment; they do not establish universal scene or platform coverage.

## Observed checks

| Check | Result |
|---|---|
| `npm ci --ignore-scripts` | Passed (2026-10-19); workspace installed from one lockfile; `npm audit --omit=dev` reports zero production vulnerabilities; five high development-only advisories trace to `braces` through `eslint-config-next`'s file globbing (no fixed version exists; lint runs only on repository files) |
| `npm run build` | Passed (2026-10-19); Next.js 16.4.2 production build: every page prerendered for `en-US`, `pt-BR`, and `es`, the `/design-system` showcase, sitemap, robots, manifest, icon, and the localized Open Graph images |
| `npm run check` | Passed (2026-10-19); rule self-check, ESLint (TypeScript, Next.js, React Compiler rules, design-system adherence), both typechecks, 55 Python tests, 15 Node tests, 126 Vitest tests, and the icon registry check |
| `python3 editonny.py doctor` | Passed; local tools, engine interpreter, catalog, and pinned HyperFrames configuration present |
| `python3 editonny.py media status` | Passed; 79/79 bundled videos valid, zero missing or invalid |
| `npm run test:engine` | Passed; 27 integration tests |
| `npm run test:browser` | Passed twice in a row (2026-10-19); 168 Playwright tests (28 project-specific skips) on desktop Chromium 1440×900 and a Pixel 7 phone profile (see below) |
| `npm run test:preview` | Passed; marks, trims, drafts, and approval confirmation |
| `npm run test:scenes` | Passed; covered 2D templates, parameter variants, seeking, and selected visual scenes |
| `python3 scripts/smoke_engine.py` | Passed; pinned HyperFrames lint, check, snapshots, and synthetic video render |
| `python3 scripts/package.py` | Passed (2026-10-19); plugin ZIP with SHA-256 (2,129 files); inspected: no `web/`, `design-system/`, `.next`, `node_modules`, or `.env` entries |

Browser checks used a temporary `npm exec --yes --package=agent-browser -- ...` environment because the CLI was absent from the shell PATH; the existing browser was available. An initial scene-test invocation without that prerequisite failed with `ENOENT` and was stopped before rerunning with the CLI available. No personal installation was changed.

The scene check exposed two existing defects before publication: the recovery icon used `COR` while its substitution expected `COLOR`, and the attempt counter read `success` while its public parameter was `correct`. The fixes preserve the existing validation and animation. The unchanged regression assertions failed before their corresponding fixes and passed afterward, including zero successful attempts and each numbered successful attempt. The four HTTP-client integration tests also passed after annotating their synthetic credential fixture for the secret scanner.

## Sample and interface inspection

The synthetic smoke exported a 3.000-second MP4 at 1080×1920 with a 48 kHz audio stream. Frames at 1, 1.5, and 2 seconds showed readable captions and the glow transition. Audio measurement found mean volume -21.1 dB and maximum -16.2 dB. This proves synthetic signal presence rather than speech or music quality.

The guide footer was inspected at 390×844 and 1440×1000. Author, Instagram, email, and repository links remained visible without horizontal page overflow. A footer-scoped axe 4.12.1 audit reported zero violations and zero incomplete checks; this is not a whole-site accessibility certification.

## Publication and review

A native independent read-only review examined the development history and working tree for publication risks, metadata consistency, disposable files, and retained third-party notices. It identified a different personal email in historical commit metadata and stale validation/development notes. The public repository starts from a sanitized snapshot using Matheus Gomes and `eu@matheusgom.es`; prior development history remains in local Git backup refs and is not pushed. Temporary plans, graph exports, secrets, environments, caches, test output, and distribution ZIPs are excluded from the public tree.

Gitleaks 8.30.1 was downloaded to an ignored temporary directory and checked against its release checksum. The historical scan detected one synthetic credential in the mocked HTTP-client tests; it was inspected and annotated in source with a scoped `gitleaks:allow`. The final public snapshot is scanned separately before pushing. Pattern-based scanning cannot prove the absence of every possible secret.

This publication review does not claim the five functional review cycles previously proposed in local development notes. Additional independent review of the two scene fixes is limited to their concrete regressions. Original library/model/font/audio notices remain separate from the first-party MIT license; the inventory review does not replace legal verification of every upstream resource.

Reusable security review is based on the prompt in [Vibe Coding Toolkit revision de66fe3](https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/de66fe371a49f5a4d3b521759e5c401f390b6424/docs/prompts/13-security-review.md). Review actual callers and trust boundaries without secrets, production probing, code upload, or automatic external actions. A native independent reviewer is the fallback when a compatible specialized reviewer is unavailable. This document remains the canonical quality source.

## Remote CI portability

The first GitHub Actions run of the sanitized snapshot failed on Ubuntu because the rollback unit test mocked dependency synchronization but still relied on a real `uv` executable for preflight. Reproducing that test locally with `shutil.which` returning `None` produced the same failure. The test now supplies its external-tool prerequisite explicitly while continuing to exercise the real installation, failed synchronization, version restoration, and agent registration checks. Production installer validation is unchanged. The focused reproduction passes with `uv` unavailable, and the canonical local suite is rerun before pushing the fix.

GitHub Actions checks Node.js 22.13.0 and 24 using Python 3.11. Two FFmpeg-dependent voice tests are skipped when those system tools are absent; that limitation is distinct from the local engine/browser/render evidence above. Confirm the latest run on the repository's Actions page rather than interpreting an earlier failed run as the current result.

## README visual refresh

On 2026-10-18 the README refresh passed `npm run check`: rule self-check, ESLint, 54 Python tests, 22 Node tests, and generated-guide verification. `doctor` also passed. The additional package test and extended archive fixture first failed against the previous packager, then passed after adding the named README artwork directory. Coverage includes artwork inclusion, exclusion of private sibling files and `.env`, and rejection of a symlinked artwork root.

All three READMEs were rendered through GitHub's Markdown API. Local image/link targets and SVG XML were checked. Desktop (1280×960) and mobile (390×844) browser previews showed the intended image sources and no horizontal page overflow. Reduced-motion emulation selected all three PNG posters; the mobile hero reported zero CSS animations. With motion enabled the hero's playhead transform changed across sampled times and every SVG animation finished within 4.4 seconds. The three GIFs contain 36 frames at 480×480, last 4.51 seconds, and have no looping extension. Posters and sampled frames were inspected; combined artwork is approximately 2.33 MB.

Sources, cropping, synthetic content, and ownership limits are recorded in `design.md`. This validates three excerpts, not the complete visual catalog or recorded-speech quality. Browser scene previews are separate from the earlier HyperFrames smoke evidence. The Markdown API prefixes custom IDs with `user-content-`; live GitHub fragment navigation and the final remote CI are checked after publication rather than inferred from the local preview wrapper. External stars/status/chart images were available during the preview; their availability and cache freshness remain outside repository control.

## Design system import

On 2026-10-18 (macOS Apple Silicon, Node.js 24.21.0) the Claude Design export was ported to `design-system/` and the export folder was removed after these checks. `npm install` added the pinned TypeScript 7.0.2 and @eslint/css 2.0.0 with zero reported vulnerabilities. `npm run check` passed: rule self-check, ESLint with the `design/tokens` CSS rule and raw-literal rules, the design-system typecheck, 54 Python tests, 28 Node tests, and verification of the generated guide, icon registry, token sheet, and showcase. `npm run test:browser` passed for the guide and the showcase: 38 components in each theme, theme switching with arrow keys, the modal's padding click and Escape, catalog and example propagation into the request builder, removing the last mark during playback, no horizontal overflow at 390 px, and no page errors.

The official `@google/design.md` 0.4.0 linter, installed temporarily outside the repository, reported zero errors for `DESIGN.md`; its 49 `orphaned-tokens` warnings list palette primitives that CSS uses but the front-matter components do not reference. Full-page guide screenshots before and after the token adoption measured 39.6–73.6 dB PSNR at 1440×1000 and 43.1 dB at 390×844, with computed styles confirming the generated tokens loaded. axe 4.12.1 reported zero violations on the guide's home, create, and catalog pages. On the showcase it reports only intentional `color-contrast` nodes: upcoming words of the karaoke caption (dimmed by design; the component exposes the full text as its accessible name) and a paused frame of an `aria-hidden` scene diagram. The 33 reference pages opened from `file://` with every image and background resolved; they fetch React and Babel from unpkg and therefore need network access.

An independent read-only Codex review (`gpt-6-astra`, ChatGPT authentication) reported eleven defects: a crash after removing the last mark, catalog selections and example copies that dropped the request, timers that outlived detached elements, template loops ignoring reduced motion, segmented tabs without arrow keys, modal dismissal from its own padding, and four lint bypasses. Each was fixed and now has a unit, lint, or browser regression check. This evidence covers Chromium on this machine; Linux and Node 22.13 run through remote CI, and the guide's editorial markup was not migrated to library components.

## Next.js guide rebuild

On 2026-10-19 `web/` was rebuilt as a Next.js 16.4.2 app (React 19.3.1, next-intl 4.14.9, React Compiler, Cache Components, typed routes) and the design system was ported to React/TypeScript; the static guide, its generated bundle, its `file://` tests, and the site ZIP were removed. Evidence from that work:

- **Request parity.** Golden tests compare the new English builder with strings produced by the previous `web/model.mjs` for an empty brief, a full brief with a scene, and a scene request; they are byte-identical. The only intended difference: a goal that already ends with `.`, `!`, `?`, or `…` no longer receives a second period. The cleanup policy appears exactly once in every locale.
- **Content.** 145 scenes in source order and 54 examples in workflow order for each locale; tests fail on a missing or unknown translation id or an empty field. Brazilian Portuguese example text reuses the owner's original records from history; Spanish text and scene translations were written for this release and have not had a native-speaker review.
- **Locale routing.** Browser profiles in `pt-BR`, `pt`, `pt-PT`, `es-419`, `es-MX`, `fr-FR`, and `en-GB` land on `/pt-br`, `/pt-br`, `/pt-br`, `/es`, `/es`, `/en`, and `/en`; weighted headers pick the preferred supported language; the `NEXT_LOCALE` cookie wins; unknown paths return 404; each page lists all `hreflang` alternates and `x-default`; Open Graph images, sitemap, robots, manifest, and icon are served without redirects.
- **Flows.** Navigation in every locale (header and phone menu), language switching that keeps the page and query, the brief with persistence across reloads, Start over, example and scene links (applied once, then removed from the URL; unknown ids ignored), copy with and without clipboard access, the phone copy bar, catalog and example search, filters, deep-linked dialogs, and installation commands.
- **Preferences.** A saved light theme is applied before `DOMContentLoaded`; corrupted saved data loads defaults; blocked storage still renders, builds requests, and switches theme in memory; no page errors.
- **Quality sweep.** For each of the 15 localized pages, in both themes, on desktop and phone: no console errors or warnings, one `h1`, no horizontal overflow, and no serious or critical axe 4.14 violations for WCAG 2.0/2.1 A and AA with reduced motion (so scroll-revealed sections are audited). Scene motifs and caption samples, which are decorative illustrations, are excluded from that audit. The sweep found and fixed two label-in-name issues (logo link and language button) and on-accent kicker contrast (3.6:1 raised to 5.1:1).
- **Showcase.** `/design-system` renders all 38 component specimens in each theme; the theme switch and the modal dialog work.
- **Page weight.** Measured on `next start` (uncompressed transfer): the home page loads about 110 KB of fonts after switching to Latin WOFF2 subsets (from about 956 KB of TrueType), other pages 47–61 KB; about 658 KB of JavaScript (about 200 KB gzip) shared across pages, with no showcase code in public pages; HTML is 23 KB gzip for the home page and 45 KB for the catalog, which embeds all 145 scenes for crawlers and the client view.
- **Visual inspection.** Screenshots of every page at 1440 px and 390 px in English, Portuguese, and Spanish were compared with the design-system guide template; mobile fixes followed for timeline ruler density and accented display headings.
- **Device sweep.** Nine Chromium device profiles (Galaxy Z Fold 280 px, iPhone SE, iPhone 15 Pro, Pixel 7, iPhone 15 Pro landscape, iPad Mini, iPad Pro 11 landscape, 1280 px laptop, 1920 px desktop) × the 15 localized pages and the showcase, with reduced motion, on `next start`: no horizontal overflow, no text box outside the viewport, and no console errors or warnings after the last fix pass.
- **Development server.** `python3 editonny.py guide` binds `localhost` and opens the browser only after Next.js reports ready, at the port it reported. Bound to `127.0.0.1`, Next.js 16.4.2 (`next dev` and `next start`) ran the proxy again on its own locale rewrite and answered `/pt-br` with a 307 to `/pt-br` and `/en` with a 307 to `/en/en-US`; with `localhost` every localized page answered 200. Vercel does not pass a hostname, so production is unaffected. Re-check this when upgrading Next.js or next-intl.
- **Independent reviews.** Five read-only Codex reviews (`gpt-6-astra`, ChatGPT authentication) covered correctness and storage; correctness and security; accessibility, phone and desktop UX, and translation quality; performance, Next.js and next-intl practice, SEO, and deployment; and a whole-change regression, security, test, and documentation pass. They reported 12 Important and 24 Minor findings and no Critical ones; every finding was fixed, each verified by a test that failed first, except the Open Graph font trace (verified by inspecting the route's trace file) and documentation corrections. Fixes include persistence when storage writes fail, URL-synchronized search, dialog clipboard fallbacks, the phone language list, Open Graph 404s, keyboard and screen-reader semantics for radio groups and previews, copy feedback inside dialogs, a one-year language cookie, per-page `x-default`, per-page client translations, pausing decorative animation off screen, example search by format and visual style, and the restored installation answers. Not adopted: a Content-Security-Policy, because a nonce policy would make every page dynamic and a static `'unsafe-inline'` policy adds little to a site that renders no user-supplied HTML (frame, sniffing, referrer, and permissions headers are sent).

Limits: Chromium only; Firefox, Safari, and real devices were not tested. Vercel deployment, the production domain, and real-network performance were not exercised. Lighthouse and screen-reader passes were not run. The rebuild did not touch the engine, preview, or scenes, so their 2026-10-18 evidence stands.

## Reproduce and invalidate

```sh
npm ci --ignore-scripts
npm run build
npm run check
python3 editonny.py doctor
python3 editonny.py media status
npm run test:engine
npm run test:browser
npm run test:preview
npm run test:scenes
python3 scripts/smoke_engine.py
python3 scripts/package.py
```

`npm run test:browser` requires Playwright's Chromium (`npx playwright install chromium`); the preview and scene browser checks require agent-browser and its browser on PATH. Render checks require FFmpeg/ffprobe and may download the pinned package/browser on first use. Engine tests use the locked uv environment. Test installers with a temporary home; preserve footage, secrets, and personal installations. Inspect generated samples before removing task-owned `.work/` output.

Dependency, source, schema, asset, or interface changes invalidate the corresponding evidence and require focused verification. A structural audit or successful selected-scene test does not render every scene. Local checks do not prove Windows/Linux behavior, long-video performance, remote CI, client restart discovery, external generation, or real recording quality. Remote CI and publication must be verified separately after the push.

## Fassa Frame website preparation — 2026-10-20

Scope: shared crop-corner wordmark and paper/ink/amber/sky identity, visitor-controlled hero, all five guide pages, three locales, saved themes, assisted installation, repository/release links, social card and README badges. The old phone mockup and its unsupported performance/privacy claims were removed. The original MIT and third-party notices remain unchanged.

Observed locally on macOS:

- `npm run check`: lint and types passed; 56 Python tests, 15 Node tests, 128 Vitest tests in 20 files and 49 registered icons passed. This includes isolated installer preservation/recovery checks and the new editorial selector regression.
- Production build passed with the default Turbopack compiler. The Open Graph font is explicitly included in the deployment trace. A trial Webpack build exposed an inherited `URL` filesystem issue; the explicit font path fixes it and the static exporter builds successfully with Webpack.
- Browser coverage: all 172 applicable scenarios covered by the full run and targeted repeats, with 28 conditional skips. The initial audit found contrast under a translucent stage selector; solid option surfaces fixed it without weakening the audit. The final homepage audit passed all 12 combinations of locale, theme and desktop/mobile; all 10 homepage flow tests passed. Other pages passed the repeated complete quality audit after the shared identity changes.
- Actual Chromium screenshots inspected for desktop home and mobile home, setup, request builder, catalog and examples. HTTPS local preview returned 200. Public hosting is not inferred from this check.
- `npm audit --omit=dev`: zero known vulnerabilities on this date. Full audit retains five high development-chain entries described in `public-launch.md`; no forced downgrade.
- Gitleaks scanned 7.67 MB of prepared tracked/unignored text with no secrets found. Large binary media are outside that text scan; distribution exclusions and third-party terms remain in force.
- The static exporter generated the three-language site with the existing `/fassa-frame` base and prelaunch noindex. The export checks localized HTML and base-path assets; deployment still needs authorization and a check at the final URL.

The repository remains private. Existing release v0.1.0 and its checksum were not replaced. No client media, private project, external media generation or production deployment was part of this website revision. The original working copy under `tools/fassa-frame` was preserved.
