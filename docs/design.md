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

## README presentation

Reviewed on 2026-10-18. The three root READMEs share the guide's paper `#f4f3ed`, ink `#242721`, forest `#354935`, and lime `#d6f66b` palette. Original self-contained SVG covers and workflow panels live in `docs/assets/readme/`; their compositions reuse the site's editorial typography and studio/timeline motif. Desktop images have explicit still alternatives, and narrow viewports select readable mobile compositions. All important product instructions remain selectable Markdown text.

SVG decoration ends within 4.4 seconds. Mobile SVGs disable animation internally for reduced-motion preferences. The gallery selects PNG posters for reduced motion and otherwise plays each GIF once for approximately 4.51 seconds. Linked previews can be opened to replay them. The READMEs retain English as primary, with Portuguese and Spanish prose translations sharing English artwork.

Gallery sources are `visuals/scenes/text-chromatic.html`, `building-panel.html`, and `solar-system.html` within the portable skill. Captions use synthetic words with the scene's height and size parameters adjusted for a square excerpt; the building uses its illustrative defaults; the solar system uses the bundled `library/spinning-3d-objects/38-sun.webm`. These are silent, cropped browser renders of real scene code, not recordings of a desktop editing application. Each GIF contains 36 frames at 480×480 and approximately 8 fps. Source footage and scene templates are unchanged. Font and resource notices remain in the engine's third-party notices and asset directories.

The stars badge reads the actual public GitHub count; Star History supplies the theme-aware chart. These external images have text/link alternatives and depend on their providers. They do not represent a global popularity ranking. The plugin archive includes only the named README artwork directory in addition to its existing content.

Artwork, Markdown, package-boundary, or media-query changes invalidate the corresponding README rendering evidence in `validation.md`. Edit SVG source and its matching static/mobile alternatives together; do not add scripts, external fonts, private footage, or secrets to the artwork.
