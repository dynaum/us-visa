import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (routing.locales as readonly string[]).includes(requested ?? '')
    ? (requested as Locale)
    : routing.defaultLocale;

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch {
    notFound();
  }
});
