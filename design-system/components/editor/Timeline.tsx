import type { KeyboardEvent, MouseEvent } from 'react';
import { barHeights } from './Waveform';
import { clamp, cx, flag, type BaseProps } from '../lib';

/** `beat` labels the story beat ("Hook"). */
export type TimelineSegment = { start: number; end: number; beat: string; quote: string };
export type TimelineMark = { start: number; end: number; note?: string };

/**
 * Review timeline: ruler, beat segments (the current one fills orange and lifts), waveform that dances while playing,
 * volt-hatched marks, and a glowing playhead. Times are seconds. With `onSeek`, it is a keyboard-operable slider.
 */
export type TimelineProps = BaseProps & {
  segments: TimelineSegment[];
  duration: number;
  playhead?: number;
  marks?: TimelineMark[];
  playing?: boolean;
  label?: string;
  onSeek?: (seconds: number) => void;
};

const clock = (t: number) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.round(t % 60)).padStart(2, '0')}`;
const BARS = barHeights(96, 1.7, 0.37, 22);
const STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, PageDown: -5, PageUp: 5 };

export function Timeline({ segments, duration = 45, playhead = 0, marks = [], playing, label = 'Timeline', onSeek, className, style }: TimelineProps) {
  const pct = (t: number) => `${(t / duration) * 100}%`;
  const ticks: number[] = [];
  for (let t = 0; t <= duration; t += duration > 60 ? 10 : 5) ticks.push(t);
  const slider = onSeek ? {
    role: 'slider', tabIndex: 0, 'aria-label': label, 'aria-valuemin': 0, 'aria-valuemax': duration,
    'aria-valuenow': Math.round(playhead * 10) / 10, 'aria-valuetext': clock(playhead),
    onClick: (event: MouseEvent<HTMLDivElement>) => {
      const box = event.currentTarget.getBoundingClientRect();
      onSeek(clamp(((event.clientX - box.left) / box.width) * duration, 0, duration));
    },
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      const step = STEPS[event.key];
      if (step === undefined) return;
      event.preventDefault();
      onSeek(clamp(playhead + step, 0, duration));
    },
  } : {};
  return (
    <div {...slider} className={cx('ds-timeline', className)} style={style} data-playing={flag(playing)} data-seekable={flag(onSeek)}>
      <div className="ds-timeline__ruler" aria-hidden="true">
        {ticks.map(t => <span key={t} style={{ '--left': pct(t) }} data-end={flag(t === duration)}>{clock(t)}</span>)}
      </div>
      <div className="ds-timeline__segments">
        {segments.map(segment => (
          <div key={`${segment.start}-${segment.beat}`} className="ds-timeline__segment" data-current={String(playhead >= segment.start && playhead < segment.end)}
            style={{ '--left': pct(segment.start), '--width': pct(segment.end - segment.start) }}>
            <span className="ds-timeline__beat">{segment.beat}</span>
            <span className="ds-timeline__quote">{segment.quote}</span>
          </div>
        ))}
      </div>
      <div className="ds-timeline__wave" aria-hidden="true">
        {BARS.map((height, i) => <span key={i} data-past={String((i / BARS.length) * duration < playhead)} style={{ '--h': `${Math.min(100, height)}%`, '--d': `${0.8 + (i % 5) * 0.12}s`, '--delay': `${(i % 7) * 0.05}s` }} />)}
      </div>
      {marks.map((mark, i) => (
        <div key={i} className="ds-timeline__mark" title={mark.note} style={{ '--left': pct(mark.start), '--width': pct(mark.end - mark.start) }}><span>{i + 1}</span></div>
      ))}
      <div className="ds-timeline__playhead" aria-hidden="true" style={{ '--left': pct(playhead) }}>
        <span className="ds-timeline__needle" />
        <span className="ds-timeline__grip" />
      </div>
    </div>
  );
}
