import { useTranslations } from 'next-intl';
import { ShieldCheckIcon } from './icons';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-white sm:mt-24">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="grid h-8 w-8 flex-none place-items-center rounded-md bg-[var(--surface-muted)] text-[var(--foreground-muted)]"
            >
              <ShieldCheckIcon size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Guia independente, não-oficial
              </p>
              <p className="text-xs text-[var(--foreground-muted)]">{t('notOfficial')}</p>
            </div>
          </div>
          <a
            href="https://github.com/dynaum/us-visa"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-ink)]"
          >
            {t('sourceCode')}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
