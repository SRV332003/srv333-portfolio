import { AboutSection } from '@/features/about'
import { ContactSection } from '@/features/contact'
import { ExperienceSection } from '@/features/experience'
import { Hero } from '@/features/hero'
import { ProjectsSection } from '@/features/projects'
import { Layout } from '@/features/shell'
import { SkillsSection } from '@/features/skills'

export function HomePage() {
  return (
    <Layout>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </Layout>
  )
}
