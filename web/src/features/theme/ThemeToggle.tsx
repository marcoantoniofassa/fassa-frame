'use client';
import { IconButton } from '@editonny/design-system';
import { useEffect } from 'react';
import { createStore, useStore } from '../preferences/store';
import { parseTheme, THEME_KEY } from './theme';

export const themeStore = createStore(THEME_KEY, parseTheme, 'light');

/** Sun/moon switch between the dark studio and light paper themes; the choice persists in this browser. */
export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const theme = useStore(themeStore);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  const light = theme === 'light';
  return (
    <IconButton icon={light ? 'moon' : 'sun'} label={light ? labels.toDark : labels.toLight} variant="ghost" size={40}
      onClick={() => themeStore.set(light ? 'dark' : 'light')} />
  );
}
