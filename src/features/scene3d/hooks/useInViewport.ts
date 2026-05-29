import { useEffect, useRef, useState, type RefObject } from 'react'

type UseInViewportOptions = {
  rootMargin?: string
  threshold?: number
}

export function useInViewport<T extends Element = HTMLDivElement>(
  options: UseInViewportOptions = {},
): [RefObject<T | null>, boolean] {
  const { rootMargin = '100px', threshold = 0.01 } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView]
}
