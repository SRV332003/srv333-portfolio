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

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **proj1** (160 symbols, 226 relationships, 2 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/proj1/context` | Codebase overview, check index freshness |
| `gitnexus://repo/proj1/clusters` | All functional areas |
| `gitnexus://repo/proj1/processes` | All execution flows |
| `gitnexus://repo/proj1/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.cursor/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.cursor/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.cursor/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.cursor/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.cursor/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.cursor/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
