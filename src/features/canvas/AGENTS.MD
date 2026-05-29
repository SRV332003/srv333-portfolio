# src/features/canvas/

## Purpose

Full-page 2D starfield background: canvas animation, pointer repulsion, horizontal pointer parallax, reduced-motion CSS fallback.

## Files

| File | Role |
|------|------|
| `StarfieldBackground.tsx` | Fixed layer; reduced-motion + lazy canvas |
| `StarfieldCanvas.tsx` | Canvas element + hooks |
| `StarfieldFallback.tsx` | Static nebula/stars (no rAF) |
| `hooks/usePointerRepulsion.ts` | Window pointer for repulsion |
| `hooks/useStarfieldAnimation.ts` | rAF loop, resize, draw |
| `lib/stars.ts` | Particle create/update/draw |
| `lib/constants.ts` | Density, DPR, repulsion tuning |
| `lib/diagnostics.ts` | Dev-only throttled `[starfield:*]` console warnings |
| `lib/colors.ts` | Read CSS token colors |

## Wired from

- `src/features/shell/Layout.tsx` mounts `StarfieldBackground`

## Parallax

Background-only, **horizontal-only** inverse pointer parallax on star draw positions (depth-weighted by `star.z`). No vertical parallax — avoids fighting downward drift. See [ADR 0007](../../../docs/decisions/0007-canvas-interaction-ux.md).

## Constraints

- **Never** put canvas logic in shadcn or `shared/ui`.
- Pause rAF when `document.hidden`.
- `pointer-events-none` on background container.
- Add tuning via `lib/constants.ts`, not inline magic numbers in components.
