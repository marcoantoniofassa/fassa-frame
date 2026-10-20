import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'design-system',
    environment: 'jsdom',
    include: ['components/**/*.test.{ts,tsx}', 'showcase/**/*.test.{ts,tsx}'],
    setupFiles: ['../vitest.setup.ts'],
  },
});
