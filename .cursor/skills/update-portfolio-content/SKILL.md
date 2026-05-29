---
name: update-portfolio-content
description: Safely update portfolio.json and Zod schema without touching UI. Use when changing copy, links, projects, or nav items.
---

# Update portfolio content

## Checklist

1. Read [docs/content-schema.md](../../docs/content-schema.md).
2. Edit `src/content/portfolio.json`.
3. If structure changes, update `src/content/schema.ts` and content-schema doc.
4. Run `npm run typecheck` — Zod errors indicate schema drift.
5. Do not edit feature TSX unless new fields need rendering.

## Constraints

- Valid URLs where schema requires `.url()` or `.email()`.
- Keep slugs kebab-case for future routes.
