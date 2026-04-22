import { useTranslations } from 'next-intl';
import { Checklist } from '@/components/checklist';
import { CHECKLIST_GROUPS } from '@/content/pt-BR/checklist-items';

export default function ChecklistPage() {
  const t = useTranslations('checklist');
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">{t('heading')}</h1>
      <p>{t('intro')}</p>
      <Checklist groups={CHECKLIST_GROUPS} />
      <p className="text-sm text-neutral-500">{t('printHint')}</p>
    </main>
  );
}
