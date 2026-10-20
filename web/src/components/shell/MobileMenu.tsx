'use client';
import { Dialog, IconButton } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV } from './nav';
import styles from './shell.module.css';

/** Below 1100 px the header links move into this dialog. */
export function MobileMenu() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.mobileOnly}>
      <IconButton icon="menu" label={t('Header.openMenu')} variant="ghost" size={40} aria-expanded={open} onClick={() => setOpen(true)} />
      <Dialog open={open} title={t('Header.menuTitle')} closeLabel={t('Header.closeMenu')} onClose={() => setOpen(false)} width={420}>
        <nav aria-label={t('Nav.label')}>
          <ul className={styles.menuList}>
            {[...NAV, { href: '/install' as const, key: 'install' as const }].map(item => (
              <li key={item.href}>
                <Link href={item.href} className={styles.menuLink} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>{t(`Nav.${item.key}`)}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Dialog>
    </div>
  );
}
