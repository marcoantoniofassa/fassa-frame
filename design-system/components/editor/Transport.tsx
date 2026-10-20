'use client';
import { IconButton } from '../core/IconButton';
import { cx, flag, type BaseProps } from '../lib';

/** Player controls: accent play button, mono timecode, and frame/second steppers (`onStep` receives ±1 frame or ±30). */
export type TransportProps = BaseProps & {
  playing?: boolean;
  onToggle?: () => void;
  time?: string;
  duration?: string;
  onStep?: (delta: number) => void;
  labels?: { toggle?: string; steps?: [string, string, string, string] };
};

const STEPS = [['chevrons-left', -30], ['chevron-left', -1], ['chevron-right', 1], ['chevrons-right', 30]] as const;
const STEP_LABELS: [string, string, string, string] = ['Back 1 second', 'Back 1 frame', 'Forward 1 frame', 'Forward 1 second'];

export function Transport({ playing = false, onToggle, time = '00:00.00', duration = '00:00.00', onStep, labels, className, style }: TransportProps = {}) {
  const stepLabels = labels?.steps ?? STEP_LABELS;
  return (
    <div className={cx('ds-transport', className)} style={style} data-playing={flag(playing)}>
      <IconButton icon={playing ? 'pause' : 'play'} label={labels?.toggle ?? 'Play or pause'} variant="accent" size={46} onClick={onToggle} className="ds-transport__play" />
      <span className="ds-transport__clock" role="timer" aria-live="off">
        <span className="ds-transport__time">{time}</span>
        <span className="ds-transport__sep" aria-hidden="true">/</span>
        <span className="ds-transport__duration">{duration}</span>
      </span>
      <span className="ds-transport__steps">
        {STEPS.map(([icon, delta], i) => <IconButton key={icon} icon={icon} label={stepLabels[i]!} variant="ghost" size={34} onClick={() => onStep?.(delta)} />)}
      </span>
    </div>
  );
}
