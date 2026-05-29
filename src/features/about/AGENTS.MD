# About feature

## Purpose

Renders the `#about` anchor section from `portfolio.json` `about` content.

## Files

| File | Role |
|------|------|
| `AboutSection.tsx` | Title + body paragraphs |
| `index.ts` | Barrel export |

## Dependencies

- `@/content` — `loadPortfolio().about`
- `@/shared/ui` — `Section`, `Container`, `SectionHeading`

## Rules

- No hardcoded copy; all text from content schema.
- No cross-feature imports.
