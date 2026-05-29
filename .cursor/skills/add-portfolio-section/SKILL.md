---
name: add-portfolio-section
description: Add a new portfolio feature section with route, content slice, and AGENTS.MD. Use when adding about, projects, contact, or similar sections.
---

# Add portfolio section

## Checklist

1. Read [docs/patterns.md](../../docs/patterns.md) and [src/features/AGENTS.MD](../../src/features/AGENTS.MD).
2. Add content fields to `src/content/schema.ts` and `portfolio.json`.
3. Update [docs/content-schema.md](../../docs/content-schema.md).
4. Create `src/features/<name>/` with component + `index.ts` barrel.
5. Add `AGENTS.MD` in the new feature folder.
6. Compose in `HomePage` or add route in `src/app/routes.tsx`.
7. Use `shared/ui` for layout; shadcn only for interactive primitives.
8. Run `npm run typecheck`.

## Constraints

- No cross-feature imports.
- No hardcoded copy.
