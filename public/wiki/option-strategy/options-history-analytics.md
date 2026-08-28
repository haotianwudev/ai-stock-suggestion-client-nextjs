# Options History Analytics

Every other tab in the Options Viewer reads a single point-in-time chain. The History tab is the
exception: it reads accumulated daily history, which is what makes it the only place the viewer can
answer *how does today compare to normal?*

That distinction matters more than it sounds. The Volatility tab's own methodology notes that the
informative signal in a risk reversal is its **level against its own history, not its sign** — a
statement a single snapshot structurally cannot act on. Everything below exists to close that gap.

## Why this needs an ETL rather than a live query

An option chain snapshot is **not reproducible from the live feed**. A FRED series can be re-fetched
for any historical date, which is why most data on this platform tolerates a missed run. A chain
quoted at the close on a given session ceases to exist when the session ends — Cboe publishes current
state, not an archive.

A missed capture is therefore a hole no re-run can fill, not a delayed row. That single property is
why the capture runs on a cloud scheduler after each close rather than on demand. The gap is not
strictly irrecoverable — a data vendor that recorded OPRA at the time can serve historical chains —
but recovering it costs money and effort that capturing it live does not.

## Percentile ranks

Each headline metric — normalised skew, 25Δ risk reversal, 25Δ butterfly, ATM implied vol, net
gamma exposure, put/call open interest ratio — is ranked against its own stored history.

This is what converts "risk reversal is +3.89 vol points" into "risk reversal sits in the 88th
percentile of where this surface normally trades". The first number is uninterpretable without
knowing the surface's habits; the second is the actual signal.

**Ranks are withheld below 20 stored sessions.** A percentile computed against four observations
looks precise and carries no information, which is worse than showing nothing — so the tab reports
how far along the series is instead. Raw values render correctly from the first session; only the
ranks wait.

## Skew Stickiness Ratio

How the surface *actually* moved, measured against how its own skew said it would:

$$
\text{SSR} = \frac{\Delta \sigma_{\text{ATM}} \,/\, \Delta \ln S}{\partial \sigma / \partial \ln K \big|_{\text{ATM}}}
$$

The numerator is the realised move in at-the-money implied vol per unit of log-spot. The denominator
is the at-the-money skew that was already in place before the move — fit by least squares over
out-of-the-money quotes within ±5% of spot. Both sides are vol points per log-unit, so the ratio is
dimensionless.

Three choices in that slope fit are deliberate. The band is **tight** because the smile is curved,
so a wide window measures curvature as much as slope when the quantity wanted is the derivative *at*
the money. Only **out-of-the-money** quotes are used, since on each wing those are the tradeable
side of the spread. And it is fit against **log-moneyness rather than strike**, which keeps the
measure scale-free as the index level drifts over years and dimensionally matches the $\Delta \ln S$
it is divided into.

| SSR | Regime | What happened |
|---|---|---|
| ~ 0 | **Sticky delta** | The smile travelled with spot; ATM vol barely moved. The market treated the move as trend |
| ~ 1 | **Sticky strike** | The smile stayed pinned to strikes; ATM vol slid along the existing skew exactly as the skew implied |
| 1.3 – 2 | **Repricing** | Vol moved further than the skew implied — the surface repriced rather than merely shifted |
| > 2 | **Extreme — check the denominator** | Not necessarily a bigger version of Repricing. See below |
| < 0 | **Inverted** | ATM vol moved against the skew's implication, usually a volatility-regime change rather than a spot-driven move |

**Why it matters beyond classification.** The Gamma tab's zero-gamma flip level is computed by
repricing every contract at candidate spot levels while *holding implied vol constant* — the
sticky-strike assumption, stated explicitly in that tab's methodology. SSR is the only measurement
on the platform that reports whether that assumption actually held on a given day. A reading far
from 1 means the published flip level rests on shakier ground than its precision suggests.

SSR is unavailable on the first stored session, and on any day the index moved less than roughly
0.1%. In that second case the ratio is dividing by a near-zero denominator, which turns ordinary
quote noise in ATM vol into an enormous and entirely meaningless number.

**Readings past ~2 are usually the same failure mode on the other side of the ratio.** The
0.1%-move guard only protects the numerator — it says nothing about the prior session's skew
slope, which is SSR's *denominator*. On a session that closed with an unusually flat skew (a
small but nonzero slope), dividing by it amplifies ordinary noise in the realised ATM-vol move
into a large SSR the same way a near-flat spot tape does, just from the other side of the ratio.
There is no guard against this today: `compute_ssr()` rejects `slope_prev` only when it is exactly
zero or `None`, not when it is merely small. So a reading above roughly 2 should not automatically
be read as "twice the repricing" — check the ATM skew slope figure shown on the surface-dynamics
card for that prior session before treating it as a genuine extreme-repricing day rather than a
flat-skew artifact. This is the same discipline the Volatility tab's thin-quote flag and dead-cycle
filter ask for elsewhere in this wiki: an unusually large or noisy number is a prompt to check the
inputs, not to read the output at face value.

