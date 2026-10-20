'use client';
import { Button, SiteHeader } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { Link, usePathname } from '@/i18n/navigation';
import { LanguageMenu } from './LanguageMenu';
import { MobileMenu } from './MobileMenu';
import { NAV } from './nav';
import styles from './shell.module.css';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <SiteHeader linkAs={Link} homeHref="/" homeLabel={t('Header.homeLabel')} navLabel={t('Nav.label')} wordmarkSize={22} active={pathname}
      links={NAV.map(item => ({ label: t(`Nav.${item.key}`), href: item.href }))}
      right={<>
        <LanguageMenu />
        <ThemeToggle labels={{ toDark: t('Theme.toDark'), toLight: t('Theme.toLight') }} />
        <Button href="/install" as={Link} size="sm" variant={pathname === '/install' ? 'volt' : 'primary'} iconRight="arrow-up-right" className={styles.installCta}>{t('Nav.install')}</Button>
        <MobileMenu />
      </>} />
  );
}
