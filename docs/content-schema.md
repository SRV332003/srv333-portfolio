# Content schema guide

Edit **`src/content/portfolio.json`** together with **`src/content/schema.ts`** when adding fields.

Run `npm run typecheck` after changes; invalid JSON fails at `loadPortfolio()` via Zod.

## `meta`

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `title` | string | Document title (future `<title>`) |
| `description` | string | Meta description |
| `ogImage` | string? | Open Graph image path (Phase 13) |
| `resumeUrl` | string | Site-relative PDF path (e.g. `/assets/resume.pdf`) — single source for header + hero |
| `resumeLabel` | string? | Button label; UI default `"Resume"` |
| `social` | array | `{ label, href }` footer links — use real profile URLs before personal ship |

## `nav`

Array of `{ label, href }` for anchor or route links. Nav order prioritizes Projects after Home.

## `about`

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `subtitle` | Optional supporting line |
| `avatar` | Required public path (e.g. `/assets/avatar.png`) |
| `avatarAlt` | Optional image alt text |
| `location` | Optional (e.g. `Bay Area · Pacific Time`) — About only |
| `openTo` | Optional availability line — **not** the contact form intro; shown in About as muted prose |
| `body` | Array of paragraphs |

## `hero`

| Field | Description |
|-------|-------------|
| `eyebrow` | Small label above headline |
| `headline` | Main H1 text |
| `roleLine` | Recruiter-scannable specialty (plain text under H1) |
| `credibilityBadges` | Optional `{ label, detail? }[]` — compact chips under roleLine (Phase 12) |
| `subheadline` | Supporting paragraph |
| `primaryCta` | `{ label, href }` |
| `secondaryCta` | optional second CTA |

## `projectsSection`

| Field | Description |
|-------|-------------|
| `title` | Section heading (e.g. Projects) |
| `subtitle` | Optional supporting line under the heading |

## `projects`

| Field | Description |
|-------|-------------|
| `title`, `slug`, `summary` | Required |
| `body` | array of paragraphs (min 1) for `/projects/:slug` detail page; `body[0]` should state the problem |
| `tech` | string array |
| `href`, `repo` | optional URLs |
| `featured` | Required boolean for tab filter and card highlight |
| `image` | Site-relative path (e.g. `/assets/projects/orbital-telemetry.png`) — required for demo portfolio |
| `imageAlt` | Optional hero/thumbnail alt text |
| `role` | Optional contributor role |
| `year` | Optional ship year (integer, e.g. `2024`) |
| `domain` | Optional problem space (e.g. `Mission operations`) |
| `outcomes` | Optional array of `{ value, label }` metrics — min 1 required for demo portfolio |
| `flagship` | Required boolean; one richest case study spans wider on home grid |

Loaders: `getProjectBySlug(slug)`, `getAllProjectSlugs()`.

## `experienceSection`

| Field | Description |
|-------|-------------|
| `title` | Section heading (e.g. Experience) |
| `subtitle` | Optional supporting line under the heading |

## `experience`

| Field | Description |
|-------|-------------|
| `role`, `company` | Required |
| `start` | `YYYY-MM` (e.g. `2022-03`) — displayed as `Mar 2022` |
| `end` | `YYYY-MM` or `"present"` |
| `employmentType` | Optional `intern` \| `full-time` \| `contract` — badge on timeline card |
| `missionPhase` | Optional `launch` \| `orbit` \| `dock` — **not shown in UI** (schema/content only; see ADR 0015 amendment) |
| `summary` | Optional one-line intro under company |
| `highlights` | Optional bullet list (achievements) |
| `skills` | Optional tech tags for this role |
| `description` | Legacy single paragraph (use if no summary/highlights) |

At least one of `description`, `summary`, or `highlights` is required.

See [ADR 0009](decisions/0009-experience-content-presentation.md) for date formatting and per-role vs global skills.

## `achievementsSection` / `achievements` (Phase 12)

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `subtitle` | Optional supporting line |

Each achievement: `{ title, organization?, year?, summary }` — rendered as mission-patch cards in `#achievements`.

## `educationSection` / `education` (Phase 12)

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `subtitle` | Optional supporting line |

Each entry: `{ degree, institution, start?, end?, summary?, highlights? }` — dates use same `YYYY-MM` format as experience.

## `skillsSection`

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `subtitle` | Optional supporting line |

## `skills`

`category` + `items[]` per group — open 2-column layout with outline badges (no frosted card per group).

## `contactSection`

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `subtitle` | Optional supporting line |

## `contact`

`email`, `message` (form hint inside the contact panel — keep distinct from `about.openTo`).

## `missionControl`

Phase 9 mission-control panel (keyboard `?` easter egg):

| Field | Description |
|-------|-------------|
| `title` | Dialog heading |
| `hint` | Footer hint text (e.g. “Press ? for mission control”) |
| `shortcuts` | `{ label, href }[]` — in-page anchors or site paths |
| `transmissions` | `{ label, href, kind? }[]` — external URLs or site paths (e.g. `/projects/lc-police`) |

See [ADR 0014](decisions/0014-phase9-delight.md).
