import { expect, test } from '@playwright/test'

test.describe('Navigation active state', () => {
  test('contact link is active when contact section is in view', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    const mainNav = page.getByRole('navigation', { name: 'Main' })
    const contactLink = mainNav.getByRole('link', { name: 'Contact', exact: true })
    const skillsLink = mainNav.getByRole('link', { name: 'Skills', exact: true })

    await expect.poll(async () => contactLink.getAttribute('aria-current')).toBe('page')
    await expect(skillsLink).not.toHaveAttribute('aria-current', 'page')
  })

  test('clicking contact in nav highlights contact', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/#contact$/)

    const contactLink = page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Contact', exact: true })
    await expect(contactLink).toHaveAttribute('aria-current', 'page')
  })

  test('scrolling to projects highlights projects without clicking', async ({ page }) => {
    await page.goto('/')

    const mainNav = page.getByRole('navigation', { name: 'Main' })
    const projectsLink = mainNav.getByRole('link', { name: 'Projects', exact: true })

    await page.locator('#projects').scrollIntoViewIfNeeded()

    await expect
      .poll(async () => projectsLink.getAttribute('aria-current'))
      .toBe('page')
  })

  test('scrolling up from contact highlights skills', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()

    const mainNav = page.getByRole('navigation', { name: 'Main' })
    const skillsLink = mainNav.getByRole('link', { name: 'Skills', exact: true })
    const contactLink = mainNav.getByRole('link', { name: 'Contact', exact: true })

    await page.locator('#skills').scrollIntoViewIfNeeded()

    await expect.poll(async () => skillsLink.getAttribute('aria-current')).toBe('page')
    await expect(contactLink).not.toHaveAttribute('aria-current', 'page')
  })
})
