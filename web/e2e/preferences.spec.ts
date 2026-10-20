import { expect, test } from '@playwright/test';

test('a saved light theme is applied before the page renders', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('editonny:theme', JSON.stringify('light'));
    document.addEventListener('DOMContentLoaded', () => { (window as unknown as { themeAtLoad: string }).themeAtLoad = document.documentElement.dataset.theme ?? ''; });
  });
  await page.goto('/pt-br/catalogo');
  expect(await page.evaluate(() => (window as unknown as { themeAtLoad: string }).themeAtLoad)).toBe('light');
});

test('a corrupted saved brief loads the defaults without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => {
    localStorage.setItem('editonny:draft', '{bad');
    localStorage.setItem('editonny:theme', '"purple"');
  });
  await page.goto('/en/create');
  await expect(page.getByLabel('Generated editing request')).toContainText('[enter the video folder]');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(errors).toEqual([]);
});

test('blocked storage still renders and builds requests', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const deny = () => { throw new DOMException('denied', 'SecurityError'); };
    Storage.prototype.getItem = deny;
    Storage.prototype.setItem = deny;
    Storage.prototype.removeItem = deny;
  });
  await page.goto('/es/crear');
  await page.getByLabel('Carpeta de los videos en tu computadora').fill('/Videos/Málaga/東京');
  await expect(page.getByLabel('Pedido de edición generado')).toContainText('/Videos/Málaga/東京');
  await page.getByRole('button', { name: /Cambiar al tema oscuro/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('a very long goal stays inside the layout on phones', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone layout');
  await page.goto('/en/create');
  await page.getByLabel('What would you like to create?').fill('Explain-a-very-long-unbroken-goal-'.repeat(60));
  await page.getByLabel('Video folder on your computer').fill('/Users/someone/' + 'very-long-folder-name/'.repeat(20));
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
});

test('hydration never flips a saved light theme back to dark', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('editonny:theme', JSON.stringify('light'));
    const seen: string[] = [];
    (window as unknown as { themes: string[] }).themes = seen;
    new MutationObserver(() => seen.push(document.documentElement.dataset.theme ?? '')).observe(document, { attributes: true, subtree: true, attributeFilter: ['data-theme'] });
  });
  await page.goto('/en');
  await page.waitForLoadState('networkidle');
  const themes = await page.evaluate(() => (window as unknown as { themes: string[] }).themes);
  expect(themes.filter(theme => theme === 'dark')).toEqual([]);
});
