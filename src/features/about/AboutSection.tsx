import { loadPortfolio } from '@/content'
import { Container, Section } from '@/shared/ui'

export function AboutSection() {
  const { about, meta } = loadPortfolio()
  const avatarAlt = about.avatarAlt ?? `${meta.name} portrait`

  return (
    <Section id="about" ariaLabel="About">
      <Container>
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-10">
          <img
            src={about.avatar}
            alt={avatarAlt}
            width={128}
            height={128}
            className="mx-auto size-24 shrink-0 rounded-full border border-border/50 object-cover md:mx-0 md:size-32"
          />
          <div className="min-w-0">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {about.title}
            </h2>
            {about.subtitle ? (
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                {about.subtitle}
              </p>
            ) : null}
            {about.location ? (
              <p className="mt-3 text-sm text-muted-foreground">{about.location}</p>
            ) : null}
            {about.openTo ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/85">
                {about.openTo}
              </p>
            ) : null}
            <div className="mt-8 max-w-3xl space-y-4 text-muted-foreground">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
