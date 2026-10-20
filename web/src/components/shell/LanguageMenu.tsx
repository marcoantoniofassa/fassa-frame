'use client';
import { LanguageSelect, LANGUAGES } from '@editonny/design-system';
import br from '@editonny/design-system/assets/flags/br.svg';
import es from '@editonny/design-system/assets/flags/es.svg';
import us from '@editonny/design-system/assets/flags/us.svg';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';

const FLAGS: Record<string, string> = { us: us.src, br: br.src, es: es.src };
const OPTIONS = LANGUAGES.map(language => ({ ...language, flagUrl: FLAGS[language.flag ?? ''] }));

/** Language picker: switches to the same page in another locale, keeps the query, and next-intl stores the choice in a cookie. */
export function LanguageMenu() {
  const t = useTranslations('Language');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const change = (code: string) => {
    if (code === locale || !routing.locales.includes(code as AppLocale)) return;
    const query = Object.fromEntries(new URLSearchParams(window.location.search));
    router.replace({ pathname, query }, { locale: code as AppLocale, scroll: false });
  };
  return <LanguageSelect value={locale} onChange={change} options={OPTIONS} label={t('label')} searchPlaceholder={t('search')} emptyText={t('empty')} />;
}
