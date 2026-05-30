import { ExternalLinkIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { loadPortfolio } from '@/content'

type MissionControlDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MissionControlDialog({
  open,
  onOpenChange,
}: MissionControlDialogProps) {
  const { missionControl } = loadPortfolio()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-mission-control-dialog
        className="border-border/50 bg-card/95 backdrop-blur-md sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-section font-semibold tracking-tight">
            {missionControl.title}
          </DialogTitle>
        </DialogHeader>

        <section aria-labelledby="mission-control-shortcuts">
          <h3
            id="mission-control-shortcuts"
            className="mb-3 text-xs font-semibold tracking-widest text-primary uppercase"
          >
            Shortcuts
          </h3>
          <ul className="flex flex-col gap-2">
            {missionControl.shortcuts.map((shortcut) => (
              <li key={shortcut.href}>
                <a
                  href={shortcut.href}
                  className="flex items-center justify-between rounded-lg border border-border/40 bg-background/40 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  onClick={() => onOpenChange(false)}
                >
                  {shortcut.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="mission-control-transmissions">
          <h3
            id="mission-control-transmissions"
            className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase"
          >
            Transmissions
          </h3>
          <ul className="flex flex-col gap-2">
            {missionControl.transmissions.map((transmission) => (
              <li key={transmission.href}>
                <a
                  href={transmission.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground"
                >
                  <span className="min-w-0 flex-1">{transmission.label}</span>
                  {transmission.kind ? (
                    <Badge variant="secondary" className="shrink-0 capitalize">
                      {transmission.kind}
                    </Badge>
                  ) : null}
                  <ExternalLinkIcon className="size-3.5 shrink-0 opacity-60" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </DialogContent>
    </Dialog>
  )
}
