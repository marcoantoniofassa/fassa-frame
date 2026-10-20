import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { PageHeader, pageClass } from '@/components/page/PageHeader';
import { getExampleCategories, getExamples } from '@/features/examples/examples';
import { ExamplesStatic } from '@/features/examples/ExamplesStatic';
import { ExamplesView } from '@/features/examples/ExamplesView';
import { ClientMessages } from '@/i18n/ClientMessages';
import { resolveLocale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[locale]/examples'>) {
  return pageMetadata(resolveLocale((await params).locale)!, 'examples');
}

export default async function ExamplesPage({ params }: PageProps<'/[locale]/examples'>) {
  const locale = resolveLocale((await params).locale)!;
  const t = await getTranslations({ locale, namespace: 'Examples' });
  const examples = getExamples(locale);
  return (
    <div className={pageClass}>
      <PageHeader split index={String(examples.length)} eyebrow={t('eyebrow')} title={[t('titleA'), t('highlight')]} tone="volt" lead={t('lead')} />
      <ClientMessages groups={['Examples', 'Library']}>
        <Suspense fallback={<ExamplesStatic examples={examples} action={t('action')} />}>
          <ExamplesView examples={examples} categories={getExampleCategories(locale)} />
        </Suspense>
      </ClientMessages>
    </div>
  );
}
