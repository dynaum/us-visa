import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--surface)]/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-neutral-600 sm:flex-row dark:text-neutral-400">
        <span>{t('notOfficial')}</span>
        <a
          href="https://github.com/dynaum/us-visa"
          className="inline-flex items-center gap-1.5 font-medium text-brand-700 hover:text-brand-900 dark:text-brand-300 dark:hover:text-brand-100"
        >
          {t('sourceCode')}
          <span aria-hidden>→</span>
        </a>
      </div>
    </footer>
  );
}
