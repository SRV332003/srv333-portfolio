import { FileTextIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getResumeLabel, loadPortfolio } from '@/content'
import { HeroPlanetScene } from '@/features/scene3d'
import { Container, Section } from '@/shared/ui'

export function Hero() {
  const { hero, meta } = loadPortfolio()
  const resumeLabel = getResumeLabel(meta)

  return (
    <Section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28">
      <Container className="relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,450px)]">
        <div className="relative z-10">
          <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-primary md:text-xl">
            {hero.roleLine}
          </p>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {hero.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              nativeButton={false}
              render={<a href={hero.primaryCta.href} />}
              size="lg"
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
              variant="ghost"
              size="lg"
            >
              <FileTextIcon className="size-4" aria-hidden />
              {resumeLabel}
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full md:max-w-none">
          <div
            className="pointer-events-none absolute inset-0 scale-110 rounded-full opacity-70 blur-3xl"
            aria-hidden
            style={{
              background:
                'radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 65%), radial-gradient(circle at 55% 55%, color-mix(in srgb, var(--color-orbit) 22%, transparent), transparent 60%)',
            }}
          />
          <div
            className="pointer-events-none relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:size-[450px]"
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
