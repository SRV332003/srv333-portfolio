import { useEffect, useState } from 'react'

const HEADER_OFFSET_PX = 96
const SCROLL_ACTIVE_OFFSET_PX = HEADER_OFFSET_PX + 48
const BOTTOM_SCROLL_THRESHOLD_PX = 32
const LAST_SECTION_TOP_TOLERANCE_PX = 120
const HASH_NAV_SETTLE_MS = 300

const SPY_THRESHOLDS = [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1] as const

function parseSectionKey(sectionKey: string): string[] {
  return sectionKey.split('|').filter(Boolean)
}

function resolveSectionFromScrollTop(sectionIds: string[]): string {
  let active = sectionIds[0] ?? '#hero'

  for (const id of sectionIds) {
    const element = document.querySelector(id)
    if (!element) continue
    const top = element.getBoundingClientRect().top
    if (top <= SCROLL_ACTIVE_OFFSET_PX) {
      active = id
    }
  }

  return active
}

function resolveLastSectionWhenAtBottom(sectionIds: string[]): string | null {
  const lastId = sectionIds[sectionIds.length - 1]
  if (!lastId) return null

  const lastElement = document.querySelector(lastId)
  if (!lastElement) return null

  const doc = document.documentElement
  const nearBottom =
    window.scrollY + window.innerHeight >= doc.scrollHeight - BOTTOM_SCROLL_THRESHOLD_PX

  if (!nearBottom) return null

  const top = lastElement.getBoundingClientRect().top
  if (top <= SCROLL_ACTIVE_OFFSET_PX + LAST_SECTION_TOP_TOLERANCE_PX) {
    return lastId
  }

  return null
}

function pickActiveSection(
  sectionIds: string[],
  intersectionRatios: Map<string, number>,
): string {
  const lastId = sectionIds[sectionIds.length - 1]
  const atBottom = resolveLastSectionWhenAtBottom(sectionIds)

  if (atBottom && lastId) {
    return lastId
  }

  if (lastId) {
    const doc = document.documentElement
    const nearBottom =
      window.scrollY + window.innerHeight >= doc.scrollHeight - BOTTOM_SCROLL_THRESHOLD_PX
    const lastRatio = intersectionRatios.get(lastId) ?? 0
    if (nearBottom && lastRatio > 0) {
      return lastId
    }
  }

  let bestId = sectionIds[0] ?? '#hero'
  let bestRatio = 0

  for (const id of sectionIds) {
    const ratio = intersectionRatios.get(id) ?? 0
    if (ratio > bestRatio) {
      bestRatio = ratio
      bestId = id
    }
  }

  if (bestRatio > 0) {
    return bestId
  }

  return resolveSectionFromScrollTop(sectionIds)
}

function syncHashToSection(sectionId: string) {
  if (window.location.hash === sectionId) {
    return
  }
  history.replaceState(null, '', `${window.location.pathname}${sectionId}`)
}

/**
 * Tracks which in-page section is active via IntersectionObserver while on `/`.
 */
export function useScrollSpySection(
  sectionIds: string[],
  enabled: boolean,
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionKey = sectionIds.join('|')

  useEffect(() => {
    const ids = parseSectionKey(sectionKey)
    if (!enabled || ids.length === 0) {
      return
    }

    const intersectionRatios = new Map<string, number>()
    let hashNavigationUntil = 0
    let settleTimer: ReturnType<typeof setTimeout> | undefined

    function applyActiveSection(next: string) {
      setActiveSection(next)
      syncHashToSection(next)
    }

    function updateFromObserver() {
      if (Date.now() < hashNavigationUntil) {
        return
      }
      applyActiveSection(pickActiveSection(ids, intersectionRatios))
    }

    function updateFromScrollFallback() {
      applyActiveSection(
        resolveLastSectionWhenAtBottom(ids) ?? resolveSectionFromScrollTop(ids),
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`
          if (ids.includes(id)) {
            intersectionRatios.set(id, entry.intersectionRatio)
          }
        }
        updateFromObserver()
      },
      {
        root: null,
        rootMargin: `-${HEADER_OFFSET_PX}px 0px -55% 0px`,
        threshold: [...SPY_THRESHOLDS],
      },
    )

    for (const id of ids) {
      const element = document.querySelector(id)
      if (element) {
        observer.observe(element)
      }
    }

    function onHashChange() {
      const id = window.location.hash
      if (id && ids.includes(id)) {
        hashNavigationUntil = Date.now() + HASH_NAV_SETTLE_MS
        setActiveSection(id)
        clearTimeout(settleTimer)
        settleTimer = setTimeout(() => {
          hashNavigationUntil = 0
          updateFromObserver()
        }, HASH_NAV_SETTLE_MS)
        return
      }
      hashNavigationUntil = 0
      updateFromScrollFallback()
    }

    onHashChange()
    window.addEventListener('hashchange', onHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', onHashChange)
      clearTimeout(settleTimer)
    }
  }, [enabled, sectionKey])

  if (!enabled) {
    return null
  }

  return activeSection
}
