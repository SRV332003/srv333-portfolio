import { useEffect, useState } from 'react'

import type { PointerState } from '../lib/stars'

const initial: PointerState = { x: 0, y: 0, active: false }

export function usePointerRepulsion(): PointerState {
  const [pointer, setPointer] = useState<PointerState>(initial)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPointer({ x: e.clientX, y: e.clientY, active: true })
    }
    const onLeave = () => {
      setPointer((prev) => ({ ...prev, active: false }))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return pointer
}
