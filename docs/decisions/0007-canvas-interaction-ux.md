# ADR 0007: Canvas interaction and shell chrome UX

## Status

Accepted

## Context

After Phase 2 shipped the starfield, UX iteration revealed several issues:

1. **Hero text parallax** felt jittery and competed with star repulsion/glow.
2. **Vertical pointer parallax** cancelled **downward star drift** when moving the mouse down — stars appeared to freeze (parallax offset + drift ≈ 0).
3. **Header** was too opaque — stars hidden behind the nav bar.
4. **Footer** merged visually with the hero; later `py-10` felt too tall.
5. **Star drift** felt too slow at initial `DRIFT_SPEED`.
6. **Playwright e2e** added for smoke verification; reports/screenshots are generated artifacts.

## Decision

### Canvas parallax (background-only)

- **No hero text transform** — headline/CTAs stay fixed; motion lives in the canvas layer only.
- **Pointer parallax on draw positions** in `lib/stars.ts`, not on hero DOM.
- **Horizontal-only parallax** (`parallax.y = 0`) — inverse X shift from pointer, depth-weighted by `star.z`.
- **Repulsion** stays on the physics layer (`updateStars`); parallax on the draw layer only.
- **Smoothed** via lerp in `useStarfieldAnimation` (`CANVAS_PARALLAX_LERP`).
- **Disabled** when `prefers-reduced-motion: reduce`.
- **Scroll parallax** remains in `updateStars` but is subtle until Phase 3 adds page height.

### Star drift tuning

- Primary vertical motion via `DRIFT_SPEED` in `lib/constants.ts` (currently `0.11`, raised from `0.08`).

### Shell chrome (header / footer)

- **Header**: semi-transparent glass — `bg-background/25`, `backdrop-blur-sm`, soft border — so stars show through.
- **Footer**: distinct frosted band — `bg-background/35`, top border, upward shadow, `mt-auto`; compact padding `py-6` (reduced from `py-10`).

### E2E testing

- Playwright smoke tests in `e2e/home.spec.ts`; config in `playwright.config.ts`.
- Gitignore: `playwright-report/`, `test-results/`, `e2e/screenshots/`.

## Tuning knobs

All in `src/features/canvas/lib/constants.ts`:

| Constant | Purpose |
|----------|---------|
| `DRIFT_SPEED` | Autonomous star drift |
| `CANVAS_PARALLAX_FACTOR` | Horizontal pointer parallax strength |
| `CANVAS_PARALLAX_MAX` | Max parallax offset (px) |
| `CANVAS_PARALLAX_LERP` | Smoothing factor |
| `REPULSION_*`, `GLOW_*` | Near-pointer interaction |

## Consequences

- Do not reintroduce vertical pointer parallax without revisiting drift interaction (see this ADR).
- Do not move parallax back to hero text — use canvas or a dedicated background layer.
- Scroll-based parallax will become more noticeable in Phase 3 when sections add scroll height.
- Shell styling changes should stay in `features/shell/`; document rationale here if non-obvious.

## References

- [ADR 0003](0003-hybrid-visuals.md) — 2D canvas vs 3D
- [ADR 0006](0006-canvas-performance.md) — performance caps
- `src/features/canvas/AGENTS.MD` — module guide
- `src/features/shell/AGENTS.MD` — header/footer chrome
