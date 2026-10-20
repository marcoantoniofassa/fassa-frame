import { defineConfig } from 'vitest/config';

export default defineConfig({
  // The complete showcase renders both themes; concurrent jsdom workers compete for CPU.
  test: { maxWorkers: 1, projects: ['design-system', 'web'] },
});
