import { expect, test } from '@playwright/test'

test.describe('Experience section', () => {
  test('shows subtitle and timeline spine', async ({ page }) => {
    await page.goto('/#experience')

    await expect(
      page.getByText(
        'Internships and full-time roles at early-stage startups — from React QA to inventory at scale.',
      ),
    ).toBeVisible()
    await expect(page.locator('#experience [data-timeline-spine]')).toBeVisible()
  })

  test('highlights current role on the timeline', async ({ page }) => {
    await page.goto('/#experience')

    const presentEntry = page.locator('#experience ol > li').first()
    await expect(presentEntry.getByText('Omniful')).toBeVisible()
    await expect(presentEntry.getByText('Current')).toBeVisible()
    await expect(presentEntry.getByText('Jan 2025 — Present')).toBeVisible()
    await expect(presentEntry.locator('article')).toHaveClass(/ring-primary/)
  })

  test('shows Arcadia and Luneblaze on timeline', async ({ page }) => {
    await page.goto('/#experience')

    const experience = page.locator('#experience')
    await expect(experience.getByText('· Arcadia Hospitality')).toBeVisible()
    await expect(experience.getByText('· Luneblaze')).toBeVisible()
  })

  test('experience dates stay on one line on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/#experience')

    const creatvisePeriod = page.locator('#experience ol > li').nth(3).locator('time span').first()
    await expect(creatvisePeriod).toHaveText('Oct 2023 — Jul 2024')
    await expect(creatvisePeriod).toHaveClass(/whitespace-nowrap/)

    const periodBox = await creatvisePeriod.boundingBox()
    expect(periodBox?.height).toBeLessThan(28)
  })

  test('experience cards use comfortable inner padding', async ({ page }) => {
    await page.goto('/#experience')

    const card = page.locator('#experience ol > li').first().locator('article')
    await expect(card).toHaveClass(/p-6/)
    await expect(card).toHaveClass(/md:p-7/)
  })

  test('experience section uses band variant', async ({ page }) => {
    await page.goto('/#experience')

    await expect(page.locator('#experience')).toHaveAttribute('data-section-variant', 'band')
  })

  test('experience cards show employment type badges only', async ({ page }) => {
    await page.goto('/#experience')

    const presentEntry = page.locator('#experience ol > li').first()
    await expect(presentEntry.locator('[data-employment-type="full-time"]')).toBeVisible()
    await expect(presentEntry.locator('[data-mission-phase]')).toHaveCount(0)

    const luneblazeEntry = page.locator('#experience ol > li').last()
    await expect(luneblazeEntry.locator('[data-employment-type="intern"]')).toBeVisible()

    await expect(page.locator('#experience [data-mission-legend]')).toHaveCount(0)
  })
})
