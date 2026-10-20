import type { MetadataRoute } from 'next';
import { BRAND, withBasePath } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fassa Frame',
    short_name: 'Fassa Frame',
    description: 'Local video editing through conversation: cuts, captions, sound, and motion with the AI you already use.',
    start_url: withBasePath('/'),
    display: 'standalone',
    background_color: BRAND.ink900,
    theme_color: BRAND.ink900,
    icons: [{ src: withBasePath('/icon.svg'), sizes: 'any', type: 'image/svg+xml' }],
  };
}
