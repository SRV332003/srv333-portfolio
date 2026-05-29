# src/shared/

## Purpose

Cross-feature utilities and **marketing** UI (not shadcn primitives).

## ui/

- `Container` — max-width wrapper
- `Section` — vertical section spacing

## lib/

Use `@/lib/utils` (`cn`) from project root lib, not duplicated here.

## Constraints

- **Do not** add Button here — use `@/components/ui/button`.
- Keep components presentational; no content JSON in this folder.
