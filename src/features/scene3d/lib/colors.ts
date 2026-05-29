export type SceneColors = {
  accent: string
  orbit: string
}

export function readSceneColors(): SceneColors {
  const style = getComputedStyle(document.documentElement)
  return {
    accent: style.getPropertyValue('--color-accent').trim() || '#00d4aa',
    orbit: style.getPropertyValue('--color-orbit').trim() || '#6b5ce7',
  }
}
