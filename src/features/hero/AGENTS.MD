# hero

Hero section with headline, role line, CTAs, resume link, and decorative lazy 3D planet accent.

## Content

- Resume from `meta.resumeUrl` in header only (not duplicated in hero)
- `hero.headline` — single tagline under name; keep short
- `hero.credibilityBadges` — max 3 labels in UI; details via `title` tooltip

## Hierarchy

`eyebrow → H1 (meta.name) → headline → credibilityBadges? (≤3) → CTAs (primary + GitHub/LinkedIn from meta.social)`

Primary CTA label aligns with nav ("View projects"); repeated in hero and header (`lg+`) for persistent access.

## 3D accent

- Import `HeroPlanetScene` from `@/features/scene3d`
- Wrapper: `pointer-events-none`, `aria-hidden`, `data-scene3d="hero"`

See [ADR 0010](../../../docs/decisions/0010-scene3d-performance.md), [ADR 0011](../../../docs/decisions/0011-identity-content-presentation.md).
