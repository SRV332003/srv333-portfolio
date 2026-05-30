import { expect, test } from '@playwright/test'

test.describe('About section', () => {
  test('shows wash, open-to callout, and social links', async ({ page }) => {
    await page.goto('/#about')

    await expect(page.locator('#about [data-section-wash="about"]')).toBeVisible()
    await expect(page.locator('#about [data-about-open-to]')).toBeVisible()
    await expect(page.locator('#about').getByRole('link', { name: 'GitHub' })).toBeVisible()
    await expect(page.locator('#about').getByRole('link', { name: 'LinkedIn' })).toBeVisible()
    await expect(page.locator('#about [data-about-soft-skills]')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'How I work' })).toBeVisible()
    await expect(page.locator('#about [data-about-interests]')).toBeVisible()
    await expect(page.getByText('Guitar · Music · Dance')).toBeVisible()
  })
})

test.describe('Contact section', () => {
  test('shows section subtitle and frosted form panel', async ({ page }) => {
    await page.goto('/#contact')

    await expect(
      page.getByText('Backend roles, collaborations'),
    ).toBeVisible()
    await expect(page.locator('#contact form')).toBeVisible()
    await expect(page.getByText('Send a message — I usually reply')).toBeVisible()
  })
})
