import type { Metadata } from 'next';
import Link from 'next/link';
import '@editonny/design-system/styles.css';
import { fontVariables } from './fonts';

export const metadata: Metadata = { title: '404 — Fassa Frame', robots: { index: false } };

// Requests outside the locale routing (for example an unknown locale prefix) end here.
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" className={fontVariables}>
      <body>
        <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 'var(--gutter)', textAlign: 'center' }}>
          <div>
            <h1 style={{ font: 'var(--text-heading)', marginBottom: 'var(--space-4)' }}>This page is not here.</h1>
            <p><Link href="/">Go to the Fassa Frame home page</Link></p>
          </div>
        </main>
      </body>
    </html>
  );
}
