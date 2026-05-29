import { useEffect, useRef, type RefObject } from 'react'

import { readStarfieldColors } from '../lib/colors'
import {
  CANVAS_PARALLAX_FACTOR,
  CANVAS_PARALLAX_LERP,
  CANVAS_PARALLAX_MAX,
} from '../lib/constants'
import {
  createStars,
  drawStars,
  getEffectiveDpr,
  getStarCount,
  updateStars,
  type ParallaxOffset,
  type PointerState,
  type Star,
} from '../lib/stars'

type UseStarfieldAnimationOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  pointerRef: RefObject<PointerState>
  paused: boolean
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function lerpParallax(
  current: ParallaxOffset,
  target: ParallaxOffset,
  factor: number,
): ParallaxOffset {
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
  }
}

export function useStarfieldAnimation({
  canvasRef,
  pointerRef,
  paused,
}: UseStarfieldAnimationOptions): void {
  const starsRef = useRef<Star[]>([])
  const colorsRef = useRef(readStarfieldColors())
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 })
  const scrollYRef = useRef(0)
  const parallaxRef = useRef<ParallaxOffset>({ x: 0, y: 0 })
  const reducedMotionRef = useRef(false)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reducedMotionRef.current = mq.matches
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    colorsRef.current = readStarfieldColors()

    const resize = () => {
      const dpr = getEffectiveDpr()
      const width = window.innerWidth
      const height = window.innerHeight
      sizeRef.current = { width, height, dpr }

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      starsRef.current = createStars(width, height, getStarCount())
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(document.documentElement)

    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick)

      if (paused || document.hidden) {
        lastTimeRef.current = time
        return
      }

      const delta = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 16.67, 2)
        : 1
      lastTimeRef.current = time

      const { width, height } = sizeRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx || width === 0) return

      const pointer = pointerRef.current ?? {
        x: 0,
        y: 0,
        active: false,
      }

      let targetParallax: ParallaxOffset = { x: 0, y: 0 }
      if (pointer.active && !reducedMotionRef.current) {
        const cx = width / 2
        targetParallax = {
          x: clamp(
            -(pointer.x - cx) * CANVAS_PARALLAX_FACTOR,
            -CANVAS_PARALLAX_MAX,
            CANVAS_PARALLAX_MAX,
          ),
          y: 0,
        }
      }

      parallaxRef.current = lerpParallax(
        parallaxRef.current,
        targetParallax,
        CANVAS_PARALLAX_LERP,
      )

      updateStars(
        starsRef.current,
        width,
        height,
        scrollYRef.current,
        pointer,
        delta,
      )
      drawStars(
        ctx,
        starsRef.current,
        colorsRef.current,
        pointer,
        parallaxRef.current,
        width,
        height,
      )
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [canvasRef, pointerRef, paused])
}
