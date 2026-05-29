import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { HomePage } from '@/features/home/HomePage'

const ProjectDetailPage = lazy(() =>
  import('@/features/projects/ProjectDetailPage').then((mod) => ({
    default: mod.ProjectDetailPage,
  })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/projects/:slug"
        element={
          <Suspense fallback={null}>
            <ProjectDetailPage />
          </Suspense>
        }
      />
    </Routes>
  )
}
