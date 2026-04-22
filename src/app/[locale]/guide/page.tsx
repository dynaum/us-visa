import { useTranslations } from 'next-intl';
import { Stepper } from '@/components/stepper';
import { STAGES } from '@/lib/stages';

export default function GuidePage() {
  const t = useTranslations();
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">{t('guide.heading')}</h1>
      <p>{t('guide.intro')}</p>
      <Stepper />
      <ul className="space-y-3">
        {STAGES.map((s) => (
          <li key={s.id} className="rounded border p-4">
            <h2 className="font-semibold">{t(`stages.${s.id}.title`)}</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t(`stages.${s.id}.summary`)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
