# ADR 0014: Phase 9 delight (mission timeline + mission control)

## Status

Accepted

## Context

Phase 9 adds memorable personality without hurting scanability or load time. The roadmap offered five options; constellation hotspots (A) conflict with `pointer-events-none` starfield rules, and a standalone testimonial (D) adds static weight with less interaction payoff.

## Decision

### Shipped (pick 2)

| Item | Implementation |
|------|----------------|
| **B — Mission timeline** | Optional `experience[].missionPhase` (`launch` \| `orbit` \| `dock`); badges on timeline cards; compact legend under section intro |
| **C — Easter egg** | Keyboard `?` opens mission-control dialog (shadcn Dialog via Base UI) |
| **E — Transmission log** (lightweight) | External links inside mission-control dialog, not a separate section |

### Deferred

- **A — Constellation hotspots**: hero/canvas hit targets vs ADR 0007 background-only interaction
- **D — Testimonial**: optional future `about.testimonial` field if needed

### Content model

`missionControl` in `portfolio.json`:

- `title`, `hint` (footer copy)
- `shortcuts`: `{ label, href }[]`
- `transmissions`: `{ label, href, kind?: 'article' \| 'talk' }[]`

Mission phase inference when `missionPhase` omitted (`src/features/experience/missionPhase.ts`):

- `end === 'present'` → `orbit`
- last entry in array (oldest role) → `launch`
- middle entries → `dock`

Experience array remains **newest-first** (unchanged).

### Mission control UX

- Wired once in [`Layout.tsx`](../../src/features/shell/Layout.tsx) via `MissionControlProvider`
- `?` toggles dialog open/closed
- Ignored when focus is in `input`, `textarea`, `select`, or `contenteditable`
- Footer shows `missionControl.hint` (`data-mission-control-hint`)
- Dialog: focus trap via shadcn; Escape closes (Base UI default)

### Reduced motion

Mission-control panel is static content — no decorative animation dependency. Dialog enter/exit uses CSS transitions; acceptable for Phase 9; Phase 11 re-verifies delight coverage.

### Performance

- Dialog in shell bundle (small); no new WebGL or canvas layers
- No gamification, CMS, or chat

## Consequences

- New feature module `src/features/mission-control/`
- shadcn `dialog` added to allowlist usage
- Experience e2e asserts Launch / Orbit badges; mission-control e2e asserts `?` / Escape / form focus guard

## References

- [ADR 0009](0009-experience-content-presentation.md) — timeline + mission phases
- [ADR 0005](0005-shadcn-selective.md) — dialog allowlist
- [ADR 0007](0007-canvas-interaction-ux.md) — why constellation hotspots deferred
- [docs/content-schema.md](../content-schema.md)
