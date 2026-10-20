import css from '@eslint/css';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import design from './design-system/lint/index.mjs';
import quality from './eslint-rules/index.cjs';

// Design-system adherence, ported from the export's _adherence.oxlintrc.json. Prop and variant
// checks for components are enforced by `npm run typecheck` through the TypeScript prop types.
// Each check covers string literals and the static parts of template literals.
const literal = (pattern, message) => [{ selector: `Literal[value=${pattern}]`, message }, { selector: `TemplateElement[value.raw=${pattern}]`, message }];
const rawHex = literal('/#[0-9a-fA-F]{3,8}\\b/', 'Raw hex color — use a design-system color token via var().');
const rawPx = literal('/\\b\\d+px\\b/', 'Raw px value — use a design-system spacing token via var().');
const rawFont = literal('/font-family\\s*:(?!\\s*[\'"]?(?:var\\(--font-|Figtree|Anton|Montserrat|Caveat|Permanent Marker))/i',
  'Font not provided by the design system. Use var(--font-*): Figtree, Anton, Montserrat, Caveat, Permanent Marker.');
const componentInternals = {
  patterns: [{
    group: ['@editonny/design-system/components/*', '**/design-system/components/*/**', '**/components/*/*.tsx', '**/components/lib'],
    message: "Import design-system components from '@editonny/design-system', not component internals.",
  }],
};
const react = ['web/**/*.{ts,tsx}', 'design-system/**/*.{ts,tsx}'];

export default defineConfig([
  globalIgnores([
    '**/node_modules/**', '**/.venv/**', '.work/**', '.superpowers/**',
    'dist/**', 'graphify-out/**', 'eslint-rules/**', '**/.next/**', 'web/next-env.d.ts',
    '**/playwright-report/**', '**/test-results/**',
    'skills/editonny/engine/project-template/assets/three/**',
    'design-system/reference/**', 'design-system/components/core/icon-data.ts',
  ]),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    plugins: { quality },
    rules: { 'quality/max-lines': ['error', { max: 350, includeTests: true }] },
  },
  {
    files: react,
    extends: [nextVitals, nextTs],
    plugins: { quality },
    settings: { next: { rootDir: fileURLToPath(new URL('web/', import.meta.url)) }, react: { version: '19.3' } },
    rules: { 'quality/max-lines': ['error', { max: 350, includeTests: true }] },
  },
  {
    files: [
      'skills/editonny/engine/preview/**/*.{js,mjs}',
      'skills/editonny/engine/project-template/compositions/scenes/3d/**/*.{js,mjs}',
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['eslint.config.mjs', 'scripts/**/*.{js,mjs,cjs}', 'tests/**/*.{js,mjs,cjs}', 'design-system/scripts/**/*.mjs', 'design-system/lint/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['design-system/components/**/*.{ts,tsx}'],
    rules: { 'no-restricted-syntax': ['error', ...rawHex, ...rawFont] },
  },
  {
    // site.ts mirrors two DESIGN.md colors for the web manifest, which cannot read CSS variables.
    files: ['design-system/{templates,showcase}/**/*.{ts,tsx}', 'web/src/**/*.{ts,tsx}'],
    ignores: ['web/src/lib/site.ts'],
    rules: { 'no-restricted-syntax': ['error', ...rawHex, ...rawPx, ...rawFont], 'no-restricted-imports': ['error', componentInternals] },
  },
  {
    files: ['design-system/**/*.css', 'web/**/*.css'],
    ignores: ['design-system/tokens/**', 'design-system/reference/**'],
    language: 'css/css',
    plugins: { css, design },
    rules: { 'design/tokens': 'error' },
  },
]);
