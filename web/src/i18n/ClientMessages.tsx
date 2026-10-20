import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';
import { pickMessages } from './pick';

/** Message groups the header, phone menu, and language menu read on the client. */
export const SHELL_MESSAGES = ['Header', 'Nav', 'Theme', 'Language'];

/** Provides client components below with only the listed message groups, so pages do not ship every catalog. */
export async function ClientMessages({ groups, children }: { groups: string[]; children: ReactNode }) {
  return <NextIntlClientProvider messages={pickMessages(await getMessages(), groups)}>{children}</NextIntlClientProvider>;
}
