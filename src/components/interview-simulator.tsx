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

  const go = (delta: number) => {
    const next = (index + delta + questions.length) % questions.length;
    setIndex(next);
  };

  return (
    <div className="space-y-4">
      <article className="rounded border p-4">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          {index + 1} / {questions.length}
        </p>
        <p className="mt-2 text-xl font-semibold">{q.pt}</p>
        <p className="text-sm italic text-neutral-600 dark:text-neutral-400">{q.en}</p>
        <p className="mt-3 text-sm">{q.guidance}</p>

        <label className="mt-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPracticed}
            onChange={() => setPracticed(togglePracticed(q.id).practiced)}
          />
          {t('markPracticed')}
        </label>
      </article>

      <div className="flex gap-2">
        <button
          onClick={() => go(-1)}
          className="rounded border px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          {t('previous')}
        </button>
        <button
          onClick={() => go(1)}
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
}
