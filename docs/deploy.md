# Deploy checklist

## Before first deploy

1. Set `VITE_SITE_URL` in the host environment (e.g. `https://your-domain.com`) so Open Graph tags use absolute URLs.
2. Add `public/assets/og.png` (1200×630 recommended) or keep the generated copy from `avatar.png` until a custom OG image is ready.
3. Replace duplicate project thumbnails if needed (`binge-chat.png` should be a real product screenshot).
4. Run `npm run typecheck && npm run lint && npm run test:e2e && npm run build`.

## After deploy

1. Verify `<title>` and meta description on home and one project detail URL.
2. Test share preview: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), Twitter Card Validator.
3. Add `Sitemap: https://your-domain.com/sitemap.xml` to `public/robots.txt` when sitemap is published.
4. Update résumé and LinkedIn with the live URL.

## Suggested hosts

Vercel, Netlify, and Cloudflare Pages work with Vite static output (`dist/`). Set build command `npm run build` and output directory `dist`.
