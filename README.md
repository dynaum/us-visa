# US Visa Guide

Guia passo a passo para o visto americano de turismo (B1/B2), voltado para quem vai aplicar pela primeira vez no Brasil.

> Este site **não é oficial** e não substitui aconselhamento jurídico.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- next-intl (i18n, `pt-BR` como locale padrão)
- MDX para o conteúdo longo das etapas
- Zod + `localStorage` para progresso local (sem backend)
- Vitest + Testing Library (unit/component), Playwright (e2e)

## Scripts

```bash
pnpm install

pnpm dev         # dev server
pnpm build       # production build
pnpm start       # run the built app

pnpm test        # vitest run
pnpm test:watch  # vitest watch
pnpm test:e2e    # playwright (builds, then runs)
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
```

## Adding a new locale

1. Add the locale code to `routing.locales` in `src/i18n/routing.ts`.
2. Create `messages/<locale>.json` (copie de `messages/pt-BR.json` e traduza).
3. Create `src/content/<locale>/` espelhando `src/content/pt-BR/` (MDX + typed data).
4. Pronto — todas as rotas geram para cada locale via `generateStaticParams`.

## Project layout

- `src/app/[locale]/` — rotas segmentadas por locale
- `src/components/` — UI compartilhada
- `src/content/<locale>/` — MDX das etapas + dados tipados (checklist, perguntas)
- `src/lib/stages.ts` — fonte única de verdade das etapas
- `src/lib/progress.ts` — leitura/escrita do `localStorage` validada com Zod
- `messages/` — catálogos de strings por locale
- `docs/superpowers/` — spec de design + plano de implementação

## Funcionalidades (v1)

- Página inicial com CTA para o passo a passo
- Visão geral das 5 etapas com stepper persistente
- 5 páginas de etapa com conteúdo em MDX
- Checklist interativo de documentos (persiste no navegador)
- Simulador de entrevista com as perguntas mais comuns
- Switcher de locale preparado (ativa automaticamente ao adicionar o segundo locale)
