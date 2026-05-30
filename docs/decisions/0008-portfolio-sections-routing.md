# ADR 0008: Portfolio sections, routing, and contact

## Status

Accepted

## Context

Phase 3 expands the single-hero page into a full scrollable portfolio with anchor sections, project detail routes, mobile navigation, and a contact form—without a backend.

## Decision

### Single-page sections

- `HomePage` composes section features in order: hero → about → projects → experience → skills → contact.
- Each section uses `#id` anchors matching `portfolio.json` `nav` entries.
- Shared marketing chrome: `Section`, `Container`, `SectionHeading` from `@/shared/ui`.
- **No cross-feature imports** between section modules.

### Project detail routes

- Route `/projects/:slug` registered in `src/app/routes.tsx`.
- `ProjectDetailPage` lazy-loaded via direct import path (not exported from `features/projects/index.ts` barrel, so Vite code-splits correctly).
- Content helpers: `getProjectBySlug()`, `getAllProjectSlugs()`.
- `projectSchema` extended with `body: string[]` for long-form detail copy.
- Unknown slug renders in-app 404 with link home (no throw).

### Contact

- Client-side Zod validation in `ContactSection`.
- Valid submit sets `window.location.href` via `buildMailtoUrl()` in `features/contact/mailto.ts`.
- No Formspree, API, or server action in Phase 3.

### shadcn allowlist (Phase 3)

| Component | Use |
|-----------|-----|
| `badge` | Tech tags on project cards, experience roles, and detail |
| `tabs` | Projects filter (All / Featured) |
| `sheet` | Mobile nav in Header |
| `input`, `label`, `textarea` | Contact form |

**Not used**: `dialog` for project quick-view (detail route replaces it).

### Mobile navigation

- Hamburger trigger visible `md:hidden`; desktop nav unchanged.
- Sheet closes on nav link click (anchor or route).

### Smooth scroll

- `scroll-behavior: smooth` on `html` in `globals.css`.
- `@media (prefers-reduced-motion: reduce) { scroll-behavior: auto }` per ADR 0007 a11y pattern.

### Nav active state (amended — post–Phase 7)

Desktop and mobile nav links set `aria-current="page"` from scroll position on `/`, not from hash alone.

| Piece | Location | Behavior |
|-------|----------|----------|
| Scroll-spy | `useScrollSpySection.ts` | `IntersectionObserver` with `rootMargin: -96px 0 -55% 0`; highest `intersectionRatio` wins |
| Bottom sections | same | Near document bottom, `#contact` wins when it intersects or its top enters the active zone (avoids Skills stuck active) |
| Hash clicks | `hashchange` | Sets active section immediately; observer updates deferred ~300ms while anchor scroll settles |
| Hash sync on scroll | same | `history.replaceState` updates URL hash to match spy (e.g. `#projects` while reading Projects) |
| Active resolution | `navActive.ts` | `scrollSection ?? (hash \|\| '#hero')`; no stale hash override |
| Detail routes | `navActive.ts` | On `/projects/*`, **Projects** nav item is active |

E2E: `e2e/navigation.spec.ts` (scroll activation, Contact click/load).

## Consequences

- Home page height increases; canvas scroll parallax becomes more visible.
- Playwright coverage expanded for sections, tabs, detail route, mailto, mobile sheet, navigation active state.
- Future SEO (Phase 5) can use `getAllProjectSlugs()` for static paths or meta.

## References

- [ADR 0005](0005-shadcn-selective.md) — selective shadcn usage
- [ADR 0007](0007-canvas-interaction-ux.md) — reduced-motion scroll behavior
- [ADR 0009](0009-experience-content-presentation.md) — experience schema, dates, timeline UI
