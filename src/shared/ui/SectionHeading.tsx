import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-12', className)}>
      <h2 className="text-section font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}
