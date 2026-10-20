'use client';
import { Fragment, useRef, useState } from 'react';
import { useInterval, useInView, useReducedMotion } from '../hooks';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Word-by-word social caption (karaoke style): upcoming words dim and the active word pops inside a solid
 * highlight box. Sits over footage, so its colors do not change with the theme.
 * `wps` = words per second; `font` takes any `--font-caption-*` token.
 */
export type KineticCaptionProps = BaseProps & {
  text?: string;
  wps?: number;
  highlight?: string;
  font?: string;
  size?: number;
  uppercase?: boolean;
  playing?: boolean;
  loop?: boolean;
  align?: 'center' | 'left';
};

export function KineticCaption({ text = 'Every word on time', wps = 2.6, highlight = 'var(--caption-highlight)', font = 'var(--font-caption-clean)', size = 30, uppercase = true, playing = true, loop = true, align = 'center', className, style }: KineticCaptionProps = {}) {
  const words = text.split(' ');
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const [index, setIndex] = useState(0);
  useInterval(() => setIndex(i => (i + 1 >= words.length + 2 ? (loop ? 0 : i) : i + 1)), playing && !reduced && inView ? 1000 / wps : null);
  const active = reduced ? words.length : index;
  return (
    <div ref={root} className={cx('ds-caption', className)} role="img" aria-label={text} data-align={align} data-uppercase={flag(uppercase)}
      style={{ '--caption-size': `${size}px`, '--caption-font': font, '--caption-box': highlight, ...style }}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="ds-caption__word" data-state={i === active ? 'on' : i < active ? 'seen' : 'next'}>{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </div>
  );
}
