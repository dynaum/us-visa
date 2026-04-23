import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { STAGES } from '@/lib/stages';
import { STAGE_ICONS, ArrowRightIcon } from '@/components/icons';

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
    <main className="space-y-14 sm:space-y-20">
      <section className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-white px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                Visto B1/B2
              </span>
              <span aria-hidden>·</span>
              <span>Guia passo a passo</span>
              <span aria-hidden>·</span>
              <span>pt-BR</span>
            </div>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
              {t('home.heading')}
            </h1>
            <p className="max-w-2xl text-base text-[var(--foreground-muted)] sm:text-lg md:text-xl">
              {t('home.subheading')}
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Link
                href={`${base}/guide`}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-ink)] sm:py-2.5"
              >
                {t('home.ctaStart')}
                <ArrowRightIcon
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={`${base}/tools/checklist`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--foreground)] sm:py-2.5"
              >
                {t('home.ctaChecklist')}
              </Link>
            </div>
          </div>
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 rounded-lg border border-[var(--border-subtle)] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                O que você encontra aqui
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  'As 5 etapas, do começo ao fim',
                  'Checklist interativo de documentos',
                  'Simulador com perguntas reais',
                  'Sem cadastro, sem custo',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-[var(--foreground)]" />
                    <span className="text-[var(--foreground)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="stages-heading" className="space-y-6 sm:space-y-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Passo a passo
            </p>
            <h2
              id="stages-heading"
              className="mt-1 font-[family-name:var(--font-newsreader)] text-2xl tracking-tight sm:text-3xl"
            >
              {t('guide.heading')}
            </h2>
          </div>
          <Link
            href={`${base}/guide`}
            className="hidden text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-ink)] sm:inline"
          >
            Ver todas →
          </Link>
        </div>
        <p className="max-w-3xl text-[var(--foreground-muted)]">{t('guide.intro')}</p>
        <ul className="grid gap-0 divide-y divide-[var(--border-subtle)] rounded-lg border border-[var(--border-subtle)] bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {STAGES.map((s) => {
            const Icon = STAGE_ICONS[s.id];
            return (
              <li key={s.id} className="sm:nth-[odd]:border-b sm:nth-[odd]:border-[var(--border-subtle)]">
                <Link
                  href={`${base}/stages/${s.slug}`}
                  className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-[var(--surface-muted)]"
                >
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-md border border-[var(--border-subtle)] bg-white text-[var(--foreground)] group-hover:border-[var(--foreground)] group-hover:text-[var(--accent-ink)]">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
                      {String(s.order + 1).padStart(2, '0')} · Etapa
                    </p>
                    <h3 className="mt-1 font-[family-name:var(--font-newsreader)] text-lg leading-tight tracking-tight sm:text-xl">
                      {t(`stages.${s.id}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--foreground-muted)]">
                      {t(`stages.${s.id}.summary`)}
                    </p>
                  </div>
                  <ArrowRightIcon
                    size={16}
                    className="mt-1 hidden flex-none text-[var(--foreground-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--foreground)] sm:block"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
