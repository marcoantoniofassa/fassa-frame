import type { ReactNode } from 'react';
import { cx, flag, type BaseProps } from '../lib';

export type BadgeTone = 'neutral' | 'solid' | 'accent' | 'volt' | 'soft' | 'success' | 'warning' | 'danger' | 'rec';

/** Pill for durations, formats, and status. `mono` for timecodes and formats; `live` adds a pulsing dot. */
export type BadgeProps = BaseProps & { tone?: BadgeTone; mono?: boolean; live?: boolean; children: ReactNode };

export function Badge({ tone = 'neutral', mono, live, children, className, style }: BadgeProps) {
  return (
    <span className={cx('ds-badge', className)} style={style} data-tone={tone} data-mono={flag(mono)}>
      {live && <span className="ds-badge__live" aria-hidden="true" />}
      {children}
    </span>
  );
}
