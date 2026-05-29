# Space Portfolio — Agent entry

## Purpose

Interactive space-themed portfolio. Phase 1: scaffold, content-driven hero, shadcn CTAs, agent harness.

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # TypeScript
npm run lint       # ESLint
npx shadcn@latest add <component>  # new UI primitive (see ADR 0005)
```

## Module map

| Path | AGENTS.MD |
|------|-----------|
| `src/app/` | [src/app/AGENTS.MD](src/app/AGENTS.MD) |
| `src/content/` | [src/content/AGENTS.MD](src/content/AGENTS.MD) |
| `src/features/` | [src/features/AGENTS.MD](src/features/AGENTS.MD) |
| `src/shared/` | [src/shared/AGENTS.MD](src/shared/AGENTS.MD) |
| `src/components/` | [src/components/AGENTS.MD](src/components/AGENTS.MD) |
| `src/` | [src/AGENTS.MD](src/AGENTS.MD) |

## Docs

- [docs/README.md](docs/README.md) — index
- [docs/patterns.md](docs/patterns.md) — conventions
- [docs/decisions/](docs/decisions/) — ADRs

## Two UI layers

1. **Marketing** — `src/shared/ui/` (layout, sections)
2. **shadcn** — `src/components/ui/` (buttons, dialogs, forms)

## Agent checklist

1. Read this file → target module `AGENTS.MD`
2. UI work? Pick marketing vs shadcn layer ([ADR 0005](docs/decisions/0005-shadcn-selective.md))
3. Copy change? Edit `portfolio.json` + schema only
4. New shadcn primitive? Use `.cursor/skills/add-shadcn-component/`
5. New section? Use `.cursor/skills/add-portfolio-section/`
6. `npm run typecheck` before done

## Boundaries

- **Always**: minimal diffs; match existing patterns; validate content with Zod
- **Ask first**: new dependencies; ADR-worthy architecture changes
- **Never**: hardcode marketing copy in features; import Radix in features; edit plan files

## MCP (repo-level)

Playwright MCP is configured in [`.cursor/mcp.json`](.cursor/mcp.json) (committed with the repo). Reload MCP in Cursor after clone if tools do not appear.

## Optional

After first commit: `npx gitnexus analyze` for code graph indexing.
