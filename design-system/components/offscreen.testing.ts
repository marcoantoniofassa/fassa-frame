import { vi } from 'vitest';

/** Replaces IntersectionObserver with one that reports every observed element as off screen. */
export function stubOffscreen() {
  vi.stubGlobal('IntersectionObserver', class {
    constructor(private callback: IntersectionObserverCallback) {}
    observe(target: Element) { this.callback([{ isIntersecting: false, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  });
}
