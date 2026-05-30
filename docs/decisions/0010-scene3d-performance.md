# ADR 0010: Scene3D performance and hero mount

## Status

Accepted (amended — single hero mount)

## Context

Phase 4 adds decorative WebGL in the hero while keeping the Phase 2 2D starfield. An initial dual-mount design (hero + `#orbit` section) was removed after UX review: two generic planets before proof-of-work sections added scroll cost without hiring signal.

## Decision

### Stack

- `three@^0.184`, `@react-three/fiber@^9.6`, `@react-three/drei@^10.7` (installed; drei reserved for future helpers)
- All WebGL under `src/features/scene3d/`
- Vite `manualChunks.three` splits `three` into its own chunk

### Hero-only mount

| Mount | When WebGL loads | Interaction |
|-------|------------------|-------------|
| Hero accent | Lazy chunk after hero paint | Decorative auto-rotate + tilted orbit ring |

- **Never** add 3D to `Layout.tsx` — starfield stays 2D-only
- Wrappers use `pointer-events-none` and `aria-hidden`; no OrbitControls
- Future contextual 3D (e.g. project detail previews) may add lazy mounts per route/section

### Page flow (post-amendment)

`Hero → Projects → About → Experience → Skills → Contact` — projects immediately after hero for proof-of-work; one 3D accent at the top only.

### Performance caps

| Rule | Value |
|------|-------|
| DPR desktop | `min(devicePixelRatio, 2)` |
| DPR mobile (≤768px) | `min(devicePixelRatio, 1.5)` |
| Reduced motion | CSS `Scene3DFallback` only — no WebGL |
| Tab hidden | Pause `useFrame` rotation |
| Scene complexity | Planet core + atmosphere shell + orbit ring + lights; no shadows or postprocessing |
| Canvas frameloop | `always` on hero `SceneCanvas` so `useFrame` motion is continuous |
| Bloom / postprocessing | **Deferred** — not added in Phase 8; revisit only if manual perf check passes |

### Colors

Read `--color-accent`, `--color-orbit`, and `--color-void` from CSS via `readSceneColors()` / `getComputedStyle` on mount (same pattern as canvas starfield). Hero lights use token values (directional rim + accent/orbit points); no hardcoded hex in `HeroPlanetSceneInner`.

### Hero planet materials (post–Phase 8 tuning)

| Layer | Geometry | Material / notes |
|-------|----------|------------------|
| Core | `icosahedronGeometry` detail 3 | `meshStandardMaterial`: `--color-void` base, orbit emissive (low), lit by scene lights for terminator |
| Atmosphere | `sphereGeometry` at `ATMOSPHERE_SCALE` (~1.08) | `meshBasicMaterial`, accent, additive blend, `depthWrite: false` — halo reads even though sphere is symmetric |
| Ring | `torusGeometry` (`RING_TUBE` ~0.034) | Orbit color, accent emissive (moderate), higher metalness — band not wire |

Lighting: low ambient (~0.1), strong accent directional rim, weak orbit fill; point lights toned down so void side stays dark. Hero column CSS glow uses `--hero-planet-glow` at reduced opacity (~45%) so WebGL is not washed out.

### Motion (readable at a glance)

Constants live in `src/features/scene3d/lib/constants.ts`:

| Constant | Role | Approx. feel |
|----------|------|----------------|
| `PLANET_ROTATION_SPEED` (~0.52 rad/s) | Core + atmosphere group: Y spin + slight X wobble | ~12s per planet turn |
| `RING_ROTATION_SPEED` (~0.34 rad/s) | Ring mesh: local Z + X tumble | Band moves in depth, not only in-plane |
| `HERO_PLANET_YAW_SPEED` (~0.14 rad/s) | `HeroPlanet` assembly yaw on Y | Slow precession of planet + ring together |

Static tilt remains on `HeroPlanet` (`rotation={[0.14, 0.35, 0]}`); no group-level spin beyond assembly yaw. All `useFrame` hooks pause when `document.hidden`.

Earlier Phase 8 speeds (~0.25 / ~0.12 rad/s) were too slow to read on a faceted mesh behind a symmetric halo; speeds and multi-axis motion were raised in a follow-up pass (see amendment history).

### CSS fallback (Phase 8)

`Scene3DFallback` uses `var(--hero-planet-glow)` (same token as hero blur in `Hero.tsx`) plus a thin CSS ring hint. Reduced-motion path never mounts a Canvas.

## Consequences

- Home initial bundle excludes `three` synchronously; only one WebGL Canvas on the home page
- Tighter scroll funnel; thematic orbit copy moved to About subtitle
- Future 3D work extends `scene3d/`; use `useInViewport` for below-the-fold mounts

## Amendment history

- **Dual mount removed**: `#orbit` section and `features/orbit/` dropped; hero planet enhanced with ring and nebula glow instead.
- **Phase 8 — Hero planet craft**: layered planet (core + atmosphere), split planet/ring rotation, token-aligned lighting, `--hero-planet-glow` fallback parity; bloom/postprocessing explicitly out of scope until perf validated.
- **Phase 8 visual tuning**: void-based core, additive `sphereGeometry` atmosphere, stronger rim directional + lower fill, thicker metallic ring; hero CSS glow slightly reduced so WebGL reads through.
- **Phase 8 motion readability**: raised `PLANET_ROTATION_SPEED` / `RING_ROTATION_SPEED`, added `HERO_PLANET_YAW_SPEED`, planet wobble + ring tumble, `frameloop="always"`; documented in **Hero planet materials** and **Motion** sections above.
