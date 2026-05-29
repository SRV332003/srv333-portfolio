# ADR 0004: Content-driven UI

## Status

Accepted

## Context

Portfolio copy and structure change often; UI should not embed strings.

## Decision

- Single source: `src/content/portfolio.json`
- Validation: Zod schemas in `src/content/schema.ts`
- Loader: `loadPortfolio()` in `src/content/index.ts`
- Features call `loadPortfolio()` or receive props from a parent—no inline marketing copy

## Consequences

- Content edits rarely touch TSX.
- Schema changes require updating JSON and docs/content-schema.md.
