---
name: add-2d-effect
description: Add canvas or CSS 2D space effects in features/canvas. Use in Phase 2 for starfield, parallax, pointer interactions.
---

# Add 2D effect (Phase 2 stub)

## Planned location

`src/features/canvas/`

## Checklist (when implementing)

1. Read [ADR 0003](../../docs/decisions/0003-hybrid-visuals.md).
2. Create canvas feature module with `AGENTS.MD`.
3. Respect `prefers-reduced-motion` — static fallback required.
4. Do not put canvas logic inside shadcn or `shared/ui`.
5. Lazy-load heavy canvas code if needed.

## Status

Not implemented in Phase 1.
