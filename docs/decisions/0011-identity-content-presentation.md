# ADR 0011: Identity content and presentation

## Status

Accepted

## Context

Phase 5 adds recruiter-scannable identity: role clarity, avatar, availability, and resume access. Copy must stay in `portfolio.json`; UI must avoid duplicate “open to” messaging and duplicate resume URLs.

## Decision

### Hero hierarchy

```
eyebrow → headline (H1) → roleLine (plain <p>) → subheadline → CTAs
```

- `roleLine` is required — scannable specialty (not poetic headline copy)
- `roleLine` uses `text-primary` / medium weight; not a heading level

### CTAs and resume — single source

- **`hero.primaryCta`** — `{ label, href }`; label aligns with nav (e.g. `"View projects"` → `#projects`)
- **`hero.secondaryCta`** — optional; label matches nav tone (e.g. `"Contact"` → `#contact`), not cryptic mission copy
- **`meta.resumeUrl`** — site-relative path (e.g. `/assets/resume.pdf`); validated with portfolio refine
- **`meta.resumeLabel`** — optional; UI default `"Resume"` via `getResumeLabel()`
- Header and Hero both read `meta` / `hero` only — no duplicate resume URLs in hero JSON
- Resume opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`)

**Header (`lg+`):** `View projects` primary (`hero.primaryCta`) + `Resume` outline; site name uses `font-display`.

**Hero:** primary + secondary CTAs (`size="lg"`); resume `Button variant="outline" size="lg"` with `FileText` icon — tertiary weight, still visible.

**Mobile sheet:** resume outline + primary CTA full-width.

### About identity

- **`about.avatar`** — required public path
- **`about.avatarAlt`** — optional; fallback `{meta.name} portrait`
- **`about.location`**, **`about.openTo`** — optional; About section only (not hero)
- **`about.softSkills`**, **`about.interests`** — optional; human context in About only (not `#skills` tech chips)
- Layout: `md+` two-column grid — avatar left; right column stacks title, subtitle, location, `openTo`, body, soft skills, interests
- `openTo` renders as a short prose line (`text-sm text-foreground/85`), not a badge — long availability copy reads better as text

### Content separation

| Field | Purpose |
|-------|---------|
| `about.openTo` | Availability / desired work |
| `contact.message` | Contact form intro only — must not duplicate `openTo` |

### Early-career voice (amended — Phase 10 rebrand)

- `roleLine` must match experience level (e.g. ~1+ YOE — avoid “Senior” unless accurate)
- `openTo` targets roles the candidate actually wants (SWE, backend, startups) — not consulting/speaking by default
- Space metaphor in headline/eyebrow is OK; job claims must match `portfolio.json` experience and projects
- Demo persona (Nova Chen / aerospace) replaced with author content from [content-inventory.md](../content-inventory.md) / résumé

### Footer

- No resume link (header + hero sufficient)

### Hero polish (amended — ties to ADR 0013 tokens)

- Eyebrow uses `--color-eyebrow`; H1 `text-balance`; subheadline `text-base` / `max-w-prose`
- Primary CTA uses `--shadow-glow-hero`; planet column uses `--hero-planet-glow` (see ADR 0013)

## Consequences

- Phase 13 SEO uses existing `meta.title` / `meta.description`; dynamic `<title>` deferred
- Replace placeholder avatar/resume/social URLs in content before personal ship
- Nav active state: [ADR 0008](0008-portfolio-sections-routing.md) (scroll-spy)
