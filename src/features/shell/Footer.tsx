import { loadPortfolio } from '@/content'
import { Container } from '@/shared/ui'

export function Footer() {
  const { meta, missionControl } = loadPortfolio()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border/50 bg-background/35 shadow-[0_-12px_40px_color-mix(in_srgb,var(--color-void)_60%,transparent)] backdrop-blur-md">
      <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            © {year} {meta.name}. All rights reserved.
          </p>
          <p
            data-mission-control-hint
            className="text-xs text-muted-foreground/70"
          >
            {missionControl.hint}
          </p>
        </div>
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