> **Convention warning.** SSR normalisations differ across the literature — some scale so that
> sticky delta reads 1 and sticky strike reads 2. The definition above is this platform's. Check
> which convention a source uses before comparing its figures against this one. This is the same
> discipline the risk reversal sign convention requires elsewhere in the wiki.

## Open interest flow

Volume says how much traded. It cannot say whether that trading **opened or closed** positions —
and those are opposite signals wearing an identical signature. Rising open interest on heavy volume
is conviction being built; falling open interest on the same volume is an unwind or a short cover.

Separating them requires differencing two sessions of stored chain, which is why no single snapshot
can produce this read no matter how carefully it is analysed.

Each side is classified by its open-interest change relative to that day's own volume:

| State | Condition | Reading |
|---|---|---|
| **Building** | ΔOI / volume > +0.15 | New positions opened |
| **Closing** | ΔOI / volume < −0.15 | Positions unwound or covered |
| **Churning** | between | Heavy trading, flat net positioning |

The threshold is a **ratio rather than an absolute contract count** on purpose: 10,000 contracts of
open-interest change means something completely different on a 2,000-lot day than on a 2,000,000-lot
one.

### What "differencing two sessions" quietly assumes

That both sessions describe the *same book*. They do not, automatically. SPX lists new expiration
cycles continuously, so a cycle can appear in today's stored chain having never been stored before —
and a contract with no prior row cannot be differenced at all.

Treating that absence as *zero* prior open interest is the trap: it books the cycle's entire resting
position as opened today, which is indistinguishable from real conviction and large enough to
dominate the total. The pipeline handles this from both ends. A cycle, once stored, is kept until it
expires, so the set only ever grows by genuinely new listings. And the change itself is measured
**only over contracts present in both sessions**, with the coverage reported alongside the reading —
if it drops materially below 100%, the panel says so rather than quietly reporting a partial book as
a whole one.

This is the unglamorous half of any day-over-day signal: the arithmetic is trivial, and almost all
the difficulty is in guaranteeing the two things being subtracted are actually comparable.

## Skew versus price divergence

Over a trailing 20-session window, the *joint direction* of price and normalised skew:

| Price | Skew | State | Reading |
|---|---|---|---|
| Rising | Steepening | **Wall of Worry** | Participants are still paying for protection — historically the healthier way for a market to advance |
| Rising | Flattening | **Euphoria** | The same rally with the hedges stripped out. Fragile: an unhedged book has further to fall on a shock |
| Falling | Steepening | **Fear Confirming** | Hedging demand building into weakness — the textbook risk-off signature |
| Falling | Flattening | **Capitulation / Relief** | Protection sold into the decline, often late in a move once hedges have already paid |

The window is roughly one trading month: long enough for a trend to establish, short enough that the
current regime has not been averaged away.

This is the sharpest thing stored history buys. The Volatility tab's morphology classifier can
report that skew *is* flat — a level. Only this can report that skew is *flattening while price
rises* — a transition. The transition is the signal; the level is only the state it arrived at.

## Limitations

- **The series cannot be backfilled from the live feed.** History begins when capture began; closing an earlier gap requires a paid historical-chain vendor.
- **Percentile ranks need 20 sessions**; open-interest flow and SSR need 2. The tab degrades to a
  progress state rather than an error, but the reads are genuinely unavailable until then.
- **Open interest publishes once daily**, so ΔOI is strictly session-over-session and cannot resolve
  intraday positioning changes.
- **One sample per session.** Intraday skew dynamics are invisible; only session-to-session moves
  are captured.
- **SSR uses a platform-specific normalisation** and is not directly comparable to published figures
  scaled to a different convention.
- **SSR's flat-tape guard only covers the spot side.** A near-flat prior-session skew slope can
  inflate SSR past 2 the same way a near-flat spot move does — there is no equivalent guard on
  that side of the ratio today, so an extreme reading needs the same "check the inputs first"
  treatment as the Volatility tab's thin-quote and dead-cycle artifacts.
- **The per-strike history is a slice, not the whole chain** — key expirations within ±25% of spot.
  Deep-wing per-strike history exists only in the raw archive, not in the queryable tables.
- **Percentile ranks are only as representative as the window they cover.** A young series ranks
  against a narrow slice of market conditions; a reading in the 90th percentile of two months is not
  the same claim as the 90th percentile of five years.

## Related Reading

- [Volatility Surface Analytics](/wiki/option-strategy/volatility-surface-analytics) — the smile, skew and RND specs these metrics build on
- [GEX Methodology](/wiki/option-strategy/gex-methodology) — the gamma flip level whose sticky-strike assumption SSR tests
- [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis) — what OI and volume each measure
- [Volatility Smile & Skew Explained](/wiki/option-strategy/volatility-smile-skew) — the underlying skew concepts
