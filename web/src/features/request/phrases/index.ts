import type { AppLocale } from '@/i18n/routing';
import { enUS } from './en-US';
import { es } from './es';
import { ptBR } from './pt-BR';
import type { RequestPhrases } from './types';

const PHRASES: Record<AppLocale, RequestPhrases> = { 'en-US': enUS, 'pt-BR': ptBR, es };

export const phrasesFor = (locale: AppLocale): RequestPhrases => PHRASES[locale];
export type { RequestPhrases };
