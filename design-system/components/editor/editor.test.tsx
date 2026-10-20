import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KineticCaption, MarkItem, Timeline, Transport, Waveform } from '../index';
import { stubOffscreen } from '../offscreen.testing';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

const segments = [{ start: 0, end: 8, beat: 'Hook', quote: 'Nobody told you' }, { start: 8, end: 45, beat: 'Steps', quote: '94 degrees' }];

describe('Timeline', () => {
  it('positions the playhead and marks the current segment from props', () => {
    const { container } = render(<Timeline duration={45} playhead={9} segments={segments} marks={[{ start: 30, end: 35 }]} />);
    expect(container.querySelector('.ds-timeline__playhead')).toHaveStyle({ '--left': '20%' });
    const current = container.querySelectorAll('.ds-timeline__segment');
    expect(current[1]).toHaveAttribute('data-current', 'true');
    expect(current[0]).toHaveAttribute('data-current', 'false');
  });

  it('is a keyboard slider when seekable', async () => {
    const onSeek = vi.fn();
    render(<Timeline duration={45} playhead={10} segments={segments} label="Review" onSeek={onSeek} />);
    const slider = screen.getByRole('slider', { name: 'Review' });
    slider.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onSeek).toHaveBeenCalledWith(11);
  });
});

describe('editor controls', () => {
  it('Transport reflects the playing prop and steps by frames', async () => {
    const onStep = vi.fn();
    const { rerender } = render(<Transport playing={false} time="00:01.00" duration="00:45.00" onStep={onStep} />);
    await userEvent.click(screen.getByRole('button', { name: 'Forward 1 frame' }));
    expect(onStep).toHaveBeenCalledWith(1);
    rerender(<Transport playing time="00:02.00" duration="00:45.00" />);
    expect(screen.getByRole('timer')).toHaveTextContent('00:02.00');
  });

  it('MarkItem exposes a remove action', async () => {
    const onRemove = vi.fn();
    render(<MarkItem index={2} range="00:30–00:35" note="Tighten" onRemove={onRemove} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remove mark 2' }));
    expect(onRemove).toHaveBeenCalled();
  });

  it('Waveform flattens cut bars and stays decorative', () => {
    const { container } = render(<Waveform bars={10} cuts={[[0, 0.2]]} />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('[data-cut="true"]')).toHaveLength(2);
  });

  it('KineticCaption announces the whole text', () => {
    render(<KineticCaption text="Every word on time" />);
    expect(screen.getByRole('img', { name: 'Every word on time' })).toBeInTheDocument();
  });

  it('KineticCaption advances on screen and pauses off screen', () => {
    vi.useFakeTimers();
    const active = (view: ReturnType<typeof render>) => view.container.querySelector('[data-state="on"]');
    const visible = render(<KineticCaption text="one two three" wps={10} />);
    act(() => { vi.advanceTimersByTime(150); });
    expect(active(visible)).toHaveTextContent('two');
    visible.unmount();
    stubOffscreen();
    const hidden = render(<KineticCaption text="one two three" wps={10} />);
    act(() => { vi.advanceTimersByTime(150); });
    expect(active(hidden)).toHaveTextContent('one');
  });
});
