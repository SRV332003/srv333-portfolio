import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AdditiveBlending } from 'three'
import type * as THREE from 'three'

import { readSceneColors } from './lib/colors'
import {
  ATMOSPHERE_SCALE,
  PLANET_ROTATION_SPEED,
} from './lib/constants'
import { markerPosition, PLANET_SURFACE_MARKERS } from './lib/planetMarkers'
import { createPlanetSurfaceTexture } from './lib/planetSurfaceTexture'

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
  const surfaceMap = useMemo(() => createPlanetSurfaceTexture(colors), [colors])

  useEffect(() => () => surfaceMap.dispose(), [surfaceMap])

  useFrame((_, delta) => {
    if (!autoRotate || document.hidden || !groupRef.current) return
    const spin = PLANET_ROTATION_SPEED * delta
    groupRef.current.rotation.y += spin
    groupRef.current.rotation.x += spin * 0.12
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, detail]} />
        <meshStandardMaterial
          map={surfaceMap}
          color="#ffffff"
          emissive={colors.orbit}
          emissiveIntensity={0.04}
          roughness={0.78}
          metalness={0.1}
        />
      </mesh>
      <mesh scale={1.004}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color={colors.accent}
          wireframe
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
      {PLANET_SURFACE_MARKERS.map((direction, index) => (
        <mesh key={index} position={markerPosition(direction, 1.02)}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={colors.accent} toneMapped={false} />
        </mesh>
      ))}
      <mesh scale={ATMOSPHERE_SCALE}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={colors.accent}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
