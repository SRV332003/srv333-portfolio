---
name: add-3d-scene
description: Add lazy-loaded React Three Fiber scenes in features/scene3d. Use when extending hero visuals or adding contextual WebGL (e.g. project previews).
---

# Add 3D scene

## Before you start

1. Read [ADR 0003](../../docs/decisions/0003-hybrid-visuals.md) and [ADR 0010](../../docs/decisions/0010-scene3d-performance.md)
2. Read [src/features/scene3d/AGENTS.MD](../../src/features/scene3d/AGENTS.MD)

## Workflow

1. **Reuse shared pieces** — `SceneCanvas`, `PlanetMesh`, `OrbitRing`, `Scene3DFallback`, `lib/constants.ts`, `lib/colors.ts`
2. **New scene variant** — add `MySceneInner.tsx` with R3F content; export lazy wrapper `MyScene.tsx` that:
   - checks `usePrefersReducedMotion()` → fallback only
   - uses `lazy(() => import('./MySceneInner'))` + `Suspense`
3. **Mount placement** — prefer contextual 3D (project detail) over duplicate generic sections on home; home already has one hero Canvas
4. **Below-the-fold** — use `useInViewport` before mounting WebGL
5. **Do not** import shadcn or `shared/ui` inside `*Inner.tsx` or mesh components
6. **Do not** add Canvas to `shell/Layout.tsx`
7. **Performance** — cap DPR via `getEffectiveDpr()`; pause `useFrame` when `document.hidden`
8. **Tests** — extend `e2e/scene3d.spec.ts`; verify reduced-motion has no `[data-scene3d] canvas`
9. **Verify** — `npm run typecheck`, `lint`, `build`, `test:e2e`

## Export pattern

```tsx
const MySceneInner = lazy(() =>
  import('./MySceneInner').then((m) => ({ default: m.MySceneInner })),
)
```

Do **not** re-export `*Inner.tsx` from `index.ts`.
