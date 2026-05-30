# Content inventory — personal rebrand worksheet

Fill this in **before** Phases 10–12 touch `portfolio.json`. The site keeps the **space visual theme**; copy and facts should reflect **your** startup path (~1+ year, intern + full-time).

**Design rule:** Space = look and feel. Startups = what you claim you built.

When done, hand this to an agent (or paste into chat) to implement Phases 10–11.

---

## 1. Identity (`meta` + `hero`)

| Field | Your answer |
|-------|-------------|
| **Full name** (`meta.name`) | |
| **Page title** (`meta.title`) — e.g. `Your Name — Software Engineer` | |
| **Meta description** (1–2 sentences for Google/LinkedIn previews) | |
| **GitHub URL** | |
| **LinkedIn URL** | |
| **Email** | |
| **Location** (`about.location`) — city/timezone | |

### Hero

| Field | Your answer |
|-------|-------------|
| **Eyebrow** — short label (space metaphor OK, e.g. “Building at startup speed”) | |
| **Headline** — H1 (poetic OK; avoid fake aerospace job titles) | |
| **Role line** — honest scannable line (e.g. `Software engineer · full-stack · React & Node · 1+ years`) | |
| **Subheadline** — 1–2 sentences: what you build, what you want next | |
| **Open to** (`about.openTo`) — roles you want (SWE I, intern, new grad, etc.) — no “consulting/speaking” unless true | |

---

## 2. About (`about.body`)

Two short paragraphs (plain language):

**Paragraph 1 — what you do / where you’ve worked:**

```
(paste here)
```

**Paragraph 2 — how you work / what you’re learning:**

```
(paste here)
```

---

## 3. Experience (newest first)

List every role: internships + full-time. Match dates to your résumé.

### Role 1 (most recent)

| Field | Your answer |
|-------|-------------|
| Job title | |
| Company (or “Stealth fintech startup” if anonymous) | |
| Employment type | intern / full-time / contract |
| Start (`YYYY-MM`) | |
| End (`YYYY-MM` or `present`) | |
| Mission phase (optional) | `orbit` = current FT · `launch` = intern/first role · `dock` = middle role |
| One-line summary | |
| Highlights (2–4 bullets — believable scale) | 1. |
| | 2. |
| | 3. |
| Tech used (tags) | |

### Role 2

| Field | Your answer |
|-------|-------------|
| Job title | |
| Company | |
| Employment type | |
| Start / End | |
| Mission phase | |
| Summary + highlights + tech | |

### Role 3+ (if any)

```
(add blocks as needed)
```

---

## 4. Projects (2–4 pieces of work)

Pick work you can explain in an interview. At least one should be **flagship** (best story).

### Project A (flagship?)

| Field | Your answer |
|-------|-------------|
| Title | |
| URL slug (kebab-case, e.g. `order-dashboard`) | |
| One-line summary | |
| Your role (e.g. `Full-stack intern`) | |
| Year | |
| Domain (e.g. `B2B SaaS`, `Internal tools`) | |
| Featured on home? | yes / no |
| Flagship (widest card)? | yes / no |
| **Problem** (body paragraph 1) | |
| **What you built** (body paragraph 2) | |
| **Outcome** (body paragraph 3) | |
| Outcome metrics (1–3) — honest numbers | value / label |
| Tech stack | |
| Live URL (if any) | |
| Repo URL (if any) | |
| Screenshot available? | yes / need placeholder |

### Project B

(copy table or write “same as above”)

### Project C (optional)

---

## 5. Skills (`skills`)

Only list what you’ve **used on real work** or strong side projects.

| Category | Items |
|----------|--------|
| Frontend | |
| Backend | |
| Tools / other | |

Remove items you can’t defend in an interview (e.g. Kubernetes if never used).

---

## 6. Mission control (`missionControl`)

Space-themed UI stays; **transmissions** should be your links (or leave empty to remove).

| Field | Your answer |
|-------|-------------|
| Dialog title (default: “Mission control”) | |
| Footer hint (default: “Press ? for mission control”) | |
| Transmission 1 — label + URL + kind (`article` / `talk`) | |
| Transmission 2 | |
| Transmission 3 (optional) | |

---

## 7. Section subtitles (optional polish)

| Section | Current (demo) | Your subtitle |
|---------|----------------|---------------|
| Projects | Mission-critical systems… | |
| Experience | Ground systems, mission operations… | e.g. Internships and full-time roles at early-stage startups |

---

## 8. Assets checklist

- [ ] `public/assets/avatar.png` — your photo
- [ ] `public/assets/resume.pdf` — current résumé
- [ ] `public/assets/og-image.png` — social preview (Phase 13)
- [ ] `public/assets/projects/<slug>.png` — one per project (or note “use placeholder until ready”)

---

## 9. Credibility check (before ship)

- [ ] No “Senior” title unless accurate
- [ ] Timeline matches résumé (total experience ~1+ year)
- [ ] No aerospace/mission-control claims unless you did that work
- [ ] Metrics are defensible in an interview
- [ ] `openTo` matches jobs you actually want

---

## Next phases (after this worksheet)

| Phase | What happens |
|-------|----------------|
| **10 — Identity & voice** | Hero, about, meta, mission-control copy; e2e de-hardcoded from “Nova Chen” demo |
| **11 — Real work portfolio** | Replace demo projects + experience; images; amend ADR 0012 |
| **12 — Fresher affordances** (optional) | `employmentType`, education section, relax strict project schema |
| **13 — SEO** | Title, OG, sitemap (uses your real meta) |
| **14 — QA** | Lighthouse, a11y, expanded e2e |
| **15 — Ship** | Deploy + CI |

See [roadmap.md](./roadmap.md).
