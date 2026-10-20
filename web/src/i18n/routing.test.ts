// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { localeParams, resolveLocale } from './routing';

afterEach(() => vi.unstubAllEnvs());

describe('static locale routing', () => {
  it('resolves public prefixes and internal locale codes without accepting unknown locales', () => {
    expect(['en', 'en-US', 'pt-br', 'pt-BR', 'es'].map(resolveLocale)).toEqual(['en-US', 'en-US', 'pt-BR', 'pt-BR', 'es']);
    expect(resolveLocale('fr')).toBeUndefined();
    expect(resolveLocale(undefined)).toBeUndefined();
  });

  it('exports public prefixes while preserving the normal Next.js route parameters', () => {
    vi.stubEnv('FASSA_FRAME_STATIC_EXPORT', '1');
    expect(localeParams()).toEqual([{ locale: 'en' }, { locale: 'pt-br' }, { locale: 'es' }]);
    vi.stubEnv('FASSA_FRAME_STATIC_EXPORT', '');
    expect(localeParams()).toEqual([{ locale: 'en-US' }, { locale: 'pt-BR' }, { locale: 'es' }]);
  });
});
