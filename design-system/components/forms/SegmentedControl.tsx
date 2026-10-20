'use client';
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/** `dot` = pulsing "awaiting you" marker. */
export type SegmentOption = { value: string; label: string; dot?: boolean };

/**
 * Single-choice pill group with a spring-animated sliding indicator (`glass` or solid orange `solid`).
 * Exposed as a radio group with one Tab stop and arrow keys; the consumer owns `value`.
 */
export type SegmentedControlProps = BaseProps & {
  options: Array<string | SegmentOption>;
  value: string;
  size?: 'sm' | 'md';
  tone?: 'glass' | 'solid';
  label?: string;
  onChange?: (value: string) => void;
};

const KEYS: Record<string, (index: number, last: number) => number> = {
  ArrowRight: i => i + 1, ArrowDown: i => i + 1, ArrowLeft: i => i - 1, ArrowUp: i => i - 1, Home: () => 0, End: (_, last) => last,
};

export function SegmentedControl({ options, value, size = 'md', tone = 'glass', label, onChange, className, style }: SegmentedControlProps) {
  const items = options.map(option => typeof option === 'string' ? { value: option, label: option, dot: false } : option);
  const root = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const measure = () => {
      const current = node.querySelector<HTMLElement>('[aria-checked="true"]');
      if (current?.offsetWidth) setIndicator({ left: current.offsetLeft, width: current.offsetWidth });
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, options]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = [...(root.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [])];
    const index = buttons.findIndex(button => button === document.activeElement);
    const move = KEYS[event.key];
    if (index < 0 || !move) return;
    event.preventDefault();
    const target = (move(index, buttons.length - 1) + buttons.length) % buttons.length;
    buttons[target]?.focus();
    onChange?.(items[target]!.value);
  };

  return (
    <div ref={root} role="radiogroup" className={cx('ds-segmented', className)} aria-label={label} data-size={size} data-tone={tone} data-ready={flag(indicator)} onKeyDown={onKeyDown}
      style={{ ...(indicator ? { '--indicator-left': `${indicator.left}px`, '--indicator-width': `${indicator.width}px` } : {}), ...style }}>
      <span className="ds-segmented__indicator" aria-hidden="true" />
      {items.map(item => (
        <button key={item.value} type="button" role="radio" className="ds-segmented__option" aria-checked={item.value === value} tabIndex={item.value === value ? 0 : -1}
          data-value={item.value} onClick={() => onChange?.(item.value)}>
          {item.label}
          {item.dot && <span className="ds-segmented__dot" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}
