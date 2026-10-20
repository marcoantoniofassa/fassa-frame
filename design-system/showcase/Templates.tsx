'use client';
import type { ReactNode } from 'react';
import { PreviewApp } from '../templates/preview/PreviewApp';
import { Section } from './kit';

export type GuideLink = { label: string; href: string };

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="sc-frame">
      <figcaption className="sc-frame__bar"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />{title}</figcaption>
      <div className="sc-frame__viewport" tabIndex={0} role="region" aria-label={`${title} template`}>{children}</div>
    </figure>
  );
}

/** The edit preview template (Cut, Style, Final) and links to the live guide, which is the guide template now. */
export const TemplatesSection = ({ image, guide }: { image: string; guide: GuideLink[] }) => (
  <Section id="templates" title="Templates" lead="Composition patterns ported from the UI kits. The guide is the live site; the edit preview runs inside each frame." render={theme => <>
    <nav className="sc-links" aria-label={`Live guide pages, ${theme} theme`}>
      <ul>{guide.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
    </nav>
    <Frame title={`Edit preview (${theme} theme) — cut, style, final`}><PreviewApp image={image} /></Frame>
  </>} />
);

const GUIDELINES = ['colors-orange', 'colors-ink', 'colors-fog', 'colors-accents', 'colors-blocks', 'colors-semantic', 'gradients', 'type-display', 'type-headings', 'type-body', 'type-mono', 'type-kinetic', 'type-captions', 'spacing-scale', 'radii', 'shadows', 'effects', 'motion-easing', 'motion-durations', 'motion-keyframes', 'brand-wordmark', 'brand-assets', 'brand-imagery', 'icons'];
const CARDS = ['core', 'forms', 'content', 'feedback', 'editor', 'motion', 'site'];

/** Where the frozen reference HTML from the original export lives in the repository. */
export const ReferenceSection = () => (
  <section className="sc-section" id="reference" aria-labelledby="reference-title">
    <header className="sc-section__head">
      <h2 id="reference-title">Reference HTML</h2>
      <p>Frozen pages from the original export, kept in the repository for visual comparison. Open them from disk; they load React and Babel from unpkg, so they need a network connection. The library above does not.</p>
    </header>
    <div className="sc-links">
      <div><h3>UI kits</h3><ul><li><code>design-system/reference/ui_kits/guia/index.html</code></li><li><code>design-system/reference/ui_kits/preview/index.html</code></li></ul></div>
      <div><h3>Component cards</h3><ul>{CARDS.map(name => <li key={name}><code>{`reference/components/${name}/${name}.card.html`}</code></li>)}</ul></div>
      <div><h3>Guideline cards</h3><ul className="sc-links__grid">{GUIDELINES.map(name => <li key={name}><code>{`reference/guidelines/${name}.card.html`}</code></li>)}</ul></div>
    </div>
  </section>
);
