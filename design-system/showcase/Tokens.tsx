import { Fragment } from 'react';
import { Section } from './kit';

const PALETTES: Array<[string, string[]]> = [
  ['Ink', ['950', '900', '850', '800', '700', '600', '500', '400'].map(s => `--ink-${s}`)],
  ['Fog', ['50', '200', '400', '500', '600'].map(s => `--fog-${s}`)],
  ['Orange', ['50', '100', '300', '500', '600', '700', '800', '900'].map(s => `--orange-${s}`)],
  ['Volt, sun, status', ['--volt-300', '--volt-400', '--volt-600', '--sun-300', '--sun-400', '--rec-400', '--sky-400']],
  ['Paper', ['0', '50', '100', '200', '300', '400', '500', '600', '700', '750', '900'].map(s => `--paper-${s}`)],
  ['Olive, lime, light status', [...['100', '200', '250', '300', '350', '400', '450', '500', '550', '575', '600', '650', '700', '800'].map(s => `--olive-${s}`), '--forest-700', '--lime-400', '--lime-500', '--amber-700', '--crimson-700', '--azure-700']],
];
const SEMANTIC = ['--bg-page', '--bg-deep', '--surface-card', '--surface-raised', '--surface-tile', '--surface-well', '--surface-selected', '--surface-code', '--surface-inverse', '--line-1', '--line-2', '--line-strong', '--text-1', '--text-2', '--text-3', '--text-accent', '--accent', '--accent-hover', '--accent-2', '--focus-ring', '--success', '--warning', '--danger', '--info'];
const GRADIENTS = ['--grad-fire', '--grad-aurora', '--grad-beam', '--grad-protect', '--grad-text', '--grad-ring'];
const TYPE = [['Display', 'var(--text-display)', 'One idea.'], ['Heading', 'var(--text-heading)', 'Fewer operations.'], ['Body', 'var(--text-body)', 'Editing happens on your computer, with your AI.'], ['Label', 'var(--text-label)', 'Video folder on your computer'], ['Eyebrow', 'var(--text-eyebrow)', 'HOW IT WORKS / 01'], ['Timecode', 'var(--text-timecode)', '00:12.48 / 00:45.00']];
const FAMILIES = [['--font-sans', 'Figtree'], ['--font-kinetic', 'Anton'], ['--font-mono', 'System mono'], ['--font-caption-clean', 'Montserrat'], ['--font-caption-hand', 'Caveat'], ['--font-caption-marker', 'Permanent Marker'], ['--font-editorial', 'Editorial sans'], ['--font-serif', 'Editorial serif']];
const SIZES = ['--size-2xs', '--size-eyebrow', '--size-caption', '--size-small', '--size-ui', '--size-body', '--size-md', '--size-body-lg', '--size-lg', '--size-h4', '--size-xl', '--size-2xl', '--size-3xl', '--size-h3', '--size-4xl', '--size-5xl', '--size-h2'];
const SPACES = ['half', '1', '1-5', '2', '2-5', '3', '3-5', '4', '5', '6', '7', '8', '10', '12', '14', '16', '20', '24', '28', '32'];
const RADII = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'pill'];
const SHADOWS = ['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-glow', '--shadow-glow-volt', '--inner-glass'];
const EASINGS = ['--ease-out', '--ease-spring', '--ease-in-out', '--ease-snap'];
const DURATIONS = ['--dur-instant', '--dur-fast', '--dur-base', '--dur-slow', '--dur-cinematic'];

const Swatch = ({ token }: { token: string }) => (
  <div className="sc-swatch"><span className="sc-swatch__chip" style={{ background: `var(${token})` }} /><code>{token}</code></div>
);

/** Token reference: palettes, semantic roles, type, spacing, radius, elevation, motion. */
export const Tokens = () => (
  <Section id="tokens" title="Tokens" lead="DESIGN.md is the source of truth. Semantic roles change per theme; primitives do not." render={() => (
    <div className="sc-tokens">
      <h3>Semantic roles</h3><div className="sc-swatches">{SEMANTIC.map(token => <Swatch key={token} token={token} />)}</div>
      <h3>Gradients</h3><div className="sc-swatches sc-swatches--wide">{GRADIENTS.map(token => <Swatch key={token} token={token} />)}</div>
      {PALETTES.map(([name, tokens]) => <Fragment key={name}><h3>{name}</h3><div className="sc-swatches">{tokens.map(token => <Swatch key={token} token={token} />)}</div></Fragment>)}
      <h3>Type roles</h3>
      <div className="sc-type">{TYPE.map(([name, font, sample]) => <div key={name} className="sc-type__row"><code>{name}</code><span style={{ font }}>{sample}</span></div>)}</div>
      <h3>Families</h3>
      <div className="sc-type">{FAMILIES.map(([token, name]) => <div key={token} className="sc-type__row"><code>{token}</code><span style={{ fontFamily: `var(${token})`, fontSize: 'var(--size-xl)' }}>{`${name} — Every word on time`}</span></div>)}</div>
      <h3>Sizes</h3>
      <div className="sc-type">{SIZES.map(token => <div key={token} className="sc-type__row"><code>{token}</code><span style={{ fontSize: `var(${token})`, lineHeight: '1.2' }}>Aa</span></div>)}</div>
      <h3>Spacing</h3>
      <div className="sc-scale">{SPACES.map(step => <div key={step} className="sc-scale__row"><code>{`--space-${step}`}</code><span className="sc-scale__bar" style={{ width: `var(--space-${step})` }} /></div>)}</div>
      <h3>Radius</h3>
      <div className="sc-swatches">{RADII.map(step => <div key={step} className="sc-swatch"><span className="sc-radius" style={{ borderRadius: `var(--radius-${step})` }} /><code>{`--radius-${step}`}</code></div>)}</div>
      <h3>Elevation</h3>
      <div className="sc-swatches">{SHADOWS.map(token => <div key={token} className="sc-swatch"><span className="sc-elevation" style={{ boxShadow: `var(${token})` }} /><code>{token}</code></div>)}</div>
      <h3>Motion</h3>
      <div className="sc-scale">{[...EASINGS, ...DURATIONS].map(token => (
        <div key={token} className="sc-scale__row"><code>{token}</code>
          <span className="sc-motion"><span style={token.startsWith('--ease') ? { animationTimingFunction: `var(${token})` } : { animationDuration: `calc(var(${token}) * 4)` }} /></span>
        </div>
      ))}</div>
    </div>
  )} />
);
