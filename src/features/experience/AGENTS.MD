# Experience feature

## Purpose

Renders the `#experience` timeline section from `portfolio.json` `experience` array.

## Files

| File | Role |
|------|------|
| `ExperienceSection.tsx` | Timeline spine, employment badges, skill chips under title · company (`data-experience-skills`), then duration and body |
| `EmploymentTypeBadge.tsx` | Intern / Full-time / Contract badge |
| `MissionPhaseBadge.tsx` | Launch / Orbit / Dock styling (unused in UI; kept for Phase 9) |
| `MissionPhaseLegend.tsx` | Phase legend (unused in UI) |
| `missionPhase.ts` | Phase labels + `inferMissionPhase()` (content/schema only) |
| `formatPeriod.ts` | `YYYY-MM` → `MMM YYYY` display; inclusive duration on cards (`9 mo`, `1 yr 4 mo`) |
| `index.ts` | Barrel export |

## Dependencies

- `@/content` — `loadPortfolio().experience`
- `@/components/ui/badge`
- `@/shared/ui`

## Rules

- No hardcoded copy.
- No cross-feature imports.
- Dates authored as `start`/`end` in JSON; never hardcode formatted strings in TSX.
- Timeline shows **`employmentType` badge only** — not mission phase (see ADR 0015 amendment).

## Reference

[ADR 0009](../../../docs/decisions/0009-experience-content-presentation.md)
