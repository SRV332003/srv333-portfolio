# Skills feature

## Purpose

Renders the `#skills` section with frosted category cards and outline `Badge` chips.

## Files

| File | Role |
|------|------|
| `SkillsSection.tsx` | `skillsSection` heading + 2-column grouped badges (no per-category frosted cards) |
| `index.ts` | Barrel export |

## Dependencies

- `@/content` — `loadPortfolio().skills`
- `@/components/ui/badge`
- `@/shared/ui`

## Rules

- No hardcoded copy.
- No cross-feature imports.
