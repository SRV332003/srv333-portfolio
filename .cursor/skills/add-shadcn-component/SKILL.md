---
name: add-shadcn-component
description: Add a shadcn/ui component via CLI with allowlist check and token bridge verification. Use for sheet, dialog, tabs, form controls.
---

# Add shadcn component

## Checklist

1. Read [docs/decisions/0005-shadcn-selective.md](../../docs/decisions/0005-shadcn-selective.md) allowlist.
2. Run `npx shadcn@latest add <component>` from repo root.
3. Confirm files are under `src/components/ui/`, not `@/`.
4. Open `src/styles/globals.css` — verify semantic colors still use space token bridge.
5. Wrap usage in a feature component; do not import Base UI in features.
6. Update [src/components/AGENTS.MD](../../src/components/AGENTS.MD) if needed.
7. Run `npm run typecheck` and `npm run build`.

## Phase 3 allowlist

sheet, tabs, dialog, input, label, textarea, badge, separator
