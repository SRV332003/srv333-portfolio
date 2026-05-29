import { loadPortfolio } from '@/content'
import { Container } from '@/shared/ui'

export function Footer() {
  const { meta } = loadPortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {meta.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-4">
          {meta.social.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
