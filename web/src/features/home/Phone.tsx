'use client';
import { Badge, Icon, KineticCaption, ProgressRing, useInterval, useInView, useReducedMotion, Waveform } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import city from '../../../../skills/editonny/visuals/assets/visuals/img/city.jpg';
import styles from './home.module.css';

function Float({ position, delay, tilt, children }: { position: string; delay: number; tilt?: boolean; children: ReactNode }) {
  return (
    <div className={styles.float} data-position={position} data-tilt={tilt ? 'true' : undefined} style={{ '--delay': `${delay}s` } as CSSProperties}>
      <div className={styles.floatCard}>{children}</div>
    </div>
  );
}

/** The 9:16 phone mockup with floating workflow chips. Illustrative; it is not a rendered video. */
export function Phone() {
  const t = useTranslations('Home.phone');
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const [progress, setProgress] = useState(0.18);
  useInterval(() => setProgress(value => (value >= 1 ? 0.08 : Math.min(1, value + 0.02))), reduced || !inView ? null : 140);
  return (
    <div ref={root} className={styles.phone} role="img" aria-label={t('alt')}>
      <div className={styles.phoneGlow} aria-hidden="true" />
      <div className={styles.phoneBody}>
        <div className={styles.phoneScreen}>
          <Image src={city} alt="" fill priority sizes="(max-width: 35em) 80vw, 22em" className={styles.phoneImage} />
          <div className={styles.phoneScrim} />
          <div className={styles.phoneNotch} />
          <div className={styles.phoneHook}>
            <span className={styles.phoneHookBox}><span className={styles.phoneHookSweep} aria-hidden="true" /><span>{t('hookTop')}</span></span>
            <div className={styles.phoneHookLine}>{t('hookBottom')}</div>
          </div>
          <div className={styles.phoneCaption}><KineticCaption text={t('caption')} size={24} wps={2.4} /></div>
          <div className={styles.phoneControls}>
            <span className={styles.phonePause}><Icon name="pause" size={14} /></span>
            <div className={styles.phoneWave}><Waveform bars={34} height={26} progress={progress} color="var(--fog-50)" muted="var(--on-media-dim)" /></div>
          </div>
        </div>
      </div>
      <Float position="top-left" delay={0}>
        <div className={styles.floatRow}>
          <span className={styles.floatTile}><Icon name="scissors" size={18} /></span>
          <div><div className={styles.floatTitle}>{t('cuts')}</div><div className={styles.floatMeta} data-tone="live">{t('wordsLost')}</div></div>
        </div>
      </Float>
      <Float position="mid-right" delay={0.8} tilt>
        <div className={styles.floatRow}>
          <ProgressRing value={progress} size={64} thickness={6} label={t('render')} />
          <div><div className={styles.floatTitle}>{t('rendering')}</div><div className={styles.floatMeta}>{t('renderMeta')}</div></div>
        </div>
      </Float>
      <Float position="bottom-left" delay={1.4}>
        <div className={styles.floatLabel}>{t('voice')}</div>
        <Waveform bars={28} height={34} color="var(--volt-400)" cuts={[[0.3, 0.4], [0.7, 0.76]]} />
      </Float>
      <Float position="bottom-right" delay={2} tilt>
        <div className={styles.floatRow}><Badge tone="accent">{`✦ ${t('motion')}`}</Badge><span className={styles.floatTitle}>{t('beforeAfter')}</span></div>
      </Float>
    </div>
  );
}
