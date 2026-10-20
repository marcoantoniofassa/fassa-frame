import type { MetadataRoute } from 'next';
import { SITE_URL, BASE_PATH, withBasePath } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (BASE_PATH) return { rules: [{ userAgent: '*', disallow: `${BASE_PATH}/` }] };
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/design-system' }], sitemap: new URL(withBasePath('/sitemap.xml'), SITE_URL).href };
}
