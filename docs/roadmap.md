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

## Phase 3 — Portfolio sections

Features: `about`, `projects`, `experience`, `skills`, `contact`.

### shadcn allowlist (Phase 3)

| Component | Use |
|-----------|-----|
| `sheet` | Mobile nav |
| `tabs` | Project filters |
| `dialog` | Quick-view / contact modal |
| `input`, `label`, `textarea` | Contact form |
| `badge` | Tech tags on cards |
| `separator` | Dense section dividers |

Project cards remain **bespoke** in `features/projects/`.

## Phase 4 — Hybrid 3D

- Lazy R3F in `features/scene3d/`
- No shadcn inside WebGL layer

## Phase 5 — Polish and ship

- SEO meta, Lighthouse, deploy target TBD
- Expand Playwright coverage as sections are added (Phase 3+)
