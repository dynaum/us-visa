import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { STAGES, type StageId } from '@/lib/stages';

export function Stepper({ activeStageId }: { activeStageId?: StageId }) {
  const locale = useLocale();
  const t = useTranslations('stages');
  const activeIndex = activeStageId ? STAGES.findIndex((s) => s.id === activeStageId) : -1;

  return (
    <ol
      aria-label="Etapas"
      className="no-print grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3"
    >
      {STAGES.map((stage, idx) => {
        const isActive = stage.id === activeStageId;
        const isPast = activeIndex > -1 && idx < activeIndex;

        return (
          <li key={stage.id} className="contents">
            <Link
              href={`/${locale}/stages/${stage.slug}`}
              aria-current={isActive ? 'step' : undefined}
              className={[
                'group relative flex flex-col gap-1.5 rounded-2xl border p-3 transition-all',
                isActive
                  ? 'border-brand-500 bg-gradient-to-br from-brand-50 to-brand-100/60 shadow-sm'
                  : 'border-[var(--border-subtle)] bg-[var(--surface)] hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm',
              ].join(' ')}
            >
              <div className="flex items-center gap-2">
                <span
                  className={[
                    'grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors',
                    isActive
                      ? 'bg-brand-600 text-white'
                      : isPast
                        ? 'bg-brand-200 text-brand-900'
                        : 'bg-[var(--surface-muted)] text-neutral-600',
                  ].join(' ')}
                >
                  {isPast ? '✓' : idx + 1}
                </span>
                <span className="text-lg" aria-hidden>
                  {stage.icon}
                </span>
              </div>
              <span className="text-sm font-semibold leading-tight">{t(`${stage.id}.title`)}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
