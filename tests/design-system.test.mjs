import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import css from '@eslint/css';
import { RuleTester } from 'eslint';
import design from '../design-system/lint/index.mjs';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');

/** Minimal reader for the DESIGN.md front matter groups (two-space YAML maps of scalars). */
async function frontMatter() {
  const source = await read('DESIGN.md');
  const yaml = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  assert.ok(yaml, 'DESIGN.md starts with YAML front matter');
  const groups = {};
  let group = null;
  for (const line of yaml.split('\n')) {
    const top = line.match(/^([a-z]+):\s*$/);
    const entry = line.match(/^ {2}"?([a-z0-9-]+)"?:\s*"?([^"]*)"?$/);
    if (top) groups[group = top[1]] = {};
    else if (group && entry && entry[2]) groups[group][entry[1]] = entry[2];
  }
  return groups;
}

/** @param {string} source */
const customProperties = source => Object.fromEntries([...source.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));

test('DESIGN.md primitives, radii, and spacing match the token CSS', async () => {
  const { colors, rounded, spacing } = await frontMatter();
  const palette = customProperties((await read('design-system/tokens/colors.css')).split('/* Dark studio theme')[0]);
  const scale = customProperties(await read('design-system/tokens/spacing.css'));
  const hexes = Object.entries(palette).filter(([, value]) => /^#[0-9a-f]{6}$/.test(value));
  assert.ok(hexes.length >= 60);
  for (const [name, value] of hexes) assert.equal(colors[name.slice(2)], value, `${name} differs from DESIGN.md`);
  for (const [name, value] of Object.entries(colors)) {
    if (value.startsWith('{')) assert.ok(colors[value.slice(8, -1)], `${name} references a defined color`);
    else assert.equal(palette[`--${name}`], value, `DESIGN.md color ${name} is missing from colors.css`);
  }
  for (const [name, value] of Object.entries(rounded)) assert.equal(scale[`--radius-${name === 'full' ? 'pill' : name}`], value, `radius ${name}`);
  for (const [name, value] of Object.entries(spacing).filter(([name]) => !['gutter', 'container', 'content', 'topbar'].includes(name))) {
    assert.equal(scale[`--space-${name}`], value, `space ${name}`);
  }
  assert.equal(scale['--gutter'], spacing.gutter);
  assert.equal(scale['--container-max'], spacing.container);
});

test('both themes define every semantic role and the web app loads the design-system stylesheet', async () => {
  const colors = await read('design-system/tokens/colors.css');
  const block = selector => customProperties(colors.slice(colors.indexOf(selector)).split('}')[0]);
  const dark = block(':root,\n[data-theme="dark"] {');
  const light = block(':root[data-theme="light"],\n[data-theme="light"] {');
  assert.ok(Object.keys(dark).length > 60);
  assert.deepEqual(Object.keys(dark).filter(name => !(name in light)), []);
  assert.match(await read('design-system/styles.css'), /@import "tokens\/colors\.css";[\s\S]*@import "components\/components\.css";/);
  assert.match(await read('web/src/app/design-system/layout.tsx'), /import '@editonny\/design-system\/styles\.css';/);
});

test('the public API exposes all 38 components and the showcase renders each of them', async () => {
  const api = await read('design-system/components/index.ts');
  const components = [...api.matchAll(/export \{ ([^}]+) \}/g)].flatMap(([, names]) => names.split(',').map(name => name.trim()))
    .filter(name => !name.startsWith('type ') && /^[A-Z][a-z]/.test(name));
  assert.equal(new Set(components).size, 38, components.join(', '));
  const files = (await readdir(new URL('design-system/showcase/', root))).filter(name => name.endsWith('.tsx'));
  const showcase = (await Promise.all(files.map(name => read(`design-system/showcase/${name}`)))).join('\n');
  const specimens = new Set([...showcase.matchAll(/<Specimen[^>]*\bname="([A-Za-z]+)"/g)].map(match => match[1]));
  assert.deepEqual(components.filter(name => !specimens.has(name)), []);
  for (const dir of ['core', 'forms', 'content', 'feedback', 'editor', 'motion', 'site']) assert.match(await read('design-system/components/components.css'), new RegExp(`${dir}/${dir}\\.css`));
});

test('the adherence rule rejects raw values and accepts tokens', () => {
  RuleTester.describe = (_, run) => run();
  RuleTester.it = (_, run) => run();
  RuleTester.itOnly = RuleTester.it;
  const tester = new RuleTester({ plugins: { css }, language: 'css/css' });
  const error = messageId => ({ messageId });
  tester.run('design/tokens', design.rules.tokens, {
    valid: [
      'a { color: var(--text-1); padding: var(--space-2) 0; border-radius: var(--radius-md); font: var(--text-label); }',
      'a { border: 1px solid var(--line-1); width: 44px; inset: -6px; background: color-mix(in srgb, var(--paper-900) 4%, transparent); }',
      'a { font-family: var(--font-sans); border-radius: 50%; margin: 0 auto; gap: 0.12em; font-size: calc(var(--ring-size) * 0.3); }',
      'a { --button-height: 50px; --card-pad: var(--space-6); }',
      { code: 'a { padding: 13px; font-size: 7px; }', options: [{ spacing: false, fontSize: false }] },
      'a { font: italic bold var(--size-body)/1 var(--font-sans); --tone: var(--accent); --label: none; }',
    ],
    invalid: [
      { code: 'a { color: #fff; }', errors: [error('color')] },
      { code: 'a { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); }', errors: [error('color')] },
      { code: 'a { background: white; }', errors: [error('color')] },
      { code: 'a { --accent: #ff4f12; }', errors: [error('color')] },
      { code: 'a { font-family: Inter, sans-serif; }', errors: [error('font'), error('font')] },
      { code: 'a { font: 700 12px/1 "Figtree"; }', errors: [error('fontSize'), error('font')] },
      { code: 'a { padding: 0 12px; }', errors: [error('spacing')] },
      { code: 'a { gap: 10px; }', errors: [error('spacing')] },
      { code: 'a { border-radius: 3px; }', errors: [error('radius')] },
      { code: 'a { --accent: red; color: var(--accent); }', errors: [error('color')] },
      { code: 'a { --accent: color(srgb 1 0 0); }', errors: [error('color')] },
      { code: 'a { font: 700 var(--size-body)/1 Inter; }', errors: [error('font')] },
    ],
  });
});
