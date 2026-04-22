import { useTranslations } from 'next-intl';
import { InterviewSimulator } from '@/components/interview-simulator';
import { INTERVIEW_QUESTIONS } from '@/content/pt-BR/interview-questions';

export default function SimulatorPage() {
  const t = useTranslations('simulator');
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">{t('heading')}</h1>
      <p>{t('intro')}</p>
      <InterviewSimulator questions={INTERVIEW_QUESTIONS} />
    </main>
  );
}
