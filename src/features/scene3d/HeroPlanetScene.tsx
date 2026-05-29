import { lazy, Suspense } from 'react'

import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { Scene3DFallback } from './Scene3DFallback'

const HeroPlanetSceneInner = lazy(() =>
  import('./HeroPlanetSceneInner').then((m) => ({ default: m.HeroPlanetSceneInner })),
)

export function HeroPlanetScene() {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <Scene3DFallback />
  }

  return (
    <Suspense fallback={<Scene3DFallback />}>
      <HeroPlanetSceneInner />
    </Suspense>
  )
}
