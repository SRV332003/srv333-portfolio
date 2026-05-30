import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

import { AboutBackground } from './AboutBackground'

export function AboutSection() {
  const { about, meta } = loadPortfolio()
  const avatarAlt = about.avatarAlt ?? `${meta.name} portrait`

  return (
    <Section id="about" ariaLabel="About" className="relative overflow-hidden">
      <div
        data-section-wash="about"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_20%_50%,color-mix(in_srgb,var(--color-orbit)_10%,transparent),transparent_55%)]"
      />
      <Container className="relative">
        <SectionHeading title={about.title} subtitle={about.subtitle} />
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-10 lg:gap-12">
          <div className="mx-auto shrink-0 md:mx-0">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_18%,transparent),transparent_70%)] blur-md"
                aria-hidden
              />
              <img
                src={about.avatar}
                alt={avatarAlt}
                width={128}
                height={128}
                className="relative size-24 rounded-full border border-primary/30 object-cover shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_15%,transparent)] md:size-32"
              />
            </div>
            {meta.social.length ? (
              <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
                {meta.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="min-w-0">
            {about.location ? (
              <p className="text-sm font-medium tracking-wide text-accent uppercase">
                {about.location}
              </p>
            ) : null}
            {about.openTo ? (
              <p
                className="mt-4 max-w-2xl border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/90"
                data-about-open-to
              >
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
            {about.softSkills?.length ? (
              <div className="mt-10 max-w-3xl" data-about-soft-skills>
                <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">
                  How I work
                </h3>
                <ul className="mt-4 space-y-3">
                  {about.softSkills.map((line) => (
                    <li
                      key={line}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/80 shadow-[0_0_8px_var(--color-accent-glow)]"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {about.interests?.length ? (
              <div className="mt-10 max-w-3xl" data-about-interests>
                <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">
                  Beyond code
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {about.interests.join(' · ')}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <AboutBackground />
      </Container>
    </Section>
  )
}
