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
      <div
        className="size-36 rounded-full sm:size-44 md:size-52 lg:size-60"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, var(--color-accent), transparent 55%), radial-gradient(circle at 65% 60%, var(--color-orbit), transparent 50%), radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-orbit) 40%, var(--color-accent)), var(--color-void) 70%)',
          boxShadow: '0 0 40px color-mix(in srgb, var(--color-accent) 35%, transparent)',
        }}
      />
    </div>
  )
}
