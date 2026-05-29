import { Button } from '@/components/ui/button'
import { loadPortfolio } from '@/content'
import { Container, Section } from '@/shared/ui'

export function Hero() {
  const { hero } = loadPortfolio()

  return (
    <Section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--color-orbit) 30%, transparent), transparent 50%), radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 45%)',
        }}
      />
      <Container className="relative">
        <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
          {hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
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
        </div>
      </Container>
    </Section>
  )
}
