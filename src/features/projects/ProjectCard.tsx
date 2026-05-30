import { ArrowRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import type { Project } from '@/content'
import { cn } from '@/lib/utils'
import { FrostedPanel } from '@/shared/ui'

import { ProjectMedia } from './ProjectMedia'

type ProjectCardProps = {
  project: Project
  className?: string
}

const MAX_CARD_OUTCOMES = 3

function formatProjectMeta(project: Project): string | null {
  const parts: string[] = []
  if (project.domain) parts.push(project.domain)
  if (project.year) parts.push(String(project.year))
  return parts.length > 0 ? parts.join(' · ') : null
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const meta = formatProjectMeta(project)
  const cardOutcomes = project.outcomes?.slice(0, MAX_CARD_OUTCOMES) ?? []

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col',
        project.featured &&
          'rounded-xl ring-1 ring-accent/30 shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]',
        className,
      )}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View ${project.title}`}
      />
      <FrostedPanel
        as="div"
        interactive={false}
        className="relative flex h-full flex-col p-6 transition-colors group-hover:border-accent/40 group-hover:bg-card/60"
      >
        <div className="relative flex flex-1 flex-col pointer-events-none">
          {project.image || project.video ? (
            <ProjectMedia project={project} className="mb-4" interactive />
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
            {project.href ? (
              <Badge
                variant="outline"
                className="border-primary/40 bg-primary/10 text-[0.65rem] text-primary uppercase"
              >
                {project.hrefBadge ?? 'Live'}
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
          {cardOutcomes.length > 0 ? (
            <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border/40 pt-4">
              {cardOutcomes.map((outcome) => (
                <div key={`${outcome.value}-${outcome.label}`} className="min-w-0">
                  <dt className="truncate text-sm font-semibold text-primary">{outcome.value}</dt>
                  <dd className="mt-0.5 line-clamp-2 text-[0.65rem] leading-snug text-muted-foreground">
                    {outcome.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          <ul className="mt-4 flex min-h-14 flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge variant="outline">{tech}</Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            View project
            <ArrowRightIcon
              className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
              aria-hidden
            />
          </p>
        </div>
      </FrostedPanel>
    </article>
  )
}
