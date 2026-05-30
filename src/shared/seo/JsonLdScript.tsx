import { useEffect } from 'react'

type JsonLdScriptProps = {
  id: string
  data: Record<string, unknown>
}

export function JsonLdScript({ id, data }: JsonLdScriptProps) {
  useEffect(() => {
    const scriptId = `json-ld-${id}`
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)

    return () => {
      script?.remove()
    }
  }, [id, data])

  return null
}
