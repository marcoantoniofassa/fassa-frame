import { useId, type ChangeEventHandler } from 'react';
import { Icon } from '../core/Icon';
import { cx, type BaseProps } from '../lib';

export type SelectOption = { value: string; label: string };

/** Native select on a dark well with a chevron tile that turns orange and flips when focused. */
export type SelectProps = BaseProps & {
  label?: string;
  options: Array<string | SelectOption>;
  value?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export function Select({ label, options, value, id, name, disabled, ariaLabel, onChange, className, style }: SelectProps) {
  const generated = useId();
  const selectId = id ?? generated;
  return (
    <div className={cx('ds-select', className)} style={style}>
      {label && <label className="ds-select__label" htmlFor={selectId}>{label}</label>}
      <span className="ds-select__control">
        <select id={selectId} name={name} className="ds-select__input" disabled={disabled} aria-label={label ? undefined : ariaLabel} value={value} onChange={onChange}>
          {options.map(option => typeof option === 'string'
            ? <option key={option} value={option}>{option}</option>
            : <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <span className="ds-select__chevron" aria-hidden="true"><Icon name="chevron-down" size={16} /></span>
      </span>
    </div>
  );
}
