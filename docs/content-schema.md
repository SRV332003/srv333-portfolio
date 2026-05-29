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

Array of `{ label, href }` for anchor or route links.

## `hero`

| Field | Description |
|-------|-------------|
| `eyebrow` | Small label above headline |
| `headline` | Main H1 text |
| `subheadline` | Supporting paragraph |
| `primaryCta` | `{ label, href }` |
| `secondaryCta` | optional second CTA |

## `about`

`title` + `body` (array of paragraphs).

## `projects`

| Field | Description |
|-------|-------------|
| `title`, `slug`, `summary` | Required |
| `tech` | string array |
| `href`, `repo` | optional URLs |
| `featured` | boolean for grid highlight |

## `experience`

`role`, `company`, `period`, `description`.

## `skills`

`category` + `items[]` per group.

## `contact`

`title`, `email`, `message`.
