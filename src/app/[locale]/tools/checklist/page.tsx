import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Checklist } from '@/components/checklist';
import { CHECKLIST_GROUPS } from '@/content/pt-BR/checklist-items';
import { ClipboardCheckIcon } from '@/components/icons';

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
    <main className="space-y-8 sm:space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          <ClipboardCheckIcon size={14} />
          Ferramenta
        </div>
        <h1 className="font-[family-name:var(--font-newsreader)] text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          {t('heading')}
        </h1>
        <p className="max-w-2xl text-base text-[var(--foreground-muted)] sm:text-lg">
          {t('intro')}
        </p>
      </header>

      <Checklist groups={CHECKLIST_GROUPS} />

      <p className="no-print rounded-md border border-dashed border-[var(--border-strong)] p-4 text-center text-sm text-[var(--foreground-muted)]">
        {t('printHint')}
      </p>
    </main>
  );
}
