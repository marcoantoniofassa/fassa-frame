'use client';
import { SegmentedControl } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './home.module.css';

/** Original editorial illustration. Each stage is visitor-controlled, with no autoplay. */
export function EditorialPreview() {
  const t = useTranslations('Home.art');
  const [stage, setStage] = useState(0);
  return (
    <div className={styles.art}>
      <div className={styles.artFrame} data-stage={stage}>
        <div className={styles.artCircle} aria-hidden="true" />
        <div className={styles.artDisc} aria-hidden="true" />
        <div className={styles.artLines} aria-hidden="true" />
        <div key={stage} className={styles.artCopy} aria-live="polite" aria-atomic="true">
          <span className={styles.artNumber}>0{stage + 1} / {t('label')}</span>
          <p>{t(`stage${stage + 1}` as 'stage1')}</p>
          <span className={styles.artNote}>{t(`note${stage + 1}` as 'note1')}</span>
        </div>
      </div>
      <SegmentedControl className={styles.artSteps} label={t('controls')} tone="solid" value={String(stage)}
        options={[0, 1, 2].map(index => ({ value: String(index), label: t(`action${index + 1}` as 'action1') }))}
        onChange={value => setStage(Number(value))} />
      <p className={styles.artCaption}>{t('caption')}</p>
    </div>
  );
}
