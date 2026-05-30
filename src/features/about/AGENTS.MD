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
md+ grid: [ avatar + social | location, openTo callout, body ]
mobile:   avatar centered, social links, then stacked text column
```

- Section wash (`data-section-wash="about"`) — transparent section, no frosted card grid
- Avatar: primary ring + soft glow; social links from `meta.social` under avatar
- `openTo`: left-border callout (`data-about-open-to`), not a badge — distinct from `contact.message`

## Content fields

- `avatar` (required path), `avatarAlt`, `location`, `openTo`, `title`, `subtitle`, `body`
- `openTo` is availability intent — distinct from `contact.message`; rendered as muted prose, not a badge

## Dependencies

- `@/content` — `loadPortfolio()`
- `@/shared/ui` — `Container`, `Section`

See [ADR 0011](../../../docs/decisions/0011-identity-content-presentation.md).
