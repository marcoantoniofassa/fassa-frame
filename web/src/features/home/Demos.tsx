'use client';
import { Timeline, useInterval, useInView, useReducedMotion, Waveform } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import styles from './home.module.css';

const CUTS: Array<[number, number]> = [[0.12, 0.19], [0.38, 0.44], [0.63, 0.7], [0.86, 0.9]];
const FORMATS = ['9:16', '1:1', '16:9'];

/** Raw take versus clean cut, alternating every 2.2 seconds; reduced motion shows the finished cut. */
export function CutDemo() {
  const t = useTranslations('Home.bento');
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const [cut, setCut] = useState(false);
  useInterval(() => setCut(value => !value), reduced || !inView ? null : 2200);
  const done = reduced || cut;
  return (
    <div ref={root}>
      <div className={styles.cutHead}><span>{t('raw')}</span><span className={styles.cutStatus} data-done={String(done)} aria-live="off">{done ? t('done') : t('analyzing')}</span></div>
      <Waveform bars={64} height={86} cuts={done ? CUTS : []} />
    </div>
  );
}

/** One frame cycling through vertical, square, and horizontal formats. */
export function FormatDemo() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const [index, setIndex] = useState(0);
  useInterval(() => setIndex(value => (value + 1) % FORMATS.length), reduced || !inView ? null : 1500);
  return <div ref={root} className={styles.format} aria-hidden="true"><div className={styles.formatFrame} data-format={FORMATS[index]}>{FORMATS[index]}</div></div>;
}

/** A playing review timeline with one mark. */
export function ReviewDemo() {
  const t = useTranslations('Home.bento');
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const [playhead, setPlayhead] = useState(3);
  useInterval(() => setPlayhead(value => (value + 0.15 > 45 ? 0 : value + 0.15)), reduced || !inView ? null : 100);
  return (
    <div ref={root} role="img" aria-label={t('timeline')}>
      <Timeline duration={45} playhead={playhead} playing={!reduced && inView} marks={[{ start: 30, end: 35 }]}
        segments={[{ start: 0, end: 8, beat: t('beatHook'), quote: t('quoteHook') }, { start: 8, end: 26, beat: t('beatSteps'), quote: t('quoteSteps') }, { start: 26, end: 45, beat: t('beatCta'), quote: t('quoteCta') }]} />
    </div>
  );
}
