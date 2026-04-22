import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Disclaimer } from '@/components/disclaimer';

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
    <html lang={locale}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
            <Disclaimer />
            <div className="mt-6">{children}</div>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
