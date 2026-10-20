'use client';
import { useRef, useState } from 'react';
import { useInterval, useInView, useReducedMotion } from '../hooks';
import { cx, type BaseProps } from '../lib';

/**
 * Rotating headline word that blurs and slides in, inside a solid box by default. Inherits the parent font size.
 * Assistive tech reads the first word only. `interval` = milliseconds per word; `box` = box color (or text color when not boxed).
 */
export type KineticTextProps = BaseProps & { words: string[]; interval?: number; boxed?: boolean; color?: string; box?: string };

export function KineticText({ words, interval = 1800, boxed = true, color, box, className, style }: KineticTextProps) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLSpanElement>(null);
  const inView = useInView(root);
  const [index, setIndex] = useState(0);
  useInterval(() => setIndex(i => (i + 1) % words.length), words.length > 1 && !reduced && inView ? interval : null);
  return (
    <span ref={root} className={cx('ds-kinetic', className)} data-boxed={String(boxed)}
      style={{ ...(color ? { '--kinetic-color': color } : {}), ...(box ? { '--kinetic-box': box } : {}), ...style }}>
      <span className="ds-visually-hidden">{words[0] ?? ''}</span>
      {/* The key remounts the word so its entrance animation replays. */}
      <span key={index} className="ds-kinetic__word" aria-hidden="true">{words[reduced ? 0 : index] ?? ''}</span>
    </span>
  );
}
