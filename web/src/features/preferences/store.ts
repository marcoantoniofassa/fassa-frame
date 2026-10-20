import { useSyncExternalStore } from 'react';

export type Store<T> = {
  get(): T;
  set(next: T | ((previous: T) => T)): void;
  reset(): void;
  subscribe(listener: () => void): () => void;
  readonly fallback: T;
};

/**
 * A preference persisted as JSON in localStorage. Every storage access is guarded: blocked or corrupted storage
 * falls back to memory and to `fallback`, and stored data always passes through `parse` (it is untrusted).
 */
export function createStore<T>(key: string, parse: (raw: unknown) => T, fallback: T): Store<T> {
  const listeners = new Set<() => void>();
  let memory = fallback;
  // True when the last write could not be stored (quota, blocked storage): memory is then the truth.
  // Memory also answers when storage cannot be read at all.
  let unsaved = false;
  // Cached by the raw string so repeated reads return the same snapshot object.
  let cache: { raw: string | null; value: T } | null = null;

  const read = (): T => {
    if (unsaved) return memory;
    let raw: string | null;
    try {
      raw = localStorage.getItem(key);
    } catch {
      return memory;
    }
    if (cache && cache.raw === raw) return cache.value;
    // A readable but missing key means "nothing saved" (for example, another tab reset it): use the fallback.
    let value = fallback;
    if (raw !== null) {
      try { value = parse(JSON.parse(raw)); } catch { value = fallback; }
    }
    cache = { raw, value };
    return value;
  };
  const notify = () => listeners.forEach(listener => listener());
  const onStorage = (event: StorageEvent) => {
    if (event.key !== key && event.key !== null) return;
    // Another tab wrote, removed, or cleared the key: storage is the truth again.
    if (event.key === null || event.newValue === null) memory = fallback;
    unsaved = false;
    cache = null;
    notify();
  };

  return {
    fallback,
    get: read,
    set(next) {
      memory = typeof next === 'function' ? (next as (previous: T) => T)(read()) : next;
      try {
        localStorage.setItem(key, JSON.stringify(memory));
        unsaved = false;
      } catch {
        unsaved = true;
      }
      notify();
    },
    reset() {
      memory = fallback;
      try {
        localStorage.removeItem(key);
        unsaved = false;
      } catch {
        unsaved = true;
      }
      notify();
    },
    subscribe(listener) {
      if (!listeners.size) window.addEventListener('storage', onStorage);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) window.removeEventListener('storage', onStorage);
      };
    },
  };
}

/** Reads a store in a component; the server render and hydration use the fallback, then the stored value. */
export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, () => store.fallback);
}
