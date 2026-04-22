import { z } from 'zod';

const CHECKLIST_KEY = 'us-visa.checklist.v1';
const INTERVIEW_KEY = 'us-visa.interview.v1';

const ChecklistSchema = z.record(z.string(), z.boolean());
const InterviewSchema = z.object({ practiced: z.array(z.string()) });

export type ChecklistState = z.infer<typeof ChecklistSchema>;
export type InterviewState = z.infer<typeof InterviewSchema>;

function safeRead<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (raw === null) return fallback;
  try {
    const parsed = JSON.parse(raw);
    const result = schema.safeParse(parsed);
    if (!result.success) {
      window.localStorage.removeItem(key);
      return fallback;
    }
    return result.data;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readChecklist(): ChecklistState {
  return safeRead(CHECKLIST_KEY, ChecklistSchema, {});
}

export function writeChecklist(state: ChecklistState): void {
  safeWrite(CHECKLIST_KEY, state);
}

export function toggleChecklistItem(id: string): ChecklistState {
  const current = readChecklist();
  const next = { ...current, [id]: !current[id] };
  writeChecklist(next);
  return next;
}

export function readInterview(): InterviewState {
  return safeRead(INTERVIEW_KEY, InterviewSchema, { practiced: [] });
}

export function writeInterview(state: InterviewState): void {
  safeWrite(INTERVIEW_KEY, state);
}

export function togglePracticed(id: string): InterviewState {
  const current = readInterview();
  const has = current.practiced.includes(id);
  const next: InterviewState = {
    practiced: has ? current.practiced.filter((x) => x !== id) : [...current.practiced, id],
  };
  writeInterview(next);
  return next;
}
