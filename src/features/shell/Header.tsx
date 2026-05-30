import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileTextIcon, MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getResumeLabel, loadPortfolio } from '@/content'
import { Container, SocialBrandIcon, type SocialBrandLabel } from '@/shared/ui'

import {
  isNavItemActive,
  mobileNavLinkClassName,
  navLinkClassName,
} from './navActive'
import { useScrollSpySection } from './useScrollSpySection'

const headerCtaContentHoverClass =
  'inline-flex items-center gap-1.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover/button:scale-[1.06] group-active/button:scale-100'

const HEADER_SOCIAL_LABELS = ['GitHub', 'LinkedIn'] as const satisfies readonly SocialBrandLabel[]

/** Hero is not in nav links but participates in scroll-spy at the top of the page. */
const SCROLL_SPY_LEAD_SECTION = '#hero'

export function Header() {
  const { meta, nav, hero } = loadPortfolio()
  const resumeLabel = getResumeLabel(meta)
  const headerSocialLinks: { label: SocialBrandLabel; href: string }[] =
    HEADER_SOCIAL_LABELS.flatMap((label) => {
      const link = meta.social.find((item) => item.label === label)
      return link ? [{ label, href: link.href }] : []
    })
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const navSectionIds = nav
    .map((item) => item.href)
    .filter((href) => href.startsWith('#'))
  const scrollSpySectionIds = [SCROLL_SPY_LEAD_SECTION, ...navSectionIds]
  const scrollSection = useScrollSpySection(scrollSpySectionIds, pathname === '/')

  function isActive(href: string) {
    return isNavItemActive(href, pathname, hash, scrollSection)
  }

  function handleNavClick() {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/15 bg-background/5 backdrop-blur-sm">
      <Container as="div" className="flex h-16 items-center justify-between gap-2">
        <Link
          to="/"
          className="shrink-0 font-display text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary md:text-lg"
        >
          <span className="sr-only">Home — </span>
          {meta.name}
        </Link>
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-1.5"
          aria-label="Main"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={navLinkClassName(isActive(item.href))}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {headerSocialLinks.map((link) => (
            <Button
              key={link.href}
              nativeButton={false}
              render={
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                />
              }
              variant="ghost"
              size="icon-sm"
              className="hidden size-11 min-h-11 min-w-11 md:inline-flex"
            >
              <span className={headerCtaContentHoverClass}>
                <SocialBrandIcon label={link.label} />
              </span>
            </Button>
          ))}
          <Button
            nativeButton={false}
            render={
              <a
                href={meta.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="sm"
            className="hidden min-h-11 shadow-[var(--shadow-glow-hero)] md:inline-flex"
          >
            <span className={headerCtaContentHoverClass}>
              <FileTextIcon className="size-4" aria-hidden />
              {resumeLabel}
            </span>
          </Button>
          <Button
            nativeButton={false}
            render={<a href={hero.primaryCta.href} />}
            variant="outline"
            size="sm"
            className="hidden min-h-11 md:inline-flex"
          >
            <span className={headerCtaContentHoverClass}>{hero.primaryCta.label}</span>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-11 min-h-11 min-w-11 md:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)]">
              <SheetHeader>
                <SheetTitle>{meta.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2" aria-label="Mobile">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={mobileNavLinkClassName(isActive(item.href))}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              {headerSocialLinks.length ? (
                <div className="flex items-center gap-2 px-4">
                  {headerSocialLinks.map((link) => (
                    <Button
                      key={link.href}
                      nativeButton={false}
                      render={
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          onClick={handleNavClick}
                        />
                      }
                      variant="outline"
                      size="icon-sm"
                      className="size-11 min-h-11 min-w-11"
                    >
                      <SocialBrandIcon label={link.label} />
                    </Button>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-col gap-3 px-4 pb-4">
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={meta.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNavClick}
                    />
                  }
                  className="w-full shadow-[var(--shadow-glow-hero)]"
                >
                  <span className={headerCtaContentHoverClass}>
                    <FileTextIcon className="size-4" aria-hidden />
                    {resumeLabel}
                  </span>
                </Button>
                <Button
                  nativeButton={false}
                  render={<a href={hero.primaryCta.href} onClick={handleNavClick} />}
                  variant="outline"
                  className="w-full"
                >
                  <span className={headerCtaContentHoverClass}>
                    {hero.primaryCta.label}
                  </span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
