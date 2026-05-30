import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FrostedPanelProps = {
  children: ReactNode
  className?: string
  as?: 'article' | 'div'
  interactive?: boolean
}

export function FrostedPanel({
  children,
  className,
  as = 'div',
  interactive = true,
}: FrostedPanelProps) {
  const classes = cn(
    'rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm',
    interactive && 'transition-colors hover:border-accent/40 hover:bg-card/60',
    className,
  )

  if (as === 'article') {
    return <article className={classes}>{children}</article>
  }

  return <div className={classes}>{children}</div>
}
