'use client';
import { useState, type ReactNode } from 'react';
import { Button, Card, ChoiceCard, SegmentedControl, Switch, TextField } from '../../components/index';

type StyleViewProps = { image: string; toast: (message: string) => void };

const TYPES = [['Full camera', 'You fill the whole frame', 'user'], ['Split screen', 'Image on top, you below', 'rows-2'], ['Green screen', 'Background replaced behind you', 'layers']] as const;
const HOOKS = [['Bar', 'var(--font-caption-clean)'], ['All caps', 'var(--font-caption-impact)'], ['Handwritten', 'var(--font-caption-hand)'], ['Neon', 'var(--font-caption-clean)']] as const;
const CAPTIONS = [['Word by word', 'var(--font-caption-clean)'], ['Impact', 'var(--font-caption-impact)'], ['Marker', 'var(--font-caption-marker)'], ['Subtle', 'var(--font-sans)']] as const;
const MUSIC = [['Calm', 'breathes with the speech'], ['Calm beat', 'light lo-fi'], ['Upbeat', 'energy for tips'], ['No track', 'voice only']] as const;
// Caption accent presets use palette tokens; the rendered video receives the resolved color.
const ACCENTS = [['Sun', '--sun-400'], ['Orange', '--orange-500'], ['White', '--white'], ['Volt', '--volt-400'], ['Sky', '--sky-400']] as const;
const ELEMENTS = [['Captions', true], ['Opening hook', true], ['Motion animations', true], ['End call to action', false]] as const;

function Section({ n, title, sub, children }: { n: string; title: string; sub: string; children: ReactNode }) {
  return (
    <section className="tpl-style__section">
      <header className="tpl-style__head"><span className="tpl-style__number">{n}</span><div><h3>{title}</h3><p>{sub}</p></div></header>
      {children}
    </section>
  );
}

function Thumbs({ label, list, selected, caption, onPick }: { label: string; list: ReadonlyArray<readonly [string, string]>; selected: number; caption?: boolean; onPick: (index: number) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="tpl-style__grid">
      {list.map(([name, font], i) => (
        <ChoiceCard key={name} selected={selected === i} title={caption ? undefined : name} label={caption ? name : undefined} onSelect={() => onPick(i)}
          media={<div className="tpl-style__media">
            <div className="tpl-style__thumb" data-on={String(selected === i)} style={{ '--thumb-font': font }}>{caption ? 'every word' : name}</div>
            {caption && <div className="tpl-style__media-label">{name}</div>}
          </div>} />
      ))}
    </div>
  );
}

/** Style step: edit type, accent color, hook, captions, elements, and music, with a live 9:16 sample and summary. */
export function StyleView({ image, toast }: StyleViewProps) {
  const [type, setType] = useState(0);
  const [accent, setAccent] = useState<string>(ACCENTS[0][1]);
  const [hook, setHook] = useState('Nobody told you this about coffee');
  const [hookStyle, setHookStyle] = useState(0);
  const [caption, setCaption] = useState(0);
  const [music, setMusic] = useState(1);
  const [view, setView] = useState('hook');
  const summary = [['Type', TYPES[type]![0]], ['Accent', ACCENTS.find(a => a[1] === accent)?.[0] ?? ''], ['Hook', HOOKS[hookStyle]![0]], ['Caption', CAPTIONS[caption]![0]], ['Track', MUSIC[music]![0]]];
  return (
    <div className="tpl-style" style={{ '--accent-pick': `var(${accent})` }}>
      <div>
        <Section n="1" title="Edit type" sub="How you appear on screen.">
          <div role="radiogroup" aria-label="Edit type" className="tpl-style__grid">
            {TYPES.map(([title, description, icon], i) => <ChoiceCard key={title} icon={icon} title={title} description={description} selected={type === i} onSelect={() => setType(i)} />)}
          </div>
        </Section>
        <Section n="2" title="Accent color" sub="Used in captions, the hook, and the call to action.">
          <div className="tpl-style__accent">
            <span className="tpl-style__swatch" style={{ background: `var(${accent})` }} />
            <code className="tpl-style__code">{`var(${accent})`}</code>
            <div className="tpl-style__swatches" role="radiogroup" aria-label="Accent presets">
              {ACCENTS.map(([label, token]) => <button key={token} type="button" role="radio" className="tpl-style__preset" aria-label={label} aria-checked={token === accent} style={{ background: `var(${token})` }} onClick={() => setAccent(token)} />)}
            </div>
          </div>
        </Section>
        <Section n="3" title="Hook" sub="The sentence shown in the first seconds.">
          <TextField label="Hook text" counter={90} value={hook} help="Leave empty for the agent to suggest one." onChange={event => setHook(event.target.value)} className="tpl-style__field" />
          <Thumbs label="Hook style" list={HOOKS} selected={hookStyle} onPick={i => { setHookStyle(i); setView('hook'); }} />
        </Section>
        <Section n="4" title="Captions" sub="Made for people watching without sound.">
          <Thumbs label="Caption style" list={CAPTIONS} selected={caption} caption onPick={i => { setCaption(i); setView('caption'); }} />
        </Section>
        <Section n="5" title="Elements" sub="Turn on only what fits your video.">
          <div className="tpl-style__switches">{ELEMENTS.map(([label, checked]) => <Switch key={label} label={label} checked={checked} />)}</div>
        </Section>
        <Section n="6" title="Background music" sub="Choose the mood. The track comes from your library.">
          <div role="radiogroup" aria-label="Background music" className="tpl-style__grid">
            {MUSIC.map(([title, description], i) => <ChoiceCard key={title} icon={i === 3 ? 'volume-x' : 'music'} title={title} description={description} selected={music === i} onSelect={() => setMusic(i)} />)}
          </div>
        </Section>
      </div>
      <aside className="tpl-style__aside">
        <Card padding="var(--space-3-5)" radius="lg">
          <SegmentedControl size="sm" label="Sample" value={view} options={[{ value: 'hook', label: 'Hook' }, { value: 'caption', label: 'Caption' }]} onChange={setView} className="tpl-style__tabs" />
          <div className="tpl-sample__frame">
            {/* eslint-disable-next-line @next/next/no-img-element -- showcase template, decorative still */}
            <img src={image} alt="" />
            <div className="tpl-sample__protect" />
            <div className="tpl-sample__overlay" data-view={view} data-hook={String(hookStyle)}>
              {view === 'hook'
                ? <div className="tpl-sample__hook" style={{ '--hook-font': HOOKS[hookStyle]![1] }}><span>{hook || 'Your hook here'}</span></div>
                : <div className="tpl-sample__caption" style={{ '--caption-font': CAPTIONS[caption]![1] }}>every <span>word</span></div>}
            </div>
          </div>
          <p className="tpl-note tpl-center">Approximate sample. The final render comes from the agent.</p>
        </Card>
        <Card padding="var(--space-4)" radius="lg">
          <dl className="tpl-style__summary">{summary.map(([key, value]) => <div key={key} style={{ display: 'contents' }}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
          <Button block onClick={() => toast('Style saved. The agent will render the final.')}>Save style</Button>
        </Card>
      </aside>
    </div>
  );
}
