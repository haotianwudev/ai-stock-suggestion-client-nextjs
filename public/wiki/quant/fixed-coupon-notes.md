---
path: quant/fixed-coupon-notes
title: "Fixed Coupon Notes (FCNs)"
articleSlug: fixed-coupon-notes-valuation-correlation-risk
date: 2026-11-10
labels: ["Quantitative Finance", "Options Trading"]
related: [quant/barrier-options, quant/architecture-structured-notes, quant/autocallable-strategy-engineered-yield-sideways-markets]
---

## Overview

A **Fixed Coupon Note (FCN)** is a yield-enhancement note, sold mostly through Asian and Australian private banks. In Europe the same economics is sold as an **Autocallable Barrier Reverse Convertible (BRC)**. The investor buys senior unsecured bank debt with a **short worst-of down-and-in put** embedded in it. In return they get a fixed, unconditional coupon of **8%–14% p.a.**, paid monthly or quarterly while the note is alive.

It is the mirror image of a traditional convertible bond. A convertible bondholder owns a long call and converts voluntarily when shares rise. An FCN holder has *sold* a put, and the issuer can force physical delivery of depreciated stock when prices collapse.

## Product Anatomy and Market Rationale

**Four structural pillars**

1. **Reference basket and worst-of mechanic.** The note references $n = 2$–$4$ correlated stocks, ETFs or indices. Every trigger is evaluated on the **Least Performing Equity (LPE)**, $W(t) = \min_i S_i(t)/S_i(0)$.
2. **Unconditional periodic coupons.** A fixed rate $c$ is paid about 5 business days after each observation date, until early termination. This is what separates an FCN from a conditional Phoenix note.
3. **Autocall (knock-out) barrier.** Observation dates are discrete and start after a 3–6 month lock-out. If *every* asset closes at or above $B_{KO}$ (95%–100% of initial spot), the note redeems at par plus the current coupon.
4. **Knock-in put barrier and conversion strike.** The strike $K$ is 100% (par-strike) or 70%–85% (low-strike buffer). The down-and-in barrier $B_{KI}$ sits at 60%–80% of spot. It is monitored either continuously (American) or only at maturity (European).

**Taxonomy.** Compared with its siblings, an FCN has fixed coupons and an autocall, with high autocall digital risk. A classic reverse convertible has fixed coupons and no autocall. A Phoenix pays coupons conditional on a coupon barrier, optionally with memory. A Snowball/Athena accrues a growing lump-sum coupon paid on autocall and carries the most extreme autocall digitality.

**Incentives.**
- **Buy side:** double-digit yield when sovereign yields are below 2%. It is a range-bound corridor bet, for example between an 80% KI and a 98% autocall over 6–12 months. It also works as a "yield-generating limit order" on blue chips, and it delegates put-rolling and margin operations to a bank.
- **Sell side:** the bank's treasury gets senior unsecured funding. The exotic desk gets long downside vol, skew and worst-of correlation protection plus a structuring margin. The cost is one-directional exposure to dividends, barrier digitals, vanna, vomma and cross-gamma, which must be recycled into wholesale markets.

## Quantitative Valuation and Calibration Architecture

**Replication.** The note is issued at par minus fees, and the engine solves for the fair coupon, strike or KI barrier. Fair value splits into four pieces: terminal par survival, early autocall redemptions, the coupon stream (discounted at risk-free plus issuer funding spread $s^f$, with settlement lag $\delta_p$), minus the short knock-out/down-and-in worst-of put. Empirically, coupons load on rates, implied vol and skew, implied correlation, and dividend/repo yields.

**Skew monetization.** Breeden-Litzenberger links tail probability to the strike slope of call prices. Negative skew ($\partial\sigma_{imp}/\partial K < 0$) makes $\partial C/\partial K$ more negative, which inflates $\mathbb{Q}(S_T < B_{KI})$ and the value of the embedded put. Higher dividends lower forwards, which cuts autocall probability and raises knock-in probability.
- *Worked example (3Y note, 50% KI, 0.5% swap rate):* the coupon is 6.5% under flat vol and 10.0% under local vol, a **+350 bps** lift from selling skew. The bank's 60%-of-notional delta hedge also earns dividends, and that value is passed into the coupon.

