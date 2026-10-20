import type { ElementType, MouseEventHandler, ReactNode } from 'react';
import { Icon } from './Icon';
import { cx, flag, type BaseProps } from '../lib';

export type ButtonVariant = 'primary' | 'volt' | 'white' | 'dark' | 'glass' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Pill button with shine sweep, lift, and spring press. One `primary` per view.
 * `volt` = live/success action, `white` = on orange blocks, `glass` = on media or dark hero surfaces.
 * `label` sets an accessible name when the visible content is not enough. `href` renders a link; `as` swaps the
 * anchor for a router link component that accepts `href`.
 */
export type ButtonProps = BaseProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconRight?: string;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  href?: string | object;
  as?: ElementType;
};

const ICON_SIZE = { sm: 16, md: 18, lg: 20 } as const;

export function Button({ variant = 'primary', size = 'md', icon, iconRight, block, disabled, loading, type = 'button', label, children, onClick, href, as, className, style }: ButtonProps) {
  const iconSize = ICON_SIZE[size] ?? ICON_SIZE.md;
  const content = <>
    {loading ? <Icon name="loader" size={iconSize} className="ds-button__spinner" /> : icon && <Icon name={icon} size={iconSize + 1} />}
    {children}
    {iconRight && !loading && <Icon name={iconRight} size={iconSize} className="ds-button__icon-right" />}
  </>;
  const shared = { className: cx('ds-button', className), style, 'aria-label': label, 'data-variant': variant, 'data-size': size, 'data-block': flag(block), onClick };
  if (href !== undefined) {
    const Link = as ?? 'a';
    return <Link {...shared} href={href} aria-disabled={disabled || undefined}>{content}</Link>;
  }
  return <button {...shared} type={type} disabled={Boolean(disabled || loading)} aria-busy={loading || undefined}>{content}</button>;
}
