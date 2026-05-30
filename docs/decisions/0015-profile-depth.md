# ADR 0015: Profile depth — achievements, education, employment type

## Status

Accepted

## Context

Phase 12 closes gaps between the portfolio site and résumé/LinkedIn: missing internships (Arcadia, Luneblaze), LC Police project, Github Roaster live URL, contest/scholarship credentials, and explicit education. Recruiters at ~0–2 YOE expect employment type clarity and education visibility without losing the space-themed shell.

## Decision

### Schema extensions

- **`experience.employmentType`:** optional `intern` | `full-time` | `contract` — sole badge on timeline cards (Phase 12 amendment: mission phase badges removed from UI to avoid duplicate Intern/Internship labels)
- **`achievements[]`:** `{ title, organization?, year?, summary }` with `#achievements` section
- **`education[]`:** `{ degree, institution, start?, end?, summary?, highlights? }` with `#education` section
- **`hero.credibilityBadges`:** optional `{ label, detail? }[]` — compact chips under `roleLine`
- **`missionControl.transmissions[].href`:** URL or site-relative path (internal case studies use `/projects/:slug`)

### Mission phase (content-only, not displayed)

`experience[].missionPhase` remains in schema for optional content/legacy use. Timeline UI shows **`employmentType` only** — mission phase badges and legend were removed (Phase 12 amendment) after label overlap with employment type.

Original space metaphor labels if re-enabled: Launch / Orbit / Dock.

### Projects

- LC Police added as featured (not flagship); Go Music remains in All tab only
- Live pill on project cards when `href` is set
- Github Roaster `href`: `https://gitroaster.streamlit.app/`

### Home section order

Hero → Projects → About → Experience → Achievements → Education → Skills → Contact

Nav includes Achievements and Education anchors.

### Mission control

- External transmissions open in new tab; internal paths navigate in-app without `target="_blank"`

## Consequences

- Nav grows to 8 items; mobile sheet scrolls — acceptable for fresher profile depth
- LC Police metrics (14.5K views) published from LinkedIn launch post — update if numbers change
- Real project screenshots and LC Police live URL can be added later without schema changes

## References

- [docs/content-schema.md](../content-schema.md)
- [docs/roadmap.md](../roadmap.md) — Phase 12
