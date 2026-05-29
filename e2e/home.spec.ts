import { expect, test } from '@playwright/test'

function alphaFromColor(color: string): number {
  const slashAlpha = color.match(/\/\s*([\d.]+)\s*\)/)
  if (slashAlpha) return parseFloat(slashAlpha[1]!)
  const rgbaAlpha = color.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/)
  if (rgbaAlpha) return parseFloat(rgbaAlpha[1]!)
  return 1
}

test.describe('Home page UI', () => {
  test('renders hero, navigation, and starfield layer', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Engineering software that orbits the impossible.',
    )

    await expect(
      page.getByText('Mission control for curious builders'),
    ).toBeVisible()

    await expect(page.getByRole('link', { name: 'Nova Chen' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'View missions' }).first(),
    ).toBeVisible()

    const starfieldLayer = page.locator('.pointer-events-none.fixed.inset-0')
    await expect(starfieldLayer).toBeVisible()

    const canvas = page.locator('canvas[aria-hidden="true"]')
    if ((await canvas.count()) > 0) {
      await expect(canvas).toBeVisible()
      const box = await canvas.boundingBox()
      expect(box?.width).toBeGreaterThan(300)
      expect(box?.height).toBeGreaterThan(300)
    }

    const baseUiWarnings = consoleErrors.filter((t) =>
      t.includes('Base UI: A component that acts as a button'),
    )
    expect(baseUiWarnings).toHaveLength(0)

    await page.screenshot({
      path: 'e2e/screenshots/home-desktop.png',
      fullPage: true,
    })
  })

  test('header CTA has correct href', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('button', { name: 'View missions' }).first()
    await expect(cta).toHaveAttribute('href', '#projects')
  })

  test('header is semi-transparent so starfield shows through', async ({
    page,
  }) => {
    await page.goto('/')

    const headerStyles = await page.locator('header').evaluate((el) => {
      const style = getComputedStyle(el)
      return {
        backgroundColor: style.backgroundColor,
        backdropFilter: style.backdropFilter,
      }
    })

    expect(headerStyles.backdropFilter).not.toBe('none')
    expect(alphaFromColor(headerStyles.backgroundColor)).toBeLessThan(0.6)
    expect(headerStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')

    const canvasBehindHeader = await page.evaluate(() => {
      const header = document.querySelector('header')
      const canvas = document.querySelector('canvas')
      if (!header || !canvas) return { hasCanvas: false, headerOverCanvas: true }

      const headerRect = header.getBoundingClientRect()
      const canvasRect = canvas.getBoundingClientRect()
      return {
        hasCanvas: true,
        headerOverCanvas:
          canvasRect.top <= headerRect.top &&
          canvasRect.height >= headerRect.bottom,
      }
    })

    expect(canvasBehindHeader.headerOverCanvas).toBe(true)
  })

  test('footer is separated at the bottom with distinct styling', async ({
    page,
  }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByText(/All rights reserved/)).toBeVisible()
    await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible()

    const layout = await page.evaluate(() => {
      const footerEl = document.querySelector('footer')
      const mainEl = document.querySelector('main')
      const footerInner = footerEl?.firstElementChild
      if (!footerEl || !mainEl || !footerInner) return null

      const footerRect = footerEl.getBoundingClientRect()
      const mainRect = mainEl.getBoundingClientRect()
      const footerStyle = getComputedStyle(footerEl)
      const innerStyle = getComputedStyle(footerInner)

      return {
        footerAtBottom: Math.abs(footerRect.bottom - window.innerHeight) < 2,
        mainAboveFooter: mainRect.bottom <= footerRect.top + 1,
        borderTopWidth: footerStyle.borderTopWidth,
        backgroundColor: footerStyle.backgroundColor,
        boxShadow: footerStyle.boxShadow,
        innerPaddingTop: innerStyle.paddingTop,
      }
    })

    expect(layout).not.toBeNull()
    expect(layout!.footerAtBottom).toBe(true)
    expect(layout!.mainAboveFooter).toBe(true)
    expect(parseFloat(layout!.borderTopWidth)).toBeGreaterThan(0)
    expect(alphaFromColor(layout!.backgroundColor)).toBeLessThan(0.6)
    expect(layout!.boxShadow).not.toBe('none')
    expect(parseFloat(layout!.innerPaddingTop)).toBeGreaterThanOrEqual(24)

    await page.screenshot({
      path: 'e2e/screenshots/footer-separation.png',
      fullPage: true,
    })
  })
})
