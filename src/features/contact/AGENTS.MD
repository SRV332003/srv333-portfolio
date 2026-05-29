# Contact feature

## Purpose

Renders the `#contact` section with a client-side Zod-validated form that opens a `mailto:` link.

## Files

| File | Role |
|------|------|
| `ContactSection.tsx` | Form (name, email, message) → mailto |
| `mailto.ts` | `buildMailtoUrl()` helper (testable, shared encoding) |
| `index.ts` | Barrel export |

## Dependencies

- `@/content` — `loadPortfolio().contact`
- `@/components/ui` — button, input, label, textarea
- `@/shared/ui`

## Pattern

On valid submit, `ContactSection` sets `window.location.href` from `buildMailtoUrl()` in `mailto.ts`. No backend.

## Rules

- No hardcoded copy except form field labels (UI chrome).
- No cross-feature imports.
