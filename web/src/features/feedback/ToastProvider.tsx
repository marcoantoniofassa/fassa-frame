'use client';
import { Toast } from '@editonny/design-system';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './ToastProvider.module.css';

type Tone = 'success' | 'info' | 'error';
type Message = { id: number; text: string; tone: Tone };
type ToastApi = { show(text: string, tone?: Tone): void; register(outlet: HTMLElement): () => void };

const ToastContext = createContext<ToastApi>({ show() {}, register: () => () => {} });
const DURATION = 4000;
let nextId = 0;

/**
 * One toast at a time, announced politely, dismissed after four seconds. While a modal dialog is open the rest of the
 * page is inert, so a dialog renders a ToastOutlet and messages appear (and are announced) inside it instead.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null);
  const [outlets, setOutlets] = useState<HTMLElement[]>([]);
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), DURATION);
    return () => clearTimeout(id);
  }, [message]);
  // Stable identity: outlets register in an effect keyed on `register`, so a new object per render would loop.
  const api = useMemo<ToastApi>(() => ({
    show: (text, tone = 'success') => setMessage({ id: ++nextId, text, tone }),
    register(outlet) {
      setOutlets(list => [...list, outlet]);
      return () => setOutlets(list => list.filter(item => item !== outlet));
    },
  }), []);
  const toast = message && <Toast key={message.id} tone={message.tone === 'info' ? 'default' : message.tone}>{message.text}</Toast>;
  const outlet = outlets.at(-1);
  return (
    <ToastContext value={api}>
      {children}
      <div className={styles.region} aria-live="polite">{!outlet && toast}</div>
      {outlet && toast && createPortal(toast, outlet)}
    </ToastContext>
  );
}

/** Place inside a modal dialog so its toasts stay visible and announced while the page behind it is inert. */
export function ToastOutlet() {
  const { register } = useContext(ToastContext);
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => (node.current ? register(node.current) : undefined), [register]);
  return <div ref={node} className={styles.outlet} aria-live="polite" />;
}

export const useToast = () => useContext(ToastContext);
