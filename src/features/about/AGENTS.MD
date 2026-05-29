# About feature

## Purpose

Renders the `#about` anchor section from `portfolio.json` `about` content with identity block (avatar, location, openTo) and body paragraphs.

## Files

| File | Role |
|------|------|
| `AboutSection.tsx` | Avatar + text column layout |
| `index.ts` | Barrel export |

## Layout

```
md+ grid: [ avatar | title, subtitle, location, openTo, body ]
mobile:   avatar centered, then stacked text column
```

All copy lives in the right column so heading and body share one left edge.

## Content fields

- `avatar` (required path), `avatarAlt`, `location`, `openTo`, `title`, `subtitle`, `body`
- `openTo` is availability intent — distinct from `contact.message`; rendered as muted prose, not a badge

## Dependencies

- `@/content` — `loadPortfolio()`
- `@/shared/ui` — `Container`, `Section`

See [ADR 0011](../../../docs/decisions/0011-identity-content-presentation.md).