**Dupire LV to Heston-SLV.** Dupire local vol fits every vanilla exactly, but its forward skews flatten. That misprices conditional barrier probabilities, vanna and volga. Stochastic Local Volatility combines Heston dynamics (mixing fraction $\lambda_{mix}$) with a leverage surface $L_i(t,x)$ that keeps the vanilla fit exact via **Gyöngy's Markovian projection**. $L_i$ is calibrated forward in time with the **Guyon & Henry-Labordère (2012) McKean particle method**, which uses a Nadaraya-Watson kernel estimate of $\mathbb{E}[V_t \mid S_t = x]$.

**Monte Carlo discontinuities.** For $n \ge 3$ assets, pricing uses 10k–250k paths. The autocall and KI indicators create Dirac masses in the Greeks, so bump-and-revalue and AAD Greeks become unstable. There are two fixes:
- **Density differentiation (LRM, Malliavin):** differentiate the log-density instead of the payoff. This is cumbersome for multi-asset SLV with local correlation.
- **Payoff smoothing and fuzzy logic:** replace Heaviside steps with call-spread ramps of width $\varepsilon$. Scripting engines in the Savine/Danske style evaluate conditional AST nodes with a continuous **Degree of Truth** $DT \in [0,1]$, with $\varepsilon$ set automatically from a pre-simulation of each expression's standard deviation.

## Correlation Risk Dynamics and Cross-Gamma Modeling

**Dispersion.** As $\rho \to 1$ the basket collapses to a single asset. Low correlation raises the chance that *one* name breaches $B_{KI}$ and lowers the chance that *all* names clear $B_{KO}$.

**Polarity.** A worst-of put loses value as correlation rises, so the **investor is long correlation** (short dispersion) and the **desk is short correlation** (long dispersion). The desk's cega shows up day to day as negative dollar cross-gamma $\Phi_{ij}^{Desk} < 0$. It loses money whenever realized covariance exceeds implied covariance. For baskets of 4 or more names, the off-diagonal terms dominate P&L variance.
- *Worked example (2-asset ATM worst-of put near expiry, ρ = 99%):* deltas start at about −0.25 each. If $S_2$ rallies while $S_1$ lags, $\Delta_1 \to -1$ and $\Delta_2 \to 0$, so $\Gamma_{12} = \partial\Delta_1/\partial S_2 < 0$.
- Near $B_{KI}$ the desk's cross-gamma is strictly negative. Near $B_{KO}$, where the investor is long a worst-of binary call, its sign can flip depending on which side of the trigger the basket sits.

**Local correlation (Langnau 2009).** Constant correlation explains only about half of index skew. The rest comes from correlation rising as spot falls. LVLC interpolates convexly between a base matrix $\rho_0$ and the all-ones matrix $\Theta$ through a state aggregator $L_t$. That guarantees PSD, cuts simulation cost from $O(n^3)$ to $O(n)$, and adds a positive **shadow correlation delta** to the hedge. Implied basket correlation runs about ≥60% at strikes 70–80, 50% ATM and 40% at strikes 160–200.

**Stochastic correlation.** With two assets, Jacobi or tanh-OU diffusions keep $\rho_t \in (-1,1)$. With three or more, independent pairwise SDEs can break PSD. **Wishart matrix diffusions** (Bru; Da Fonseca–Grasselli; Marabel 2012) stay on $\mathcal{S}_n^+$ under the Gindikin condition and admit an exponential-affine characteristic function, which allows Fourier calibration.

| Framework | PSD | Step cost | Skew / breaks |
|---|---|---|---|
| Constant Gaussian | static check | $O(n^2)$ | ~50% of index skew, no breaks |
| Naive pairwise local | not guaranteed | $O(n^3)$ | flexible but under-determined |
| Langnau convex (LVLC) | guaranteed | $O(n)$ | exact basket skew + shadow delta |
| Jacobi / tanh-OU | n = 2 only | $O(n^3)$ for n ≥ 3 | stochastic premium (n = 2) |
| Wishart | intrinsic | high (Fourier-mitigated) | full stochastic covariance |

