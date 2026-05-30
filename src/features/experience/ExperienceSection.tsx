import { Badge } from '@/components/ui/badge'
import type { Experience } from '@/content'
import { loadPortfolio } from '@/content'
import { cn } from '@/lib/utils'
import { Container, FrostedPanel, Section, SectionHeading } from '@/shared/ui'

import {
  experiencePeriodDateTime,
  formatExperienceDuration,
  formatExperiencePeriod,
} from './formatPeriod'
import { EmploymentTypeBadge } from './EmploymentTypeBadge'

function isPresentRole(item: Experience): boolean {
  return item.end === 'present'
}

function ExperienceBody({ item }: { item: Experience }) {
  return (
    <>
      {item.summary ? (
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {item.summary}
        </p>
      ) : null}
      {item.highlights?.length ? (
        <ul className="mt-5 space-y-3">
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
        <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
      ) : null}
      {item.skills?.length ? (
        <div className="mt-8 border-t border-border/30 pt-6">
          <p className="mb-4 text-xs font-semibold tracking-widest text-primary uppercase">
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

type ExperienceTimelineItemProps = {
  item: Experience
}

function ExperienceTimelineItem({ item }: ExperienceTimelineItemProps) {
  const present = isPresentRole(item)
  const duration = formatExperienceDuration(item.start, item.end)

  return (
    <li className="group/experience relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[2.5rem_9.5rem_minmax(0,1fr)] md:gap-x-6">
      <div className="row-span-2 flex justify-center pt-1 md:row-span-1 md:pt-8">
        <span
          className={cn(
            'relative z-10 shrink-0 rounded-full ring-2 transition-shadow',
            present
              ? 'size-3.5 bg-primary shadow-[var(--shadow-glow)] ring-primary/35'
              : 'size-2.5 bg-accent shadow-[0_0_12px_var(--color-accent-glow)] ring-accent/25 group-hover/experience:shadow-[var(--shadow-glow)]',
          )}
          aria-hidden
        />
      </div>

      <time
        dateTime={experiencePeriodDateTime(item.start, item.end)}
        className={cn(
          'col-start-2 row-start-1 mb-2 block text-sm font-medium tabular-nums md:col-start-2 md:row-start-1 md:mb-0 md:pt-8 md:text-right',
          present
            ? 'text-primary'
            : 'text-accent group-hover/experience:text-foreground',
        )}
      >
        <span className="whitespace-nowrap">{formatExperiencePeriod(item.start, item.end)}</span>
        {present ? (
          <span className="mt-1 block text-[0.65rem] font-semibold tracking-widest text-primary/80 uppercase md:mt-1.5">
            Current
          </span>
        ) : null}
      </time>

      <FrostedPanel
        as="article"
        className={cn(
          'col-start-2 row-start-2 p-6 md:col-start-3 md:row-start-1 md:p-7',
          present && 'ring-1 ring-primary/20',
        )}
      >
        {item.employmentType ? (
          <div className="flex flex-wrap items-center gap-2">
            <EmploymentTypeBadge type={item.employmentType} />
          </div>
        ) : null}
        <h3
          className={cn(
            'text-lg font-semibold text-foreground',
            item.employmentType ? 'mt-2' : null,
          )}
        >
          {item.role}
          <span className="font-normal text-accent"> · {item.company}</span>
        </h3>
        <p
          className="mt-1 text-sm tabular-nums text-muted-foreground"
          data-experience-duration
        >
          {duration}
          {present ? (
            <span className="text-primary/80"> · ongoing</span>
          ) : null}
        </p>
        <ExperienceBody item={item} />
      </FrostedPanel>
    </li>
  )
}

type ExperienceSectionProps = {
  sectionVariant?: 'default' | 'band'
}

export function ExperienceSection({
  sectionVariant = 'band',
}: ExperienceSectionProps) {
  const { experience, experienceSection } = loadPortfolio()

  return (
    <Section
      id="experience"
      ariaLabel="Experience"
      variant={sectionVariant}
      className="relative overflow-hidden"
    >
      <div
        data-section-wash="experience"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_0%_45%,color-mix(in_srgb,var(--color-orbit)_14%,transparent),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_80%,color-mix(in_srgb,var(--color-accent)_6%,transparent),transparent)]"
      />
      <Container className="relative">
        <SectionHeading
          title={experienceSection.title}
          subtitle={experienceSection.subtitle}
        />
        <div className="relative">
          <div
            data-timeline-spine
            aria-hidden
            className="pointer-events-none absolute top-3 bottom-3 left-5 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/55 via-accent/40 to-border/25 shadow-[0_0_12px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] md:left-5"
          />
          <ol className="relative space-y-8 md:space-y-10">
            {experience.map((item) => (
              <ExperienceTimelineItem
                key={`${item.company}-${item.start}`}
                item={item}
              />
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
