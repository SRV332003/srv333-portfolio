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

function parseMonthYear(value: string): { year: number; month: number } {
  const [year, month] = value.split('-').map(Number)
  return { year, month }
}

function monthIndex(year: number, month: number): number {
  return year * 12 + (month - 1)
}

/** Inclusive month span, e.g. Jan–Mar 2024 → "3 mo", Oct 2023–Jul 2024 → "1 yr 4 mo". */
export function formatExperienceDuration(
  start: string,
  end: string,
  referenceDate: Date = new Date(),
): string {
  const { year: startYear, month: startMonth } = parseMonthYear(start)
  const startIndex = monthIndex(startYear, startMonth)
  let endIndex: number
  if (end === 'present') {
    endIndex = monthIndex(referenceDate.getFullYear(), referenceDate.getMonth() + 1)
  } else {
    const { year: endYear, month: endMonth } = parseMonthYear(end)
    endIndex = monthIndex(endYear, endMonth)
  }

  const totalMonths = Math.max(1, endIndex - startIndex + 1)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) {
    return totalMonths === 1 ? '1 mo' : `${totalMonths} mo`
  }
  if (months === 0) {
    return years === 1 ? '1 yr' : `${years} yrs`
  }
  const yearLabel = years === 1 ? '1 yr' : `${years} yrs`
  return `${yearLabel} ${months} mo`
}
