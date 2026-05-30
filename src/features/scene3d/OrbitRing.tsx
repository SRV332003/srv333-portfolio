import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type * as THREE from 'three'

import { readSceneColors } from './lib/colors'
import { RING_ROTATION_SPEED, RING_TUBE } from './lib/constants'

type OrbitRingProps = {
  radius?: number
  tube?: number
}

export function OrbitRing({ radius = 1.38, tube = RING_TUBE }: OrbitRingProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const colors = useMemo(() => readSceneColors(), [])

  useFrame((_, delta) => {
    if (document.hidden || !meshRef.current) return
    const spin = RING_ROTATION_SPEED * delta
    meshRef.current.rotation.z += spin
    meshRef.current.rotation.x += spin * 0.55
  })

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.35, 0.4, 0.15]}>
      <torusGeometry args={[radius, tube, 16, 72]} />
      <meshStandardMaterial
        color={colors.orbit}
        emissive={colors.accent}
        emissiveIntensity={0.22}
        roughness={0.28}
        metalness={0.58}
        transparent
        opacity={0.88}
      />
    </mesh>
  )
}
