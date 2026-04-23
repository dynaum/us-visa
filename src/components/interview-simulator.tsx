'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { readInterview, togglePracticed } from '@/lib/progress';
import type { InterviewQuestion } from '@/content/pt-BR/interview-questions';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from './icons';

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
    const nextIndex = (index + delta + questions.length) % questions.length;
    setIndex(nextIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4 text-sm">
        <p className="font-medium text-[var(--foreground)]">
          Pergunta{' '}
          <span className="font-[family-name:var(--font-newsreader)] text-xl font-medium">
            {index + 1}
          </span>{' '}
          <span className="text-[var(--foreground-muted)]">/ {questions.length}</span>
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
          Praticadas · {practicedCount} / {questions.length}
        </p>
      </div>

      <article className="rounded-lg border border-[var(--border-subtle)] bg-white p-5 sm:p-8">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Em português
            </p>
            <p className="mt-2 font-[family-name:var(--font-newsreader)] text-2xl leading-tight tracking-tight sm:text-3xl md:text-4xl">
              {q.pt}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
              In English
            </p>
            <p className="mt-2 font-[family-name:var(--font-newsreader)] text-lg italic text-[var(--foreground-muted)] sm:text-xl">
              {q.en}
            </p>
          </div>
          <div className="rounded-md border-l-4 border-[var(--accent)] bg-[var(--surface-muted)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
              Como responder
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]">{q.guidance}</p>
          </div>

          <label className="mt-2 inline-flex cursor-pointer items-center gap-2.5 rounded-md border border-[var(--border-subtle)] bg-white px-3 py-2 text-sm font-medium transition-colors hover:border-[var(--foreground)]">
            <span
              className={[
                'relative grid h-5 w-5 place-items-center rounded border-2 transition-colors',
                isPracticed
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-white'
                  : 'border-[var(--border-strong)] bg-white',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={isPracticed}
                onChange={() => setPracticed(togglePracticed(q.id).practiced)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {isPracticed && <CheckIcon size={12} />}
            </span>
            {t('markPracticed')}
          </label>
        </div>
      </article>

      <div className="grid grid-cols-2 items-center gap-2 sm:flex sm:justify-between">
        <button
          onClick={() => go(-1)}
          className="group order-1 inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
        >
          <ArrowLeftIcon
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          {t('previous')}
        </button>

        <div
          className="order-3 col-span-2 flex justify-center gap-1.5 sm:order-2 sm:col-span-1"
          role="group"
          aria-label="Progresso das perguntas"
        >
          {questions.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Ir para pergunta ${i + 1}`}
              className={[
                'h-2 rounded-full transition-all',
                i === index
                  ? 'w-7 bg-[var(--foreground)]'
                  : practiced.includes(item.id)
                    ? 'w-2 bg-[var(--foreground-muted)]'
                    : 'w-2 bg-[var(--border-strong)]',
              ].join(' ')}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="group order-2 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-ink)] sm:order-3"
        >
          {t('next')}
          <ArrowRightIcon
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}
