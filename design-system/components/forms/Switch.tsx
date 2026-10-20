'use client';
import { useState } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/** On/off switch with a spring knob and orange glow. With `label` it becomes a full toggle row. Uncontrolled unless `checked` changes. */
export type SwitchProps = BaseProps & {
  checked?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onChange?: (next: boolean) => void;
};

export function Switch({ checked = false, label, description, disabled, ariaLabel, onChange, className, style }: SwitchProps = {}) {
  const [on, setOn] = useState(checked);
  const [prop, setProp] = useState(checked);
  if (prop !== checked) { setProp(checked); setOn(checked); }
  return (
    <button type="button" role="switch" className={cx('ds-switch', className)} style={style} aria-checked={on} disabled={disabled}
      aria-label={label ? undefined : ariaLabel} data-row={flag(label)} onClick={() => { setOn(!on); onChange?.(!on); }}>
      {label && (
        <span className="ds-switch__text">
          <span className="ds-switch__label">{label}</span>
          {description && <span className="ds-switch__description">{description}</span>}
        </span>
      )}
      <span className="ds-switch__track" aria-hidden="true"><span className="ds-switch__knob" /></span>
    </button>
  );
}
