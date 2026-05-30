import type { Portfolio } from '../../content/schema'

function siteBase(origin: string): string {
  return origin.replace(/\/$/, '')
}

function parseLocationLocality(location: string | undefined): string | undefined {
  if (!location) return undefined
  const part = location.split('·')[0]?.trim()
  return part?.split(',')[0]?.trim() || part
}

export function buildHomeJsonLd(portfolio: Portfolio, origin: string): Record<string, unknown> {
  const { meta, about, experience } = portfolio
  const base = siteBase(origin)
  const homeUrl = `${base}/`
  const sameAs = meta.social
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//.test(href))

  const currentRole = experience.find((item) => item.end === 'present')
  const locality = parseLocationLocality(about.location)

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': `${homeUrl}#person`,
    name: meta.name,
    url: homeUrl,
    jobTitle: 'Software Engineer',
    description: meta.description,
    sameAs,
  }

  if (currentRole) {
    person.worksFor = {
      '@type': 'Organization',
      name: currentRole.company,
    }
  }

  if (locality) {
    person.address = {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressCountry: 'IN',
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${homeUrl}#website`,
        url: homeUrl,
        name: meta.name,
        description: meta.description,
        publisher: { '@id': `${homeUrl}#person` },
      },
      person,
    ],
  }
}

export function buildSitemapXml(origin: string, paths: string[]): string {
  const base = siteBase(origin)
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = paths
    .map((path) => {
      const loc = path === '/' ? `${base}/` : `${base}${path}`
      const priority = path === '/' ? '1.0' : '0.8'
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobotsTxt(origin: string): string {
  const base = siteBase(origin)
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
}
