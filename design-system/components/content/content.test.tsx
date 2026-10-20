import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion, Card, CommandLine, MediaCard, PromptCard, SceneCard, StepItem } from '../index';

describe('Accordion', () => {
  it('opens one item at a time and reflects it in aria-expanded', async () => {
    render(<Accordion items={[{ title: 'First', body: 'One' }, { title: 'Second', body: 'Two' }]} />);
    const [first, second] = screen.getAllByRole('button');
    expect(first).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(second!);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(first).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(second!);
    expect(second).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('CommandLine', () => {
  it('copies the command and calls onCopy', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const onCopy = vi.fn();
    render(<CommandLine command="python3 install.py" onCopy={onCopy} />);
    await act(async () => { await userEvent.click(screen.getByRole('button', { name: 'Copy: python3 install.py' })); });
    expect(writeText).toHaveBeenCalledWith('python3 install.py');
    expect(onCopy).toHaveBeenCalledWith('python3 install.py');
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
});

describe('cards', () => {
  it('SceneCard and PromptCard are buttons with accessible names', async () => {
    const onScene = vi.fn();
    render(<>
      <SceneCard name="Revenue counter" group="General" when="Numbers" motif="contador" onClick={onScene} labels={{ hint: 'Play' }} />
      <PromptCard category="Edit" title="Reels" summary="One idea" action="Use" onClick={() => {}} />
    </>);
    await userEvent.click(screen.getByRole('button', { name: /Revenue counter/ }));
    expect(onScene).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: /Reels/ })).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('SceneCard without an action is not a control', () => {
    const { container } = render(<SceneCard name="Preview only" group="General" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelector('.ds-scene')?.tagName).toBe('DIV');
  });

  it('CommandLine reports a failed copy and names its visible state', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) }, configurable: true });
    const onCopyError = vi.fn();
    render(<CommandLine command="npm ci" onCopyError={onCopyError} />);
    await act(async () => { await userEvent.click(screen.getByRole('button', { name: 'Copy: npm ci' })); });
    expect(onCopyError).toHaveBeenCalledWith('npm ci');
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockResolvedValue(undefined) }, configurable: true });
    await act(async () => { await userEvent.click(screen.getByRole('button', { name: 'Copy: npm ci' })); });
    expect(screen.getByRole('button', { name: 'Copied: npm ci' })).toBeInTheDocument();
  });

  it('SceneCard renders a link when href is set', () => {
    render(<SceneCard name="Revenue counter" group="General" href="/catalog?scene=revenue-counter" />);
    expect(screen.getByRole('link', { name: /Revenue counter/ })).toHaveAttribute('href', '/catalog?scene=revenue-counter');
  });

  it('PromptCard renders a link when href is set', () => {
    render(<PromptCard category="Teach" title="A lesson" summary="Clear" action="Use" href="/create?example=lesson" />);
    expect(screen.getByRole('link', { name: /A lesson/ })).toHaveAttribute('href', '/create?example=lesson');
  });

  it('MediaCard becomes keyboard operable when clickable', async () => {
    const onClick = vi.fn();
    render(<MediaCard title="City" meta="9:16" duration="0:12" onClick={onClick} />);
    const card = screen.getByRole('button', { name: 'City, 9:16, 0:12' });
    card.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Card wraps children with a beam container when requested', () => {
    const { container } = render(<Card beam padding="var(--space-6)">Body</Card>);
    expect(container.querySelector('.ds-card-beam .ds-card[data-beam="true"]')).toHaveTextContent('Body');
  });

  it('StepItem renders number, heading, and text', () => {
    render(<StepItem number="01" title="Install">Run it</StepItem>);
    expect(screen.getByRole('heading', { name: 'Install' })).toBeInTheDocument();
    expect(screen.getByText('01')).toHaveClass('ds-step__number');
  });
});
