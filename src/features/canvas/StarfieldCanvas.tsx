import { useEffect, useRef } from 'react'

import { usePointerRepulsion } from './hooks/usePointerRepulsion'
import { useStarfieldAnimation } from './hooks/useStarfieldAnimation'
import type { PointerState } from './lib/stars'

type StarfieldCanvasProps = {
  paused?: boolean
}

const idlePointer: PointerState = { x: 0, y: 0, active: false }

export function StarfieldCanvas({ paused = false }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = usePointerRepulsion()
  const pointerRef = useRef<PointerState>(idlePointer)

  useEffect(() => {
    pointerRef.current = pointer
  }, [pointer])

  useStarfieldAnimation({ canvasRef, pointerRef, paused })

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      aria-hidden
    />
  )
}
