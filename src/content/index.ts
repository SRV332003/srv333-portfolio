import portfolioJson from './portfolio.json'
import { portfolioSchema, type Portfolio, type Project } from './schema'

export function loadPortfolio(): Portfolio {
  return portfolioSchema.parse(portfolioJson)
}

export function getProjectBySlug(slug: string): Project | undefined {
  const { projects } = loadPortfolio()
  return projects.find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return loadPortfolio().projects.map((project) => project.slug)
}

export { getResumeLabel, portfolioSchema } from './schema'
export type { Portfolio, Project, Experience } from './schema'
