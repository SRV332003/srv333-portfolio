import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { loadPortfolio } from '@/content'
import { Container } from '@/shared/ui'

export function Header() {
  const { meta, nav, hero } = loadPortfolio()
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleNavClick() {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/25 backdrop-blur-sm">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link
          to="/"
          className="text-sm font-semibold tracking-wide text-foreground"
        >
          {meta.name}
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={<a href={hero.primaryCta.href} />}
            size="sm"
            className="hidden md:inline-flex"
          >
            {hero.primaryCta.label}
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
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
              <nav className="flex flex-col gap-4 px-4" aria-label="Mobile">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-base text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="px-4 pb-4">
                <Button
                  nativeButton={false}
                  render={<a href={hero.primaryCta.href} onClick={handleNavClick} />}
                  className="w-full"
                >
                  {hero.primaryCta.label}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
