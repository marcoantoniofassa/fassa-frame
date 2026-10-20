import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

// jsdom lacks these browser APIs; the stubs model the behavior components rely on.
if (typeof window !== 'undefined') {
  window.matchMedia ??= (query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false,
  });
  // Every observed element counts as visible immediately.
  window.IntersectionObserver ??= class {
    constructor(private callback: IntersectionObserverCallback) {}
    observe(target: Element) { this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
    root = null; rootMargin = ''; thresholds = [];
  } as unknown as typeof IntersectionObserver;
  const dialog = window.HTMLDialogElement?.prototype;
  if (dialog && !dialog.showModal) {
    dialog.showModal = function showModal(this: HTMLDialogElement) { this.setAttribute('open', ''); };
    dialog.close = function close(this: HTMLDialogElement) {
      if (!this.hasAttribute('open')) return;
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };
  }
}
