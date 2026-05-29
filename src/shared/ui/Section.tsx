import { forwardRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, children, className, ariaLabel },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={cn('py-[var(--section-padding-y)]', className)}
    >
      {children}
    </section>
  )
})
