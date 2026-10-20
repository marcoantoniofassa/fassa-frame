'use client';
import { Button, Dialog, SceneCard, type SceneCardLabels } from '@editonny/design-system';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, type CSSProperties } from 'react';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { ToastOutlet } from '../feedback/ToastProvider';
import { useCopy } from '../feedback/use-copy';
import { LibraryToolbar } from '../library/LibraryToolbar';
import styles from '../library/library.module.css';
import { useLibraryState } from '../library/useLibraryState';
import { useDraft } from '../preferences/use-draft';
import { scenePrompt } from '../request/prompt';
import { filterScenes } from '../search';
import { backgroundFor, motifFor } from './motif';
import type { Scene } from './scenes';

type CatalogViewProps = { scenes: Scene[]; categories: Array<{ key: string; label: string }> };

export function useSceneLabels(): Partial<SceneCardLabels> {
  const t = useTranslations('Catalog.motif');
  return { before: t('before'), after: t('after'), cta: t('cta'), cheer: t('cheer'), zoom: t('zoom'), chat: [t('chat1'), t('chat2'), t('chat3')], hint: t('hint') };
}

function SceneDialog({ scene, index, onClose }: { scene: Scene; index: number; onClose(): void }) {
  const t = useTranslations('Catalog');
  const l = useTranslations('Library');
  const locale = useLocale() as AppLocale;
  const labels = useSceneLabels();
  const copy = useCopy();
  const [draft] = useDraft();
  const output = useRef<HTMLPreElement>(null);
  const request = scenePrompt(scene, draft.agent, locale);
  const meta = [
    [t('duration'), scene.duration === null ? t('unknown') : t('durationValue', { seconds: scene.duration })],
    [t('format'), scene.format ?? t('unknown')],
    [t('layout'), scene.layout ? t(`layouts.${scene.layout}`) : t('unknown')],
    [t('captions'), scene.hidesCaptions ? t('hidden') : t('kept')],
  ];
  return (
    <Dialog open eyebrow={scene.categoryLabel} title={scene.name} closeLabel={l('close')} onClose={onClose} width={560}
      actions={<>
        <Button variant="outline" size="sm" icon="copy" onClick={() => copy(request, { success: l('copied'), fallback: l('copyFallback') }, output.current)}>{l('copy')}</Button>
        <Button size="sm" iconRight="arrow-up-right" href={{ pathname: '/create', query: { scene: scene.id } }} as={Link}>{t('use')}</Button>
      </>}>
      <div className={styles.preview}>
        <SceneCard name={scene.name} group={scene.categoryLabel} motif={motifFor(scene.category, index)} bg={backgroundFor(index)} autoplay duration={scene.duration} format={scene.format} labels={labels} />
      </div>
      <p className={styles.label}>{l('when')}</p>
      <p>{scene.whenToUse}</p>
      <dl className={styles.meta}>{meta.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
      <p className={styles.label} id="scene-preview">{l('preview')}</p>
      <pre ref={output} className={styles.request} tabIndex={0} aria-labelledby="scene-preview">{request}</pre>
      <p className={styles.note}>{t('note')}</p>
      <ToastOutlet />
    </Dialog>
  );
}

/** Searchable, filterable scene grid with a detail dialog; state lives in the URL. */
export function CatalogView({ scenes, categories }: CatalogViewProps) {
  const t = useTranslations('Catalog');
  const labels = useSceneLabels();
  const state = useLibraryState('scene', categories.map(item => item.key), scenes.map(scene => scene.id));
  const visible = filterScenes(scenes, state.query, state.category);
  const openIndex = scenes.findIndex(scene => scene.id === state.openId);
  return <>
    <LibraryToolbar searchLabel={t('search')} placeholder={t('searchPlaceholder')} query={state.query} onQuery={state.setQuery}
      categories={categories} category={state.category} onCategory={state.setCategory} count={t('count', { count: visible.length })} />
    <ul className={styles.grid}>
      {visible.map((scene, i) => {
        const index = scenes.indexOf(scene);
        return (
          <li key={scene.id} className={styles.item} style={{ '--i': String(Math.min(i, 12)) } as CSSProperties}>
            <SceneCard name={scene.name} group={scene.categoryLabel} when={scene.whenToUse} motif={motifFor(scene.category, index)} bg={backgroundFor(index)}
              duration={scene.duration} format={scene.format} labels={labels} onClick={() => state.open(scene.id)} className={styles.fill} />
          </li>
        );
      })}
      {!visible.length && <li className={styles.empty}>{t('empty')}</li>}
    </ul>
    <p className={styles.note}>{t('note')}</p>
    {openIndex >= 0 && <SceneDialog scene={scenes[openIndex]!} index={openIndex} onClose={state.close} />}
  </>;
}
