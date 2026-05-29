# ADR 0003: Hybrid 2D and 3D visuals

## Status

Accepted

## Context

Space theme benefits from rich visuals without shipping a heavy 3D bundle on first paint.

## Decision

- **Phase 2**: 2D canvas/CSS in `src/features/canvas/`
- **Phase 4**: React Three Fiber in `src/features/scene3d/`, lazy-loaded
- **Never** mix WebGL inside generic UI or shadcn components

## Consequences

- Smaller Phase 1 bundle; 3D is opt-in per section.
- Performance ADR: cap DPR on mobile, Suspense fallbacks required.
