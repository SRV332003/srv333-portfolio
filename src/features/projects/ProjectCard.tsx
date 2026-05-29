import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import type { Project } from '@/content'
import { cn } from '@/lib/utils'

type ProjectCardProps = {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-card/60',
        className,
      )}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${project.title}`}
      />
      <div className="relative flex flex-1 flex-col pointer-events-none">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
          {project.title}
        </h3>
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
