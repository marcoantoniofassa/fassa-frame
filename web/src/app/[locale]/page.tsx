import { getScenes } from '@/features/catalog/scenes';
import { getExamples } from '@/features/examples/examples';
import { Hero } from '@/features/home/Hero';
import { Bento, Callout, HowItWorks, StartingPoints, Stats } from '@/features/home/Sections';
import { ClientMessages } from '@/i18n/ClientMessages';
import { resolveLocale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/site';

const STARTS = ['lesson', 'introduce', 'demonstrate'];

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  return pageMetadata(resolveLocale((await params).locale)!, 'home');
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = resolveLocale((await params).locale)!;
  const examples = getExamples(locale);
  const scenes = getScenes(locale).length;
  return <ClientMessages groups={['Home.bento', 'Home.art']}>
    <Hero />
    <Stats scenes={scenes} requests={examples.length} />
    <Bento />
    <HowItWorks />
    <StartingPoints starts={STARTS.map(id => examples.find(example => example.id === id)!).filter(Boolean)} total={examples.length} />
    <Callout />
  </ClientMessages>;
}
