# Experience feature

## Purpose

Renders the `#experience` timeline section from `portfolio.json` `experience` array.

## Files

| File | Role |
|------|------|
| `ExperienceSection.tsx` | Timeline rail, frosted entry cards, custom bullets, role skills |
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
