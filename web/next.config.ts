import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'node:url';

// The app imports the design-system workspace and the skill's scene catalog, so builds trace from the repository root.
const root = fileURLToPath(new URL('..', import.meta.url));

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const staticExport = process.env.FASSA_FRAME_STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  typedRoutes: true,
  poweredByHeader: false,
  transpilePackages: ['@editonny/design-system'],
  turbopack: { root },
  outputFileTracingRoot: root,
  outputFileTracingIncludes: {
    '/*/opengraph-image': ['../skills/editonny/engine/assets/fonts/anton/Anton-Regular.ttf'],
  },
  ...(staticExport ? {
    output: 'export',
    basePath: '/fassa-frame',
    trailingSlash: true,
    images: { unoptimized: true },
  } : {
    async headers() {
      return [{ source: '/:path*', headers: securityHeaders }];
    },
  }),
  env: { NEXT_PUBLIC_BASE_PATH: staticExport ? '/fassa-frame' : '' },
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
