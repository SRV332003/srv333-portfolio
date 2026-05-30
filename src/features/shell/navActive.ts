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
    ? 'text-sm font-medium text-foreground underline decoration-primary/60 decoration-2 underline-offset-4'
    : 'text-sm text-muted-foreground transition-colors hover:text-foreground'
}
