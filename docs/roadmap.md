# Roadmap

## Phase 1 — Scaffold (complete)

- Vite + React + TS + Tailwind v4 + shadcn button
- Content schema, hero shell, agent docs/rules/skills

## Phase 2 — 2D interactivity (complete)

- `src/features/canvas/` — full-page starfield, pointer repulsion, scroll parallax
- `StarfieldBackground` in `shell/Layout.tsx`; lazy canvas + CSS fallback
- UX refinements: background-only horizontal parallax, shell glass chrome, drift tuning — [ADR 0007](decisions/0007-canvas-interaction-ux.md)
- [ADR 0006](decisions/0006-canvas-performance.md) — performance caps
- Playwright smoke tests (`e2e/home.spec.ts`, `npm run test:e2e`)
- **Done when**: build passes; stars + repulsion + reduced-motion fallback verified
- **Optional Phase 2b**: shadcn `tooltip` constellation hotspots

## Phase 3 — Portfolio sections (complete)

Features: `about`, `projects`, `experience`, `skills`, `contact`.

- Single-page home with anchor sections; `/projects/:slug` detail routes — [ADR 0008](decisions/0008-portfolio-sections-routing.md)
- Mobile sheet nav; mailto contact form (no backend)
- Playwright: `e2e/home.spec.ts`, `e2e/projects.spec.ts`

### shadcn allowlist (Phase 3)

| Component | Use |
|-----------|-----|
| `sheet` | Mobile nav |
| `tabs` | Project filters |
| `input`, `label`, `textarea` | Contact form |
| `badge` | Tech tags on cards |
| `separator` | Experience dividers |

Project cards remain **bespoke** in `features/projects/`. Detail route replaces dialog quick-view.

**Done when**: all sections visible; detail:nav works; detail routes; mobile sheet; mailto form; build + e2e pass.

## Phase 4 — Hybrid 3D

- Lazy R3F in `features/scene3d/`
- No shadcn inside WebGL layer

## Phase 5 — Polish and ship

- SEO meta, Lighthouse, deploy target TBD
- Expand Playwright coverage as sections are added (Phase 3+)
