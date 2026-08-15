// Shared option-chain shapes, deliberately structured as a subset of the fields already used by
// the live "Options Viewer" tab's OptionContract/ExpirationData (src/components/options/options-viewer.tsx)
// so a live chain source can satisfy this same shape later without reshaping any consumer code.

export interface ChainContract {
    strike: number;
    bid: number;
    ask: number;
    mid: number;
    /** Signed delta: positive for calls, negative for puts. */
    delta: number;
    /** Precomputed at export time from the real mid price (see export_spx_chain_sample.py's
     * module docstring) — solved once at a fixed default rate/dividend-yield, not live. null for
     * 0 DTE or non-positive-mid contracts where a solve isn't meaningful. Absent entirely on
     * sources that don't precompute it (e.g. the live feed), in which case callers fall back to
     * solveImpliedVol(). */
    iv?: number | null;
    /** Closed-form Black-Scholes Greeks derived from `iv` at export time (see export_spx_chain_sample.py) —
     * same null convention as `iv`: null wherever iv itself is null, absent entirely on sources that
     * don't precompute it. */
    gamma?: number | null;
    vega?: number | null;
    theta?: number | null;
    rho?: number | null;
    volume?: number | null;
    /** OptionsDX's EOD schema has no open-interest column, so for the historical source this is
     * synthetic — a plausible value calibrated against a real live SPX chain (see
     * export_spx_chain_sample.py's module docstring), not a real reported number. Still absent
     * entirely on sources that don't populate it. */
    openInterest?: number | null;
}

export interface ExpirationChain {
    /** ISO date, e.g. "2024-02-16". */
    expiration: string;
    dte: number;
    calls: ChainContract[];
    puts: ChainContract[];
}

export interface OptionChainSnapshot {
    symbol: string;
    /** ISO date this snapshot was quoted on. */
    quoteDate: string;
    underlyingPrice: number;
    expirations: ExpirationChain[];
}
