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
    volume?: number | null;
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
