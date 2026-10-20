import { cx, type BaseProps } from '../lib';

/** Animated hero light: three drifting blurred blobs plus moving film grain. Fills its position:relative parent; once per page. `intensity` = blob opacity 0–1. */
export type AuroraProps = BaseProps & { intensity?: number; grain?: boolean; palette?: 'fire' | 'volt' | 'mono' };

export function Aurora({ intensity = 1, grain = true, palette = 'fire', className, style }: AuroraProps = {}) {
  return (
    <div className={cx('ds-aurora', grain && 'ed-grain', className)} aria-hidden="true" data-palette={palette} style={{ '--aurora-opacity': String(intensity), ...style }}>
      <span className="ds-aurora__blob" />
      <span className="ds-aurora__blob" />
      <span className="ds-aurora__blob" />
    </div>
  );
}
