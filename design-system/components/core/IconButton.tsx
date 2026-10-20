import type { MouseEventHandler } from 'react';
import { Icon } from './Icon';
import { cx, type BaseProps } from '../lib';

export type IconButtonVariant = 'tile' | 'glass' | 'accent' | 'volt' | 'ghost';

/**
 * Icon-only button with spring scale. `tile` = editor tool, `glass` = circle over media,
 * `accent` = orange play, `volt` = confirm, `ghost` = toolbar. `active` = tool on.
 */
export type IconButtonProps = BaseProps & {
  icon: string;
  label: string;
  variant?: IconButtonVariant;
  size?: number;
  active?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
};

export function IconButton({ icon, label, variant = 'tile', size = 44, active, disabled, type = 'button', onClick, className, style, ...aria }: IconButtonProps) {
  const round = variant === 'glass' || variant === 'accent' || variant === 'volt';
  return (
    <button type={type} className={cx('ds-icon-button', className)} aria-label={label} title={label} disabled={Boolean(disabled)} onClick={onClick}
      aria-pressed={active} data-variant={variant} data-shape={round ? 'round' : size >= 56 ? 'large' : 'square'}
      style={{ '--ib-size': `${size}px`, ...style }} {...aria}>
      <Icon name={icon} size={Math.round(size * 0.44)} />
    </button>
  );
}
