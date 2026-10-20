'use client';
import { ChoiceCard, Reveal, Select, TextField } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import type { KeyboardEvent, ReactNode } from 'react';
import type { RequestDraft } from '../request/draft';
import { AGENTS, CAPTIONS, EFFECTS, ENTRIES, FORMATS, PACES, RATIOS } from '../request/options';
import styles from './create.module.css';

type BriefFormProps = { draft: RequestDraft; update: (patch: Partial<RequestDraft>) => void };

function Section({ number, title, delay = 0, children }: { number: string; title: string; delay?: number; children: ReactNode }) {
  return (
    <Reveal delay={delay}>
      <section className={styles.section} aria-labelledby={`brief-${number}`}>
        <div className={styles.sectionHead}><span className={styles.number} aria-hidden="true">{number}</span><h2 id={`brief-${number}`}>{title}</h2></div>
        <div className={styles.fields}>{children}</div>
      </section>
    </Reveal>
  );
}

/** Arrow keys move the choice inside a radio group, as native radio buttons do. */
function radioKeys(event: KeyboardEvent<HTMLDivElement>) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
  if (!step) return;
  const radios = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
  const index = radios.indexOf(document.activeElement as HTMLButtonElement);
  if (index < 0) return;
  event.preventDefault();
  const next = radios[(index + step + radios.length) % radios.length]!;
  next.focus();
  next.click();
}

export function BriefForm({ draft, update }: BriefFormProps) {
  const t = useTranslations('Create');
  const o = useTranslations('Options');
  return (
    <form onSubmit={event => event.preventDefault()} aria-label={t('outputEyebrow')}>
      <Section number="01" title={t('story')}>
        <TextField label={t('goalLabel')} multiline rows={3} value={draft.goal} placeholder={t('goalPlaceholder')} onChange={event => update({ goal: event.target.value })} />
        <TextField label={t('folderLabel')} value={draft.folder} placeholder={t('folderPlaceholder')} help={t('folderHelp')} spellCheck={false} autoComplete="off"
          onChange={event => update({ folder: event.target.value })} />
      </Section>
      <Section number="02" title={t('telling')} delay={80}>
        <div>
          <div className={styles.label} id="format-label">{t('format')}</div>
          <div role="radiogroup" aria-labelledby="format-label" className={styles.grid4} onKeyDown={radioKeys}>
            {FORMATS.map(format => (
              <ChoiceCard key={format} compact title={RATIOS[format]} label={`${RATIOS[format]} ${o(`formats.${format}`)}`} selected={draft.format === format}
                tabIndex={draft.format === format ? 0 : -1} onSelect={() => update({ format })} />
            ))}
          </div>
        </div>
        <div className={styles.grid2}>
          <Select label={t('pace')} value={draft.pace} options={PACES.map(value => ({ value, label: o(`paces.${value}`) }))} onChange={event => update({ pace: event.target.value as RequestDraft['pace'] })} />
          <Select label={t('captions')} value={draft.captions} options={CAPTIONS.map(value => ({ value, label: o(`captions.${value}`) }))} onChange={event => update({ captions: event.target.value as RequestDraft['captions'] })} />
        </div>
        <Select label={t('effects')} value={draft.effects} options={EFFECTS.map(value => ({ value, label: o(`effects.${value}`) }))}
          onChange={event => update({ effects: event.target.value as RequestDraft['effects'] })} />
      </Section>
      <Section number="03" title={t('tool')} delay={160}>
        <div role="radiogroup" aria-labelledby="brief-03" className={styles.grid2} onKeyDown={radioKeys}>
          {AGENTS.map(agent => (
            <ChoiceCard key={agent} icon={agent === 'claude' ? 'sparkles' : 'terminal'} title={agent === 'claude' ? 'Claude Code' : 'Codex'} description={ENTRIES[agent]}
              selected={draft.agent === agent} tabIndex={draft.agent === agent ? 0 : -1} onSelect={() => update({ agent })} />
          ))}
        </div>
      </Section>
    </form>
  );
}
