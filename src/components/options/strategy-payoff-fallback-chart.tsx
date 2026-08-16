import { Strategy } from './strategy-config';
import { PayoffChartView } from './payoff-chart-view';

const DEFAULT_DEMO_PARAMS = { stockPrice: 100, strike1: 100, strike2: 105, strike3: 95, strike4: 90, premium: 2.5 };

/**
 * Only calendar_spread still reaches this static illustration — it needs multi-expiry pricing
 * (different IV per leg, different expirations) the interactive builder doesn't support. Every
 * other strategy either has a payoffPresetId directly, or (covered_call, wheel_strategy,
 * collar_strategy, buffered_strategy) uses a synthetic stock leg alongside real chain-priced
 * options — see payoff.ts's OptionLegType comment for why a stock leg is synthetic for SPX.
 */
export const PayoffChart = ({ strategy }: { strategy: Strategy }) => {
    const demo = { ...DEFAULT_DEMO_PARAMS, ...strategy.payoffDemoParams };
    const labels = Array.from({ length: 41 }, (_, i) => demo.stockPrice - 20 + i);
    const payoffData = labels.map(p => strategy.payoffCalculator!(p, demo));
    return <PayoffChartView labels={labels} payoffData={payoffData} profile={strategy.profile} />;
};
