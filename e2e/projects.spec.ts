import { expect, test } from '@playwright/test'

import { buildMailtoUrl } from '../src/features/contact/mailto'

test.describe('Projects', () => {
  test('filter query param opens featured tab', async ({ page }) => {
    await page.goto('/?filter=featured#projects')

    await expect(page.getByRole('tab', { name: 'Featured (3)' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    const featuredPanel = page.getByRole('tabpanel', { name: 'Featured (3)' })
    await expect(featuredPanel.getByRole('link', { name: 'View Go Music' })).toHaveCount(0)
  })

  test('tab filter switches visible project cards', async ({ page }) => {
    await page.goto('/#projects')

    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Featured (3)' })).toBeVisible()

    const allPanel = page.getByRole('tabpanel', { name: 'All' })
    await expect(allPanel.getByRole('link', { name: 'View Github Roaster' })).toBeVisible()
    await expect(allPanel.getByRole('link', { name: 'View LC Police' })).toBeVisible()
    await expect(allPanel.getByRole('link', { name: 'View Go Music' })).toBeVisible()

    await page.getByRole('tab', { name: 'Featured (3)' }).click()

    const featuredPanel = page.getByRole('tabpanel', { name: 'Featured (3)' })
    await expect(
      featuredPanel.getByRole('link', { name: 'View Github Roaster' }),
    ).toBeVisible()
    await expect(
      featuredPanel.getByRole('link', { name: 'View LC Police' }),
    ).toBeVisible()
    await expect(
      featuredPanel.getByRole('link', { name: 'View BingeChat' }),
    ).toBeVisible()
    await expect(featuredPanel.getByRole('link', { name: 'View Go Music' })).toHaveCount(0)
  })

  test('project detail page shows title and body', async ({ page }) => {
    await page.goto('/projects/github-roaster')

    await expect(page.getByRole('heading', { name: 'Github Roaster', level: 1 })).toBeVisible()
    await expect(
      page.getByText(
        'Developers enjoy playful feedback on their public GitHub profiles',
      ),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Live demo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Live demo' })).toHaveAttribute(
      'href',
      'https://gitroaster.streamlit.app/',
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

    const flagshipCard = page.getByRole('link', { name: 'View Github Roaster' })
    await expect(flagshipCard).toBeVisible()
    await expect(page.getByAltText('Github Roaster AI web interface preview')).toBeVisible()
  })

  test('project cards show outcome teasers and case study affordance', async ({ page }) => {
    await page.goto('/#projects')

    const flagshipCard = page
      .getByRole('link', { name: 'View Github Roaster' })
      .locator('xpath=ancestor::article[1]')
    await expect(flagshipCard.getByText('6K', { exact: true })).toBeVisible()
    await expect(flagshipCard.getByText('Developers on day one')).toBeVisible()
    await expect(flagshipCard.getByText('View case study')).toBeVisible()
  })

  test('projects section shows subtitle', async ({ page }) => {
    await page.goto('/#projects')

    await expect(
      page.getByText('Side projects and shipped products — from AI roasts to plagiarism detection and real-time chat.'),
    ).toBeVisible()
  })

  test('projects nav is active on detail route', async ({ page }) => {
    await page.goto('/projects/github-roaster')

    const projectsNav = page.getByRole('navigation', { name: 'Main' }).getByRole('link', {
      name: 'Projects',
      exact: true,
    })
    await expect(projectsNav).toHaveAttribute('aria-current', 'page')
  })

  test('flagship card spans wider grid on large viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/#projects')

    const flagshipItem = page
      .getByRole('link', { name: 'View Github Roaster' })
      .locator('xpath=ancestor::li[1]')
    await expect(flagshipItem).toHaveClass(/lg:col-span-2/)
  })

  test('detail page shows hero image, meta, and outcomes', async ({ page }) => {
    await page.goto('/projects/github-roaster')

    await expect(page.getByAltText('Github Roaster AI web interface preview')).toBeVisible()
    await expect(page.getByText('AI & developer tools · 2024 · Creator')).toBeVisible()
    const outcomesStrip = page.locator('dl').filter({ hasText: 'Developers on day one' })
    await expect(outcomesStrip.getByText('6K', { exact: true })).toBeVisible()
    await expect(outcomesStrip.getByText('Developers on day one')).toBeVisible()
    await expect(outcomesStrip.getByText('AWS', { exact: true })).toBeVisible()
    await expect(outcomesStrip.getByText('EC2 production deploy')).toBeVisible()
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
      'srvgarg332003@gmail.com',
      'Test User',
      'test@example.com',
      'Hello from Playwright test message.',
    )

    expect(mailtoHref).toMatch(/^mailto:srvgarg332003@gmail\.com/)
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
