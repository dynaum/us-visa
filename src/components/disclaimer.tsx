import { useTranslations } from 'next-intl';

export function Disclaimer() {
  const t = useTranslations();
  return (
    <aside
      role="note"
      className="border-l-4 border-yellow-500 bg-yellow-50 p-3 text-sm text-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200"
    >
      {t('disclaimer')}
    </aside>
  );
}
