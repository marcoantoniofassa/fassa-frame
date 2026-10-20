import type { ElementType, MouseEventHandler, ReactNode } from 'react';
import { Wordmark } from '../core/Wordmark';
import { cx, type BaseProps } from '../lib';

export type SiteLink = { label: string; href: string; onClick?: MouseEventHandler<HTMLAnchorElement> };

/**
 * Floating glass-pill site header: wordmark, section links (hidden below ~1100px), and a right slot for language + CTA.
 * On mobile, drop `links` and add a fixed bottom bar after the hero. `linkAs` swaps anchors for a router link component.
 */
export type SiteHeaderProps = BaseProps & {
  links?: SiteLink[];
  active?: string;
  right?: ReactNode;
  fixed?: boolean;
  wordmarkSize?: number;
  homeHref?: string;
  homeLabel?: string;
  navLabel?: string;
  linkAs?: ElementType;
};

export function SiteHeader({ links = [], active, right, fixed = true, wordmarkSize = 19, homeHref = '#', homeLabel = 'home page', navLabel = 'Main', linkAs: Link = 'a', className, style }: SiteHeaderProps = {}) {
  return (
    <header className={cx('ds-site-header', className)} style={style} data-fixed={String(fixed)}>
      <div className="ds-site-header__bar">
        {/* The wordmark names the link; the hidden suffix states where it goes without hiding the visible text (WCAG 2.5.3). */}
        <Link className="ds-site-header__home" href={homeHref}><Wordmark size={wordmarkSize} /><span className="ds-visually-hidden">{` ${homeLabel}`}</span></Link>
        {links.length > 0 && (
          <nav className="ds-site-header__nav" aria-label={navLabel}>
            {links.map(link => (
              <Link key={link.href} className="ds-site-header__link" href={link.href} onClick={link.onClick} aria-current={active === link.href ? 'page' : undefined}>{link.label}</Link>
            ))}
          </nav>
        )}
        <div className="ds-site-header__right">{right}</div>
      </div>
    </header>
  );
}
