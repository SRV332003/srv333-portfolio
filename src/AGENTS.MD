# src/

## Purpose

Application source root: app shell, features, content, shared UI, shadcn primitives, styles.

## Entry

- `main.tsx` — mounts `App`, imports `styles/globals.css`
- `app/App.tsx` — router + providers

## Child modules

- [app/AGENTS.MD](app/AGENTS.MD) — routing shell
- [content/AGENTS.MD](content/AGENTS.MD) — JSON + Zod
- [features/AGENTS.MD](features/AGENTS.MD) — portfolio sections
- [shared/AGENTS.MD](shared/AGENTS.MD) — marketing UI
- [components/AGENTS.MD](components/AGENTS.MD) — shadcn primitives

## Styles

- `styles/tokens.css` — space palette (source of truth)
- `styles/globals.css` — Tailwind + shadcn bridge

## Constraints

- Do not add business logic to `main.tsx`; use features or `lib/`.
