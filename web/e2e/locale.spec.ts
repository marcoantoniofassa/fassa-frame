import { expect, test } from '@playwright/test';
import en from '../messages/en-US.json' with { type: 'json' };

// Locale detection only depends on request headers, so one viewport is enough.
test.skip(({ isMobile }) => isMobile, 'header-only behavior');

// The browser derives Accept-Language from the context locale, as a real visitor's browser does.
for (const [locale, prefix] of [['pt-BR', '/pt-br'], ['pt', '/pt-br'], ['pt-PT', '/pt-br'], ['es-419', '/es'], ['es-MX', '/es'], ['fr-FR', '/en'], ['en-GB', '/en']] as const) {
  test(`a browser in ${locale} lands on ${prefix}`, async ({ browser }) => {
    const context = await browser.newContext({ locale });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(new RegExp(`${prefix}$`));
    await context.close();
  });
}

test('weighted Accept-Language lists pick the preferred supported language', async ({ request }) => {
  for (const [header, prefix] of [['fr-FR,es;q=0.8,en;q=0.5', '/es'], ['pt-BR,pt;q=0.9,en;q=0.8', '/pt-br']] as const) {
    const response = await request.get('/', { headers: { 'Accept-Language': header }, maxRedirects: 0 });
    expect(response.headers().location, header).toMatch(new RegExp(`${prefix}$`));
  }
});

test('a request without Accept-Language falls back to English', async ({ request }) => {
  const response = await request.get('/', { headers: { 'Accept-Language': '' }, maxRedirects: 0 });
  expect(response.status()).toBeGreaterThanOrEqual(300);
  expect(response.headers().location).toMatch(/\/en$/);
});

test('the NEXT_LOCALE cookie wins over Accept-Language', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ locale: 'pt-BR' });
  await context.addCookies([{ name: 'NEXT_LOCALE', value: 'es', url: baseURL! }]);
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveURL(/\/es$/);
  await context.close();
});

test('localized pathnames render with the right lang attribute', async ({ page }) => {
  for (const [path, lang] of [['/pt-br/criar', 'pt-BR'], ['/es/crear', 'es'], ['/en/create', 'en-US'], ['/pt-br/catalogo', 'pt-BR'], ['/es/ejemplos', 'es'], ['/en/install', 'en-US']] as const) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
  }
});

test('unknown paths return 404 without a server error', async ({ request }) => {
  for (const path of ['/pt-br/nope', '/en/criar/extra', '/xx/create']) {
    const response = await request.get(path, { headers: { 'Accept-Language': 'en' } });
    expect(response.status(), path).toBe(404);
  }
});

test('every locale page advertises all alternates and x-default', async ({ page }) => {
  await page.goto('/pt-br/catalogo');
  const alternates = await page.locator('link[rel="alternate"][hreflang]').evaluateAll(links => links.map(link => [link.getAttribute('hreflang'), new URL(link.getAttribute('href') ?? '').pathname]));
  expect(alternates).toEqual(expect.arrayContaining([['en-US', '/en/catalog'], ['pt-BR', '/pt-br/catalogo'], ['es', '/es/catalogo'], ['x-default', '/catalog']]));
});

test('pages send the browser only the interface text their interactive parts use', async ({ request }) => {
  const home = await (await request.get('/en')).text();
  expect(home).not.toContain(en.Install.faq1Body);
  expect(home).not.toContain(en.Create.lead);
  const install = await (await request.get('/en/install')).text();
  expect(install).not.toContain(en.Create.lead);
  expect(install).not.toContain(en.Home.bento.analyzing);
});

test('the design-system route is not localized', async ({ page }) => {
  const response = await page.goto('/design-system');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/design-system$/);
});

test('each locale serves its Open Graph image', async ({ page, request }) => {
  for (const path of ['/en', '/pt-br/criar', '/es/catalogo']) {
    await page.goto(path);
    const image = new URL(await page.locator('meta[property="og:image"]').getAttribute('content') ?? '');
    const response = await request.get(image.pathname + image.search);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type'], path).toBe('image/png');
  }
});

test('metadata routes are served without locale redirects', async ({ request }) => {
  for (const path of ['/sitemap.xml', '/robots.txt', '/manifest.webmanifest', '/icon.svg']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/pt-br/criar');
  expect(sitemap).toContain('hreflang="es"');
});

test('an unsupported locale in an Open Graph image path returns 404', async ({ request }) => {
  const response = await request.get('/xx/opengraph-image');
  expect(response.status()).toBe(404);
});
