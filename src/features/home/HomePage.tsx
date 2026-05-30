import { HomePageMeta } from '@/features/home/HomePageMeta'
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
      <HomePageMeta />
      <Hero />
      <ExperienceSection sectionVariant="band" />
      <ProjectsSection sectionVariant="default" />
      <AboutSection />
      <SkillsSection />
      <ContactSection sectionVariant="band" />
    </Layout>
  )
}
