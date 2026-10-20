import { ICONS } from './icon-data';
import { cx, type BaseProps } from '../lib';

/**
 * Lucide line icon (2px stroke) that inherits `currentColor`.
 * `base` renders `<base><name>.svg` as a CSS mask instead of the bundled set; `label` makes the icon meaningful to assistive tech.
 */
export type IconProps = BaseProps & {
  name: string;
  size?: number;
  color?: string;
  base?: string;
  label?: string;
};

/** Names available without a `base`. */
export const iconNames = (): string[] => Object.keys(ICONS);

export function Icon({ name, size = 18, color, base, label, className, style }: IconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  const dimension = `${size}px`;
  if (base || !(name in ICONS)) {
    const url = `url("${base ?? ''}${name}.svg")`;
    return <span {...a11y} className={cx('ds-icon ds-icon--mask', className)} style={{ '--icon-size': dimension, ...(color ? { '--icon-color': color } : {}), WebkitMaskImage: url, maskImage: url, ...style }} />;
  }
  return (
    <svg {...a11y} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      className={cx('ds-icon', className)} style={{ '--icon-size': dimension, ...(color ? { color } : {}), ...style }}
      // The registry is generated from vetted Lucide files and rejects scripts, handlers, and links.
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? '' }} />
  );
}
