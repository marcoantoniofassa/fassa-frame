import { expect, test } from '@playwright/test';

test('installation steps show literal commands that copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/pt-br/instalacao');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Seu primeiro vídeo');
  for (const title of ['Baixe o projeto', 'Registre a skill', 'Confira antes de editar', 'Faça seu primeiro pedido']) await expect(page.getByRole('heading', { name: title })).toBeVisible();
  await page.getByRole('button', { name: 'Copiar: python3 install.py --target both' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Comando copiado.' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('python3 install.py --target both');
  await expect(page.getByText('python3 ~/.local/share/fassa-frame/scripts/editonny.py doctor')).toBeVisible();
});

test('the installation request copies in the visitor language', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/es/instalacion');
  await page.getByRole('button', { name: 'Copiar pedido de instalación' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Pedido de instalación copiado.' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^Instala Fassa Frame de https:\/\/github.com\/marcoantoniofassa\/fassa-frame/);
});

test('the FAQ opens one answer at a time', async ({ page }) => {
  await page.goto('/en/install');
  const first = page.getByRole('button', { name: 'What is a skill?' });
  const second = page.getByRole('button', { name: 'Update safely' });
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await second.click();
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText('It backs up the previous installation')).toBeVisible();
});

test('the installation page covers one agent, removal, the Claude Code plugin, and restarting the agent', async ({ page }) => {
  await page.goto('/en/install');
  await expect(page.getByText('Restart your agent afterward so it discovers the skill.')).toBeVisible();
  for (const [title, text] of [
    ['Do I need both assistants?', 'You can install for just that assistant.'],
    ['Remove agent registrations', 'python3 install.py --target both --uninstall'],
    ['Load as a Claude Code plugin', 'claude --plugin-dir'],
  ]) {
    await page.getByRole('button', { name: title }).click();
    await expect(page.getByText(text)).toBeVisible();
  }
});

test('the last step leads to the create page', async ({ page }) => {
  await page.goto('/en/install');
  await page.getByRole('main').getByRole('link', { name: 'Build my request' }).click();
  await expect(page).toHaveURL(/\/en\/create$/);
});

test('a failed command copy explains how to copy manually', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } }); });
  await page.goto('/en/install');
  await page.getByRole('button', { name: 'Copy: python3 install.py --target both' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'The text is selected' })).toBeVisible();
});


test('download and setup request identify the Fassa Frame distribution', async ({ page }) => {
  await page.goto('/en/install');
  await expect(page.getByRole('link', { name: 'Open the latest release' })).toHaveAttribute('href', 'https://github.com/marcoantoniofassa/fassa-frame/releases/latest');
  await expect(page.getByText('Install Fassa Frame from https://github.com/marcoantoniofassa/fassa-frame', { exact: false })).toBeVisible();
});
