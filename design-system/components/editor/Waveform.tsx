import { cx, flag, type BaseProps } from '../lib';

/**
 * Animated audio bars. Bars breathe while `playing`; `cuts` (0–1 ranges) flatten removed silences in red;
 * `progress` (0–1) splits played and unplayed bars. Decorative: pair it with a text description.
 */
export type WaveformProps = BaseProps & {
  bars?: number;
  height?: number;
  playing?: boolean;
  color?: string;
  muted?: string;
  progress?: number;
  cuts?: Array<[number, number]>;
};

/** Deterministic bar heights shared by Waveform and Timeline. */
export const barHeights = (count: number, a = 1.3, b = 0.41, floor = 18): number[] =>
  Array.from({ length: count }, (_, i) => floor + Math.abs(Math.sin(i * a) * 52 + Math.sin(i * b) * 28));

export function Waveform({ bars = 48, height = 64, playing = true, color, muted, progress, cuts = [], className, style }: WaveformProps = {}) {
  return (
    <div className={cx('ds-wave', className)} aria-hidden="true" data-playing={flag(playing)}
      style={{ '--wave-height': `${height}px`, ...(color ? { '--wave-color': color } : {}), ...(muted ? { '--wave-muted': muted } : {}), ...style }}>
      {barHeights(bars).map((bar, i) => {
        const x = i / bars;
        const cut = cuts.some(([from, to]) => x >= from && x < to);
        const done = typeof progress === 'number' ? x < progress : true;
        return <span key={i} data-cut={flag(cut)} data-done={flag(done)} style={{ '--h': `${cut ? 8 : bar}%`, '--d': `${0.7 + (i % 6) * 0.13}s`, '--delay': `${(i % 9) * 0.06}s` }} />;
      })}
    </div>
  );
}
