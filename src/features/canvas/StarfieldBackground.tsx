import { lazy, Suspense, useEffect, useState } from 'react'

import { StarfieldFallback } from './StarfieldFallback'

const StarfieldCanvas = lazy(() =>
  import('./StarfieldCanvas').then((m) => ({ default: m.StarfieldCanvas })),
)

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function StarfieldBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      {prefersReducedMotion ? (
        <StarfieldFallback />
      ) : (
        <Suspense fallback={<StarfieldFallback />}>
          <div className="absolute inset-0">
            <StarfieldCanvas />
          </div>
        </Suspense>
      )}
    </div>
  )
}
