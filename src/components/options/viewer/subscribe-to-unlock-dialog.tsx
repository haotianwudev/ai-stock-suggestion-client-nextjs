"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { ME, SET_YOUTUBE_SUBSCRIBED } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";
import { getTierName, tierUnlockKey, MIN_LIVE_OPTIONS_TIER } from "@/lib/tiers";
import { TierUpDialog } from "@/components/shared/tier-up-dialog";

const SOPHIE_YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@SOPHIEAIFinance";

/**
 * Prompt shown when a below-Tier-2 visitor tries to switch the options viewer (or the
 * standalone SPX payoff builder) to the live Cboe feed. Subscribing is the same
 * honor-system attestation used everywhere else Tier 2 is earned (see
 * YoutubeSubscribeGate, /settings/profile) -- this just surfaces it at the point where
 * the visitor actually wants the perk, instead of sending them off to settings first.
 */
export function SubscribeToUnlockDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { user, profile } = useUser();
  const { t } = useLanguage();
  const [congrats, setCongrats] = useState<{ title: string; description: string } | null>(null);
  const [setYoutubeSubscribed, { loading: confirming }] = useMutation<{
    setYoutubeSubscribed: MeResult;
  }>(SET_YOUTUBE_SUBSCRIBED, { refetchQueries: [{ query: ME }] });

  const confirmSubscribed = async () => {
    try {
      const prevTier = profile?.tier ?? 1;
      const { data } = await setYoutubeSubscribed({ variables: { subscribed: true } });
      onOpenChange(false);

      const newTier = data?.setYoutubeSubscribed.tier ?? prevTier;
      if (newTier > prevTier) {
        const unlockKey = tierUnlockKey(newTier);
        setCongrats({
          title: t("articleFrame.congratsTitle", { tier: getTierName(newTier) }),
          description: unlockKey ? t(unlockKey) : t("articleFrame.congratsKeepItUp"),
        });
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profileSettings.genericError"));
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader className="items-center text-center sm:text-center">
            <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-red-600/10 text-red-600 dark:text-red-500">
              <Youtube className="size-7" />
            </div>
            <DialogTitle className="text-xl">Subscribe to unlock real-time data</DialogTitle>
            <DialogDescription>
              Subscribe to the SOPHIE YouTube channel to unlock the live Cboe options feed
              — requires {getTierName(MIN_LIVE_OPTIONS_TIER)} (Tier {MIN_LIVE_OPTIONS_TIER}+).
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-2 pt-2">
            <a
              href={SOPHIE_YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700"
            >
              <Youtube className="size-4" />
              Subscribe on YouTube
            </a>
            <span className="pt-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
              or
            </span>
            {user ? (
              <button
                onClick={confirmSubscribed}
                disabled={confirming}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-600 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50 dark:text-red-500 dark:hover:text-white"
              >
                {confirming ? "Confirming..." : "I'm already subscribed — confirm"}
              </button>
            ) : (
              <Link
                href="/settings/profile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-600 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white dark:text-red-500 dark:hover:text-white"
              >
                I&apos;m already subscribed — log in
              </Link>
            )}
            <p className="pt-1 text-xs text-gray-400 dark:text-gray-600">
              We don&apos;t verify this — honor system.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      {/* Mounted unconditionally so the congrats dialog survives the switch back to a
          closed subscribe dialog that happens in the very same confirm action. */}
      <TierUpDialog
        open={!!congrats}
        onOpenChange={(open) => !open && setCongrats(null)}
        title={congrats?.title ?? ""}
        description={congrats?.description ?? ""}
      />
    </>
  );
}
