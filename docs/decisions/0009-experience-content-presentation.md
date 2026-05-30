# ADR 0009: Experience content and presentation

## Status

Accepted

## Context

After Phase 3 shipped a minimal experience list (`role`, `company`, `period`, `description`), iteration added richer résumé-style content and a timeline UI aligned with project cards. Date display needed month precision (`Mar 2022`) without hardcoding formatted strings in JSON.

## Decision

### Content model

Each experience entry in `portfolio.json`:

| Field | Purpose |
|-------|---------|
| `start` | `YYYY-MM` (validated month `01`–`12`) |
| `end` | `YYYY-MM` or `"present"` |
| `summary` | Optional one-line intro |
| `highlights` | Optional bullet achievements |
| `skills` | Optional tech used in this role |
| `description` | Legacy single paragraph (backward compatible) |

At least one of `description`, `summary`, or `highlights` is required.

**Per-role `skills` vs global `#skills`**: global skills are category-grouped capabilities; per-role skills are “used here” tags. Overlap is intentional—no deduplication in content or UI.

### Date formatting

- JSON stores machine-readable `YYYY-MM`; authors never write `"Mar 2022"` in content.
- Display formatting lives in `src/features/experience/formatPeriod.ts` (`formatMonthYear`, `formatExperiencePeriod`).
- UI renders `MMM YYYY` via `toLocaleDateString('en-US', { month: 'short', year: 'numeric' })`.
- `<time dateTime>` uses ISO-ish values from `experiencePeriodDateTime()`.

### Presentation (timeline + frosted cards)

Experience uses **bespoke marketing UI**, not shadcn `Card`:

- Section intro from `experienceSection` (`title`, optional `subtitle`); optional nebula radial wash on the band.
- **Shared timeline spine**: one vertical gradient rail (`data-timeline-spine`) with dots centered on the rail; `end: "present"` uses primary node + “Current” label + subtle card ring.
- Three-column desktop layout: rail · dates (`9.5rem`, right-aligned, `whitespace-nowrap` on period) · frosted card; mobile stacks date above card beside the rail.
- Custom accent bullet markers (dot markers; not browser `list-disc`).
- **Card padding:** `FrostedPanel` `p-6 md:p-7` (matches project cards).
- “Technologies” footer strip with shadcn `Badge variant="outline"`; label uses primary token; `mt-8 pt-6` spacing.
- Role and company render as **Role · Company** (company in accent).

Per-item connector spans replaced by the continuous spine (post–Phase 7 polish).

## Consequences

- Schema change replaces free-text `period` with `start`/`end`; existing JSON must migrate.
- Locale is fixed to `en-US` for month abbreviations; i18n would need a shared formatter change.
- Experience cards are non-interactive (hover polish only)—no detail routes for jobs.
- E2E: spine, subtitle, present role, date nowrap, card padding (`e2e/experience.spec.ts`).

## References

- [ADR 0013](0013-visual-design-system.md) — band wash, FrostedPanel

- [ADR 0004](0004-content-driven-ui.md) — content-driven copy
- [ADR 0005](0005-shadcn-selective.md) — badge only; no shadcn Card
- [ADR 0008](0008-portfolio-sections-routing.md) — Phase 3 sections baseline
- [docs/content-schema.md](../content-schema.md) — field reference
