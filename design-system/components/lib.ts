// Internal helpers shared by design-system components; server-safe. Hooks live in hooks.ts.
import type { CSSProperties } from 'react';

declare module 'react' {
  // Components pass design tokens and per-instance values through CSS custom properties.
  interface CSSProperties { [property: `--${string}`]: string | number | undefined }
}

/** Inline styles; values must be tokens (`var(--…)`) or relative units. */
export type StyleMap = CSSProperties;

/** Props every component accepts on its root element. */
export type BaseProps = {
  /** Extra classes for layout in the consuming page. */
  className?: string;
  style?: StyleMap;
};

export const cx = (...names: Array<string | false | null | undefined>): string => names.filter(Boolean).join(' ');

export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** `'true'` for set flags and `undefined` otherwise, so boolean data attributes disappear when off. */
export const flag = (value: unknown): 'true' | undefined => (value ? 'true' : undefined);
