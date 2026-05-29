import { Canvas } from '@react-three/fiber'
import { Suspense, type ReactNode } from 'react'

import { getEffectiveDpr } from './lib/constants'

type SceneCanvasProps = {
  children: ReactNode
  className?: string
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
}

export function SceneCanvas({ children, className, camera }: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={getEffectiveDpr()}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{
        position: camera?.position ?? [0, 0, 4],
        fov: camera?.fov ?? 45,
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
