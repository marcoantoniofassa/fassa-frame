import type { AppPathname } from '@/i18n/routing';

export type NavItem = { href: AppPathname; key: 'home' | 'create' | 'catalog' | 'examples' };
export const NAV: NavItem[] = [{ href: '/', key: 'home' }, { href: '/create', key: 'create' }, { href: '/catalog', key: 'catalog' }, { href: '/examples', key: 'examples' }];
