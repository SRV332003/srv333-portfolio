import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

import { buildRobotsTxt, buildSitemapXml } from './src/shared/seo/seoBuild'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function seoStaticFilesPlugin(): Plugin {
  return {
    name: 'seo-static-files',
    closeBundle() {
      const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '')
      if (!siteUrl) {
        console.warn(
          '[seo] VITE_SITE_URL is not set — skipping sitemap.xml and production robots.txt in dist/',
        )
        return
      }

      const portfolioPath = path.resolve(__dirname, 'src/content/portfolio.json')
      const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf8')) as {
        projects: { slug: string }[]
      }
      const paths = ['/', ...portfolio.projects.map((p) => `/projects/${p.slug}`)]
      const outDir = path.resolve(__dirname, 'dist')

      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemapXml(siteUrl, paths))
      fs.writeFileSync(path.join(outDir, 'robots.txt'), buildRobotsTxt(siteUrl))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoStaticFilesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three'
          }
        },
      },
    },
  },
})
