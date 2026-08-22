---
path: stock-analysis/stock-analysis-methodology
title: Stock Analysis & Trending Equities Methodology Guide
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Stock Analysis", "Macro Views"]
related: ["stock-analysis/analyst-consensus-target-prices", "stock-analysis/insider-trading-signal-form4", "finance101/charlie-munger-worldly-wisdom", "form-13f/druckenmiller-q3-2025-bessent-edge"]
---

## Overview

This page serves as the complete mathematical specification, quantitative dictionary, and architectural guide for **SOPHIE's Equities & Trending Analysis Suite** (`/stock/trending`, `/stock/[ticker]`, `/quant-trending`, and the `/stock/stock-analysis` topic hubs).

The platform evaluates individual equities across **four foundational quantitative pillars**:
1. **Valuation Models** (Multi-model intrinsic fair value synthesis)
2. **Fundamental Quality** (4-dimensional accounting & financial strength scoring)
3. **Technical Momentum & Microstructure** (5-strategy quantitative ensemble)
4. **Market Sentiment** (SEC Form 4 insider transactions & NLP news sentiment)

These pillars are integrated by **SOPHIE's Master Synthesis Engine** into an overall score ($0\text{--}100$) and evaluated alongside **5 AI Persona Bots** modeling iconic investment methodologies (Warren Buffett, Charlie Munger, Cathie Wood, Stanley Druckenmiller, and Benjamin Graham).

---

## 1. Trending Stocks & Quant Aggregation Architecture

Located in `src/app/stock/trending/client.tsx`, `src/app/quant-trending/quant-trending-client.tsx`, and `src/components/quant-trending/trending-widget.tsx`.

### 1.1 Trending Stock 3-Month Performance Metric
For any covered equity in the trending matrix, performance is measured against its 3-month lookback baseline:
$$
\text{Change}_{\text{3M}} = \left( \frac{P_{\text{latest}} - P_{\text{closest}(t - 90\text{d})}}{P_{\text{closest}(t - 90\text{d})}} \right) \times 100
$$
where $P_{\text{closest}(t - 90\text{d})}$ searches sorted historical business dates for the minimum timestamp differential $|t_{\text{price}} - (t_{\text{now}} - 90\text{d})|$.

### 1.2 Quant Trending Aggregation Engine
Aggregates and normalizes quantitative finance intelligence across five primary web and research feeds:
- **ArXiv (`q-fin`):** Quantitative finance preprints (pricing, market microstructure, portfolio management).
- **GitHub:** Open-source quantitative trading frameworks, backtesting libraries, and factor models.
- **Reddit:** Practitioner sentiment and discussions from `r/algotrading` and `r/quant`.
- **Hacker News:** High-frequency, infrastructure, and financial technology engineering discussions.
- **Google News:** Curated institutional and macroeconomic developments.

#### Heat Scoring & Sorting Hierarchy:
- **Heat Score ($0\text{--}100$):** Normalized composite measuring upvotes, citation velocity, star growth, and social engagement:
  - $\ge 75$: High Heat (Red)
  - $50\text{--}74$: Elevated Heat (Orange)
  - $25\text{--}49$: Moderate Heat (Yellow)
  - $< 25$: Baseline Activity (Blue)
- **Deterministic Multi-Key Sorting:**
  1. *Date Sort (Default):* $\text{ETL Fetch Timestamp} \downarrow \to \text{Publish Timestamp} \downarrow \to \text{Heat Score} \downarrow$
  2. *Heat Sort:* $\text{Heat Score} \downarrow \to \text{ETL Fetch Timestamp} \downarrow \to \text{Publish Timestamp} \downarrow$

---

## 2. Market Statistics & Volatility Metrics

Located in `StockCompanyInfo` (`src/components/stock/stock-company-info.tsx`).

### 2.1 52-Week Price Extremes
$$
\text{High}_{\text{52W}} = \max_{t \in [T-252, T]} \text{High}_t, \quad \text{Low}_{\text{52W}} = \min_{t \in [T-252, T]} \text{Low}_t
$$

### 2.2 Annualized Historical Volatility
Calculated from 252 trading days of historical daily returns:
$$
r_t = \frac{P_t}{P_{t-1}} - 1 \quad (\text{or } \ln(P_t / P_{t-1}))
$$
$$
\sigma_{\text{annual}} = \text{stdev}(r_t) \times \sqrt{252} \times 100
$$

