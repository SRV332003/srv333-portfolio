import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

import { HERO_PLANET_SCALE, ROTATION_SPEED } from './lib/constants'
import { OrbitRing } from './OrbitRing'
import { PlanetMesh } from './PlanetMesh'

export function HeroPlanet() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (document.hidden || !groupRef.current) return
    groupRef.current.rotation.y += ROTATION_SPEED * delta
  })

  return (
    <group ref={groupRef} rotation={[0.14, 0.35, 0]}>
      <PlanetMesh scale={HERO_PLANET_SCALE} autoRotate={false} detail={3} />
      <OrbitRing />
    </group>
  )
}
