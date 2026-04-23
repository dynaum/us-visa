import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Stepper } from '@/components/stepper';
import { STAGES } from '@/lib/stages';

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
    <main className="space-y-10">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          5 etapas
        </span>
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('guide.heading')}
        </h1>
        <p className="max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
          {t('guide.intro')}
        </p>
      </header>

      <Stepper />

      <ol className="relative space-y-4 border-l-2 border-dashed border-[var(--border-subtle)] pl-6 sm:pl-8">
        {STAGES.map((s) => (
          <li key={s.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[29px] top-4 grid h-6 w-6 place-items-center rounded-full border-2 border-[var(--border-subtle)] bg-[var(--background)] text-xs font-bold text-brand-700 sm:-left-[37px] dark:text-brand-300"
            >
              {s.order + 1}
            </span>
            <Link
              href={`${base}/stages/${s.slug}`}
              className="group flex gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl dark:from-brand-950 dark:to-brand-900">
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold tracking-tight">{t(`stages.${s.id}.title`)}</h2>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t(`stages.${s.id}.summary`)}
                </p>
              </div>
              <span
                aria-hidden
                className="self-center text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
