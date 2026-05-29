# hero

Hero section with headline, CTAs, and a decorative lazy 3D planet accent.

## 3D accent

- Import `HeroPlanetScene` from `@/features/scene3d` (exception: hero → scene3d, same pattern as shell → canvas)
- Wrapper: `pointer-events-none`, `aria-hidden`, `data-scene3d="hero"`
- CSS nebula glow behind the canvas; grid layout with copy left, planet right on `md+`

See [ADR 0010](../../../docs/decisions/0010-scene3d-performance.md).
