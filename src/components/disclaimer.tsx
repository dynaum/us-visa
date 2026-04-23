import { useTranslations } from 'next-intl';
import { AlertTriangleIcon } from './icons';

export function Disclaimer() {
  const t = useTranslations();
  return (
    <aside
      role="note"
      className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"
    >
      <span className="mt-0.5 flex-none text-amber-700">
        <AlertTriangleIcon size={18} />
      </span>
      <p className="leading-relaxed">{t('disclaimer')}</p>
    </aside>
  );
}
