import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Stepper } from '@/components/stepper';
import { STAGES } from '@/lib/stages';
import { STAGE_ICONS, ArrowRightIcon } from '@/components/icons';

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GuideContent />;
}

function GuideContent() {
  const locale = useLocale();
  const t = useTranslations();
  const base = `/${locale}`;

  return (
    <main className="space-y-10 sm:space-y-14">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          5 etapas · Ordem cronológica
        </p>
        <h1 className="font-[family-name:var(--font-newsreader)] text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          {t('guide.heading')}
        </h1>
        <p className="max-w-2xl text-base text-[var(--foreground-muted)] sm:text-lg">
          {t('guide.intro')}
        </p>
      </header>

      <Stepper />

      <ol className="relative space-y-0 divide-y divide-[var(--border-subtle)] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-white">
        {STAGES.map((s) => {
          const Icon = STAGE_ICONS[s.id];
          return (
            <li key={s.id}>
              <Link
                href={`${base}/stages/${s.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 p-5 transition-colors hover:bg-[var(--surface-muted)] sm:gap-6 sm:p-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="font-[family-name:var(--font-newsreader)] text-3xl font-medium leading-none text-[var(--foreground-muted)] group-hover:text-[var(--accent-ink)] sm:text-4xl">
                    {String(s.order + 1).padStart(2, '0')}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--border-subtle)] text-[var(--foreground-muted)] group-hover:border-[var(--foreground)] group-hover:text-[var(--foreground)]">
                    <Icon size={16} />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h2 className="font-[family-name:var(--font-newsreader)] text-xl tracking-tight sm:text-2xl">
                    {t(`stages.${s.id}.title`)}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base">
                    {t(`stages.${s.id}.summary`)}
                  </p>
                </div>
                <ArrowRightIcon
                  size={18}
                  className="mt-2 hidden flex-none text-[var(--foreground-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--foreground)] sm:block"
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
