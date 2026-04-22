import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm text-neutral-600 dark:text-neutral-400">
        <span>{t('notOfficial')}</span>
        <a href="https://github.com/dynaum/us-visa" className="hover:underline">
          {t('sourceCode')}
        </a>
      </div>
    </footer>
  );
}
