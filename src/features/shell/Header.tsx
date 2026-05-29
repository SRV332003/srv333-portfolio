import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { loadPortfolio } from '@/content'
import { Container } from '@/shared/ui'

export function Header() {
  const { meta, nav, hero } = loadPortfolio()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
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
        <Button
          nativeButton={false}
          render={<a href={hero.primaryCta.href} />}
          size="sm"
        >
          {hero.primaryCta.label}
        </Button>
      </Container>
    </header>
  )
}
