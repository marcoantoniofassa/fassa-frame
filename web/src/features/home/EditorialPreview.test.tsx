import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { expect, it } from 'vitest';
import messages from '../../../messages/en-US.json';
import { EditorialPreview } from './EditorialPreview';

it('lets a visitor explore the three stages without automatic playback', async () => {
  const user = userEvent.setup();
  render(<NextIntlClientProvider locale="en-US" messages={messages}><EditorialPreview /></NextIntlClientProvider>);
  expect(screen.getByText(messages.Home.art.stage1)).toBeVisible();
  await user.click(screen.getByRole('radio', { name: 'Build' }));
  expect(screen.getByText(messages.Home.art.stage2)).toBeVisible();
  expect(screen.getByRole('radio', { name: 'Build' })).toHaveAttribute('aria-checked', 'true');
  await user.click(screen.getByRole('radio', { name: 'Refine' }));
  expect(screen.getByText(messages.Home.art.stage3)).toBeVisible();
  expect(screen.getByRole('radio', { name: 'Build' })).toHaveAttribute('aria-checked', 'false');
});
