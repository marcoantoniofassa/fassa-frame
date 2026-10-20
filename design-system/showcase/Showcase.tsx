'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { SegmentedControl, Wordmark } from '../components/index';
import '../templates/templates.css';
import './showcase.css';
import { ContentSection, FeedbackSection } from './ContentFeedback';
import { CoreSection, FormsSection } from './CoreForms';
import { EditorSection, MotionSection, SiteSection, type ShowcaseAssets } from './StudioSite';
import { ReferenceSection, TemplatesSection, type GuideLink } from './Templates';
import { Tokens } from './Tokens';

const NAV = [['tokens', 'Tokens'], ['core', 'Core'], ['forms', 'Forms'], ['content', 'Content'], ['feedback', 'Feedback'], ['editor', 'Editor'], ['motion', 'Motion'], ['site', 'Site'], ['templates', 'Templates'], ['reference', 'Reference']];
const SHOWS = ['both', 'dark', 'light'] as const;
type Show = typeof SHOWS[number];
const KEY = 'editonny-ds-theme';

const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
// Holds the choice when storage is blocked or full, so the switch still works until reload.
let memory: Show = 'both';
let unsaved = false;

function readShow(): Show {
  if (unsaved) return memory;
  try {
    const saved = localStorage.getItem(KEY);
    return SHOWS.includes(saved as Show) ? saved as Show : memory;
  } catch {
    return memory;
  }
}

export type ShowcaseProps = ShowcaseAssets & { guide: GuideLink[] };

/** The design-system showcase: every component and state in both themes, the templates, and the token reference. */
export function Showcase({ image, photo, flags, guide }: ShowcaseProps) {
  const show = useSyncExternalStore(subscribe, readShow, () => 'both' as const);
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.show = show;
    html.dataset.theme = show === 'light' ? 'light' : 'dark';
  }, [show]);
  const pick = (value: string) => {
    memory = value as Show;
    try {
      localStorage.setItem(KEY, value);
      unsaved = false;
    } catch {
      unsaved = true;
    }
    listeners.forEach(listener => listener());
  };
  return (
    <div id="showcase">
      <header className="sc-header">
        <div className="sc-header__brand"><Wordmark size={22} /><span>Design system</span></div>
        <div className="sc-header__controls">
          <span className="sc-header__label" id="theme-label">Theme</span>
          <SegmentedControl size="sm" label="Theme" value={show} options={[{ value: 'both', label: 'Both' }, { value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]} onChange={pick} />
        </div>
      </header>
      <div className="sc-layout">
        <nav className="sc-nav" aria-label="Library sections"><ul>{NAV.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul></nav>
        <main className="sc-main" id="sc-main" tabIndex={-1}>
          <div className="sc-intro">
            <h1>Fassa Frame design system</h1>
            <p>38 components, their states, composition templates, and tokens in the dark studio and light paper themes. Every value comes from DESIGN.md; pages import from @editonny/design-system.</p>
          </div>
          <Tokens />
          <CoreSection />
          <FormsSection />
          <ContentSection image={image} />
          <FeedbackSection />
          <EditorSection />
          <MotionSection />
          <SiteSection assets={{ image, photo, flags }} />
          <TemplatesSection image={image} guide={guide} />
          <ReferenceSection />
        </main>
      </div>
    </div>
  );
}
