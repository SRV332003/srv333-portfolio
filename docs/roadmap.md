# Roadmap

## Phase 1 — Scaffold (current)

- Vite + React + TS + Tailwind v4 + shadcn button
- Content schema, hero shell, agent docs/rules/skills
- **Done when**: `npm run build` passes, cosmic hero visible

## Phase 2 — 2D interactivity

- `src/features/canvas/` — starfield, parallax
- Reduced-motion static fallback
- Optional shadcn `tooltip` for hotspots

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
- Optional Playwright smoke tests
