import { Link, useParams } from 'react-router-dom'

import { getProjectBySlug } from '@/content'
import { Layout } from '@/features/shell'
import { Container, Section } from '@/shared/ui'

import { ProjectDetail } from './ProjectDetail'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    return (
      <Layout>
        <Section ariaLabel="Project not found">
          <Container className="max-w-3xl py-20 text-center">
            <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
            <p className="mt-4 text-muted-foreground">
              The mission you are looking for does not exist in this portfolio.
            </p>
            <Link
              to="/"
              className="mt-8 inline-block text-accent underline-offset-4 hover:underline"
            >
              Return home
            </Link>
          </Container>
        </Section>
      </Layout>
    )
  }

  return (
    <Layout>
      <ProjectDetail project={project} />
    </Layout>
  )
}
