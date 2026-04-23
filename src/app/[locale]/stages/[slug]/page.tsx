import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { STAGES, getStageBySlug, type StageId } from '@/lib/stages';
import { Stepper } from '@/components/stepper';
import { routing } from '@/i18n/routing';

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

  return (
    <main className="space-y-10">
      <Stepper activeStageId={stage.id as StageId} />

      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-2xl dark:from-brand-950 dark:to-brand-900">
            {stage.icon}
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Etapa {stage.order + 1} de {STAGES.length}
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {t(`${stage.id}.title`)}
        </h1>
        <p className="max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
          {t(`${stage.id}.summary`)}
        </p>
      </header>

      <article className="prose prose-neutral max-w-none prose-headings:font-[family-name:var(--font-fraunces)] prose-headings:tracking-tight prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-[var(--foreground)] prose-blockquote:border-l-brand-400 prose-blockquote:bg-brand-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic dark:prose-invert dark:prose-a:text-brand-300 dark:prose-blockquote:bg-brand-950/30">
        <Content />
      </article>

      <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-6 no-print">
        {prev ? (
          <Link
            href={`/${locale}/stages/${prev.slug}`}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2 text-sm font-medium transition-all hover:-translate-x-0.5 hover:border-brand-300"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            {t(`${prev.id}.title`)}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/${locale}/stages/${next.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Próxima: {t(`${next.id}.title`)}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
