'use client';
import { Badge, Select, TextField } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import styles from './library.module.css';

type LibraryToolbarProps = {
  searchLabel: string;
  placeholder: string;
  query: string;
  onQuery(value: string): void;
  categories: Array<{ key: string; label: string }>;
  category: string;
  onCategory(value: string): void;
  count: string;
};

export function LibraryToolbar({ searchLabel, placeholder, query, onQuery, categories, category, onCategory, count }: LibraryToolbarProps) {
  const t = useTranslations('Library');
  return (
    <div className={styles.toolbar}>
      <TextField label={searchLabel} type="search" placeholder={placeholder} value={query} onChange={event => onQuery(event.target.value)} autoComplete="off" className={styles.search} />
      <Select label={t('category')} value={category} options={[{ value: '', label: t('all') }, ...categories.map(item => ({ value: item.key, label: item.label }))]}
        onChange={event => onCategory(event.target.value)} className={styles.category} />
      <span className={styles.count} aria-live="polite"><Badge mono>{count}</Badge></span>
    </div>
  );
}
