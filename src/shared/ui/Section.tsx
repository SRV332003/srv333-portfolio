import { forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionVariant = 'default' | 'band'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  variant?: SectionVariant
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, children, className, ariaLabel, variant = 'default' },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      data-section-variant={variant}
      className={cn(
        'py-[var(--section-padding-y)]',
        variant === 'band' &&
          'border-y border-border/20 bg-[var(--color-nebula-band)]',
        className,
      )}
    >
      {children}
    </section>
  )
})
