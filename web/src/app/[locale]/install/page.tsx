import { getTranslations } from 'next-intl/server';
import { PageHeader, pageClass } from '@/components/page/PageHeader';
import { InstallView } from '@/features/install/InstallView';
import { ClientMessages } from '@/i18n/ClientMessages';
import { resolveLocale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[locale]/install'>) {
  return pageMetadata(resolveLocale((await params).locale)!, 'install');
}

export default async function InstallPage({ params }: PageProps<'/[locale]/install'>) {
  const t = await getTranslations({ locale: resolveLocale((await params).locale)!, namespace: 'Install' });
  return (
    <div className={pageClass}>
      <PageHeader index="⌘" eyebrow={t('eyebrow')} title={[t('titleA'), t('highlight')]} tone="volt" lead={t('lead')} />
      <ClientMessages groups={['Install']}>
        <InstallView />
      </ClientMessages>
    </div>
  );
}
