const MONTH_YEAR = /^\d{4}-(0[1-9]|1[0-2])$/

export function formatMonthYear(value: string): string {
  if (!MONTH_YEAR.test(value)) {
    return value
  }
  const [year, month] = value.split('-').map(Number)
  const date = new Date(year, month - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function formatExperiencePeriod(start: string, end: string): string {
  const startLabel = formatMonthYear(start)
  if (end === 'present') {
    return `${startLabel} — Present`
  }
  return `${startLabel} — ${formatMonthYear(end)}`
}

export function experiencePeriodDateTime(start: string, end: string): string {
  if (end === 'present') {
    return start
  }
  return `${start}/${end}`
}
