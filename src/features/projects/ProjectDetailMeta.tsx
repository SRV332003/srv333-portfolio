import type { Project } from '@/content'
import { loadPortfolio } from '@/content'
import { DocumentHead } from '@/shared/seo'

type ProjectDetailMetaProps = {
  project: Project
}

export function ProjectDetailMeta({ project }: ProjectDetailMetaProps) {
  const { meta } = loadPortfolio()

  return (
    <DocumentHead
      title={`${project.title} — ${meta.name}`}
      description={project.summary}
      ogImage={project.image ?? meta.ogImage}
      path={`/projects/${project.slug}`}
    />
  )
}
