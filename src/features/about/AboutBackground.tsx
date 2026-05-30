import type { Achievement, Education } from '@/content'
import { loadPortfolio } from '@/content'

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

function CompactAchievement({ item }: { item: Achievement }) {
  const meta = [item.organization, item.year ? String(item.year) : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="rounded-lg border border-border/50 bg-card/30 p-4">
      <h4 className="font-semibold text-foreground">{item.title}</h4>
      {meta ? (
        <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">{meta}</p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
    </li>
  )
}

function CompactEducation({ item }: { item: Education }) {
  const period = formatEducationPeriod(item)
  const dateTime =
    item.start && item.end
      ? experiencePeriodDateTime(item.start, item.end)
      : undefined

  return (
    <article className="rounded-lg border border-border/50 bg-card/30 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-foreground">{item.degree}</h4>
          <p className="mt-1 text-sm text-accent">{item.institution}</p>
        </div>
        {period ? (
          <time
            dateTime={dateTime}
            className="shrink-0 text-sm tabular-nums text-muted-foreground"
          >
            {period}
          </time>
        ) : null}
      </div>
      {item.summary ? (
        <p className="mt-3 text-sm font-medium text-primary">{item.summary}</p>
      ) : null}
      {item.highlights?.length ? (
        <ul className="mt-4 space-y-2">
          {item.highlights.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/80" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export function AboutBackground() {
  const { achievements, achievementsSection, education, educationSection } =
    loadPortfolio()

  return (
    <div className="mt-14 space-y-14 border-t border-border/40 pt-14">
      <section aria-labelledby="about-achievements-heading">
        <h3
          id="about-achievements-heading"
          className="text-xs font-semibold tracking-widest text-accent uppercase"
        >
          {achievementsSection.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {achievementsSection.subtitle}
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {achievements.map((item) => (
            <CompactAchievement key={item.title} item={item} />
          ))}
        </ul>
      </section>
      <section aria-labelledby="about-education-heading">
        <h3
          id="about-education-heading"
          className="text-xs font-semibold tracking-widest text-accent uppercase"
        >
          {educationSection.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {educationSection.subtitle}
        </p>
        <ul className="mt-6 space-y-4">
          {education.map((item) => (
            <li key={`${item.institution}-${item.degree}`}>
              <CompactEducation item={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
