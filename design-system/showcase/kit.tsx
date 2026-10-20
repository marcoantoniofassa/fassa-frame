'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';

/**
 * Shows a forced interaction state (hover, active, focus) on the first child, or on `selector` inside it, without user
 * input. `attribute` names another data attribute to set instead of `data-force`.
 */
export function Force({ value, selector, attribute = 'force', children }: { value: string; selector?: string; attribute?: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const first = ref.current?.firstElementChild;
    const target = selector ? first?.querySelector(selector) : first;
    if (target instanceof HTMLElement || target instanceof SVGElement) target.dataset[attribute] = value;
  }, [value, selector, attribute]);
  return <span ref={ref} style={{ display: 'contents' }}>{children}</span>;
}

/** One labeled state cell. */
export const State = ({ label, children }: { label: string; children: ReactNode }) => (
  <figure className="sc-state"><div className="sc-state__stage">{children}</div><figcaption>{label}</figcaption></figure>
);

/** A row of states for one variant. */
export const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="sc-row"><div className="sc-row__label">{label}</div><div className="sc-row__items">{children}</div></div>
);

export const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Component specimen: name, purpose, and its rows. */
export const Specimen = ({ name, description, theme, children }: { name: string; description: string; theme: Theme; children: ReactNode }) => (
  <article className="sc-specimen" id={`${theme}-${slug(name)}`}>
    <header className="sc-specimen__head"><h3>{name}</h3><p>{description}</p></header>
    {children}
  </article>
);

/** A dark media backdrop for components designed to sit over footage. */
export const OnMedia = ({ children }: { children: ReactNode }) => <div className="sc-media" data-surface="media">{children}</div>;

/** Render a library section once per theme so both can be compared. */
export const Section = ({ id, title, lead, render }: { id: string; title: string; lead: string; render: (theme: Theme) => ReactNode }) => (
  <section className="sc-section" id={id} aria-labelledby={`${id}-title`}>
    <header className="sc-section__head"><h2 id={`${id}-title`}>{title}</h2><p>{lead}</p></header>
    {(['dark', 'light'] as const).map(theme => (
      <div key={theme} className="sc-pane" data-theme={theme} aria-label={`${title}, ${theme} theme`} role="group">
        <p className="sc-pane__label">{`${theme === 'dark' ? 'Dark studio' : 'Light paper'} theme`}</p>
        {render(theme)}
      </div>
    ))}
  </section>
);
