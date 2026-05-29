# Code patterns

## Feature modules

- One folder per portfolio section under `src/features/<name>/`.
- Public API via `index.ts`; other modules import from the barrel only.
- **Never** import across sibling features (e.g. `hero` must not import from `projects`).
- **Never** import `@radix-ui/*` or `@base-ui/*` directly in features—use `@/components/ui/*`.

## Imports

- Use `@/` alias for all internal imports.
- Content: `import { loadPortfolio } from '@/content'`.
- Marketing layout: `@/shared/ui`.
- Primitives: `@/components/ui/<component>`.

## Two UI layers

| Layer | Path | Use |
|-------|------|-----|
| Marketing | `src/shared/ui/` | Container, Section, bespoke cards/typography |
| shadcn | `src/components/ui/` | Button, Sheet, Dialog, Tabs, form controls |

## Token bridge (shadcn ↔ space)

| shadcn variable | Space token |
|-----------------|-------------|
| `--background` | `--color-void` |
| `--foreground` | `--color-star` |
| `--primary` | `--color-accent` |
| `--primary-foreground` | `--color-void` |
| `--secondary` | `--color-nebula-light` |
| `--muted-foreground` | `--color-star-dim` |
| `--accent` | `--color-orbit` |
| `--ring`, `--border` | orbit-derived mixes |

Source of truth: `src/styles/tokens.css`. Bridge: `src/styles/globals.css`.

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

1. Check ADR 0005 allowlist.
2. Run CLI; files land in `src/components/ui/`.
3. Verify semantic colors still match space theme.
4. Update `src/components/AGENTS.MD` if new export patterns apply.

## Forbidden patterns

- Hardcoded hex/rgb in feature TSX (use tokens or `bg-background`, `text-primary`).
- shadcn `Card` as hero layout (dashboard aesthetic).
- Duplicate `Button` in `shared/ui`.
- Copy/paste in components—use `portfolio.json`.

## Lazy loading

- Route-level: `React.lazy` for future `/projects/:slug`.
- Canvas: `StarfieldCanvas` lazy inside `StarfieldBackground`.
- 3D: dynamic `import()` for `features/scene3d` only (Phase 4).

## Canvas (Phase 2)

- Import backdrop only from `@/features/canvas` (typically `shell/Layout.tsx`).
- Do not put canvas logic in `shared/ui` or shadcn components.
- **Interaction model**: see [ADR 0007](decisions/0007-canvas-interaction-ux.md).
  - Hero text stays fixed (no DOM parallax).
  - Pointer parallax is **horizontal-only** on star draw positions.
  - Repulsion/glow on physics layer; parallax on draw layer.
- Tune in `features/canvas/lib/constants.ts` (`DRIFT_SPEED`, `CANVAS_PARALLAX_*`, `REPULSION_*`).

## Shell chrome

- Header/footer glass styling: [ADR 0007](decisions/0007-canvas-interaction-ux.md) — keep semi-transparent so stars show through.
