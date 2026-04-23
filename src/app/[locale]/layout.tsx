import type { ReactNode } from 'react';
import { Newsreader, Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Disclaimer } from '@/components/disclaimer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${roboto.variable} ${newsreader.variable}`}
      style={{ colorScheme: 'light' }}
    >
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-md"
          >
            Pular para o conteúdo
          </a>
          <Header />
          <div
            id="main"
            className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
          >
            <Disclaimer />
            <div className="mt-6 sm:mt-10">{children}</div>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
