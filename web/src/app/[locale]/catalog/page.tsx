import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { PageHeader, pageClass } from '@/components/page/PageHeader';
import { CatalogStatic } from '@/features/catalog/CatalogStatic';
import { CatalogView } from '@/features/catalog/CatalogView';
import { getSceneCategories, getScenes } from '@/features/catalog/scenes';
import { ClientMessages } from '@/i18n/ClientMessages';
import { resolveLocale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[locale]/catalog'>) {
  return pageMetadata(resolveLocale((await params).locale)!, 'catalog');
}

export default async function CatalogPage({ params }: PageProps<'/[locale]/catalog'>) {
  const locale = resolveLocale((await params).locale)!;
  const t = await getTranslations({ locale, namespace: 'Catalog' });
  const scenes = getScenes(locale);
  const m = await getTranslations({ locale, namespace: 'Catalog.motif' });
  const labels = { before: m('before'), after: m('after'), cta: m('cta'), cheer: m('cheer'), zoom: m('zoom'), chat: [m('chat1'), m('chat2'), m('chat3')] as [string, string, string], hint: m('hint') };
  return (
    <div className={pageClass}>
      <PageHeader split index={String(scenes.length)} eyebrow={t('eyebrow')} title={[t('titleA'), t('highlight')]} lead={t('lead')} />
      <ClientMessages groups={['Catalog', 'Library']}>
        <Suspense fallback={<CatalogStatic scenes={scenes} labels={labels} />}>
          <CatalogView scenes={scenes} categories={getSceneCategories(locale)} />
        </Suspense>
      </ClientMessages>
    </div>
  );
}
