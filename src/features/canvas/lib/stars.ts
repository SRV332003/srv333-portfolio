import {
  DAMPING,
  DRIFT_SPEED,
  GLOW_OPACITY,
  GLOW_RADIUS,
  REPULSION_RADIUS,
  REPULSION_STRENGTH,
  RETURN_SPEED,
  REPULSION_OFFSET,
} from './constants'
import type { StarfieldColors } from './colors'
import { auditStarfieldHealth, getUncappedLerpAlpha, warnStarfieldAnomaly } from './diagnostics'

export type ParallaxOffset = {
  x: number
  y: number
}

export type Star = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  radius: number
  opacity: number
}

export type PointerState = {
  x: number
  y: number
  active: boolean
}

const OFF_SCREEN_MARGIN = 20

export function getStarCount(): number {
  const mobile =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: 768px)`).matches
  return mobile ? 70 : 180
}

export function createStars(width: number, height: number, count: number): Star[] {
  if (width <= 0 || height <= 0) {
    warnStarfieldAnomaly('create-stars-invalid-size', { width, height, count })
  }

  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const z = Math.random()
    const x = Math.random() * width
    const y = Math.random() * height
    stars.push({
      x,
      y,
      z,
      vx: 0,
      vy: 0,
      baseX: x,
      baseY: y,
      radius: 0.5 + z * 1.8,
      opacity: 0.3 + z * 0.7,
    })
  }
  return stars
}

function recycleStar(star: Star, width: number): void {
  star.baseY = -OFF_SCREEN_MARGIN
  star.baseX = Math.random() * width
  star.y = star.baseY
  star.x = star.baseX
  star.vx = 0
  star.vy = 0
}

function shouldRecycle(star: Star, width: number, height: number): string | null {
  if (star.baseY > height + OFF_SCREEN_MARGIN) return 'baseY-below-viewport'
  if (star.y > height + OFF_SCREEN_MARGIN) return 'displayY-below-viewport'
  if (star.y < -OFF_SCREEN_MARGIN * 2) return 'displayY-above-viewport'
  if (star.x < -OFF_SCREEN_MARGIN || star.x > width + OFF_SCREEN_MARGIN) {
    return 'displayX-offscreen'
  }
  return null
}

export function updateStars(
  stars: Star[],
  width: number,
  height: number,
  pointer: PointerState,
  delta: number,
): void {
  const uncappedLerp = getUncappedLerpAlpha(delta, RETURN_SPEED)
  if (uncappedLerp > 1) {
    warnStarfieldAnomaly('lerp-overshoot-risk', {
      uncappedLerp: uncappedLerp.toFixed(3),
      delta,
      returnSpeed: RETURN_SPEED,
      hint: 'Lerp alpha > 1 causes vibration; positions now snap each frame',
    })
  }

  for (const star of stars) {
    const depthFactor = 0.2 + star.z * 0.8
    star.baseY += DRIFT_SPEED * depthFactor * delta
    star.baseX += Math.sin(star.baseY * 0.002 + star.z * 10) * 0.05 * delta

    const recycleReason = shouldRecycle(star, width, height)
    if (recycleReason) {
      if (
        recycleReason === 'displayY-below-viewport' &&
        star.baseY <= height + OFF_SCREEN_MARGIN
      ) {
        warnStarfieldAnomaly('display-offscreen-before-base', {
          baseY: star.baseY,
          displayY: star.y,
          height,
          hint: 'Repulsion or lerp desync pushed display ahead of drift path',
        })
      }
      recycleStar(star, width)
    }

    if (star.baseX < -OFF_SCREEN_MARGIN) star.baseX = width + OFF_SCREEN_MARGIN
    if (star.baseX > width + OFF_SCREEN_MARGIN) star.baseX = -OFF_SCREEN_MARGIN

    if (pointer.active) {
      const dx = star.baseX - pointer.x
      const dy = star.baseY - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist < REPULSION_RADIUS && dist > 0.1) {
        const force =
          ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) *
          REPULSION_STRENGTH *
          depthFactor
        star.vx += (dx / dist) * force
        star.vy += (dy / dist) * force
      }
    }

    star.vx *= DAMPING
    star.vy *= DAMPING

    const targetX = star.baseX + star.vx * REPULSION_OFFSET
    const targetY = star.baseY + star.vy * REPULSION_OFFSET

    star.x = targetX
    star.y = targetY
  }

  auditStarfieldHealth(stars, width, height)
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  colors: StarfieldColors,
  pointer: PointerState,
  parallax: ParallaxOffset,
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height)

  if (pointer.active) {
    const gradient = ctx.createRadialGradient(
      pointer.x,
      pointer.y,
      0,
      pointer.x,
      pointer.y,
      GLOW_RADIUS,
    )
    gradient.addColorStop(0, withAlpha(colors.accent, GLOW_OPACITY * 2))
    gradient.addColorStop(0.4, withAlpha(colors.orbit, GLOW_OPACITY))
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  for (const star of stars) {
    const depthShift = 0.25 + star.z * 0.75
    const drawX = star.x + parallax.x * depthShift
    const drawY = star.y + parallax.y * depthShift

    ctx.beginPath()
    ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2)
    ctx.fillStyle = withAlpha(colors.star, star.opacity)
    ctx.fill()

    if (star.z > 0.75 && pointer.active) {
      const dx = drawX - pointer.x
      const dy = drawY - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist < GLOW_RADIUS) {
        ctx.beginPath()
        ctx.arc(drawX, drawY, star.radius * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = withAlpha(
          colors.accent,
          star.opacity * (1 - dist / GLOW_RADIUS) * 0.5,
        )
        ctx.fill()
      }
    }
  }
}

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const full =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex
    const r = parseInt(full.slice(0, 2), 16)
    const g = parseInt(full.slice(2, 4), 16)
    const b = parseInt(full.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return color
}

export function getEffectiveDpr(): number {
  const raw = window.devicePixelRatio || 1
  const mobile = window.matchMedia(`(max-width: 768px)`).matches
  const cap = mobile ? 1.5 : 2
  return Math.min(raw, cap)
}
