import {
  DAMPING,
  DRIFT_SPEED,
  GLOW_OPACITY,
  GLOW_RADIUS,
  REPULSION_RADIUS,
  REPULSION_STRENGTH,
  RETURN_SPEED,
  SCROLL_PARALLAX_FACTOR,
} from './constants'
import type { StarfieldColors } from './colors'

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

export function getStarCount(): number {
  const mobile =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: 768px)`).matches
  return mobile ? 70 : 180
}

export function createStars(width: number, height: number, count: number): Star[] {
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

export function updateStars(
  stars: Star[],
  width: number,
  height: number,
  scrollY: number,
  pointer: PointerState,
  delta: number,
): void {
  const scrollOffset = scrollY * SCROLL_PARALLAX_FACTOR

  for (const star of stars) {
    const depthFactor = 0.2 + star.z * 0.8
    star.baseY += DRIFT_SPEED * depthFactor * delta
    star.baseX += Math.sin(star.baseY * 0.002 + star.z * 10) * 0.05 * delta

    if (star.baseY > height + 20) {
      star.baseY = -20
      star.baseX = Math.random() * width
    }
    if (star.baseX < -20) star.baseX = width + 20
    if (star.baseX > width + 20) star.baseX = -20

    const parallaxY = scrollOffset * depthFactor * 60

    if (pointer.active) {
      const dx = star.x - pointer.x
      const dy = star.y - pointer.y
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

    const targetX = star.baseX + star.vx * 10
    const targetY = star.baseY + parallaxY + star.vy * 10

    star.x += (targetX - star.x) * RETURN_SPEED * 60 * delta
    star.y += (targetY - star.y) * RETURN_SPEED * 60 * delta
  }
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
