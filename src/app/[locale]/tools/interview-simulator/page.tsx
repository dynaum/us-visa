import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { InterviewSimulator } from '@/components/interview-simulator';
import { INTERVIEW_QUESTIONS } from '@/content/pt-BR/interview-questions';

export default async function SimulatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SimulatorContent />;
}

function SimulatorContent() {
  const t = useTranslations('simulator');
  return (
    <main className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
          <span aria-hidden>🎙️</span>
          Ferramenta
        </span>
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('heading')}
        </h1>
        <p className="max-w-2xl text-lg text-neutral-700">{t('intro')}</p>
      </header>

      <InterviewSimulator questions={INTERVIEW_QUESTIONS} />
    </main>
  );
}
