'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronsRight, Menu, X, BrainCircuit, BarChartBig, GanttChartSquare, AlertTriangle, Unplug, Bird, Target } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function VolatilityForecastingGuide() {
  const currentArticle = articles.find(article => article.slug === 'quantitative-analyst-guide-volatility-forecasting');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: 'introduction', title: 'The Nature of Volatility', icon: BarChartBig },
    { id: 'econometrics', title: 'Econometric Foundations: GARCH', icon: GanttChartSquare },
    { id: 'machine-learning', title: 'The Machine Learning Frontier', icon: BrainCircuit },
    { id: 'deployment', title: 'Deployment in Algo Trading', icon: Target },
    { id: 'assumptions', title: 'Assumptions & Limitations', icon: Unplug },
    { id: 'black-swans', title: 'The Challenge of Black Swans', icon: Bird },
    { id: 'landscape', title: 'The Quant Trading Landscape', icon: AlertTriangle },
    { id: 'conclusion', title: 'Conclusion', icon: ChevronsRight },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-gray-50 min-h-screen font-sans text-slate-800">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <div className="max-w-screen-xl mx-auto flex">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
            sections={sections}
            onNavigate={handleScrollTo}
          />
          <MainContent />
        </div>
      </div>
    </>
  );
}

// Header Component
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-sky-500/10 rounded-lg">
            <BarChartBig className="h-6 w-6 text-sky-600" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Volatility Forecasting</span>
        </div>
        <div className="lg:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ isOpen, onClose, sections, onNavigate }: {
  isOpen: boolean;
  onClose: () => void;
  sections: Array<{ id: string; title: string; icon: any }>;
  onNavigate: (id: string) => void;
}) => {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-50 transform transition-transform lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex-shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center lg:hidden">
          <h3 className="font-semibold text-slate-800">Navigation</h3>
          <button onClick={onClose} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4">
          <h3 className="px-3 text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Sections</h3>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(section.id);
                  }}
                  className="flex items-center text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-sky-50"
                >
                  <section.icon className="h-4 w-4 mr-3 text-slate-400" />
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Helper Components
const Highlight = ({ children, color = 'sky' }: { children: React.ReactNode; color?: 'sky' | 'amber' | 'emerald' | 'rose' }) => {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-800',
    amber: 'bg-amber-100 text-amber-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    rose: 'bg-rose-100 text-rose-800',
  };
  return <span className={`px-1.5 py-0.5 rounded-md font-medium ${colorClasses[color]}`}>{children}</span>;
};

