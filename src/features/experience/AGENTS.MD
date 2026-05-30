# Experience feature

## Purpose

Renders the `#experience` timeline section from `portfolio.json` `experience` array.

## Files

| File | Role |
|------|------|
| `ExperienceSection.tsx` | Shared timeline spine, mission phase badges/legend, present-role node styling, nebula wash, `experienceSection` intro, frosted cards |
| `MissionPhaseBadge.tsx` | Launch / Orbit / Dock badge styling |
| `MissionPhaseLegend.tsx` | Compact phase legend under section intro |
| `missionPhase.ts` | Phase labels + `inferMissionPhase()` |
| `formatPeriod.ts` | `YYYY-MM` → `MMM YYYY` display formatting |
| `index.ts` | Barrel export |

## Dependencies

- `@/content` — `loadPortfolio().experience`
- `@/components/ui/badge`
- `@/shared/ui`

## Rules

- No hardcoded copy.
- No cross-feature imports.
- Dates authored as `start`/`end` in JSON; never hardcode formatted strings in TSX.

## Reference

[ADR 0009](../../../docs/decisions/0009-experience-content-presentation.md)
