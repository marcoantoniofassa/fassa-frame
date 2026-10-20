import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { routing, LOCALE_PREFIXES, type AppLocale, type AppPathname } from '@/i18n/routing';

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
/** Canonical origin: NEXT_PUBLIC_SITE_URL, else the Vercel production domain, else local development. */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000'));

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const withBasePath = (path: string) => `${BASE_PATH}${path}`;

export const REPOSITORY_URL = 'https://github.com/soumatheusgomes/editonny';
export const AUTHOR = { name: 'Matheus Gomes', instagram: 'https://instagram.com/matheusgomes', email: 'eu@matheusgom.es' };

/**
 * DESIGN.md colors for surfaces that cannot read CSS variables (web manifest, generated Open Graph images).
 * `site.test.ts` fails when they drift from DESIGN.md.
 */
export const BRAND = {
  ink950: '#050506', ink900: '#0b0b0d', ink800: '#17171b', ink600: '#2c2c33',
  fog50: '#fafafa', fog400: '#a1a1aa', orange500: '#e8a838', orange900: '#2b0b00', volt400: '#d4ff3a',
} as const;

export type PageKey = 'home' | 'create' | 'catalog' | 'examples' | 'install';
export const PAGE_PATHS: Record<PageKey, AppPathname> = { home: '/', create: '/create', catalog: '/catalog', examples: '/examples', install: '/install' };
export const OG_LOCALES: Record<AppLocale, string> = { 'en-US': 'en_US', 'pt-BR': 'pt_BR', es: 'es_ES' };

/** Localized path of a page, with the locale prefix (for example `/pt-br/criar`). */
export const localizedPath = (locale: AppLocale, page: PageKey) => withBasePath(getPathname({ locale, href: PAGE_PATHS[page] }));

/** Title, description, canonical URL, hreflang alternates, and social cards for one page in one locale. */
export async function pageMetadata(locale: AppLocale, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const url = localizedPath(locale, page);
  // Child pages define openGraph, which replaces the inherited file-based image, so every page names it explicitly.
  const images = [{ url: withBasePath(`${BASE_PATH ? LOCALE_PREFIXES[locale] : `/${locale}`}/opengraph-image`), width: 1200, height: 630, alt: t('ogAlt') }];
  return {
    metadataBase: SITE_URL,
    ...(BASE_PATH ? { robots: { index: false, follow: false } } : {}),
    title,
    description,
    applicationName: t('siteName'),
    authors: [{ name: AUTHOR.name, url: AUTHOR.instagram }],
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(routing.locales.map(code => [code, localizedPath(code, page)])), 'x-default': BASE_PATH ? localizedPath('pt-BR', page) : PAGE_PATHS[page] },
    },
    openGraph: {
      type: 'website', siteName: t('siteName'), title, description, url, images,
      locale: OG_LOCALES[locale], alternateLocale: routing.locales.filter(code => code !== locale).map(code => OG_LOCALES[code]),
    },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}
