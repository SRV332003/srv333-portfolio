---
name: add-2d-effect
description: Add canvas or CSS 2D space effects in features/canvas. Use for starfield tweaks, new particle behavior, or fallback styling.
---

# Add 2D effect

## Before you start

1. Read [ADR 0003](../../docs/decisions/0003-hybrid-visuals.md) and [ADR 0006](../../docs/decisions/0006-canvas-performance.md).
2. Read [src/features/canvas/AGENTS.MD](../../src/features/canvas/AGENTS.MD).

## Checklist

1. Tune behavior in `src/features/canvas/lib/constants.ts` when possible.
2. Particle logic lives in `lib/stars.ts`; rAF in `hooks/useStarfieldAnimation.ts`.
3. Respect `prefers-reduced-motion` — update `StarfieldFallback.tsx` if visuals change.
4. Keep `pointer-events-none` on the background wrapper.
5. Do not add canvas code to shadcn or `shared/ui`.
6. Parallax is background-only in `lib/stars.ts` draw step; tune `CANVAS_PARALLAX_*` constants. See [ADR 0007](../../docs/decisions/0007-canvas-interaction-ux.md) before changing parallax axis or hero motion.
7. Run `npm run typecheck` and `npm run build`.

## Adding new canvas layers

- Extend `StarfieldCanvas` or add a sibling component lazy-loaded from `StarfieldBackground`.
- Cap DPR and particle count for mobile.
