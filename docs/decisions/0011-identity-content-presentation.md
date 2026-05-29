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

### Resume — single source

- **`meta.resumeUrl`** — site-relative path (e.g. `/assets/resume.pdf`); validated with portfolio refine
- **`meta.resumeLabel`** — optional; UI default `"Resume"` via `getResumeLabel()`
- Header and Hero both read `meta` only — no `hero.resumeCta.href`
- Opens in new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- **Header:** `Button variant="outline" size="sm"`, visible `lg+` between nav and primary CTA; outline in mobile sheet
- **Hero:** tertiary `Button variant="ghost" size="lg"` with optional `FileText` icon — lower visual weight than primary/secondary CTAs

### About identity

- **`about.avatar`** — required public path
- **`about.avatarAlt`** — optional; fallback `{meta.name} portrait`
- **`about.location`**, **`about.openTo`** — optional; About section only (not hero)
- Layout: `md+` two-column grid — avatar left; right column stacks title, subtitle, location, `openTo`, and body paragraphs (shared text alignment)
- `openTo` renders as a short prose line (`text-sm text-foreground/85`), not a badge — long availability copy reads better as text

### Content separation

| Field | Purpose |
|-------|---------|
| `about.openTo` | Availability / desired work |
| `contact.message` | Contact form intro only — must not duplicate `openTo` |

### Footer

- No resume link (header + hero sufficient)

## Consequences

- Phase 10 SEO uses existing `meta.title` / `meta.description`; dynamic `<title>` deferred
- Replace placeholder avatar/resume/social URLs in content before personal ship
