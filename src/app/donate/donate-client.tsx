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
import { LoginButton } from "@/components/auth/login-button";
import { TierUpDialog } from "@/components/shared/tier-up-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS_CENTS = [1000, 2500, 5000, 10000];
const MIN_DONATION_CENTS = 100;
const PREV_TIER_SESSION_KEY = "donate_prev_tier";

function formatDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function DonateClient() {
  const { user, profile, loading, refetchProfile } = useUser();
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(2500);
  const [customAmount, setCustomAmount] = useState("");
  const [congrats, setCongrats] = useState<{ title: string; description: string } | null>(null);
  const [capturedPrevTier, setCapturedPrevTier] = useState<number | null>(null);

  const [createDonationCheckout, { loading: submitting }] = useMutation<{
    createDonationCheckout: DonationCheckoutResult;
  }>(CREATE_DONATION_CHECKOUT);

  // Stripe Checkout is a full-page navigation away and back -- Apollo's
  // in-memory cache (and any component state) doesn't survive that round
  // trip, so the pre-donation tier was stashed in sessionStorage before the
  // redirect. Pick it up here to detect a tier-up once we're back.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const stored = sessionStorage.getItem(PREV_TIER_SESSION_KEY);
      sessionStorage.removeItem(PREV_TIER_SESSION_KEY);
      setCapturedPrevTier(stored ? parseInt(stored, 10) : 1);
      toast.success("Thank you for your donation!");
      // The webhook may land a beat after Stripe's redirect -- refetch now
      // and once more shortly after to catch a delayed tier bump.
      refetchProfile();
      const timer = setTimeout(() => refetchProfile(), 2500);
      window.history.replaceState({}, "", "/donate");
      return () => clearTimeout(timer);
    }
    if (params.get("canceled") === "true") {
      toast.info("Donation canceled — no charge was made.");
      window.history.replaceState({}, "", "/donate");
    }
  }, [refetchProfile]);

  // Once the refetched profile catches up, compare against the captured
  // prior tier and show the congrats dialog only if it actually went up.
  useEffect(() => {
    if (capturedPrevTier === null || !profile) return;
    if (profile.tier > capturedPrevTier) {
      const unlockKey = tierUnlockKey(profile.tier);
      setCongrats({
        title: `You're now ${getTierName(profile.tier)}!`,
        description: unlockKey ? t(unlockKey) : "Thank you for your support!",
      });
      setCapturedPrevTier(null);
    }
  }, [capturedPrevTier, profile, t]);

  if (loading) return null;

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartHandshake className="size-5 text-[#A8672E] dark:text-[#D08F52]" />
            Support SOPHIE
          </CardTitle>
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
      sessionStorage.setItem(PREV_TIER_SESSION_KEY, String(profile?.tier ?? 1));
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
            Support SOPHIE
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            You&apos;re currently <Badge variant="outline">{getTierName(profile?.tier ?? 1)}</Badge>, having
            donated {formatDollars(profile?.donatedCents ?? 0)} total.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_AMOUNTS_CENTS.map((cents) => (
                <button
                  key={cents}
                  type="button"
                  onClick={() => handlePresetClick(cents)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                    selectedPreset === cents && !customAmount
                      ? "border-[#A8672E] bg-[#A8672E]/10 text-[#A8672E] dark:border-[#D08F52] dark:bg-[#D08F52]/10 dark:text-[#D08F52]"
                      : "border-border hover:bg-accent"
                  )}
                >
                  {formatDollars(cents)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">$</span>
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="Custom amount"
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
          <CardTitle className="text-lg">What donations unlock</CardTitle>
          <p className="text-sm text-muted-foreground">
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

      <TierUpDialog
        open={!!congrats}
        onOpenChange={(open) => !open && setCongrats(null)}
        title={congrats?.title ?? ""}
        description={congrats?.description ?? ""}
      />
    </div>
  );
}
