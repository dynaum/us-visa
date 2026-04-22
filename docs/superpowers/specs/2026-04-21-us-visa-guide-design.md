# US Tourist Visa Guide — Design

**Date:** 2026-04-21
**Status:** Approved for implementation
**Audience:** First-time B1/B2 visa applicants in Brazil

## Goal

A web app that walks a first-time applicant through the entire US tourist (B1/B2) visa process from Brazil, end to end, in plain Portuguese (pt-BR), with the codebase ready for i18n to other locales.

The app is informational and organizational — it does NOT process payments, file the DS-160, or book appointments. It explains each step, helps the user track what's done, and prepares them for the interview.

## Non-goals (v1)

- User accounts, authentication, or any backend
- Payments of any kind
- Direct integration with DS-160, CEAC, CGI (MRV fee), or CASV
- PDF document generation
- Legal advice (explicit disclaimer included)
- Locales beyond pt-BR (structure ready, but only pt-BR content ships)

## Users

**Primary persona:** A Brazilian adult, never applied for a US visa, intimidated by the process, who needs:
- Clarity on the end-to-end flow and its order
- A concrete document checklist
- Guidance for the consular interview (typical questions, what to bring, do's and don'ts)
- Something to bookmark and come back to over several weeks

## User journey

1. Lands on home → sees "Start here" and a summary of the 5 stages.
2. Opens the step-by-step guide → sees a stepper with progress.
3. Reads each stage in order, ticking off sub-tasks; progress persists via localStorage.
4. Uses the document checklist tool to prepare physical/digital docs.
5. Uses the interview simulator to rehearse.
6. On interview day, reopens the checklist as a last check.

## Content: the 5 stages

1. **MRV fee** — what it is, current value (as content, not scraped), how to pay via BB, the payment slip (GRU-like), what to save for later.
2. **DS-160 form** — what to prepare before starting, section-by-section tips, common pitfalls, how to save the confirmation page with the barcode.
3. **Scheduling (CASV + consular)** — account on the CGI portal, choosing posts, the two appointments, what to bring to CASV (photo + biometrics), rescheduling rules.
4. **Documents** — interactive checklist: passport, DS-160 confirmation, MRV receipt, appointment letter, photo, supporting documents (proof of ties to Brazil, financial, itinerary). Print-friendly.
5. **Interview** — what to expect at the consulate, typical questions (in EN + pt-BR), what "demonstrating ties to Brazil" means, dress/behavior guidance, outcome types (approved / 221(g) / denied).

All stage content is static Markdown/MDX in `src/content/`. No CMS in v1.

## Tech stack

- **Next.js 15 (App Router) + TypeScript** — SSG per locale, easy static deploy.
- **Tailwind CSS v4** — utility-first styling.
- **next-intl** — i18n, locale-segmented routes (`/[locale]/...`), message catalogs in `messages/<locale>.json`.
- **MDX** (`@next/mdx`) — long-form step content, co-located per locale.
- **Zod** — lightweight runtime validation for checklist state shape.
- **Vitest + Testing Library** — unit/component tests.
- **Playwright** — one happy-path e2e test (home → step → checklist persists).
- **ESLint + Prettier** — standard config.

No database. All state is either static content or `localStorage`.

## Architecture

### Directory layout

