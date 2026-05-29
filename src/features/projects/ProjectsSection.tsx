import { useMemo, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Project } from '@/content'
import { loadPortfolio } from '@/content'
import { cn } from '@/lib/utils'
import { Container, Section, SectionHeading } from '@/shared/ui'

import { ProjectCard } from './ProjectCard'

function sortProjectsForDisplay(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.flagship !== b.flagship) return a.flagship ? -1 : 1
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return 0
  })
}

type ProjectGridProps = {
  projects: Project[]
}

function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li
          key={project.slug}
          className={cn('h-full', project.flagship && 'lg:col-span-2')}
        >
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}

export function ProjectsSection() {
  const { projects } = loadPortfolio()
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const allProjects = useMemo(() => sortProjectsForDisplay(projects), [projects])
  const featuredProjects = useMemo(
    () => sortProjectsForDisplay(projects.filter((project) => project.featured)),
    [projects],
  )

  return (
    <Section id="projects" ariaLabel="Projects">
      <Container>
        <SectionHeading title="Projects" />
        <Tabs
          value={filter}
          onValueChange={(value) => {
            if (value === 'all' || value === 'featured') {
              setFilter(value)
            }
          }}
        >
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ProjectGrid projects={allProjects} />
          </TabsContent>
          <TabsContent value="featured">
            <ProjectGrid projects={featuredProjects} />
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  )
}
