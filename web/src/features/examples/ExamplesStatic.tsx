import { PromptCard } from '@editonny/design-system';
import type { CSSProperties } from 'react';
import { Link } from '@/i18n/navigation';
import styles from '../library/library.module.css';
import type { Example } from './examples';

/** Server-rendered list shown until the interactive library hydrates (and for crawlers); its cards link to each example's dialog. */
export function ExamplesStatic({ examples, action }: { examples: Example[]; action: string }) {
  return (
    <ul className={styles.grid}>
      {examples.map((example, i) => (
        <li key={example.id} className={styles.item} style={{ '--i': String(Math.min(i, 12)) } as CSSProperties}>
          <PromptCard index={String(i + 1).padStart(2, '0')} category={example.categoryLabel} title={example.title} summary={example.summary} action={action}
            href={{ pathname: '/examples', query: { example: example.id } }} as={Link} className={`${styles.fill} ${styles.prompt}`} />
        </li>
      ))}
    </ul>
  );
}
