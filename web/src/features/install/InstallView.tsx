'use client';
import { Accordion, Button, Card, CommandLine, Reveal, StepItem } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { RELEASES_URL } from '@/lib/site';
import { Link } from '@/i18n/navigation';
import { useToast } from '../feedback/ToastProvider';
import { useCopy } from '../feedback/use-copy';
import styles from './install.module.css';

const INSTALL = 'python3 install.py --target both';
const DOCTOR = 'python3 ~/.local/share/fassa-frame/scripts/editonny.py doctor';

/** Numbered steps with literal commands, an "ask your AI" card, and the FAQ. */
export function InstallView() {
  const t = useTranslations('Install');
  const { show } = useToast();
  const copy = useCopy();
  const request = useRef<HTMLParagraphElement>(null);
  const command = (value: string) => (
    <CommandLine command={value} copyLabel={t('copy')} copiedLabel={t('copied')} onCopy={() => show(t('commandCopied'))}
      onCopyError={() => show(t('copyFallback'), 'error')} className={styles.command} />
  );
  return (
    <div className={styles.install}>
      <div className={styles.aside}>
        <Reveal>
          <Card variant="orange" padding="var(--space-8)" radius="2xl" className="ed-grain">
            <p className={styles.kicker}>{t('askKicker')}</p>
            <h2 className={styles.title}>{t('askTitle')}</h2>
            <p ref={request} className={styles.request}>{t('askRequest')}</p>
            <Button block variant="dark" icon="copy" onClick={() => copy(t('askRequest'), { success: t('askCopied'), fallback: t('copyFallback') }, request.current)}>{t('askCopy')}</Button>
          </Card>
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={[1, 2, 3, 4, 5, 6, 7].map(n => ({ title: t(`faq${n}Title` as 'faq1Title'), body: t(`faq${n}Body` as 'faq1Body') }))} />
        </Reveal>
      </div>
      <div className={styles.steps}>
        <div className={styles.cta}><Button href={RELEASES_URL} variant="outline" iconRight="arrow-up-right">{t('download')}</Button></div>
        <Reveal><StepItem number="01" title={t('step1Title')} headingLevel={2}>{t('step1Text')}</StepItem></Reveal>
        <Reveal delay={80}><StepItem number="02" title={t('step2Title')} headingLevel={2}>{t('step2Text')}{command(INSTALL)}</StepItem></Reveal>
        <Reveal delay={160}><StepItem number="03" title={t('step3Title')} headingLevel={2}>{t('step3Text')}{command(DOCTOR)}</StepItem></Reveal>
        <Reveal delay={240}>
          <StepItem number="04" title={t('step4Title')} headingLevel={2} last>
            {t('step4Text')}
            <div className={styles.cta}><Button href="/create" as={Link} iconRight="arrow-up-right">{t('cta')}</Button></div>
          </StepItem>
        </Reveal>
      </div>
    </div>
  );
}
