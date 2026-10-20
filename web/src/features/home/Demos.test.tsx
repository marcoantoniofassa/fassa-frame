import { act, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, expect, it, vi } from 'vitest';
import messages from '../../../messages/en-US.json';
import { stubOffscreen } from '../../../../design-system/components/offscreen.testing';
import { CutDemo } from './Demos';

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
