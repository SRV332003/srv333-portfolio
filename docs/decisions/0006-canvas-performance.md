# ADR 0006: Canvas performance

## Status

Accepted

## Context

Phase 2 adds a full-viewport animated starfield with pointer repulsion and scroll parallax.

## Decision

- **Particle caps**: ~180 desktop, ~70 mobile (`max-width: 768px`).
- **DPR cap**: `min(devicePixelRatio, 2)` desktop; `1.5` mobile.
- **Pause rAF** when `document.hidden`.
- **Reduced motion**: no canvas; CSS-only `StarfieldFallback`.
- **Lazy load**: `StarfieldCanvas` via `React.lazy` + `Suspense` fallback.
- **Pointer**: window-level passive listeners; canvas `pointer-events-none`.
- **Tuning**: `src/features/canvas/lib/constants.ts`.

## Consequences

- Resize recreates particle pool (simple, avoids drift bugs).
- Shell `Layout` imports `StarfieldBackground` as global chrome (documented exception to sibling isolation).
