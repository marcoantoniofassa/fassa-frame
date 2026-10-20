import type { ReactNode } from 'react';
import { cx, type BaseProps } from '../lib';

/** Mono uppercase kicker above headings, with an optional pulsing live dot or a solid index chip ("01"). */
export type EyebrowProps = BaseProps & { children: ReactNode; dot?: boolean; dotColor?: string; index?: string; color?: string };

export function Eyebrow({ children, dot, dotColor, index, color, className, style }: EyebrowProps) {
  return (
    <p className={cx('ds-eyebrow', className)} style={{ ...(color ? { '--eyebrow-color': color } : {}), ...style }}>
      {dot && <span className="ds-eyebrow__dot" aria-hidden="true" style={dotColor ? { '--live': dotColor } : undefined} />}
      {index && <span className="ds-eyebrow__index">{index}</span>}
      {children}
    </p>
  );
}
