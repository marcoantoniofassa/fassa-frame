import type { MouseEventHandler, ReactNode } from 'react';
import { cx, type BaseProps } from '../lib';

/**
 * Pill toggle for filter rows, chapter scrubbers, and option pickers: outline when idle, solid when selected.
 * The consumer owns selection through `selected`. `font` overrides the family, e.g. a caption font preview token.
 */
export type ChipProps = BaseProps & {
  selected?: boolean;
  tone?: 'white' | 'orange' | 'sun';
  count?: number | string;
  size?: 'sm' | 'md';
  font?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export function Chip({ selected = false, tone = 'white', count, size = 'md', font, disabled, onClick, children, className, style }: ChipProps) {
  return (
    <button type="button" className={cx('ds-chip', className)} aria-pressed={selected} disabled={disabled} onClick={onClick}
      data-tone={tone} data-size={size} style={{ ...(font ? { '--chip-font': font } : {}), ...style }}>
      {children}
      {count !== undefined && count !== null && <>{' '}<span className="ds-chip__count">{count}</span></>}
    </button>
  );
}
