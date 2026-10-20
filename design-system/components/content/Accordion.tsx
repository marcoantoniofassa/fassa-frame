'use client';
import { useId, useState, type ReactNode } from 'react';
import { Icon } from '../core/Icon';
import { cx, type BaseProps } from '../lib';

export type AccordionItem = { title: string; body: ReactNode };

/** FAQ / installation-notes disclosure list with a smooth height animation. One item open at a time; `defaultOpen = -1` closes all. */
export type AccordionProps = BaseProps & { items: AccordionItem[]; defaultOpen?: number };

export function Accordion({ items, defaultOpen = 0, className, style }: AccordionProps) {
  const prefix = useId();
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cx('ds-accordion', className)} style={style}>
      {items.map((item, i) => (
        <div key={item.title} className="ds-accordion__item" data-open={String(open === i)}>
          <button type="button" className="ds-accordion__trigger" id={`${prefix}-t${i}`} aria-controls={`${prefix}-p${i}`} aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{item.title}</span>
            <span className="ds-accordion__icon" aria-hidden="true"><Icon name="plus" size={16} /></span>
          </button>
          <div className="ds-accordion__panel" id={`${prefix}-p${i}`} aria-labelledby={`${prefix}-t${i}`} role="region" inert={open !== i}>
            <div className="ds-accordion__clip"><div className="ds-accordion__body">{item.body}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}
