import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { AppLocale } from '@/i18n/routing';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './shell.module.css';

/** Skip link, header, main landmark, and footer around every localized page. */
export async function SiteShell({ locale, children }: { locale: AppLocale; children: ReactNode }) {
  const t = await getTranslations({ locale, namespace: 'Common' });
  return <>
    <a href="#main" className={styles.skip}>{t('skip')}</a>
    <Header />
    <main id="main" tabIndex={-1} className={styles.main}>{children}</main>
    <Footer locale={locale} />
  </>;
}
