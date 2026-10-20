import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from './ToastProvider';
import { useCopy } from './use-copy';

function CopyButton({ text }: { text: string }) {
  const copy = useCopy();
  return <><pre data-testid="output">{text}</pre><button type="button" onClick={() => copy(text, { success: 'Copied.', fallback: 'Select and copy.' }, document.querySelector('pre'))}>Copy</button></>;
}

const setClipboard = (value: unknown) => Object.defineProperty(navigator, 'clipboard', { value, configurable: true });

afterEach(() => { vi.restoreAllMocks(); setClipboard(undefined); });

describe('useCopy', () => {
  it('writes to the clipboard and shows the success toast', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<ToastProvider><CopyButton text="/editonny" /></ToastProvider>);
    await act(async () => { await userEvent.click(screen.getByRole('button', { name: 'Copy' })); });
    expect(writeText).toHaveBeenCalledWith('/editonny');
    expect(screen.getByRole('status')).toHaveTextContent('Copied.');
  });

  it('selects the text and shows the fallback toast when the clipboard rejects', async () => {
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });
    render(<ToastProvider><CopyButton text="request" /></ToastProvider>);
    await act(async () => { await userEvent.click(screen.getByRole('button', { name: 'Copy' })); });
    expect(screen.getByRole('alert')).toHaveTextContent('Select and copy.');
    expect(getSelection()?.toString()).toBe('request');
  });

  it('falls back when the clipboard API is missing', async () => {
    render(<ToastProvider><CopyButton text="request" /></ToastProvider>);
    await act(async () => { await userEvent.click(screen.getByRole('button', { name: 'Copy' })); });
    expect(screen.getByRole('alert')).toHaveTextContent('Select and copy.');
  });
});
