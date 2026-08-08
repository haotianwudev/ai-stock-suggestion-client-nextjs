'use client';

import { useState, useMemo } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Helper Components & Icons ---
const CheckCircle = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertTriangle = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const Info = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

type CollarInputs = {
  stockPrice: number;
  putStrike: number;
  callStrike: number;
  putPremium: number;
  callPremium: number;
};

export default function OptionCollarStrategyPage() {
  const [inputs, setInputs] = useState<CollarInputs>({
    stockPrice: 100,
    putStrike: 95,
    callStrike: 105,
    putPremium: 1.60,
    callPremium: 1.80,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const calculations = useMemo(() => {
    const { stockPrice, putStrike, callStrike, putPremium, callPremium } = inputs;
    const netPremium = callPremium - putPremium;
    const maxLoss = (stockPrice - putStrike) + (netPremium * -1);
    const maxProfit = (callStrike - stockPrice) + netPremium;
    const breakeven = stockPrice - netPremium;
    return { netPremium, maxLoss, maxProfit, breakeven };
  }, [inputs]);

  const PayoffChart = () => {
    const { putStrike, callStrike } = inputs;
    const { maxLoss, maxProfit } = calculations;
    const width = 500;
    const height = 300;
    const padding = 50;
    const minPrice = putStrike * 0.8;
    const maxPrice = callStrike * 1.2;
    const priceRange = maxPrice - minPrice;
    const maxAbsProfitLoss = Math.max(Math.abs(maxProfit), Math.abs(maxLoss)) * 1.5;
    const plRange = maxAbsProfitLoss * 2;

    const getX = (price: number) => padding + ((price - minPrice) / priceRange) * (width - 2 * padding);
    const getY = (pl: number) => (height - padding) - ((pl + maxAbsProfitLoss) / plRange) * (height - 2 * padding);

    const p1 = { x: getX(minPrice), y: getY(-maxLoss) };
    const p2 = { x: getX(putStrike), y: getY(-maxLoss) };
    const p3 = { x: getX(callStrike), y: getY(maxProfit) };
    const p4 = { x: getX(maxPrice), y: getY(maxProfit) };
    const zeroLineY = getY(0);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid lines */}
        <line x1={padding} y1={zeroLineY} x2={width - padding} y2={zeroLineY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4"/>
        <line x1={getX(putStrike)} y1={padding} x2={getX(putStrike)} y2={height-padding} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4"/>
        <line x1={getX(callStrike)} y1={padding} x2={getX(callStrike)} y2={height-padding} stroke="#10b981" strokeWidth="1" strokeDasharray="4"/>

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#94a3b8" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#94a3b8" strokeWidth="1" />

        {/* Payoff Line */}
        <path d={`M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} L ${p4.x},${p4.y}`} stroke="#0ea5e9" strokeWidth="3" fill="none" />

        {/* Points */}
        <circle cx={p2.x} cy={p2.y} r="4" fill="#f59e0b" />
        <circle cx={p3.x} cy={p3.y} r="4" fill="#10b981" />

        {/* Labels */}
        <text x={padding - 10} y={zeroLineY + 5} fill="#64748b" textAnchor="end" fontSize="12">$0</text>
        <text x={padding - 10} y={getY(maxProfit) + 5} fill="#10b981" textAnchor="end" fontSize="12">{maxProfit.toFixed(2)}</text>
        <text x={padding - 10} y={getY(-maxLoss) + 5} fill="#ef4444" textAnchor="end" fontSize="12">{-maxLoss.toFixed(2)}</text>
        <text x={getX(putStrike)} y={height - padding + 15} fill="#f59e0b" textAnchor="middle" fontSize="12">Put {putStrike}</text>
        <text x={getX(callStrike)} y={height - padding + 15} fill="#10b981" textAnchor="middle" fontSize="12">Call {callStrike}</text>
        <text x={width/2} y={height - 5} fill="#64748b" textAnchor="middle" fontSize="12">Stock Price at Expiration</text>
        <text x={15} y={height/2} fill="#64748b" transform={`rotate(-90 15,${height/2})`} textAnchor="middle" fontSize="12">Profit / Loss</text>
      </svg>
    );
  };

  const pillarCards = [
    {
      title: "Long Underlying Asset",
      description: "The foundation: you own 100 shares of a stock or ETF you believe in long-term but worry about short-term drops.",
      color: "blue"
    },
    {
      title: "Long Protective Put",
      description: "Your insurance policy. You buy an out-of-the-money put option, setting a 'floor' or minimum price you can sell your shares for.",
      color: "amber"
    },
    {
      title: "Short Covered Call",
      description: "The funding mechanism. You sell an out-of-the-money call option, creating a 'ceiling' and using the premium received to pay for the put.",
      color: "emerald"
    },
  ];

  const checklistItems = [
    "Is my primary goal capital preservation over maximum appreciation?",
    "Is the underlying stock/ETF highly liquid with active, narrow options spreads?",
    "Is the implied volatility environment reasonable? (High IV increases premiums, making collars cheaper).",
    "What is the maximum loss I am willing to accept (this sets the put strike)?",
    "At what price would I be happy to sell my shares (this sets the call strike)?",
    "What is my hedging timeframe (this sets the expiration date)?",
    "Have I consulted a tax professional about holding period and straddle rule implications?",
    "Do I have a management plan for rolling or closing the position if the stock moves significantly?",
  ];

  return (
    <ArticleFrame slug="option-collar-strategy-protect-gains-define-risk">
      <div className="max-w-5xl mx-auto px-4 text-slate-700">
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
          A comprehensive deep research analysis of the option collar strategy for capital preservation. Explores the three-pillar structure, interactive payoff calculations, volatility skew implications, and advanced management techniques for hedging long positions at low or zero net cost.
        </p>

        <InfographicSlot alt="Option Collar Strategy Infographic" />

        {/* --- Interactive Calculator --- */}
        <section id="calculator" className="mb-20 mt-12">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Interactive Payoff Calculator</h3>
              <p className="text-slate-500 mb-6">Adjust the inputs to see how they affect your risk, reward, and breakeven point.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-px bg-slate-200">
              {/* Inputs */}
              <div className="md:col-span-2 bg-white p-6 md:p-8">
                <div className="space-y-5">
                  {(Object.entries({
                    stockPrice: 'Stock Purchase Price',
                    putStrike: 'Put Strike (Floor)',
                    callStrike: 'Call Strike (Ceiling)',
                    putPremium: 'Put Premium (Cost)',
                    callPremium: 'Call Premium (Credit)',
                  }) as [keyof CollarInputs, string][]).map(([key, label]) => (
                    <div key={key}>
                      <label htmlFor={key} className="block text-sm font-medium text-slate-600 mb-1.5">
                        {label}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">$</span>
                        <input
                          type="number"
                          name={key}
                          id={key}
                          value={inputs[key]}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm pl-7 pr-4 py-2 text-slate-800 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                          step={key.includes('Premium') ? 0.01 : 1}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart & Results */}
              <div className="md:col-span-3 bg-white p-6 md:p-8 flex flex-col">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Payoff Profile at Expiration</h4>
                <div className="flex-grow">
                  <PayoffChart />
                </div>

                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-500">Max Profit</p>
                    <p className="text-lg font-semibold text-emerald-600">${calculations.maxProfit.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-500">Max Loss</p>
                    <p className="text-lg font-semibold text-red-600">-${calculations.maxLoss.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-500">Breakeven</p>
                    <p className="text-lg font-semibold text-slate-800">${calculations.breakeven.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-500">Net Premium</p>
                    <p className={`text-lg font-semibold ${calculations.netPremium >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      ${Math.abs(calculations.netPremium).toFixed(2)}
                      <span className="text-xs"> {calculations.netPremium >= 0 ? 'Credit' : 'Debit'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Three Pillars Section --- */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">The Three Pillars of a Collar Strategy</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mt-2">
              Understanding the fundamental components that create this defensive yet flexible position.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillarCards.map((pillar, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 border-2 border-${pillar.color}-200 shadow-sm`}>
                <div className={`w-12 h-12 bg-${pillar.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <span className={`text-${pillar.color}-600 font-bold text-lg`}>{index + 1}</span>
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-2">{pillar.title}</h4>
                <p className="text-slate-600 text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- When to Use It --- */}
        <section id="when-to-use" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">When Is a Collar Strategy a Good Fit?</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mt-2">
              A collar shines in specific scenarios where capital preservation is the top priority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Market Environment</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="text-sky-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>
                    <strong className="font-semibold text-slate-700">High Index Levels:</strong> When major indexes like the S&amp;P 500 are at or near all-time highs, the risk of a correction increases. A collar lets you stay invested while protecting against a sharp drop.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-sky-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>
                    <strong className="font-semibold text-slate-700">Post-Earnings Volatility:</strong> After a stock has had a big run-up into earnings, a collar can lock in those gains and protect against a negative surprise.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-sky-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>
                    <strong className="font-semibold text-slate-700">Uncertain Economic Climate:</strong> During periods of geopolitical tension or economic uncertainty, a collar provides a defined risk profile, acting as a buffer against unforeseen shocks.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-lg text-slate-900 mb-2">Investor Profile</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="text-sky-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>
                    <strong className="font-semibold text-slate-700">Concentrated Stock Position:</strong> Corporate executives or long-time employees with a large, low-cost-basis position in one stock can hedge without triggering a large tax bill from selling shares.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-sky-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>
                    <strong className="font-semibold text-slate-700">Retirees or Pre-Retirees:</strong> For those who depend on their portfolio and cannot afford a significant drawdown, a collar provides peace of mind by putting a floor on potential losses.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-sky-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>
                    <strong className="font-semibold text-slate-700">Long-Term Cautious Optimist:</strong> You believe in the company long-term but expect short-term turbulence. You are willing to sacrifice some upside for downside protection.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Strategy, Tricks & Management --- */}
        <section id="management" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Strategy, Tricks &amp; Management</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mt-2">
              Advanced techniques for initiating and managing a collar position effectively.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 flex items-start space-x-4 border border-slate-200 shadow-sm">
              <Info className="w-8 h-8 text-sky-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-slate-800">Understanding Volatility Skew (The &ldquo;Costless&rdquo; Collar)</h5>
                <p className="text-slate-600 text-sm">
                  Traders often seek a &ldquo;zero-cost&rdquo; collar where the call premium received equals the put premium paid. However, due to <strong className="font-semibold">volatility skew</strong>, out-of-the-money puts usually have higher implied volatility (and are thus pricier) than equidistant OTM calls. This is because the market demands more premium for downside protection. To achieve a zero-cost collar, you might have to sell a call that is much closer to the current stock price than the put you are buying, resulting in a skewed risk/reward profile. The &ldquo;cost&rdquo; is paid in forgone upside potential.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 flex items-start space-x-4 border border-slate-200 shadow-sm">
              <Info className="w-8 h-8 text-sky-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-slate-800">Rolling The Position</h5>
                <p className="text-slate-600 text-sm">
                  A collar isn&apos;t a &ldquo;set and forget&rdquo; strategy. Active management can improve results. &ldquo;Rolling&rdquo; involves closing the current options and opening new ones with different strikes or expirations.<br/>
                  <strong className="mt-2 block">Rolling Up:</strong> If the stock rallies towards your short call, you can roll the entire collar (both put and call) up to a higher set of strikes to allow for more upside.<br/>
                  <strong className="mt-1 block">Rolling Out:</strong> As expiration nears, if you want to maintain the hedge, you can roll the position out to a later expiration date. This often involves collecting a small credit or paying a small debit.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 flex items-start space-x-4 border border-slate-200 shadow-sm">
              <Info className="w-8 h-8 text-sky-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-slate-800">&ldquo;Legging In&rdquo; - A High-Risk Trick</h5>
                <p className="text-slate-600 text-sm">
                  This involves entering the legs of the trade at different times. For example, you might sell the covered call when you feel the stock is overbought, wait for a dip, and then buy the protective put when volatility is lower. While this can potentially improve your net premium, it&apos;s risky. You could sell the call and have the stock continue to rally without protection, or the stock could drop before you&apos;ve bought your put, leaving you fully exposed to the downside.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Risks & Pitfalls --- */}
        <section id="risks" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Risks and Common Pitfalls</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mt-2">
              While defensive, a collar is not without its own unique set of risks to consider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-lg p-6 flex items-start space-x-4 border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1"/>
              <div>
                <h5 className="font-semibold text-slate-900">Capped Upside (Opportunity Cost)</h5>
                <p className="text-slate-600 text-sm">
                  This is the most significant drawback. If the stock experiences a massive, unexpected rally, your gains are firmly capped at the short call strike price. You are trading away potential &ldquo;home run&rdquo; profits for downside security.
                </p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 flex items-start space-x-4 border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1"/>
              <div>
                <h5 className="font-semibold text-slate-900">Early Assignment Risk</h5>
                <p className="text-slate-600 text-sm">
                  If the stock price moves above your short call&apos;s strike, you can be assigned and forced to sell your 100 shares. This risk is highest for dividend-paying stocks right before the ex-dividend date, as option holders may exercise to capture the dividend.
                </p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 flex items-start space-x-4 border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1"/>
              <div>
                <h5 className="font-semibold text-slate-900">Complex Tax Implications</h5>
                <p className="text-slate-600 text-sm">
                  In taxable accounts, establishing a collar can be a complex event. It can pause the stock&apos;s holding period for tax purposes or fall under &ldquo;straddle&rdquo; rules, potentially turning long-term gains into less favorable short-term ones. Always consult a tax advisor.
                </p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 flex items-start space-x-4 border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1"/>
              <div>
                <h5 className="font-semibold text-slate-900">Whipsaw / Sideways Market Drag</h5>
                <p className="text-slate-600 text-sm">
                  If the stock trades in a range between your strikes (a &ldquo;whipsaw&rdquo; market), both options may expire worthless. If you paid a net debit for the collar, this amount is lost. Repeatedly placing collars in a flat market can slowly erode your principal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Pre-Trade Checklist --- */}
        <section id="checklist" className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900">Pre-Trade Implementation Checklist</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mt-2">
              Answer these questions before executing a collar to ensure it aligns with your goals.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <ul className="space-y-4">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
