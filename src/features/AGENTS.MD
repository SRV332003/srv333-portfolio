# src/features/

## Purpose

Portfolio sections and pages. Each subfolder is a feature module.

## Current modules

| Folder | Role |
|--------|------|
| `home/` | `HomePage` composes shell + hero + parallax |
| `shell/` | Layout, Header, Footer; mounts starfield |
| `hero/` | Hero section |
| `canvas/` | 2D starfield background ([AGENTS.MD](canvas/AGENTS.MD)) |

## Adding a section

Use `.cursor/skills/add-portfolio-section/`.

## Constraints

- **No** cross-feature imports.
- **No** `@radix-ui/*` or `@base-ui/*` — use `@/components/ui/*`.
- Export public API via `index.ts`.
- Copy from `loadPortfolio()` only.
