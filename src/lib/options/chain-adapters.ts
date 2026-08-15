import { OptionChainSnapshot, ExpirationChain, ChainContract } from './chain-types';

// Mirrors the response shape options-viewer.tsx already parses from its live AWS endpoint —
// duplicated (not imported) because that file's types aren't exported; kept in sync by hand.
interface LiveOptionContract {
    strike: number;
    lastPrice: number;
    delta?: number;
    bid?: number;
    ask?: number;
    midPrice?: number;
    volume?: number;
}
interface LiveExpirationData {
    expiration: string;
    daysToExpiration: number;
    calls: LiveOptionContract[];
    puts: LiveOptionContract[];
}
export interface LiveOptionsAPIResponse {
    ticker: string;
    stock: { price: number };
    expirationDates: LiveExpirationData[];
}

function toContract(c: LiveOptionContract, type: 'call' | 'put'): ChainContract {
    const bid = c.bid ?? c.lastPrice;
    const ask = c.ask ?? c.lastPrice;
    // Normalize sign by option type rather than trusting the live feed's own convention, so
    // ChainContract's documented "positive for calls, negative for puts" contract always holds
    // regardless of source.
    const magnitude = Math.abs(c.delta ?? 0);
    return {
        strike: c.strike,
        bid,
        ask,
        mid: c.midPrice ?? (bid + ask) / 2,
        delta: type === 'call' ? magnitude : -magnitude,
        volume: c.volume ?? null,
    };
}

/**
 * Adapts the live "Options Viewer" API response into the same OptionChainSnapshot shape the
 * historical sample uses, so IronCondorLegPicker can render off either source unchanged.
 */
export function adaptLiveResponseToSnapshot(response: LiveOptionsAPIResponse): OptionChainSnapshot {
    const expirations: ExpirationChain[] = response.expirationDates.map(exp => ({
        expiration: exp.expiration,
        dte: exp.daysToExpiration,
        calls: exp.calls.map(c => toContract(c, 'call')),
        puts: exp.puts.map(c => toContract(c, 'put')),
    }));

    return {
        symbol: response.ticker,
        quoteDate: new Date().toISOString().slice(0, 10),
        underlyingPrice: response.stock.price,
        expirations,
    };
}
