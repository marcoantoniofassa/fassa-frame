import { Fragment } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Infinite Anton ticker band in a solid color with an optional tilt; stack two in opposite directions for crossed tapes.
 * `speed` = seconds per loop (lower is faster); `size` = Anton font size in pixels; `rotate` in degrees.
 */
export type MarqueeProps = BaseProps & {
  items: string[];
  speed?: number;
  reverse?: boolean;
  separator?: string;
  tone?: 'orange' | 'volt' | 'black' | 'white' | 'outline';
  size?: number;
  rotate?: number;
  pauseOnHover?: boolean;
};

export function Marquee({ items, speed = 30, reverse, separator = '✦', tone = 'orange', size = 64, rotate = 0, pauseOnHover = true, className, style }: MarqueeProps) {
  const run = (hidden: boolean) => (
    <span className="ds-marquee__run" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="ds-marquee__item">{item}</span>
          <span className="ds-marquee__sep" aria-hidden="true">{separator}</span>
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className={cx('ds-marquee', className)} data-tone={tone} data-reverse={flag(reverse)} data-pause={flag(pauseOnHover)} data-rotated={flag(rotate)}
      style={{ '--marquee-size': `${size}px`, '--marquee-speed': `${speed}s`, '--marquee-rotate': `${rotate}deg`, ...style }}>
      <div className="ds-marquee__track">{run(false)}{run(true)}</div>
    </div>
  );
}
