'use client';
import type { ReactNode } from 'react';
import { Badge, Button, ChoiceCard, Eyebrow, Icon, IconButton, Kbd, SegmentedControl, Select, Switch, TextField, Wordmark, iconNames } from '../components/index';
import { Force, OnMedia, Row, Section, Specimen, State, type Theme } from './kit';

const BUTTON_VARIANTS = ['primary', 'volt', 'white', 'dark', 'glass', 'outline', 'ghost'] as const;
const BADGE_TONES = ['neutral', 'solid', 'accent', 'volt', 'soft', 'success', 'warning', 'danger', 'rec'] as const;
const noop = () => {};

const Orange = ({ children }: { children: ReactNode }) => <div className="sc-orange">{children}</div>;
const Plain = ({ children }: { children: ReactNode }) => <>{children}</>;

/** Default, hover, active, focus, disabled, and loading states for one button variant on the surface it is designed for. */
function ButtonStates({ variant }: { variant: typeof BUTTON_VARIANTS[number] }) {
  const Backdrop = variant === 'glass' ? OnMedia : variant === 'white' ? Orange : Plain;
  return <>
    <State label="Default"><Backdrop><Button variant={variant} iconRight="arrow-up-right">Create request</Button></Backdrop></State>
    <State label="Hover"><Backdrop><Force value="hover"><Button variant={variant} iconRight="arrow-up-right">Create request</Button></Force></Backdrop></State>
    <State label="Active"><Backdrop><Force value="active"><Button variant={variant}>Create request</Button></Force></Backdrop></State>
    <State label="Focus"><Backdrop><Force value="focus"><Button variant={variant}>Create request</Button></Force></Backdrop></State>
    <State label="Disabled"><Backdrop><Button variant={variant} disabled>Create request</Button></Backdrop></State>
    <State label="Loading"><Backdrop><Button variant={variant} loading>Rendering…</Button></Backdrop></State>
  </>;
}

const core = (theme: Theme) => <>
  <Specimen theme={theme} name="Button" description="Pill button with shine sweep, lift, and spring press. One primary per view; glass sits on media.">
    {BUTTON_VARIANTS.map(variant => <Row key={variant} label={variant}><ButtonStates variant={variant} /></Row>)}
    <Row label="Sizes">
      <State label="sm"><Button size="sm">Save</Button></State>
      <State label="md"><Button>Save</Button></State>
      <State label="lg"><Button size="lg" icon="copy">Copy request</Button></State>
      <State label="Block"><div className="sc-wide"><Button block>Copy request</Button></div></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="IconButton" description="Icon-only button: tile tools, glass on media, accent play, volt confirm, ghost toolbar.">
    <Row label="tile">
      <State label="Default"><IconButton icon="scissors" label="Cut" size={56} /></State>
      <State label="Hover"><Force value="hover"><IconButton icon="type" label="Text" size={56} /></Force></State>
      <State label="Active press"><Force value="active"><IconButton icon="volume-2" label="Audio" size={56} /></Force></State>
      <State label="Focus"><Force value="focus"><IconButton icon="wand-sparkles" label="Motion" size={56} /></Force></State>
      <State label="Selected (tool on)"><IconButton icon="scissors" label="Cut" size={56} active /></State>
      <State label="Disabled"><IconButton icon="layers" label="Layers" size={56} disabled /></State>
    </Row>
    <Row label="Variants">
      <State label="glass"><OnMedia><IconButton icon="chevron-left" label="Back" variant="glass" /></OnMedia></State>
      <State label="accent"><IconButton icon="play" label="Play" variant="accent" /></State>
      <State label="volt"><IconButton icon="check" label="Confirm" variant="volt" /></State>
      <State label="ghost"><IconButton icon="x" label="Close" variant="ghost" /></State>
      <State label="ghost hover"><Force value="hover"><IconButton icon="x" label="Close" variant="ghost" /></Force></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Badge" description="Pill for durations, formats, and status. Mono for timecodes; live adds a pulsing dot.">
    <Row label="Tones">{BADGE_TONES.map(tone => <State key={tone} label={tone}><Badge tone={tone}>{tone === 'rec' ? 'REC' : tone}</Badge></State>)}</Row>
    <Row label="Mono and live">
      <State label="mono"><Badge mono>01:48</Badge></State>
      <State label="live accent"><Badge tone="volt" live>Rendering</Badge></State>
      <State label="live rec"><Badge tone="rec" live>REC</Badge></State>
      <State label="on media"><OnMedia><Badge mono>00:45</Badge></OnMedia></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Eyebrow" description="Mono uppercase kicker above headings with an optional live dot or index chip.">
    <Row label="Variants">
      <State label="Plain"><Eyebrow>Request library</Eyebrow></State>
      <State label="Live dot"><Eyebrow dot>Your studio. Your AI.</Eyebrow></State>
      <State label="Index"><Eyebrow index="01">How it works</Eyebrow></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Kbd" description="Keyboard shortcut chip used in the preview.">
    <Row label="Keys">
      <State label="Word"><Kbd>Space</Kbd></State>
      <State label="Letter"><Kbd>I</Kbd></State>
      <State label="Arrows"><span className="sc-inline"><Kbd>←</Kbd><Kbd>→</Kbd></span></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Wordmark" description='Heavy "e" block, the name, and a dot. The default tone follows the theme surface.'>
    <Row label="Tones">
      <State label="dark (adaptive)"><Wordmark size={28} /></State>
      <State label="Hover"><Force value="hover"><Wordmark size={28} /></Force></State>
      <State label="light"><div className="sc-white"><Wordmark size={28} tone="light" /></div></State>
      <State label="orange"><Orange><Wordmark size={28} tone="orange" /></Orange></State>
      <State label="Icon only, animated"><Wordmark size={32} iconOnly animated /></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Icon" description={`Lucide line icons inherit currentColor; ${iconNames().length} are bundled. Pass base to use an external folder.`}>
    <div className="sc-icons">{iconNames().map(name => <figure key={name} className="sc-icon"><Icon name={name} size={22} /><figcaption>{name}</figcaption></figure>)}</div>
  </Specimen>
