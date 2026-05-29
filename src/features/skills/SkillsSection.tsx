import { Badge } from '@/components/ui/badge'
import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

export function SkillsSection() {
  const { skills } = loadPortfolio()

  return (
    <Section id="skills" ariaLabel="Skills">
      <Container>
        <SectionHeading title="Skills" />
        <div className="grid gap-8 md:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary">{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
