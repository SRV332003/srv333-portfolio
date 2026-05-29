export const ROTATION_SPEED = 0.25

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
