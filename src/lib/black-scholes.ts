// Black-Scholes model calculations and utilities

export interface GreekResults {
  price: number;
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  rho: number;
  /** dDelta/dVol (== dVega/dSpot), scaled per 1 vol point like vega. Same for calls and puts —
   * verified against finite-difference derivatives of delta and vega before shipping. */
  vanna: number;
  /** -dDelta/dT (delta decay per calendar day, matching theta's /365 convention), sign differs
   * between calls and puts via the dividend term, same as delta itself does. */
  charm: number;
}

export const standardNormalCDF = (x: number): number => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return (x > 0) ? 1 - prob : prob;
};

export const standardNormalPDF = (x: number): number => {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
};

/**
 * Black-Scholes-Merton. `q` is the continuous dividend yield of the underlying and defaults to 0,
 * which reduces every formula below to plain Black-Scholes — so existing callers that omit it are
 * unaffected. Pass it for index options (SPX yields ~1.3%): ignoring it biases delta and skews any
 * implied-vol solved against these prices.
 */
export const blackScholes = (S: number, K: number, T: number, r: number, v: number, optionType: 'Call' | 'Put', q: number = 0): GreekResults => {
  // Handle edge case: zero time to expiration
  if (T <= 0) {
    const intrinsicValue = optionType === 'Call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
    return {
      price: intrinsicValue,
      delta: optionType === 'Call' ? (S > K ? 1 : 0) : (S < K ? -1 : 0),
      gamma: 0,
      vega: 0,
      theta: 0,
      rho: 0,
      vanna: 0,
      charm: 0
    };
  }

  const d1 = (Math.log(S / K) + (r - q + v * v / 2) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);
  const discountDiv = Math.exp(-q * T);
  // Shared by both calls and puts, like gamma/vega — only the dividend term below differs by side.
  const vanna = -discountDiv * standardNormalPDF(d1) * d2 / v / 100;
  const charmTimeTerm = discountDiv * standardNormalPDF(d1) * ((2 * (r - q) * T - d2 * v * Math.sqrt(T)) / (2 * T * v * Math.sqrt(T)));

  if (optionType === 'Call') {
    const price = S * discountDiv * standardNormalCDF(d1) - K * Math.exp(-r * T) * standardNormalCDF(d2);
    const delta = discountDiv * standardNormalCDF(d1);
    const gamma = discountDiv * standardNormalPDF(d1) / (S * v * Math.sqrt(T));
    const vega = S * discountDiv * standardNormalPDF(d1) * Math.sqrt(T) / 100;
    const theta = (- (S * discountDiv * standardNormalPDF(d1) * v) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * standardNormalCDF(d2) + q * S * discountDiv * standardNormalCDF(d1)) / 365;
    const rho = K * T * Math.exp(-r * T) * standardNormalCDF(d2) / 100;
    const charm = (q * discountDiv * standardNormalCDF(d1) - charmTimeTerm) / 365;
    return { price, delta, gamma, vega, theta, rho, vanna, charm };
  } else {
    const price = K * Math.exp(-r * T) * standardNormalCDF(-d2) - S * discountDiv * standardNormalCDF(-d1);
    const delta = discountDiv * (standardNormalCDF(d1) - 1);
    const gamma = discountDiv * standardNormalPDF(d1) / (S * v * Math.sqrt(T));
    const vega = S * discountDiv * standardNormalPDF(d1) * Math.sqrt(T) / 100;
    const theta = (- (S * discountDiv * standardNormalPDF(d1) * v) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * standardNormalCDF(-d2) - q * S * discountDiv * standardNormalCDF(-d1)) / 365;
    const rho = -K * T * Math.exp(-r * T) * standardNormalCDF(-d2) / 100;
    const charm = (-q * discountDiv * standardNormalCDF(-d1) - charmTimeTerm) / 365;
    return { price, delta, gamma, vega, theta, rho, vanna, charm };
  }
};