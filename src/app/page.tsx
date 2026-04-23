import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${routing.defaultLocale}/`;

export const metadata: Metadata = {
  robots: { index: false },
  other: { refresh: `0; url=${target}` },
};

export default function RootRedirect() {
  return (
    <html lang="pt-BR">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </head>
      <body>
        <a href={target}>Redirecionando para {target}…</a>
      </body>
    </html>
  );
}
