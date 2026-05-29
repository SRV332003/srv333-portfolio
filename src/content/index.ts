import portfolioJson from './portfolio.json'
import { portfolioSchema, type Portfolio } from './schema'

export function loadPortfolio(): Portfolio {
  return portfolioSchema.parse(portfolioJson)
}

export { portfolioSchema } from './schema'
export type { Portfolio } from './schema'
