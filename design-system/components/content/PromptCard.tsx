import type { ElementType } from 'react';
import { Icon } from '../core/Icon';
import { cx, type BaseProps } from '../lib';

/**
 * Library entry for a ready-made request. On hover, solid orange floods in from the corner and the arrow turns 45°.
 * `href` renders a link; `as` swaps the anchor for a router link component that accepts `href`.
 */
export type PromptCardProps = BaseProps & { category: string; title: string; summary: string; action?: string; index?: string; onClick?: () => void; href?: string | object; as?: ElementType };

export function PromptCard({ category, title, summary, action = 'View request', index, onClick, href, as, className, style }: PromptCardProps) {
  const content = <>
    <span className="ds-prompt__head">
      <span className="ds-prompt__category">{category}</span>
      {index && <span className="ds-prompt__index">{index}</span>}
    </span>
    <span className="ds-prompt__title">{title}</span>
    <span className="ds-prompt__summary">{summary}</span>
    <span className="ds-prompt__action">{action}<span className="ds-prompt__arrow" aria-hidden="true"><Icon name="arrow-up-right" size={16} /></span></span>
  </>;
  if (href !== undefined) {
    const Link = as ?? 'a';
    return <Link className={cx('ds-prompt', className)} style={style} href={href} onClick={onClick}>{content}</Link>;
  }
  return <button type="button" className={cx('ds-prompt', className)} style={style} onClick={onClick}>{content}</button>;
}
