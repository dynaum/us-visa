import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('home');
  const base = `/${locale}`;

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">{t('heading')}</h1>
      <p className="text-lg text-neutral-700 dark:text-neutral-300">{t('subheading')}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`${base}/guide`}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {t('ctaStart')}
        </Link>
        <Link
          href={`${base}/tools/checklist`}
          className="rounded border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          {t('ctaChecklist')}
        </Link>
      </div>
    </main>
  );
}
