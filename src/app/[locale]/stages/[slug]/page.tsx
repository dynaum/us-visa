import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { STAGES, getStageBySlug, type StageId } from '@/lib/stages';
import { Stepper } from '@/components/stepper';
import { routing } from '@/i18n/routing';
import { STAGE_ICONS, ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    STAGES.map((s) => ({ locale, slug: s.slug })),
  );
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const stage = getStageBySlug(slug);
  if (!stage) notFound();

  const t = await getTranslations({ locale, namespace: 'stages' });

  let Content: React.ComponentType;
  try {
    Content = (await import(`@/content/${locale}/stages/${stage.id}.mdx`)).default;
  } catch {
    notFound();
  }

  const prev = STAGES[stage.order - 1];
  const next = STAGES[stage.order + 1];
  const Icon = STAGE_ICONS[stage.id as StageId];

  return (
    <main className="space-y-10 sm:space-y-14">
      <Stepper activeStageId={stage.id as StageId} />

      <header className="space-y-4 border-b border-[var(--border-subtle)] pb-6 sm:pb-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border-subtle)] bg-white text-[var(--foreground)]">
            <Icon size={18} />
          </span>
          <div className="flex items-baseline gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
            <span className="font-[family-name:var(--font-newsreader)] text-lg font-medium text-[var(--foreground-muted)]">
              {String(stage.order + 1).padStart(2, '0')}
            </span>
            <span>de {String(STAGES.length).padStart(2, '0')} · Etapa</span>
          </div>
        </div>
        <h1 className="font-[family-name:var(--font-newsreader)] text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          {t(`${stage.id}.title`)}
        </h1>
        <p className="max-w-2xl text-base text-[var(--foreground-muted)] sm:text-lg">
          {t(`${stage.id}.summary`)}
        </p>
      </header>

      <article className="prose prose-editorial max-w-none prose-sm sm:prose-base prose-headings:font-[family-name:var(--font-newsreader)] prose-headings:font-medium prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--foreground)] prose-strong:font-semibold prose-blockquote:border-l-[var(--accent)] prose-blockquote:bg-[var(--surface-muted)] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-[var(--foreground)] prose-li:text-[var(--foreground)] prose-p:text-[var(--foreground)]">
        <Content />
      </article>

      <nav className="no-print grid grid-cols-1 gap-3 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2 sm:gap-4">
        {prev ? (
          <Link
            href={`/${locale}/stages/${prev.slug}`}
            className="group flex items-start gap-3 rounded-md border border-[var(--border-subtle)] bg-white p-4 transition-colors hover:border-[var(--foreground)]"
          >
            <ArrowLeftIcon
              size={18}
              className="mt-1 flex-none text-[var(--foreground-muted)] transition-transform group-hover:-translate-x-0.5 group-hover:text-[var(--foreground)]"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
                Anterior
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-newsreader)] text-base tracking-tight text-[var(--foreground)]">
                {t(`${prev.id}.title`)}
              </p>
            </div>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link
            href={`/${locale}/stages/${next.slug}`}
            className="group flex items-start justify-end gap-3 rounded-md bg-[var(--foreground)] p-4 text-white transition-colors hover:bg-[var(--accent-ink)] sm:text-right"
          >
            <div className="min-w-0 text-left sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
                Próxima etapa
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-newsreader)] text-base tracking-tight">
                {t(`${next.id}.title`)}
              </p>
            </div>
            <ArrowRightIcon
              size={18}
              className="mt-1 flex-none text-white/80 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </nav>
    </main>
  );
}
