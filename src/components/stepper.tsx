import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { STAGES, type StageId } from '@/lib/stages';

export function Stepper({ activeStageId }: { activeStageId?: StageId }) {
  const locale = useLocale();
  const t = useTranslations('stages');

  return (
    <ol className="flex flex-wrap gap-2" aria-label="Etapas">
      {STAGES.map((stage, idx) => {
        const isActive = stage.id === activeStageId;
        return (
          <li key={stage.id} className="min-w-[140px] flex-1">
            <Link
              href={`/${locale}/stages/${stage.slug}`}
              aria-current={isActive ? 'step' : undefined}
              className={[
                'block rounded border px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900',
                isActive
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-neutral-300',
              ].join(' ')}
            >
              <span className="block text-xs text-neutral-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="font-medium">{t(`${stage.id}.title`)}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
