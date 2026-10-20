import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@editonny/design-system/styles.css';
import { fontVariables } from '../fonts';

export const metadata: Metadata = {
  title: 'Fassa Frame design system',
  description: 'Fassa Frame design system: tokens, components, states, templates, and both themes.',
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" data-show="both" className={fontVariables} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
