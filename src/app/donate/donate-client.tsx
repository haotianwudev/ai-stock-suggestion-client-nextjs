"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { HeartHandshake } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { CREATE_DONATION_CHECKOUT } from "@/lib/graphql/queries";
import { DonationCheckoutResult } from "@/lib/graphql/types";
import { getTierName, tierUnlockKey, DONATION_TIER_LADDER } from "@/lib/tiers";
import {
  PRESET_GIFTS,
  MIN_DONATION_CENTS,
  formatDollars,
  DONATE_PREV_TIER_KEY,
  DONATE_PREV_CENTS_KEY,
} from "@/lib/donate";
import { LoginButton } from "@/components/auth/login-button";
import { TierBadge } from "@/components/shared/tier-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DonateClient() {
  const { user, profile, loading } = useUser();
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");

  const [createDonationCheckout, { loading: submitting }] = useMutation<{
    createDonationCheckout: DonationCheckoutResult;
  }>(CREATE_DONATION_CHECKOUT);

  // Stripe redirects here on a canceled checkout (success lands on
  // /donate/thanks instead, see the resolver's success_url).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled") === "true") {
      toast.info("Donation canceled — no charge was made.");
      window.history.replaceState({}, "", "/donate");
    }
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-xs space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <HeartHandshake className="size-5 text-[#A8672E] dark:text-[#D08F52]" />
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Buy Sophie a gift
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            SOPHIE is free to read, and always will be. If you&apos;d like to chip in anyway, it goes toward
            keeping the site running and — literally — real gifts for my daughter Sophie.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <span>Sign in to donate — donations are tied to your account so they promote your tier.</span>
          <LoginButton />
        </div>
      </div>
    );
  }

  const effectiveCents = customAmount.trim()
    ? Math.round(parseFloat(customAmount) * 100)
    : selectedPreset;
  const isValidAmount =
    typeof effectiveCents === "number" && Number.isFinite(effectiveCents) && effectiveCents >= MIN_DONATION_CENTS;

  const handlePresetClick = (cents: number) => {
    setSelectedPreset(cents);
    setCustomAmount("");
  };

  const handleDonate = async () => {
    if (!isValidAmount || effectiveCents === null) {
      toast.error(`Enter at least ${formatDollars(MIN_DONATION_CENTS)}.`);
      return;
    }
    try {
      const { data } = await createDonationCheckout({ variables: { amountCents: effectiveCents } });
      const checkoutUrl = data?.createDonationCheckout.checkoutUrl;
      if (!checkoutUrl) throw new Error("No checkout URL returned.");
      sessionStorage.setItem(DONATE_PREV_TIER_KEY, String(profile?.tier ?? 1));
      sessionStorage.setItem(DONATE_PREV_CENTS_KEY, String(profile?.donatedCents ?? 0));
      window.location.href = checkoutUrl;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-xs space-y-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <HeartHandshake className="size-5 text-[#A8672E] dark:text-[#D08F52]" />
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
              Buy Sophie a gift
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            SOPHIE is free to read, and always will be. This isn&apos;t a paywall — if you&apos;d like to
            chip in anyway, it goes toward keeping the site running and, literally, real gifts for my
            daughter Sophie.
          </p>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5 flex-wrap pt-1">
            <span>You&apos;re currently</span>
            <TierBadge tier={profile?.tier ?? 1} size="sm" />
            <span>, having donated <strong className="font-mono text-[#A8672E] dark:text-[#D08F52]">{formatDollars(profile?.donatedCents ?? 0)}</strong> total.</span>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono uppercase tracking-wider">What should it be?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_GIFTS.map((gift) => {
                // Highest ladder rung this preset alone would clear, for a first-time donor.
                const unlockedTier = [...DONATION_TIER_LADDER]
                  .reverse()
                  .find((step) => gift.cents >= step.minCents)?.tier;
                return (
                  <button
                    key={gift.cents}
                    type="button"
                    onClick={() => handlePresetClick(gift.cents)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all duration-150",
                      selectedPreset === gift.cents && !customAmount
                        ? "border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/15 dark:text-[#D08F52] ring-1 ring-[#A8672E]/30"
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40"
                    )}
                  >
                    <span className="text-lg" aria-hidden>{gift.emoji}</span>
                    <span className="text-sm font-bold font-mono">{formatDollars(gift.cents)}</span>
                    <span className="text-[11px] text-slate-500 leading-tight">{gift.label}</span>
                    {unlockedTier && (
                      <TierBadge tier={unlockedTier} size="xs" variant="outline">
                        Unlocks {getTierName(unlockedTier)}
                      </TierBadge>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-sm font-mono text-slate-400">$</span>
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="Or name your own amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-2 focus:ring-[#A8672E]/20 text-xs sm:text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleDonate}
            disabled={submitting || !isValidAmount}
            className="w-full py-2.5 px-4 rounded-xl bg-[#A8672E] hover:bg-[#8e5625] dark:bg-[#D08F52] dark:hover:bg-[#b87c44] text-white dark:text-[#14171B] font-semibold text-sm shadow-xs disabled:opacity-50 transition-colors"
          >
            {submitting ? "Redirecting to checkout..." : "Donate"}
          </button>
          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            Handled securely by Stripe — card details never touch our servers.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-xs space-y-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
            A little thank-you, as a bonus
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            The site stays free either way — but if you donate, these unlock automatically on top.
            Cumulative total, tracked automatically — tiers never downgrade.
          </p>
        </div>
        <div className="space-y-3 pt-2">
          {DONATION_TIER_LADDER.map((step) => {
            const unlockKey = tierUnlockKey(step.tier);
            return (
              <div key={step.tier} className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-800/80 pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center gap-2">
                    <TierBadge tier={step.tier} size="sm" />
                    <span className="text-xs sm:text-sm font-mono font-medium text-slate-500">
                      {formatDollars(step.minCents)}+ total
                    </span>
                  </div>
                  {unlockKey && <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">{t(unlockKey)}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