### 2.3 Forward Dividend & Yield Derivation
Extrapolated from reporting period financial statements:
$$
\text{Forward Annual Dividend} = \text{EPS} \times \text{Payout Ratio}
$$
$$
\text{Dividend Yield} = \frac{\text{Payout Ratio}}{\text{P/E Ratio}} = \frac{\text{Forward Dividend}}{P_{\text{current}}}
$$

---

## 3. Valuation Analysis Engine (Fair Value Synthesis)

Located in `StockValuation` (`src/components/stock/stock-valuation.tsx`).

Rather than relying on a single valuation model (which is vulnerable to model-specific biases), SOPHIE executes an ensemble of **four distinct valuation methodologies** and computes a weighted average intrinsic value:

$$
V_{\text{weighted}} = 0.35 \cdot V_{\text{DCF}} + 0.35 \cdot V_{\text{Owner}} + 0.20 \cdot V_{\text{EV/EBITDA}} + 0.10 \cdot V_{\text{RI}}
$$

### 3.1 Model 1: Discounted Cash Flow (DCF — 35% Weight)
Projects free cash flows over a 5-year discrete horizon and discounts them to present value:
$$
V_{\text{DCF}} = \sum_{t=1}^{5} \frac{\text{FCF}_0 \cdot (1 + g)^t}{(1 + r)^t} + \frac{\text{FCF}_5 \cdot (1 + g_n)}{(r - g_n) \cdot (1 + r)^5}
$$
- Baseline parameters: Discrete growth rate $g = 5.0\%$, discount rate / WACC $r = 10.0\%$, perpetual terminal growth rate $g_n = 2.5\%$.

### 3.2 Model 2: Owner Earnings (Warren Buffett Method — 35% Weight)
Measures the true cash flow accruable to shareholders after maintaining competitive position:
$$
\text{Owner Earnings} = \text{Net Income} + \text{Depreciation \& Amortization} - \text{Maintenance Capex}
$$
$$
V_{\text{Owner}} = \frac{\text{Owner Earnings} \times (1 + g_{\text{conservative}})}{r - g_{\text{conservative}}} \times (1 - \text{MarginOfSafety})
$$

### 3.3 Model 3: EV/EBITDA Multiple (Relative Valuation — 20% Weight)
Capital-structure neutral enterprise valuation benchmarked against industry peers and historical medians:
$$
\text{Target EV} = \text{Median}\left(\frac{\text{EV}}{\text{EBITDA}}\right)_{\text{peers}} \times \text{EBITDA}_{\text{TTM}}
$$
$$
V_{\text{EV/EBITDA}} = \text{Target EV} - \text{Total Debt} - \text{Preferred Stock} + \text{Cash \& Equivalents}
$$

### 3.4 Model 4: Residual Income / Economic Profit (10% Weight)
Evaluates whether the company creates value in excess of its cost of equity capital:
$$
V_{\text{RI}} = \text{Book Value}_0 + \sum_{t=1}^{T} \frac{\text{Net Income}_t - (r_e \times \text{Book Value}_{t-1})}{(1 + r_e)^t}
$$
where $r_e$ is the required cost of equity.

### 3.5 Valuation Gap & Signal Generation
$$
\text{Valuation Gap} = \frac{V_{\text{intrinsic}} - \text{Market Cap}}{\text{Market Cap}} \quad (\text{or } \frac{P_{\text{fair}} - P_{\text{market}}}{P_{\text{market}}})
$$

- **Bullish (Undervalued):** $\text{Valuation Gap} > +15\%$
- **Bearish (Overvalued):** $\text{Valuation Gap} < -15\%$
- **Neutral (Fairly Valued):** $-15\% \le \text{Valuation Gap} \le +15\%$
- **Confidence Level (%):**
  $$
  \text{Confidence} = \min\left(100, \frac{|\text{Valuation Gap}|}{0.30} \times 100\right)
  $$
  (A $30\%$ or greater gap corresponds to maximum $100\%$ confidence).

---

## 4. Fundamental Quality Engine (4-Dimensional Scoring)

Located in `StockFundamentalsAnalysis` (`src/components/stock/stock-fundamentals-analysis.tsx`).

The fundamental engine decomposes company financial statements into four orthogonal dimensions, evaluating 12 core accounting metrics against institutional threshold benchmarks.

