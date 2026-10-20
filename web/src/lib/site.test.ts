// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BRAND } from './site';

describe('BRAND', () => {
  it('mirrors the DESIGN.md color tokens', () => {
    const design = readFileSync(new URL('../../../DESIGN.md', import.meta.url), 'utf8');
    for (const [name, value] of Object.entries(BRAND)) {
      const token = name.replace(/(\d+)$/, '-$1');
      expect(design, token).toContain(`  ${token}: "${value}"`);
    }
  });
});
