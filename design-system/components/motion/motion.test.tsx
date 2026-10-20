import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Aurora, Counter, KineticText, Marquee, Reveal } from '../index';
import { stubOffscreen } from '../offscreen.testing';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('motion', () => {
  it('KineticText rotates on screen and pauses off screen', () => {
    vi.useFakeTimers();
    const word = (view: ReturnType<typeof render>) => view.container.querySelector('.ds-kinetic__word');
    const visible = render(<KineticText words={['rhythm.', 'cuts.']} interval={100} />);
    act(() => { vi.advanceTimersByTime(150); });
    expect(word(visible)).toHaveTextContent('cuts.');
    visible.unmount();
    stubOffscreen();
    const hidden = render(<KineticText words={['rhythm.', 'cuts.']} interval={100} />);
    act(() => { vi.advanceTimersByTime(150); });
    expect(word(hidden)).toHaveTextContent('rhythm.');
  });

  it('KineticText keeps the first word for assistive tech', () => {
    render(<KineticText words={['rhythm.', 'cuts.']} />);
    expect(screen.getByText('rhythm.', { selector: '.ds-visually-hidden' })).toBeInTheDocument();
  });

  it('Counter exposes its final value as the accessible label', () => {
    render(<Counter value={145} suffix="+" />);
    expect(screen.getByLabelText('145+')).toBeInTheDocument();
  });

  it('Reveal marks content visible when it enters the viewport', () => {
    render(<Reveal delay={90}><p>Shown</p></Reveal>);
    expect(screen.getByText('Shown').parentElement).toHaveAttribute('data-visible', 'true');
  });

  it('Marquee duplicates the run for the loop and hides the copy', () => {
    const { container } = render(<Marquee items={['Cuts', 'Motion']} />);
    const runs = container.querySelectorAll('.ds-marquee__run');
    expect(runs).toHaveLength(2);
    expect(runs[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('Aurora is decorative', () => {
    const { container } = render(<Aurora palette="volt" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
