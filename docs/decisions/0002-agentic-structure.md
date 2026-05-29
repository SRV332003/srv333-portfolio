# ADR 0002: Agentic structure

## Status

Accepted

## Context

The codebase should be navigable and safe for AI agents and human contributors.

## Decision

- **`AGENTS.MD` tree** at repo root and under `src/*` modules
- **`docs/`** for requirements, patterns, roadmap, content guide
- **ADRs** in `docs/decisions/`
- **Cursor rules** in `.cursor/rules/`
- **Project skills** in `.cursor/skills/`

## Agent workflow

1. Read root `AGENTS.MD` → module `AGENTS.MD`
2. Check `docs/requirements.md` and ADRs
3. Minimal diffs; update docs when module API changes
4. `npm run typecheck` before done

## Consequences

- Higher upfront documentation cost, lower regression risk for agent edits.
