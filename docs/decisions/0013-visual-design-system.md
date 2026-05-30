# ADR 0013: Visual design system

## Status

Accepted (amended — post–Phase 7 section polish)

## Context

Phase 7 unifies tokens, typography, section rhythm, and frosted surfaces so the portfolio reads as one product. Phases 5–6 added identity and case studies with duplicated card classes and inconsistent section headings.

## Decision

### Tokens and contrast

- **`--color-star-dim`:** `#b8b3c9` (was `#9b95b0`) — targets **≥ 4.5:1** contrast on `--color-void` for normal muted text (WCAG AA)
- **`--color-nebula-band`:** subtle section band background via `color-mix` of nebula-light over void
- **`--color-accent-glow`:** reduced to `0.28` opacity for softer featured rings after contrast bump
- **`--color-eyebrow`:** mix of star-dim + primary for hero eyebrow contrast
- **`--shadow-glow-hero`:** softer primary glow on hero/header primary CTAs
- **`--hero-planet-glow`:** CSS radial stack behind hero planet; `Scene3DFallback` and hero blur column use the same token ([ADR 0010](0010-scene3d-performance.md))

### Typography

- **Geist Variable** imported in `globals.css` (`@fontsource-variable/geist`); applied via `--font-display` on `h1–h3` and header site name
- **Body** remains `system-ui` (`--font-body`)
- **Type scale CSS vars:** `--text-display`, `--text-section`, `--text-lead`, `--text-body`, `--text-small`
- Utility classes `.text-display`, `.text-section` in `globals.css`

### FrostedPanel

Shared component in `@/shared/ui/FrostedPanel`:

- Base: `rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm`
- Optional hover when `interactive` (default true)
- Used by project cards (wrapper), experience articles, outcome metric cells
- **Padding:** experience/project cards pass `p-6` / `md:p-7` on `FrostedPanel` — the component has no default padding

### Section rhythm

- `Section` accepts `variant: 'default' | 'band'`
- Band sections: `data-section-variant="band"`, nebula band bg, `border-y border-border/20`
- **Band sections:** Projects, Experience, Contact (default `sectionVariant="band"` on those features)
- **Transparent:** Hero, About, Skills (starfield visible)

### Section nebula washes (amended)

Token-based radial overlays on band sections (`pointer-events-none`, `overflow-hidden` on section):

| Section | Attribute | Placement intent |
|---------|-----------|------------------|
| Projects | `data-section-wash="projects"` | Accent top-right, orbit lower-left |
| Experience | `data-section-wash="experience"` | Orbit left, accent lower-right |
| Contact | `data-section-wash="contact"` | Accent bottom-center, orbit top-center |

See [visual-principles.md](../visual-principles.md). Content above washes uses `Container` with `relative`.

### SectionHeading

- Marketing sections use `SectionHeading` for h2 scale (`text-section`)
- **Content-driven intros:** `projectsSection`, `experienceSection` (`title`, optional `subtitle`); About/Contact use their feature content objects
- About: heading above avatar grid; location/openTo/body in grid column

### Shell (ADR 0007 unchanged)

- Header/footer opacity values **not** increased
- Mobile menu trigger: `min-h-11 min-w-11` (44px tap target)
- Hero mobile: `pt-10` (was `pt-12`) for above-fold primary CTA

## Consequences

- Hero 3D and fallback sample Phase 7 tokens (`--color-accent`, orbit, void) via `readSceneColors()` — see ADR 0010 Phase 8 amendment
- Automated axe contrast audit optional future work; ratio documented here
- Project cards: focus ring on stretched `Link` (`z-10`), not FrostedPanel

## References

- [ADR 0007](0007-canvas-interaction-ux.md) — shell chrome
- [ADR 0008](0008-portfolio-sections-routing.md) — nav scroll-spy
- [ADR 0011](0011-identity-content-presentation.md) — hero/header CTA polish
- [ADR 0012](0012-project-case-studies.md) — projects grid polish
- [ADR 0009](0009-experience-content-presentation.md) — experience timeline polish
- [ADR 0010](0010-scene3d-performance.md) — hero planet layering and `--hero-planet-glow` fallback
- [docs/visual-principles.md](../visual-principles.md)
