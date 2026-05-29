# hero

Hero section with headline, role line, CTAs, resume link, and decorative lazy 3D planet accent.

## Content

- `hero.roleLine` — between H1 and subheadline; recruiter-scannable
- Resume from `meta.resumeUrl` + `getResumeLabel(meta)` — not a separate hero href field
- Hero resume: tertiary `ghost` button with `FileText` icon (header uses `outline`)

## Hierarchy

`eyebrow → headline → roleLine → subheadline → CTAs (primary, secondary, resume)`

## 3D accent

- Import `HeroPlanetScene` from `@/features/scene3d`
- Wrapper: `pointer-events-none`, `aria-hidden`, `data-scene3d="hero"`

See [ADR 0010](../../../docs/decisions/0010-scene3d-performance.md), [ADR 0011](../../../docs/decisions/0011-identity-content-presentation.md).
