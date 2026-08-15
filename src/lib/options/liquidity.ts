// Composite liquidity read for a single contract, combining the three signals that actually
// determine whether you can trade it well: how wide the quote is (spread), how much has traded
// today (volume), and how much size is already resting (open interest). None of the three alone
// is reliable — a strike can have deep OI from months of accumulated positions but a wide spread
// today, or decent volume with almost no resting size. The composite weights spread heaviest
// since it's the most direct cost of actually getting filled.

export type LiquidityTier = 'excellent' | 'good' | 'fair' | 'poor' | 'unknown';

export interface LiquidityRead {
    spreadDollar: number | null;
    /** Spread as a fraction of mid (0.01 = 1%), the standard way to compare liquidity across
     * strikes/expirations whose absolute premiums differ by orders of magnitude. */
    spreadPct: number | null;
    /** 0-100, higher = more liquid. Null if there's no quote to score (bid/ask/mid missing). */
    score: number | null;
    tier: LiquidityTier;
}

// SPX-appropriate bands: this index trades a very tight spread ATM (often <0.3%) and widens
// sharply moving OTM — these thresholds are calibrated to that shape, not a generic equity option.
function spreadScore(spreadPct: number): number {
    if (spreadPct <= 0.003) return 100;
    if (spreadPct <= 0.01) return 100 - ((spreadPct - 0.003) / (0.01 - 0.003)) * 30; // 100 -> 70
    if (spreadPct <= 0.03) return 70 - ((spreadPct - 0.01) / (0.03 - 0.01)) * 40; // 70 -> 30
    if (spreadPct <= 0.08) return 30 - ((spreadPct - 0.03) / (0.08 - 0.03)) * 30; // 30 -> 0
    return 0;
}

function volumeScore(volume: number): number {
    if (volume <= 0) return 0;
    // log scale: 1 contract is barely traded, 1000+ is very active. 500 -> ~90, 50 -> ~63, 5 -> ~35.
    return Math.min(100, (Math.log10(volume + 1) / Math.log10(1001)) * 100);
}

function oiScore(openInterest: number): number {
    if (openInterest <= 0) return 0;
    return Math.min(100, (Math.log10(openInterest + 1) / Math.log10(5001)) * 100);
}

function tierFor(score: number): LiquidityTier {
    if (score >= 75) return 'excellent';
    if (score >= 50) return 'good';
    if (score >= 25) return 'fair';
    return 'poor';
}

export function computeLiquidity(
    bid: number | null | undefined,
    ask: number | null | undefined,
    mid: number | null | undefined,
    volume: number | null | undefined,
    openInterest: number | null | undefined,
): LiquidityRead {
    if (bid == null || ask == null || mid == null || mid <= 0 || ask < bid) {
        return { spreadDollar: null, spreadPct: null, score: null, tier: 'unknown' };
    }
    const spreadDollar = ask - bid;
    const spreadPct = spreadDollar / mid;

    // Spread gates the score rather than just averaging into it: no amount of open interest makes
    // a contract "liquid" if you can't get filled near mid today (the extreme case — a real find
    // against this dataset — is a deep-OTM contract with a literal $0 bid that still had meaningful
    // synthetic OI; averaging would have scored that as "fair," which is wrong. A bad spread should
    // floor the whole score, not just be outvoted by size). Volume outweighs OI within the activity
    // half since it reflects today's actual trading, not resting size accumulated over months —
    // real SPX open interest skews heavily toward far-OTM strikes for reasons unrelated to how
    // tradeable they are *today* (see export_spx_chain_sample.py's synthetic-OI calibration notes).
    const sScore = spreadScore(spreadPct);
    const activityScore = volumeScore(volume ?? 0) * 0.65 + oiScore(openInterest ?? 0) * 0.35;
    const score = Math.round(sScore * (0.55 + 0.45 * activityScore / 100));

    return { spreadDollar, spreadPct, score, tier: tierFor(score) };
}
