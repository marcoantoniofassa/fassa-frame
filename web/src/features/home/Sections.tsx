import { Button, Card, Counter, Eyebrow, Highlight, KineticCaption, Marquee, PromptCard, Reveal, SceneCard, StepItem, Waveform } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { Example } from '@/features/examples/examples';
import { Link } from '@/i18n/navigation';
import { CutDemo, FormatDemo, ReviewDemo } from './Demos';
import styles from './home.module.css';

export function Tapes({ scenes }: { scenes: number }) {
  const t = useTranslations('Home.tapes');
  return (
    <div className={styles.tapes} aria-hidden="true">
      <Marquee tone="orange" size={58} rotate={-3} speed={34} items={t('one', { scenes }).split('|')} className={styles.tapeOne} />
      <Marquee tone="volt" size={40} reverse rotate={2.5} speed={28} items={t('two').split('|')} className={styles.tapeTwo} />
    </div>
  );
}

export function Stats({ scenes, requests }: { scenes: number; requests: number }) {
  const t = useTranslations('Home.stats');
  const stats = [[scenes, '', t('scenes'), 'accent'], [requests, '', t('requests'), 'plain'], [4, '', t('formats'), 'plain'], [100, '%', t('local'), 'live']] as const;
  return (
    <ul className={`${styles.section} ${styles.stats}`} aria-label={t('label')}>
      {stats.map(([value, suffix, label, tone], i) => (
        <Reveal as="li" key={label} delay={i * 90}>
          <div className={styles.stat} data-tone={tone} data-first={i === 0 ? 'true' : undefined}>
            <div className={styles.statValue}><Counter value={value} suffix={suffix} /></div>
            <div className={styles.statLabel}>{label}</div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

function TileHead({ kicker, title, text, dark }: { kicker: string; title: string; text: string; dark?: boolean }) {
  return (
    <div className={styles.tileHead} data-dark={dark ? 'true' : undefined}>
      <div className={styles.tileKicker}>{kicker}</div>
      <h3 className={styles.tileTitle}>{title}</h3>
      <p className={styles.tileText}>{text}</p>
    </div>
  );
}

function Tile({ span, variant = 'surface', padding = 'var(--space-7)', className = '', children }: { span: number; variant?: 'surface' | 'orange' | 'volt'; padding?: string; className?: string; children: ReactNode }) {
  return <Card spotlight lift padding={padding} radius="2xl" variant={variant} className={`${styles.tile} ${className}`} style={{ gridColumn: `span ${span}` }}>{children}</Card>;
}

export function Bento() {
  const t = useTranslations('Home.bento');
  return (
    <section className={styles.section} aria-labelledby="bento-title">
      <Reveal>
        <div className={styles.sectionHead}>
          <div>
            <Eyebrow index="01" className={styles.kicker}>{t('eyebrow')}</Eyebrow>
            <h2 className={styles.h2} id="bento-title">{t('titleA')}<br /><span className={styles.muted}>{t('titleB')}</span> <Highlight>{t('highlight')}</Highlight></h2>
          </div>
          <p className={styles.sectionLead}>{t('lead')}</p>
        </div>
      </Reveal>
      <div className={styles.bento}>
        <Tile span={7}><TileHead kicker={t('cutKicker')} title={t('cutTitle')} text={t('cutText')} /><CutDemo /></Tile>
        <Tile span={5} variant="orange">
          <TileHead dark kicker={t('captionsKicker')} title={t('captionsTitle')} text={t('captionsText')} />
          <div className={styles.tileScreen}><KineticCaption text={t('captionsSample')} size={26} highlight="var(--orange-500)" /></div>
        </Tile>
        <Tile span={4} padding="var(--space-2-5)" className={styles.tileFlush}>
          <SceneCard group={t('sceneGroup')} name={t('sceneName')} motif="contador" bg="black" autoplay when={t('sceneWhen')} className={styles.tileScene} />
        </Tile>
        <Tile span={4}><TileHead kicker={t('formatsKicker')} title={t('formatsTitle')} text={t('formatsText')} /><FormatDemo /></Tile>
        <Tile span={4} variant="volt"><TileHead dark kicker={t('soundKicker')} title={t('soundTitle')} text={t('soundText')} /><Waveform bars={36} height={70} color="var(--ink-950)" /></Tile>
        <Tile span={12} className={styles.tileWide}><TileHead kicker={t('reviewKicker')} title={t('reviewTitle')} text={t('reviewText')} /><ReviewDemo /></Tile>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const t = useTranslations('Home.how');
  const steps = [['01', t('step1Title'), t('step1Text')], ['02', t('step2Title'), t('step2Text')], ['03', t('step3Title'), t('step3Text')]] as const;
  return (
    <section className={`${styles.section} ${styles.how}`} aria-labelledby="how-title">
      <Reveal className={styles.howIntro}>
        <Eyebrow index="02" className={styles.kicker}>{t('eyebrow')}</Eyebrow>
        <h2 className={styles.h2} id="how-title">{t('titleA')}<br /><Highlight tone="volt">{t('highlight')}</Highlight></h2>
        <p className={styles.sectionLead}>{t('lead')}</p>
        <Button href="/create" as={Link} variant="outline" iconRight="arrow-up-right">{t('cta')}</Button>
      </Reveal>
      <div>
        {steps.map(([number, title, text], i) => (
          <Reveal key={number} delay={i * 110}><StepItem number={number} title={title} last={i === steps.length - 1}>{text}</StepItem></Reveal>
        ))}
      </div>
    </section>
  );
}

export function StartingPoints({ starts, total }: { starts: Example[]; total: number }) {
  const t = useTranslations('Home.starts');
  return (
    <section className={styles.section} aria-labelledby="starts-title">
      <Reveal>
        <div className={styles.sectionHead}>
          <div><Eyebrow index="03" className={styles.kicker}>{t('eyebrow')}</Eyebrow><h2 className={styles.h2} id="starts-title">{t('title')}</h2></div>
          <Button href="/examples" as={Link} variant="ghost" iconRight="arrow-up-right">{t('all', { count: total })}</Button>
        </div>
      </Reveal>
      <div className={styles.grid3}>
        {starts.map((example, i) => (
          <Reveal key={example.id} delay={i * 90}>
            <PromptCard index={`0${i + 1}`} category={example.categoryLabel} title={example.title} summary={example.summary} action={t('action')}
              href={{ pathname: '/create', query: { example: example.id } }} as={Link} className={styles.startCard} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Callout() {
  const t = useTranslations('Home.callout');
  return (
    <section className={styles.section} aria-labelledby="callout-title">
      <Reveal>
        <div className={`${styles.callout} ed-grain`}>
          <h2 className={styles.calloutTitle} id="callout-title"><span>{t('line1')}</span><span>{t('line2')} <span className={styles.calloutAccent}>{t('accent')}</span></span></h2>
          <div className={styles.calloutRow}>
            <p>{t('text')}</p>
            <Button href="/create" as={Link} size="lg" variant="dark" iconRight="arrow-up-right">{t('cta')}</Button>
          </div>
          <div className={styles.calloutRing} aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}
