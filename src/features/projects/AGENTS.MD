# Projects feature

## Purpose

Home `#projects` grid with tab filter and `/projects/:slug` detail pages.

## Files

| File | Role |
|------|------|
| `ProjectsSection.tsx` | Grid + tabs (All / Featured) |
| `ProjectCard.tsx` | Stretched-link card to detail route |
| `ProjectDetail.tsx` | Detail layout (title, body, CTAs) |
| `ProjectDetailPage.tsx` | Route page with 404 handling (lazy route import only) |
| `index.ts` | Barrel export (excludes `ProjectDetailPage` for code-splitting) |

## Dependencies

- `@/content` — `loadPortfolio()`, `getProjectBySlug()`
- `@/components/ui` — badge, tabs, button
- `@/features/shell` — Layout (detail page only)
- `@/shared/ui`

## Routing

Registered in `src/app/routes.tsx` as `/projects/:slug` (lazy-loaded via direct file import).

## Card interaction

Stretched overlay `Link` + `pointer-events-none` on content — see [patterns.md](../../../docs/patterns.md#stretched-link-cards).

## Rules

- Cards link to `/projects/:slug`; external `href`/`repo` on detail page only.
- No cross-feature imports except shell Layout on detail page.
