import { expect, test } from '@playwright/test';

test('the English home presents the guide and its real numbers', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveTitle('Fassa Frame: intent-led editing');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toContainText('Your idea.');
  await expect(heading).toContainText('Your vision.');
  await expect(page.getByLabel('145', { exact: true })).toBeVisible();
  await expect(page.getByLabel('54', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Tools for a clearer story/ })).toBeVisible();
});

test('home calls to action lead to the localized pages', async ({ page }) => {
  await page.goto('/pt-br');
  await page.getByRole('link', { name: 'Criar meu primeiro pedido' }).click();
  await expect(page).toHaveURL(/\/pt-br\/criar$/);
  await page.goto('/es');
  await page.getByRole('link', { name: 'Cómo empezar' }).click();
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


test('the editorial cover is interactive and keeps the visitor in control', async ({ page }) => {
  await page.goto('/pt-br');
  await expect(page.getByText('Tem uma história aí.')).toBeVisible();
  await page.getByRole('radio', { name: 'Construa', exact: true }).click();
  await expect(page.getByText('Dê ritmo. Dê forma.')).toBeVisible();
  await page.getByRole('radio', { name: 'Refine', exact: true }).click();
  await expect(page.getByText('Sua história. Seu jeito.')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Refine', exact: true })).toHaveAttribute('aria-checked', 'true');
});
