import type { Achievement } from '@/content'
import { loadPortfolio } from '@/content'
import { Container, FrostedPanel, Section, SectionHeading } from '@/shared/ui'

const PATCH_ICONS = ['🚀', '🛰️', '⭐'] as const

function AchievementPatch({ item, index }: { item: Achievement; index: number }) {
  const icon = PATCH_ICONS[index % PATCH_ICONS.length]
  const meta = [item.organization, item.year ? String(item.year) : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="h-full">
      <FrostedPanel as="article" className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start gap-4">
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xl shadow-[0_0_16px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
            aria-hidden
          >
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            {meta ? (
              <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {meta}
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
          </div>
        </div>
      </FrostedPanel>
    </li>
  )
}

type AchievementsSectionProps = {
  sectionVariant?: 'default' | 'band'
}

export function AchievementsSection({
  sectionVariant = 'default',
}: AchievementsSectionProps) {
  const { achievements, achievementsSection } = loadPortfolio()

  return (
    <Section
      id="achievements"
      ariaLabel="Achievements"
      variant={sectionVariant}
      className="relative overflow-hidden"
    >
      <div
        data-section-wash="achievements"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent_55%)]"
      />
      <Container className="relative">
        <SectionHeading
          title={achievementsSection.title}
          subtitle={achievementsSection.subtitle}
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => (
            <AchievementPatch key={item.title} item={item} index={index} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}
