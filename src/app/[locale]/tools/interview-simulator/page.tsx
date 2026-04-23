import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { InterviewSimulator } from '@/components/interview-simulator';
import { INTERVIEW_QUESTIONS } from '@/content/pt-BR/interview-questions';
import { MessagesIcon } from '@/components/icons';

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
    <main className="space-y-8 sm:space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          <MessagesIcon size={14} />
          Ferramenta
        </div>
        <h1 className="font-[family-name:var(--font-newsreader)] text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          {t('heading')}
        </h1>
        <p className="max-w-2xl text-base text-[var(--foreground-muted)] sm:text-lg">
          {t('intro')}
        </p>
      </header>

      <InterviewSimulator questions={INTERVIEW_QUESTIONS} />
    </main>
  );
}
