# src/content/

## Purpose

Single source of portfolio copy and structured data.

## Files

| File | Role |
|------|------|
| `schema.ts` | Zod schemas and exported types |
| `portfolio.json` | Placeholder / real content |
| `index.ts` | `loadPortfolio()`, `getProjectBySlug()`, `getAllProjectSlugs()` |

## Workflow

1. Edit `portfolio.json`
2. If shape changes, update `schema.ts` and `docs/content-schema.md`
3. Run `npm run typecheck`

## Constraints

- **Never** duplicate strings in feature components.
- Features import `loadPortfolio()` or receive props from a parent loader.
