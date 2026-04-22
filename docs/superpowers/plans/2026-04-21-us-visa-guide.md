# US Tourist Visa Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a pt-BR-first web app that walks a first-time US tourist visa applicant through the 5 stages of the process, with i18n-ready structure.

**Architecture:** Next.js 15 App Router + TypeScript, SSG per locale. `next-intl` for i18n. MDX for long-form stage content. `localStorage` (Zod-validated via a single `progress.ts` module) for persistent checklist + interview simulator state. No backend.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, next-intl, @next/mdx, Zod, Vitest, @testing-library/react, Playwright, pnpm.

**Working directory for all commands:** `/Users/dynaum/dev/us-visa`. Every `git` invocation below is `git -C /Users/dynaum/dev/us-visa ...`. Package commands assume `cd /Users/dynaum/dev/us-visa` first.

---

## Task 1: Scaffold package + TypeScript + Tailwind + ESLint

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `next-env.d.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx` (temporary, removed in Task 3)
- Create: `.eslintrc.json`
- Create: `.prettierrc.json`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "us-visa",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 2: Install runtime + dev dependencies**

Run:
```bash
pnpm add next@^15 react@^19 react-dom@^19 zod
pnpm add -D typescript @types/react @types/react-dom @types/node \
  tailwindcss@^4 @tailwindcss/postcss postcss \
  eslint eslint-config-next prettier \
  vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom \
  @playwright/test
```

Expected: all packages installed, `pnpm-lock.yaml` created.

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
```

- [ ] **Step 5: Create `next.config.mjs` (minimal, MDX added in Task 3)**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 6: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 7: Create `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

html, body {
  background: var(--background);
  color: var(--foreground);
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
}

a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

- [ ] **Step 8: Create `src/app/layout.tsx` (root — delegates to `[locale]/layout` later)**

```tsx
import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'US Visa Guide',
  description: 'Guia passo a passo para o visto americano de turismo.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 9: Create temporary `src/app/page.tsx` to verify build**

```tsx
export default function Placeholder() {
  return <main className="p-8">Scaffold OK</main>;
}
```

- [ ] **Step 10: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 11: Create `.prettierrc.json`**

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

- [ ] **Step 12: Verify build**

Run: `pnpm typecheck && pnpm build`
Expected: typecheck passes, Next builds successfully.

- [ ] **Step 13: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat: scaffold Next.js 15 app with TypeScript and Tailwind v4"
```

---

## Task 2: Add Vitest + Playwright config

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `tests/e2e/.gitkeep`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
```

- [ ] **Step 2: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  localStorage.clear();
});
```

- [ ] **Step 3: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm build && pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 4: Add e2e directory placeholder**

```bash
mkdir -p /Users/dynaum/dev/us-visa/tests/e2e
: > /Users/dynaum/dev/us-visa/tests/e2e/.gitkeep
```

- [ ] **Step 5: Sanity-check test runner with a trivial test**

Create `src/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `pnpm test`
Expected: 1 passed.

Delete it: `rm src/smoke.test.ts`

- [ ] **Step 6: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "test: add Vitest and Playwright configuration"
```

---

## Task 3: Configure next-intl with locale routing

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Create: `messages/pt-BR.json`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (minimal placeholder — real home in Task 7)
- Modify: `src/app/layout.tsx` (become a passthrough — already is)
- Modify: `next.config.mjs` (wrap with next-intl plugin)
- Delete: `src/app/page.tsx`

- [ ] **Step 1: Install next-intl**

Run: `pnpm add next-intl`

- [ ] **Step 2: Create `src/i18n/routing.ts`**

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt-BR'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 3: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = (routing.locales as readonly string[]).includes(requested ?? '')
    ? (requested as Locale)
    : routing.defaultLocale;

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch {
    notFound();
  }
});
```

- [ ] **Step 4: Create `src/middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 5: Create `messages/pt-BR.json`**

