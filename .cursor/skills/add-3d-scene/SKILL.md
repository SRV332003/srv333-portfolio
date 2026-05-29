---
name: add-3d-scene
description: Add lazy-loaded React Three Fiber scenes in features/scene3d. Use in Phase 4 for orbital/planet visuals.
---

# Add 3D scene (Phase 4 stub)

## Planned location

`src/features/scene3d/`

## Checklist (when implementing)

1. Read [ADR 0003](../../docs/decisions/0003-hybrid-visuals.md).
2. Install `@react-three/fiber`, `@react-three/drei`, `three` (document in new ADR if versions matter).
3. Dynamic `import()` + `Suspense` with 2D fallback.
4. No shadcn inside WebGL components.
5. Cap DPR on mobile; performance budget in docs/requirements.md.

## Status

Not implemented in Phase 1.
