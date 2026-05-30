import { Badge } from '@/components/ui/badge'
import type { MissionPhase } from '@/content'
import { cn } from '@/lib/utils'

import { MISSION_PHASE_LABELS } from './missionPhase'

type MissionPhaseBadgeProps = {
  phase: MissionPhase
  className?: string
}

export function MissionPhaseBadge({ phase, className }: MissionPhaseBadgeProps) {
  const label = MISSION_PHASE_LABELS[phase]

  return (
    <Badge
      variant="outline"
      data-mission-phase={phase}
      className={cn(
        'text-[0.65rem] tracking-widest uppercase',
        phase === 'orbit' &&
          'border-primary/40 bg-primary/10 text-primary shadow-[0_0_10px_color-mix(in_srgb,var(--color-primary)_18%,transparent)]',
        phase === 'launch' &&
          'border-accent/35 bg-accent/10 text-accent',
        phase === 'dock' &&
          'border-border/60 bg-muted/30 text-muted-foreground',
        className,
      )}
    >
      {label}
    </Badge>
  )
}
