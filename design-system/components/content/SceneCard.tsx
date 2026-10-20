import type { ElementType, ReactNode } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Motif identifiers keep the original export names: tarja = highlight bar, contador = counter, passos = steps,
 * antes = before/after, seta = call-to-action arrow, confete = confetti, chat = chat, zoom = emphasis zoom.
 */
export type SceneMotif = 'tarja' | 'contador' | 'passos' | 'antes' | 'seta' | 'confete' | 'chat' | 'zoom';

/** Words drawn inside the schematic previews and the hover hint. */
export type SceneCardLabels = { before: string; after: string; cta: string; cheer: string; zoom: string; chat: [string, string, string]; hint: string };

/**
 * Motion catalog entry: a solid thumbnail with a looping schematic preview (not a render) that plays on hover.
 * `href` renders a link; `as` swaps the anchor for a router link component that accepts `href`.
 */
export type SceneCardProps = BaseProps & {
  name: string;
  group: string;
  when?: string;
  duration?: number | null;
  format?: string | null;
  motif?: SceneMotif;
  bg?: 'orange' | 'black' | 'volt' | 'fire';
  autoplay?: boolean;
  labels?: Partial<SceneCardLabels>;
  onClick?: () => void;
  href?: string | object;
  as?: ElementType;
};

const DEFAULT_LABELS: SceneCardLabels = {
  before: 'BEFORE', after: 'AFTER', cta: 'Tap here', cheer: 'NAILED IT!', zoom: 'ZOOM',
  chat: ['How do I edit this?', 'I cut the pauses and add captions.', 'Perfect!'], hint: '▶ HOVER TO PLAY',
};

const at = (i: number) => ({ '--i': String(i) });

const MOTIFS: Record<SceneMotif, (name: string, labels: SceneCardLabels) => ReactNode> = {
  contador: () => <div className="ds-motif ds-motif--counter">{[40, 55, 70, 100].map((height, i) => <span key={i} style={{ ...at(i), '--h': `${height}%` }} />)}<b>$+</b></div>,
  passos: () => <div className="ds-motif ds-motif--steps">{['01', '02', '03'].map((n, i) => <span key={n} style={at(i)}>{n}<i /></span>)}</div>,
  antes: (_, l) => <div className="ds-motif ds-motif--before"><span>{l.before}</span><span className="ds-motif__after">{l.after}</span></div>,
  seta: (_, l) => <div className="ds-motif ds-motif--arrow"><span className="ds-motif__arrow">↓</span><span className="ds-motif__cta">{l.cta}</span></div>,
  confete: (_, l) => <div className="ds-motif ds-motif--confetti">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ ...at(i), '--x': `${i * 6.2 + 3}%`, '--d': `${1.6 + (i % 5) * 0.3}s` }} />)}<b>{l.cheer}</b></div>,
  chat: (_, l) => <div className="ds-motif ds-motif--chat">{l.chat.map((text, i) => <span key={i} style={at(i)} data-mine={String(i !== 1)}>{text}</span>)}</div>,
  zoom: (_, l) => <div className="ds-motif ds-motif--zoom">{l.zoom}</div>,
  tarja: name => <div className="ds-motif ds-motif--highlight"><span className="ds-motif__sweep" aria-hidden="true" /><span>{name}</span></div>,
};

export function SceneCard({ name, group, when, duration, format = '9:16', motif = 'tarja', bg = 'orange', autoplay, labels, onClick, href, as, className, style }: SceneCardProps) {
  const words = { ...DEFAULT_LABELS, ...labels };
  // Links and buttons only when the card does something; illustrative previews stay out of the Tab order.
  const Root = href !== undefined ? as ?? 'a' : onClick ? 'button' : 'div';
  const rootProps = href !== undefined ? { href } : onClick ? { type: 'button' as const } : {};
  return (
    <Root {...rootProps} className={cx('ds-scene', className)} style={style} data-autoplay={flag(autoplay)} onClick={onClick}>
      <div className="ds-scene__thumb" data-bg={bg}>
        <div className="ds-scene__motif" aria-hidden="true">{(MOTIFS[motif] ?? MOTIFS.tarja)(name, words)}</div>
        <span className="ds-scene__group">{group}</span>
        <span className="ds-scene__format">{`${format ?? '9:16'}${duration ? ` · ${duration}s` : ''}`}</span>
        <span className="ds-scene__hint" aria-hidden="true">{words.hint}</span>
      </div>
      <div className="ds-scene__body">
        <div className="ds-scene__name">{name}</div>
        {when && <div className="ds-scene__when">{when}</div>}
      </div>
    </Root>
  );
}
