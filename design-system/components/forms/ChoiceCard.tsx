import type { ReactNode } from 'react';
import { Icon } from '../core/Icon';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Radio-style selectable card: orange border, glow, and a popping check when selected; compact pills fill solid orange.
 * Group cards inside an element with role="radiogroup". The consumer owns selection through `selected`.
 */
export type ChoiceCardProps = BaseProps & {
  title?: string;
  description?: string;
  icon?: string;
  media?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  compact?: boolean;
  label?: string;
  /** Roving focus inside a radio group: 0 for the selected card, -1 for the others. */
  tabIndex?: number;
  onSelect?: () => void;
};

export function ChoiceCard({ title, description, icon, media, selected, disabled, compact, label, tabIndex, onSelect, className, style }: ChoiceCardProps) {
  const stacked = Boolean(media) && !icon;
  return (
    <button type="button" role="radio" className={cx('ds-choice', className)} style={style} aria-checked={Boolean(selected)} aria-label={label} disabled={disabled} tabIndex={tabIndex}
      data-compact={flag(compact)} data-stacked={flag(stacked)} onClick={onSelect}>
      {media}
      {icon && <span className="ds-choice__tile"><Icon name={icon} size={19} /></span>}
      {(title || description) && (
        <span className="ds-choice__text">
          {title && <strong className="ds-choice__title">{title}</strong>}
          {description && <span className="ds-choice__description">{description}</span>}
        </span>
      )}
      {!compact && <span className="ds-choice__check" aria-hidden="true"><Icon name="check" size={14} /></span>}
    </button>
  );
}
