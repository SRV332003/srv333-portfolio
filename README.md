# srv333-portfolio

Sourav Garg's interactive space-themed developer portfolio — React, Vite, Tailwind CSS v4, shadcn/ui, content-driven architecture, and agent-friendly documentation.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run preview` | Preview production build |

## Edit content

Update [`src/content/portfolio.json`](src/content/portfolio.json). See [docs/content-schema.md](docs/content-schema.md).

## Add shadcn components

```bash
npx shadcn@latest add <component>
```

See [docs/decisions/0005-shadcn-selective.md](docs/decisions/0005-shadcn-selective.md) for allowlist and usage rules.

## Project structure

```
src/
  app/           # Router and providers
  content/       # JSON + Zod schema
  features/      # Portfolio sections
  shared/ui/     # Marketing layout components
  components/ui/ # shadcn primitives
  styles/        # tokens.css + globals.css
docs/            # Requirements, patterns, ADRs
.cursor/         # Rules, agent skills, MCP (mcp.json)
```

## For AI agents

Start at [AGENTS.MD](AGENTS.MD).

## MCP (Cursor)

Project MCP servers live in [`.cursor/mcp.json`](.cursor/mcp.json). This repo includes the [Playwright MCP](https://github.com/microsoft/playwright-mcp) for browser automation in the agent.

Reload MCP in Cursor after cloning: **Settings → MCP** or restart the editor.

## Code intelligence (optional)

After your first commit, index the repo for GitNexus:

```bash
npx gitnexus analyze
```

## Environment

Copy `.env.example` to `.env` when adding analytics or site URL (Phase 5).

## Roadmap

[docs/roadmap.md](docs/roadmap.md) — Phases 2–5: canvas, sections, 3D, polish.
