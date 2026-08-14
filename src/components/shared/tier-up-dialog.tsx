"use client";

import { PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

/**
 * Shared congrats popup for every rank-up moment: first login (Intern),
 * subscribing, and each tier crossed via the like ladder (see
 * nextLikeMilestone/tierUnlockKey in lib/tiers.ts). Callers own the
 * open/close state and just pass the copy for this specific moment.
 */
export function TierUpDialog({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}) {
  const { t } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm text-center">
        <DialogHeader className="items-center text-center sm:text-center">
          <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PartyPopper className="size-7" />
          </div>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button>{t("tierUpDialog.nice")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
