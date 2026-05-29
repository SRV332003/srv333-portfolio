import { Badge } from '@/components/ui/badge'
import type { Experience } from '@/content'
import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

import {
  experiencePeriodDateTime,
  formatExperiencePeriod,
} from './formatPeriod'

function ExperienceBody({ item }: { item: Experience }) {
  return (
    <>
      {item.summary ? (
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          {item.summary}
        </p>
      ) : null}
      {item.highlights?.length ? (
        <ul className="mt-4 space-y-2.5">
          {item.highlights.map((line) => (
            <li
              key={line}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/80 shadow-[0_0_8px_var(--color-accent-glow)]"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : item.description ? (
        <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
      ) : null}
      {item.skills?.length ? (
        <div className="mt-6 border-t border-border/30 pt-5">
          <p className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">
            Technologies
          </p>
          <ul className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <li key={skill}>
                <Badge variant="outline">{skill}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

export function ExperienceSection() {
  const { experience } = loadPortfolio()

  return (
    <Section id="experience" ariaLabel="Experience">
      <Container>
        <SectionHeading title="Experience" />
        <ol className="space-y-6 md:space-y-8">
          {experience.map((item, index) => (
            <li
              key={`${item.company}-${item.start}`}
              className="relative md:grid md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8"
            >
              {index < experience.length - 1 ? (
                <span
                  className="absolute top-9 left-[5px] hidden h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-accent/50 via-border/40 to-transparent md:left-auto md:right-0 md:top-10 md:block md:h-[calc(100%+2rem)]"
                  aria-hidden
                />
              ) : null}
              <div className="mb-3 flex items-center gap-3 md:mb-0 md:flex-col md:items-end md:gap-2 md:pt-8 md:pr-2">
                <span
                  className="relative z-10 size-2.5 shrink-0 rounded-full bg-accent shadow-[var(--shadow-glow)] ring-2 ring-accent/25"
                  aria-hidden
                />
                <time
                  dateTime={experiencePeriodDateTime(item.start, item.end)}
                  className="text-sm font-medium text-accent tabular-nums"
                >
                  {formatExperiencePeriod(item.start, item.end)}
                </time>
              </div>
              <article className="rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-card/60">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.role}
                  <span className="font-normal text-muted-foreground">
                    {' '}
                    · {item.company}
                  </span>
                </h3>
                <ExperienceBody item={item} />
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
