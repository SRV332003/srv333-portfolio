import { Badge } from '@/components/ui/badge'
import type { SkillGroup } from '@/content'
import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

function SkillGroupBlock({ group }: { group: SkillGroup }) {
  return (
    <li>
      <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">
        {group.category}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item}>
            <Badge variant="outline">{item}</Badge>
          </li>
        ))}
      </ul>
    </li>
  )
}

export function SkillsSection() {
  const { skills, skillsSection } = loadPortfolio()

  return (
    <Section id="skills" ariaLabel="Skills" className="relative overflow-hidden">
      <div
        data-section-wash="skills"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_100%,color-mix(in_srgb,var(--color-accent)_8%,transparent),transparent_55%)]"
      />
      <Container className="relative">
        <SectionHeading
          title={skillsSection.title}
          subtitle={skillsSection.subtitle}
        />
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
          {skills.map((group) => (
            <SkillGroupBlock key={group.category} group={group} />
          ))}
        </ul>
      </Container>
    </Section>
  )
}
