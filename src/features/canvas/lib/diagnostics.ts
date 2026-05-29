type AnomalyDetail = Record<string, unknown>

const THROTTLE_MS = 4_000
const lastLoggedAt = new Map<string, number>()

function shouldLog(code: string): boolean {
  if (!import.meta.env.DEV) return false
  const now = Date.now()
  const last = lastLoggedAt.get(code) ?? 0
  if (now - last < THROTTLE_MS) return false
  lastLoggedAt.set(code, now)
  return true
}

export function warnStarfieldAnomaly(code: string, detail: AnomalyDetail): void {
  if (!shouldLog(code)) return
  console.warn(`[starfield:${code}]`, detail)
}

/** Uncapped lerp factor — values > 1 cause overshoot oscillation (historical bug). */
export function getUncappedLerpAlpha(delta: number, returnSpeed: number): number {
  return returnSpeed * 60 * delta
}

export function auditStarfieldHealth(
  stars: { x: number; y: number; baseX: number; baseY: number }[],
  width: number,
  height: number,
): void {
  if (!import.meta.env.DEV || stars.length === 0) return

  if (width <= 0 || height <= 0) {
    warnStarfieldAnomaly('invalid-viewport', { width, height })
    return
  }

  const margin = 40
  let offScreen = 0
  let baseDisplayDesync = 0

  for (const star of stars) {
    const onScreen =
      star.y >= -margin &&
      star.y <= height + margin &&
      star.x >= -margin &&
      star.x <= width + margin
    if (!onScreen) offScreen += 1

    const yGap = Math.abs(star.y - star.baseY)
    if (yGap > height * 0.35 && star.baseY >= -margin && star.baseY <= height + margin) {
      baseDisplayDesync += 1
    }
  }

  const offScreenRatio = offScreen / stars.length
  if (offScreenRatio > 0.85) {
    warnStarfieldAnomaly('stars-mostly-offscreen', {
      offScreen,
      total: stars.length,
      ratio: offScreenRatio.toFixed(2),
      width,
      height,
      hint: 'Display positions should recycle when leaving the viewport',
    })
  }

  if (baseDisplayDesync > stars.length * 0.25) {
    warnStarfieldAnomaly('base-display-desync', {
      desynced: baseDisplayDesync,
      total: stars.length,
      hint: 'star.y should track baseY + repulsion offset',
    })
  }
}
