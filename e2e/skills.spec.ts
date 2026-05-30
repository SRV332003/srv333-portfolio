import { expect, test } from '@playwright/test'

test.describe('Skills section', () => {
  test('shows subtitle and grouped skill badges without card grid', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/#skills')

    await expect(
      page.getByText('Languages and stacks used in production'),
    ).toBeVisible()

    const skills = page.locator('#skills')
    await expect(skills.locator('article')).toHaveCount(0)
    await expect(skills.getByRole('heading', { name: 'Languages', exact: true })).toBeVisible()
    await expect(skills.getByRole('heading', { name: 'Platform & tools', exact: true })).toBeVisible()
    await expect(skills.locator('[data-section-wash="skills"]')).toBeVisible()
  })

  test('skill badges use outline variant', async ({ page }) => {
    await page.goto('/#skills')

    const languagesGroup = page
      .locator('#skills')
      .getByRole('heading', { name: 'Languages', exact: true })
      .locator('..')
    await expect(languagesGroup.getByText('Go', { exact: true })).toBeVisible()
    await expect(languagesGroup.getByText('C/C++')).toBeVisible()
  })
})
