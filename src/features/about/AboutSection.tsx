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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,color-mix(in_srgb,var(--color-orbit)_10%,transparent),transparent_55%)] md:bg-[radial-gradient(ellipse_60%_45%_at_20%_50%,color-mix(in_srgb,var(--color-orbit)_10%,transparent),transparent_55%)]"
      />
      <Container className="relative">
        <SectionHeading
          title={about.title}
          subtitle={about.subtitle}
          className="text-center md:text-left [&_p]:mx-auto md:[&_p]:mx-0"
        />
        <div className="grid w-full justify-items-center gap-8 md:grid-cols-[auto_1fr] md:justify-items-start md:items-start md:gap-10 lg:gap-12">
          <div className="flex w-full flex-col items-center text-center md:w-auto md:shrink-0 md:items-start md:text-left">
            <div className="relative inline-block">
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
          <div className="w-full min-w-0 max-w-3xl text-center md:max-w-none md:text-left">
            {about.location ? (
              <p className="text-sm font-medium tracking-wide text-accent uppercase">
                {about.location}
              </p>
            ) : null}
            {about.openTo ? (
              <p
                className="mx-auto mt-4 max-w-2xl rounded-lg border border-primary/30 bg-card/20 px-4 py-3 text-sm leading-relaxed text-foreground/90 md:mx-0 md:rounded-none md:border-0 md:border-l-2 md:border-primary/40 md:bg-transparent md:py-0 md:pl-4"
                data-about-open-to
              >
                {about.openTo}
              </p>
            ) : null}
            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-muted-foreground md:mx-0">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            {about.softSkills?.length ? (
              <div className="mx-auto mt-10 max-w-3xl md:mx-0" data-about-soft-skills>
                <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">
                  How I work
                </h3>
                <ul className="mt-4 space-y-3">
                  {about.softSkills.map((line) => (
                    <li
                      key={line}
                      className="flex flex-col items-center gap-2 text-sm leading-relaxed text-muted-foreground md:flex-row md:items-start md:gap-3 md:text-base"
                    >
                      <span
                        className="size-1.5 shrink-0 rounded-full bg-accent/80 shadow-[0_0_8px_var(--color-accent-glow)] md:mt-2"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {about.interests?.length ? (
              <div className="mx-auto mt-10 max-w-3xl md:mx-0" data-about-interests>
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
