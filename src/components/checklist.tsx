'use client';

import { useEffect, useMemo, useState } from 'react';
import { readChecklist, toggleChecklistItem, type ChecklistState } from '@/lib/progress';
import type { ChecklistGroup } from '@/content/pt-BR/checklist-items';
import { GROUP_ICONS, CheckIcon } from './icons';

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
    <div className="space-y-8 sm:space-y-10">
      <div className="rounded-lg border border-[var(--border-subtle)] bg-white p-4 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
              Seu progresso
            </p>
            <p className="mt-1 font-[family-name:var(--font-newsreader)] text-2xl sm:text-3xl">
              {done}
              <span className="text-[var(--foreground-muted)]"> / {total}</span>
              <span className="ml-2 text-base font-medium text-[var(--foreground-muted)]">
                ({pct}%)
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
          <div
            className="h-full rounded-full bg-[var(--foreground)] transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% concluído`}
          />
        </div>
      </div>

      {groups.map((group) => {
        const GroupIcon = GROUP_ICONS[group.id as keyof typeof GROUP_ICONS];
        const groupDone = group.items.filter((i) => state[i.id]).length;
        return (
          <section key={group.id} className="space-y-3">
            <header className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-3">
              <span
                aria-hidden
                className="grid h-10 w-10 flex-none place-items-center rounded-md border border-[var(--border-subtle)] bg-white text-[var(--foreground)]"
              >
                {GroupIcon ? <GroupIcon size={18} /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-[family-name:var(--font-newsreader)] text-lg tracking-tight sm:text-xl">
                  {group.title}
                </h2>
              </div>
              <span className="flex-none rounded-md bg-[var(--surface-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--foreground-muted)]">
                {groupDone} / {group.items.length}
              </span>
            </header>
            <ul className="divide-y divide-[var(--border-subtle)] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-white">
              {group.items.map((item) => {
                const checked = !!state[item.id];
                return (
                  <li key={item.id}>
                    <label
                      htmlFor={`cb-${item.id}`}
                      className={[
                        'flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors sm:px-5',
                        checked
                          ? 'bg-[var(--surface-muted)]'
                          : 'hover:bg-[var(--surface-muted)]',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'relative mt-0.5 grid h-5 w-5 flex-none place-items-center rounded border-2 transition-colors',
                          checked
                            ? 'border-[var(--foreground)] bg-[var(--foreground)] text-white'
                            : 'border-[var(--border-strong)] bg-white',
                        ].join(' ')}
                      >
                        <input
                          id={`cb-${item.id}`}
                          type="checkbox"
                          checked={checked}
                          onChange={() => setState(toggleChecklistItem(item.id))}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                        {checked && <CheckIcon size={12} />}
                      </span>
                      <span
                        className={[
                          'text-sm leading-relaxed sm:text-base',
                          checked
                            ? 'text-[var(--foreground-muted)] line-through'
                            : 'text-[var(--foreground)]',
                        ].join(' ')}
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
