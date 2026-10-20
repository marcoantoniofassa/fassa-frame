# Guide interface

Sources: `web/src/app/`, `web/src/components/`, `web/src/features/`, `web/messages/`, `web/content/`, and the design-system components they use. Reviewed on 2026-10-19; CSS, markup, content, and interaction changes require verification of affected states.

## Visual language

The guide uses the design system's dark studio theme by default: ink surfaces, fog text, an orange accent, volt highlights, Figtree for text, and Anton for kinetic display type. A header toggle switches to the light paper theme and remembers the choice. The home page combines an aurora hero with a 9:16 phone mockup, crossed marquee tapes, live counters, a bento of editing demos, a how-it-works sequence, starting points, and an orange call to action. The phone, demos, and scene previews are illustrations of a workflow; they are neither rendered videos nor players.

Every color, font family, size, spacing, and radius comes from [`DESIGN.md`](../DESIGN.md) tokens through `@editonny/design-system/styles.css`; page layouts use CSS Modules that the `design/tokens` lint rule checks, and TypeScript rejects raw hex, pixel, and font literals. Components come from the library; the page-level compositions were ported from the export's guide template, which the app replaced.

The interface is available in English (`/en`), Brazilian Portuguese (`/pt-br`), and Spanish (`/es`), chosen from the browser on the first visit and changeable from the header. Primary navigation covers Home, Create a request, Catalog, Examples, and Install; below 1100 px the links move into a menu dialog. Layouts are verified at 1440 px and on a Pixel 7 viewport without horizontal overflow, including very long unbroken input.

## Interaction and accessibility

- Each page has one `h1`, a skip link to `main`, landmarks, and visible focus. Active links use `aria-current`.
- Fields have labels and descriptions; format and agent choices are radio groups with arrow-key movement; categories use native selects.
- Scene and example dialogs use the native `<dialog>`: accessible names, Escape and backdrop closing, focus return, and a URL parameter so the view can be shared; Back closes a dialog opened in the page.
- Copy success is announced in a polite live region; without clipboard access the request text is selected and an alert explains manual copying. On phones a sticky copy bar appears while the request card is out of view.
- Reduced motion stops loops and shows revealed content immediately; without JavaScript, revealed sections stay visible.
- The logo link and language button keep their visible text inside their accessible names (WCAG 2.5.3). Text on orange surfaces uses the 78% ink token for at least 4.5:1 contrast.
- User content is rendered as text, never as HTML. The guide does not read or upload personal footage; the folder is a typed path stored only in the visitor's browser.

## Editing requests

One builder supplies custom requests, scene requests, example previews, copying, and personalization, in the interface language. Every editing request asks for contextual decisions across cuts, pauses, breaths, ambient sound, voice, music, graphics, animation, captions, framing, privacy and checks, preserving originals, meaning and approved choices.

Scope remains explicit: a caption-only correction or a specified interval does not authorize recutting unrelated content. Originals, factuality, sample review, and permission for costs/media transmission remain part of the request. Turning visual scenes off removes a selected catalog scene from the brief.

## Verification

`npm run test:browser` covers locale detection and switching, navigation, the request builder and its persistence, catalog and example dialogs, preferences under blocked or corrupted storage, and an axe WCAG 2.1 AA scan of every page in both themes on desktop and phone. Inspect screenshots of changed states as well; automated scans and still captures do not establish complete accessibility or motion correctness. Current measured results and limitations belong in [validation](validation.md).

## Design system boundary

New interface work comes from `@editonny/design-system`; its showcase runs at `/design-system` on the guide. The skill's edit preview keeps its own styles until a preview redesign is validated.

## Fassa Frame presentation

Updated 2026-10-20. The Portuguese README and public guide share paper, ink, amber and sky blue, Figtree typography and paired crop corners. The original editorial GIF is in `docs/assets/readme/`, with a static PNG alternative and reproducible source in `scripts/render-readme.py`. It illustrates a workflow; it is not a product UI recording. Its 12-second loop is confined to the README. The web hero uses a keyboard-accessible, visitor-controlled stage selector instead of autoplay.

The guide opens in light paper and preserves explicit light/dark preferences. Core navigation, examples, catalog, request building, setup and the social card use the same palette. Copy is localized in all three supported languages. Download links target the Fassa Frame release, while upstream attribution remains distinct.

README badges must identify this repository, never display upstream stars or hard-code a passing status. The GitHub workflow badge reflects the current run and follows GitHub access restrictions while the repository is private. The code-license badge describes first-party MIT code; third-party resource notices remain authoritative.

Artwork, copy, navigation or palette changes invalidate the corresponding visual verification. Public deployment requires checking the actual hosted URL separately; see `public-launch.md`.
