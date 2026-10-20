import type { ReactNode } from 'react';
import { cx, flag, type BaseProps } from '../lib';

/** Numbered step row: a large outlined Anton number that fills orange and an underline that draws across on hover or `active`. */
export type StepItemProps = BaseProps & { number: string; title: string; children?: ReactNode; last?: boolean; active?: boolean; headingLevel?: 2 | 3 };

export function StepItem({ number, title, children, last, active, headingLevel = 3, className, style }: StepItemProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className={cx('ds-step', className)} style={style} data-last={flag(last)} data-active={flag(active)}>
      <span className="ds-step__line" aria-hidden="true" />
      <span className="ds-step__number">{number}</span>
      <div className="ds-step__body">
        <Heading className="ds-step__title">{title}</Heading>
        <div className="ds-step__text">{children}</div>
      </div>
    </div>
  );
}
