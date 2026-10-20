import { clamp, cx, flag, type BaseProps } from '../lib';

/** Circular render progress: conic ring, Anton percentage, and a radiating pulse while below 100%. */
export type ProgressRingProps = BaseProps & { value: number; size?: number; thickness?: number; label?: string; color?: string };

export function ProgressRing({ value = 0, size = 96, thickness = 8, label, color, className, style }: ProgressRingProps) {
  const pct = Math.round(clamp(value, 0, 1) * 100);
  return (
    <div className={cx('ds-ring', className)} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Progress'}
      data-complete={flag(pct >= 100)} style={{ '--ring-size': `${size}px`, '--ring-thickness': `${thickness}px`, '--ring-pct': `${pct}%`, ...(color ? { '--ring-color': color } : {}), ...style }}>
      <div className="ds-ring__track" />
      <div className="ds-ring__pulse" aria-hidden="true" />
      <div className="ds-ring__center" aria-hidden="true">
        <span className="ds-ring__value">{pct}<span>%</span></span>
        {label && <span className="ds-ring__label">{label}</span>}
      </div>
    </div>
  );
}
