# ADR 0005: Selective shadcn/ui

## Status

Accepted

## Context

Need accessible interactive widgets without adopting a generic SaaS dashboard look.

## Decision

**Use shadcn for**: focus traps, portals, forms, buttons, sheets, dialogs, tabs.

**Use bespoke (`shared/ui` + features) for**: hero typography, layout, cosmic cards, canvas, 3D.

**Phase 1**: `button` only.

**Phase 3 allowlist**: `sheet`, `tabs`, `dialog`, `input`, `label`, `textarea`, `badge`, `separator`.

**Style**: `base-nova` in `components.json`; theme via token bridge in `globals.css`.

## Rules

- Add components only via `npx shadcn@latest add <name>`
- Do not import Radix/Base UI directly in `src/features/**`
- No shadcn Card as hero

## Consequences

- CLI may write to wrong path if `@/` alias misconfigured—verify files land under `src/`.
