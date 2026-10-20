export type Theme = 'dark' | 'light';
export const THEME_KEY = 'editonny:theme';
export const parseTheme = (raw: unknown): Theme => (raw === 'light' ? 'light' : 'dark');
