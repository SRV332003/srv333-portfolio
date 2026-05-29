import { expect, test } from '@playwright/test'

import { buildMailtoUrl } from '../src/features/contact/mailto'

test.describe('Projects', () => {
  test('tab filter switches visible project cards', async ({ page }) => {
    await page.goto('/#projects')

    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Featured' })).toBeVisible()

    await expect(page.getByRole('link', { name: 'View Orbital Telemetry Console' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View Launch Pad CI' })).toBeVisible()

    await page.getByRole('tab', { name: 'Featured' }).click()

    await expect(page.getByRole('link', { name: 'View Orbital Telemetry Console' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View Nebula Design System' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'View Launch Pad CI' })).toHaveCount(0)
  })

  test('project detail page shows title and body', async ({ page }) => {
    await page.goto('/projects/orbital-telemetry')

    await expect(
      page.getByRole('heading', { name: 'Orbital Telemetry Console', level: 1 }),
    ).toBeVisible()
    await expect(
      page.getByText(
        'Mission operators lacked a unified view of satellite health across multiple buses',
      ),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Live demo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Live demo' })).toHaveAttribute(
      'href',
      'https://example.com/orbital',
    )
  })

  test('unknown slug shows not-found UI', async ({ page }) => {
    await page.goto('/projects/unknown-mission')

    await expect(page.getByRole('heading', { name: 'Project not found' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible()
  })
})

test.describe('Phase 6 case studies', () => {
  test('project cards show thumbnails on home grid', async ({ page }) => {
    await page.goto('/#projects')

    const orbitalCard = page.getByRole('link', { name: 'View Orbital Telemetry Console' })
    await expect(orbitalCard).toBeVisible()
    await expect(
      page.getByAltText('Orbital Telemetry Console dashboard showing satellite health metrics'),
    ).toBeVisible()
  })

  test('flagship card spans wider grid on large viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/#projects')

    const flagshipItem = page
      .getByRole('link', { name: 'View Orbital Telemetry Console' })
      .locator('xpath=ancestor::li[1]')
    await expect(flagshipItem).toHaveClass(/lg:col-span-2/)
  })

  test('detail page shows hero image, meta, and outcomes', async ({ page }) => {
    await page.goto('/projects/orbital-telemetry')

    await expect(
      page.getByAltText('Orbital Telemetry Console dashboard showing satellite health metrics'),
    ).toBeVisible()
    await expect(page.getByText('Mission operations · 2024 · Lead frontend engineer')).toBeVisible()
    const outcomesStrip = page.locator('dl').filter({ hasText: 'Anomaly detection latency' })
    await expect(outcomesStrip.getByText('<2s', { exact: true })).toBeVisible()
    await expect(outcomesStrip.getByText('Anomaly detection latency')).toBeVisible()
    await expect(outcomesStrip.getByText('40%', { exact: true })).toBeVisible()
    await expect(outcomesStrip.getByText('Faster operator response')).toBeVisible()
  })
})

test.describe('Contact form', () => {
  test('shows validation errors for empty submit', async ({ page }) => {
    await page.goto('/#contact')

    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByText('Name is required')).toBeVisible()
    await expect(page.getByText('Enter a valid email')).toBeVisible()
    await expect(page.getByText('Message must be at least 10 characters')).toBeVisible()
  })

  test('valid submit builds mailto URL', async ({ page }) => {
    await page.goto('/#contact')

    const mailtoHref = buildMailtoUrl(
      'nova@example.com',
      'Test User',
      'test@example.com',
      'Hello from Playwright test message.',
    )

    expect(mailtoHref).toMatch(/^mailto:nova@example\.com/)
    expect(mailtoHref).toContain('subject=')
    expect(mailtoHref).toContain('body=')

    await page.getByLabel('Name').fill('Test User')
    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Message').fill('Hello from Playwright test message.')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByText('Name is required')).toHaveCount(0)
  })
})

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('sheet opens and nav link is accessible', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    const mobileNav = page.getByRole('navigation', { name: 'Mobile' })
    await expect(mobileNav).toBeVisible()
    await expect(mobileNav.getByRole('link', { name: 'About' })).toBeVisible()

    await mobileNav.getByRole('link', { name: 'About' }).click()
    await expect(mobileNav).not.toBeVisible()
  })
})
