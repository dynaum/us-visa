import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Checklist } from '@/components/checklist';
import { CHECKLIST_GROUPS } from '@/content/pt-BR/checklist-items';

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ChecklistPageContent />;
}

function ChecklistPageContent() {
  const t = useTranslations('checklist');
  return (
    <main className="space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200">
          <span aria-hidden>📋</span>
          Ferramenta
        </span>
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('heading')}
        </h1>
        <p className="max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">{t('intro')}</p>
      </header>

      <Checklist groups={CHECKLIST_GROUPS} />

      <p className="rounded-xl border border-dashed border-[var(--border-subtle)] p-3 text-center text-sm text-neutral-500 no-print">
        💡 {t('printHint')}
      </p>
    </main>
  );
}
