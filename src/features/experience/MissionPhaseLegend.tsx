import { MissionPhaseBadge } from './MissionPhaseBadge'
import { MISSION_PHASE_LABELS, MISSION_PHASES } from './missionPhase'

export function MissionPhaseLegend() {
  return (
    <div
      data-mission-legend
      className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
      aria-label="Mission phase legend"
    >
      {MISSION_PHASES.map((phase) => (
        <span key={phase} className="inline-flex items-center gap-2">
          <MissionPhaseBadge phase={phase} />
          <span>{MISSION_PHASE_LABELS[phase]} phase</span>
        </span>
      ))}
    </div>
  )
}
