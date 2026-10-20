import { defineRouting } from 'next-intl/routing';

export const LOCALE_PREFIXES = { 'en-US': '/en', 'pt-BR': '/pt-br', es: '/es' } as const;

export const routing = defineRouting({
  locales: ['en-US', 'pt-BR', 'es'],
  defaultLocale: 'en-US',
  // Short, lowercase URL prefixes; the [locale] segment still receives the full locale code.
  localePrefix: { mode: 'always', prefixes: LOCALE_PREFIXES },
  localeDetection: true,
  // next-intl defaults to a session cookie; a manual language choice should survive closing the browser.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
  pathnames: {
    '/': '/',
    '/create': { 'en-US': '/create', 'pt-BR': '/criar', es: '/crear' },
    '/catalog': { 'en-US': '/catalog', 'pt-BR': '/catalogo', es: '/catalogo' },
    '/examples': { 'en-US': '/examples', 'pt-BR': '/exemplos', es: '/ejemplos' },
    '/install': { 'en-US': '/install', 'pt-BR': '/instalacao', es: '/instalacion' },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

/** Static hosting exposes the public prefix directly; the proxy uses full locale codes. */
export function resolveLocale(value: string | undefined): AppLocale | undefined {
  return routing.locales.find(locale => locale === value || LOCALE_PREFIXES[locale].slice(1) === value);
}

export function localeParams() {
  return routing.locales.map(locale => ({ locale: process.env.FASSA_FRAME_STATIC_EXPORT === '1' ? LOCALE_PREFIXES[locale].slice(1) : locale }));
}
