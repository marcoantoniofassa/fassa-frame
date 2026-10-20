'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Scroll-in wrapper: blur, slide up, and fade the first time content enters the viewport. Stagger siblings with `delay`.
 * `delay` in milliseconds; `y` = start offset in pixels. Content stays visible without JavaScript (see motion.css).
 */
export type RevealProps = BaseProps & { children: ReactNode; delay?: number; y?: number; as?: 'div' | 'section' | 'li' | 'span' | 'article' };

export function Reveal({ children, delay = 0, y = 28, as: Tag = 'div', className, style }: RevealProps) {
  const node = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = node.current;
    if (!element || typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <Tag ref={node as never} className={cx('ds-reveal', className)} data-visible={flag(visible)} style={{ '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px`, ...style }}>
      {children}
    </Tag>
  );
}
