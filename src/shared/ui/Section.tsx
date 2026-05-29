import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export function Section({ id, children, className, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('py-[var(--section-padding-y)]', className)}
    >
      {children}
    </section>
  )
}