## Structural Pathologies and Hedging Crises

**Buy side.**
- *Asymmetry:* in bull markets the note autocalls after 1–3 months, which caps the return and forces reinvestment. In bear markets duration extends and the investor takes delivery of the worst stock. Same-sector baskets can lose up to 100%.
- *Settlement lag:* fixings lock on the trade date, but cash settles up to 2 weeks later. Autocall proceeds arrive about a week after observation.
- *Liquidity and credit:* the investor can only exit to the original dealer, at wide haircuts. The note is unsecured bank debt, so an issuer default (Lehman FCNs, 2008) wipes out principal even if the equities never touched $B_{KI}$.

**Sell side.**
- *KI delta cliff:* just above $B_{KI}$ the long DIP's delta exceeds 100% of notional. One tick below, it becomes a vanilla put with 50%–70% delta, forcing fire-sale dumping of the hedge. A principal jump of $1 - B_{KI}/K$ (30%–50%). The mitigation is a **barrier shift**, for example hedging a 60% barrier as if it sat at 55%.
- *Vega duration flip:* a 3Y note carries about −0.60%/vol-pt of vega on day 1, which the desk hedges at the ~2Y expected tenor. In a rally, vega collapses and the desk is left short 2Y 50%-strike puts. In a crash, duration extends to 3Y while the note's vega flips through vanna and vomma, forcing vol buybacks at peak panic.
- *Dividends and correlation:* falling markets magnify the desk's long-dividend exposure just as companies cut payouts (March 2020). Correlation swaps failed to track joint vol-correlation spikes, which pushed desks to covariance swaps and reserves.
- *Systemic loops:* in the 2015–16 HSCEI crash (−49% from May 2015), and again in 2020 and 2023–24, tens of billions of Korean ELS notes clustered at 50%–60% KI barriers. Simultaneous breaches forced futures liquidation and vega covering, which deepened the crash.

## Synthesis: Risk Management Imperatives

1. **Couple smile and dependency.** Use SLV marginals with LVLC or Wishart/stochastic correlation, and put the shadow correlation delta into daily hedges.
2. **Regularize discontinuities.** Apply fuzzy-logic payoff smoothing with $\varepsilon$ calibrated from pre-simulated variance, plus deliberate barrier shifting near the KI cliff.
3. **Bound cross-gamma and liquidity.** Single-stock vanillas cannot hedge $\Phi_{ij}$, so set warehousing limits using covariance-swap equivalents, dividend-crash stress tests, and barrier concentration relative to cash and futures liquidity.

## Key Concepts

- **Worst-of performance $W(t)$**: the minimum normalized price across the basket. It drives every trigger.
- **Autocall barrier $B_{KO}$**: an early-redemption trigger requiring all assets ≥ 95%–100% of initial spot.
- **Knock-in barrier $B_{KI}$**: activates the short put, at 60%–80% of spot, monitored continuously or at maturity.
- **Stochastic Local Volatility (SLV)**: Heston variance times a Dupire leverage surface, calibrated by McKean particles.
- **Degree of Truth (DT)**: a fuzzy-logic weight in $[0,1]$ that replaces boolean barrier tests to stabilize Monte Carlo Greeks.
- **Cega**: $\partial V/\partial\rho_{ij}$, sensitivity to pairwise correlation.
- **Dollar cross-gamma $\Phi_{ij}$**: $S_iS_j\,\partial^2V/\partial S_i\partial S_j$, the realized form of cega.
- **Shadow correlation delta**: the extra hedge from correlation depending on spot, $(\partial\pi/\partial\lambda)(\partial\lambda/\partial S_i)$.
- **Barrier shift (DIP write-off)**: hedging the KI as if it were lower, to under-hedge above the cliff.

## Formulas

Worst-of, stopping time and redemption:

