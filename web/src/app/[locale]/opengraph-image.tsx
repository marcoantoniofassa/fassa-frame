import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { routing, resolveLocale, localeParams, type AppLocale } from '@/i18n/routing';
import { BRAND } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Fassa Frame';

export function generateStaticParams() {
  return localeParams();
}


/** Localized social card: wordmark, badge, the tagline with its last word highlighted, and the creator line. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const requested = resolveLocale((await params).locale);
  // The proxy skips this route, so unknown prefixes reach it directly.
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale: AppLocale = requested;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  // Satori renders static fonts only, so the card uses the engine's static Anton face throughout.
  // Explicitly traced in next.config.ts so both bundlers include this licensed font.
  const anton = await readFile(join(process.cwd(), '../skills/editonny/engine/assets/fonts/anton/Anton-Regular.ttf'));
  const words = t('tagline').split(' ');
  const last = words.pop();
  // Longer taglines (Spanish) step down so the headline stays within three lines.
  const headline = t('tagline').length > 40 ? 86 : 104;
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: BRAND.paper100, color: BRAND.ink800, fontFamily: 'Anton' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 44, letterSpacing: 1 }}>
        <div style={{ display: 'flex', width: 60, height: 60, borderWidth: 6, borderStyle: 'solid', borderColor: BRAND.ink800 }} />
        <div style={{ display: 'flex' }}>FASSA FRAME<span style={{ color: BRAND.orange500 }}>.</span></div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22, fontSize: headline, lineHeight: 1.1, textTransform: 'uppercase', maxWidth: 1000 }}>
        {words.map((word, i) => <span key={i}>{word}</span>)}
        <span style={{ paddingLeft: 18, paddingRight: 18, borderRadius: 18, background: BRAND.orange500, color: BRAND.ink950 }}>{last}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, color: BRAND.ink800 }}>
        <span style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 18, paddingRight: 18, borderRadius: 999, background: BRAND.sky400, color: BRAND.ink950, fontSize: 24, letterSpacing: 2 }}>FASSA FRAME · MIT</span>
        <span>Fassa Frame · based on Editonny by Matheus Gomes</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Anton', data: anton, weight: 400, style: 'normal' }] },
  );
}
