# Deploy checklist

## Before first deploy

1. Set `VITE_SITE_URL` in the host environment (e.g. `https://your-domain.com`, no trailing slash). Required for absolute Open Graph URLs, `dist/sitemap.xml`, and production `dist/robots.txt`.
2. Add `public/assets/og.png` (1200×630 recommended) or keep the generated copy from `avatar.png` until a custom OG image is ready.
3. Replace duplicate project thumbnails if needed (`binge-chat.png` should be a real product screenshot).
4. Run `npm run typecheck && npm run lint && npm run test:e2e && npm run build`.

## After deploy

1. Verify `<title>`, meta description, `link[rel=canonical]`, and JSON-LD on home; check one project detail URL.
2. Test share preview: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), Twitter Card Validator.
3. Confirm `https://your-domain.com/sitemap.xml` and `robots.txt` include the `Sitemap:` line (generated at build when `VITE_SITE_URL` is set).
4. Submit the sitemap in [Google Search Console](https://search.google.com/search-console).
5. Update résumé and LinkedIn with the live URL.

## Suggested hosts

Vercel, Netlify, and Cloudflare Pages work with Vite static output (`dist/`). Set build command `npm run build` and output directory `dist`.
