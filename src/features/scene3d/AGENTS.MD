# scene3d

Lazy-loaded React Three Fiber visuals. All WebGL for the portfolio lives here.

## Exports

- `HeroPlanetScene` — decorative layered planet + orbit ring for the hero
- `Scene3DFallback` — `--hero-planet-glow` orb + CSS ring hint (reduced motion / no WebGL)
- `useInViewport`, `usePrefersReducedMotion` — gating hooks for future below-the-fold mounts

## Rules

- Never import shadcn or `shared/ui` inside R3F child components
- Inner scenes (`*Inner.tsx`) are dynamically imported; do not re-export from barrels used on critical path
- Read colors from CSS tokens via `lib/colors.ts` (`accent`, `orbit`, `void`)
- Cap DPR via `lib/constants.ts`; pause `useFrame` when `document.hidden`
- Planet, ring, and assembly yaw rotate independently (`PLANET_ROTATION_SPEED`, `RING_ROTATION_SPEED`, `HERO_PLANET_YAW_SPEED`); static tilt on `HeroPlanet` only
- Planet core uses procedural `createPlanetSurfaceTexture()` + faint wireframe + emissive surface markers so spin is visible on a smooth sphere
- Mesh budget: planet core (void + orbit emissive) + additive sphere atmosphere + ring + lights — no shadows, no postprocessing (bloom deferred per ADR 0010)
- Decorative only: `pointer-events-none` on wrappers, no OrbitControls
- Home page uses **one** WebGL Canvas (hero only); contextual 3D on project routes is future work

## Docs

- [ADR 0010](../../../docs/decisions/0010-scene3d-performance.md) — perf caps, Phase 8 layering
- [ADR 0013](../../../docs/decisions/0013-visual-design-system.md) — `--hero-planet-glow` ↔ fallback / hero blur
- [ADR 0003](../../../docs/decisions/0003-hybrid-visuals.md)
