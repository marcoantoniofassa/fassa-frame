import { expect, test } from '@playwright/test';

test('the English home presents the guide and its real numbers', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveTitle('Fassa Frame: intent-led editing');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toContainText('You have');
  await expect(heading).toContainText('the story.');
  await expect(page.getByLabel('145', { exact: true })).toBeVisible();
  await expect(page.getByLabel('54', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Everything an editor does/ })).toBeVisible();
});

test('home calls to action lead to the localized pages', async ({ page }) => {
  await page.goto('/pt-br');
  await page.getByRole('link', { name: 'Criar meu primeiro pedido' }).click();
  await expect(page).toHaveURL(/\/pt-br\/criar$/);
  await page.goto('/es');
  await page.getByRole('link', { name: 'Instalar la skill' }).click();
  await expect(page).toHaveURL(/\/es\/instalacion$/);
});

test('starting points open the create page with their example applied', async ({ page }) => {
  await page.goto('/en');
  const start = page.getByRole('link', { name: /A lesson with a clear opening/ });
  await expect(start).toHaveAttribute('href', '/en/create?example=lesson');
});

test('reduced motion keeps every section readable', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/es');
  await expect(page.getByRole('heading', { level: 2, name: /Menos operaciones/ })).toBeVisible();
  await expect(page.getByText('Dale el acabado')).toBeVisible();
  await context.close();
});
