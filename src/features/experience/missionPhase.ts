import type { Experience, MissionPhase } from '@/content'

export const MISSION_PHASE_LABELS: Record<MissionPhase, string> = {
  launch: 'Launch',
  orbit: 'Orbit',
  dock: 'Dock',
}

export function inferMissionPhase(
  item: Experience,
  index: number,
  total: number,
): MissionPhase {
  if (item.missionPhase) return item.missionPhase
  if (item.end === 'present') return 'orbit'
  if (index === total - 1) return 'launch'
  return 'dock'
}

export const MISSION_PHASES: MissionPhase[] = ['launch', 'orbit', 'dock']
