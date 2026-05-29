# Requirements

## Functional requirements

- **FR-1**: Single-page home with hero, driven by validated content in `src/content/portfolio.json`.
- **FR-2**: Navigation and CTAs read from content; no hardcoded copy in feature components.
- **FR-3**: Space-themed visual identity via design tokens and shadcn semantic CSS variables.
- **FR-4**: shadcn/ui used for interactive primitives (buttons now; sheet, dialog, forms in Phase 3).
- **FR-5**: Future phases: about, projects, experience, skills, contact sections; project detail routes.

## Non-functional requirements

- **NFR-1 Performance**: Initial JS bundle suitable for static hosting; lazy-load 3D and heavy dialogs in later phases.
- **NFR-2 Accessibility**: WCAG 2.1 AA target; keyboard operable CTAs; `prefers-reduced-motion` respected.
- **NFR-3 shadcn/a11y**: Use shadcn primitives for focus traps, dialogs, sheets, forms—do not reimplement Radix patterns in features.
- **NFR-4 Maintainability**: Feature-folder isolation; content schema versioned with Zod.
- **NFR-5 Agent-readiness**: `AGENTS.MD` per module; ADRs for architectural decisions; Cursor rules for boundaries.
- **NFR-6 SEO** (Phase 5): Meta tags, OG image, semantic HTML landmarks.

## Out of scope (Phase 1)

- Canvas starfield, R3F 3D, CMS, blog, analytics, contact form backend.
