import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals, the design-system showcase, generated Open Graph images (addressed by
  // the internal locale code, e.g. /pt-BR/opengraph-image), and files with an extension.
  matcher: '/((?!api|_next|_vercel|design-system|.*opengraph-image|.*\\..*).*)',
};
