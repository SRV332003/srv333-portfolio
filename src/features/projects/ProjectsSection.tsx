import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { loadPortfolio } from '@/content'
import { Container, Section, SectionHeading } from '@/shared/ui'

import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  const { projects } = loadPortfolio()
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const visibleProjects =
    filter === 'featured' ? projects.filter((p) => p.featured) : projects

  return (
    <Section id="projects" ariaLabel="Projects">
      <Container>
        <SectionHeading title="Projects" />
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as 'all' | 'featured')}
        >
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          <TabsContent value={filter}>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <li key={project.slug} className="h-full">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  )
}
