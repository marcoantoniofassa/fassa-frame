'use client';
import { Button, Dialog, PromptCard } from '@editonny/design-system';
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
import { applyExample } from '../request/draft';
import { phrasesFor } from '../request/phrases';
import { createPrompt } from '../request/prompt';
import { filterExamples } from '../search';
import type { Example } from './examples';

type ExamplesViewProps = { examples: Example[]; categories: Array<{ key: string; label: string }> };

function ExampleDialog({ example, onClose }: { example: Example; onClose(): void }) {
  const t = useTranslations('Examples');
  const l = useTranslations('Library');
  const locale = useLocale() as AppLocale;
  const copy = useCopy();
  const [draft] = useDraft();
  const output = useRef<HTMLPreElement>(null);
  const request = createPrompt(applyExample(draft, example), locale);
  return (
    <Dialog open eyebrow={example.categoryLabel} title={example.title} closeLabel={l('close')} onClose={onClose} width={600}
      actions={<>
        <Button variant="outline" size="sm" icon="copy" onClick={() => copy(request, { success: l('copied'), fallback: l('copyFallback') }, output.current)}>{l('copy')}</Button>
        <Button size="sm" iconRight="arrow-up-right" href={{ pathname: '/create', query: { example: example.id } }} as={Link}>{t('customize')}</Button>
      </>}>
      <p>{example.summary}</p>
      <p className={styles.label}>{l('when')}</p>
      <p>{example.when}</p>
      <p className={styles.label}>{t('tips')}</p>
      <ul className={styles.tips}>{example.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
      <p className={styles.label} id="example-preview">{l('preview')}</p>
      <pre ref={output} className={styles.request} tabIndex={0} aria-labelledby="example-preview">{request}</pre>
      <ToastOutlet />
    </Dialog>
  );
}

/** Searchable, filterable request library with a detail dialog; state lives in the URL. */
export function ExamplesView({ examples, categories }: ExamplesViewProps) {
  const t = useTranslations('Examples');
  const locale = useLocale() as AppLocale;
  const state = useLibraryState('example', categories.map(item => item.key), examples.map(example => example.id));
  const visible = filterExamples(examples, state.query, state.category, phrasesFor(locale));
  const open = examples.find(example => example.id === state.openId);
  return <>
    <LibraryToolbar searchLabel={t('search')} placeholder={t('searchPlaceholder')} query={state.query} onQuery={state.setQuery}
      categories={categories} category={state.category} onCategory={state.setCategory} count={t('count', { count: visible.length })} />
    <ul className={styles.grid}>
      {visible.map((example, i) => (
        <li key={example.id} className={styles.item} style={{ '--i': String(Math.min(i, 12)) } as CSSProperties}>
          <PromptCard index={String(examples.indexOf(example) + 1).padStart(2, '0')} category={example.categoryLabel} title={example.title} summary={example.summary}
            action={t('action')} onClick={() => state.open(example.id)} className={`${styles.fill} ${styles.prompt}`} />
        </li>
      ))}
      {!visible.length && <li className={styles.empty}>{t('empty')}</li>}
    </ul>
    {open && <ExampleDialog example={open} onClose={state.close} />}
  </>;
}
