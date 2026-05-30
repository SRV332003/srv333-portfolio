import { loadPortfolio } from '@/content'
import { DocumentHead } from '@/shared/seo'

export function HomePageMeta() {
  const { meta } = loadPortfolio()

  return (
    <DocumentHead
      title={meta.title}
      description={meta.description}
      ogImage={meta.ogImage}
      path="/"
    />
  )
}
