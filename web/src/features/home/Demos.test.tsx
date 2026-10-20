import { act, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, expect, it, vi } from 'vitest';
import messages from '../../../messages/en-US.json';
import { stubOffscreen } from '../../../../design-system/components/offscreen.testing';
import { CutDemo } from './Demos';
import { Phone } from './Phone';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

const renderInEnglish = (node: React.ReactNode) => render(<NextIntlClientProvider locale="en-US" messages={messages}>{node}</NextIntlClientProvider>);

it('the cut demo alternates on screen and pauses off screen', () => {
  vi.useFakeTimers();
  const visible = renderInEnglish(<CutDemo />);
  act(() => { vi.advanceTimersByTime(2300); });
  expect(screen.getByText(messages.Home.bento.done)).toBeInTheDocument();
  visible.unmount();
  stubOffscreen();
  renderInEnglish(<CutDemo />);
  act(() => { vi.advanceTimersByTime(2300); });
  expect(screen.getByText(messages.Home.bento.analyzing)).toBeInTheDocument();
});

it('the phone mockup stops its render progress off screen', () => {
  vi.useFakeTimers();
  stubOffscreen();
  renderInEnglish(<Phone />);
  const ring = screen.getByRole('progressbar');
  const before = ring.getAttribute('aria-valuenow');
  act(() => { vi.advanceTimersByTime(1000); });
  expect(ring.getAttribute('aria-valuenow')).toBe(before);
});
