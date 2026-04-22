'use client';

import { useEffect, useState } from 'react';
import { readChecklist, toggleChecklistItem, type ChecklistState } from '@/lib/progress';
import type { ChecklistGroup } from '@/content/pt-BR/checklist-items';

export function Checklist({ groups }: { groups: ChecklistGroup[] }) {
  const [state, setState] = useState<ChecklistState>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration from localStorage after mount to avoid SSR mismatch
    setState(readChecklist());
  }, []);

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.id}>
          <h2 className="mb-2 text-lg font-semibold">{group.title}</h2>
          <ul className="space-y-2">
            {group.items.map((item) => {
              const checked = !!state[item.id];
              return (
                <li key={item.id} className="flex items-start gap-2">
                  <input
                    id={`cb-${item.id}`}
                    type="checkbox"
                    checked={checked}
                    onChange={() => setState(toggleChecklistItem(item.id))}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`cb-${item.id}`}
                    className={checked ? 'text-neutral-500 line-through' : ''}
                  >
                    {item.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
