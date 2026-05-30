import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending } from 'three'
import type * as THREE from 'three'

import { readSceneColors } from './lib/colors'
import {
  ATMOSPHERE_SCALE,
  PLANET_ROTATION_SPEED,
} from './lib/constants'

type PlanetMeshProps = {
  scale?: number
  autoRotate?: boolean
  detail?: number
}

export function PlanetMesh({
  scale = 1,
  autoRotate = true,
  detail = 3,
}: PlanetMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const colors = useMemo(() => readSceneColors(), [])

  useFrame((_, delta) => {
    if (!autoRotate || document.hidden || !groupRef.current) return
    const spin = PLANET_ROTATION_SPEED * delta
    groupRef.current.rotation.y += spin
    // Slight wobble so facet lighting shifts are easier to see than pure Y spin.
    groupRef.current.rotation.x += spin * 0.12
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, detail]} />
        <meshStandardMaterial
          color={colors.void}
          emissive={colors.orbit}
          emissiveIntensity={0.09}
          roughness={0.82}
          metalness={0.14}
        />
      </mesh>
      <mesh scale={ATMOSPHERE_SCALE}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={colors.accent}
          transparent
          opacity={0.34}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
