'use client';
// Client hooks shared by design-system components.
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(onChange: () => void) {
  if (typeof matchMedia !== 'function') return () => {};
  const query = matchMedia(motionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
const readMotion = () => typeof matchMedia === 'function' && matchMedia(motionQuery).matches;

/** Live `prefers-reduced-motion` value; the server render assumes motion is allowed. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, readMotion, () => false);
}

/** Calls the latest `callback` every `ms`; `null` pauses the timer. */
export function useInterval(callback: () => void, ms: number | null): void {
  const latest = useRef(callback);
  useEffect(() => { latest.current = callback; });
  useEffect(() => {
    if (ms === null) return;
    const id = setInterval(() => latest.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

/** Whether the element in `ref` is on screen, so decorative timers can pause; true until observed or without IntersectionObserver. */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}