| Dimension & Metric | Institutional Threshold | Calculation Formula |
|---|---|---|
| **Profitability (33% Weight)** | | |
| • Return on Equity (ROE) | $> 15.0\%$ | $\text{Net Income} / \text{Shareholders' Equity}$ |
| • Net Profit Margin | $> 20.0\%$ | $\text{Net Income} / \text{Total Revenue}$ |
| • Operating Margin | $> 15.0\%$ | $\text{Operating Income (EBIT)} / \text{Total Revenue}$ |
| **Growth (33% Weight)** | | |
| • Revenue Growth (YoY) | $> 10.0\%$ | $(\text{Rev}_t - \text{Rev}_{t-1}) / \text{Rev}_{t-1}$ |
| • Earnings Growth (YoY) | $> 10.0\%$ | $(\text{EPS}_t - \text{EPS}_{t-1}) / \text{EPS}_{t-1}$ |
| • Book Value Growth (YoY) | $> 10.0\%$ | $(\text{BVPS}_t - \text{BVPS}_{t-1}) / \text{BVPS}_{t-1}$ |
| **Financial Health (17% Weight)** | | |
| • Current Ratio | $> 1.50$ | $\text{Current Assets} / \text{Current Liabilities}$ |
| • Debt-to-Equity | $< 0.50$ | $\text{Total Debt} / \text{Shareholders' Equity}$ |
| • FCF Conversion Ratio | $> 0.80\ (80\%)$ | $\text{Free Cash Flow Per Share} / \text{EPS}$ |
| **Valuation Multiples (17% Weight)** | | |
| • Price-to-Earnings (P/E) | $< 25.0$ | $\text{Market Price} / \text{EPS}$ |
| • Price-to-Book (P/B) | $< 3.0$ | $\text{Market Price} / \text{BVPS}$ |
| • Price-to-Sales (P/S) | $< 5.0$ | $\text{Market Cap} / \text{Total Revenue}$ |

### Dimension & Overall Signal Logic:
- **Dimension Score ($0\text{--}3$):** Count of individual metrics meeting or exceeding their target threshold.
- **Dimension Signal:** Bullish ($\ge 2/3$ metrics), Bearish ($\le 0/3$ or majority failing), Neutral ($1/3$).
- **Overall Fundamental Signal:**
  - **Bullish:** Count(Bullish Dimensions) $>$ Count(Bearish Dimensions)
  - **Bearish:** Count(Bearish Dimensions) $>$ Count(Bullish Dimensions)
  - **Neutral:** Equal bullish and bearish dimension counts

---

## 5. Technical Analysis Engine (5-Strategy Ensemble)

Located in `StockTechnicalsAnalysis` (`src/components/stock/stock-technicals-analysis.tsx`).

The technical engine combines 5 distinct quantitative strategies across different market microstructures to eliminate curve-fitting and single-indicator whipsaws:

$$
\text{Score}_{\text{technical}} = 0.25 \cdot S_{\text{trend}} + 0.20 \cdot S_{\text{mr}} + 0.25 \cdot S_{\text{mom}} + 0.15 \cdot S_{\text{vol}} + 0.15 \cdot S_{\text{stat\_arb}}
$$

### 5.1 Strategy 1: Trend Following (25% Weight)
- **Exponential Moving Average (EMA) Ribbons:** 8-day, 21-day, and 55-day EMAs:
  $$
  \text{EMA}_t(N) = P_t \cdot \alpha + \text{EMA}_{t-1}(N) \cdot (1 - \alpha), \quad \alpha = \frac{2}{N+1}
  $$
  Bullish crossover alignment: $\text{EMA}_8 > \text{EMA}_{21} > \text{EMA}_{55}$.
- **Average Directional Index (ADX):** Measures trend strength. $\text{ADX} > 25.0$ confirms a persistent trending regime.
- **Directional Movement (+DI / -DI):** $+\text{DI} > -\text{DI}$ confirms upward directional bias.
- **Normalized Trend Score:** Scaled to $[-1.0, +1.0]$.

### 5.2 Strategy 2: Mean Reversion (20% Weight)
- **Price Z-Score:** Measures standard deviations from 20-day moving average:
  $$
  Z = \frac{P_t - \mu_{20}}{\sigma_{20}}
  $$
  $Z < -2.0 \implies$ Statistically oversold (bullish reversal); $Z > +2.0 \implies$ Statistically overbought (bearish reversal).
- **Bollinger Bands:** $\text{Upper} = \mu_{20} + 2\sigma_{20}, \quad \text{Lower} = \mu_{20} - 2\sigma_{20}$.
- **Relative Strength Index (RSI 14d & 28d):**
  $$
  \text{RSI} = 100 - \frac{100}{1 + \text{RS}}, \quad \text{RS} = \frac{\text{EMA}(\text{Gains}, 14)}{\text{EMA}(\text{Losses}, 14)}
  $$
  $\text{RSI} < 30 \implies$ Oversold; $\text{RSI} > 70 \implies$ Overbought.

### 5.3 Strategy 3: Multi-Horizon Momentum (25% Weight)
- **Multi-Period Returns:** $\text{Mom}_{\text{1M}}, \text{Mom}_{\text{3M}}, \text{Mom}_{\text{6M}}$.
  - Strong positive momentum: $> +5.0\%$
  - Strong negative momentum: $< -5.0\%$
- **Volume Ratio:**
  $$
  \text{Volume Ratio} = \frac{\text{Volume}_t}{\frac{1}{21}\sum_{k=0}^{20} \text{Volume}_{t-k}}
  $$
  $\text{Ratio} > 1.50$ confirms institutional accumulation / high-conviction breakout.

### 5.4 Strategy 4: Volatility & Regime Detection (15% Weight)
- **21-Day Annualized Historical Volatility ($\text{HV}_{21}$):**
  $$
  \text{HV}_{21} = \text{stdev}(r_{t-20 \dots t}) \times \sqrt{252} \times 100
  $$
- **Volatility Regime Ratio:** Current $\text{HV}_{21}$ divided by long-term median volatility ($<0.8$ low volatility, $>1.2$ high volatility).
- **Volatility Z-Score:** Standard deviations of current volatility relative to trailing 1-year mean.
- **Average True Range Ratio ($\text{ATR Ratio}$):** $\text{ATR}_{14} / P_t$, measuring normalized session dispersion.

### 5.5 Strategy 5: Statistical Time-Series Properties (15% Weight)
- **Hurst Exponent ($H$):** Measures the long-term memory and self-similarity of price series via Rescaled Range ($R/S$) analysis:
  $$
  (R/S)_n \propto c \cdot n^H
  $$
  - $H < 0.40$: Strong mean-reverting (anti-persistent)
  - $0.40 \le H \le 0.45$: Moderate mean-reverting
  - $0.45 < H < 0.55$: Random walk / Geometric Brownian Motion
  - $0.55 \le H \le 0.60$: Weak trending
  - $H > 0.60$: Strong trending (persistent)
- **Return Skewness:** Third standardized moment of returns $\mathbb{E}[((r - \mu)/\sigma)^3]$. Positive skew indicates upside tail probability; negative skew indicates crash/gap vulnerability.
- **Return Kurtosis:** Fourth standardized moment $\mathbb{E}[((r - \mu)/\sigma)^4]$. Kurtosis $> 5.0$ confirms heavy fat tails (leptokurtic risk).

---

## 6. Market Sentiment Analysis Engine

Located in `StockSentimentAnalysis` (`src/components/stock/stock-sentiment.tsx`).

### 6.1 SEC Form 4 Insider Trading Signal (30% Weight)
Extracts legal insider transactions filed with the SEC:
- **Asymmetry Rule:** Insider **purchases** carry high positive signal weight (executives voluntarily deploy personal capital). Insider **sales** carry lower negative weight (routinely driven by tax planning, option exercises, or scheduled 10b5-1 plans).
- **Transaction Metrics:**
  - Net Insider Transaction Value ($\text{Value}_{\text{buys}} - |\text{Value}_{\text{sales}}|$)
  - Bullish vs. Bearish transaction count ratio

### 6.2 NLP News Sentiment Analysis (70% Weight)
Parses recent media and corporate disclosures using financial NLP models, scoring articles into Bullish, Bearish, or Neutral buckets.

### 6.3 Sentiment Synthesis:
$$
\text{Weighted Bullish} = 0.30 \cdot \text{InsiderBuyScore} + 0.70 \cdot \text{NewsBullishScore}
$$
$$
\text{Weighted Bearish} = 0.30 \cdot \text{InsiderSellScore} + 0.70 \cdot \text{NewsBearishScore}
$$
$$
\text{Bullish Share} = \left(\frac{\text{Weighted Bullish}}{\text{Weighted Bullish} + \text{Weighted Bearish}}\right) \times 100\%
$$

---

## 7. AI Multi-Agent Investment Bot Framework

Located in `StockAgentSuggestions` (`src/components/stock/stock-agent-suggestions.tsx`).

SOPHIE implements 5 autonomous AI personas modeled on iconic investment philosophies:

### 7.1 Warren Buffett Bot (Quality Value & Economic Moats)
- **Core Principles:** Focuses on business predictability, capital allocation, and sustainable moats.
- **Mandatory Criteria:**
  - Return on Equity $\text{ROE} > 15\%$ consistently across cycles
  - Operating Margin $> 15\%$ reflecting pricing power
  - Conservative debt structure and strong liquidity
  - Valuation via Owner Earnings with a built-in Margin of Safety

### 7.2 Charlie Munger Bot (Multidisciplinary Mental Models & ROIC)
- **Core Principles:** Employs mental models (inversion, microeconomic incentives, psychological bias).
- **Mandatory Criteria:**
  - Return on Invested Capital ($\text{ROIC} > 15\%$)
  - Pricing power and low capital reinvestment requirements
  - Shareholder-aligned capital allocation (shrinking share count via accretive share repurchases)
  - Inversion: systematically checking for catastrophic business vulnerabilities

### 7.3 Cathie Wood Bot (Disruptive Innovation & Exponential Growth)
- **Core Principles:** Thematic investing in multi-trillion-dollar technological secular shifts (AI, genomics, robotics, blockchain).
- **Mandatory Criteria:**
  - Revenue growth acceleration and expanding Total Addressable Market (TAM)
  - High R&D intensity and gross margin expansion
  - Operating leverage potential over a 5-year exponential adoption S-curve
  - High-growth multi-stage DCF modeling

### 7.4 Stanley Druckenmiller Bot (Macro Momentum & Asymmetric Risk/Reward)
- **Core Principles:** Top-down macro alignment paired with aggressive bottom-up earnings momentum and disciplined risk control.
- **Mandatory Criteria:**
  - High-velocity growth: Revenue growth $> 30\%$ and EPS growth $> 30\%$
  - Price momentum $> 50\%$ with strong institutional sponsorship
  - Strict capital preservation: Debt-to-Equity $< 0.30$
  - Multiples: Screening for compressed EV/EBITDA and EV/EBIT relative to growth velocity

### 7.5 Benjamin Graham Bot (Deep Value & Quantitative Net-Net)
- **Core Principles:** The father of value investing; strict quantitative balance sheet conservatism without qualitative speculation.
- **Mandatory Criteria:**
  - **Net-Net Working Capital (NNWC):** $\text{Current Assets} - \text{Total Liabilities} - \text{Preferred Stock}$
  - **Graham Number:** Fair value ceiling calculated as:
    $$
    V_{\text{Graham}} = \sqrt{22.5 \times \text{EPS} \times \text{Book Value Per Share}}
    $$
  - Current Ratio $> 2.0$ and Debt Ratio $< 0.50$
  - Unbroken dividend payment record and multi-year positive earnings

---

## 8. SOPHIE Master Synthesis & Composite Scoring

Located in `StockAnalysisSummary` (`src/components/stock/stock-analysis-summary.tsx`).

SOPHIE synthesizes all quantitative models, fundamental data, technical indicators, sentiment feeds, and agent opinions into a unified score and multi-horizon roadmap:

### 8.1 Composite Rating Score ($0\text{--}100$)
- **$80\text{--}100$ (Emerald):** Strong Bullish conviction across valuation, fundamentals, and momentum.
- **$60\text{--}79$ (Blue):** Moderate Bullish conviction.
- **$40\text{--}59$ (Amber):** Neutral / Mixed signals across pillars.
- **$< 40$ (Rose):** Bearish conviction / Significant multi-factor weakness.

### 8.2 Multi-Horizon Forecast Outlooks
- **Short-Term Horizon (Days to Weeks):** Driven by Technical Strategy Ensemble (EMAs, RSI, Z-Score) and NLP News Sentiment.
- **Medium-Term Horizon (Months to 1 Year):** Driven by Valuation Multiples (DCF, EV/EBITDA), Earnings Growth, and Analyst Target Dispersion.
- **Long-Term Horizon (Multi-Year):** Driven by Fundamental Quality (ROE, Moat Strength, FCF Conversion, Debt-to-Equity).

---

## 9. Comprehensive Formula & Indicator Lookup Table

| Component | Indicator / Formula | Threshold / Benchmark | Implementation File |
|---|---|---|---|
| **Valuation** | DCF Intrinsic Value | $r=10\%, g=5\%, g_n=2.5\%$ | `components/stock/stock-valuation.tsx` |
| **Valuation** | Owner Earnings | $\text{Net Income} + \text{D\&A} - \text{MaintCapex}$ | `components/stock/stock-valuation.tsx` |
| **Valuation** | EV/EBITDA Target | Historical/Peer Multiple $\times$ EBITDA | `components/stock/stock-valuation.tsx` |
| **Valuation** | Residual Income | $\text{BV}_0 + \sum \frac{\text{Net Income} - r \cdot \text{BV}}{(1+r)^t}$ | `components/stock/stock-valuation.tsx` |
| **Valuation** | Valuation Gap | $\frac{\text{Intrinsic Value} - \text{Market Cap}}{\text{Market Cap}}$ | `components/stock/stock-valuation.tsx` |
| **Valuation** | Confidence % | $\min(100, \frac{|\text{Gap}|}{0.30} \times 100)$ | `components/stock/stock-valuation.tsx` |
| **Fundamentals** | Return on Equity | $> 15.0\%$ | `components/stock/stock-fundamentals-analysis.tsx` |
| **Fundamentals** | Net Margin | $> 20.0\%$ | `components/stock/stock-fundamentals-analysis.tsx` |
| **Fundamentals** | Operating Margin | $> 15.0\%$ | `components/stock/stock-fundamentals-analysis.tsx` |
| **Fundamentals** | Current Ratio | $> 1.50$ | `components/stock/stock-fundamentals-analysis.tsx` |
| **Fundamentals** | Debt-to-Equity | $< 0.50$ | `components/stock/stock-fundamentals-analysis.tsx` |
| **Fundamentals** | FCF Conversion | $> 0.80$ ($80\%$) | `components/stock/stock-fundamentals-analysis.tsx` |
| **Technicals** | EMA Ribbon | $\text{EMA}_8 > \text{EMA}_{21} > \text{EMA}_{55}$ | `components/stock/stock-technicals-analysis.tsx` |
| **Technicals** | ADX Trend Strength | $\text{ADX} > 25.0$ | `components/stock/stock-technicals-analysis.tsx` |
| **Technicals** | Price Z-Score | $Z < -2.0$ (oversold), $Z > +2.0$ (overbought) | `components/stock/stock-technicals-analysis.tsx` |
| **Technicals** | 14d RSI | $< 30$ (oversold), $> 70$ (overbought) | `components/stock/stock-technicals-analysis.tsx` |
| **Technicals** | Hurst Exponent | $< 0.45$ (MR), $> 0.55$ (Trend) | `components/stock/stock-technicals-analysis.tsx` |
| **Technicals** | Volume Ratio | $> 1.50$ (high conviction) | `components/stock/stock-technicals-analysis.tsx` |
| **Technicals** | Historical Volatility | $\text{stdev}(r_{21}) \times \sqrt{252}$ | `components/stock/stock-technicals-analysis.tsx` |
| **Sentiment** | Insider Transaction Value | Form 4 Net Dollar Flow ($30\%$ weight) | `components/stock/stock-sentiment.tsx` |
| **Sentiment** | NLP News Sentiment | Bullish vs Bearish articles ($70\%$ weight) | `components/stock/stock-sentiment.tsx` |
| **AI Agents** | Graham Number | $\sqrt{22.5 \times \text{EPS} \times \text{BVPS}}$ | `components/stock/stock-agent-suggestions.tsx` |
| **Synthesis** | SOPHIE Score | $0\text{--}100$ Multi-factor Rating | `components/stock/stock-analysis-summary.tsx` |

---

## Related Wiki Articles & Research

- [Analyst Consensus Target Prices](/wiki/stock-analysis/analyst-consensus-target-prices) — Dispersion vs. average target prices
- [SEC Form 4 Insider Trading Signals](/wiki/stock-analysis/insider-trading-signal-form4) — Interpreting insider buys vs. sells
- [Charlie Munger Worldly Wisdom](/wiki/finance101/charlie-munger-worldly-wisdom) — Multidisciplinary mental models in finance
- [Stanley Druckenmiller Q3 2025 Positioning](/wiki/form-13f/druckenmiller-q3-2025-bessent-edge) — Macro momentum and risk management
- [Alphabet GOOGL DCF Valuation](/wiki/stock-analysis/alphabet-googl-dcf-interactive-valuation) — Case study in DCF modeling
