'use client';
import { useId, useLayoutEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { IconButton } from '../core/IconButton';
import { cx, type BaseProps } from '../lib';

/**
 * Modal that springs in over a blurred backdrop, with a fire-gradient top edge. Escape, the close button, and
 * clicking the backdrop call `onClose`; the consumer owns `open`. Uses the native `<dialog>` for focus containment,
 * and returns focus to the opener when it closes. `inline` renders a static panel for previews.
 */
export type DialogProps = BaseProps & {
  open?: boolean;
  title?: string;
  eyebrow?: string;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
  actions?: ReactNode;
  width?: number;
  inline?: boolean;
};

function Modal({ titleId, onClose, closeLabel, className, style, children }: { titleId?: string; onClose?: () => void; closeLabel: string; className?: string; style?: DialogProps['style']; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      opener?.focus();
    };
  }, []);
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    // Clicks on the dialog's own padding also target it; only the backdrop lies outside its box.
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose?.();
  };
  return (
    <dialog ref={ref} className={className} style={style} aria-labelledby={titleId} onClick={onClick}
      onCancel={event => { event.preventDefault(); onClose?.(); }}>
      <IconButton icon="x" label={closeLabel} variant="ghost" size={38} className="ds-dialog__close" onClick={() => onClose?.()} />
      {children}
    </dialog>
  );
}

export function Dialog({ open = true, title, eyebrow, onClose, closeLabel = 'Close', children, actions, width = 520, inline, className, style }: DialogProps = {}) {
  const titleId = useId();
  const labelledBy = title ? titleId : undefined;
  const sizing = { '--dialog-width': `${width}px`, ...style };
  const content = <>
    <div className="ds-dialog__edge" aria-hidden="true" />
    {eyebrow && <p className="ds-dialog__eyebrow">{eyebrow}</p>}
    {title && <h2 className="ds-dialog__title" id={titleId}>{title}</h2>}
    <div className="ds-dialog__body">{children}</div>
    {actions && <div className="ds-dialog__actions">{actions}</div>}
  </>;
  if (inline) {
    return (
      <div className={cx('ds-dialog', className)} role="dialog" aria-modal="false" aria-labelledby={labelledBy} data-inline="true" style={sizing}>
        {onClose && <IconButton icon="x" label={closeLabel} variant="ghost" size={38} className="ds-dialog__close" onClick={onClose} />}
        {content}
      </div>
    );
  }
  if (!open) return null;
  return <Modal titleId={labelledBy} onClose={onClose} closeLabel={closeLabel} className={cx('ds-dialog', className)} style={sizing}>{content}</Modal>;
}
