'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { cx, type BaseProps } from '../lib';

/**
 * Number that counts up with expo easing the first time it scrolls into view. Style it with Anton for stat rows.
 * The server render shows the final value. `duration` in milliseconds.
 */
export type CounterProps = BaseProps & { value: number; duration?: number; prefix?: string; suffix?: string; decimals?: number };

export function Counter({ value = 100, duration = 1600, prefix = '', suffix = '', decimals = 0, className, style }: CounterProps) {
  const [shown, setShown] = useState(value);
  const node = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const element = node.current;
    if (!element || typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    setShown(0);
    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setShown(p < 1 ? value * (1 - Math.pow(2, -10 * p)) : value);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);
  const label = `${prefix}${value.toFixed(decimals)}${suffix}`;
  return <span ref={node} className={cx('ds-counter', className)} style={style} aria-label={label}>{`${prefix}${shown.toFixed(decimals)}${suffix}`}</span>;
}
