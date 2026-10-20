import test from 'node:test';
import assert from 'node:assert/strict';
import { ESLint } from 'eslint';

test('lint covers first-party code and excludes generated and vendor files', async () => {
  const eslint = new ESLint();
  for (const file of [
    'web/src/app/[locale]/page.tsx', 'web/src/features/request/prompt.ts', 'web/e2e/create.spec.ts', 'web/next.config.ts',
    'design-system/components/core/Button.tsx', 'design-system/scripts/icons.mjs', 'tests/design-system.test.mjs',
    'skills/editonny/engine/preview/app.js',
    'skills/editonny/engine/preview/review/view.mjs',
    'skills/editonny/engine/preview/style/state.mjs',
    'skills/editonny/engine/project-template/compositions/scenes/3d/three-scene.js',
    'skills/editonny/engine/project-template/compositions/scenes/3d/engine/stage.mjs',
  ]) assert.equal(await eslint.isPathIgnored(file), false, file);
  for (const file of [
    'web/.next/server/app.js', 'web/next-env.d.ts', 'design-system/components/core/icon-data.ts', 'design-system/reference/_ds_bundle.js',
    'node_modules/example/index.js', 'skills/editonny/engine/project-template/assets/three/RoomEnvironment.js',
  ]) assert.equal(await eslint.isPathIgnored(file), true, file);
});

test('strict line limits count the final newline and include tests', async () => {
  const eslint = new ESLint();
  const source = count => Array.from({ length: count }, (_, i) => `export const value${i} = ${i};`).join('\n');
  for (const filePath of ['web/src/features/example.ts', 'design-system/components/core/Example.tsx', 'tests/example.test.mjs', 'tests/fixtures/synthetic.mjs',
    'skills/editonny/engine/preview/review/view.mjs',
    'skills/editonny/engine/project-template/compositions/scenes/3d/engine/time.mjs']) {
    for (const [code, errors] of [[source(350), 0], [source(349) + '\n', 0], [source(350) + '\n', 1], [source(351), 1]]) {
      const [result] = await eslint.lintText(code, { filePath });
      assert.equal(result.errorCount, errors, filePath);
      assert.equal(result.warningCount, 0, filePath);
      if (errors) assert.deepEqual(result.messages.map(m => m.ruleId), ['quality/max-lines']);
    }
  }
});

test('unused bindings in engine and preview are errors', async () => {
  const eslint = new ESLint();
  for (const filePath of ['skills/editonny/engine/preview/app.js',
    'skills/editonny/engine/project-template/compositions/scenes/3d/three-scene.js']) {
    const [result] = await eslint.lintText('const dead = 1;', { filePath });
    assert.equal(result.errorCount, 1);
    assert.equal(result.warningCount, 0);
    assert.equal(result.messages[0].ruleId, 'no-unused-vars');
  }
});

test('lint distinguishes browser and Node runtimes', async () => {
  const eslint = new ESLint();
  const [browser] = await eslint.lintText('document.title = process.version;', { filePath: 'skills/editonny/engine/preview/app.js' });
  assert.deepEqual(browser.messages.map(m => m.ruleId), ['no-undef']);
  assert.match(browser.messages[0].message, /'process'/);
  const [node] = await eslint.lintText('console.log(process.version); document.title = "test";', { filePath: 'design-system/scripts/example.mjs' });
  assert.deepEqual(node.messages.map(m => m.ruleId), ['no-undef']);
  assert.match(node.messages[0].message, /'document'/);
});

test('design-system adherence covers the library, the web app, and their stylesheets', async () => {
  const eslint = new ESLint();
  const rules = async (code, filePath) => (await eslint.lintText(code, { filePath }))[0].messages.map(m => m.ruleId);
  assert.deepEqual(await rules('a { color: #fff; padding: 12px; }\n', 'design-system/components/core/core.css'), ['design/tokens', 'design/tokens']);
  assert.deepEqual(await rules('a { color: #fff; padding: 13px; border-radius: 3px; }\n', 'web/src/features/home/home.module.css'), ['design/tokens', 'design/tokens', 'design/tokens']);
  assert.deepEqual(await rules('a { color: var(--text-1); padding: var(--space-2); }\n', 'web/src/features/home/home.module.css'), []);
  assert.ok(!(await rules(':root { --accent: #ff4f12; --space-3: 12px; }\n', 'design-system/tokens/colors.css')).includes('design/tokens'));
  assert.deepEqual(await rules("export const color = '#ff4f12';\n", 'design-system/components/core/Example.tsx'), ['no-restricted-syntax']);
  assert.deepEqual(await rules("export const margin = '12px';\n", 'web/src/features/home/Example.tsx'), ['no-restricted-syntax']);
  assert.deepEqual(await rules("export const font = 'font-family: Inter';\n", 'web/src/features/home/Example.tsx'), ['no-restricted-syntax']);
  assert.deepEqual(await rules("export const font = 'font-family: var(--font-sans)';\n", 'web/src/features/home/Example.tsx'), []);
  assert.deepEqual(await rules("import { Button } from '@editonny/design-system/components/core/Button';\nexport { Button };\n", 'web/src/features/home/Example.tsx'), ['no-restricted-imports']);
  assert.deepEqual(await rules("import { Button } from '@editonny/design-system';\nexport { Button };\n", 'web/src/features/home/Example.tsx'), []);
});
