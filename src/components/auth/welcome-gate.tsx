"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { TierUpDialog } from "@/components/shared/tier-up-dialog";

/**
 * Fires the "Welcome to SOPHIE!" congrats dialog exactly once per user, the
 * first time this browser sees them signed in -- localStorage-gated, same
 * honor-system spirit as the rest of the tier system (no server flag, no
 * `createdAt` check). Mounted once in Header since that's global on every
 * page; renders nothing of its own besides the dialog when triggered.
 */
export function WelcomeGate() {
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    const key = `sophie_welcomed_${user.id}`;
    if (typeof window === "undefined" || localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
    setOpen(true);
  }, [loading, user]);

  return (
    <TierUpDialog
      open={open}
      onOpenChange={setOpen}
      title="Welcome to SOPHIE!"
      description="You've joined as an Intern. Subscribe on YouTube and like a video to start ranking up."
    />
  );
}
