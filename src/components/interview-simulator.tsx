'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { readInterview, togglePracticed } from '@/lib/progress';
import type { InterviewQuestion } from '@/content/pt-BR/interview-questions';

export function InterviewSimulator({ questions }: { questions: InterviewQuestion[] }) {
  const t = useTranslations('simulator');
  const [index, setIndex] = useState(0);
  const [practiced, setPracticed] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration from localStorage after mount
    setPracticed(readInterview().practiced);
  }, []);

  const q = questions[index];
  const isPracticed = practiced.includes(q.id);
  const practicedCount = practiced.length;

  const go = (delta: number) => {
    const next = (index + delta + questions.length) % questions.length;
    setIndex(next);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-medium text-neutral-700">
          Pergunta{' '}
          <span className="font-[family-name:var(--font-instrument-serif)] text-lg font-semibold text-[var(--foreground)]">
            {index + 1}
          </span>{' '}
          / {questions.length}
        </p>
        <p className="text-xs text-neutral-500">
          Praticadas: {practicedCount} / {questions.length}
        </p>
      </div>

      <article className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
        <div
          aria-hidden
          className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-brand-400/20 to-brand-700/10 blur-3xl"
        />
        <div className="relative space-y-4">
          <p className="font-[family-name:var(--font-instrument-serif)] text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {q.pt}
          </p>
          <p className="text-sm italic text-neutral-600">{q.en}</p>
          <div className="rounded-xl bg-[var(--surface-muted)] p-4 text-sm leading-relaxed">
            <span className="mr-1 font-semibold text-brand-700">Dica:</span>
            {q.guidance}
          </div>

          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background)] px-3 py-1.5 text-sm transition-colors hover:border-brand-300">
            <input
              type="checkbox"
              checked={isPracticed}
              onChange={() => setPracticed(togglePracticed(q.id).practiced)}
              className="h-4 w-4 accent-brand-600"
            />
            {t('markPracticed')}
          </label>
        </div>
      </article>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => go(-1)}
          className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2 text-sm font-medium transition-all hover:-translate-x-0.5 hover:border-brand-300"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {t('previous')}
        </button>

        <div className="flex gap-1.5">
          {questions.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Ir para pergunta ${i + 1}`}
              className={[
                'h-2 rounded-full transition-all',
                i === index
                  ? 'w-6 bg-brand-600'
                  : practiced.includes(item.id)
                    ? 'w-2 bg-brand-300'
                    : 'w-2 bg-neutral-300',
              ].join(' ')}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        >
          {t('next')}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
