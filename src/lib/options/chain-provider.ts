import { OptionChainSnapshot } from './chain-types';
import { SPX_CHAIN_SAMPLE_PATH } from '@/data/spx-chain-sample';
import { adaptLiveResponseToSnapshot, LiveOptionsAPIResponse } from './chain-adapters';

/**
 * Historical SPX chain snapshot (see src/data/spx-chain-sample.ts for provenance).
 */
export async function getChainSnapshot(): Promise<OptionChainSnapshot> {
    const res = await fetch(SPX_CHAIN_SAMPLE_PATH);
    if (!res.ok) {
        throw new Error(`Failed to load SPX chain sample: ${res.status}`);
    }
    return res.json() as Promise<OptionChainSnapshot>;
}

// Same AWS endpoint the "Options Viewer" chain lookup uses — defined once here so both it and
// the live path below stay in sync, instead of two copies of the same URL drifting apart.
export const LIVE_CHAIN_API_ENDPOINT = 'https://whl064peuf.execute-api.us-east-1.amazonaws.com/options-analytics';

/**
 * Live chain snapshot for `ticker`, mapped through adaptLiveResponseToSnapshot() so it satisfies
 * the exact same OptionChainSnapshot shape as getChainSnapshot() above — this is the "swap to
 * live data" seam actually exercised, not just a documented placeholder: any consumer written
 * against OptionChainSnapshot works unchanged against either function.
 */
export async function getLiveChainSnapshot(ticker: string = '^SPX'): Promise<OptionChainSnapshot> {
    const res = await fetch(`${LIVE_CHAIN_API_ENDPOINT}?ticker=${encodeURIComponent(ticker.toUpperCase())}`);
    if (!res.ok) {
        let message = `HTTP error! Status: ${res.status}`;
        try {
            const errorData = await res.json();
            if (errorData?.error) message = errorData.error;
        } catch {
            // response body wasn't JSON — keep the generic status message
        }
        throw new Error(message);
    }
    const result = (await res.json()) as LiveOptionsAPIResponse;
    return adaptLiveResponseToSnapshot(result);
}
