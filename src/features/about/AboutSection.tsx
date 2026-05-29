import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

export function AboutSection() {
  const { about } = loadPortfolio()

  return (
    <Section id="about" ariaLabel="About">
      <Container>
        <SectionHeading title={about.title} subtitle={about.subtitle} />
        <div className="max-w-3xl space-y-4 text-muted-foreground">
          {about.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  )
}
