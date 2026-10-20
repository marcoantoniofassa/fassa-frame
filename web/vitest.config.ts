import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
      '@content/': fileURLToPath(new URL('./content/', import.meta.url)),
      // `server-only` throws outside React Server Components; unit tests run the same modules in Node.
      'server-only': fileURLToPath(new URL('./src/test/server-only.ts', import.meta.url)),
    },
  },
  test: {
    name: 'web',
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['../vitest.setup.ts'],
    // next-intl imports `next/*` without file extensions, which only Vite's resolver handles.
    server: { deps: { inline: ['next-intl'] } },
  },
});
