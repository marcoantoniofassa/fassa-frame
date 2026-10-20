import type { ReactNode } from 'react';
import { cx, type BaseProps } from '../lib';

/** Keyboard shortcut chip ("Mark start <Kbd>I</Kbd>"). */
export type KbdProps = BaseProps & { children: ReactNode };

export function Kbd({ children, className, style }: KbdProps) {
  return <kbd className={cx('ds-kbd', className)} style={style}>{children}</kbd>;
}
