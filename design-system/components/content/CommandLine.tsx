'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../core/Icon';
import { useInterval, useReducedMotion } from '../hooks';
import { cx, flag, type BaseProps } from '../lib';

/**
 * Terminal command with a volt prompt, blinking caret, optional typewriter effect, and a copy button that flashes volt.
 * Without clipboard access the command text is selected for manual copying.
 */
export type CommandLineProps = BaseProps & {
  command: string;
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: (command: string) => void;
  /** Called after a failed copy, once the command text is selected for manual copying. */
  onCopyError?: (command: string) => void;
  typing?: boolean;
};

export function CommandLine({ command, copyLabel = 'Copy', copiedLabel = 'Copied', onCopy, onCopyError, typing, className, style }: CommandLineProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(typing ? 0 : command.length);
  const [done, setDone] = useState(false);
  const text = useRef<HTMLSpanElement>(null);
  const animate = typing && !reduced && shown < command.length;
  useInterval(() => setShown(count => count + 1), animate ? 38 : null);
  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setDone(false), 1600);
    return () => clearTimeout(id);
  }, [done]);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(command);
    } catch {
      const range = document.createRange();
      if (text.current) range.selectNodeContents(text.current);
      getSelection()?.removeAllRanges();
      getSelection()?.addRange(range);
      onCopyError?.(command);
      return;
    }
    setDone(true);
    onCopy?.(command);
  };

  return (
    <div className={cx('ds-command', className)} style={style}>
      <code className="ds-command__code" aria-label={command}>
        <span className="ds-command__prompt" aria-hidden="true">$ </span>
        <span ref={text} className="ds-command__text">{typing && !reduced ? command.slice(0, shown) : command}</span>
        <span className="ds-command__caret" aria-hidden="true" />
      </code>
      <button type="button" className="ds-command__copy" aria-label={`${done ? copiedLabel : copyLabel}: ${command}`} data-done={flag(done)} onClick={copy}>
        <span className="ds-command__icon"><Icon name={done ? 'check' : 'copy'} size={14} /></span>
        <span>{done ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
