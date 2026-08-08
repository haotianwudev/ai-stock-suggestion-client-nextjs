"use client";

import { Download, Share, SquarePlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useInstallPrompt } from "@/hooks/use-install-prompt";

/**
 * "Install App" affordance for the home page. Renders nothing once the site
 * is already running as an installed PWA. On Android/Chrome it triggers the
 * native install prompt; on iOS Safari (which has no such prompt) it opens
 * a popover with manual "Add to Home Screen" steps.
 */
export function InstallAppButton() {
  const { canPromptInstall, isIOS, isStandalone, promptInstall } = useInstallPrompt();

  if (isStandalone || (!canPromptInstall && !isIOS)) {
    return null;
  }

  const buttonClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-accent transition-colors";

  if (isIOS) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button aria-label="Install App" title="Install App" className={buttonClass}>
            <Download className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 text-sm space-y-2">
          <p className="font-medium">Install SOPHIE on your phone</p>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            1. Tap <Share className="h-3.5 w-3.5 inline" /> Share
          </p>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            2. Tap <SquarePlus className="h-3.5 w-3.5 inline" /> Add to Home Screen
          </p>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <button
      onClick={promptInstall}
      aria-label="Install App"
      title="Install App"
      className={buttonClass}
    >
      <Download className="h-4 w-4" />
    </button>
  );
}
