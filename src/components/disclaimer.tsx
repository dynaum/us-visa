import { useTranslations } from 'next-intl';

export function Disclaimer() {
  const t = useTranslations();
  return (
    <aside
      role="note"
      className="flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/80 p-4 text-sm text-amber-950 shadow-sm dark:border-amber-400/30 dark:bg-amber-950/30 dark:text-amber-100"
    >
      <span aria-hidden className="mt-0.5 text-base leading-none">⚠️</span>
      <p className="leading-relaxed">{t('disclaimer')}</p>
    </aside>
  );
}