const Section = ({ id, title, children, className }: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-10 border-b border-slate-200 ${className || ''}`}>
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">{title}</h2>
    <div className="prose prose-slate max-w-none lg:prose-lg prose-h3:font-semibold prose-h3:text-slate-800 prose-h4:font-medium prose-h4:text-slate-700 prose-a:text-sky-600 prose-a:font-medium hover:prose-a:text-sky-700 prose-strong:font-semibold prose-code:bg-slate-100 prose-code:rounded-md prose-code:px-1.5 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600">
      {children}
    </div>
  </section>
);

const Math = ({ children, title }: { children: string; title?: string }) => (
  <div className="my-4 p-4 bg-slate-100 rounded-lg overflow-x-auto border border-slate-200">
    {title && <h4 className="text-sm font-semibold text-slate-600 mb-2">{title}</h4>}
    <code className="font-mono text-sm text-slate-800 whitespace-pre">{children}</code>
  </div>
);

const InfoBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="my-6 p-4 rounded-lg bg-sky-50 border border-sky-200">
    <h4 className="font-bold text-sky-800 mb-2">{title}</h4>
    <div className="text-sky-700 text-base">{children}</div>
  </div>
);

// Main Content Area
const MainContent = () => {
  return (
    <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Return to Home Button */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        <header className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 leading-tight">
            A Quantitative Analyst's Guide to Volatility Forecasting
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-slate-600">
            From GARCH to Deep Learning in Algorithmic Trading
          </p>
        </header>     
   <Section id="introduction" title="The Nature of Financial Volatility">
          <p>
            Volatility is the cornerstone of financial risk management and derivatives pricing. Unlike price, which is an observable data point, volatility is a <Highlight color="amber">latent statistical property</Highlight> that must be estimated. Its predictability stems from several empirically observed characteristics of financial returns.
          </p>
          
          <h4>Key Statistical Properties ("Stylized Facts"):</h4>
          <ul>
            <li><strong>Volatility Clustering:</strong> Periods of high volatility are followed by more high volatility, and calm periods are followed by calm. This indicates that volatility is <Highlight>autocorrelated</Highlight>.</li>
            <li><strong>Mean Reversion:</strong> Volatility tends to revert to a long-run average. Extreme spikes or troughs are usually temporary.</li>
            <li><strong>Fat Tails (Leptokurtosis):</strong> The distribution of asset returns exhibits fatter tails than a normal distribution, meaning <Highlight color="rose">extreme events are more common</Highlight> than a Gaussian model would predict.</li>
            <li><strong>Leverage Effect:</strong> Volatility tends to increase more in response to a large price drop than a price rise of the same magnitude. This reflects a negative correlation between returns and volatility.</li>
          </ul>

          <InfoBox title="Realized vs. Implied Volatility">
            <p><Highlight color="sky">Realized Volatility (RV)</Highlight> is a backward-looking measure calculated from historical price data. It tells you what the volatility *was*.</p>
            <p className="mt-2"><Highlight color="emerald">Implied Volatility (IV)</Highlight> is a forward-looking measure derived from option prices (e.g., the VIX). It represents the market's consensus expectation of what volatility *will be*. The spread between RV forecasts and IV is a primary source of alpha in volatility trading.</p>
          </InfoBox>
        </Section>       
 <Section id="econometrics" title="Econometric Foundations: The GARCH Family">
          <p>
            The <Highlight>Generalized Autoregressive Conditional Heteroskedasticity (GARCH)</Highlight> model, introduced by Tim Bollerslev in 1986, was a paradigm shift. It provides a formal econometric framework for modeling the stylized facts, particularly volatility clustering.
          </p>

          <h3>The GARCH(1,1) Model</h3>
          <p>The workhorse of the family is the GARCH(1,1) model, which defines the next period's variance (conditional variance) as a weighted average of three components:</p>

          <Math title="GARCH(1,1) Variance Equation">
            {"σ_t^2 = ω + α * ε_{t-1}^2 + β * σ_{t-1}^2"}
          </Math>

          <ul>
            <li><Highlight color="amber">ω (omega):</Highlight> A constant term, representing the long-run average variance.</li>
            <li><Highlight color="sky">α * ε_{`{t-1}`}^2 (the ARCH term):</Highlight> The previous period's squared residual (the "news" or "shock"). The <Highlight>α (alpha)</Highlight> parameter governs the reaction to market shocks.</li>
            <li><Highlight color="emerald">β * σ_{`{t-1}`}^2 (the GARCH term):</Highlight> The previous period's variance. The <Highlight>β (beta)</Highlight> parameter represents the persistence of volatility.</li>
          </ul>

          <p>The sum <Highlight>α + β</Highlight> measures the rate at which a shock's impact fades. A sum close to 1.0 indicates high persistence, a key feature of financial data.</p>

          <h3>Addressing the Leverage Effect</h3>
          <p>The standard GARCH model is symmetric. To capture the leverage effect, asymmetric models like <Highlight>GJR-GARCH</Highlight> and <Highlight>EGARCH</Highlight> were developed. GJR-GARCH adds a term to account for the sign of the shock.</p>

          <Math title="GJR-GARCH Variance Equation">
            {"σ_t^2 = ω + α * ε_{t-1}^2 + γ * ε_{t-1}^2 * I_{t-1} + β * σ_{t-1}^2"}
          </Math>

          <p>The new term, with parameter <Highlight color="rose">γ (gamma)</Highlight>, is only active when the previous shock was negative (I=1), allowing negative news to have a larger impact.</p>
        </Section>  
      <Section id="machine-learning" title="The Machine Learning Frontier">
          <p>
            While GARCH provides an interpretable, theory-driven framework, its rigid parametric form can be a limitation. Machine learning models offer a non-parametric, data-driven alternative capable of capturing far more complex patterns.
          </p>

          <h3>Feature Engineering is Crucial</h3>
          <p>The success of ML models heavily depends on the quality of input features. Raw time series data is often augmented with engineered features, such as:</p>
          <ul>
            <li><Highlight>Moving averages</Highlight> of volatility over different time horizons.</li>
            <li><Highlight>Order book metrics</Highlight> (e.g., bid-ask spread, depth).</li>
            <li><Highlight>Alternative data</Highlight> like social media sentiment or news analytics.</li>
            <li><Highlight>Macroeconomic data</Highlight> (e.g., interest rate changes).</li>
          </ul>

          <h3>Popular Model Architectures</h3>
          <ul>
            <li><strong>Tree-Based Ensembles (XGBoost, LightGBM):</strong> Excellent for handling tabular data with a mix of feature types. They excel at finding non-linear interactions but are not inherently sequential.</li>
            <li><strong>Recurrent Neural Networks (LSTMs, GRUs):</strong> Specifically designed for sequence data. Their internal memory states make them powerful for modeling time-dependencies and long memory, similar to GARCH's persistence.</li>
            <li><strong>Hybrid Models (GARCH + ML):</strong> A powerful technique involves a two-stage process. First, fit a GARCH model to the data. Then, train an ML model on the <Highlight color="emerald">GARCH model's standardized residuals</Highlight> to capture any remaining non-linear patterns that the GARCH model missed.</li>
          </ul>
        </Section> 
       <Section id="deployment" title="Deployment in Algorithmic Trading">
          <p>A volatility forecast is not an end in itself; it is a critical input for profit generation and risk control.</p>
          <ul>
            <li><strong>Risk Management:</strong> Forecasts directly feed into <Highlight color="amber">Value-at-Risk (VaR)</Highlight> and <Highlight>Expected Shortfall (ES)</Highlight> calculations. For an options market maker, this is the primary tool for managing book risk.</li>
            <li><strong>Position Sizing:</strong> Strategies can use forecasts to size positions inversely to expected volatility—taking smaller positions in volatile markets and larger ones in calm markets to target a constant level of risk.</li>
            <li><strong>Volatility Arbitrage:</strong> The core of many quantitative strategies. If your model forecasts future realized volatility to be <Highlight color="emerald">significantly lower</Highlight> than the market's implied volatility, you would sell options (e.g., sell a straddle). Conversely, if you predict an <Highlight color="rose">explosion in volatility</Highlight>, you would buy options.</li>
          </ul>
        </Section>  
      <Section id="assumptions" title="Foundational Assumptions and Limitations">
          <p>No model is a perfect representation of reality. Understanding their weak points is as important as knowing their strengths.</p>
          <ul>
            <li><strong>Stationarity:</strong> Most models assume the data generating process is stationary (i.e., its statistical properties don't change over time). Financial markets are <Highlight color="rose">not truly stationary</Highlight>. Market structure, participant behavior, and regulations all evolve. This leads to <Highlight>model decay</Highlight>.</li>
            <li><strong>The IID Assumption:</strong> Classical statistics assumes data points are Independent and Identically Distributed. GARCH models relax the "identically distributed" part but still rely on the independence of shocks.</li>
            <li><strong>Overfitting:</strong> A major risk in ML. A model with too many parameters can perfectly "predict" the past by memorizing the noise in the training data, but it will fail spectacularly on new, unseen data. <Highlight>Rigorous backtesting</Highlight> and cross-validation are essential to combat this.</li>
          </ul>
        </Section> 
       <Section id="black-swans" title="The Challenge of Extreme Events: Black Swans">
          <p>A black swan is an event that is <Highlight>outside the distribution</Highlight> of historical data. By definition, models trained on historical data cannot predict them.</p>

          <InfoBox title="Model Failure During Crisis">
            During the 2008 financial crisis, many VaR models based on normal distributions failed because they assigned a near-zero probability to the extreme market moves that occurred. The models provided a false sense of security.
          </InfoBox>

          <p>The goal is not to predict the black swan but to build a strategy that is <Highlight color="emerald">robust</Highlight> or even <Highlight color="sky">antifragile</Highlight>. This involves:</p>
          <ul>
            <li><strong>Avoiding excessive leverage.</strong></li>
            <li><strong>Stress testing</strong> models under extreme, historically unprecedented scenarios.</li>
            <li>Incorporating <Highlight>tail-risk hedging</Highlight> strategies (e.g., buying far out-of-the-money options) as a form of portfolio insurance.</li>
          </ul>
        </Section> 
       <Section id="landscape" title="The Quantitative Trading Landscape">
          <p>High-level volatility forecasting is the domain of elite quantitative trading firms.</p>

          <h3>Firm Archetypes</h3>
          <ul>
            <li><strong>Quantitative Hedge Funds (e.g., Renaissance Technologies, D.E. Shaw):</strong> Focus on statistical arbitrage across various asset classes. They operate on slightly longer time horizons than HFTs.</li>
            <li><strong>HFT Firms / Market Makers (e.g., Jane Street, Citadel Securities):</strong> Provide liquidity to the market. Their edge comes from ultra-low-latency infrastructure and sophisticated short-term forecasting models.</li>
          </ul>

          <p>The competitive edge in this space is a function of <Highlight>Alpha (signal)</Highlight>, <Highlight>Execution (speed)</Highlight>, and <Highlight>Cost (fees & slippage)</Highlight>. Success requires world-class talent, proprietary data, and massive investment in computational infrastructure.</p>
        </Section>       
 <Section id="conclusion" title="Conclusion" className="border-b-0">
          <p>
            The pursuit of accurately forecasting volatility is a relentless arms race. It began with the elegant, interpretable GARCH models and has evolved to embrace the complex, predictive power of machine learning. While these tools are indispensable for modern finance, their effectiveness is bounded by fundamental limitations and the ever-present risk of regime shifts and black swan events. The most successful quantitative firms combine cutting-edge modeling with a profound respect for risk and a deep understanding of the market's non-stationary and unpredictable nature.
          </p>
        </Section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>© 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </main>
  );
};