```
us-visa/
├── docs/superpowers/specs/          # this spec + future plans
├── messages/
│   └── pt-BR.json                   # UI strings (labels, buttons, nav)
├── public/                          # static assets, favicon
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # locale provider, header/footer
│   │   │   ├── page.tsx             # landing
│   │   │   ├── guide/               # step-by-step overview
│   │   │   │   └── page.tsx
│   │   │   ├── stages/
│   │   │   │   ├── mrv-fee/page.tsx
│   │   │   │   ├── ds-160/page.tsx
│   │   │   │   ├── scheduling/page.tsx
│   │   │   │   ├── documents/page.tsx
│   │   │   │   └── interview/page.tsx
│   │   │   └── tools/
│   │   │       ├── checklist/page.tsx
│   │   │       └── interview-simulator/page.tsx
│   │   ├── layout.tsx               # html/body, root-level meta
│   │   └── globals.css
│   ├── components/
│   │   ├── stepper.tsx              # progress across stages
│   │   ├── checklist.tsx            # interactive, persistent list
│   │   ├── locale-switcher.tsx
│   │   ├── disclaimer.tsx
│   │   ├── qa-card.tsx              # interview Q + guidance
│   │   └── interview-simulator.tsx
│   ├── content/
│   │   └── pt-BR/
│   │       ├── stages/
│   │       │   ├── mrv-fee.mdx
│   │       │   ├── ds-160.mdx
│   │       │   ├── scheduling.mdx
│   │       │   ├── documents.mdx
│   │       │   └── interview.mdx
│   │       ├── checklist-items.ts   # typed doc checklist data
│   │       └── interview-questions.ts # typed Q&A bank
│   ├── i18n/
│   │   ├── routing.ts               # locales, defaultLocale
│   │   └── request.ts               # next-intl server config
│   ├── lib/
│   │   ├── progress.ts              # localStorage read/write + Zod
│   │   └── stages.ts                # stage metadata (ids, order)
│   └── middleware.ts                # next-intl locale middleware
├── tests/
│   ├── unit/                        # Vitest
│   └── e2e/                         # Playwright
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Component boundaries

- **Stage pages** render MDX content + a local stepper slot. They don't know about storage.
- **`Stepper`** is a pure presentational component driven by `progress.ts` state passed in.
- **`Checklist`** owns its own `localStorage` key (`us-visa.checklist.v1`) via `progress.ts`. Exposes `onChange` for parent analytics if ever needed.
- **`InterviewSimulator`** is stateless over the question bank; tracks which cards have been "practiced" in `localStorage` (`us-visa.interview.v1`).
- **`progress.ts`** is the single module that touches `localStorage`. Everything else calls it. Zod-validated on read; corrupt state is reset.
- **`stages.ts`** is the single source of truth for stage ids, order, and URL slugs.

### i18n approach

- Routes are segmented by locale: `/pt-BR/...`. `defaultLocale = 'pt-BR'`. Root `/` redirects to the default.
- UI strings live in `messages/pt-BR.json`, keyed by namespace (`nav`, `home`, `stepper`, etc.).
- Long-form content lives in `src/content/<locale>/`. Adding a locale = adding a messages file + a content directory; no code changes.
- Dates/numbers via `next-intl`'s formatter helpers.

### Data flow

```
User action ──► Component
                   │
                   ├─ Reads static content (MDX/TS) at build time
                   └─ Calls progress.ts ◄─► localStorage (Zod-validated)
```

No network calls in v1.

## Error handling

- **Corrupt `localStorage`:** Zod parse fails → reset that key → render default state. Log to console in dev only.
- **Missing locale route:** middleware redirects to default.
- **Missing MDX content file:** build fails (intentional — we want this loud).
- **JS disabled:** stage content still renders (SSG); interactive checklist shows a "enable JS to track progress" note.

## Testing strategy

- **Unit (Vitest):** `progress.ts` (roundtrip, corrupt state, Zod rejection); `stages.ts` (order invariant); pure components.
- **Component (Testing Library):** `Checklist` (toggle + persistence via a mocked storage), `Stepper` (renders correct active stage).
- **E2E (Playwright):** one happy path — open home → click into a stage → tick a checklist item → reload → item still ticked.
- No snapshot tests.

## Accessibility

- Semantic HTML, headings in order, skip-to-content link.
- Checklist items are real `<input type="checkbox">` with labels.
- Color contrast ≥ WCAG AA.
- Focus states visible.

## Deployment

Static export or Vercel. No server runtime required. A `README.md` documents `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm test:e2e`.

## Open risks / notes

- Visa process details (fees, portals, wait times) change. Content is intentionally written so factual statements are easy to locate and update; a future "last reviewed" date per stage page is a lightweight win.
- The interview simulator must never suggest rehearsed/dishonest answers. Guidance text emphasizes clarity, brevity, and truthfulness.
- Legal disclaimer is present on every page footer.
