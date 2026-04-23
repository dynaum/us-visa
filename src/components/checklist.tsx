'use client';

import { useEffect, useMemo, useState } from 'react';
import { readChecklist, toggleChecklistItem, type ChecklistState } from '@/lib/progress';
import type { ChecklistGroup } from '@/content/pt-BR/checklist-items';

const GROUP_ICONS: Record<string, string> = {
  required: '📄',
  ties: '🇧🇷',
  trip: '✈️',
};

export function Checklist({ groups }: { groups: ChecklistGroup[] }) {
  const [state, setState] = useState<ChecklistState>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration from localStorage after mount to avoid SSR mismatch
    setState(readChecklist());
  }, []);

  const { total, done } = useMemo(() => {
    const all = groups.flatMap((g) => g.items);
    return { total: all.length, done: all.filter((i) => state[i.id]).length };
  }, [groups, state]);

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="space-y-8">
      <div className="surface rounded-2xl p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Progresso
          </p>
          <p className="font-[family-name:var(--font-fraunces)] text-2xl font-semibold">
            {done}
            <span className="text-neutral-400"> / {total}</span>
          </p>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {groups.map((group) => {
        const groupDone = group.items.filter((i) => state[i.id]).length;
        return (
          <section key={group.id} className="space-y-3">
            <header className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-lg dark:from-brand-950 dark:to-brand-900"
              >
                {GROUP_ICONS[group.id] ?? '•'}
              </span>
              <div>
                <h2 className="font-semibold tracking-tight">{group.title}</h2>
                <p className="text-xs text-neutral-500">
                  {groupDone} / {group.items.length}
                </p>
              </div>
            </header>
            <ul className="divide-y divide-[var(--border-subtle)] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]">
              {group.items.map((item) => {
                const checked = !!state[item.id];
                return (
                  <li key={item.id}>
                    <label
                      htmlFor={`cb-${item.id}`}
                      className={[
                        'flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors',
                        checked
                          ? 'bg-brand-50/40 dark:bg-brand-950/20'
                          : 'hover:bg-[var(--surface-muted)]',
                      ].join(' ')}
                    >
                      <input
                        id={`cb-${item.id}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => setState(toggleChecklistItem(item.id))}
                        className="h-4 w-4 flex-none accent-brand-600"
                      />
                      <span
                        className={
                          checked
                            ? 'text-neutral-500 line-through decoration-brand-400/60'
                            : 'text-[var(--foreground)]'
                        }
                      >
                        {item.label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
