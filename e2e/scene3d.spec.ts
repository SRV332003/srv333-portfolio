import { expect, test } from '@playwright/test'

test.describe('Scene3D visuals', () => {
  test('hero renders decorative 3D wrapper without WebGL errors', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')

    const heroWrapper = page.locator('[data-scene3d="hero"]')
    await expect(heroWrapper).toBeVisible()

    const webglErrors = consoleErrors.filter(
      (text) =>
        text.toLowerCase().includes('webgl') ||
        text.toLowerCase().includes('three') ||
        text.toLowerCase().includes('context lost'),
    )
    expect(webglErrors).toHaveLength(0)
  })

  test('prefers-reduced-motion uses CSS fallback without scene3d canvases', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.locator('[data-scene3d="hero"]')).toBeVisible()

    const scene3dCanvases = page.locator('[data-scene3d] canvas')
    await expect(scene3dCanvases).toHaveCount(0)
  })

  test('reduced-motion fallback orb uses hero planet glow token', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const orb = page.locator('[data-scene3d-fallback="orb"]')
    await expect(orb).toBeVisible()

    await expect(orb).toHaveAttribute(
      'style',
      expect.stringContaining('var(--hero-planet-glow)'),
    )

    const background = await orb.evaluate((el) => getComputedStyle(el).background)
    expect(background).toMatch(/radial-gradient/i)
  })

  test('hero scene3d wrapper may contain canvas when motion is allowed', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')

    const heroWrapper = page.locator('[data-scene3d="hero"]')
    await expect(heroWrapper).toBeVisible()

    await expect
      .poll(async () => heroWrapper.locator('canvas').count(), { timeout: 10_000 })
      .toBeGreaterThan(0)
  })
})
