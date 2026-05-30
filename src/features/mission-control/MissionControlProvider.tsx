import { useCallback, useState } from 'react'

import { MissionControlDialog } from './MissionControlDialog'
import { useMissionControlShortcut } from './useMissionControlShortcut'

export function MissionControlProvider() {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => {
    setOpen((current) => !current)
  }, [])

  useMissionControlShortcut(toggle)

  return <MissionControlDialog open={open} onOpenChange={setOpen} />
}
