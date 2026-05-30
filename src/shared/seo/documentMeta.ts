export type PageMeta = {
  title: string
  description: string
  ogImage?: string
  path?: string
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
  upsertMeta('property', 'og:url', absoluteUrl(canonicalPath))

  if (meta.ogImage) {
    const imageUrl = absoluteUrl(meta.ogImage)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('name', 'twitter:image', imageUrl)
  }
}
