import { Button } from '@/components/ui/button'
import { loadPortfolio } from '@/content'
import { HeroPlanetScene } from '@/features/scene3d'
import { Container, Section } from '@/shared/ui'

import { HeroSocialIcon } from './HeroSocialIcon'

const MAX_HERO_BADGES = 3
const HERO_SOCIAL_LABELS = ['GitHub', 'LinkedIn'] as const
const heroCtaContentHoverClass =
  'inline-flex items-center gap-1.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover/button:scale-[1.06] group-active/button:scale-100'
type HeroSocialLabel = (typeof HERO_SOCIAL_LABELS)[number]

export function Hero() {
  const { hero, meta } = loadPortfolio()
  const badges = hero.credibilityBadges?.slice(0, MAX_HERO_BADGES) ?? []
  const heroSocialLinks: { label: HeroSocialLabel; href: string }[] =
    HERO_SOCIAL_LABELS.flatMap((label) => {
      const link = meta.social.find((item) => item.label === label)
      return link ? [{ label, href: link.href }] : []
    })

  return (
    <Section id="hero" className="relative pt-10 pb-20 md:pt-20 md:pb-28">
      <Container className="relative grid max-w-6xl md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
        <div className="relative z-10">
          <p className="mb-4 text-sm font-medium tracking-widest text-[var(--color-eyebrow)] uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="max-w-3xl text-balance font-display text-[clamp(2.75rem,7vw,4.25rem)] leading-[1.05] font-bold tracking-tight">
            <span className="bg-gradient-to-br from-foreground from-30% via-primary to-accent bg-clip-text text-transparent">
              {meta.name}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-xl font-semibold leading-snug text-foreground/90 md:text-2xl">
            {hero.headline}
          </p>
          {badges.length ? (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
              {badges.map((badge) => (
                <li key={badge.label}>
                  <span
                    className="inline-flex rounded-full border border-border/50 bg-card/40 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-sm"
                    title={badge.detail}
                  >
                    {badge.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              nativeButton={false}
              render={<a href={hero.primaryCta.href} />}
              size="lg"
              className="shadow-[var(--shadow-glow-hero)]"
            >
              <span className={heroCtaContentHoverClass}>{hero.primaryCta.label}</span>
            </Button>
            {heroSocialLinks.map((link) => (
              <Button
                key={link.href}
                nativeButton={false}
                render={
                  <a href={link.href} target="_blank" rel="noopener noreferrer" />
                }
                variant="outline"
                size="lg"
              >
                <span className={heroCtaContentHoverClass}>
                  <HeroSocialIcon label={link.label} />
                  {link.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full md:max-w-none">
          <div
            className="pointer-events-none absolute inset-0 scale-110 rounded-full opacity-45 blur-3xl"
            aria-hidden
            style={{ background: 'var(--hero-planet-glow)' }}
          />
          <div
            className="pointer-events-none relative mx-auto h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:size-[400px]"
            data-scene3d="hero"
            aria-hidden
          >
            <HeroPlanetScene />
          </div>
        </div>
      </Container>
    </Section>
  )
}
