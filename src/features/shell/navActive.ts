const navLinkBase =
  'text-sm transition-colors px-3 py-1 rounded-full motion-safe:transition-[color,background-color,box-shadow]'

export function isNavItemActive(
  href: string,
  pathname: string,
  hash: string,
  scrollSection?: string | null,
): boolean {
  if (!href.startsWith('#')) {
    return pathname === href
  }
  if (pathname.startsWith('/projects')) {
    return href === '#projects'
  }
  if (pathname !== '/') {
    return false
  }
  const current = scrollSection ?? (hash || '#hero')
  return current === href
}

export function navLinkClassName(isActive: boolean): string {
  return isActive
    ? `${navLinkBase} font-medium text-foreground bg-primary/15 ring-1 ring-primary/25`
    : `${navLinkBase} text-muted-foreground hover:text-foreground`
}

export function mobileNavLinkClassName(isActive: boolean): string {
  return isActive
    ? 'text-base font-medium text-foreground rounded-lg bg-primary/15 px-3 py-2 ring-1 ring-primary/25'
    : 'text-base text-muted-foreground transition-colors hover:text-foreground px-3 py-2 rounded-lg'
}
