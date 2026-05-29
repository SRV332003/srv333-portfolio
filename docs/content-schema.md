# Content schema guide

Edit **`src/content/portfolio.json`** together with **`src/content/schema.ts`** when adding fields.

Run `npm run typecheck` after changes; invalid JSON fails at `loadPortfolio()` via Zod.

## `meta`

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `title` | string | Document title (future `<title>`) |
| `description` | string | Meta description |
| `ogImage` | string? | Open Graph image path |
| `social` | array | `{ label, href }` footer/header links |

## `nav`

Array of `{ label, href }` for anchor or route links. Nav order prioritizes Projects after Home.

## `about`

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `subtitle` | Optional supporting line |
| `body` | Array of paragraphs |

## `hero`

| Field | Description |
|-------|-------------|
| `eyebrow` | Small label above headline |
| `headline` | Main H1 text |
| `subheadline` | Supporting paragraph |
| `primaryCta` | `{ label, href }` |
| `secondaryCta` | optional second CTA |

## `projects`

| Field | Description |
|-------|-------------|
| `title`, `slug`, `summary` | Required |
| `body` | array of paragraphs (min 1) for `/projects/:slug` detail page |
| `tech` | string array |
| `href`, `repo` | optional URLs |
| `featured` | boolean for tab filter and grid highlight |

Loaders: `getProjectBySlug(slug)`, `getAllProjectSlugs()`.

## `experience`

| Field | Description |
|-------|-------------|
| `role`, `company` | Required |
| `start` | `YYYY-MM` (e.g. `2022-03`) — displayed as `Mar 2022` |
| `end` | `YYYY-MM` or `"present"` |
| `summary` | Optional one-line intro under company |
| `highlights` | Optional bullet list (achievements) |
| `skills` | Optional tech tags for this role |
| `description` | Legacy single paragraph (use if no summary/highlights) |

At least one of `description`, `summary`, or `highlights` is required.

See [ADR 0009](decisions/0009-experience-content-presentation.md) for date formatting and per-role vs global skills.

## `skills`

`category` + `items[]` per group.

## `contact`

`title`, `email`, `message`.
