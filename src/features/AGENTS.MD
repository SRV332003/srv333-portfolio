# src/features/

## Purpose

Portfolio sections and pages. Each subfolder is a feature module.

## Current modules

| Folder | Role |
|--------|------|
| `home/` | `HomePage` composes shell + all sections |
| `shell/` | Layout, Header (desktop + mobile sheet), Footer |
| `hero/` | Hero section + lazy planet accent ([AGENTS.MD](hero/AGENTS.MD)) |
| `scene3d/` | R3F WebGL scenes ([AGENTS.MD](scene3d/AGENTS.MD)) |
| `about/` | About section ([AGENTS.MD](about/AGENTS.MD)) |
| `projects/` | Grid, tabs, detail pages ([AGENTS.MD](projects/AGENTS.MD)) |
| `experience/` | Experience timeline ([AGENTS.MD](experience/AGENTS.MD)) |
| `skills/` | Skills badges ([AGENTS.MD](skills/AGENTS.MD)) |
| `contact/` | Mailto form ([AGENTS.MD](contact/AGENTS.MD)) |
| `canvas/` | 2D starfield background ([AGENTS.MD](canvas/AGENTS.MD)) |

## Adding a section

Use `.cursor/skills/add-portfolio-section/`.

## Constraints

- **No** cross-feature imports (except `ProjectDetailPage` → shell `Layout`).
- **No** `@radix-ui/*` or `@base-ui/*` — use `@/components/ui/*`.
- Export public API via `index.ts`.
- Copy from `loadPortfolio()` only.

## Phase 3 reference

[ADR 0008](../../docs/decisions/0008-portfolio-sections-routing.md), [ADR 0009](../../docs/decisions/0009-experience-content-presentation.md) (experience)
