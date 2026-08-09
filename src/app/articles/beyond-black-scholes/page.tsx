'use client';

import {
  ArrowLeft,
  Maximize2,
  BookOpen,
  AlertCircle,
  ExternalLink,
  Zap,
  Activity,
  Layers,
  Cpu,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart2,
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Shared UI Components ---

/** Converts lightweight math notation to HTML with proper sub/superscripts.
 *  Supports: ^{exp} _{sub} ^x _x   and // comment lines. */
function parseMath(line: string): string {
  if (line.trimStart().startsWith('//')) {
    return `<span style="opacity:0.45;font-style:italic">${line}</span>`;
  }
  return line
    // Multi-char superscript: ^{content}  (no nested braces in content)
    .replace(/\^\{([^{}]+)\}/g, '<sup style="font-size:0.72em">$1</sup>')
    // Multi-char subscript: _{content}
    .replace(/_\{([^{}]+)\}/g, '<sub style="font-size:0.72em">$1</sub>')
    // Single-char superscript: ^Q  ^T  ^t etc.
    .replace(/\^([A-Za-z0-9α-ωΑ-Ω*])/g, '<sup style="font-size:0.72em">$1</sup>')
    // Single-char subscript: _t  _s  _0 etc.
    .replace(/_([A-Za-z0-9α-ωΑ-Ω])/g, '<sub style="font-size:0.72em">$1</sub>');
}

const MathBox = ({ title, block }: { title?: string; block: string }) => {
  const lines = block.split('\n');
  return (
    <div className="bg-slate-900 dark:bg-[#14171B] text-emerald-300 p-5 rounded-2xl my-6 shadow-xl overflow-x-auto border border-slate-700 dark:border-white/10">
      {title && (
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 uppercase tracking-widest font-semibold">
          <Activity size={14} />
          {title}
        </div>
      )}
      <div className="font-mono text-sm md:text-base leading-loose">
        {lines.map((line, i) =>
          line === '' ? (
            <div key={i} className="h-2" />
          ) : (
            <div key={i} dangerouslySetInnerHTML={{ __html: parseMath(line) }} />
          )
        )}
      </div>
    </div>
  );
};

const Callout = ({
  icon: Icon,
  title,
  children,
  color = 'blue',
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  color?: string;
}) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-500 text-blue-900 dark:text-blue-300',
    amber: 'bg-amber-50 dark:bg-amber-950/20 border-amber-500 text-amber-900 dark:text-amber-300',
    rose: 'bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-900 dark:text-rose-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-300',
    purple: 'bg-purple-50 dark:bg-purple-950/20 border-purple-500 text-purple-900 dark:text-purple-300',
  };
  const iconColors: Record<string, string> = {
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    rose: 'text-rose-500',
    emerald: 'text-emerald-500',
    purple: 'text-purple-500',
  };
  return (
    <div className={`border-l-4 p-6 rounded-r-xl my-6 shadow-sm ${colors[color] ?? colors.blue}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon size={22} className={iconColors[color] ?? iconColors.blue} />
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
};

const SectionHeading = ({ children, badge }: { children: React.ReactNode; badge?: string }) => (
  <div className="mb-8 mt-16">
    {badge && (
      <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{children}</h2>
    <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4" />
  </div>
);

const ModelCard = ({
  title,
  objective,
  models,
  derivatives,
  icon: Icon,
  gradient,
}: {
  title: string;
  objective: string;
  models: string;
  derivatives?: string;
  icon: React.ElementType;
  gradient: string;
}) => (
  <div className="bg-white dark:bg-[#14171B] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-white/10 flex flex-col h-full group">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${gradient} text-white shadow-md transform group-hover:scale-110 transition-transform`}
    >
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow leading-relaxed">
      <strong className="text-slate-800 dark:text-white">Objective:</strong> {objective}
    </p>
    {derivatives && (
      <div className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed bg-slate-50 dark:bg-white/5 p-3 rounded-lg border border-slate-100 dark:border-white/10">
        <strong className="text-slate-800 dark:text-white block mb-1">Target Derivatives:</strong>
        {derivatives}
      </div>
    )}
    <div className="pt-4 border-t border-slate-100 dark:border-white/10 mt-auto">
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Representative Models</p>
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{models}</p>
    </div>
  </div>
);

