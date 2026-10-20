import assert from 'node:assert/strict';
import { cp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('..', import.meta.url));
const staging = join(root, '.work/static-export');
const output = join(root, 'dist/fassa-frame');
const routingSource = await readFile(join(root, 'web/src/i18n/routing.ts'), 'utf8');
const routingJs = ts.transpileModule(routingSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
// Keep the generated module beside node_modules so its next-intl import resolves.
await mkdir(join(root, '.work'), { recursive: true });
const routingModule = join(root, '.work/static-routing.mjs');
await writeFile(routingModule, routingJs);
const { routing, LOCALE_PREFIXES } = await import(routingModule);
await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });
for (const directory of ['web', 'design-system']) {
  await cp(join(root, directory), join(staging, directory), {
    recursive: true,
    filter: source => !['node_modules', '.next', 'out', 'test-results', 'playwright-report'].includes(source.split('/').at(-1)),
  });
}
await cp(join(root, 'skills/editonny/visuals/assets/visuals/img/city.jpg'), join(staging, 'skills/editonny/visuals/assets/visuals/img/city.jpg'));
await cp(join(root, 'skills/editonny/visuals/catalog.json'), join(staging, 'skills/editonny/visuals/catalog.json'), { recursive: true });
await cp(join(root, 'skills/editonny/engine/assets/fonts/anton'), join(staging, 'skills/editonny/engine/assets/fonts/anton'), { recursive: true });
await symlink(join(root, 'node_modules'), join(staging, 'node_modules'), 'dir');
const app = join(staging, 'web/src/app');
await rm(join(staging, 'web/src/proxy.ts'));
await rm(join(app, '[locale]/[...rest]'), { recursive: true });
// Middleware's localized rewrites become actual build-time routes on static hosts.
for (const [internal, localized] of Object.entries(routing.pathnames)) {
  if (internal === '/') continue;
  for (const pathname of new Set(Object.values(localized))) {
    if (pathname === internal) continue;
    const target = join(app, '[locale]', pathname, 'page.tsx');
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, `export { default, generateMetadata } from '../${internal.slice(1)}/page';\n`);
  }
}
for (const route of ['robots.ts', 'sitemap.ts', 'manifest.ts', '[locale]/opengraph-image.tsx']) {
  const path = join(app, route);
  await writeFile(path, `${await readFile(path, 'utf8')}\nexport const dynamic = 'force-static';\n`);
}
const result = spawnSync(process.execPath, [join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], {
  cwd: join(staging, 'web'), stdio: 'inherit',
  env: { ...process.env, FASSA_FRAME_STATIC_EXPORT: '1' },
});
assert.equal(result.status, 0, 'Static Next.js build failed; existing dist output was preserved.');
const built = join(staging, 'web/out');
for (const locale of routing.locales) {
  for (const [internal, localized] of Object.entries(routing.pathnames)) {
    const pathname = typeof localized === 'string' ? localized : localized[locale];
    const html = await readFile(join(built, LOCALE_PREFIXES[locale], pathname, 'index.html'), 'utf8');
    assert.ok(html.includes(`lang="${locale}"`), `${locale} ${internal}: wrong HTML locale`);
    assert.ok(html.includes('noindex'), `${locale} ${internal}: missing prelaunch noindex`);
    assert.ok(html.includes('/fassa-frame/_next/'), `${locale} ${internal}: missing basePath assets`);
  }
}
await writeFile(join(built, 'index.html'), '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=/fassa-frame/pt-br/"><title>Fassa Frame</title></head><body><a href="/fassa-frame/pt-br/">Abrir Fassa Frame</a></body></html>\n');
await rm(output, { recursive: true, force: true });
await cp(built, output, { recursive: true });
console.log(`Static guide exported to ${resolve(output)}`);
