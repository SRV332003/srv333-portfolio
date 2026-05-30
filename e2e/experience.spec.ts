import { expect, test } from '@playwright/test'

test.describe('Experience section', () => {
  test('shows subtitle and timeline spine', async ({ page }) => {
    await page.goto('/#experience')

    await expect(
      page.getByText('Ground systems, mission operations, and the path from launch to orbit.'),
    ).toBeVisible()
    await expect(page.locator('#experience [data-timeline-spine]')).toBeVisible()
  })

  test('highlights current role on the timeline', async ({ page }) => {
    await page.goto('/#experience')

    const presentEntry = page.locator('#experience ol > li').first()
    await expect(presentEntry.getByText('Stellar Dynamics')).toBeVisible()
    await expect(presentEntry.getByText('Current')).toBeVisible()
    await expect(presentEntry.getByText('Mar 2022 — Present')).toBeVisible()
    await expect(presentEntry.locator('article')).toHaveClass(/ring-primary/)
  })

  test('experience dates stay on one line on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/#experience')

    const pastPeriod = page.locator('#experience ol > li').nth(1).locator('time span').first()
    await expect(pastPeriod).toHaveText('Jun 2019 — Feb 2022')
    await expect(pastPeriod).toHaveClass(/whitespace-nowrap/)

    const periodBox = await pastPeriod.boundingBox()
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

  test('experience cards show mission phase labels', async ({ page }) => {
    await page.goto('/#experience')

    const presentEntry = page.locator('#experience ol > li').first()
    await expect(presentEntry.getByText('Orbit', { exact: true })).toBeVisible()

    const pastEntry = page.locator('#experience ol > li').nth(1)
    await expect(pastEntry.getByText('Launch', { exact: true })).toBeVisible()

    await expect(page.locator('#experience [data-mission-legend]')).toBeVisible()
  })
})