// --- Page ---

export default function ArticlePage() {
  return (
    <ArticleFrame
      slug="beyond-black-scholes"
      additionalDisclaimer="The mathematical models discussed are simplified representations for educational understanding. Always consult with qualified financial professionals before making investment decisions."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-700 dark:text-slate-300 font-sans bg-transparent">
        <div className="mb-12">
          <InfographicSlot alt="Beyond Black-Scholes Infographic" />
        </div>

        {/* Introduction */}
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            The publication of the Black-Scholes-Merton option pricing formula in 1973 represents the foundational
            cornerstone of modern quantitative finance. By demonstrating that the theoretical value of a European option
            could be uniquely determined through a dynamic hedging strategy, the framework established a monumental
            theoretical achievement.
          </p>

          <Callout icon={AlertTriangle} title="The Empirical Failure" color="amber">
            Despite its historical significance and elegant closed-form analytical solution, the rigid assumptions of
            the Black-Scholes framework systematically fail to capture the nonlinear, discontinuous, and complex
            dynamics inherent in empirical financial markets.
            <br />
            <br />
            Asset returns exhibit significant <strong>skewness and leptokurtosis (&ldquo;fat tails&rdquo;)</strong>,
            meaning extreme market events occur far more frequently than a Gaussian framework predicts. Furthermore,
            implied volatilities display a pronounced{' '}
            <strong>&ldquo;smile&rdquo; or &ldquo;skew&rdquo;</strong> across strikes, contradicting the assumption of
            constant volatility.
          </Callout>

          {/* Classification */}
          <SectionHeading badge="Taxonomy">Classification of Advanced Models</SectionHeading>

          <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            To navigate the expansive landscape of post-Black-Scholes quantitative finance, it is essential to
            establish a rigorous taxonomy based on the specific empirical anomalies each model seeks to address, the
            underlying mathematical processes, and the target derivative classes.
          </p>

          <div className="bg-white dark:bg-[#14171B] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-white/10 mb-10">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen size={22} className="text-indigo-500" />
              Classification by Mathematical Framework
            </h3>
            <div className="space-y-6 text-slate-700 dark:text-slate-300">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Continuous Diffusion Extensions</h4>
                  <p className="leading-relaxed">
                    Maintain continuous price paths but introduce additional stochastic state variables. Examples
                    include modeling variance itself as a mean-reverting process (Heston) or modeling interest rates
                    via the Ornstein-Uhlenbeck (OU) process (Vasicek). Solutions often remain highly analytical or
                    semi-analytical via characteristic functions and Fourier inversion techniques.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Discontinuous / Jump Processes</h4>
                  <p className="leading-relaxed">
                    Abandon purely continuous paths to allow for sudden, macroscopic price shocks. This includes
                    Jump-Diffusion (Merton) and pure jump L&eacute;vy processes (Variance Gamma). These are vital for
                    modeling short-term options, earnings gaps, and extreme tail risks that continuous diffusion models
                    cannot reach in a short time frame.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Local &amp; Implied Models</h4>
                  <p className="leading-relaxed">
                    Models like Dupire&apos;s Local Volatility or the SABR model derive their dynamics directly from
                    the market&apos;s implied volatility surface, ensuring perfect calibration to liquid vanilla
                    options before pricing more complex exotic derivatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Application by Asset &amp; Derivative Class</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <ModelCard
              icon={Activity}
              gradient="from-blue-400 to-blue-600"
              title="Stochastic Volatility (Equity/FX)"
              objective="To accurately reproduce the implied volatility smile and skew by modeling variance as an unobservable, mean-reverting stochastic process."
              models="Heston, SABR, SVI"
              derivatives="Vanilla Options, Barrier Options, Forward Starting Options, Volatility Swaps"
            />
            <ModelCard
              icon={Zap}
              gradient="from-rose-400 to-rose-600"
              title="Jump-Diffusion & Lévy (Equity/Crypto)"
              objective="To capture sudden, discontinuous price shocks and generate the leptokurtic (fat-tailed) distributions observed in empirical asset returns."
              models="Merton, Kou Double Exponential, Variance Gamma"
              derivatives="Short-dated Options, Digital/Binary Options, Deep OTM Puts"
            />
            <ModelCard
              icon={BarChart2}
              gradient="from-emerald-400 to-emerald-600"
              title="Short-Rate Models (Fixed Income)"
              objective="To model the evolution of interest rates using mean-reverting (OU) processes, ensuring accurate pricing along the term structure."
              models="Vasicek (OU Process), CIR, Hull-White"
              derivatives="Bond Options, Interest Rate Swaptions, Caps/Floors, Bermudan Swaptions"
            />
            <ModelCard
              icon={Layers}
              gradient="from-purple-400 to-purple-600"
              title="Reduced-Form (Credit Derivatives)"
              objective="To value defaultable securities by treating default as an exogenous, unpredictable Poisson event driven by a stochastic hazard rate."
              models="Hazard Rate Models, Affine Default Intensity"
              derivatives="Credit Default Swaps (CDS), CDOs, Vulnerable Options"
            />
          </div>

          {/* Math Foundations */}
          <SectionHeading badge="Core Mechanics">The Mathematical Foundation</SectionHeading>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Moving beyond Black-Scholes requires sophisticated mathematical machinery. When we relax the assumption of
            constant volatility or continuous price paths, the standard Black-Scholes PDE either breaks down or becomes
            impossible to solve analytically. Quantitative finance relies on three core pillars to establish
            tractability.
          </p>

          <div className="space-y-8 mb-12">
            {/* Pillar 1 */}
            <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Layers size={24} />
                </div>
                <div className="w-full min-w-0">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">1. The Feynman-Kac Theorem</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    The Feynman-Kac formula is the vital bridge connecting stochastic differential equations (SDEs) to
                    deterministic PDEs. It proves that solving a complex parabolic PDE is mathematically equivalent to
                    calculating the conditional expectation of a payoff under the risk-neutral measure{' '}
                    <strong>Q</strong>.
                  </p>
                  <MathBox
                    title="Feynman-Kac Expectation"
                    block={`V(t, x) = E^{Q} [ exp(-∫_{t}^{T} r(s) ds) · Payoff(X_{T}) | X_{t} = x ]`}
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    This theorem shifts the quant&apos;s job from solving impossible PDEs to evaluating expected
                    values of random paths under Q.
                  </p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <Activity size={24} />
                </div>
                <div className="w-full min-w-0">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    2. Affine Jump-Diffusions &amp; The OU Process
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    <strong>Affine Models</strong> are a class where the drift and variance are strictly linear
                    (affine) functions of the state variables, enabling closed-form characteristic functions. The most
                    famous building block is the <strong>Ornstein-Uhlenbeck (OU) Process</strong> &mdash; used in the
                    Vasicek interest rate model and as the variance driver in Heston.
                  </p>
                  <MathBox
                    title="The Ornstein-Uhlenbeck (OU) SDE & Analytical Solution"
                    block={`// Stochastic Differential Equation
dx_{t} = θ(μ - x_{t}) dt + σ dW_{t}

// Exact Analytical Solution
x_{t} = x_{0} e^{-θt} + μ(1 - e^{-θt}) + σ ∫_{0}^{t} e^{-θ(t-s)} dW_{s}

// Moments
E[x_{t}]   = x_{0} e^{-θt} + μ(1 - e^{-θt})
Var[x_{t}] = (σ² / 2θ) · (1 - e^{-2θt})`}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-100 dark:border-emerald-900/30">
                      <strong className="text-emerald-800 dark:text-emerald-400">θ (Speed):</strong> How fast the variable snaps back to
                      the mean.
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-100 dark:border-emerald-900/30">
                      <strong className="text-emerald-800 dark:text-emerald-400">μ (Level):</strong> The long-term mean equilibrium.
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-100 dark:border-emerald-900/30">
                      <strong className="text-emerald-800 dark:text-emerald-400">σ (Vol):</strong> The magnitude of random shocks.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <Lightbulb size={24} />
                </div>
                <div className="w-full min-w-0">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    3. Characteristic Functions &amp; Fourier Inversion
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    For complex models like Heston, the probability density function (PDF) of the future asset price
                    is completely unknown. However, because Heston is affine, its{' '}
                    <strong>Characteristic Function</strong> (the Fourier transform of the PDF) has a closed-form
                    analytical solution.
                  </p>
                  <MathBox
                    title="Exponential Affine Characteristic Function"
                    block={`φ(u, t) = E^{Q}[ e^{iu·X_{T}} | F_{t} ] = exp( A(u, τ) + B(u, τ)^{⊤} · X_{t} )`}
                  />
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4 mb-2">
                    Once &phi;(u) is known, the{' '}
                    <strong>Carr-Madan Fast Fourier Transform (FFT)</strong> technique inverts it to extract option
                    prices via a single fast numerical integral.
                  </p>
                  <Callout icon={Cpu} title="The Semi-Analytical Advantage" color="purple">
                    This is why Heston is called <em>semi-analytical</em>. Instead of solving a 2D PDE grid, you
                    evaluate one Fourier integral:
                    <br />
                    <br />
                    <code className="bg-purple-100/50 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-2 rounded block text-center font-mono text-sm tracking-wide">
                      C(K, T) = S·P₁ &minus; K·e^(-rT)·P₂
                    </code>
                    <br />
                    Where P₁ and P₂ (in-the-money probabilities under Q and the stock measure) are recovered by
                    integrating &phi;(u) over the complex plane &mdash; computed in milliseconds.
                  </Callout>
                </div>
              </div>
            </div>
          </div>

          {/* Stochastic Volatility */}
          <SectionHeading badge="Volatility Dynamics">Stochastic Volatility Models</SectionHeading>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Stochastic volatility (SV) models abandon the Black-Scholes assumption of constant volatility, instead
            treating variance as a random process with its own source of risk. This naturally generates the implied
            volatility smile and skew observed in equity, FX, and commodity markets.
          </p>

          {/* Heston */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-8 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
              1
            </span>
            The Heston Model (1993)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            The Heston model assumes that the instantaneous variance follows a CIR mean-reverting stochastic process.
            Crucially, the Brownian motions driving the asset price and its variance are correlated, which
            mathematically produces the leverage effect (skewness).
          </p>

          <MathBox
            title="Heston Risk-Neutral Dynamics"
            block={`dS_{t} = (r - q) S_{t} dt + √(V_{t}) S_{t} dW_{1,t}
dV_{t} = a(v̄  - V_{t}) dt + η √(V_{t}) dW_{2,t}

Correlation:  E[dW_{1,t} · dW_{2,t}] = ρ dt`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl border border-slate-100 dark:border-white/10">
              <li className="flex gap-2">
                <ArrowRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>v̄ (Long-term variance):</strong> The equilibrium level variance drifts toward.
                </span>
              </li>
              <li className="flex gap-2">
                <ArrowRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>a (Mean reversion rate):</strong> How aggressively variance is pulled back.
                </span>
              </li>
              <li className="flex gap-2">
                <ArrowRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>η (Vol of vol):</strong> Amplitude of random variance fluctuations (kurtosis).
                </span>
              </li>
              <li className="flex gap-2">
                <ArrowRight size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>ρ (Correlation):</strong> Responsible for generating the asymmetric skew.
                </span>
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-6 rounded-xl flex flex-col justify-center">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-2 flex items-center gap-2">
                <AlertTriangle size={18} className="text-blue-500" />
                The Feller Condition
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                To prevent the variance process from reaching zero (becoming deterministic), parameters must satisfy
                the Feller boundary condition:
              </p>
              <code className="bg-white/60 dark:bg-black/40 text-blue-900 dark:text-blue-300 px-3 py-2 rounded font-mono text-center block font-bold border border-blue-200 dark:border-blue-900/30">
                2a·v̄ &gt; η²
              </code>
            </div>
          </div>

          <Callout icon={Activity} title="Heston's Semi-Analytical Pricing" color="blue">
            Because Heston is an affine process, the log-price characteristic function takes the form:
            <br />
            <br />
            <code className="font-mono text-sm block bg-blue-100/50 dark:bg-blue-900/30 dark:text-blue-300 p-2 rounded tracking-wide">
              φ(u) = exp( C(u,τ)·v̄ + D(u,τ)·V_t + iu·x_t )
            </code>
            <br />
            Where <strong>C</strong> and <strong>D</strong> are solutions to Riccati ODEs. European options are priced
            by integrating this function over the complex plane &mdash; far faster than Monte Carlo simulation.
          </Callout>

          {/* SABR */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
              2
            </span>
            The SABR Model (2002)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Stochastic Alpha, Beta, Rho (SABR) is the industry standard for interest rate derivatives (swaptions,
            caps) and FX options. Unlike Heston, SABR models the forward price directly and is primarily used for
            interpolating the implied volatility smile rather than pricing dynamic exotic options.
          </p>

          <MathBox
            title="SABR Forward Measure Dynamics"
            block={`dF_{t} = α_{t} (F_{t})^{β} dW_{1,t}    // Forward price with CEV local vol
dα_{t} = ν α_{t} dW_{2,t}               // Lognormal stochastic vol process

Correlation:  E[dW_{1,t} · dW_{2,t}] = ρ dt`}
          />

          <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm mb-6">
            <h4 className="font-bold text-slate-800 dark:text-white mb-3">The Backbone Parameter (&beta;)</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              The &beta; parameter controls the relationship between the ATM volatility and the forward rate level
              (the &ldquo;backbone&rdquo;).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 bg-slate-50 dark:bg-[#14171B] rounded border border-slate-100 dark:border-white/10">
                <strong className="text-slate-900 dark:text-white">&beta; = 1:</strong> Lognormal (Stochastic Black model)
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#14171B] rounded border border-slate-100 dark:border-white/10">
                <strong className="text-slate-900 dark:text-white">&beta; = 0:</strong> Normal (Stochastic Bachelier model)
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#14171B] rounded border border-slate-100 dark:border-white/10">
                <strong className="text-slate-900 dark:text-white">0 &lt; &beta; &lt; 1:</strong> CEV / Displaced Diffusion
              </div>
            </div>
          </div>

          <Callout icon={Lightbulb} title="Hagan's Asymptotic Expansion" color="blue">
            The defining feature of SABR is Hagan&apos;s asymptotic expansion. By forcing the SABR option price into
            the Black-Scholes formula, an explicit analytical equation for implied lognormal volatility is extracted:
            <br />
            <br />
            <code className="font-mono text-sm block bg-blue-100/50 dark:bg-blue-900/30 dark:text-blue-300 p-2 rounded tracking-wide">
              σ_impl(K, F) ≈ α · f(F, K, β, ρ, ν)
            </code>
            <br />
            This approximation evaluates in microseconds, allowing traders to instantly map the entire volatility
            surface without PDE grids.
          </Callout>

          {/* SVI */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
              3
            </span>
            Stochastic Volatility Inspired (SVI)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Jim Gatheral&apos;s SVI (2004) is a purely static parameterization of the implied total variance slice.
            It mathematically guarantees the absence of static arbitrage (butterfly arbitrage) when fitted correctly
            and is heavily used in equity index volatility surface construction.
          </p>

          <MathBox
            title="Raw SVI Parameterization"
            block={`w(k) = a + b[ ρ(k - m) + √((k - m)^{2} + σ^{2}) ]

where  k = ln(K/F)  is the log-moneyness`}
          />

          {/* Jumps */}
          <SectionHeading badge="Discontinuous Paths">Jump-Diffusion &amp; L&eacute;vy Processes</SectionHeading>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Continuous diffusion models require time to generate large price movements, systematically underestimating
            sudden structural shocks. Jump models introduce discontinuous mathematics to address this.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-[#14171B] p-6 border-t-4 border-rose-400 dark:border-rose-900/50 shadow-md rounded-b-xl">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Merton&apos;s Jump-Diffusion</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Superimposes a Poisson process onto Brownian motion. Jumps are normally distributed. Prices are
                computed via an infinite series of Black-Scholes formulas weighted by Poisson probabilities.
              </p>
              <MathBox
                title="Merton SDE"
                block={`dS_{t} / S_{t-} = (r - λk̄) dt + σ dW_{t} + (J_{t} - 1) dN_{t}`}
              />
            </div>
            <div className="bg-white dark:bg-[#14171B] p-6 border-t-4 border-rose-500 dark:border-rose-900/50 shadow-md rounded-b-xl">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Kou Double Exponential</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Uses an asymmetric Laplace distribution for jumps. Its mathematical memoryless property allows
                closed-form solutions for complex exotic barrier options.
              </p>
              <MathBox
                title="Kou Jump Density"
                block={`f_{Y}(y) = p · η₁ · exp(-η₁ y) · 𝟙{y ≥ 0}
         + q · η₂ · exp( η₂ y) · 𝟙{y < 0}`}
              />
            </div>
          </div>

          <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 rounded-full mix-blend-screen filter blur-3xl opacity-30" />
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Zap className="text-rose-400" /> Infinite Activity: Variance Gamma (VG)
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              The VG model completely eliminates continuous Brownian diffusion. The asset price moves exclusively via
              an infinite sequence of pure jumps across any finite time interval. It evaluates Brownian motion at a
              random &ldquo;economic time&rdquo; governed by a Gamma process.
            </p>
            <MathBox
              title="VG Characteristic Function"
              block={`Φ_{VG}(u) = ( 1 - iuθν + ½σ²νu² )^{-t/ν}`}
            />
          </div>

          {/* Interest Rates */}
          <SectionHeading badge="Term Structure">Interest Rate &amp; Fixed Income Models</SectionHeading>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Unlike equity models that simulate a tradable asset price directly, short-rate models simulate the
            evolution of the instantaneous interest rate r_t. The price of any zero-coupon bond P(t,T) is then
            derived as the risk-neutral expectation of the discount factor.
          </p>

          <MathBox
            title="Zero-Coupon Bond Pricing Fundamental Equation"
            block={`P(t, T) = E^{Q} [ exp(-∫_{t}^{T} r_{s} ds) | F_{t} ]`}
          />

          {/* Vasicek */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
              1
            </span>
            The Vasicek Model (1977)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Vasicek introduced the concept of mean-reversion to financial modeling using the Ornstein-Uhlenbeck (OU)
            process. It assumes rates are pulled towards a long-term average, preventing them from rising to infinity
            over long horizons.
          </p>

          <MathBox
            title="Vasicek SDE & Affine Term Structure"
            block={`dr_{t} = a(b - r_{t}) dt + σ dW_{t}

Bond Price:  P(t, T) = A(t, T) · exp(-B(t, T) · r_{t})
Yield:       R(t, T) = -(1 / (T - t)) · ln P(t, T)`}
          />

          <Callout icon={AlertTriangle} title="The Negative Rate Problem" color="amber">
            Because the random shock dW_t is normally distributed and &sigma; is constant, interest rates in the
            Vasicek model are normally distributed. Consequently, there is a strictly positive probability that
            rates become negative &mdash; a major theoretical flaw before the negative-rate era of the 2010s.
          </Callout>

          {/* CIR */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
              2
            </span>
            Cox-Ingersoll-Ross (CIR) Model (1985)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            To solve the negative rate problem, CIR modified the diffusion term to be proportional to the square root
            of the interest rate. As rates approach zero, volatility scales down to zero and the positive drift pushes
            the rate back up. This results in a non-central chi-squared distribution for rates.
          </p>

          <MathBox
            title="CIR SDE (Square-Root Process)"
            block={`dr_{t} = a(b - r_{t}) dt + σ √(r_{t}) dW_{t}

Bond Price:  P(t, T) = A(t, T) · exp(-B(t, T) · r_{t})`}
          />

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-6 rounded-xl mb-6">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" />
              Feller Condition for Strictly Positive Rates
            </h4>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 mb-3">
              If the parameters satisfy the condition below, the interest rate r_t will never reach zero and remains
              strictly positive:
            </p>
            <code className="bg-white/60 dark:bg-black/40 text-emerald-900 dark:text-emerald-300 px-3 py-2 rounded font-mono text-center block font-bold border border-emerald-200 dark:border-emerald-900/30">
              2ab &gt; &sigma;²
            </code>
          </div>

          {/* Hull-White */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
              3
            </span>
            The Hull-White Model (Extended Vasicek)
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Vasicek and CIR are &ldquo;equilibrium models&rdquo; &mdash; their yield curves are generated from
            parameters and usually fail to match the actual market yield curve. The Hull-White model introduces a
            time-dependent drift &theta;(t) to create a no-arbitrage model that perfectly calibrates to the observed
            term structure.
          </p>

          <MathBox
            title="Hull-White 1-Factor (HW1F) SDE"
            block={`dr_{t} = [ θ(t) - a · r_{t} ] dt + σ dW_{t}

// Where:
//   θ(t)  = Deterministic drift calibrated to the initial market yield curve
//   a     = Constant mean reversion speed
//   σ     = Constant volatility`}
          />

          <Callout icon={Layers} title="Bermudan Swaptions & Recombining Trees" color="emerald">
            The primary practical use of Hull-White is pricing Bermudan swaptions &mdash; options to enter a swap on
            multiple specified future dates. Because HW1F is normally distributed and Markovian, it enables highly
            efficient recombining trinomial trees to price these path-dependent, early-exercise derivatives.
          </Callout>

          {/* Machine Learning */}
          <SectionHeading badge="The Frontier">Integrating AI &amp; Machine Learning</SectionHeading>

          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 text-white shadow-2xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-xl">
                <Cpu size={32} className="text-pink-300" />
              </div>
              <h3 className="text-2xl font-bold">Neural Networks &amp; Calibration</h3>
            </div>
            <p className="text-indigo-100 leading-relaxed mb-6 text-lg">
              Classical parametric models suffer from parameter risk and complex optimization bottlenecks. Today, deep
              learning architectures (LSTMs, MLPs) are deployed not to replace models like SABR or Heston, but to
              dramatically accelerate their calibration.
            </p>
            <div className="bg-white/10 p-5 rounded-xl border border-white/20">
              <h4 className="font-bold text-pink-300 mb-2">The Hybrid AI Approach</h4>
              <p className="text-sm text-indigo-100">
                By training neural networks offline on millions of simulated model outputs, the AI learns the complex
                inverse mapping from market prices to latent parameters. In production, it bypasses slow numerical
                integration, outputting calibrated parameters in milliseconds &mdash; fusing the speed of machine
                learning with the structural integrity of financial mathematics.
              </p>
            </div>
          </div>

      </div>
    </ArticleFrame>
  );
}
