'use client';
import type { PointerEvent, ReactNode } from 'react';
import { cx, flag, type BaseProps } from '../lib';

export type CardVariant = 'surface' | 'raised' | 'glass' | 'orange' | 'volt' | 'white' | 'fire';
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Base container. `surface`/`raised` = panels, `glass` = over media, `orange`/`volt`/`white`/`fire` = solid color blocks.
 * `beam` = light running around the border (one hero object per view), `spotlight` = glow follows the cursor, `lift` = rise on hover.
 * `padding` takes a token such as `var(--space-6)`; numbers are pixels for compatibility.
 */
export type CardProps = BaseProps & {
  variant?: CardVariant;
  padding?: number | string;
  radius?: CardRadius;
  beam?: boolean;
  spotlight?: boolean;
  lift?: boolean;
  children?: ReactNode;
};

function follow(event: PointerEvent<HTMLDivElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`);
}

export function Card({ variant = 'surface', padding = 'var(--space-6)', radius = 'xl', beam, spotlight, lift, children, className, style }: CardProps = {}) {
  const pad = { '--card-pad': typeof padding === 'number' ? `${padding}px` : padding };
  const inner = (
    <div className={cx('ds-card', !beam && className)} data-variant={variant} data-radius={radius} data-lift={flag(lift)} data-spotlight={flag(spotlight)} data-beam={flag(beam)}
      style={beam ? pad : { ...pad, ...style }} onPointerMove={spotlight ? follow : undefined}>
      {spotlight && <div className="ds-card__spotlight" aria-hidden="true" />}
      <div className="ds-card__content">{children}</div>
    </div>
  );
  if (!beam) return inner;
  return (
    <div className={cx('ds-card-beam', className)} data-radius={radius} style={style}>
      <div className="ds-card-beam__light" aria-hidden="true" />
      {inner}
    </div>
  );
}
