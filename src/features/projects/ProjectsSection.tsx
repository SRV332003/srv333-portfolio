import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

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
  compactLayout?: boolean
}

function ProjectGrid({ projects, compactLayout = false }: ProjectGridProps) {
  return (
    <ul
      className={cn(
        'grid gap-6 sm:grid-cols-2',
        compactLayout ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
      )}
    >
      {projects.map((project) => (
        <li
          key={project.slug}
          className={cn(
            'h-full',
            project.flagship && !compactLayout && 'lg:col-span-2',
          )}
        >
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}

type ProjectsSectionProps = {
  sectionVariant?: 'default' | 'band'
}

type ProjectFilter = 'all' | 'featured'

function parseFilterParam(value: string | null): ProjectFilter {
  return value === 'featured' ? 'featured' : 'all'
}

export function ProjectsSection({ sectionVariant = 'band' }: ProjectsSectionProps) {
  const { projects, projectsSection } = loadPortfolio()
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = parseFilterParam(searchParams.get('filter'))

  const allProjects = useMemo(() => sortProjectsForDisplay(projects), [projects])
  const featuredProjects = useMemo(
    () => sortProjectsForDisplay(projects.filter((project) => project.featured)),
    [projects],
  )
  const featuredCount = featuredProjects.length
  const featuredTabLabel =
    featuredCount > 0 ? `Featured (${featuredCount})` : 'Featured'

  function setFilter(next: ProjectFilter) {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        if (next === 'featured') {
          params.set('filter', 'featured')
        } else {
          params.delete('filter')
        }
        return params
      },
      { replace: true },
    )
  }

  return (
    <Section
      id="projects"
      ariaLabel="Projects"
      variant={sectionVariant}
      className="relative overflow-hidden"
    >
      <div
        data-section-wash="projects"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_88%_12%,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent_52%),radial-gradient(ellipse_65%_55%_at_8%_75%,color-mix(in_srgb,var(--color-orbit)_14%,transparent),transparent_55%)]"
      />
      <Container className="relative">
        <SectionHeading
          title={projectsSection.title}
          subtitle={projectsSection.subtitle}
        />
        <Tabs
          value={filter}
          onValueChange={(value) => {
            if (value === 'all' || value === 'featured') {
              setFilter(value)
            }
          }}
        >
          <TabsList variant="line" className="mb-8 h-10 gap-4 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="h-9 px-0 text-sm data-active:text-foreground data-active:after:bg-primary"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="featured"
              className="h-9 px-0 text-sm data-active:text-foreground data-active:after:bg-primary"
            >
              {featuredTabLabel}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ProjectGrid projects={allProjects} />
          </TabsContent>
          <TabsContent value="featured">
            {featuredProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No featured projects yet. Switch to All to browse the full mission log.
              </p>
            ) : (
              <ProjectGrid
                projects={featuredProjects}
                compactLayout={featuredProjects.length <= 2}
              />
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  )
}