```json
{
  "meta": {
    "title": "Guia do Visto Americano",
    "description": "Passo a passo para o visto americano de turismo (B1/B2)."
  },
  "nav": {
    "home": "Início",
    "guide": "Passo a passo",
    "checklist": "Checklist",
    "simulator": "Simulador de entrevista"
  },
  "home": {
    "heading": "Seu guia para o visto americano de turismo",
    "subheading": "Feito para quem nunca tirou o visto antes. Claro, objetivo, do começo ao fim.",
    "ctaStart": "Começar o passo a passo",
    "ctaChecklist": "Ver checklist de documentos"
  },
  "guide": {
    "heading": "Passo a passo",
    "intro": "O processo tem 5 etapas. Clique em cada uma para ver os detalhes."
  },
  "stepper": {
    "stage": "Etapa {current} de {total}",
    "completed": "concluída",
    "markDone": "Marcar como concluída",
    "markUndone": "Desmarcar"
  },
  "stages": {
    "mrv-fee": {
      "title": "Pagar a taxa MRV",
      "summary": "A taxa consular de US$ 185, paga antes de agendar."
    },
    "ds-160": {
      "title": "Preencher o DS-160",
      "summary": "O formulário online com seus dados para o consulado."
    },
    "scheduling": {
      "title": "Agendar CASV e entrevista",
      "summary": "Dois agendamentos: biometria (CASV) e entrevista consular."
    },
    "documents": {
      "title": "Preparar os documentos",
      "summary": "O que levar no dia — checklist interativo."
    },
    "interview": {
      "title": "Fazer a entrevista",
      "summary": "O que esperar, perguntas comuns, como se preparar."
    }
  },
  "checklist": {
    "heading": "Checklist de documentos",
    "intro": "Marque cada item conforme for preparando. Seu progresso fica salvo neste navegador.",
    "empty": "Nenhum item marcado ainda.",
    "printHint": "Dica: use a função imprimir do navegador para levar em papel."
  },
  "simulator": {
    "heading": "Simulador de entrevista",
    "intro": "Pratique respondendo às perguntas mais comuns. Seja breve, claro e sempre honesto.",
    "next": "Próxima pergunta",
    "previous": "Anterior",
    "markPracticed": "Marcar como praticada"
  },
  "disclaimer": "Este site não é oficial nem representa o governo dos EUA ou do Brasil. As informações são para orientação geral e não substituem aconselhamento jurídico.",
  "footer": {
    "notOfficial": "Site não oficial — apenas orientação.",
    "sourceCode": "Código-fonte"
  }
}
```

- [ ] **Step 6: Wrap Next config with next-intl plugin (`next.config.mjs`)**

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Create `src/app/[locale]/layout.tsx`**

```tsx
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Remove the root-level `html`/`body` from `src/app/layout.tsx`**

Replace the whole file with:

```tsx
import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

- [ ] **Step 9: Create minimal `src/app/[locale]/page.tsx`**

```tsx
import { useTranslations } from 'next-intl';

export default function HomePlaceholder() {
  const t = useTranslations('home');
  return <main className="p-8"><h1>{t('heading')}</h1></main>;
}
```

- [ ] **Step 10: Delete the non-locale placeholder page**

```bash
rm /Users/dynaum/dev/us-visa/src/app/page.tsx
```

- [ ] **Step 11: Verify locale routing**

Run: `pnpm build`
Expected: builds, produces `/pt-BR` route.

Run: `pnpm dev` in background; visit `http://localhost:3000/` → redirects to `/pt-BR`, heading renders. Stop dev server.

- [ ] **Step 12: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(i18n): configure next-intl with pt-BR as default locale"
```

---

## Task 4: Stages source of truth

**Files:**
- Create: `src/lib/stages.ts`
- Create: `src/lib/stages.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/stages.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { STAGES, stageIds, getStageIndex, getStageBySlug } from './stages';

