import { useMemo } from 'react'

import { HERO_CAMERA } from './lib/constants'
import { readSceneColors } from './lib/colors'
import { HeroPlanet } from './HeroPlanet'
import { SceneCanvas } from './SceneCanvas'

export function HeroPlanetSceneInner() {
  const colors = useMemo(() => readSceneColors(), [])

  return (
    <SceneCanvas
      className="h-full w-full"
      camera={{ position: HERO_CAMERA.position, fov: HERO_CAMERA.fov }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[5, 3, 4]}
        intensity={1.35}
        color={colors.accent}
      />
      <directionalLight
        position={[-4, -2, 2]}
        intensity={0.18}
        color={colors.orbit}
      />
      <pointLight position={[4, 2, 5]} intensity={0.45} color={colors.accent} />
      <pointLight position={[-3, -1, 3]} intensity={0.15} color={colors.orbit} />
      <HeroPlanet />
    </SceneCanvas>
  )
}
