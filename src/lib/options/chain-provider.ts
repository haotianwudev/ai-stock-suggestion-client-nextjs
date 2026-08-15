import { OptionChainSnapshot } from './chain-types';
import { SPX_CHAIN_SAMPLE_PATH } from '@/data/spx-chain-sample';
import { adaptLiveResponseToSnapshot, LiveOptionsAPIResponse } from './chain-adapters';
import { fetchWithOptionsCache } from './options-cache';

/**
 * Historical SPX chain snapshot (see src/data/spx-chain-sample.ts for provenance).
 * Cached for 15 minutes in frontend.
 */
export async function getChainSnapshot(forceRefresh: boolean = false): Promise<OptionChainSnapshot> {
    return fetchWithOptionsCache<OptionChainSnapshot>(SPX_CHAIN_SAMPLE_PATH, { forceRefresh });
}

// Shared Cloud Run endpoint for live options analytics (SPX, SPY, QQQ) powered by Cboe feed.
export const LIVE_CHAIN_API_ENDPOINT = 'https://spx-options-api-282034489414.us-central1.run.app/options-analytics';

/**
 * Live chain snapshot for `ticker` with 15-minute frontend caching.
 */
export async function getLiveChainSnapshot(
    ticker: string = '^SPX',
    forceRefresh: boolean = false
): Promise<OptionChainSnapshot> {
    const url = `${LIVE_CHAIN_API_ENDPOINT}?ticker=${encodeURIComponent(ticker.toUpperCase())}`;
    const result = await fetchWithOptionsCache<LiveOptionsAPIResponse>(url, { forceRefresh });
    return adaptLiveResponseToSnapshot(result);
}
