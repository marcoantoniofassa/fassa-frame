import { Aurora, Badge, Button, KineticText } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './home.module.css';
import { Phone } from './Phone';

/** Aurora light, headline with the rotating keyword, calls to action, and the phone mockup. */
export function Hero() {
  const t = useTranslations('Home.hero');
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Aurora />
      <div className={styles.heroGrid}>
        <div>
          <p className={styles.heroNews}><Badge tone="volt">{t('badge')}</Badge><span>{t('news')}</span></p>
          <h1 className={styles.heroTitle} id="hero-title">
            <span>{t('line1')}</span>
            <span>{t('line2')}</span>
            <span className={styles.heroMuted}>{t('line3')}</span>
            <span><KineticText words={t('words').split('|')} interval={1700} /></span>
          </h1>
          <p className={styles.heroLead}>{t('lead')}</p>
          <div className={styles.heroActions}>
            <Button href="/create" as={Link} size="lg" iconRight="arrow-up-right">{t('primary')}</Button>
            <Button href="/install" as={Link} size="lg" variant="glass" icon="terminal">{t('secondary')}</Button>
          </div>
          <ul className={styles.heroMeta}>
            <li>/fassa-frame <b>CLAUDE CODE</b></li>
            <li>$fassa-frame <b>CODEX</b></li>
            <li className={styles.heroLocal}><span aria-hidden="true">● </span>{t('local')}</li>
          </ul>
        </div>
        <Phone />
      </div>
    </section>
  );
}
