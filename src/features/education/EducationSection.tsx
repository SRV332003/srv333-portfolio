import { Badge } from '@/components/ui/badge'
import type { Education } from '@/content'
import { loadPortfolio } from '@/content'
import { Container, FrostedPanel, Section, SectionHeading } from '@/shared/ui'

import {
  experiencePeriodDateTime,
  formatExperiencePeriod,
} from '@/features/experience/formatPeriod'

function formatEducationPeriod(item: Education): string | null {
  if (!item.start && !item.end) return null
  const start = item.start ?? item.end!
  const end = item.end ?? item.start!
  return formatExperiencePeriod(start, end)
}

function EducationCard({ item }: { item: Education }) {
  const period = formatEducationPeriod(item)
  const dateTime =
    item.start && item.end
      ? experiencePeriodDateTime(item.start, item.end)
      : undefined

  return (
    <FrostedPanel as="article" className="p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{item.degree}</h3>
          <p className="mt-1 text-sm text-accent">{item.institution}</p>
        </div>
        {period ? (
          <time
            dateTime={dateTime}
            className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground"
          >
            {period}
          </time>
        ) : null}
      </div>
      {item.summary ? (
        <p className="mt-4 text-sm font-medium text-primary">{item.summary}</p>
      ) : null}
      {item.highlights?.length ? (
        <ul className="mt-5 space-y-3">
          {item.highlights.map((line) => (
            <li
              key={line}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/80 shadow-[0_0_8px_var(--color-primary)]"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </FrostedPanel>
  )
}

type EducationSectionProps = {
  sectionVariant?: 'default' | 'band'
}

export function EducationSection({ sectionVariant = 'band' }: EducationSectionProps) {
  const { education, educationSection } = loadPortfolio()

  return (
    <Section
      id="education"
      ariaLabel="Education"
      variant={sectionVariant}
      className="relative overflow-hidden"
    >
      <div
        data-section-wash="education"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_90%_30%,color-mix(in_srgb,var(--color-orbit)_12%,transparent),transparent_52%)]"
      />
      <Container className="relative">
        <SectionHeading
          title={educationSection.title}
          subtitle={educationSection.subtitle}
        />
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge variant="outline" className="text-[0.65rem] tracking-widest uppercase">
            Ground school
          </Badge>
        </div>
        <ul className="space-y-6">
          {education.map((item) => (
            <li key={`${item.institution}-${item.degree}`}>
              <EducationCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
