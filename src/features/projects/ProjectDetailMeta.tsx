import { useMemo } from 'react'

import { loadPortfolio } from '@/content'
import type { Project } from '@/content'
import { DocumentHead, JsonLdScript, buildProjectJsonLd, getSiteOrigin } from '@/shared/seo'

type ProjectDetailMetaProps = {
  project: Project
}

export function ProjectDetailMeta({ project }: ProjectDetailMetaProps) {
  const { meta } = loadPortfolio()
  const jsonLd = useMemo(
    () => buildProjectJsonLd(project, getSiteOrigin(), meta.name),
    [meta.name, project],
  )
  const publishedTime = project.year ? `${project.year}-01-01T00:00:00.000Z` : undefined
  const combinedKeywords = Array.from(
    new Set([...(project.tech ?? []), project.domain ?? '', ...(meta.keywords ?? [])].filter(Boolean)),
  )

  return (
    <>
      <DocumentHead
        title={`${project.title} — ${meta.name}`}
        description={project.summary}
        ogImage={project.image ?? meta.ogImage}
        path={`/projects/${project.slug}`}
        siteName={meta.name}
        author={meta.name}
        publishedTime={publishedTime}
        modifiedTime={publishedTime}
        type="article"
        keywords={combinedKeywords}
      />
      <JsonLdScript id={`project-${project.slug}`} data={jsonLd} />
    </>
  )
}
