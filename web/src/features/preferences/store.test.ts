import { afterEach, describe, expect, it, vi } from 'vitest';
import { createStore } from './store';

const parse = (raw: unknown) => (typeof raw === 'number' ? raw : 0);

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('createStore', () => {
  it('returns the fallback when localStorage.getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
    expect(createStore('k', parse, 7).get()).toBe(7);
  });

  it('keeps working in memory when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('denied', 'SecurityError'); });
    const store = createStore('k', parse, 0);
    store.set(5);
    expect(store.get()).toBe(5);
  });

  it('returns the fallback for invalid JSON and runs stored data through parse', () => {
    localStorage.setItem('k', '{bad');
    expect(createStore('k', parse, 3).get()).toBe(3);
    localStorage.setItem('k', '"text"');
    expect(createStore('k', parse, 3).get()).toBe(0);
  });

  it('persists JSON, notifies subscribers, and returns a stable snapshot', () => {
    const store = createStore('k', parse, 0);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    store.set(previous => previous + 2);
    expect(localStorage.getItem('k')).toBe('2');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(store.get()).toBe(store.get());
    unsubscribe();
    store.set(4);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('updates subscribers when another tab writes the key', () => {
    const store = createStore('k', parse, 0);
    const listener = vi.fn();
    store.subscribe(listener);
    localStorage.setItem('k', '9');
    window.dispatchEvent(new StorageEvent('storage', { key: 'k', newValue: '9', storageArea: localStorage }));
    expect(listener).toHaveBeenCalled();
    expect(store.get()).toBe(9);
    window.dispatchEvent(new StorageEvent('storage', { key: 'other', newValue: '1', storageArea: localStorage }));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('keeps the new value when only writes fail (quota exceeded)', () => {
    localStorage.setItem('k', '1');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('full', 'QuotaExceededError'); });
    const store = createStore('k', parse, 0);
    store.set(5);
    expect(store.get()).toBe(5);
  });

  it('returns to the fallback when another tab removes the key or clears storage', () => {
    const store = createStore('k', parse, 0);
    store.subscribe(() => {});
    store.set(8);
    localStorage.removeItem('k');
    window.dispatchEvent(new StorageEvent('storage', { key: 'k', newValue: null, storageArea: localStorage }));
    expect(store.get()).toBe(0);
    store.set(3);
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage', { key: null, storageArea: localStorage }));
    expect(store.get()).toBe(0);
  });

  it('a key removed while nobody listened reads as the fallback', () => {
    const store = createStore('k', parse, 0);
    const unsubscribe = store.subscribe(() => {});
    store.set(8);
    unsubscribe();
    localStorage.removeItem('k');
    expect(store.get()).toBe(0);
  });

  it('reset removes the key and restores the fallback', () => {
    const store = createStore('k', parse, 1);
    store.set(8);
    store.reset();
    expect(localStorage.getItem('k')).toBeNull();
    expect(store.get()).toBe(1);
  });
});
