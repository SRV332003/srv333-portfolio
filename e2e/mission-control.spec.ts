import { expect, test } from '@playwright/test'

test.describe('Mission control', () => {
  test('question mark opens mission control dialog', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('[data-mission-control-dialog]')).toHaveCount(0)

    await page.keyboard.press('?')

    const dialog = page.locator('[data-mission-control-dialog]')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { name: 'Mission control' })).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'Github Roaster — live demo' })).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'LC Police — case study' })).toBeVisible()
  })

  test('escape closes mission control dialog', async ({ page }) => {
    await page.goto('/')

    await page.keyboard.press('?')
    await expect(page.locator('[data-mission-control-dialog]')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('[data-mission-control-dialog]')).toHaveCount(0)
  })

  test('question mark does not open dialog when contact form is focused', async ({
    page,
  }) => {
    await page.goto('/#contact')

    await page.locator('#contact input[name="name"]').focus()
    await page.keyboard.press('?')

    await expect(page.locator('[data-mission-control-dialog]')).toHaveCount(0)
  })

  test('footer shows mission control hint', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('[data-mission-control-hint]')).toHaveText(
      'Press ? for mission control',
    )
  })
})
