import type { ReactNode } from 'react'

import { StarfieldBackground } from '@/features/canvas'
import { MissionControlProvider } from '@/features/mission-control'

import { Footer } from './Footer'
import { Header } from './Header'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <StarfieldBackground />
      <MissionControlProvider />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
