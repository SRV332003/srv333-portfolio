import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/content'
import { Container, Section } from '@/shared/ui'

import { ProjectMedia } from './ProjectMedia'
import { ProjectOutcomesStrip } from './ProjectOutcomesStrip'

type ProjectDetailProps = {
  project: Project
}

function formatDetailMeta(project: Project): string | null {
  const parts: string[] = []
  if (project.domain) parts.push(project.domain)
  if (project.year) parts.push(String(project.year))
  if (project.role) parts.push(project.role)
  return parts.length > 0 ? parts.join(' · ') : null
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const meta = formatDetailMeta(project)
  return (
    <Section
      ariaLabel={project.title}
      className="relative overflow-hidden py-[var(--section-padding-y)]"
    >
      <div
        data-section-wash="project-detail"
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,color-mix(in_srgb,var(--color-orbit)_10%,transparent),transparent_55%)]"
      />
      <Container className="relative max-w-3xl">
        <Link
          to="/#projects"
          className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to projects
        </Link>
        {project.image || project.video ? (
          <ProjectMedia
            project={project}
            className="mb-8"
            frameClassName="rounded-xl"
            loading="eager"
          />
        ) : null}
        <h1 className="text-section font-bold tracking-tight text-foreground">
          {project.title}
        </h1>
        {meta ? (
          <p className="mt-3 text-sm text-muted-foreground">{meta}</p>
        ) : null}
        <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>
        {project.outcomes?.length ? (
          <ProjectOutcomesStrip outcomes={project.outcomes} className="mt-8" />
        ) : null}
        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge variant="outline">{tech}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-4 text-muted-foreground">
          {project.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          {project.href ? (
            <Button
              nativeButton={false}
              render={
                <a href={project.href} target="_blank" rel="noopener noreferrer" />
              }
            >
              {project.hrefLabel ?? 'Live demo'}
            </Button>
          ) : null}
          {project.repo ? (
            <Button
              nativeButton={false}
              render={
                <a href={project.repo} target="_blank" rel="noopener noreferrer" />
              }
              variant="outline"
            >
              View repository
            </Button>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
