import { Strategy } from './types';
import { WheelStrategyDetail } from './wheel-strategy';
import { DefaultStrategyDetail } from './default-strategy';

export * from './types';

// Map strategy IDs to their detail components
export const getStrategyDetailComponent = (strategyId: string) => {
  switch (strategyId) {
    case 'wheel_strategy':
      return WheelStrategyDetail;
    // Add more strategy-specific components here as they are created
    // case 'long_call':
    //   return LongCallStrategyDetail;
    // case 'iron_condor':
    //   return IronCondorStrategyDetail;
    default:
      return DefaultStrategyDetail;
  }
};
