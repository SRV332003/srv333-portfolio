import { useEffect } from 'react'

import { applyPageMeta, type PageMeta } from './documentMeta'

type DocumentHeadProps = PageMeta

export function DocumentHead(props: DocumentHeadProps) {
  const { title, description, ogImage, path } = props

  useEffect(() => {
    applyPageMeta({ title, description, ogImage, path })
  }, [title, description, ogImage, path])

  return null
}
