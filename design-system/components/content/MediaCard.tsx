'use client';
import { useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { Badge } from '../core/Badge';
import { Icon } from '../core/Icon';
import { cx, flag, type BaseProps } from '../lib';

/** Full-bleed video thumbnail with 3D tilt and glare on hover, protection gradient, title/meta, and a duration pill. */
export type MediaCardProps = BaseProps & {
  image?: string;
  alt?: string;
  title: string;
  meta?: string;
  duration?: string;
  aspect?: string;
  playable?: boolean;
  tilt?: boolean;
  kenburns?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

type Tilt = { '--rx': string; '--ry': string; '--gx': string; '--gy': string };

export function MediaCard({ image, alt = '', title, meta, duration, aspect = '4 / 3', playable, tilt = true, kenburns, onClick, children, className, style }: MediaCardProps) {
  const [pose, setPose] = useState<Tilt | null>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    setPose({ '--rx': `${(0.5 - y) * 10}deg`, '--ry': `${(x - 0.5) * 12}deg`, '--gx': `${x * 100}%`, '--gy': `${y * 100}%` });
  };
  const keys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick?.(); }
  };
  const interactive = onClick ? { role: 'button', tabIndex: 0, 'aria-label': [title, meta, duration].filter(Boolean).join(', '), onClick, onKeyDown: keys } : {};
  return (
    <div {...interactive} className={cx('ds-media', className)} data-kenburns={flag(kenburns)} data-clickable={flag(onClick)} data-active={flag(pose)}
      style={{ '--media-aspect': aspect, ...pose, ...style }} onPointerMove={tilt ? move : undefined} onPointerLeave={tilt ? () => setPose(null) : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element -- framework-agnostic library component; apps pass optimized URLs */}
      {image && <img className="ds-media__image" src={image} alt={alt} loading="lazy" decoding="async" />}
      {children}
      <div className="ds-media__protect" aria-hidden="true" />
      <div className="ds-media__glare" aria-hidden="true" />
      {playable && <span className="ds-media__play" aria-hidden="true"><Icon name="play" size={22} /></span>}
      <div className="ds-media__footer">
        <div className="ds-media__text">
          <div className="ds-media__title">{title}</div>
          {meta && <div className="ds-media__meta">{meta}</div>}
        </div>
        {duration && <Badge mono>{duration}</Badge>}
      </div>
    </div>
  );
}
