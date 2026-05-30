# src/features/shell/

## Purpose

Global chrome: layout, header, footer. Mounts full-page `StarfieldBackground` (exception: imports `@/features/canvas` for backdrop).

## Files

| File | Role |
|------|------|
| `Layout.tsx` | `StarfieldBackground` + z-10 content column |
| `Header.tsx` | Nav + primary CTA + resume (`lg+`); `useScrollSpySection` (IntersectionObserver + hash `replaceState` on scroll); `navActive.ts`; Projects active on `/projects/*` |
| `Footer.tsx` | Social links from content |

## Chrome styling

Glass layers so the starfield remains visible. Rationale: [ADR 0007](../../../docs/decisions/0007-canvas-interaction-ux.md).

| Element | Intent |
|---------|--------|
| **Header** | `bg-background/25`, `backdrop-blur-sm` — stars visible through nav |
| **Footer** | Frosted band (`bg-background/35`), top border, upward shadow, `py-6` — separated from hero without excess height |

Do not increase header/footer opacity without updating ADR 0007.

## Mobile navigation (Phase 3)

- Hamburger + shadcn `Sheet` visible below `md` breakpoint.
- Nav links from `loadPortfolio().nav`; sheet closes on link click (including resume).
- See [ADR 0008](../../../docs/decisions/0008-portfolio-sections-routing.md), [ADR 0011](../../../docs/decisions/0011-identity-content-presentation.md).

## Constraints

- Only shell may import `features/canvas` for the fixed backdrop.
- No business copy; use `loadPortfolio()`.
