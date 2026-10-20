import { IconButton } from '../core/IconButton';
import { cx, flag, type BaseProps } from '../lib';

/** One review note pinned to a time range: volt index chip, mono range, and the note. Slides in when added. */
export type MarkItemProps = BaseProps & { index: number; range: string; note: string; current?: boolean; onRemove?: () => void; removeLabel?: string };

export function MarkItem({ index, range, note, current, onRemove, removeLabel = 'Remove mark', className, style }: MarkItemProps) {
  return (
    <div className={cx('ds-mark', className)} style={style} data-current={flag(current)}>
      <span className="ds-mark__index">{index}</span>
      <span className="ds-mark__range">{range}</span>
      <span className="ds-mark__note" title={note}>{note}</span>
      {onRemove ? <IconButton icon="x" label={`${removeLabel} ${index}`} variant="ghost" size={30} onClick={onRemove} /> : <span />}
    </div>
  );
}
