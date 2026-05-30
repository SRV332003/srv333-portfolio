# src/shared/

## Purpose

Cross-feature utilities and **marketing** UI (not shadcn primitives).

## ui/

| Component | Role |
|-----------|------|
| `Container` | Max-width wrapper |
| `Section` | Vertical spacing; `variant="default" \| "band"` + `data-section-variant` |
| `SectionHeading` | Section h2 (`text-section`) + optional subtitle |
| `FrostedPanel` | Frosted tile surface; `as`, `interactive`, `className` |

## lib/

Use `@/lib/utils` (`cn`) from project root lib, not duplicated here.

## Constraints

- **Do not** add Button here — use `@/components/ui/button`.
- Keep components presentational; no content JSON in this folder.

See [ADR 0013](../../docs/decisions/0013-visual-design-system.md), [visual-principles.md](../../docs/visual-principles.md).
