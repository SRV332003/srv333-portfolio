# Mission control feature

## Purpose

Keyboard easter egg (`?`) opens a mission-control dialog with nav shortcuts and external transmission links.

## Files

| File | Role |
|------|------|
| `MissionControlProvider.tsx` | Open state + shortcut hook; mount in shell `Layout` |
| `MissionControlDialog.tsx` | shadcn Dialog UI from `missionControl` content |
| `useMissionControlShortcut.ts` | `?` toggle; skips editable fields |
| `index.ts` | Barrel export |

## Dependencies

- `@/content` — `loadPortfolio().missionControl`
- `@/components/ui/dialog`, `badge`

## Rules

- No hardcoded copy in TSX (content from JSON only).
- Shell `Layout` is the only importer — no other feature imports.
- Do not attach shortcuts to starfield/canvas layers.

## Reference

[ADR 0014](../../../docs/decisions/0014-phase9-delight.md)
