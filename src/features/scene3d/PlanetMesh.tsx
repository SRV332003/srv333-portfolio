import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type * as THREE from 'three'

import { readSceneColors } from './lib/colors'
import { ROTATION_SPEED } from './lib/constants'

type PlanetMeshProps = {
  scale?: number
  autoRotate?: boolean
  detail?: number
}

export function PlanetMesh({
  scale = 1,
  autoRotate = true,
  detail = 2,
}: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const colors = useMemo(() => readSceneColors(), [])

  useFrame((_, delta) => {
    if (!autoRotate || document.hidden || !meshRef.current) return
    meshRef.current.rotation.y += ROTATION_SPEED * delta
  })

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, detail]} />
      <meshStandardMaterial
        color={colors.orbit}
        emissive={colors.accent}
        emissiveIntensity={0.35}
        roughness={0.65}
        metalness={0.25}
      />
    </mesh>
  )
}
