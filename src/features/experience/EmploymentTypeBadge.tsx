import { Badge } from '@/components/ui/badge'
import type { EmploymentType } from '@/content'
import { cn } from '@/lib/utils'

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  intern: 'Intern',
  'full-time': 'Full-time',
  contract: 'Contract',
}

type EmploymentTypeBadgeProps = {
  type: EmploymentType
  className?: string
}

export function EmploymentTypeBadge({ type, className }: EmploymentTypeBadgeProps) {
  return (
    <Badge
      variant="secondary"
      data-employment-type={type}
      className={cn('text-[0.65rem] tracking-widest uppercase', className)}
    >
      {EMPLOYMENT_TYPE_LABELS[type]}
    </Badge>
  )
}
