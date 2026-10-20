import { cx, type BaseProps } from '../lib';

/**
 * Glass pill introducing the creator above the hero headline: photo in a spinning gradient ring, name, role,
 * and a volt status line. Use once per page; elsewhere show a plain round photo.
 */
export type CreatorChipProps = BaseProps & { name: string; role?: string; status?: string; photo?: string; href?: string; ring?: boolean; newTabLabel?: string };

export function CreatorChip({ name, role, status, photo, href, ring = true, newTabLabel = '(opens in a new tab)', className, style }: CreatorChipProps) {
  const body = <>
    <span className="ds-creator__avatar">
      {ring && <span className="ds-creator__ring" aria-hidden="true" />}
      {/* eslint-disable-next-line @next/next/no-img-element -- framework-agnostic library component */}
      {photo ? <img className="ds-creator__photo" src={photo} alt="" width={44} height={44} /> : <span className="ds-creator__initial" aria-hidden="true">{(name || '?')[0]}</span>}
    </span>
    <span className="ds-creator__text">
      <span className="ds-creator__line"><strong>{name}</strong>{role && <span className="ds-creator__role">{role}</span>}</span>
      {status && <span className="ds-creator__status"><span className="ds-creator__dot" aria-hidden="true" />{status}</span>}
    </span>
  </>;
  if (!href) return <div className={cx('ds-creator', className)} style={style}>{body}</div>;
  return (
    <a className={cx('ds-creator', className)} style={style} href={href} target="_blank" rel="noopener noreferrer">
      {body}
      <span className="ds-visually-hidden">{newTabLabel}</span>
    </a>
  );
}
