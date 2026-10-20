import { Badge, Button } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './home.module.css';
import { EditorialPreview } from './EditorialPreview';

/** Plain-language introduction with an original, visitor-controlled editorial illustration. */
export function Hero() {
  const t = useTranslations('Home.hero');
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div>
          <p className={styles.heroNews}><Badge tone="accent">{t('badge')}</Badge><span>{t('news')}</span></p>
          <h1 className={styles.heroTitle} id="hero-title">
            <span>{t('line1')}</span>
            <span>{t('line2')}</span>
            <span className={styles.heroMuted}>{t('line3')}</span>
          </h1>
          <p className={styles.heroLead}>{t('lead')}</p>
          <div className={styles.heroActions}>
            <Button href="/create" as={Link} size="lg" iconRight="arrow-up-right">{t('primary')}</Button>
            <Button href="/install" as={Link} size="lg" variant="outline">{t('secondary')}</Button>
          </div>
          <ul className={styles.heroMeta}>
            <li><b>CLAUDE CODE</b></li>
            <li><b>CODEX</b></li>
            <li className={styles.heroLocal}><span aria-hidden="true">● </span>{t('local')}</li>
          </ul>
        </div>
        <EditorialPreview />
      </div>
    </section>
  );
}
