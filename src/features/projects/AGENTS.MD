# Projects feature

## Purpose

Home `#projects` grid with tab filter and `/projects/:slug` case-study detail pages.

## Files

| File | Role |
|------|------|
| `ProjectsSection.tsx` | Band + nebula wash (`data-section-wash="projects"`); grid + tabs (All / Featured with count); `/?filter=featured#projects` sync; compact 2-col when ≤2 featured; flagship `lg:col-span-2` on 3-col grid |
| `ProjectCard.tsx` | Thumbnail (hover zoom), meta, outcome teasers (max 3), “View case study”, stretched-link to detail |
| `ProjectDetail.tsx` | Hero image, meta row, outcomes strip, body, CTAs |
| `ProjectOutcomesStrip.tsx` | Metrics grid (`value` + `label`) |
| `ProjectDetailPage.tsx` | Route page with 404 handling (lazy route import only) |
| `index.ts` | Barrel export (excludes `ProjectDetailPage` for code-splitting) |

## Content fields

- Case study: `image`, `imageAlt`, `role`, `year`, `domain`, `outcomes[]`, `flagship`
- Narrative: `body[0]` = problem; remaining paragraphs = approach/results

## Dependencies

- `@/content` — `loadPortfolio()`, `getProjectBySlug()`
- `@/components/ui` — badge, tabs, button
- `@/features/shell` — Layout (detail page only)
- `@/shared/ui`

## Routing

Registered in `src/app/routes.tsx` as `/projects/:slug` (lazy-loaded via direct file import).

## Card interaction

Stretched overlay `Link` + `pointer-events-none` on content — see [patterns.md](../../../docs/patterns.md#stretched-link-cards).

Featured cards: accent ring + glow. Flagship: double width on `lg+` grid.

## Rules

- Cards link to `/projects/:slug`; external `href`/`repo` on detail page only.
- No cross-feature imports except shell Layout on detail page.

See [ADR 0012](../../../docs/decisions/0012-project-case-studies.md).
