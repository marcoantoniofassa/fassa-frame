import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localizedPath, PAGE_PATHS, SITE_URL, type PageKey } from '@/lib/site';

const absolute = (path: string) => new URL(path, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGE_PATHS) as PageKey[]).flatMap(page => routing.locales.map(locale => ({
    url: absolute(localizedPath(locale, page)),
    changeFrequency: 'weekly' as const,
    priority: page === 'home' ? 1 : 0.7,
    alternates: { languages: Object.fromEntries(routing.locales.map(code => [code, absolute(localizedPath(code, page))])) },
  })));
}
