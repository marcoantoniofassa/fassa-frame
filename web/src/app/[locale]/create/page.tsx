import { getTranslations } from 'next-intl/server';
import { PageHeader, pageClass } from '@/components/page/PageHeader';
import { getScenes } from '@/features/catalog/scenes';
import { CreateView } from '@/features/create/CreateView';
import { getExamples } from '@/features/examples/examples';
import { ClientMessages } from '@/i18n/ClientMessages';
import { resolveLocale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[locale]/create'>) {
  return pageMetadata(resolveLocale((await params).locale)!, 'create');
}

export default async function CreatePage({ params }: PageProps<'/[locale]/create'>) {
  const locale = resolveLocale((await params).locale)!;
  const t = await getTranslations({ locale, namespace: 'Create' });
  const examples = getExamples(locale).map(({ id, title, goal, format, effects }) => ({ id, title, goal, format, effects }));
  const scenes = getScenes(locale).map(({ id, name }) => ({ id, name }));
  return (
    <div className={pageClass}>
      <PageHeader index="✦" eyebrow={t('eyebrow')} title={[t('titleA'), t('titleB'), t('highlight')]} lead={t('lead')} />
      <ClientMessages groups={['Create', 'Options']}>
        <CreateView examples={examples} scenes={scenes} />
      </ClientMessages>
    </div>
  );
}
