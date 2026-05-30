/** Radians per second — tuned so hero spin reads at a glance (~12–14s per turn). */
export const PLANET_ROTATION_SPEED = 0.52
export const RING_ROTATION_SPEED = 0.34
/** Slow yaw on the whole planet + ring assembly (visible ring precession). */
export const HERO_PLANET_YAW_SPEED = 0.14
export const ATMOSPHERE_SCALE = 1.08
export const RING_TUBE = 0.034

/** @deprecated Use PLANET_ROTATION_SPEED */
export const ROTATION_SPEED = PLANET_ROTATION_SPEED

export const DPR_DESKTOP_MAX = 2
export const DPR_MOBILE_MAX = 1.5
export const MOBILE_BREAKPOINT = 768

export const HERO_CAMERA = {
  position: [0, 0, 4.1] as [number, number, number],
  fov: 40,
}
export const HERO_PLANET_SCALE = 1

export function getEffectiveDpr(): number {
  if (typeof window === 'undefined') return 1
  const dpr = window.devicePixelRatio ?? 1
  const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  const cap = isMobile ? DPR_MOBILE_MAX : DPR_DESKTOP_MAX
  return Math.min(dpr, cap)
}
