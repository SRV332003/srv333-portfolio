import { expect, test } from '@playwright/test'

test.describe('SEO', () => {
  test('home sets canonical link and JSON-LD person schema', async ({ page }) => {
    await page.goto('/')

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /\/$/)

    const jsonLd = page.locator('script#json-ld-home')
    await expect(jsonLd).toHaveCount(1)
    const data = JSON.parse((await jsonLd.textContent()) ?? '{}')
    expect(data['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'WebSite' }),
        expect.objectContaining({
          '@type': 'Person',
          name: 'Sourav Garg',
          jobTitle: 'Software Engineer',
        }),
      ]),
    )

    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'Sourav Garg',
    )
  })

  test('project detail sets canonical to project path', async ({ page }) => {
    await page.goto('/projects/github-roaster')

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/projects\/github-roaster$/,
    )
    await expect(page).toHaveTitle(/Github Roaster — Sourav Garg/)
  })
})
