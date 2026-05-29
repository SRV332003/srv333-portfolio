# scene3d

Lazy-loaded React Three Fiber visuals. All WebGL for the portfolio lives here.

## Exports

- `HeroPlanetScene` — decorative planet + orbit ring for the hero
- `Scene3DFallback` — CSS gradient orb when WebGL is unavailable or reduced-motion
- `useInViewport`, `usePrefersReducedMotion` — gating hooks for future below-the-fold mounts

## Rules

- Never import shadcn or `shared/ui` inside R3F child components
- Inner scenes (`*Inner.tsx`) are dynamically imported; do not re-export from barrels used on critical path
- Read colors from CSS tokens via `lib/colors.ts`
- Cap DPR via `lib/constants.ts`; pause rotation when `document.hidden`
- Decorative only: `pointer-events-none` on wrappers, no OrbitControls
- Home page uses **one** WebGL Canvas (hero only); contextual 3D on project routes is future work

## Docs

- [ADR 0010](../../../docs/decisions/0010-scene3d-performance.md)
- [ADR 0003](../../../docs/decisions/0003-hybrid-visuals.md)
