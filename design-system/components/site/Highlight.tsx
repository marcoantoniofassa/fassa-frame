import type { ReactNode } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Solid block behind the key phrase of a headline; wraps across lines. One highlight per headline.
 * `orange` default, `volt` for lab/tech sections, `white` for the offer headline (with `nowrap`), `sun`.
 */
export type HighlightProps = BaseProps & { tone?: 'orange' | 'volt' | 'white' | 'sun'; nowrap?: boolean; children: ReactNode };

export function Highlight({ tone = 'orange', nowrap, children, className, style }: HighlightProps) {
  return <span className={cx('ds-highlight', className)} style={style} data-tone={tone} data-nowrap={flag(nowrap)}>{children}</span>;
}
