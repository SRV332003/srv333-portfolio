import { expect, test } from '@playwright/test'

function alphaFromColor(color: string): number {
  const slashAlpha = color.match(/\/\s*([\d.]+)\s*\)/)
  if (slashAlpha) return parseFloat(slashAlpha[1]!)
  const rgbaAlpha = color.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/)
  if (rgbaAlpha) return parseFloat(rgbaAlpha[1]!)
  return 1
}

test.describe('Home page UI', () => {
  test('sets document title and meta from portfolio', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('Sourav Garg — Software Engineer')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Software engineer building Go microservices/,
    )
  })

  test('renders all portfolio section headings', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('#experience')).toBeVisible()
    await expect(page.locator('#projects')).toBeVisible()
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#skills')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'About', exact: true })).toBeVisible()
    await expect(
      page.getByText('From intern orbits to full-time flight.'),
    ).toBeVisible()
    const about = page.locator('#about')
    await expect(about.getByRole('heading', { name: 'Achievements', exact: true })).toBeVisible()
    await expect(about.getByRole('heading', { name: 'Education', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Skills', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Establish contact' })).toBeVisible()
    await expect(
      page.getByText('Software engineering roles, collaborations'),
    ).toBeVisible()
  })

  test('renders hero, navigation, and starfield layer', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')

    const hero = page.locator('#hero')
    await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Sourav Garg')
    await expect(
      hero.getByText(/Software engineer at Omniful — Go, Python, and systems that scale/),
    ).toBeVisible()
    await expect(hero.getByText('Software engineer · Omniful · 1+ years')).toBeVisible()

    await expect(page.getByRole('banner').getByRole('link', { name: 'Home — Sourav Garg' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projects', exact: true })).toBeVisible()
    await expect(hero.getByRole('button', { name: 'View projects', exact: true })).toBeVisible()
    await expect(hero.getByRole('button', { name: 'GitHub', exact: true })).toBeVisible()
    await expect(hero.getByRole('button', { name: 'LinkedIn', exact: true })).toBeVisible()
    await expect(
      page.getByRole('banner').getByRole('button', { name: 'View projects', exact: true }),
    ).toBeVisible()

    const starfieldLayer = page.locator('.pointer-events-none.fixed.inset-0')
    await expect(starfieldLayer).toBeVisible()

    await expect(page.locator('[data-scene3d="hero"]')).toBeVisible()

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

  test('hero and header CTAs have correct href', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#hero')
    const heroCta = hero.getByRole('button', { name: 'View projects', exact: true })
    await expect(heroCta).toHaveAttribute('href', '#projects')
    const github = hero.getByRole('button', { name: 'GitHub', exact: true })
    const linkedin = hero.getByRole('button', { name: 'LinkedIn', exact: true })
    await expect(github).toHaveAttribute('href', 'https://github.com/SRV332003')
    await expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/srv333')
    await expect(hero.getByRole('button', { name: 'Resume', exact: true })).toHaveCount(0)

    const banner = page.getByRole('banner')
    const headerResume = banner.getByRole('button', { name: 'Resume', exact: true })
    const headerProjects = banner.getByRole('button', { name: 'View projects', exact: true })
    await expect(headerResume).toHaveAttribute('href', '/assets/resume.pdf')
    await expect(headerProjects).toHaveAttribute('href', '#projects')
  })

  test('header is semi-transparent so starfield shows through', async ({
    page,
  }) => {
    await page.goto('/')

    const headerStyles = await page.getByRole('banner').evaluate((el) => {
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
    await page.locator('footer').scrollIntoViewIfNeeded()

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

      const footerHtml = footerEl as HTMLElement
      const footerOffsetEnd = footerHtml.offsetTop + footerHtml.offsetHeight
      const docEnd = document.documentElement.offsetHeight

      return {
        footerAtDocumentEnd: Math.abs(footerOffsetEnd - docEnd) < 4,
        mainAboveFooter: mainRect.bottom <= footerRect.top + 1,
        borderTopWidth: footerStyle.borderTopWidth,
        backgroundColor: footerStyle.backgroundColor,
        boxShadow: footerStyle.boxShadow,
        innerPaddingTop: innerStyle.paddingTop,
      }
    })

    expect(layout).not.toBeNull()
    expect(layout!.footerAtDocumentEnd).toBe(true)
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

test.describe('Phase 5 identity', () => {
  test('shows role line, resume links, and about identity', async ({ page }) => {
    await page.goto('/')

    const hero = page.locator('#hero')
    await expect(
      hero.getByText(/Software engineer at Omniful — Go, Python, and systems that scale/),
    ).toBeVisible()
    await expect(hero.getByText('Omniful · WMS')).toBeVisible()
    await expect(hero.getByText('Go in production')).toBeVisible()
    await expect(hero.getByText(/AI side projects/)).toBeVisible()
    await expect(hero.getByText('3★ CodeChef')).toBeVisible()

    const banner = page.getByRole('banner')
    const headerResume = banner.getByRole('button', { name: 'Resume', exact: true })
    await expect(headerResume).toBeVisible()
    await expect(headerResume).toHaveAttribute('href', '/assets/resume.pdf')
    await expect(banner.getByRole('button', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/SRV332003',
    )
    await expect(banner.getByRole('button', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/srv333',
    )

    const avatar = page.locator('#about img')
    await expect(avatar).toBeVisible()
    await expect(avatar).toHaveAttribute('alt', 'Portrait of Sourav Garg')

    await expect(page.getByText('Gurgaon, India · IST')).toBeVisible()
    await expect(page.getByText(openToText)).toBeVisible()

    await expect(page.getByText(contactIntro)).toBeVisible()
    expect(openToText).not.toBe(contactIntro)
  })
})

test.describe('Phase 7 visual system', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('hero primary CTA is visible above the fold on mobile', async ({ page }) => {
    await page.goto('/')

    const heroCta = page.locator('#hero').getByRole('button', { name: 'View projects', exact: true })
    await expect(heroCta).toBeVisible()
    await expect(heroCta).toBeInViewport()
  })

  test('experience section uses band variant after hero', async ({ page }) => {
    await page.goto('/#experience')

    await expect(page.locator('#experience')).toHaveAttribute('data-section-variant', 'band')
    await expect(page.locator('#experience [data-section-wash="experience"]')).toBeVisible()
  })

  test('projects section keeps nebula wash on default variant', async ({ page }) => {
    await page.goto('/#projects')

    await expect(page.locator('#projects')).toHaveAttribute('data-section-variant', 'default')
    await expect(page.locator('#projects [data-section-wash="projects"]')).toBeVisible()
  })

  test('contact section uses band variant and nebula wash', async ({ page }) => {
    await page.goto('/#contact')

    await expect(page.locator('#contact')).toHaveAttribute('data-section-variant', 'band')
    await expect(page.locator('#contact [data-section-wash="contact"]')).toBeVisible()
  })

  test('project card link shows focus ring when tabbed', async ({ page }) => {
    await page.goto('/#projects')

    const cardLink = page.getByRole('link', { name: 'View Github Roaster' })
    await cardLink.focus()
    await expect(cardLink).toBeFocused()
    await expect(cardLink).toHaveClass(/focus-visible:ring-2/)
  })
})

const openToText =
  'Open to software engineering roles at product startups and growth-stage teams.'
const contactIntro = 'Send a message — I usually reply within a couple of business days.'
