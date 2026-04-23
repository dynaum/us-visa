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
    <main className="space-y-8 sm:space-y-10">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          5 etapas
        </span>
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl tracking-tight sm:text-4xl md:text-5xl">
          {t('guide.heading')}
        </h1>
        <p className="max-w-2xl text-base text-neutral-700 sm:text-lg">{t('guide.intro')}</p>
      </header>

      <Stepper />

      <ol className="relative space-y-3 border-l-2 border-dashed border-[var(--border-subtle)] pl-5 sm:space-y-4 sm:pl-8">
        {STAGES.map((s) => (
          <li key={s.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[23px] top-4 grid h-5 w-5 place-items-center rounded-full border-2 border-[var(--border-subtle)] bg-[var(--background)] text-[10px] font-bold text-brand-700 sm:-left-[37px] sm:h-6 sm:w-6 sm:text-xs"
            >
              {s.order + 1}
            </span>
            <Link
              href={`${base}/stages/${s.slug}`}
              className="group flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:gap-4 sm:p-5"
            >
              <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl sm:h-12 sm:w-12">
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base tracking-tight sm:text-lg">
                  {t(`stages.${s.id}.title`)}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                  {t(`stages.${s.id}.summary`)}
                </p>
              </div>
              <span
                aria-hidden
                className="hidden self-center text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 sm:inline"
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
