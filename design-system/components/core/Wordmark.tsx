import { cx, flag, type BaseProps } from '../lib';

/**
 * The Fassa Frame wordmark: paired crop corners and a lowercase name.
 * `dark` adapts to the current theme surface, `light` forces the on-white colors, `orange` sits on an orange block.
 */
export type WordmarkProps = BaseProps & { size?: number; tone?: 'dark' | 'light' | 'orange'; iconOnly?: boolean; animated?: boolean };

export function Wordmark({ size = 30, tone = 'dark', iconOnly, animated, className, style }: WordmarkProps = {}) {
  const shared = { className: cx('ds-wordmark', className), 'data-tone': tone, 'data-icon-only': flag(iconOnly), 'data-animated': flag(animated), style: { '--wm-size': `${size}px`, ...style } };
  const icon = <span className="ds-wordmark__icon" aria-hidden="true" />;
  if (iconOnly) return <span {...shared} aria-hidden="true">{icon}</span>;
  return (
    <span {...shared} role="img" aria-label="Fassa Frame">
      {icon}
      <span aria-hidden="true">fassa frame</span>
    </span>
  );
}
