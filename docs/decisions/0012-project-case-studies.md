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

**Section intro:** `projectsSection` (`title`, optional `subtitle`) drives `SectionHeading` on home grid.

### Home grid

- **Featured:** `ring-accent/30` + subtle glow on cards; filter via All / Featured tabs.
- **Featured tab label:** `Featured (N)` when count > 0.
- **Flagship:** `lg:col-span-2` on 3-column grid; sort flagship first, then featured.
- **Featured-only layout:** when ≤2 featured projects, `lg:grid-cols-2` and flagship does not double-span (avoids empty third column).
- **Filter URL:** `/?filter=featured#projects` syncs tab via `useSearchParams` (`replace`); query must precede hash.
- **Tabs UI:** `variant="line"` with primary underline on active trigger.
- **Band wash:** `data-section-wash="projects"` radial gradients on band (ADR 0013).

### Home cards (amended — post–Phase 7)

- Thumbnail in overflow wrapper; `motion-safe` hover scale on image.
- Up to **3 outcome teasers** per card (`value` + `label`), same content as detail strip.
- Persistent **“View case study →”** affordance (stretched `Link` remains card hit target).
- `FrostedPanel` with `p-6`; meta, role, summary, tech badges unchanged from Phase 6 baseline.

### Detail page

Layout order: back link → hero image (eager) → title → meta row (domain · year · role) → summary → outcomes strip → tech → body → live/repo CTAs.

**Outcomes strip:** grid of value (accent, large) + label (muted); `ProjectOutcomesStrip` subcomponent.

### Assets

Placeholder images under `public/assets/projects/`; swap real screenshots before personal ship.

## Consequences

- Phase 10 SEO can reuse `getAllProjectSlugs()` and per-project `image` for OG later.
- Phase 7 unified card surfaces via `FrostedPanel` and band washes (ADR 0013).
- E2E: thumbnails, detail outcomes, card teasers, subtitle, filter query, tab panels (`e2e/projects.spec.ts`, `e2e/home.spec.ts`).

## References

- [ADR 0008](0008-portfolio-sections-routing.md) — project routes and card stretched-link pattern
