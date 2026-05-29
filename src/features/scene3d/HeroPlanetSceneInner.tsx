import { HERO_CAMERA } from './lib/constants'
import { HeroPlanet } from './HeroPlanet'
import { SceneCanvas } from './SceneCanvas'

export function HeroPlanetSceneInner() {
  return (
    <SceneCanvas
      className="h-full w-full"
      camera={{ position: HERO_CAMERA.position, fov: HERO_CAMERA.fov }}
    >
      <ambientLight intensity={0.28} />
      <pointLight position={[4, 3, 5]} intensity={1.35} color="#00d4aa" />
      <pointLight position={[-3, -1, 4]} intensity={0.45} color="#6b5ce7" />
      <HeroPlanet />
    </SceneCanvas>
  )
}
