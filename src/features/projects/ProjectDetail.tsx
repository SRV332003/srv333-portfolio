import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/content'
import { Container, Section } from '@/shared/ui'

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
  const imageAlt = project.imageAlt ?? project.title

  return (
    <Section ariaLabel={project.title}>
      <Container className="max-w-3xl">
        <Link
          to="/#projects"
          className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to projects
        </Link>
        {project.image ? (
          <img
            src={project.image}
            alt={imageAlt}
            loading="eager"
            className="mb-8 aspect-video w-full rounded-xl border border-border/50 object-cover"
          />
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
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
              <Badge variant="secondary">{tech}</Badge>
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
              Live demo
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
