import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import type { Project } from '@/content'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: Project
  className?: string
}

function formatProjectMeta(project: Project): string | null {
  const parts: string[] = []
  if (project.domain) parts.push(project.domain)
  if (project.year) parts.push(String(project.year))
  return parts.length > 0 ? parts.join(' · ') : null
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const meta = formatProjectMeta(project)
  const imageAlt = project.imageAlt ?? project.title

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-card/60',
        project.featured &&
          'ring-1 ring-accent/30 shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]',
        className,
      )}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${project.title}`}
      />
      <div className="relative flex flex-1 flex-col pointer-events-none">
        {project.image ? (
          <img
            src={project.image}
            alt={imageAlt}
            loading="lazy"
            className="mb-4 aspect-video w-full rounded-lg border border-border/50 object-cover"
          />
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          {meta ? (
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{meta}</p>
          ) : null}
          {project.featured ? (
            <Badge variant="secondary" className="text-[0.65rem] uppercase">
              Featured
            </Badge>
          ) : null}
        </div>
        <h3
          className={cn(
            'text-lg font-semibold text-foreground group-hover:text-accent',
            meta || project.featured ? 'mt-1' : null,
          )}
        >
          {project.title}
        </h3>
        {project.role ? (
          <p className="mt-1 text-sm text-muted-foreground">{project.role}</p>
        ) : null}
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.summary}</p>
        <ul className="mt-4 flex min-h-14 flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge variant="outline">{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
