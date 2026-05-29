# Requirements

## Functional requirements

- **FR-1**: Single-page home with hero, about, projects, experience, skills, and contact sections, driven by validated content in `src/content/portfolio.json`.
- **FR-2**: Navigation and CTAs read from content; no hardcoded copy in feature components.
- **FR-3**: Space-themed visual identity via design tokens and shadcn semantic CSS variables.
- **FR-4**: shadcn/ui used for interactive primitives (button, sheet, tabs, badge, separator, form controls).
- **FR-5**: Project grid on home with All/Featured tabs; `/projects/:slug` detail pages with body copy, tech badges, and external CTAs.
- **FR-6**: Contact form with client Zod validation opens `mailto:` link (no backend).
- **FR-7**: Mobile sheet navigation on small viewports; closes on link click.
- **FR-8**: Full-page animated starfield with pointer repulsion, horizontal background parallax, and scroll parallax; static fallback when `prefers-reduced-motion: reduce`. Hero text does not move (see ADR 0007).
- **FR-9**: Decorative 3D planet visual in the hero via lazy-loaded React Three Fiber; auto-rotate only, no pointer interaction on meshes (see ADR 0010).

## Non-functional requirements

- **NFR-1 Performance**: Initial JS bundle suitable for static hosting; lazy-load 3D (`features/scene3d`) and heavy dialogs; `three` in separate Vite chunk; single hero WebGL Canvas on home.
- **NFR-2 Accessibility**: WCAG 2.1 AA target; keyboard operable CTAs; `prefers-reduced-motion` respected.
- **NFR-3 shadcn/a11y**: Use shadcn primitives for focus traps, dialogs, sheets, forms—do not reimplement Radix patterns in features.
- **NFR-4 Maintainability**: Feature-folder isolation; content schema versioned with Zod.
- **NFR-5 Agent-readiness**: `AGENTS.MD` per module; ADRs for architectural decisions; Cursor rules for boundaries.
- **NFR-6 SEO** (Phase 5): Meta tags, OG image, semantic HTML landmarks.
- **NFR-7 Canvas**: Cap particles and DPR; pause animation when tab hidden; decorative canvas `aria-hidden`.
- **NFR-8 Scene3D**: Cap DPR (1.5 mobile / 2 desktop); pause rotation when tab hidden; reduced-motion CSS fallback; single mesh per scene in Phase 4.

## Out of scope (Phase 1)

- R3F 3D, CMS, blog, analytics, contact form backend.

## Out of scope (Phase 2)

- Phase 3 sections, shadcn sheet/dialog, constellation tooltips (Phase 2b optional).

## Out of scope (Phase 3)

- Contact backend / Formspree / email API.
- Project quick-view Dialog (detail route used instead).
- SEO meta / OG (Phase 5).
