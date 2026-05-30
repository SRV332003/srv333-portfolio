export type PageMeta = {
  title: string
  description: string
  ogImage?: string
  path?: string
  siteName?: string
}

export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined
  if (configured) {
    return configured.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

export function absoluteUrl(path: string): string {
  const origin = getSiteOrigin()
  const normalized = path.startsWith('/') ? path : `/${path}`
  return origin ? `${origin}${normalized}` : normalized
}

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function applyPageMeta(meta: PageMeta): void {
  document.title = meta.title
  upsertMeta('name', 'description', meta.description)
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)

  const canonicalPath = meta.path ?? '/'
  const canonicalUrl = absoluteUrl(canonicalPath)
  upsertLink('canonical', canonicalUrl)
  upsertMeta('property', 'og:url', canonicalUrl)

  if (meta.siteName) {
    upsertMeta('property', 'og:site_name', meta.siteName)
  }

  if (meta.ogImage) {
    const imageUrl = absoluteUrl(meta.ogImage)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('name', 'twitter:image', imageUrl)
  }
}
