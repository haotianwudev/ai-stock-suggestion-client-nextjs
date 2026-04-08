'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Landmark, Settings, BarChart3, Target,
  AlertTriangle, History, Cpu, CheckSquare, TrendingUp, LineChart,
  CheckCircle2, FileText, ExternalLink
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Maximize2 } from 'lucide-react';

// ─── Reusable Components ───────────────────────────────────────────────────────

const Section = ({
  icon: Icon,
  title,
  gradient,
  children,
}: {
  icon: React.ElementType;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-12 hover:shadow-md transition-shadow duration-300 relative">
    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`} />
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-5 mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="text-lg text-slate-600 leading-relaxed space-y-6">{children}</div>
    </div>
  </section>
);

const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-900 text-slate-100 my-8 py-6 px-6 rounded-2xl border border-slate-700 shadow-inner overflow-x-auto">
    <div className="font-mono text-base md:text-lg text-center whitespace-nowrap">{children}</div>
  </div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4 tracking-tight flex items-center gap-2">
    <div className="w-1.5 h-6 bg-slate-300 rounded-full" />
    {children}
  </h3>
);

const MinorHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-xl font-semibold text-slate-700 mt-8 mb-3">{children}</h4>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function BondTermPremiumPage() {
  const currentArticle = articles.find(
    (a) => a.slug === 'bond-term-premium-fixed-income-dynamics-pricing-models'
  );
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const infographicUrl = 'https://i.imgur.com/zfZtnkj.jpeg';
  const googleDocUrl =
    'https://docs.google.com/document/d/e/2PACX-1vTbRxbkchJvVvKsDovVzkemlqRhOWeTrCFecWHTfLcEf_drPN8V6G_F1FRkdzW-lcReScrj0Ndx-wmk/pub';

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative selection:bg-indigo-100 selection:text-indigo-900">
      {/* SEO */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData
            articleTitle={currentArticle.title}
            articleSlug={currentArticle.slug!}
          />
        </>
      )}

      {/* Decorative background */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-br from-blue-100/50 via-indigo-50/50 to-teal-50/50 -z-10" />
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[100px] -z-10" />

      {/* Return to Home */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero */}
      <header className="pt-16 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8">
          <TrendingUp size={16} className="text-indigo-500" />
          Interactive Fixed Income Tutorial
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight mb-6 leading-tight">
          Decoding the Bond <br /> Term Premium
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          A Comprehensive Analysis of Fixed Income Dynamics, Pricing Models, and Portfolio Strategy
        </p>
      </header>

      {/* Infographic */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img
            src={infographicUrl}
            alt="Bond Term Premium Infographic"
            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <button
            onClick={(e) => { e.stopPropagation(); setIsImageViewerOpen(true); }}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            title="View full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              Click to view full screen
            </div>
          </div>
        </div>
      </section>

      <FullScreenImageViewer
        src={infographicUrl}
        alt="Bond Term Premium Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* Section 1 – Executive Summary */}
        <Section icon={BookOpen} title="Executive Summary" gradient="from-blue-500 to-cyan-400">
          <p>
            The bond term premium represents the excess yield investors demand for holding long-duration
            sovereign debt rather than rolling over short-term risk-free instruments. This report provides
            an exhaustive, mathematically rigorous analysis of the term premium, dissecting its theoretical
            foundations, econometric modeling, macroeconomic drivers, and strategic applications in fixed
            income portfolio management.
          </p>
          <p>
            While the pure expectations hypothesis posits that long-term yields merely reflect anticipated
            policy rates, modern affine term structure models — specifically the Adrian-Crump-Moench (ACM)
            framework — prove that term premia account for the bulk of yield curve variance.
          </p>
          <p>
            Between 2010 and 2022, unprecedented quantitative easing and depressed inflation volatility
            compressed term premia into negative territory, distorting standard asset allocation models.
            However, the post-2022 macroeconomic regime shift, characterized by sticky inflation, aggressive
            monetary tightening, and a return to positive equity-bond correlations, catalyzed a structural
            resurgence in duration compensation.
          </p>
          <p>
            Looking forward, persistent fiscal deficits and a massive artificial intelligence capital
            expenditure cycle threaten to flood the market with long-duration supply, structurally anchoring
            the term premium higher over the 2026–2030 horizon. This dynamic requires institutional and
            retail investors alike to fundamentally rethink duration exposure, curve positioning, and
            cross-sector allocations spanning nominal Treasuries, inflation-protected securities, and
            mortgage-backed assets.
          </p>
        </Section>

        {/* Section 2 – Theoretical Genesis */}
        <Section icon={Landmark} title="1. Foundation: Theoretical Genesis" gradient="from-violet-500 to-purple-500">
          <p>
            The term structure of interest rates remains one of the most rigorously analyzed subjects in
            empirical finance and macroeconomic theory. To understand the mechanics of the bond market, one
            must separate the yield of any long-term debt instrument into its fundamental constituent parts.
            The theoretical starting point for this decomposition is the pure expectations hypothesis, a
            framework that, while intuitive, routinely fails empirical testing.
          </p>

          <SubHeading>The Expectations Hypothesis vs. Modern Fixed Income Theory</SubHeading>
          <p>
            According to the expectations hypothesis, the expected return generated from purchasing and
            holding a long-term bond until its maturity should theoretically equal the expected return from
            rolling over a series of short-term bonds with a cumulative maturity matching the long-term bond.
          </p>

          <MathBlock>
            y<sub>t</sub><sup>(n)</sup> = (1/n) &Sigma;<sub>i=0</sub><sup>n-1</sup> E<sub>t</sub>[r<sub>t+i</sub>]
          </MathBlock>

          <p>
            However, modern fixed income theory and empirical asset pricing definitively reject the pure
            expectations hypothesis. Investors are risk-averse. Because the nominal return on a long-duration
            bond is highly uncertain if the instrument is liquidated prior to maturity, a risk premium must
            be embedded into the asset&apos;s price.
          </p>

          <MathBlock>
            y<sub>t</sub><sup>(n)</sup> = (1/n) &Sigma;<sub>i=0</sub><sup>n-1</sup> E<sub>t</sub>[r<sub>t+i</sub>] + TP<sub>t</sub><sup>(n)</sup>
          </MathBlock>

          <p>
            The term premium, <strong>TP<sub>t</sub><sup>(n)</sup></strong>, is defined as the explicit
            compensation demanded by investors for bearing interest rate risk, duration risk, and inflation
            uncertainty. Because it is a residual construct, it cannot be observed directly on trading
            screens; it must be econometrically estimated.
          </p>

          <SubHeading>The Historical Anomaly: Negative Term Premia (2010–2022)</SubHeading>
          <p>
            Between 2010 and 2021, the term premium on the benchmark 10-year U.S. Treasury note averaged
            near zero, eventually plunging to historic troughs near -1.50% during the depths of the
            COVID-19 pandemic.
          </p>
          <p>
            This prolonged era was driven by a powerful confluence of non-fundamental market technicals,
            structural macroeconomic shifts, and aggressive implementation of Quantitative Easing (QE) by
            the Federal Reserve. Central banks deliberately extracted duration risk from the private market,
            mechanically forcing the term premium into negative territory. Furthermore, in an environment
            where government bonds provided a reliable negative beta to growth shocks (acting as a portfolio
            hedge), institutional investors were willing to accept a negative term premium as an
            &quot;insurance premium.&quot;
          </p>
        </Section>

        {/* Section 3 – ACM Model */}
        <Section icon={Settings} title="2. Mechanics: Decomposing Yields (ACM Model)" gradient="from-rose-500 to-orange-500">
          <p>
            Because the term premium is a latent variable, financial economists rely on Affine Term
            Structure Models (ATSMs) to extract it from observable yield curve data. The canonical framework
            is the Adrian-Crump-Moench (ACM) model from the Federal Reserve Bank of New York.
          </p>

          <SubHeading>Theoretical Foundations</SubHeading>
          <p>
            Affine models operate on the core assumption that bond yields are linear (affine) functions of
            a set of underlying pricing factors. The critical innovation of ACM is that it completely
            bypasses non-linear numerical optimization, instead estimating models sequentially through a
            three-step linear regression approach using Ordinary Least Squares (OLS).
          </p>

          <SubHeading>The ACM Mathematical Walkthrough</SubHeading>
          <p>
            The model uses five principal components (PCA) of zero-coupon Treasury yields as the pricing
            factors, representing vector <strong>X<sub>t</sub></strong>.
          </p>

          <div className="space-y-6 mt-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <MinorHeading>Step 1: Estimate Physical Dynamics (P-Dynamics)</MinorHeading>
              <p className="text-slate-600 mb-4">
                A first-order vector autoregression, VAR(1), is fitted to the state variables establishing
                how yield curve factors evolve over time.
              </p>
              <MathBlock>
                X<sub>t+1</sub> = &mu; + &Phi;X<sub>t</sub> + v<sub>t+1</sub>
              </MathBlock>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <MinorHeading>Step 2: Estimate Excess Bond Return Regression</MinorHeading>
              <p className="text-slate-600 mb-4">
                The excess holding period return is regressed on lagged pricing factors and contemporaneous
                factor innovations.
              </p>
              <MathBlock>
                rx<sub>t+1</sub><sup>(n)</sup> = &beta;<sup>(n)&prime;</sup>v<sub>t+1</sub> + c<sup>(n)</sup> + &gamma;<sup>(n)&prime;</sup>X<sub>t</sub> + e<sub>t+1</sub><sup>(n)</sup>
              </MathBlock>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <MinorHeading>Step 3: Estimate Market Prices of Risk (Q-Dynamics)</MinorHeading>
              <p className="text-slate-600 mb-4">
                The market prices of risk (&lambda;<sub>t</sub>) are defined as an affine function, shifting
                the model from the physical measure to the risk-neutral measure.
              </p>
              <MathBlock>
                &lambda;<sub>t</sub> = &lambda;<sub>0</sub> + &lambda;<sub>1</sub>X<sub>t</sub>
              </MathBlock>
            </div>
          </div>
        </Section>

        {/* Section 4 – Quantitative Framework */}
        <Section icon={BarChart3} title="3. Quantitative Framework" gradient="from-amber-500 to-yellow-500">
          <p>
            To systematically forecast the term premium (TP<sub>t</sub>), quantitative researchers deploy
            multivariate linear regression models utilizing structural macroeconomic indicators.
          </p>

          <MathBlock>
            TP<sub>t</sub> = &alpha; + &beta;<sub>1</sub>(&sigma;<sub>&pi;,t</sub>) + &beta;<sub>2</sub>(Debt/GDP<sub>t</sub>) + &beta;<sub>3</sub>(&Delta;CB_Holdings<sub>t</sub>) + &beta;<sub>4</sub>(MOVE<sub>t</sub>) + &beta;<sub>5</sub>(Unspanned_Macro<sub>t</sub>) + &epsilon;<sub>t</sub>
          </MathBlock>

          <SubHeading>Key Drivers of Term Premium Variation</SubHeading>

          <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="py-4 px-6 font-semibold w-1/5">Variable</th>
                  <th className="py-4 px-6 font-semibold w-1/4">Description</th>
                  <th className="py-4 px-6 font-semibold w-[15%]">Expected Sign</th>
                  <th className="py-4 px-6 font-semibold">Economic Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  {
                    var: <>&sigma;<sub>&pi;,t</sub></>,
                    desc: 'Survey disagreement on 1-year ahead CPI',
                    sign: 'Positive (+)',
                    signColor: 'text-emerald-600 bg-emerald-50',
                    rationale: 'Higher inflation uncertainty demands greater compensation for purchasing power risk.',
                  },
                  {
                    var: <>Debt/GDP<sub>t</sub></>,
                    desc: 'Ratio of outstanding sovereign debt to GDP',
                    sign: 'Positive (+)',
                    signColor: 'text-emerald-600 bg-emerald-50',
                    rationale: 'Increased supply of duration requires a higher premium to induce arbitrageurs to hold the risk.',
                  },
                  {
                    var: <>&Delta;CB_Holdings<sub>t</sub></>,
                    desc: 'Change in central bank balance sheet size',
                    sign: 'Negative (−)',
                    signColor: 'text-rose-600 bg-rose-50',
                    rationale: 'QE removes duration risk from the market, mechanically depressing the premium.',
                  },
                  {
                    var: <>MOVE<sub>t</sub></>,
                    desc: 'Option-implied interest rate volatility',
                    sign: 'Positive (+)',
                    signColor: 'text-emerald-600 bg-emerald-50',
                    rationale: 'Higher general rate volatility implies higher mark-to-market risk for long bonds.',
                  },
                  {
                    var: <>Unspanned_Macro<sub>t</sub></>,
                    desc: 'Real economic activity / output gap metrics',
                    sign: 'Negative (−)',
                    signColor: 'text-rose-600 bg-rose-50',
                    rationale: 'Term premia are countercyclical; they rise during recessions when output gaps are negative.',
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-slate-800">{row.var}</td>
                    <td className="py-4 px-6 text-slate-600">{row.desc}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 font-medium px-2 py-1 rounded-md text-xs ${row.signColor}`}>
                        {row.sign}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{row.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 5 – Strategy */}
        <Section icon={Target} title="4. Strategy and Application" gradient="from-emerald-500 to-teal-500">
          <p>
            For professional fixed income managers, the term premium is a vital, tradable macro signal.
            Because the term premium exhibits mean-reverting properties, deviations from fundamental fair
            value present opportunities to generate alpha.
          </p>

          <SubHeading>The Portfolio Positioning Matrix</SubHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-50 rounded-2xl p-6 border-t-4 border-rose-400 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="text-rose-500 rotate-180" size={20} />
                Compressed / Negative Term Premium
              </h4>
              <ul className="space-y-5">
                {[
                  ['Target Duration', 'Underweight / Shorten. Zero compensation for interest rate risk.'],
                  ['Yield Curve', 'Curve Steepening Trades favored.'],
                  ['TIPS vs. Nominal', 'Overweight TIPS to protect against sudden inflation shocks without relying on term premium buffers.'],
                  ['Agency MBS', 'Overweight / Core Allocation. Seek yield through securitized credit OAS.'],
                  ['Corporate Credit', 'Emphasize yield over quality; allocate to HY, loans, and EM debt.'],
                ].map(([label, text], i) => (
                  <li key={i} className="text-sm">
                    <strong className="text-slate-800 block mb-1">{label}:</strong>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border-t-4 border-emerald-400 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp className="text-emerald-500" size={20} />
                Elevated / Normalizing Term Premium
              </h4>
              <ul className="space-y-5">
                {[
                  ['Target Duration', 'Overweight / Extend. High premium provides a yield cushion to lock in forward returns.'],
                  ['Yield Curve', 'Curve Flattening Trades.'],
                  ['TIPS vs. Nominal', 'Overweight Nominal Treasuries. Absolute yield and liquidity supersede TIPS.'],
                  ['Agency MBS', 'Selective/Hedged. Avoid generic pass-throughs due to severe extension risk (negative convexity).'],
                  ['Corporate Credit', 'High-Quality Bias. Rotate back into IG credit and government bonds.'],
                ].map(([label, text], i) => (
                  <li key={i} className="text-sm">
                    <strong className="text-slate-800 block mb-1">{label}:</strong>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 6 – Risks */}
        <Section icon={AlertTriangle} title="5. Risks & ATSM Failure Modes" gradient="from-red-500 to-rose-500">
          <p>
            The 2022 bond market crash serves as a stark case study of the known failure modes inherent in
            pure yield-only ATSMs like the ACM model.
          </p>

          <SubHeading>The Small-Sample Mean Reversion Bias</SubHeading>
          <p>
            Treasury yields are highly persistent. Because the VAR is estimated over a finite historical
            sample, it forces the model to assume expectations of future short rates will mean-revert too
            quickly. During the 2022 inflation shock, the model systematically underestimated the
            persistence of high policy rates. As a result, the mathematical residual — the term premium —
            absorbed the entirety of the yield spike, creating distorted estimates.
          </p>

          <SubHeading>The Limits of Gaussian Models</SubHeading>
          <p>
            The ACM framework is a Gaussian model, meaning it assumes state variables evolve linearly.
            Affine models are poorly equipped to handle non-linear monetary policy regime shifts (like the
            sudden exit from ZIRP in 2022). Historical covariance matrices completely failed during this
            disinflationary super-cycle breakout.
          </p>

          <SubHeading>The Survey-Augmented Solution</SubHeading>
          <p>
            Models like the Kim-Wright (KW) framework address these flaws by directly incorporating Blue
            Chip surveys of professional forecasters. By anchoring terminal short rates to actual human
            expectations, they avoid the extreme, spurious volatility in term premium estimates during
            structural breaks.
          </p>
        </Section>

        {/* Section 7 – Historical Evidence */}
        <Section icon={History} title="6. Historical Evidence" gradient="from-sky-500 to-indigo-500">
          <p>
            Historical data reveals abrupt regime shifts in the stock-bond correlation, driven entirely by
            the dominant source of macroeconomic uncertainty.
          </p>

          <ul className="space-y-6 mt-8">
            {[
              {
                era: 'Pre-2000: Elevated Regime',
                text: 'The primary risk was inflation (discount rate shocks). Positive inflation surprised hurt both equities and bonds, creating a positive stock-bond correlation (+0.35). Because bonds offered no diversification benefit during crashes, investors required structurally high term premia to hold them.',
              },
              {
                era: '2000–2021: Compressed Regime',
                text: 'With inflation tamed, risks shifted to growth shocks. Bad news hurt stocks but sparked central bank easing, rallying bonds. The correlation flipped negative (-0.29). Because bonds were an infallible hedge against equity drawdowns, investors bid term premia down to zero or below.',
              },
              {
                era: 'Post-2022: Paradigm Reversal',
                text: 'As inflation re-emerged, the correlation violently flipped back to positive. Long-term bonds no longer perfectly hedge equity portfolios, so multi-asset managers demand a structurally higher positive term premium to hold duration.',
              },
            ].map((item, i) => (
              <li key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 list-none">
                <strong className="text-lg text-slate-800 block mb-2">{item.era}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Section 8 – Modern Extensions */}
        <Section icon={Cpu} title="7. Modern Extensions" gradient="from-purple-500 to-violet-500">
          <p>
            Long-term structural forces are currently dictating where the term premium will settle over the
            intermediate 2026–2030 horizon.
          </p>

          <SubHeading>The AI Infrastructure Duration Shock</SubHeading>
          <p>
            The proliferation of generative AI requires astronomical capital expenditure ($3T – $5T). This
            financing supplies massive duration into fixed income markets via corporate issuance and private
            credit. To absorb this deluge of long-dated paper, fixed income investors must be incentivized
            by higher yields, forcing up the term premium.
          </p>

          <SubHeading>Fiscal Dominance</SubHeading>
          <p>
            Simultaneously, U.S. structural primary deficits are running near 3.5% of GDP. The
            preferred-habitat theory strictly dictates that this massive supply-demand imbalance (exacerbated
            by QT) must be resolved through a higher risk premium.
          </p>

          <SubHeading>Forward Rates (2026–2030)</SubHeading>
          <p>
            Quantitative models forecast that the term premium will not revert to zero. It is highly likely
            to settle into a structurally higher range of <strong>1.00% to 1.50%</strong>, restoring the
            yield curve to a traditional, upward-sloping posture.
          </p>
        </Section>

        {/* Section 9 – Synthesis & Checklist */}
        <Section icon={CheckSquare} title="8. Synthesis & Actionable Checklist" gradient="from-teal-500 to-emerald-500">
          <p className="mb-8">
            Retail investors utilizing fixed income ETFs (SHY, IEF, TLT) can directly apply the
            professional term premium framework to optimize asset allocation without complex modeling.
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'Monitor Official Publications',
                desc: "Track the NY Fed's AMEC website for monthly ACM 10-year term premium data. A crossing from negative to positive indicates the market is rewarding long duration.",
              },
              {
                title: 'Extend Duration When Elevated',
                desc: 'If the premium is high (~1.00%), incrementally shift from short-duration (SHY) to long-duration (TLT) to lock in high forward returns with a yield cushion.',
              },
              {
                title: 'Shorten Duration During Compressions',
                desc: 'If the premium plunges below zero, rotate out of long-duration ETFs and overweight cash or ultra-short Treasury ETFs to preserve capital.',
              },
              {
                title: 'Implement TIPS During Inflation Risk',
                desc: 'If nominal term premia are near zero but headline inflation volatility threatens, substitute nominal Treasury ETFs for TIPS (TIP) to mechanically protect purchasing power.',
              },
              {
                title: 'Adjust for Correlation Changes',
                desc: 'Recognize that with elevated term premia, stock-bond correlations turn positive. Diversify beyond the 60/40 portfolio using alternatives or floating-rate credit.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors"
              >
                <div className="mt-0.5 text-teal-500 flex-shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Google Doc CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6">
            Access the complete deep-dive document with extended mathematical derivations, model comparisons,
            and institutional-grade portfolio frameworks.
          </p>
          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
          >
            <FileText size={20} />
            Open Research Paper
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <strong>Educational Disclaimer:</strong> This article is for informational and educational
          purposes only. It does not constitute investment advice, financial guidance, or a recommendation
          to buy or sell any security. All investments involve risk, including the possible loss of
          principal. Past performance is not indicative of future results.
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center text-slate-500">
        <p className="flex items-center justify-center gap-2">
          <LineChart size={18} />
          &copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
