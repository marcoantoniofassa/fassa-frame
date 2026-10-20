import { Wordmark } from '@editonny/design-system';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { AppLocale, AppPathname } from '@/i18n/routing';
import { AUTHOR, REPOSITORY_URL } from '@/lib/site';
import styles from './shell.module.css';

const COLUMNS: Array<['guide' | 'start', Array<[AppPathname, 'create' | 'catalog' | 'examples' | 'install' | 'home']>]> = [
  ['guide', [['/create', 'create'], ['/catalog', 'catalog'], ['/examples', 'examples']]],
  ['start', [['/install', 'install'], ['/', 'home']]],
];

export async function Footer({ locale }: { locale: AppLocale }) {
  const t = await getTranslations({ locale });
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div>
          <Wordmark size={26} />
          <p>{t('Footer.tagline')}</p>
        </div>
        <div className={styles.footerColumns}>
          {COLUMNS.map(([title, links]) => (
            <nav key={title} aria-label={t(`Footer.${title}`)}>
              <h2 className={styles.footerTitle}>{t(`Footer.${title}`)}</h2>
              {links.map(([href, key]) => <Link key={href} href={href}>{t(`Nav.${key}`)}</Link>)}
            </nav>
          ))}
          <nav aria-label={t('Footer.links')}>
            <h2 className={styles.footerTitle}>Fassa Frame</h2>
            <a href={REPOSITORY_URL} rel="noopener noreferrer" target="_blank">Editonny upstream <span className="ds-visually-hidden">{t('Common.newTab')}</span></a>
            <a href={AUTHOR.instagram} rel="author noopener noreferrer" target="_blank">Instagram <span className="ds-visually-hidden">{t('Common.newTab')}</span></a>
            <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>
          </nav>
        </div>
      </div>
      <p className={styles.footerCredits}>{t('Footer.credits', { name: AUTHOR.name })} {t('Footer.license')}</p>
      <div className={styles.footerGiant} aria-hidden="true">Fassa Frame<span>.</span></div>
    </footer>
  );
}