describe('stages', () => {
  it('has exactly 5 stages in the expected order', () => {
    expect(stageIds).toEqual(['mrv-fee', 'ds-160', 'scheduling', 'documents', 'interview']);
  });

  it('every stage has a unique slug equal to its id', () => {
    const slugs = STAGES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(STAGES.length);
    for (const s of STAGES) expect(s.slug).toBe(s.id);
  });

  it('getStageIndex returns zero-based position', () => {
    expect(getStageIndex('mrv-fee')).toBe(0);
    expect(getStageIndex('interview')).toBe(4);
  });

  it('getStageBySlug returns the stage or undefined', () => {
    expect(getStageBySlug('ds-160')?.id).toBe('ds-160');
    expect(getStageBySlug('nope')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `pnpm test -- stages`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/stages.ts`**

```ts
export const STAGE_IDS = ['mrv-fee', 'ds-160', 'scheduling', 'documents', 'interview'] as const;
export type StageId = (typeof STAGE_IDS)[number];

export type Stage = {
  id: StageId;
  slug: StageId;
  order: number;
};

export const STAGES: readonly Stage[] = STAGE_IDS.map((id, i) => ({
  id,
  slug: id,
  order: i,
}));

export const stageIds = STAGES.map((s) => s.id);

export function getStageIndex(id: StageId): number {
  return STAGES.findIndex((s) => s.id === id);
}

export function getStageBySlug(slug: string): Stage | undefined {
  return STAGES.find((s) => s.slug === slug);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- stages`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(stages): add typed stage metadata as single source of truth"
```

---

## Task 5: Progress lib (localStorage + Zod)

**Files:**
- Create: `src/lib/progress.ts`
- Create: `src/lib/progress.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/progress.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  readChecklist,
  writeChecklist,
  readInterview,
  writeInterview,
  toggleChecklistItem,
  togglePracticed,
} from './progress';

beforeEach(() => {
  localStorage.clear();
});

describe('checklist state', () => {
  it('returns empty object when nothing is stored', () => {
    expect(readChecklist()).toEqual({});
  });

  it('roundtrips a written value', () => {
    writeChecklist({ passport: true, photo: false });
    expect(readChecklist()).toEqual({ passport: true, photo: false });
  });

  it('resets state when storage is corrupt', () => {
    localStorage.setItem('us-visa.checklist.v1', 'not-json');
    expect(readChecklist()).toEqual({});
  });

  it('resets state when stored JSON fails schema validation', () => {
    localStorage.setItem('us-visa.checklist.v1', JSON.stringify({ passport: 'yes' }));
    expect(readChecklist()).toEqual({});
  });

  it('toggleChecklistItem flips a single key and persists', () => {
    toggleChecklistItem('passport');
    expect(readChecklist()).toEqual({ passport: true });
    toggleChecklistItem('passport');
    expect(readChecklist()).toEqual({ passport: false });
  });
});

describe('interview state', () => {
  it('returns empty set of practiced ids when nothing stored', () => {
    expect(readInterview()).toEqual({ practiced: [] });
  });

  it('roundtrips a written value', () => {
    writeInterview({ practiced: ['q1', 'q2'] });
    expect(readInterview()).toEqual({ practiced: ['q1', 'q2'] });
  });

  it('togglePracticed adds then removes an id', () => {
    togglePracticed('q1');
    expect(readInterview().practiced).toEqual(['q1']);
    togglePracticed('q1');
    expect(readInterview().practiced).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `pnpm test -- progress`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/progress.ts`**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- progress`
Expected: PASS, 9 tests.

- [ ] **Step 5: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(progress): add Zod-validated localStorage progress module"
```

---

## Task 6: Shared layout chrome (header, footer, disclaimer, locale switcher)

**Files:**
- Create: `src/components/header.tsx`
- Create: `src/components/footer.tsx`
- Create: `src/components/disclaimer.tsx`
- Create: `src/components/locale-switcher.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create `src/components/disclaimer.tsx`**

```tsx
import { useTranslations } from 'next-intl';

export function Disclaimer() {
  const t = useTranslations();
  return (
    <aside
      role="note"
      className="border-l-4 border-yellow-500 bg-yellow-50 p-3 text-sm text-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200"
    >
      {t('disclaimer')}
    </aside>
  );
}
```

- [ ] **Step 2: Create `src/components/locale-switcher.tsx`**

```tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  if (routing.locales.length < 2) return null;

  return (
    <select
      aria-label="Locale"
      value={locale}
      onChange={(e) => {
        const next = e.target.value;
        const stripped = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
        router.push(`/${next}${stripped === '/' ? '' : stripped}`);
      }}
      className="rounded border px-2 py-1 text-sm"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>{l}</option>
      ))}
    </select>
  );
}
```

- [ ] **Step 3: Create `src/components/header.tsx`**

```tsx
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const base = `/${locale}`;

  const links = [
    { href: `${base}`, label: t('home') },
    { href: `${base}/guide`, label: t('guide') },
    { href: `${base}/tools/checklist`, label: t('checklist') },
    { href: `${base}/tools/interview-simulator`, label: t('simulator') },
  ];

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href={base} className="font-semibold">US Visa Guide</Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline">{l.label}</Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create `src/components/footer.tsx`**

```tsx
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm text-neutral-600 dark:text-neutral-400">
        <span>{t('notOfficial')}</span>
        <a href="https://github.com/dynaum/us-visa" className="hover:underline">
          {t('sourceCode')}
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Update `src/app/[locale]/layout.tsx` to include chrome**

Replace the body portion with:

```tsx
<body className="min-h-screen flex flex-col">
  <NextIntlClientProvider locale={locale} messages={messages}>
    <Header />
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
      <Disclaimer />
      <div className="mt-6">{children}</div>
    </div>
    <Footer />
  </NextIntlClientProvider>
</body>
```

Add the three imports at the top:

```tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Disclaimer } from '@/components/disclaimer';
```

- [ ] **Step 6: Build**

Run: `pnpm build`
Expected: builds cleanly.

- [ ] **Step 7: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(layout): add shared header, footer, disclaimer, locale switcher"
```

---

## Task 7: Home + Guide overview + Stepper component

**Files:**
- Create: `src/components/stepper.tsx`
- Create: `src/components/stepper.test.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/guide/page.tsx`

- [ ] **Step 1: Write a failing component test for Stepper**

`src/components/stepper.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Stepper } from './stepper';
import messages from '../../messages/pt-BR.json';

function wrap(ui: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="pt-BR" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('Stepper', () => {
  it('marks the active stage with aria-current=step', () => {
    render(wrap(<Stepper activeStageId="ds-160" />));
    const active = screen.getByRole('link', { current: 'step' });
    expect(active).toHaveTextContent(/DS-160/i);
  });

  it('renders a link for every stage', () => {
    render(wrap(<Stepper activeStageId="mrv-fee" />));
    expect(screen.getAllByRole('link')).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

Run: `pnpm test -- stepper`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/components/stepper.tsx`**

```tsx
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { STAGES, type StageId } from '@/lib/stages';

export function Stepper({ activeStageId }: { activeStageId?: StageId }) {
  const locale = useLocale();
  const t = useTranslations('stages');

  return (
    <ol className="flex flex-wrap gap-2" aria-label="Etapas">
      {STAGES.map((stage, idx) => {
        const isActive = stage.id === activeStageId;
        return (
          <li key={stage.id} className="flex-1 min-w-[140px]">
            <Link
              href={`/${locale}/stages/${stage.slug}`}
              aria-current={isActive ? 'step' : undefined}
              className={[
                'block rounded border px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900',
                isActive ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40' : 'border-neutral-300',
              ].join(' ')}
            >
              <span className="block text-xs text-neutral-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="font-medium">{t(`${stage.id}.title`)}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- stepper`
Expected: PASS, 2 tests.

- [ ] **Step 5: Replace `src/app/[locale]/page.tsx` with the real home**

```tsx
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('home');
  const base = `/${locale}`;

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">{t('heading')}</h1>
      <p className="text-lg text-neutral-700 dark:text-neutral-300">{t('subheading')}</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`${base}/guide`}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {t('ctaStart')}
        </Link>
        <Link
          href={`${base}/tools/checklist`}
          className="rounded border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          {t('ctaChecklist')}
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Create `src/app/[locale]/guide/page.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import { Stepper } from '@/components/stepper';
import { STAGES } from '@/lib/stages';

export default function GuidePage() {
  const t = useTranslations();
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">{t('guide.heading')}</h1>
      <p>{t('guide.intro')}</p>
      <Stepper />
      <ul className="space-y-3">
        {STAGES.map((s) => (
          <li key={s.id} className="rounded border p-4">
            <h2 className="font-semibold">{t(`stages.${s.id}.title`)}</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t(`stages.${s.id}.summary`)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- [ ] **Step 7: Build + run dev to eyeball**

Run: `pnpm build` → expected OK.

- [ ] **Step 8: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(guide): add home, guide overview, and stepper component"
```

---

## Task 8: Stage pages with MDX content

**Files:**
- Modify: `next.config.mjs` (add MDX)
- Create: `mdx-components.tsx` (root-level, required by @next/mdx)
- Create: `src/app/[locale]/stages/[slug]/page.tsx` (single dynamic route handling all 5 stages)
- Create: `src/content/pt-BR/stages/mrv-fee.mdx`
- Create: `src/content/pt-BR/stages/ds-160.mdx`
- Create: `src/content/pt-BR/stages/scheduling.mdx`
- Create: `src/content/pt-BR/stages/documents.mdx`
- Create: `src/content/pt-BR/stages/interview.mdx`

- [ ] **Step 1: Install MDX**

Run: `pnpm add @next/mdx @mdx-js/react @mdx-js/loader`

- [ ] **Step 2: Update `next.config.mjs`**

```js
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withNextIntl(withMDX(nextConfig));
```

- [ ] **Step 3: Create root-level `mdx-components.tsx`**

```tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-3xl font-bold mt-6 mb-3" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-6 mb-2" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
    p: (props) => <p className="my-3 leading-relaxed" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 my-3 space-y-1" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-3 space-y-1" {...props} />,
    a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
    ...components,
  };
}
```

- [ ] **Step 4: Create the dynamic stage route `src/app/[locale]/stages/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { STAGES, getStageBySlug, type StageId } from '@/lib/stages';
import { Stepper } from '@/components/stepper';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    STAGES.map((s) => ({ locale, slug: s.slug })),
  );
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) notFound();

  const t = await getTranslations({ locale, namespace: 'stages' });

  let Content: React.ComponentType;
  try {
    Content = (await import(`@/content/${locale}/stages/${stage.id}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <main className="space-y-6">
      <Stepper activeStageId={stage.id as StageId} />
      <header>
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Etapa {stage.order + 1} de {STAGES.length}
        </p>
        <h1 className="text-3xl font-bold">{t(`${stage.id}.title`)}</h1>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          {t(`${stage.id}.summary`)}
        </p>
      </header>
      <article className="prose max-w-none dark:prose-invert">
        <Content />
      </article>
    </main>
  );
}
```

- [ ] **Step 5: Create `src/content/pt-BR/stages/mrv-fee.mdx`**

```mdx
## O que é a taxa MRV

A MRV é a **taxa consular** cobrada pelo governo americano para processar o seu pedido
de visto. Para o visto de turismo (B1/B2), o valor é de **US$ 185** (convertido para
reais na hora do pagamento). Ela deve ser paga **antes** de agendar a entrevista, e o
pagamento não é reembolsável.

## Como pagar

1. Acesse o portal **ais.usvisa-info.com** e crie uma conta (ou entre na existente).
2. Em "Pagar a taxa", escolha **Boleto Bancário (Banco do Brasil)**.
3. Imprima ou salve o comprovante em PDF — ele contém um **número CGI** (começa com `BR`).
4. Pague o boleto no Banco do Brasil (internet banking, app ou caixa).
5. Aguarde a compensação: em dias úteis, pode levar de **1 a 2 dias**.

## O que guardar

- O número **CGI** (vai pedir no agendamento)
- O comprovante de pagamento (PDF ou impresso)
- O e-mail de confirmação do portal

> **Atenção:** a taxa tem validade de **1 ano** a partir do pagamento. Se você não
> agendar a entrevista nesse período, o valor é perdido.
```

- [ ] **Step 6: Create `src/content/pt-BR/stages/ds-160.mdx`**

```mdx
## O que é o DS-160

É o **formulário online** oficial do Departamento de Estado. Ele reúne todos os seus
dados pessoais, de viagem, trabalho, família e histórico. **Tudo o que o cônsul vai
ver sobre você, sai daqui.** Preencha com calma e sempre com a verdade.

## Antes de começar, separe

- **Passaporte** válido (por mais 6 meses além da viagem)
- Endereço e CEP residencial
- Endereços e datas dos últimos empregos e estudos
- Itinerário aproximado da viagem (datas, cidades, onde vai ficar)
- Histórico de viagens internacionais dos últimos 5 anos
- Informações dos pais (nome, data de nascimento)

## Passo a passo

1. Acesse **ceac.state.gov/genniv** e escolha o consulado onde fará a entrevista.
2. Anote o **Application ID** na primeira tela — você pode parar e voltar depois.
3. Preencha todas as seções. Campos de endereço devem estar em **alfabeto ocidental**.
4. Faça upload da **foto 5×5 cm** no padrão americano (fundo branco, rosto centralizado).
5. Revise tudo na tela final, **assine eletronicamente** e envie.
6. Imprima a **página de confirmação com código de barras** — ela é obrigatória na entrevista.

## Erros comuns

- Digitar nomes com acento ou ç (use só letras sem acento)
- Esquecer de marcar todos os países visitados nos últimos 5 anos
- Foto fora do padrão (óculos, sombra, tamanho errado)
- Não salvar o Application ID e perder tudo por expiração (20 min sem atividade)
```

- [ ] **Step 7: Create `src/content/pt-BR/stages/scheduling.mdx`**

```mdx
## Os dois agendamentos

Depois de pagar a MRV e terminar o DS-160, você agenda **dois compromissos**:

1. **CASV** (Centro de Atendimento ao Solicitante de Visto): onde tiram **foto e
   biometria**. Dura cerca de 15 minutos.
2. **Consulado/Embaixada**: a **entrevista consular** com o oficial americano.

## Como agendar

1. Entre em **ais.usvisa-info.com** com a mesma conta da taxa MRV.
2. Confirme o **número CGI** do pagamento.
3. Informe os dados do DS-160 (número da confirmação).
4. Escolha o **posto consular** (São Paulo, Rio, Brasília, Recife ou Porto Alegre).
5. Escolha primeiro a **data do CASV** e, em seguida, a **data da entrevista**.
   A entrevista é **sempre depois** do CASV.

## O que levar ao CASV

- Passaporte válido
- Página de confirmação do DS-160
- Foto 5×5 cm impressa
- Comprovante do agendamento

## Remarcar

Você pode remarcar **limitadas vezes** pelo mesmo portal. Abusar disso pode
derrubar o seu agendamento — remarque só se necessário.
```

- [ ] **Step 8: Create `src/content/pt-BR/stages/documents.mdx`**

```mdx
## O que levar no dia da entrevista

O consulado exige um conjunto mínimo de documentos. **Outros documentos de apoio**
ajudam a demonstrar seus vínculos com o Brasil, e podem ser pedidos (ou não) pelo
oficial.

Use o **checklist interativo** em *Ferramentas → Checklist* para marcar cada item
conforme for preparando.

## Obrigatórios

- Passaporte válido (e passaportes antigos, se tiver)
- Página de confirmação do DS-160 (com código de barras)
- Comprovante da taxa MRV
- Carta de agendamento da entrevista
- Foto 5×5 cm (o CASV também tira, mas leve a impressa por garantia)

## De apoio (vínculos com o Brasil)

- Comprovante de renda (holerites, IR, extratos)
- Comprovante de residência recente
- Carteira de trabalho, contrato social ou declaração do empregador
- Matrícula escolar/universitária (se for o caso)
- Certidão de casamento, nascimento de filhos
- Comprovantes da viagem (reservas de hotel, passagens)

> **Dica:** organize em **uma pasta física**, em ordem, do mais pedido ao menos
> pedido. Pode ser que o cônsul não peça nada — mas se pedir, você não quer ficar
> folheando papel.
```

- [ ] **Step 9: Create `src/content/pt-BR/stages/interview.mdx`**

```mdx
## O que esperar

A entrevista acontece em pé, numa guichê, em inglês ou português (você escolhe).
Dura tipicamente **1 a 3 minutos**. O oficial já leu seu DS-160 antes de te
chamar — ele quer **ouvir de você**, não ler tudo de novo.

O que ele realmente está avaliando é:

- Você vai voltar ao Brasil depois da viagem? (**vínculos**)
- O que você vai fazer nos EUA faz sentido? (**propósito**)
- Você tem como pagar? (**capacidade**)

## Perguntas comuns

- Qual o objetivo da sua viagem?
- Para onde você vai / quantos dias?
- Com quem você vai? / Alguém paga por você?
- Onde você trabalha? / Há quanto tempo?
- Você tem família, casa, filhos no Brasil?
- Já visitou os EUA antes? / Outros países?
- Você tem parentes nos EUA?

Use o **Simulador de entrevista** para praticar cada uma delas.

## Dicas

- Responda **curto e direto**. Não dê explicação que não foi pedida.
- **Sempre diga a verdade.** Mesmo que a verdade seja desconfortável.
- Olhe para o oficial, sorria naturalmente, cumprimente.
- Vista-se de forma simples e arrumada — nada de extravagante.
- Tenha seus documentos em mãos, mas só mostre se ele pedir.

## Resultados

- **Aprovado**: o oficial fica com seu passaporte; você recebe em casa via Sedex.
- **221(g) / administrativa**: o processo fica em análise; pode pedir mais documentos.
- **Negado (214(b))**: recusa por falta de comprovação de vínculos. Você pode
  reaplicar, mas precisa ter algo novo a apresentar.
```

- [ ] **Step 10: Build and eyeball**

Run: `pnpm build`
Expected: builds, 5 stage routes generated under `/pt-BR/stages/*`.

- [ ] **Step 11: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(stages): add 5 stage pages with MDX content in pt-BR"
```

---

## Task 9: Checklist component + tool page

**Files:**
- Create: `src/content/pt-BR/checklist-items.ts`
- Create: `src/components/checklist.tsx`
- Create: `src/components/checklist.test.tsx`
- Create: `src/app/[locale]/tools/checklist/page.tsx`

- [ ] **Step 1: Create checklist data `src/content/pt-BR/checklist-items.ts`**

```ts
export type ChecklistGroup = {
  id: string;
  title: string;
  items: { id: string; label: string }[];
};

export const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    id: 'required',
    title: 'Documentos obrigatórios',
    items: [
      { id: 'passport', label: 'Passaporte válido (mínimo 6 meses além da viagem)' },
      { id: 'old-passports', label: 'Passaportes antigos (se houver)' },
      { id: 'ds160-confirmation', label: 'Página de confirmação do DS-160 com código de barras' },
      { id: 'mrv-receipt', label: 'Comprovante da taxa MRV' },
      { id: 'appointment-letter', label: 'Carta de agendamento da entrevista' },
      { id: 'photo', label: 'Foto 5×5 cm impressa' },
    ],
  },
  {
    id: 'ties',
    title: 'Vínculos com o Brasil',
    items: [
      { id: 'income', label: 'Comprovante de renda (holerites, IR, extratos)' },
      { id: 'residence', label: 'Comprovante de residência recente' },
      { id: 'employment', label: 'Carteira de trabalho, contrato social ou declaração do empregador' },
      { id: 'education', label: 'Matrícula escolar ou universitária (se aplicável)' },
      { id: 'family', label: 'Certidões: casamento, nascimento de filhos' },
    ],
  },
  {
    id: 'trip',
    title: 'Sobre a viagem',
    items: [
      { id: 'itinerary', label: 'Itinerário com datas e cidades' },
      { id: 'hotels', label: 'Reservas de hotel ou comprovante de hospedagem' },
      { id: 'flights', label: 'Passagens ou reservas de voo' },
      { id: 'funds', label: 'Prova de como a viagem será paga' },
    ],
  },
];
```

- [ ] **Step 2: Write a failing test for Checklist**

`src/components/checklist.test.tsx`:

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checklist } from './checklist';
import { CHECKLIST_GROUPS } from '../content/pt-BR/checklist-items';

beforeEach(() => localStorage.clear());

describe('Checklist', () => {
  it('renders every item from every group', () => {
    render(<Checklist groups={CHECKLIST_GROUPS} />);
    const totalItems = CHECKLIST_GROUPS.reduce((sum, g) => sum + g.items.length, 0);
    expect(screen.getAllByRole('checkbox')).toHaveLength(totalItems);
  });

  it('persists toggled items across unmount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Checklist groups={CHECKLIST_GROUPS} />);
    const box = screen.getByLabelText(/Passaporte válido/i) as HTMLInputElement;
    await user.click(box);
    expect(box.checked).toBe(true);

    unmount();
    render(<Checklist groups={CHECKLIST_GROUPS} />);
    const after = screen.getByLabelText(/Passaporte válido/i) as HTMLInputElement;
    expect(after.checked).toBe(true);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test -- checklist`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `src/components/checklist.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { readChecklist, toggleChecklistItem, type ChecklistState } from '@/lib/progress';
import type { ChecklistGroup } from '@/content/pt-BR/checklist-items';

export function Checklist({ groups }: { groups: ChecklistGroup[] }) {
  const [state, setState] = useState<ChecklistState>({});

  useEffect(() => {
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
                  <label htmlFor={`cb-${item.id}`} className={checked ? 'line-through text-neutral-500' : ''}>
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test -- checklist`
Expected: PASS, 2 tests.

- [ ] **Step 6: Create `src/app/[locale]/tools/checklist/page.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import { Checklist } from '@/components/checklist';
import { CHECKLIST_GROUPS } from '@/content/pt-BR/checklist-items';

export default function ChecklistPage() {
  const t = useTranslations('checklist');
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">{t('heading')}</h1>
      <p>{t('intro')}</p>
      <Checklist groups={CHECKLIST_GROUPS} />
      <p className="text-sm text-neutral-500">{t('printHint')}</p>
    </main>
  );
}
```

Note: v1 only supports pt-BR content, so importing `CHECKLIST_GROUPS` directly is fine. When adding a second locale, refactor to load per-locale data (same pattern as MDX imports in Task 8).

- [ ] **Step 7: Build**

Run: `pnpm build`
Expected: OK.

- [ ] **Step 8: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(checklist): add persistent document checklist tool"
```

---

## Task 10: Interview Simulator component + tool page

**Files:**
- Create: `src/content/pt-BR/interview-questions.ts`
- Create: `src/components/interview-simulator.tsx`
- Create: `src/components/interview-simulator.test.tsx`
- Create: `src/app/[locale]/tools/interview-simulator/page.tsx`

- [ ] **Step 1: Create question bank `src/content/pt-BR/interview-questions.ts`**

```ts
export type InterviewQuestion = {
  id: string;
  en: string;
  pt: string;
  guidance: string;
};

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'purpose',
    en: 'What is the purpose of your trip?',
    pt: 'Qual o objetivo da sua viagem?',
    guidance: 'Uma frase direta: turismo, visita a parentes, conhecer Disney, etc. Nada de discurso longo.',
  },
  {
    id: 'destination',
    en: 'Where will you go and for how long?',
    pt: 'Para onde você vai e por quantos dias?',
    guidance: 'Cite as cidades principais e a duração. Se ainda não tem tudo fechado, diga o plano geral.',
  },
  {
    id: 'who-pays',
    en: 'Who is paying for the trip?',
    pt: 'Quem está pagando a viagem?',
    guidance: 'Diga a verdade — você, um familiar, a empresa. Se for alguém, diga quem e a relação.',
  },
  {
    id: 'work',
    en: 'Where do you work and for how long?',
    pt: 'Onde você trabalha e há quanto tempo?',
    guidance: 'Nome da empresa, cargo e tempo. Se for autônomo ou tem empresa própria, diga isso claramente.',
  },
  {
    id: 'ties',
    en: 'Do you have family, a home, or ties in Brazil?',
    pt: 'Você tem família, casa, vínculos no Brasil?',
    guidance: 'Mencione o que for verdade: cônjuge, filhos, pais dependentes, imóvel, trabalho estável.',
  },
  {
    id: 'prior-travel',
    en: 'Have you been to the US or other countries before?',
    pt: 'Já viajou para os EUA ou outros países?',
    guidance: 'Liste os principais. Se for primeira vez internacional, diga tranquilamente.',
  },
  {
    id: 'us-family',
    en: 'Do you have relatives in the US?',
    pt: 'Você tem parentes nos EUA?',
    guidance: 'Diga a verdade. Ter parente lá não é problema; esconder é.',
  },
];
```

- [ ] **Step 2: Write a failing test**

`src/components/interview-simulator.test.tsx`:

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { InterviewSimulator } from './interview-simulator';
import { INTERVIEW_QUESTIONS } from '../content/pt-BR/interview-questions';
import messages from '../../messages/pt-BR.json';

beforeEach(() => localStorage.clear());

function wrap(ui: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="pt-BR" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('InterviewSimulator', () => {
  it('starts with the first question', () => {
    render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    expect(screen.getByText(INTERVIEW_QUESTIONS[0].pt)).toBeInTheDocument();
  });

  it('advances to the next question', async () => {
    const user = userEvent.setup();
    render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    await user.click(screen.getByRole('button', { name: /Próxima/i }));
    expect(screen.getByText(INTERVIEW_QUESTIONS[1].pt)).toBeInTheDocument();
  });

  it('persists practiced state across unmount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    await user.click(screen.getByRole('checkbox', { name: /Marcar como praticada/i }));

    unmount();
    render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    const box = screen.getByRole('checkbox', { name: /Marcar como praticada/i }) as HTMLInputElement;
    expect(box.checked).toBe(true);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `pnpm test -- interview-simulator`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `src/components/interview-simulator.tsx`**

```tsx
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test -- interview-simulator`
Expected: PASS, 3 tests.

- [ ] **Step 6: Create `src/app/[locale]/tools/interview-simulator/page.tsx`**

```tsx
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
```

- [ ] **Step 7: Build**

Run: `pnpm build`
Expected: OK.

- [ ] **Step 8: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "feat(simulator): add interview practice simulator tool"
```

