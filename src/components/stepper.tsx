import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { STAGES, type StageId } from '@/lib/stages';
import { STAGE_ICONS, CheckIcon } from './icons';

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
        const Icon = STAGE_ICONS[stage.id];

        return (
          <li key={stage.id} className="contents">
            <Link
              href={`/${locale}/stages/${stage.slug}`}
              aria-current={isActive ? 'step' : undefined}
              className={[
                'group relative flex flex-col gap-2 rounded-lg border p-3 transition-all',
                isActive
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-white shadow-sm'
                  : isPast
                    ? 'border-[var(--border-subtle)] bg-white text-[var(--foreground)] hover:border-[var(--foreground)]'
                    : 'border-[var(--border-subtle)] bg-white text-[var(--foreground-muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <span
                  className={[
                    'grid h-7 w-7 place-items-center rounded-md text-[11px] font-bold transition-colors',
                    isActive
                      ? 'bg-white/15 text-white'
                      : isPast
                        ? 'bg-[var(--foreground)] text-white'
                        : 'bg-[var(--surface-muted)] text-[var(--foreground-muted)]',
                  ].join(' ')}
                >
                  {isPast ? <CheckIcon size={14} /> : String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    isActive ? 'text-white/80' : 'text-[var(--foreground-muted)]'
                  }
                >
                  <Icon size={18} />
                </span>
              </div>
              <span className="text-sm font-medium leading-tight">{t(`${stage.id}.title`)}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