</>;

const forms = (theme: Theme) => <>
  <Specimen theme={theme} name="TextField" description="Labeled input or textarea: well that glows on focus; counter adds n/max and a filling underline.">
    <Row label="States">
      <State label="Empty"><TextField label="Video folder" placeholder="For example, /Users/you/Videos" help="The guide does not access or upload files." /></State>
      <State label="Hover"><Force value="hover"><TextField label="Video folder" defaultValue="/Users/ana/Videos/coffee" /></Force></State>
      <State label="Focus"><Force value="focus"><TextField label="Hook text" counter={40} defaultValue="Nobody told you this about" /></Force></State>
      <State label="Error"><TextField label="Video folder" defaultValue="Videos" error="Use the full folder path." /></State>
      <State label="Disabled"><TextField label="Output" defaultValue="final.mp4" disabled /></State>
      <State label="Multiline"><TextField label="What would you like to create?" multiline rows={3} defaultValue="A 45-second coffee tutorial with clear steps." /></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Select" description="Native select on a well with a chevron tile that turns orange and flips on focus.">
    <Row label="States">
      <State label="Default"><Select label="Format" options={['9:16 (vertical)', '16:9 (horizontal)', '1:1 (square)']} /></State>
      <State label="Hover"><Force value="hover"><Select label="Pace" options={[{ value: 'natural', label: 'Natural and flowing' }]} /></Force></State>
      <State label="Focus"><Force value="focus"><Select label="Pace" options={[{ value: 'natural', label: 'Natural and flowing' }]} /></Force></State>
      <State label="Disabled"><Select label="Format" options={['9:16 (vertical)']} disabled /></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="ChoiceCard" description="Radio-style card: orange border, glow, and a popping check when selected; compact pills fill orange.">
    <Row label="Icon">
      <State label="Default"><ChoiceCard icon="terminal" title="Codex" description="$editonny" /></State>
      <State label="Hover"><Force value="hover"><ChoiceCard icon="terminal" title="Codex" description="$editonny" /></Force></State>
      <State label="Focus"><Force value="focus"><ChoiceCard icon="sparkles" title="Claude Code" description="/editonny" /></Force></State>
      <State label="Selected"><ChoiceCard icon="sparkles" title="Claude Code" description="/editonny" selected /></State>
      <State label="Disabled"><ChoiceCard icon="cpu" title="Remote render" description="Requires authorization" disabled /></State>
    </Row>
    <Row label="Compact">
      <State label="Default"><ChoiceCard compact title="720p" /></State>
      <State label="Active press"><Force value="active"><ChoiceCard compact title="1080p" /></Force></State>
      <State label="Selected"><ChoiceCard compact title="1080p" selected /></State>
    </Row>
    <Row label="Media">
      <State label="Stacked"><ChoiceCard media={<div className="sc-thumb">every word</div>} title="Word by word" /></State>
      <State label="Stacked selected"><ChoiceCard media={<div className="sc-thumb">every word</div>} title="Word by word" selected /></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="Switch" description="On/off with spring knob; with a label it becomes a full toggle row.">
    <Row label="States">
      <State label="Off"><Switch ariaLabel="Captions" /></State>
      <State label="On"><Switch ariaLabel="Captions" checked /></State>
      <State label="Focus"><Force value="focus"><Switch ariaLabel="Captions" /></Force></State>
      <State label="Disabled"><Switch ariaLabel="Captions" disabled /></State>
      <State label="Row on"><Switch label="Captions" description="For people watching without sound" checked /></State>
      <State label="Row hover"><Force value="hover"><Switch label="End call to action" /></Force></State>
    </Row>
  </Specimen>
  <Specimen theme={theme} name="SegmentedControl" description="Pill tabs with a spring indicator, glass or solid orange; dot marks the stage awaiting you.">
    <Row label="Tones">
      <State label="Glass with dot"><SegmentedControl label="Stages" options={['Cut', { value: 'Style', label: 'Style', dot: true }, 'Final']} value="Style" onChange={noop} /></State>
      <State label="Solid small"><SegmentedControl label="Format" tone="solid" size="sm" options={['Reels', 'Story', 'TikTok']} value="Reels" onChange={noop} /></State>
    </Row>
    <Row label="Option states">
      <State label="Hover"><Force value="hover" selector="button:nth-of-type(2)"><SegmentedControl label="Stages" options={['Cut', 'Style', 'Final']} value="Cut" onChange={noop} /></Force></State>
      <State label="Focus"><Force value="focus" selector="button:nth-of-type(3)"><SegmentedControl label="Stages" options={['Cut', 'Style', 'Final']} value="Cut" onChange={noop} /></Force></State>
    </Row>
  </Specimen>
</>;

/** Core and form components with their states, once per theme. */
export const CoreSection = () => <Section id="core" title="Core" lead="Button, IconButton, Badge, Eyebrow, Kbd, Wordmark, and Icon." render={core} />;
export const FormsSection = () => <Section id="forms" title="Forms" lead="TextField, Select, ChoiceCard, Switch, and SegmentedControl." render={forms} />;
