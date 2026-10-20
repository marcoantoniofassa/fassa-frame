import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dialog, ProgressRing, StatusLine, Toast } from '../index';

describe('Dialog', () => {
  it('opens as a modal with a labelled title and closes on Escape', async () => {
    const onClose = vi.fn();
    render(<Dialog open title="Revenue counter" eyebrow="General" onClose={onClose}>Body</Dialog>);
    const dialog = screen.getByRole('dialog', { name: 'Revenue counter' });
    expect(dialog).toHaveAttribute('open');
    fireEvent(dialog, new Event('cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the close button and from a backdrop click', async () => {
    const onClose = vi.fn();
    render(<Dialog open title="Example" closeLabel="Close" onClose={onClose}>Body</Dialog>);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    const dialog = screen.getByRole('dialog', { name: 'Example' });
    fireEvent.click(dialog, { clientX: -10, clientY: -10 });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('does not render the modal when closed', () => {
    render(<Dialog open={false} title="Hidden">Body</Dialog>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('status components', () => {
  it('Toast is a status message, or an alert for errors', () => {
    render(<><Toast tone="success">Copied</Toast><Toast tone="error">Failed</Toast></>);
    expect(screen.getByRole('status')).toHaveTextContent('Copied');
    expect(screen.getByRole('alert')).toHaveTextContent('Failed');
  });

  it('ProgressRing clamps and reports its value', () => {
    render(<ProgressRing value={1.4} label="Render" />);
    expect(screen.getByRole('progressbar', { name: 'Render' })).toHaveAttribute('aria-valuenow', '100');
  });

  it('StatusLine shows its badge and text', () => {
    render(<StatusLine state="working" badge="Your turn" text="Rendering" progress={0.5} />);
    expect(screen.getByRole('status')).toHaveTextContent('Your turnRendering');
  });
});
