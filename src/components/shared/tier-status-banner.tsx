"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Profile } from "@/hooks/use-user";
import { getTierName, nextLikeMilestone } from "@/lib/tiers";
import { cn } from "@/lib/utils";

/**
 * Transient "how to rank up" status line -- shows for 10s then fades and
 * unmounts, re-triggered whenever the underlying profile stats change (e.g.
 * right after a like/subscribe action bumps likedCount or tier).
 */
export function TierStatusBanner({ profile }: { profile: Profile | null }) {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setVisible(true);
    setDismissed(false);
    const fadeTimer = setTimeout(() => setVisible(false), 10000);
    const removeTimer = setTimeout(() => setDismissed(true), 10500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [profile?.tier, profile?.likedCount, profile?.youtubeSubscribed]);

  if (!profile || dismissed) return null;

  const milestone = nextLikeMilestone(profile.tier);
  const remainingLikes = milestone ? Math.max(0, milestone.likesNeeded - profile.likedCount) : 0;

  let nextStepText: string;
  if (!milestone) {
    nextStepText = "You've maxed out the rank ladder.";
  } else if (milestone.alsoNeedsSubscribe && !profile.youtubeSubscribed) {
    nextStepText = `Subscribe + like a video to reach ${getTierName(milestone.tier)}.`;
  } else if (remainingLikes > 0) {
    nextStepText = `Like ${remainingLikes} more video${remainingLikes === 1 ? "" : "s"} to reach ${getTierName(milestone.tier)}.`;
  } else {
    nextStepText = `You're about to reach ${getTierName(milestone.tier)}.`;
  }

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-xs text-muted-foreground transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <Sparkles className="size-3.5 shrink-0 text-primary" />
      <span>
        <span className="font-medium text-foreground">{getTierName(profile.tier)}</span>
        {" — "}
        {nextStepText}
      </span>
    </div>
  );
}
