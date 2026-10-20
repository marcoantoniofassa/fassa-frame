'use client';
import { Badge, Button, Card, Eyebrow, IconButton } from '@editonny/design-system';
import { useLocale, useTranslations } from 'next-intl';
import { Suspense, useEffect, useRef, useState } from 'react';
import type { AppLocale } from '@/i18n/routing';
import { useToast } from '../feedback/ToastProvider';
import { useCopy } from '../feedback/use-copy';
import { useDraft } from '../preferences/use-draft';
import type { RequestDraft } from '../request/draft';
import { ENTRIES } from '../request/options';
import { createPrompt } from '../request/prompt';
import { ApplyFromUrl } from './ApplyFromUrl';
import { BriefForm } from './BriefForm';
import styles from './create.module.css';
import type { CreateData } from './types';

/** Brief on the left, the live request on the right; everything stays in this browser. */
export function CreateView(data: CreateData) {
  const t = useTranslations('Create');
  const locale = useLocale() as AppLocale;
  const [draft, setDraft, reset] = useDraft();
  const copy = useCopy();
  const { show } = useToast();
  const output = useRef<HTMLPreElement>(null);
  const aside = useRef<HTMLDivElement>(null);
  const [asideVisible, setAsideVisible] = useState(true);
  // On phones the request card sits below the form; a sticky copy bar appears while the card is out of view.
  useEffect(() => {
    const node = aside.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setAsideVisible(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const scene = data.scenes.find(item => item.id === draft.sceneId) ?? null;
  const prompt = createPrompt(draft, locale, scene);
  // A brief without visuals cannot use a catalog scene.
  const update = (patch: Partial<RequestDraft>) => setDraft(patch.effects === 'none' ? { ...patch, sceneId: null } : patch);
  const copyRequest = () => copy(prompt, { success: t('copied'), fallback: t('copyFallback') }, output.current);
  return (
    <div className={styles.brief}>
      <Suspense fallback={null}><ApplyFromUrl {...data} /></Suspense>
      <BriefForm draft={draft} update={update} />
      <div className={styles.aside} ref={aside}>
        <Card beam padding="var(--space-6)" radius="2xl">
          <div className={styles.outputHead}>
            <Eyebrow dot>{t('outputEyebrow')}</Eyebrow>
            <Badge mono>{ENTRIES[draft.agent]}</Badge>
          </div>
          {scene && (
            <div className={styles.scene}>
              <span>{t('sceneLabel', { name: scene.name })}</span>
              <IconButton icon="x" variant="ghost" size={32} label={t('removeScene', { name: scene.name })} onClick={() => setDraft({ sceneId: null })} />
            </div>
          )}
          <pre ref={output} className={styles.output} tabIndex={0} aria-label={t('outputLabel')}>{prompt}</pre>
          <Button block size="lg" icon="copy" onClick={copyRequest}>{t('copy')}</Button>
          <p className={styles.hint}>{t('hint')}</p>
          <div className={styles.footer}>
            <p className={styles.saved}>{t('saved')}</p>
            <Button size="sm" variant="ghost" icon="rotate-ccw" onClick={() => { reset(); show(t('cleared')); }}>{t('reset')}</Button>
          </div>
        </Card>
      </div>
      <div className={styles.mobileBar} data-visible={String(!asideVisible)} data-sticky-bar={!asideVisible ? 'true' : undefined}>
        <Button block icon="copy" onClick={copyRequest}>{t('copy')}</Button>
      </div>
    </div>
  );
}
