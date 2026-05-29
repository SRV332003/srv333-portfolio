export type StarfieldColors = {
  star: string
  accent: string
  orbit: string
}

export function readStarfieldColors(): StarfieldColors {
  const style = getComputedStyle(document.documentElement)
  return {
    star: style.getPropertyValue('--color-star').trim() || '#e8e6f0',
    accent: style.getPropertyValue('--color-accent').trim() || '#00d4aa',
    orbit: style.getPropertyValue('--color-orbit').trim() || '#6b5ce7',
  }
}
