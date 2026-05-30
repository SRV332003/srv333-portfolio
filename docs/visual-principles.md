# Visual principles

Short guide for the space portfolio visual system (Phase 7).

## Depth

- **Void** is the canvas; content floats on frosted panels and subtle nebula bands.
- Starfield stays visible through header/footer glass and non-band sections.
- Bands ground dense content (projects, experience, contact) without opaque blocks.
- Projects, Experience, and Contact add token-based radial washes (`data-section-wash`) on the band for depth; keep washes subtle so cards, forms, and starfield stay legible.

## Frost

- Use `FrostedPanel` from `@/shared/ui` for tiles — do not duplicate border/bg classes in features.
- Hover: accent border + slightly stronger card fill; keep motion respectful of `prefers-reduced-motion`.

## Accent discipline

- **Primary (teal):** CTAs, role line, outcome values, timeline dots.
- **Accent (orbit):** eyebrows, category labels, featured rings — use sparingly.
- One featured glow per card max; avoid competing glows in the same viewport.

## Type hierarchy

| Level | Token / class | Use |
|-------|---------------|-----|
| Display | `.text-display` + Geist | Hero H1 only |
| Section | `.text-section` + Geist | Section h2, project detail h1 |
| Lead | `text-lg` | Subtitles, hero subhead |
| Body | `text-base` / system-ui | Paragraphs |
| Small | `text-sm` | Meta, labels |

## Motion

- Decorative motion lives in canvas and 3D only — not hero text.
- Respect `prefers-reduced-motion` for scroll, starfield, and scene3d.

## Tokens

Source of truth: `src/styles/tokens.css`. Bridge: `src/styles/globals.css`. No raw hex in feature components.
