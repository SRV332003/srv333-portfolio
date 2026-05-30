export type SceneColors = {
  accent: string
  orbit: string
  void: string
}

export function readSceneColors(): SceneColors {
  const style = getComputedStyle(document.documentElement)
  return {
    accent: style.getPropertyValue('--color-accent').trim() || '#00d4aa',
    orbit: style.getPropertyValue('--color-orbit').trim() || '#6b5ce7',
    void: style.getPropertyValue('--color-void').trim() || '#050510',
  }
}
