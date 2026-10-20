import type { ReactNode } from 'react';
import { Icon } from '../core/Icon';
import { cx, type BaseProps } from '../lib';

/** Floating pill confirmation that springs in, with a popping icon disc (orange default, volt success, red error). */
export type ToastProps = BaseProps & { children: ReactNode; tone?: 'default' | 'success' | 'error' };

const ICON = { default: 'sparkles', success: 'check', error: 'circle-alert' } as const;

export function Toast({ children, tone = 'default', className, style }: ToastProps) {
  return (
    <div className={cx('ds-toast', className)} style={style} role={tone === 'error' ? 'alert' : 'status'} data-tone={tone}>
      <span className="ds-toast__icon" aria-hidden="true"><Icon name={ICON[tone] ?? ICON.default} size={16} /></span>
      <span>{children}</span>
    </div>
  );
}
