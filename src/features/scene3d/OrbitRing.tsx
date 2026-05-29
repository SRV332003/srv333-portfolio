import { useMemo } from 'react'

import { readSceneColors } from './lib/colors'

type OrbitRingProps = {
  radius?: number
  tube?: number
}

export function OrbitRing({ radius = 1.38, tube = 0.018 }: OrbitRingProps) {
  const colors = useMemo(() => readSceneColors(), [])

  return (
    <mesh rotation={[Math.PI / 2.35, 0.4, 0.15]}>
      <torusGeometry args={[radius, tube, 12, 64]} />
      <meshStandardMaterial
        color={colors.accent}
        emissive={colors.accent}
        emissiveIntensity={0.55}
        roughness={0.4}
        metalness={0.35}
        transparent
        opacity={0.72}
      />
    </mesh>
  )
}
