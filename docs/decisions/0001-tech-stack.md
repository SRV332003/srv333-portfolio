# ADR 0001: Tech stack

## Status

Accepted

## Context

Need a modern, agent-friendly portfolio stack with fast dev feedback and strong typing.

## Decision

- **React 19** + **Vite 8** + **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **shadcn/ui** (base-nova style, copy-paste components)
- **Zod** for content validation
- **React Router** for future multi-route pages

## Consequences

- Agents can rely on familiar React patterns and shadcn CLI.
- Tailwind v4 uses CSS-first config in `src/styles/globals.css`.
- shadcn v4 uses `@base-ui/react` for some primitives (e.g. Button).
