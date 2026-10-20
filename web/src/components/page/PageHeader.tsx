import { Eyebrow, Highlight } from '@editonny/design-system';
import type { ReactNode } from 'react';
import styles from './page.module.css';

type PageHeaderProps = {
  index: string;
  eyebrow: string;
  /** Title lines; the last part is highlighted. */
  title: [string, string] | [string, string, string];
  tone?: 'orange' | 'volt';
  lead: string;
  /** Lead beside the title on wide screens (library pages). */
  split?: boolean;
};

/** Kicker, two-line page title with a highlighted end, and the lead paragraph. */
export function PageHeader({ index, eyebrow, title, tone = 'orange', lead, split }: PageHeaderProps) {
  const [first, second, third] = title;
  const heading: ReactNode = third === undefined
    ? <>{first}<br /><Highlight tone={tone}>{second}</Highlight></>
    : <>{first}<br />{second} <Highlight tone={tone}>{third}</Highlight></>;
  const block = <>
    <div>
      <Eyebrow index={index} className={styles.kicker}>{eyebrow}</Eyebrow>
      <h1 className={styles.title}>{heading}</h1>
    </div>
    <p className={styles.lead}>{lead}</p>
  </>;
  return split ? <div className={styles.head}>{block}</div> : block;
}

export const pageClass = styles.page;