---

## Task 11: Playwright happy path + README

**Files:**
- Create: `tests/e2e/happy-path.spec.ts`
- Create: `README.md`

- [ ] **Step 1: Install Playwright browsers**

Run: `pnpm exec playwright install chromium`

- [ ] **Step 2: Create `tests/e2e/happy-path.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('home → stage → checklist persistence', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/pt-BR$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('visto americano');

  await page.getByRole('link', { name: /Passo a passo/i }).first().click();
  await expect(page).toHaveURL(/\/pt-BR\/guide$/);

  await page.getByRole('link', { name: /DS-160/i }).first().click();
  await expect(page).toHaveURL(/\/pt-BR\/stages\/ds-160$/);

  await page.getByRole('link', { name: /Checklist/i }).first().click();
  await expect(page).toHaveURL(/\/pt-BR\/tools\/checklist$/);

  const passport = page.getByLabel(/Passaporte válido/i);
  await passport.check();
  await expect(passport).toBeChecked();

  await page.reload();
  await expect(page.getByLabel(/Passaporte válido/i)).toBeChecked();
});
```

- [ ] **Step 3: Run e2e**

Run: `pnpm test:e2e`
Expected: 1 passed.

- [ ] **Step 4: Create `README.md`**

```markdown
# US Visa Guide

Guia passo a passo para o visto americano de turismo (B1/B2), voltado para quem vai aplicar pela primeira vez no Brasil.

> Este site **não é oficial** e não substitui aconselhamento jurídico.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- next-intl (i18n, pt-BR default)
- MDX para o conteúdo longo das etapas
- Zod + `localStorage` para progresso local
- Vitest + Testing Library, Playwright

## Scripts

```bash
pnpm install

