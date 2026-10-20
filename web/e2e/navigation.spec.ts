import { expect, test } from '@playwright/test';

const PAGES = {
  'en-US': { prefix: '/en', create: '/en/create', catalog: '/en/catalog', examples: '/en/examples', install: '/en/install', nav: ['Home', 'Create a request', 'Catalog', 'Examples'], install_: 'Install' },
  'pt-BR': { prefix: '/pt-br', create: '/pt-br/criar', catalog: '/pt-br/catalogo', examples: '/pt-br/exemplos', install: '/pt-br/instalacao', nav: ['Início', 'Criar pedido', 'Catálogo', 'Exemplos'], install_: 'Instalar' },
  es: { prefix: '/es', create: '/es/crear', catalog: '/es/catalogo', examples: '/es/ejemplos', install: '/es/instalacion', nav: ['Inicio', 'Crear pedido', 'Catálogo', 'Ejemplos'], install_: 'Instalar' },
} as const;

for (const [locale, page] of Object.entries(PAGES)) {
  test(`${locale}: the header reaches every page with localized URLs`, async ({ page: browser, isMobile }) => {
    await browser.goto(page.prefix);
    const open = async () => { if (isMobile) await browser.getByRole('button', { name: /menu|menú/i }).click(); };
    const targets = [page.create, page.catalog, page.examples, page.prefix];
    // Desktop links live in the header; on phones they move into the menu dialog.
    const scope = () => (isMobile ? browser.getByRole('dialog') : browser.getByRole('banner'));
    for (const [i, label] of [page.nav[1], page.nav[2], page.nav[3], page.nav[0]].entries()) {
      await open();
      await scope().getByRole('link', { name: label, exact: true }).click();
      await expect(browser).toHaveURL(new RegExp(`${targets[i]}$`));
      await open();
      await expect(scope().getByRole('link', { name: label, exact: true })).toHaveAttribute('aria-current', 'page');
      if (isMobile) await browser.keyboard.press('Escape');
    }
    await open();
    await scope().getByRole('link', { name: page.install_, exact: true }).click();
    await expect(browser).toHaveURL(new RegExp(`${page.install}$`));
  });
}

test('the language menu switches locale, keeps the page and query, and remembers the choice', async ({ page, context }) => {
  await page.goto('/en/catalog?q=title');
  await page.getByRole('button', { name: /^Language: English/ }).click();
  await page.getByRole('option', { name: /Português/ }).click();
  await expect(page).toHaveURL(/\/pt-br\/catalogo\?q=title$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  const cookie = (await context.cookies()).find(item => item.name === 'NEXT_LOCALE');
  expect(cookie?.value).toBe('pt-BR');
  // The choice outlives the browser session (a session cookie reports -1).
  expect(cookie!.expires * 1000).toBeGreaterThan(Date.now() + 300 * 24 * 60 * 60 * 1000);
  await page.goto('/');
  await expect(page).toHaveURL(/\/pt-br$/);
});

test('the skip link moves focus to the main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow');
  await page.goto('/en/create');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#main')).toBeFocused();
});

test('the mobile menu opens as a dialog and closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only');
  await page.goto('/es');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  const dialog = page.getByRole('dialog', { name: 'Menú' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('the theme toggle switches to light and survives a reload', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to the light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Switch to the dark theme' })).toBeVisible();
});

test('the language list stays inside a phone screen', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone layout');
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/pt-br');
  await page.getByRole('button', { name: /^Idioma: Português/ }).click();
  const panel = page.locator('.ds-lang__panel');
  await expect(panel).toBeVisible();
  const box = (await panel.boundingBox())!;
  const width = page.viewportSize()!.width;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
});
