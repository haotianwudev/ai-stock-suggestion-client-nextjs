import { OptionChainSnapshot, ExpirationChain, ChainContract } from './chain-types';

// Mirrors the response shape options-viewer.tsx parses from the Cloud Run options-analytics endpoint —
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
    stock: { price: number; previousClose?: number; percentChange?: number; timestamp?: string };
    expirationDates: LiveExpirationData[];
}

function toContract(c: LiveOptionContract, type: 'call' | 'put'): ChainContract {
    const bid = c.bid ?? c.lastPrice;
    const ask = c.ask ?? c.lastPrice;
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
 * historical sample uses, so SpxPayoffBuilder can render off either source unchanged.
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

/**
 * Adapts historical OptionChainSnapshot (from /data/spx-chain-sample.json) into the full OptionsAPIResponse
 * so the OptionsViewer can render off historical by default with zero network latency.
 */
export function adaptSnapshotToOptionsAPIResponse(snapshot: OptionChainSnapshot): any {
    return {
        ticker: snapshot.symbol || '^SPX',
        stock: {
            price: snapshot.underlyingPrice,
            previousClose: snapshot.underlyingPrice,
            percentChange: 0,
            timestamp: snapshot.quoteDate
        },
        expirationDates: snapshot.expirations.map(exp => ({
            expiration: exp.expiration,
            daysToExpiration: exp.dte,
            expirationLabel: exp.expiration,
            calls: exp.calls.map((c: any) => ({
                strike: c.strike,
                lastPrice: c.mid ?? c.bid ?? 0,
                midPrice: c.mid ?? ((c.bid + c.ask) / 2) ?? 0,
                bid: c.bid ?? null,
                ask: c.ask ?? null,
                delta: c.delta ?? null,
                gamma: c.gamma ?? null,
                theta: c.theta ?? null,
                vega: c.vega ?? null,
                rho: c.rho ?? null,
                impliedVolatilityMid: c.iv ?? null,
                volume: c.volume ?? 0,
                openInterest: c.openInterest ?? 0,
                contractSymbol: `SPX_${exp.expiration}_C_${c.strike}`
            })),
            puts: exp.puts.map((p: any) => ({
                strike: p.strike,
                lastPrice: p.mid ?? p.bid ?? 0,
                midPrice: p.mid ?? ((p.bid + p.ask) / 2) ?? 0,
                bid: p.bid ?? null,
                ask: p.ask ?? null,
                delta: p.delta ?? null,
                gamma: p.gamma ?? null,
                theta: p.theta ?? null,
                vega: p.vega ?? null,
                rho: p.rho ?? null,
                impliedVolatilityMid: p.iv ?? null,
                volume: p.volume ?? 0,
                openInterest: p.openInterest ?? 0,
                contractSymbol: `SPX_${exp.expiration}_P_${p.strike}`
            }))
        }))
    };
}
