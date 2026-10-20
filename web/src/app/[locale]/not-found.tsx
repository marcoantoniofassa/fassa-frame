import { Button, Eyebrow } from '@editonny/design-system';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '70vh', padding: 'var(--gutter)', textAlign: 'center' }}>
      <div>
        <Eyebrow index="404">Fassa Frame</Eyebrow>
        <h1 style={{ font: 'var(--text-heading)', margin: 'var(--space-4) 0' }}>{t('title')}</h1>
        <p style={{ color: 'var(--text-2)', marginBottom: 'var(--space-6)' }}>{t('body')}</p>
        <Button href="/" as={Link} iconRight="arrow-up-right">{t('home')}</Button>
      </div>
    </div>
  );
}
