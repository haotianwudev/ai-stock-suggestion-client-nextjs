// Shared between the donate form (app/donate/donate-client.tsx) and the
// post-checkout thank-you page (app/donate/thanks/thanks-client.tsx).

export interface PresetGift {
  cents: number;
  emoji: string;
  label: string;
}

// Each preset is set at (or just above) a DONATION_TIER_LADDER threshold, so a
// first-time donor who clicks one gets exactly the tier the label promises.
// The thank-you page also matches the charged amount back to one of these for
// personalized copy ("You just bought Sophie a LEGO set!").
export const PRESET_GIFTS: PresetGift[] = [
  { cents: 1000, emoji: "🧋", label: "A cup of milk tea for Sophie" },
  { cents: 3000, emoji: "🧱", label: "A LEGO set for Sophie" },
  { cents: 10000, emoji: "📚", label: "A stack of picture books for Sophie" },
  { cents: 20000, emoji: "🎡", label: "A family day out" },
];

export function findGiftForCents(cents: number): PresetGift | undefined {
  return PRESET_GIFTS.find((gift) => gift.cents === cents);
}

export const MIN_DONATION_CENTS = 100;

export function formatDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// sessionStorage keys used to hand off pre-donation state across the full-page
// redirect to Stripe Checkout and back -- Apollo's cache (and any component
// state) doesn't survive that round trip. Written by donate-client.tsx right
// before the redirect, read once by donate/thanks/thanks-client.tsx.
export const DONATE_PREV_TIER_KEY = "donate_prev_tier";
export const DONATE_PREV_CENTS_KEY = "donate_prev_cents";
