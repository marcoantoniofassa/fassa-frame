import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Audit the settled page: reduced motion shows every Reveal section immediately and stops looping animations.
test.use({ reducedMotion: 'reduce' });

const PAGES = ['/en', '/en/create', '/en/catalog', '/en/examples', '/en/install', '/pt-br', '/pt-br/criar', '/pt-br/catalogo', '/pt-br/exemplos', '/pt-br/instalacao', '/es', '/es/crear', '/es/catalogo', '/es/ejemplos', '/es/instalacion'];

for (const theme of ['dark', 'light'] as const) {
  for (const path of PAGES) {
    test(`${path} (${theme}) has no console errors, no serious a11y violations, one h1, and no horizontal overflow`, async ({ page }) => {
      const problems: string[] = [];
      page.on('pageerror', error => problems.push(`pageerror: ${error.message}`));
      page.on('console', message => {
        // Next prefetches route CSS. Keep this browser performance notice in the report, not as an application error.
        const deferredCss = message.type() === 'warning' && /^The resource https?:\/\/[^ ]+\/_next\/static\/chunks\/[^ ]+\.css was preloaded using link preload but not used within a few seconds/.test(message.text());
        if (deferredCss) test.info().annotations.push({ type: 'browser-performance-notice', description: message.text() });
        else if (message.type() === 'error' || message.type() === 'warning') problems.push(`${message.type()}: ${message.text()}`);
      });
      await page.addInitScript(value => localStorage.setItem('editonny:theme', JSON.stringify(value)), theme);
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), 'horizontal overflow').toBeLessThanOrEqual(0);
      // Scene motifs (aria-hidden) and caption samples (role="img" with the full text as its name) are illustrations:
      // their lettering is incidental text under WCAG 1.4.3, so they are left out of the audit.
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('.ds-scene__motif').exclude('.ds-caption').analyze();
      const serious = violations.filter(violation => violation.impact === 'serious' || violation.impact === 'critical');
      expect(serious.map(violation => `${violation.id}: ${violation.nodes.slice(0, 3).map(node => node.target.join(' ')).join(' | ')}`)).toEqual([]);
      expect(problems).toEqual([]);
    });
  }
}

test('the design-system showcase renders every specimen in both themes', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop showcase');
  const problems: string[] = [];
  page.on('pageerror', error => problems.push(error.message));
  await page.goto('/design-system');
  await expect(page.locator('.sc-pane[data-theme="dark"] .sc-specimen')).toHaveCount(38);
  await expect(page.locator('.sc-pane[data-theme="light"] .sc-specimen')).toHaveCount(38);
  await page.getByRole('radio', { name: 'Light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.sc-pane[data-theme="dark"]').first()).toBeHidden();
  await page.getByRole('button', { name: 'Open dialog' }).first().click();
  await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeHidden();
  expect(problems).toEqual([]);
});
