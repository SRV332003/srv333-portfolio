import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

import { HERO_PLANET_SCALE, HERO_PLANET_YAW_SPEED } from './lib/constants'
import { OrbitRing } from './OrbitRing'
import { PlanetMesh } from './PlanetMesh'

export function HeroPlanet() {
  const assemblyRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (document.hidden || !assemblyRef.current) return
    assemblyRef.current.rotation.y += HERO_PLANET_YAW_SPEED * delta
  })

  return (
    <group ref={assemblyRef} rotation={[0.14, 0.35, 0]}>
      <PlanetMesh scale={HERO_PLANET_SCALE} autoRotate detail={3} />
      <OrbitRing />
    </group>
  )
}
