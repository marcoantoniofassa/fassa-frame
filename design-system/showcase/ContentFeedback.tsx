'use client';
import { useState } from 'react';
import { Accordion, Button, Card, CommandLine, Dialog, MediaCard, ProgressRing, PromptCard, SceneCard, StatusLine, StepItem, Toast, type SceneMotif } from '../components/index';
import { Force, Row, Section, Specimen, State, type Theme } from './kit';

const MOTIFS: Array<[SceneMotif, string, string, 'orange' | 'black' | 'volt' | 'fire']> = [['tarja', 'Highlighter', 'Pointers', 'orange'], ['contador', 'Revenue counter', 'General', 'black'], ['passos', 'Three stacked steps', 'General', 'orange'], ['antes', 'Before and after', 'General', 'black'],
  ['seta', 'Final call with button', 'General', 'volt'], ['confete', 'Confetti', 'Video effects', 'orange'], ['chat', 'Chat with AI', 'Interfaces', 'volt'], ['zoom', 'Emphasis zoom', 'Transitions', 'fire']];
const CARD_VARIANTS = ['surface', 'raised', 'glass', 'orange', 'volt', 'white', 'fire'] as const;
const noop = () => {};

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="outline" icon="layers" onClick={() => setOpen(true)}>Open dialog</Button>
    <Dialog open={open} eyebrow="Shortcut" title="Keyboard shortcuts" onClose={() => setOpen(false)} actions={<Button size="sm" onClick={() => setOpen(false)}>Got it</Button>}>
      Space plays or pauses. I and O mark a section.
    </Dialog>
  </>;
}

const content = (theme: Theme, image: string) => <>
  <Specimen theme={theme} name="Card" description="Base container: panels, glass over media, and solid color blocks. Beam marks the one hero object; spotlight follows the cursor; lift rises on hover.">
    <Row label="Variants">{CARD_VARIANTS.map(variant => (
      <State key={variant} label={variant}>
        {variant === 'glass'
          ? <div className="sc-media sc-media--photo" style={{ backgroundImage: `url("${image}")` }}><Card variant={variant} padding="var(--space-4)">Glass card</Card></div>
          : <Card variant={variant} padding="var(--space-4)">{`${variant} card`}</Card>}
      </State>
    ))}</Row>
    <Row label="Effects">
      <State label="Lift hover"><Force value="hover"><Card lift padding="var(--space-4)">Clickable card</Card></Force></State>
      <State label="Spotlight hover"><Force value="hover"><Card spotlight padding="var(--space-4)">Bento tile</Card></Force></State>
      <State label="Beam"><Card beam padding="var(--space-4)">Your request</Card></State>
      <State label="Radius 2xl"><Card variant="orange" radius="2xl" padding="var(--space-5)">Call-out block</Card></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="MediaCard" description="Full-bleed thumbnail with 3D tilt, glare, protection gradient, and duration pill.">
    <Row label="States">
      <State label="Default"><MediaCard image={image} title="Coffee tutorial" meta="Edited 2h ago · 1080p" duration="00:45" playable onClick={noop} /></State>
      <State label="Hover (tilt and glare)"><Force value="hover"><MediaCard image={image} title="Coffee tutorial" meta="Edited 2h ago · 1080p" duration="00:45" playable /></Force></State>
      <State label="Focus"><Force value="focus"><MediaCard image={image} title="City at night" meta="4K" onClick={noop} /></Force></State>
      <State label="Ken Burns, 9:16"><MediaCard image={image} title="Reel" duration="00:30" aspect="9 / 16" kenburns className="sc-narrow" /></State>
      <State label="Empty (no image)"><MediaCard title="Untitled project" meta="No footage yet" /></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="SceneCard" description="Motion catalog entry with a looping schematic preview that plays on hover.">
    <Row label="Motifs (autoplay)">{MOTIFS.map(([motif, name, group, bg]) => (
      <State key={motif} label={motif}><SceneCard motif={motif} name={name} group={group} bg={bg} autoplay duration={6} when="When the speech calls for it." /></State>
    ))}</Row>
    <Row label="States">
      <State label="Idle (paused)"><SceneCard name="Before and after" group="General" motif="antes" bg="black" duration={6} /></State>
      <State label="Hover"><Force value="hover"><SceneCard name="Highlighter" group="Pointers" motif="tarja" duration={4} /></Force></State>
      <State label="Focus"><Force value="focus"><SceneCard name="Confetti" group="Video effects" motif="confete" duration={3} /></Force></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="PromptCard" description="Library entry for a ready-made request; orange floods in from the corner on hover.">
    <Row label="States">
      <State label="Default"><PromptCard index="04" category="Edit" title="Content reel" summary="One complete idea, with rhythm and no forced pitch." /></State>
      <State label="Hover"><Force value="hover"><PromptCard index="04" category="Edit" title="Content reel" summary="One complete idea, with rhythm and no forced pitch." /></Force></State>
      <State label="Focus"><Force value="focus"><PromptCard category="Audio" title="Clean up the voice" summary="Background noise out, complete words in." action="Use this request" /></Force></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="StepItem" description="Numbered step: outlined Anton number fills orange and an underline draws on hover or active.">
    <Row label="States">
      <State label="Default"><StepItem number="01" title="Say what you want to tell">Choose the goal and point to the folder.</StepItem></State>
      <State label="Hover"><Force value="hover"><StepItem number="02" title="Get the first cut right">Review an 8–15 second sample.</StepItem></Force></State>
      <State label="Active"><StepItem number="03" title="Add the finish" active last>Captions, sound, and motion.</StepItem></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="CommandLine" description="Terminal command with volt prompt, blinking caret, typewriter option, and a copy button that flashes volt.">
    <Row label="States">
      <State label="Default"><CommandLine command="python3 install.py --target both" /></State>
      <State label="Typing"><CommandLine command="python3 editonny.py doctor" typing /></State>
      <State label="Copy hover"><Force value="hover" selector="button"><CommandLine command="npm run check" /></Force></State>
      <State label="Copied"><Force attribute="done" value="true" selector="button"><CommandLine command="npm run build" /></Force></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Accordion" description="FAQ list with smooth height; the open item becomes a card and the plus turns into an orange ×.">
    <Row label="States">
      <State label="First open"><Accordion items={[{ title: 'What runs locally?', body: 'Everything runs on your computer.' }, { title: 'Update safely', body: 'Run the installer again.' }]} /></State>
      <State label="All closed, trigger focus"><Force value="focus" selector="button"><Accordion defaultOpen={-1} items={[{ title: 'Global skill or plugin?', body: 'Choose one installation method.' }, { title: 'Use just one agent', body: 'Pass --target codex or claude.' }]} /></Force></State>
      <State label="Empty"><Accordion items={[]} /></State>
    </Row>
  </Specimen>
