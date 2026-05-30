import { CanvasTexture, SRGBColorSpace } from 'three'

import type { SceneColors } from './colors'

function createSeededRandom(seed: number) {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646
  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized
  const num = Number.parseInt(value, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

function mixRgb(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
): string {
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const bl = Math.round(a.b + (b.b - a.b) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

/** Blotchy albedo map so planet spin reads against the lighting. */
export function createPlanetSurfaceTexture(colors: SceneColors): CanvasTexture {
  const width = 512
  const height = 256
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    const fallback = new CanvasTexture(canvas)
    fallback.colorSpace = SRGBColorSpace
    return fallback
  }

  const voidRgb = parseHex(colors.void)
  const orbitRgb = parseHex(colors.orbit)
  const accentRgb = parseHex(colors.accent)
  const rand = createSeededRandom(0x50_75_2a)

  ctx.fillStyle = mixRgb(voidRgb, orbitRgb, 0.18)
  ctx.fillRect(0, 0, width, height)

  for (let band = 0; band < 7; band += 1) {
    const y = (band / 7) * height
    ctx.fillStyle = `rgba(0, 0, 0, ${0.04 + rand() * 0.05})`
    ctx.fillRect(0, y, width, height / 14)
  }

  for (let i = 0; i < 28; i += 1) {
    const x = rand() * width
    const y = rand() * height
    const rx = width * (0.04 + rand() * 0.11)
    const ry = height * (0.03 + rand() * 0.08)
    const tone = 0.25 + rand() * 0.55
    const patch = rand() > 0.45 ? accentRgb : orbitRgb
    ctx.fillStyle = mixRgb(voidRgb, patch, tone)
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, rand() * Math.PI, 0, Math.PI * 2)
    ctx.fill()
  }

  for (let i = 0; i < 6; i += 1) {
    const x = rand() * width
    const y = rand() * height
    const radius = width * (0.008 + rand() * 0.016)
    ctx.fillStyle = mixRgb(accentRgb, { r: 255, g: 255, b: 255 }, 0.35 + rand() * 0.25)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  return texture
}
