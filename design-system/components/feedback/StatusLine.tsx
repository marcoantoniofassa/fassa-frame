import { cx, type BaseProps } from '../lib';

export type StatusState = 'idle' | 'working' | 'awaiting' | 'offline' | 'done';

/**
 * Agent status strip under the preview top bar: pulsing state dot, solid badge ("Your turn"), shimmer while working,
 * and an optional fire progress bar (`progress` 0–1).
 */
export type StatusLineProps = BaseProps & { state?: StatusState; text: string; meta?: string; badge?: string; progress?: number };

export function StatusLine({ state = 'awaiting', text, meta, badge, progress, className, style }: StatusLineProps) {
  return (
    <div className={cx('ds-status', className)} style={style} role="status" data-state={state}>
      {state === 'working' && <span className="ds-status__shimmer" aria-hidden="true" />}
      <span className="ds-status__dot" aria-hidden="true" />
      {badge && <span className="ds-status__badge">{badge}</span>}
      <span className="ds-status__text">{text}</span>
      {meta && <span className="ds-status__meta">{meta}</span>}
      {typeof progress === 'number' && <span className="ds-status__progress" aria-hidden="true" style={{ '--progress': `${Math.max(0, Math.min(1, progress)) * 100}%` }} />}
    </div>
  );
}
