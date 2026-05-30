import type { ProjectOutcome } from '@/content'
import { cn } from '@/lib/utils'
import { FrostedPanel } from '@/shared/ui'

type ProjectOutcomesStripProps = {
  outcomes: ProjectOutcome[]
  className?: string
}

export function ProjectOutcomesStrip({ outcomes, className }: ProjectOutcomesStripProps) {
  return (
    <dl
      className={cn(
        'grid gap-4 sm:grid-cols-2 md:grid-cols-3',
        className,
      )}
    >
      {outcomes.map((outcome) => (
        <FrostedPanel
          key={`${outcome.value}-${outcome.label}`}
          as="div"
          interactive={false}
          className="px-4 py-3"
        >
          <dt className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
            {outcome.value}
          </dt>
          <dd className="mt-1 text-sm text-muted-foreground">{outcome.label}</dd>
        </FrostedPanel>
      ))}
    </dl>
  )
}
