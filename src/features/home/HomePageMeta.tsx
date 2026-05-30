import { useMemo } from 'react'

import { loadPortfolio } from '@/content'
import { DocumentHead, JsonLdScript, buildHomeJsonLd, getSiteOrigin } from '@/shared/seo'

export function HomePageMeta() {
  const { meta } = loadPortfolio()
  const jsonLd = useMemo(() => buildHomeJsonLd(loadPortfolio(), getSiteOrigin()), [])

  return (
    <>
      <DocumentHead
        title={meta.title}
        description={meta.description}
        ogImage={meta.ogImage}
        path="/"
        siteName={meta.name}
      />
      <JsonLdScript id="home" data={jsonLd} />
    </>
  )
}
