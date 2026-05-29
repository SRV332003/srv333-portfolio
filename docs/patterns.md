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
- 3D: dynamic `import()` for `features/scene3d` only (Phase 4).
