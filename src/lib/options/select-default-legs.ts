import { ExpirationChain } from './chain-types';
import { OptionLeg } from './payoff';
import { STRATEGY_PRESETS, buildPresetLegs } from './presets';

const IRON_CONDOR_PRESET = STRATEGY_PRESETS.find(p => p.id === 'iron_condor')!;

/**
 * Default 4-leg Iron Condor for a given expiration's real chain — delegates to the general
 * preset table (presets.ts) so the Strategy Explorer's guided builder and the generic SPX Payoff
 * Builder resolve identical strikes for the same preset, not two parallel implementations.
 */
export function selectDefaultIronCondorLegs(chain: ExpirationChain): OptionLeg[] {
    return buildPresetLegs(chain, IRON_CONDOR_PRESET);
}

/** The expiration in a snapshot whose DTE is closest to a target (default 45, the strategy's own standard). */
export function nearestExpiration(expirations: ExpirationChain[], targetDte = 45): ExpirationChain {
    return expirations.reduce((best, e) =>
        Math.abs(e.dte - targetDte) < Math.abs(best.dte - targetDte) ? e : best
    );
}
