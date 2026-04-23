import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { STAGES } from '@/lib/stages';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const locale = useLocale();
  const t = useTranslations();
  const base = `/${locale}`;

  return (
    <main className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-brand-50/40 p-8 shadow-sm sm:p-12 dark:to-brand-950/30">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-brand-400/30 to-brand-600/10 blur-3xl"
        />
        <div className="relative space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Visto B1/B2 · pt-BR
          </span>
          <h1 className="max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {t('home.heading')}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-700 sm:text-xl dark:text-neutral-300">
            {t('home.subheading')}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`${base}/guide`}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg"
            >
              {t('home.ctaStart')}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href={`${base}/tools/checklist`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--surface-muted)]"
            >
              {t('home.ctaChecklist')}
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('guide.heading')}
            </h2>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">{t('guide.intro')}</p>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {STAGES.map((s) => (
            <li key={s.id}>
              <Link
                href={`${base}/stages/${s.slug}`}
                className="group flex h-full gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl dark:from-brand-950 dark:to-brand-900">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                      Etapa {s.order + 1}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold tracking-tight">
                    {t(`stages.${s.id}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {t(`stages.${s.id}.summary`)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