$$
W(t) = \min_i \frac{S_i(t)}{S_i(0)}, \qquad \tau = \inf\{t_m : W(t_m) \ge B_{KO}\}
$$

$$
\Pi_{red}(T) = \mathbb{1}(\tau=\infty)\left[1 - \frac{I_{KI}}{K}\max\big(K - W(T), 0\big)\right]
$$

Fair value decomposition:

$$
V_0 = D_T^{s}\,\mathbb{Q}(\tau=\infty) + \sum_{m<M} D_{t_m+\delta_p}^{s}\,\mathbb{Q}(\tau=t_m) + \sum_{m} c_m D_{t_m+\delta_p}^{s}\,\mathbb{Q}(\tau \ge t_m) - D_T\,\mathbb{E}^{\mathbb{Q}}\!\left[\frac{\mathbb{1}(\tau=\infty) I_{KI}}{K}(K - W(T))^+\right]
$$

where $D^{s}$ discounts at $r + s^f$.

Breeden-Litzenberger with skew:

$$
\mathbb{Q}(S_T < K) = 1 + \frac{1}{DF}\frac{\partial C}{\partial K}, \qquad \frac{\partial C}{\partial K} = \frac{\partial C^{BS}}{\partial K} + \mathcal{V}^{BS}\frac{\partial\sigma_{imp}}{\partial K}
$$

SLV leverage (Gyöngy):

$$
L_i(t,x) = \frac{\sigma_{Dup}^i(t,x)}{\sqrt{\mathbb{E}^{\mathbb{Q}}[V_t^i \mid S_t^i = x]}}
$$

Fuzzy smoothing:

$$
S_\varepsilon(W - K) = \min\!\left(1, \max\!\left(0, \frac{W - (K - \varepsilon/2)}{\varepsilon}\right)\right), \qquad S_{final} = DT\,S_1 + (1-DT)\,S_2
$$

Cross-gamma P&L and the cega identity:

$$
\text{P\&L}^{\times\Gamma}_{\delta t} = \tfrac12\sum_{i}\sum_{j\ne i}\Phi_{ij}^{Desk}\left(\frac{\delta S_i}{S_i}\frac{\delta S_j}{S_j} - \rho_{ij}^{imp}\sigma_i\sigma_j\,\delta t\right), \qquad \frac{\partial V}{\partial\rho_{ij}} = \sigma_i\sigma_j\,\tau\,\Phi_{ij}
$$

Langnau local correlation:

$$
\rho(\lambda)_t = (1-\lambda(t,L_t))\,\rho_0 + \lambda(t,L_t)\,\Theta, \qquad \Delta_{i,LVLC} = \frac{\partial\pi}{\partial S_i} + \frac{\partial\pi}{\partial\lambda}\frac{\partial\lambda}{\partial S_i}
$$

## Key Takeaways

- An FCN's coupon is the premium on a short worst-of knock-in put. Skew, low correlation and high dividends all raise the coupon *and* the investor's tail risk.
- Pricing has to couple smile models (SLV) with dependency models (local or stochastic correlation). Calibrating them separately misprices the product.
- Barrier digitals break naive Monte Carlo Greeks. Fuzzy-logic smoothing and barrier shifts are standard desk practice.
- The desk is structurally short correlation with negative cross-gamma, which cannot be hedged with single-stock vanillas.
- In crashes, correlation spikes, dividend cuts, duration extension, vega flips and KI delta cliffs all hit at once. Barrier clustering (HSCEI/ELS) can turn that into a market-wide feedback loop.

## Related Reading

- [Quantitative Mechanics, Valuation Architecture, and Correlation Risk of Fixed Coupon Notes](/articles/fixed-coupon-notes-valuation-correlation-risk)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vSe0N5Cn1s9bNFoq4wuPayMDZcFC69vaO_G2UJk-NLliEbqf30ugzpBkG7V4y52nOcRj5d6i3PtI_TM/pub)
- [Barrier Option Valuation](/wiki/quant/barrier-options): the reflection-principle and Monte Carlo foundations behind the KI and autocall barriers.
