import { cn } from '@/lib/utils'

type Scene3DFallbackProps = {
  className?: string
}

export function Scene3DFallback({ className }: Scene3DFallbackProps) {
  return (
    <div
      className={cn('flex h-full w-full items-center justify-center', className)}
      aria-hidden
    >
      <div className="relative flex size-36 items-center justify-center sm:size-44 md:size-52 lg:size-60">
        <div
          data-scene3d-fallback="orb"
          className="size-full rounded-full shadow-[0_0_40px_color-mix(in_srgb,var(--color-accent)_35%,transparent)]"
          style={{ background: 'var(--hero-planet-glow)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 scale-[1.12] rounded-full border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] opacity-50"
          aria-hidden
        />
      </div>
    </div>
  )
}
