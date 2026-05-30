/** Unit directions for emissive surface markers (normalized at use site). */
export const PLANET_SURFACE_MARKERS: [number, number, number][] = [
  [0.72, 0.38, 0.58],
  [-0.65, -0.42, 0.62],
  [0.15, 0.88, -0.44],
  [-0.48, 0.55, -0.68],
  [0.55, -0.62, -0.5],
]

export function markerPosition(
  direction: [number, number, number],
  radius: number,
): [number, number, number] {
  const [x, y, z] = direction
  const length = Math.hypot(x, y, z) || 1
  return [(x / length) * radius, (y / length) * radius, (z / length) * radius]
}
