# Code patterns

## Feature modules

- One folder per portfolio section under `src/features/<name>/`.
- Public API via `index.ts`; other modules import from the barrel only.
- **Never** import across sibling features (e.g. `hero` must not import from `projects`).
- **Never** import `@radix-ui/*` or `@base-ui/*` directly in features—use `@/components/ui/*`.

## Imports

- Use `@/` alias for all internal imports.
- Content: `import { loadPortfolio } from '@/content'`.
- Marketing layout: `@/shared/ui`.
- Primitives: `@/components/ui/<component>`.

## Two UI layers

| Layer | Path | Use |
|-------|------|-----|
| Marketing | `src/shared/ui/` | Container, Section, bespoke cards/typography |
| shadcn | `src/components/ui/` | Button, Sheet, Dialog, Tabs, form controls |

## Token bridge (shadcn ↔ space)

| shadcn variable | Space token |
|-----------------|-------------|
| `--background` | `--color-void` |
| `--foreground` | `--color-star` |
| `--primary` | `--color-accent` |
| `--primary-foreground` | `--color-void` |
| `--secondary` | `--color-nebula-light` |
| `--muted-foreground` | `--color-star-dim` |
| `--accent` | `--color-orbit` |
| `--ring`, `--border` | orbit-derived mixes |

Source of truth: `src/styles/tokens.css`. Bridge: `src/styles/globals.css`.

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

1. Check ADR 0005 allowlist.
2. Run CLI; files land in `src/components/ui/`.
3. Verify semantic colors still match space theme.
4. Update `src/components/AGENTS.MD` if new export patterns apply.

## Forbidden patterns

- Hardcoded hex/rgb in feature TSX (use tokens or `bg-background`, `text-primary`).
- shadcn `Card` as hero layout (dashboard aesthetic).
- Duplicate `Button` in `shared/ui`.
- Copy/paste in components—use `portfolio.json`.

## Lazy loading

- Route-level: `React.lazy` for `/projects/:slug` — import `@/features/projects/ProjectDetailPage` directly, **not** from the barrel (`index.ts` omits `ProjectDetailPage` so the home bundle does not pull detail code).
- Canvas: `StarfieldCanvas` lazy inside `StarfieldBackground`.
- 3D: `HeroPlanetScene` lazy via `features/scene3d`; inner `*Inner.tsx` dynamically imported. Use `useInViewport` for future below-the-fold mounts. Wrappers use `data-scene3d="hero"` for tests.

## Scene3D import rules

- WebGL components live only in `src/features/scene3d/`
- Feature sections (e.g. `hero/`) may import from `@/features/scene3d` barrel
- **Never** import shadcn or `shared/ui` inside R3F child components
- **Never** add Canvas to `shell/Layout.tsx` — 3D is opt-in per section ([ADR 0003](decisions/0003-hybrid-visuals.md), [ADR 0010](decisions/0010-scene3d-performance.md))
- Home uses one hero Canvas; avoid duplicate generic 3D sections before proof-of-work content

## Bespoke card pattern (projects + experience)

Shared visual language for section “tiles”:

- Frosted panel: `rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm`
- Hover: `hover:border-accent/40 hover:bg-card/60`
- shadcn `Badge` for tech/skills; **no** shadcn `Card`

See [ADR 0009](decisions/0009-experience-content-presentation.md) for experience timeline specifics.

## Project card grid

- Grid list items use `h-full`; card article uses `h-full flex flex-col` so row heights match.
- Summary uses `flex-1` to push tag row to the bottom; tag `<ul>` uses `min-h-14` for consistent badge area when tags wrap.

## Stretched link cards

`ProjectCard` makes the entire card clickable without nesting interactive elements:

1. Absolute `Link` with `inset-0` covers the article.
2. Content wrapper has `pointer-events-none` so clicks pass through to the link.
3. No nested links inside the card (external URLs live on the detail page only).

```tsx
<article className="relative ...">
  <Link to={...} className="absolute inset-0 ..." aria-label={...} />
  <div className="relative ... pointer-events-none">{/* content */}</div>
</article>
```

## Experience section

- Structured dates (`start`/`end` in JSON) formatted as `MMM YYYY` in `features/experience/formatPeriod.ts`.
- Timeline rail + frosted entry cards; see [ADR 0009](decisions/0009-experience-content-presentation.md).

## Section composition (Phase 3)

- `HomePage` stacks section features; no cross-feature imports between sections.
- Anchor IDs match `portfolio.json` `nav` (`#about`, `#projects`, `#experience`, `#skills`, `#contact`).
- Shared headings via `SectionHeading` in `@/shared/ui`.
- Smooth scroll on `html`; disabled when `prefers-reduced-motion: reduce` ([ADR 0007](decisions/0007-canvas-interaction-ux.md)).

## Project routing

- Cards link to `/projects/:slug`; external `href`/`repo` on detail page only.
- `getProjectBySlug()` / `getAllProjectSlugs()` in `@/content`.
- Unknown slug: in-app 404, link home.

## Contact (mailto)

- Zod-validated form in `features/contact/ContactSection`.
- URL built by `buildMailtoUrl()` in `features/contact/mailto.ts`; valid submit sets `window.location.href`.
- See [ADR 0008](decisions/0008-portfolio-sections-routing.md).

## Mobile nav

- Header sheet (`md:hidden` trigger); desktop nav unchanged.
- Close sheet on link click.

## Canvas (Phase 2)

- Import backdrop only from `@/features/canvas` (typically `shell/Layout.tsx`).
- Do not put canvas logic in `shared/ui` or shadcn components.
- **Interaction model**: see [ADR 0007](decisions/0007-canvas-interaction-ux.md).
  - Hero text stays fixed (no DOM parallax).
  - Pointer parallax is **horizontal-only** on star draw positions.
  - Repulsion/glow on physics layer; parallax on draw layer.
- Tune in `features/canvas/lib/constants.ts` (`DRIFT_SPEED`, `CANVAS_PARALLAX_*`, `REPULSION_*`).

## Shell chrome

- Header/footer glass styling: [ADR 0007](decisions/0007-canvas-interaction-ux.md) — keep semi-transparent so stars show through.
