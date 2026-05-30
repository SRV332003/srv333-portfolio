import { FileTextIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getResumeLabel, loadPortfolio } from '@/content'
import { HeroPlanetScene } from '@/features/scene3d'
import { Container, Section } from '@/shared/ui'

export function Hero() {
  const { hero, meta } = loadPortfolio()
  const resumeLabel = getResumeLabel(meta)

  return (
    <Section id="hero" className="relative pt-10 pb-20 md:pt-20 md:pb-28">
      <Container className="relative grid max-w-6xl md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
        <div className="relative z-10">
          <p className="mb-4 text-sm font-medium tracking-widest text-[var(--color-eyebrow)] uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="text-display max-w-3xl text-balance font-bold tracking-tight text-foreground">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-primary md:text-xl">
            {hero.roleLine}
          </p>
          {hero.credibilityBadges?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {hero.credibilityBadges.map((badge) => (
                <li key={badge.label}>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/40 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-sm"
                    title={badge.detail}
                  >
                    {badge.label}
                    {badge.detail ? (
                      <span className="text-muted-foreground">· {badge.detail}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              nativeButton={false}
              render={<a href={hero.primaryCta.href} />}
              size="lg"
              className="shadow-[var(--shadow-glow-hero)]"
            >
              {hero.primaryCta.label}
            </Button>
            {hero.secondaryCta ? (
              <Button
                nativeButton={false}
                render={<a href={hero.secondaryCta.href} />}
                variant="outline"
                size="lg"
              >
                {hero.secondaryCta.label}
              </Button>
            ) : null}
            <Button
              nativeButton={false}
              render={
                <a
                  href={meta.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              size="lg"
            >
              <FileTextIcon className="size-4" aria-hidden />
              {resumeLabel}
            </Button>
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
