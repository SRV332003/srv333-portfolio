# src/app/

## Purpose

Thin application shell: providers and route table only.

## Files

| File | Role |
|------|------|
| `App.tsx` | Wraps `Providers` + `AppRoutes` |
| `providers.tsx` | `BrowserRouter` (extend with theme later) |
| `routes.tsx` | Route definitions; lazy-load future pages here |

## Constraints

- No feature UI in this folder.
- New routes: add to `routes.tsx`, implement page under `features/`.
