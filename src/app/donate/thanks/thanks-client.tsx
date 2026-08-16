"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { getTierName, tierUnlockKey } from "@/lib/tiers";
import {
  findGiftForCents,
  formatDollars,
  DONATE_PREV_TIER_KEY,
  DONATE_PREV_CENTS_KEY,
} from "@/lib/donate";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/shared/tier-badge";
import { Card, CardContent } from "@/components/ui/card";

export function ThanksClient() {
  const { profile, loading, refetchProfile } = useUser();
  const { t } = useLanguage();
  const [confirming, setConfirming] = useState(true);
  // Captured once on mount, before the sessionStorage handoff keys are cleared.
  const prevRef = useRef<{ tier: number; cents: number } | null>(null);

  useEffect(() => {
    const storedTier = sessionStorage.getItem(DONATE_PREV_TIER_KEY);
    const storedCents = sessionStorage.getItem(DONATE_PREV_CENTS_KEY);
    sessionStorage.removeItem(DONATE_PREV_TIER_KEY);
    sessionStorage.removeItem(DONATE_PREV_CENTS_KEY);
    if (storedTier !== null && storedCents !== null) {
      prevRef.current = { tier: parseInt(storedTier, 10), cents: parseInt(storedCents, 10) };
    }

    // The webhook may land a beat after Stripe's redirect -- refetch now and
    // once more shortly after, then reveal the final state either way.
    refetchProfile();
    const timer = setTimeout(() => {
      refetchProfile();
      setConfirming(false);
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || confirming) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse">
            <PartyPopper className="size-7" />
          </div>
          <p className="text-sm text-muted-foreground">Confirming your donation...</p>
        </CardContent>
      </Card>
    );
  }

  const donatedCents = profile?.donatedCents ?? 0;
  const tier = profile?.tier ?? 1;
  const prevCents = prevRef.current?.cents ?? donatedCents;
  const prevTier = prevRef.current?.tier ?? tier;
  const deltaCents = Math.max(0, donatedCents - prevCents);
  const gift = findGiftForCents(deltaCents);
  const tierWentUp = tier > prevTier;
  const unlockKey = tierWentUp ? tierUnlockKey(tier) : null;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-pink-200 dark:border-pink-900/40 bg-gradient-to-br from-pink-50/60 via-amber-50/40 to-white dark:from-pink-950/20 dark:via-amber-950/10 dark:to-gray-950">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-white/70 dark:bg-white/5 text-4xl shadow-sm">
            {gift?.emoji ?? "💝"}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Thank you!</h1>
            <p className="text-muted-foreground">
              {gift
                ? `You just bought Sophie ${gift.label.replace(/^A /, "a ")}.`
                : deltaCents > 0
                ? `You just gave ${formatDollars(deltaCents)}.`
                : "Your support means a lot."}{" "}
              That means the world — for real.
            </p>
          </div>
          <div className="rounded-lg border bg-white/70 dark:bg-white/5 px-4 py-2 text-sm flex items-center justify-center gap-1.5 flex-wrap">
            <span>You&apos;re now</span>
            <TierBadge tier={tier} size="sm" />
            <span>, having donated {formatDollars(donatedCents)} total.</span>
          </div>
        </CardContent>
      </Card>

      {tierWentUp && (
        <Card className="border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/10">
          <CardContent className="flex items-start gap-3 py-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-amber-600 dark:text-amber-500">
              <PartyPopper className="size-5" />
            </div>
            <div>
              <div className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 flex-wrap">
                <span>Bonus: you&apos;re now</span>
                <TierBadge tier={tier} size="sm" />
                <span>!</span>
              </div>
              {unlockKey && (
                <p className="mt-1 text-sm text-amber-700/90 dark:text-amber-400/90">{t(unlockKey)}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Remember — SOPHIE is free either way. Thank you for choosing to support it.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link href="/">
          <Button className="w-full sm:w-auto">Keep exploring</Button>
        </Link>
        <Link href="/donate">
          <Button variant="outline" className="w-full sm:w-auto">
            Donate again
          </Button>
        </Link>
      </div>
    </div>
  );
}
