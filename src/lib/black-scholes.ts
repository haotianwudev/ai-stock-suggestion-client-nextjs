// Black-Scholes model calculations and utilities

export interface GreekResults {
  price: number;
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  rho: number;
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

export const blackScholes = (S: number, K: number, T: number, r: number, v: number, optionType: 'Call' | 'Put'): GreekResults => {
  // Handle edge case: zero time to expiration
  if (T <= 0) {
    const intrinsicValue = optionType === 'Call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
    return {
      price: intrinsicValue,
      delta: optionType === 'Call' ? (S > K ? 1 : 0) : (S < K ? -1 : 0),
      gamma: 0,
      vega: 0,
      theta: 0,
      rho: 0
    };
  }

  const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
  const d2 = d1 - v * Math.sqrt(T);

  if (optionType === 'Call') {
    const price = S * standardNormalCDF(d1) - K * Math.exp(-r * T) * standardNormalCDF(d2);
    const delta = standardNormalCDF(d1);
    const gamma = standardNormalPDF(d1) / (S * v * Math.sqrt(T));
    const vega = S * standardNormalPDF(d1) * Math.sqrt(T) / 100;
    const theta = (- (S * standardNormalPDF(d1) * v) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * standardNormalCDF(d2)) / 365;
    const rho = K * T * Math.exp(-r * T) * standardNormalCDF(d2) / 100;
    return { price, delta, gamma, vega, theta, rho };
  } else {
    const price = K * Math.exp(-r * T) * standardNormalCDF(-d2) - S * standardNormalCDF(-d1);
    const delta = standardNormalCDF(d1) - 1;
    const gamma = standardNormalPDF(d1) / (S * v * Math.sqrt(T));
    const vega = S * standardNormalPDF(d1) * Math.sqrt(T) / 100;
    const theta = (- (S * standardNormalPDF(d1) * v) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * standardNormalCDF(-d2)) / 365;
    const rho = -K * T * Math.exp(-r * T) * standardNormalCDF(-d2) / 100;
    return { price, delta, gamma, vega, theta, rho };
  }
}; 