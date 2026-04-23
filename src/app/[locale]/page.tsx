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
    <main className="space-y-12 sm:space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-brand-50/40 p-6 shadow-sm sm:p-10 md:p-12">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-brand-400/30 to-brand-600/10 blur-3xl sm:-right-20 sm:-top-20 sm:h-72 sm:w-72"
        />
        <div className="relative space-y-5 sm:space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Visto B1/B2 · pt-BR
          </span>
          <h1 className="max-w-3xl font-[family-name:var(--font-fraunces)] text-3xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {t('home.heading')}
          </h1>
          <p className="max-w-2xl text-base text-neutral-700 sm:text-lg md:text-xl">
            {t('home.subheading')}
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Link
              href={`${base}/guide`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg sm:py-2.5"
            >
              {t('home.ctaStart')}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href={`${base}/tools/checklist`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-5 py-3 text-sm font-bold text-[var(--foreground)] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--surface-muted)] sm:py-2.5"
            >
              {t('home.ctaChecklist')}
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-5 sm:space-y-6">
        <div>
          <h2 className="text-2xl tracking-tight sm:text-3xl">{t('guide.heading')}</h2>
          <p className="mt-1 text-neutral-600">{t('guide.intro')}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {STAGES.map((s) => (
            <li key={s.id}>
              <Link
                href={`${base}/stages/${s.slug}`}
                className="group flex h-full gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:gap-4 sm:p-5"
              >
                <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl sm:h-12 sm:w-12">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    Etapa {s.order + 1}
                  </span>
                  <h3 className="mt-0.5 text-base tracking-tight sm:text-lg">
                    {t(`stages.${s.id}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
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
