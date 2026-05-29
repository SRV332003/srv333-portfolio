# src/components/

## Purpose

shadcn/ui primitives (generated + lightly customized).

## ui/

- `button.tsx` — CTAs (Base UI + CVA)

## Adding components

```bash
npx shadcn@latest add <name>
```

Verify files land in `src/components/ui/`, not a literal `@/` folder.

## Constraints

- Prefer CLI add over hand-copying from docs.
- Extend via CVA variants or feature wrappers — avoid large one-off class strings in generated files.
- Theme via `globals.css` tokens, not per-component hex.
- See `.cursor/rules/shadcn-ui.mdc`
