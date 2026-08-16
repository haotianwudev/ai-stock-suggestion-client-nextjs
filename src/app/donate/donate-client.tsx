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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartHandshake className="size-5 text-[#A8672E] dark:text-[#D08F52]" />
            Buy Sophie a gift
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            SOPHIE is free to read, and always will be. If you&apos;d like to chip in anyway, it goes toward
            keeping the site running and — literally — real gifts for my daughter Sophie.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
            <span>Sign in to donate — donations are tied to your account so they can promote your tier.</span>
            <LoginButton />
          </div>
        </CardContent>
      </Card>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartHandshake className="size-5 text-[#A8672E] dark:text-[#D08F52]" />
            Buy Sophie a gift
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            SOPHIE is free to read, and always will be. This isn&apos;t a paywall — if you&apos;d like to
            chip in anyway, it goes toward keeping the site running and, literally, real gifts for my
            daughter Sophie.
          </p>
          <div className="text-sm text-muted-foreground">
            You&apos;re currently <Badge variant="outline">{getTierName(profile?.tier ?? 1)}</Badge>, having
            donated {formatDollars(profile?.donatedCents ?? 0)} total.
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>What should it be?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      "flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-center transition-colors",
                      selectedPreset === gift.cents && !customAmount
                        ? "border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/10 dark:text-[#D08F52]"
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <span className="text-lg" aria-hidden>{gift.emoji}</span>
                    <span className="text-sm font-semibold">{formatDollars(gift.cents)}</span>
                    <span className="text-xs text-muted-foreground leading-tight">{gift.label}</span>
                    {unlockedTier && (
                      <span className="text-[10px] font-medium text-[#A8672E] dark:text-[#D08F52]">
                        Unlocks {getTierName(unlockedTier)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">$</span>
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="Or name your own amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleDonate} disabled={submitting || !isValidAmount} className="w-full">
            {submitting ? "Redirecting to checkout..." : "Donate"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Handled securely by Stripe — card details never touch our servers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">A little thank-you, as a bonus</CardTitle>
          <p className="text-sm text-muted-foreground">
            The site stays free either way — but if you donate, these unlock automatically on top.
            Cumulative total, tracked automatically — tiers never downgrade.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {DONATION_TIER_LADDER.map((step) => {
              const unlockKey = tierUnlockKey(step.tier);
              return (
                <div key={step.tier} className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{getTierName(step.tier)}</Badge>
                      <span className="text-sm font-medium text-muted-foreground">
                        {formatDollars(step.minCents)}+ total
                      </span>
                    </div>
                    {unlockKey && <p className="mt-1 text-sm">{t(unlockKey)}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