</>;

const feedback = (theme: Theme) => <>
  <Specimen theme={theme} name="Toast" description="Floating pill confirmation with a popping icon disc.">
    <Row label="Tones">
      <State label="default"><Toast>Mark added</Toast></State>
      <State label="success"><Toast tone="success">Request copied. Paste it into your agent.</Toast></State>
      <State label="error"><Toast tone="error">Clipboard unavailable. Copy the text manually.</Toast></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Dialog" description="Modal with a fire edge; native dialog keeps focus, Escape, and backdrop closing. Inline renders a static panel.">
    <Row label="Inline">
      <State label="With actions">
        <Dialog inline eyebrow="Review" title="Approve the cut?" onClose={noop} actions={<><Button size="sm" variant="ghost">Back</Button><Button size="sm" variant="volt">Approve</Button></>}>
          The agent moves on to style, captions, and motion.
        </Dialog>
      </State>
    </Row>
    <Row label="Modal"><State label="Opens on click"><ModalDemo /></State></Row>
  </Specimen>
  <Specimen theme={theme} name="StatusLine" description="Agent status strip: pulsing dot, badge, shimmer while working, and progress.">
    <div className="sc-stack">
      <StatusLine state="awaiting" badge="Your turn" text="The first cut is ready to review." meta="cut v2 · 00:45" />
      <StatusLine state="working" text="Rendering the 12-second sample…" progress={0.62} />
      <StatusLine state="done" badge="Done" text="Final video ready and checked." meta="final.mp4 · 38 MB" />
      <StatusLine state="idle" text="Waiting for the agent." />
      <StatusLine state="offline" text="Preview server offline. Ask your agent to restart it." />
    </div>
  </Specimen>
  <Specimen theme={theme} name="ProgressRing" description="Circular render progress with a radiating pulse while below 100%.">
    <Row label="Values">
      <State label="Empty"><ProgressRing value={0} label="Queued" /></State>
      <State label="In progress"><ProgressRing value={0.72} label="Render" /></State>
      <State label="Complete"><ProgressRing value={1} color="var(--surface-accent-2)" label="Ready" /></State>
      <State label="Small"><ProgressRing value={0.4} size={64} thickness={6} /></State>
    </Row>
  </Specimen>
</>;

export const ContentSection = ({ image }: { image: string }) => <Section id="content" title="Content" lead="Card, MediaCard, SceneCard, PromptCard, StepItem, CommandLine, and Accordion." render={theme => content(theme, image)} />;
export const FeedbackSection = () => <Section id="feedback" title="Feedback" lead="Toast, Dialog, StatusLine, and ProgressRing." render={feedback} />;
