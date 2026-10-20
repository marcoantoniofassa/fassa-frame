'use client';
import { useState, type FormEvent } from 'react';
import { Badge, Button, Card, Kbd, KineticCaption, MarkItem, TextField, Timeline, Transport, useInterval } from '../../components/index';

type Mark = { start: number; end: number; note: string };
type CutViewProps = { final?: boolean; image: string; onApprove: () => void; toast: (message: string) => void };

const DURATION = 45;
const SEGMENTS = [
  { start: 0, end: 6, beat: 'Hook', quote: 'Nobody told you this about coffee' },
  { start: 6, end: 17, beat: 'Problem', quote: 'Most people overheat the water' },
  { start: 17, end: 33, beat: 'Step by step', quote: 'First, 94 degrees. Then, the bloom' },
  { start: 33, end: 45, beat: 'Call to action', quote: 'Save it to try tomorrow' },
];
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(2).padStart(5, '0')}`;
const clampTime = (value: number) => Math.max(0, Math.min(DURATION, value));

/** Cut review (and Final with `final`): 9:16 player, transport, beat timeline, marks with an add form, and approval. */
export function CutView({ final, image, onApprove, toast }: CutViewProps) {
  const [t, setT] = useState(9.2);
  const [playing, setPlaying] = useState(false);
  const [inPoint, setInPoint] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ start: number; end: number; note: string } | null>(null);
  const [marks, setMarks] = useState<Mark[]>([{ start: 22, end: 26, note: 'remove this part, it repeats' }]);
  const segment = SEGMENTS.find(s => t >= s.start && t < s.end) ?? SEGMENTS[0]!;
  useInterval(() => setT(now => (now + 0.1 > DURATION ? 0 : now + 0.1)), playing ? 100 : null);

  const openForm = () => {
    if (inPoint === null) return;
    setDraft({ start: inPoint, end: Math.max(inPoint + 0.5, t), note: '' });
  };
  const closeForm = () => { setInPoint(null); setDraft(null); };
  const addMark = (event: FormEvent) => {
    event.preventDefault();
    if (!draft) return;
    setMarks([...marks, { start: draft.start, end: draft.end, note: draft.note.trim() || 'adjust this section' }]);
    closeForm();
    toast('Mark added');
  };

  return (
    <div className="tpl-cut">
      <div className="tpl-cut__player">
        <div className="tpl-player" data-surface="media">
          {/* eslint-disable-next-line @next/next/no-img-element -- showcase template, decorative still */}
          <img className="tpl-player__image" src={image} alt="" style={{ objectPosition: `${30 + t}% 50%` }} />
          <div className="tpl-player__protect" />
          <div className="tpl-player__hook" hidden={!(final || t < 6)}>Nobody told you <span>this</span> about coffee</div>
          <div className="tpl-player__caption">
            <KineticCaption key={`${segment.quote}-${playing}`} text={segment.quote} playing={playing} loop={false} size={24} highlight={final ? 'var(--sun-400)' : 'var(--fog-50)'} />
          </div>
          <button type="button" className="tpl-player__toggle" aria-label="Play or pause the preview" onClick={() => setPlaying(!playing)}>
            <span className="tpl-player__play" aria-hidden="true" hidden={playing} />
          </button>
          <div className="tpl-player__badge">{final ? <Badge tone="volt" live>FINAL · 1080p</Badge> : <Badge mono>CUT v2</Badge>}</div>
        </div>
        <Transport playing={playing} time={fmt(t)} duration="00:45.00" onToggle={() => setPlaying(!playing)} onStep={delta => setT(clampTime(t + delta / 30))} />
        <p className="tpl-cut__beat"><b>{segment.beat}</b>{`“${segment.quote}”`}</p>
      </div>
      <div className="tpl-cut__panels">
        <Card padding="var(--space-4)" radius="lg">
          <div className="tpl-panel__head"><h3>Timeline</h3><span>Click to navigate · arrow keys move 1 second</span></div>
          <Timeline duration={DURATION} playhead={t} playing={playing} segments={SEGMENTS} onSeek={value => setT(clampTime(value))} label="Edit timeline" />
        </Card>
        <Card padding="var(--space-4)" radius="lg" className="tpl-marks">
          <div className="tpl-panel__head"><h3>Marks <span className="tpl-marks__count">{marks.length}</span></h3><span className="tpl-marks__unsaved">Not saved</span></div>
          <p className="tpl-panel__text">Found something to change? Mark the start and end of the section and say what to do.</p>
          <div className="tpl-marks__buttons">
            <Button size="sm" variant="dark" onClick={() => { setInPoint(t); toast(`Start marked at ${fmt(t)}`); }}>Mark start <Kbd>I</Kbd></Button>
            <Button size="sm" variant="dark" disabled={inPoint === null} onClick={openForm}>Mark end <Kbd>O</Kbd></Button>
            <Button size="sm" variant="outline" icon="sparkles" onClick={() => toast(`Motion requested at ${fmt(t)}`)}>Motion here <Kbd>M</Kbd></Button>
          </div>
          <div className="tpl-marks__form">
            {draft && (
              <form className="tpl-marks__draft" onSubmit={addMark}>
                <span className="tpl-marks__range">{`${fmt(draft.start)} – ${fmt(draft.end)}`}</span>
                <TextField ariaLabel="What should change in this section?" placeholder="What should change here? For example, remove this part" autoFocus
                  value={draft.note} onChange={event => setDraft({ ...draft, note: event.target.value })} />
                <div className="tpl-marks__actions">
                  <Button size="sm" variant="ghost" onClick={closeForm}>Cancel</Button>
                  <Button size="sm" type="submit">Add mark</Button>
                </div>
              </form>
            )}
          </div>
          <div className="tpl-marks__list">
            {marks.map((mark, i) => (
              <MarkItem key={`${mark.start}-${i}`} index={i + 1} range={`${fmt(mark.start)} – ${fmt(mark.end)}`} note={mark.note} current={t >= mark.start && t <= mark.end}
                onRemove={() => setMarks(marks.filter((_, j) => j !== i))} />
            ))}
            {!marks.length && <p className="tpl-empty">No marks yet. Mark a start and an end to describe a change.</p>}
          </div>
        </Card>
        <Card padding="var(--space-3)" radius="lg" className="tpl-cut__footer">
          <TextField ariaLabel="Comment for the agent (optional)" placeholder="Comment for the agent (optional)" />
          <div className="tpl-cut__actions">
            {final && <Button variant="ghost" icon="download" onClick={() => toast('Download starts from the local preview.')}>Download video</Button>}
            <Button variant="outline" onClick={() => toast('Marks saved')}>Save marks</Button>
            <Button variant="volt" icon="check" onClick={onApprove}>Approve</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
