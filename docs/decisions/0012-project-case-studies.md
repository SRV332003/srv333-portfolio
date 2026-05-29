# ADR 0012: Project case studies

## Status

Accepted

## Context

Phase 6 upgrades projects from summary cards to impact-focused case studies. Copy and metrics must stay in `portfolio.json`; UI must surface thumbnails, outcomes, and context without hardcoded project data.

## Decision

### Schema extensions

Each project may include:

| Field | Purpose |
|-------|---------|
| `image` | Site-relative thumbnail/hero path (e.g. `/assets/projects/orbital-telemetry.png`) |
| `imageAlt` | Optional alt text; UI fallback is project title |
| `role` | Contributor role on the project |
| `year` | Completion or ship year (integer) |
| `domain` | Problem space (e.g. Mission operations) |
| `outcomes` | `{ value, label }[]` — metrics strip on detail page |
| `flagship` | One richest case study; wider card span on home grid |

**Portfolio refine:** every project must have `image` and at least one outcome for demo content.

**Narrative:** problem → role → outcomes → long-form `body[]`. Problem lives in `body[0]`; no separate `problem` field.

### Home grid

- **Featured:** `ring-accent/30` + subtle glow on cards; filter via All/Featured tabs (unchanged).
- **Flagship:** `lg:col-span-2` list item; sort flagship first, then featured, in All tab.
- Cards show thumbnail (`aspect-video`, lazy), domain · year meta, role, summary, tech.

### Detail page

Layout order: back link → hero image (eager) → title → meta row (domain · year · role) → summary → outcomes strip → tech → body → live/repo CTAs.

**Outcomes strip:** grid of value (accent, large) + label (muted); `ProjectOutcomesStrip` subcomponent.

### Assets

Placeholder images under `public/assets/projects/`; swap real screenshots before personal ship.

## Consequences

- Phase 10 SEO can reuse `getAllProjectSlugs()` and per-project `image` for OG later.
- Phase 7 may unify card styling with experience cards; no token overhaul in Phase 6.
- E2E asserts thumbnail, detail hero, outcomes, and meta on flagship project.

## References

- [ADR 0008](0008-portfolio-sections-routing.md) — project routes and card stretched-link pattern
