import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
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
  const stage = getStageBySlug(slug);
  if (!stage) notFound();

  const t = await getTranslations({ locale, namespace: 'stages' });

  let Content: React.ComponentType;
  try {
    Content = (await import(`@/content/${locale}/stages/${stage.id}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <main className="space-y-6">
      <Stepper activeStageId={stage.id as StageId} />
      <header>
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Etapa {stage.order + 1} de {STAGES.length}
        </p>
        <h1 className="text-3xl font-bold">{t(`${stage.id}.title`)}</h1>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          {t(`${stage.id}.summary`)}
        </p>
      </header>
      <article className="prose max-w-none dark:prose-invert">
        <Content />
      </article>
    </main>
  );
}
