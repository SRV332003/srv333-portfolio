import type { Project } from '@/content'
import { cn } from '@/lib/utils'

import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

type ProjectMediaProps = {
  project: Project
  className?: string
  frameClassName?: string
  loading?: 'lazy' | 'eager'
  /** Card grid: subtle hover zoom on poster/video */
  interactive?: boolean
}

export function ProjectMedia({
  project,
  className,
  frameClassName,
  loading = 'lazy',
  interactive = false,
}: ProjectMediaProps) {
  const reducedMotion = usePrefersReducedMotion()
  const alt = project.imageAlt ?? project.title
  const showVideo = Boolean(project.video) && !reducedMotion

  if (!project.image && !project.video) {
    return null
  }

  const mediaClassName = cn(
    'aspect-video w-full object-cover',
    interactive &&
      'transition-transform duration-300 motion-safe:group-hover/project-media:scale-[1.03]',
  )

  return (
    <div
      className={cn(
        'group/project-media overflow-hidden rounded-lg border border-border/50',
        frameClassName,
        className,
      )}
    >
      {showVideo ? (
        <video
          src={project.video}
          poster={project.image}
          muted
          playsInline
          loop
          autoPlay
          preload={loading === 'eager' ? 'auto' : 'metadata'}
          aria-label={alt}
          className={mediaClassName}
          data-project-media="video"
        />
      ) : project.image ? (
        <img
          src={project.image}
          alt={alt}
          loading={loading}
          className={mediaClassName}
          data-project-media="image"
        />
      ) : null}
    </div>
  )
}
