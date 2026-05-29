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
| Scene complexity | Planet mesh + orbit ring + lights; no shadows or postprocessing |

### Colors

Read `--color-accent` and `--color-orbit` from CSS via `getComputedStyle` on mount (same pattern as canvas starfield).

## Consequences

- Home initial bundle excludes `three` synchronously; only one WebGL Canvas on the home page
- Tighter scroll funnel; thematic orbit copy moved to About subtitle
- Future 3D work extends `scene3d/`; use `useInViewport` for below-the-fold mounts

## Amendment history

- **Dual mount removed**: `#orbit` section and `features/orbit/` dropped; hero planet enhanced with ring and nebula glow instead.