pnpm dev         # dev server
pnpm build       # production build
pnpm start       # run the built app

pnpm test        # vitest run
pnpm test:watch  # vitest watch
pnpm test:e2e    # playwright (builds first, then runs)
pnpm typecheck   # tsc --noEmit
pnpm lint        # next lint
```

## Adding a new locale

1. Add the locale code to `routing.locales` in `src/i18n/routing.ts`.
2. Create `messages/<locale>.json` (copy `messages/pt-BR.json` and translate).
3. Create `src/content/<locale>/` mirroring `src/content/pt-BR/` (MDX + data files).
4. Done — every route generates for every locale via `generateStaticParams`.

## Project layout

- `src/app/[locale]/` — locale-segmented routes
- `src/components/` — shared UI
- `src/content/<locale>/` — MDX stage content + typed data
- `src/lib/` — `stages.ts` (source of truth), `progress.ts` (localStorage + Zod)
- `messages/` — UI string catalogs per locale
- `docs/superpowers/` — design spec + implementation plan
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/dynaum/dev/us-visa add -A
git -C /Users/dynaum/dev/us-visa commit -m "test(e2e): add happy-path coverage; docs: add README"
```

- [ ] **Step 6: Push**

```bash
git -C /Users/dynaum/dev/us-visa push
```

---

## Self-review notes

- Spec coverage: all 5 stages, checklist, simulator, i18n structure, progress lib, tests (unit + e2e), disclaimer, deployment-ready build — all mapped to tasks.
- Type consistency: `StageId`, `ChecklistState`, `InterviewState`, `ChecklistGroup`, `InterviewQuestion` names are stable across tasks.
- No placeholders: every code block is complete; MDX content is real; tests are concrete.
- File paths: all absolute (`/Users/dynaum/dev/us-visa/...`) or project-relative.
- Commit cadence: one commit per task, 11 commits total; pushes at the end.
