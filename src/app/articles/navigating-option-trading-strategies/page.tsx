'use client';
import React, { useEffect } from 'react';

export default function NavigatingOptionTradingStrategies() {
  useEffect(() => {
    // Active link highlighting for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, main > section[id]');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.substring(1) === entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e: Event) {
        const target = e.target as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 leading-relaxed">
      <style jsx>{`
        .content-section ul {
          list-style-type: disc;
          margin-left: 1.5rem;
        }
        .content-section ul ul {
          list-style-type: circle;
          margin-left: 1.5rem;
        }
        .content-section strong {
          font-weight: 600;
        }
        .sticky-nav {
          position: -webkit-sticky;
          position: sticky;
          top: 1rem;
          align-self: flex-start;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .nav-link.active {
          background-color: #e0e7ff;
          color: #3730a3;
          font-weight: 600;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-indigo-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Navigating Option Trading Strategies</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar (Sticky) */}
        <aside className="lg:w-1/4 xl:w-1/5 mb-8 lg:mb-0">
          <nav className="sticky-nav bg-white p-4 rounded-lg shadow max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">Contents</h3>
            <ul className="space-y-2">
              <li><a href="#introduction" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Introduction</a></li>
              <li><a href="#strategy-groupings" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Strategy Groupings</a>
                <ul className="ml-4 mt-1 space-y-1">
                  <li><a href="#directional-strategies" className="nav-link block text-sm hover:text-indigo-600 hover:bg-indigo-50 p-1 rounded-md transition-colors duration-150">Directional</a></li>
                  <li><a href="#neutral-strategies" className="nav-link block text-sm hover:text-indigo-600 hover:bg-indigo-50 p-1 rounded-md transition-colors duration-150">Neutral</a></li>
                  <li><a href="#limited-risk-large-profit" className="nav-link block text-sm hover:text-indigo-600 hover:bg-indigo-50 p-1 rounded-md transition-colors duration-150">Limited Risk/Large Profit</a></li>
                  <li><a href="#conservative-strategies" className="nav-link block text-sm hover:text-indigo-600 hover:bg-indigo-50 p-1 rounded-md transition-colors duration-150">Conservative</a></li>
                </ul>
              </li>
              <li><a href="#outright-option-purchases" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Outright Option Purchases</a></li>
              <li><a href="#option-writing-covered" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Option Writing / Covered</a></li>
              <li><a href="#spreads" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Spreads</a></li>
              <li><a href="#combination-strategies" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Combination Strategies</a></li>
              <li><a href="#advanced-limited-risk-large-profit" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Adv. Limited Risk/Large Profit</a></li>
              <li><a href="#volatility-trading" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Volatility Trading</a></li>
              <li><a href="#index-futures-strategies" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Index & Futures Strategies</a></li>
              <li><a href="#structured-products" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Structured Products</a></li>
              <li><a href="#arbitrage" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">Arbitrage</a></li>
              <li><a href="#general-management" className="nav-link block hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors duration-150">General Strategy Management</a></li>
            </ul>
          </nav>
        </aside>

        {/* Content Sections */}
        <main className="lg:w-3/4 xl:w-4/5">
          <section id="introduction" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Introduction: Choosing Your Path</h2>
            <p className="mb-3">Based on the sources, there is <strong>no single "best" strategy</strong>. The most feasible strategies for an individual depend on their <strong>knowledge</strong> and <strong>suitability</strong>, incorporating their own <strong>risk/reward attitude</strong> and <strong>financial condition</strong>. An investor must understand the strategy and their own attitude toward risk and reward. It is not proper to use a strategy if its risks violate the investor's financial objectives or accepted methodology.</p>
          </section>

          <section id="strategy-groupings" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Strategy Groupings</h2>
            <p className="mb-4">Strategies can generally be grouped based on the strategist's market attitude or approach:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div id="directional-strategies" className="bg-indigo-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Directional Strategies</h3>
                <p>Geared towards capitalizing on an outlook for a specific stock or the general market (bullish or bearish). These tend to be more aggressive.</p>
              </div>
              <div id="neutral-strategies" className="bg-green-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-green-700 mb-2">Neutral Strategies</h3>
                <p>Not focused on picking market direction, but rather based on option value, often related to volatility trading. These perform well if the market net change is small over time.</p>
              </div>
              <div id="limited-risk-large-profit" className="bg-amber-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-amber-700 mb-2">Limited Risk / Large Profit Strategies</h3>
                <p>Have limited risk with the potential for large profits, even if the probability of large profit is low. A few large profits can potentially make up for numerous small losses.</p>
              </div>
              <div id="conservative-strategies" className="bg-sky-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-sky-700 mb-2">Conservative Strategies</h3>
                <p>Emphasize making a reasonable but limited return coupled with decreased risk exposure.</p>
              </div>
            </div>
          </section>

          <section id="outright-option-purchases" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Outright Option Purchases (Basic Directional)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Call Buying</h3>
                <p className="mb-2">Involves purchasing a call option.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul className="mb-2">
                  <li>When you are <strong>bullish</strong>.</li>
                  <li>To take advantage of <strong>diversification</strong> (with index options).</li>
                  <li>For <strong>leverage</strong> and <strong>limited dollar risk</strong>. Many feel it is easier to predict general market direction than individual stocks, making index options attractive.</li>
                  <li>For <strong>shorter-term strategies</strong>, options with a <strong>higher delta</strong> should be used.</li>
                  <li>For <strong>very long-term strategies</strong>, consider slightly <strong>out-of-the-money</strong> or <strong>long-term at-the-money</strong> options, or <strong>LEAPS</strong>.</li>
                  <li>For <strong>aggressive purchases</strong>, consider <strong>short-term out-of-the-money</strong> calls.</li>
                  <li>For <strong>conservative purchases</strong>, consider <strong>longer-term in-the-money</strong> calls.</li>
                  <li>Consider buying calls when <strong>options are cheap and the market is expected to be volatile</strong> (as part of straddle/strangle buys).</li>
                  <li>You should <strong>not write against an underlying stock if you are bearish</strong> on it.</li>
                </ul>
                <p className="mb-1"><strong>Follow-up actions after an unrealized profit on a long call:</strong></p>
                <ul>
                  <li>&quot;Do nothing&quot; (continue holding).</li>
                  <li>&quot;Liquidate&quot; (sell the call).</li>
                  <li>&quot;Roll up&quot; (sell the call, pocket initial investment, buy more out-of-the-money calls).</li>
                  <li>&quot;Spread&quot; (create a bull spread by selling an out-of-the-money call against the profitable call, preferably taking in at least the original cost). While each tactic can be best in certain scenarios, the <strong>spread tactic is never the worst one</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Put Buying</h3>
                <p className="mb-2">Involves purchasing a put option.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul className="mb-2">
                  <li>When you are <strong>bearish</strong>. It represents a <strong>more attractive way to take advantage of a bearish attitude</strong> with options.</li>
                  <li>Buying a put is <strong>equivalent</strong> in profit potential to a <strong>&quot;protected short sale&quot;</strong> (shorting stock and buying a call).</li>
                  <li>Consider buying puts when <strong>options are cheap and the market is expected to be volatile</strong> (as part of straddle/strangle buys).</li>
                </ul>
                <p className="mb-1"><strong>Follow-up actions after an unrealized gain on a long put:</strong> (Very similar to call buying tactics)</p>
                <ul>
                  <li>&quot;Liquidate&quot; (sell the put).</li>
                  <li>&quot;Do nothing&quot; (continue holding).</li>
                  <li>&quot;Roll down&quot; (sell the put, pocket initial investment, buy out-of-the-money puts at a lower strike).</li>
                  <li>&quot;Spread&quot; (create a spread by selling an out-of-the-money put against the held put).</li>
                  <li>&quot;Combine&quot; (buy a call at a lower strike while holding the put). Each tactic can be best under different circumstances, but the <strong>spread tactic is never the worst</strong>.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="option-writing-covered" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Option Writing / Covered Positions (Often Conservative or Income Focused)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Covered Call Writing</h3>
                <p className="mb-2">Involves selling a call option against shares of the underlying stock that you own.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is one of the most <strong>widely used option strategies by the investing public</strong>.</li>
                  <li>Suitable for those <strong>willing to accept little or no risk other than that of owning stock</strong>.</li>
                  <li>It is generally a <strong>relatively conservative position</strong>.</li>
                  <li>The writer should be <strong>slightly bullish, or at least neutral, on the underlying stock</strong>.</li>
                  <li>One goal is to look for <strong>minimum returns</strong> (e.g., 1% per month if unchanged) with sufficient <strong>downside protection</strong> (e.g., at least 10%).</li>
                  <li>You can choose to write <strong>in-the-money calls</strong> for more downside cushion or <strong>out-of-the-money calls</strong> for higher returns if exercised. A combination can balance return and protection.</li>
                  <li>Candidates can be ranked by annualized return (with minimum downside protection) or percentage downside protection (with minimum acceptable return).</li>
                  <li>The mathematical expectation of covered call writing ranks behind ratio strategies and limited risk/large profit strategies.</li>
                  <li>A strategist using the <strong>incremental return concept</strong> with a higher target price for selling stock may find <strong>LEAPS call writing</strong> attractive for larger premiums.</li>
                  <li>Covered write products are also a type of listed structured product.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Collar</h3>
                <p className="mb-2">Involves the purchase of a put and simultaneous sale of a call against an underlying instrument (implicitly, stock owned).</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is a strategy that receives expanded treatment. (The source mentions it but does not explicitly state specific conditions for its use beyond its structure).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Ratio Writing (against stock)</h3>
                <p className="mb-2">Involves selling options (typically calls) in a ratio against owned stock, often selling more calls than stock shares or in a higher ratio against the shares.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is a <strong>more sophisticated</strong> call strategy.</li>
                  <li>It involves <strong>selling naked options, meaning there is potentially large risk</strong>.</li>
                  <li>Ratio writing has <strong>high mathematical expectations</strong> due to taking in large time value premium.</li>
                  <li>To be mathematically optimum, it should be operated according to a <strong>delta-neutral ratio</strong>.</li>
                  <li>However, it is <strong>not for everyone</strong> and requires a <strong>substantial amount of money (or collateral)</strong>.</li>
                  <li>It is a neutral strategy that should perform well if the market net change is small.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Naked Option Writing</h3>
                <p className="mb-2">Involves selling options without owning the underlying security or having a hedging position.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>This strategy involves <strong>potentially large risk, either upside, downside, or both</strong>.</li>
                  <li>It is generally <strong>not recommended</strong> because options are wrong (skewed) when there is skewing at all strikes, and there is a <strong>greater than normal chance of a large move by the underlying, especially stock</strong>.</li>
                  <li>It <strong>requires expertise</strong> and a <strong>substantial amount of money (or collateral)</strong>.</li>
                  <li>Generally, <strong>high-risk naked option writing (selling for fractional prices) is to be avoided by most investors</strong>.</li>
                  <li><strong>Naked Call Writing</strong> (when rolling for credits follow-up is used) has <strong>high mathematical expectation</strong>.</li>
                  <li>The premium dollars from selling uncovered options can be used to buy fixed-income securities.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Covered or Ratio Put Writing</h3>
                <p className="mb-2">Involves writing put options against owned stock (Covered Put Writing, implicitly) or in a ratio (Ratio Put Writing, implicitly).</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>These strategies are generally <strong>to be avoided by most investors</strong>.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="spreads" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Spreads (Combining Multiple Options)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">General Spread Concepts</h3>
                <ul className="mb-2">
                  <li>Spreads involve buying and selling options simultaneously.</li>
                  <li>They can be structured as <strong>credit spreads</strong> (cash inflow) or <strong>debit spreads</strong> (cash outflow).</li>
                  <li>Placing an order as a <strong>spread order</strong> can facilitate <strong>better price execution</strong>.</li>
                  <li>They can combine basic types like bull, bear, and calendar spreads.</li>
                  <li>Put spread strategies employ similar tactics to call spread strategies, although there are technical differences.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Bull Spreads</h3>
                <p className="mb-2">Involves buying a call at one strike and selling a call at a higher strike, or buying a put at a lower strike and selling a put at a higher strike.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>When you are <strong>bullish</strong>.</li>
                  <li>They are one of the simpler types of spreads.</li>
                  <li>They have <strong>limited downside risk and limited upside profit potential</strong>.</li>
                  <li>A bull spread can sometimes be constructed to have <strong>little or no risk</strong> by selling a call against a currently profitable long call.</li>
                  <li>The profit graph has the same shape as a covered write protected by a put purchase, making them equivalent in profit and loss potential.</li>
                  <li>Bull spreads can be considered a <strong>&quot;substitute&quot; for covered writing</strong> by investing a small portion in the spread and the rest in fixed-income.</li>
                  <li>They can be ranked by <strong>reward/risk ratio</strong> or <strong>return if unchanged</strong>.</li>
                  <li>Ranking should <strong>not solely rely on maximum potential profits</strong> at expiration, especially for deeply out-of-the-money spreads.</li>
                  <li>For a <strong>conservative purchase</strong>, consider <strong>in-the-money</strong> (large debit) bull spreads.</li>
                  <li>A <strong>call bull spread</strong> can be used to benefit from a <strong>forward (positive) volatility skew</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Bear Spreads</h3>
                <p className="mb-2">Involves selling a call at one strike and buying a call at a higher strike (implicitly, bear call spread), or selling a put at one strike and buying a put at a lower strike (implicitly, bear put spread).</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>When you are <strong>bearish</strong>.</li>
                  <li>They are one of the simpler types of spreads.</li>
                  <li>For a <strong>conservative purchase</strong>, consider <strong>in-the-money</strong> (large debit) bear spreads.</li>
                  <li>A <strong>bear put spread</strong> can be used for a market with a <strong>reverse (negative) volatility skew</strong> (OEX example).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Calendar Spreads</h3>
                <p className="mb-2">Typically involves selling a near-term option and buying a longer-term option with the same striking price.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>They are one of the simpler types of spreads.</li>
                  <li>A <strong>neutral calendar spread</strong> is established when the stock is relatively close to the striking price.</li>
                  <li>The object is to <strong>capture the time decay differential</strong> between the two options.</li>
                  <li>They are normally closed when the near-term option expires.</li>
                  <li>Pricing models can aid in determining the profit potential and break-even points.</li>
                  <li>Spreads can be ranked by their <strong>return if unchanged</strong>.</li>
                  <li>Calendar spreads with <strong>futures options</strong> are <strong>less popular and more complicated</strong> than stock or index counterparts but may offer <strong>pricing inefficiencies</strong>.</li>
                  <li>They are a <strong>neutral strategy</strong> that should perform well if the market net change is small.</li>
                  <li>A <strong>bullish or bearish calendar spread</strong> only assumes its directional bias after the near-term option expires.</li>
                  <li>Mathematically, they rank behind ratio strategies and limited risk/large profit strategies.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Ratio Spreads (Call or Put)</h3>
                <p className="mb-2">Involves buying and selling options on the same underlying, typically with the same expiration or different expirations, but in a ratio other than 1:1.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>They are <strong>more sophisticated</strong> option strategies.</li>
                  <li>They often involve <strong>selling naked options, presenting potentially large risk</strong>.</li>
                  <li>Differing philosophies: one simulates ratio writing by buying an in-the-money call (potentially large debit), another focuses on establishing the spread for a <strong>credit</strong> (no downside loss), and the <strong>&quot;Delta Spread&quot;</strong> aims for <strong>initial neutrality using option deltas</strong>.</li>
                  <li>They have <strong>high mathematical expectations</strong>, particularly when operated as a <strong>delta-neutral ratio spread</strong>.</li>
                  <li>They require <strong>substantial capital/collateral</strong> and are <strong>not for everyone</strong> due to the naked option component.</li>
                  <li>They are a <strong>neutral strategy</strong> that should perform well if the market net change is small.</li>
                  <li>They can be used when identifying situations with <strong>discrepancies in implied volatilities</strong>.</li>
                  <li>For a market with a <strong>reverse (negative) volatility skew</strong>, strategies include <strong>ratio write of puts</strong> (buy puts/sell more OTM puts) or <strong>backspread of calls</strong> (sell calls/buy more OTM calls).</li>
                  <li>For a market with a <strong>forward (positive) volatility skew</strong>, a <strong>call ratio spread</strong> can be used.</li>
                  <li>A <strong>ratio spread strategy</strong> is generally used if the <strong>current level of implied volatility is in a high percentile</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Butterfly Spread</h3>
                <p className="mb-2">A neutral position involving three striking prices, utilizing a bull spread between the lower two strikes and a bear spread between the higher two strikes.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is a <strong>neutral position</strong>.</li>
                  <li>It has <strong>limited risk as well as limited profits</strong>.</li>
                  <li>Maximum profit is realized at the middle strike at expiration.</li>
                  <li>It is a neutral strategy that should perform well if the market net change is small.</li>
                  <li>Mathematically, it ranks behind ratio strategies and limited risk/large profit strategies.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Diagonal Spreads</h3>
                <p className="mb-2">Combine options with different striking prices and different expiration dates.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>They are <strong>more advanced</strong> strategies.</li>
                  <li>Diagonalizing a spread can often be <strong>very attractive</strong>.</li>
                  <li>Similar to calendar strategies, their aim is to generate profits on the sale of shorter-term options to <strong>offset the cost of longer-term options</strong>.</li>
                  <li>A <strong>diagonal credit spread</strong> can sometimes allow the strategist to <strong>own a call free</strong>.</li>
                  <li>They rank high on an expected profit basis.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="combination-strategies" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Combination Strategies</h2>
            <p className="mb-4">Often combine features of spreads, straddles, and different expirations.</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Spreads Combining Puts and Calls</h3>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>These can offer <strong>potentially large profits</strong>.</li>
                  <li>Three specific complex strategies are designed to <strong>limit risk while allowing for large potential profits</strong> if correct market conditions develop.</li>
                  <li>They are combinations of calendar spreads and/or straddles involving varying expiration dates.</li>
                  <li>Although complex, they can provide attractive risk/reward opportunities and are not strictly for professionals.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Calendar Combination</h3>
                <p className="mb-2">One of three complex strategies combining calendar spreads on puts and calls. Involves selling a near-term combination (put and call) and simultaneously buying a longer-term combination (implicitly, with the same strikes).</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is a <strong>reasonable strategy</strong> if operated over a period encompassing several market cycles.</li>
                  <li>Selection criteria include: stock nearly <strong>halfway between two striking prices</strong> (at least 10 points apart), <strong>relatively volatile</strong> underlying, optimum time <strong>2-3 months before near-term expiry</strong>, and sum of near-term prices at least one-half the cost of longer-term.</li>
                  <li>It offers the <strong>largest probability of capturing the entire near-term premium</strong> because both near-term options are initially out-of-the-money.</li>
                  <li>It has <strong>limited risk</strong> and <strong>large potential profits</strong>.</li>
                  <li>It is <strong>not to be attempted by a novice investor</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Calendar Straddle</h3>
                <p className="mb-2">Another strategy combining calendar spreads on both puts and call options by selling a near-term straddle and simultaneously purchasing a longer-term straddle.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>Profits are sought from the fact that the <strong>time value premium of the near-term straddle decreases more rapidly</strong> than the longer-term one.</li>
                  <li>It is a <strong>neutral strategy</strong>, established with the stock near the striking price.</li>
                  <li>It is generally <strong>best to close it out at near-term expiration</strong> if the stock is near the striking price, as a profit will generally result.</li>
                  <li>It offers the <strong>largest potential profits at near-term expiration</strong> if the stock is relatively unchanged.</li>
                  <li>It has <strong>limited risk</strong> and <strong>large potential profits</strong>.</li>
                  <li>It is <strong>not to be attempted by a novice investor</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Diagonal Butterfly Spread</h3>
                <p className="mb-2">A strategy involving both put and call options that uses differing expiration dates and strikes, which can give the opportunity to own a &quot;free&quot; combination. It is a combination of a diagonal bearish call spread and a diagonal bullish put spread.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is designed to <strong>limit risk while allowing for large potential profits</strong>.</li>
                  <li>It offers the <strong>possibility of owning free options</strong> (if near-term profits equal or exceed the cost of long-term options).</li>
                  <li>The risk is limited and occurs prior to the expiration of the near-term options.</li>
                  <li>It is an <strong>attractive strategy</strong> that should produce large profits over a period of market cycles.</li>
                  <li>It is <strong>not to be attempted by a novice investor</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Straddles and Combinations (General)</h3>
                <p className="mb-2">Strategies that involve the use of both puts and calls together.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>They can present <strong>reasonably high levels of profit potential</strong>.</li>
                  <li>They allow attractive positions established with either puts or calls to be combined into one.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Straddle Writing</h3>
                <p className="mb-2">Involves selling both a put and a call with the same striking price and expiration date.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is a <strong>neutral strategy</strong>.</li>
                  <li>It involves <strong>selling naked options, which means potentially large risk</strong>.</li>
                  <li>Straddle writing has <strong>high mathematical expectations</strong> due to taking in large time value premium.</li>
                  <li>It requires a <strong>substantial amount of money (or collateral)</strong> and is <strong>not for everyone</strong> due to the naked option component.</li>
                  <li>Premium dollars received can be used to buy fixed-income securities.</li>
                  <li>Technical analysis can help, ideally seeking support at or above the lower break-even and resistance at or below the upper break-even.</li>
                  <li>It is a neutral strategy that should perform well if the market net change is small.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Strangle Writing</h3>
                <p className="mb-2">Involves selling both a put and a call with the same expiration date but different striking prices (typically out-of-the-money).</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>It is a <strong>neutral strategy</strong>.</li>
                  <li>It involves <strong>selling naked options</strong> and thus <strong>potentially large risk</strong>.</li>
                  <li>It has <strong>high mathematical expectations</strong> due to taking in large time value premium.</li>
                  <li>It requires a <strong>substantial amount of money (or collateral)</strong> and is <strong>not for everyone</strong> due to the naked option component.</li>
                  <li>Premium dollars received can be used to buy fixed-income securities.</li>
                  <li>It is a neutral strategy that should perform well if the market net change is small.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="advanced-limited-risk-large-profit" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Limited Risk / Large Profit Strategies (Advanced)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Treasury Bill/Option Strategy</h3>
                <p className="mb-2">Involves putting a large portion of money (e.g., 90%) in risk-free investments like short-term Treasury bills and buying options with the remaining portion (e.g., 10%).</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>This strategy consists of <strong>small levels of risk with the potential for large profits</strong>.</li>
                  <li>It typically has a high frequency of small losses but a small probability of large gains, where a few large profits can outweigh the small losses.</li>
                  <li>It is considered <strong>superior to convertible bonds</strong> or synthetic convertible bonds as the largest portion of investment has no price fluctuation risk.</li>
                  <li>It is fairly easy to operate, though it requires work when buying new options and periodic adjustments to manage risk levels.</li>
                  <li>It ranks high on an expected profit basis.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Backspreads</h3>
                <p className="mb-2">Generally involve selling fewer options than are bought, potentially structured as buying out-of-the-money puts and selling at-the-money puts, or buying at-the-money calls and selling out-of-the-money calls, usually with a ratio.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>They offer the opportunity to <strong>benefit from spreading mispriced options</strong>.</li>
                  <li>Choosing between a put backspread and a call ratio spread (both involving mispriced futures options) may be helped by examining the technical picture of the futures contract.</li>
                  <li>A <strong>backspread strategy</strong> is generally used if <strong>implied volatility is currently in a low percentile</strong>.</li>
                  <li>A <strong>put backspread</strong> can be used to benefit from a <strong>forward (positive) volatility skew</strong>.</li>
                  <li>They rank high on an expected profit basis.</li>
                  <li>Considered if <strong>options are cheap and the market is expected to be volatile</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Reverse Hedges and Spreads</h3>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>Considered if <strong>options are cheap and the market is expected to be volatile</strong>. (The sources describe the structure and potential outcomes but do not provide specific conditions for when to initiate these strategies beyond this general category).</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="volatility-trading" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Volatility Trading Strategies</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Volatility Trading (General)</h3>
                <p className="mb-2">An approach based on the value of the option itself, distinct from picking market direction.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>When implied volatility is perceived as being &quot;out of line&quot;.</li>
                  <li>Strategies used when the market net change is small over time include ratio writing/spreading, straddle/strangle writing, neutral calendar spreading, and butterfly spreads.</li>
                  <li>Strategies used when options are cheap and the market is expected to be volatile include straddle/strangle buys, backspreads, and reverse hedges/spreads.</li>
                  <li>Determining when volatility is out of line can involve comparing implied volatility to its past levels (percentile), historical volatility, or interpreting volatility charts.</li>
                  <li>Using a probability calculator to assess success chances is also necessary.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Strategies for Trading Volatility Prediction</h3>
                <p className="mb-2">Involves trading based on the absolute level of implied volatility being perceived as &quot;wrong&quot;.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>When implied volatility is sufficiently <strong>out of line</strong> that it warrants a trade.</li>
                  <li>A <strong>simple approach is often best, especially when buying volatility</strong>.</li>
                  <li>Use a selection criterion (e.g., extreme implied volatility percentile, large discrepancy between implied and historical volatility, chart interpretation showing trend reversal).</li>
                  <li>Then, use a probability calculator to estimate expected success. You can also consider past price histories.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Strategies for Trading Volatility Skew</h3>
                <p className="mb-2">Involves trading based on the fact that implied volatilities for different options on the same underlying have substantially different values.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>Opportunities arise for the neutral strategist <strong>whenever volatility skewing exists</strong>.</li>
                  <li>Establish a <strong>neutral spread</strong> by buying options with <strong>lower implied volatilities</strong> and simultaneously selling ones with <strong>higher implied volatilities</strong>.</li>
                  <li>The difference in implied volatilities should be significantly large.</li>
                  <li>For a market with a <strong>reverse (negative) volatility skew</strong> (like the OEX), strategies include buying a <strong>bear put spread</strong>, using a <strong>ratio write of put options</strong> (buy puts/sell more OTM puts), or using a <strong>backspread of call options</strong> (sell calls/buy more OTM calls).</li>
                  <li>For a market with a <strong>forward (positive) volatility skew</strong>, strategies include a <strong>call bull spread</strong>, a <strong>put backspread</strong>, and a <strong>call ratio spread</strong>.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="index-futures-strategies" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Index & Futures Strategies (Specialized Applications)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Stock Index Hedging Strategies</h3>
                <p className="mb-2">Involves using futures or options to hedge the risk of an equity portfolio.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>These strategies are often <strong>preferable to merely buying or selling stock</strong>.</li>
                  <li>They are used by owners of stock portfolios (individuals or institutions).</li>
                  <li>Techniques include <strong>hedging an actual or simulated index</strong>, <strong>trading the tracking error</strong>, selling the <strong>futures instead of the entire portfolio when one turns bearish</strong>, or <strong>buying the futures when they are cheap instead of buying stocks</strong>.</li>
                  <li>These hedges require monitoring and potential adjustments.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Index Spreads</h3>
                <p className="mb-2">Involves trading the price relationship between two different indices, such as inter-index or intra-index spreads.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>When you observe the <strong>relationship between two popular indices changing</strong>.</li>
                  <li>Options can be used to advantage, such as using synthetic options, in-the-money options, or leveraging with delta.</li>
                  <li>This area offers <strong>profit opportunities recognized by fewer people</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Futures Option Trading Strategies</h3>
                <p className="mb-2">Strategies involving options on futures contracts.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>Many strategies are <strong>not significantly different</strong> from stock or index option strategies. However, <strong>unique strategies exist</strong>.</li>
                  <li>Calendar spreading with futures options is less popular than with stock options but may offer <strong>pricing inefficiencies</strong>.</li>
                  <li>Intermarket spreads are a type of futures option strategy.</li>
                  <li>SPAN margin is beneficial for reduced requirements.</li>
                  <li>One can monitor exposure using deltas and adjust the position.</li>
                  <li>Backspreads and ratio spreads can be used with futures options.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="structured-products" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Structured Products</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Protected Stock or Index Products</h3>
                <p className="mb-2">Listed structured products designed to provide upside market potential while limiting downside risk. Similar to a synthetic long call.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>They can be useful <strong>longer-term investments</strong>, provided the underwriter's creditworthiness is good.</li>
                  <li>Listed options can be used with these products for <strong>adjustment strategies</strong>.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Covered Write Products</h3>
                <p className="mb-2">Listed structured products mentioned as a type. (The sources list them but do not provide specific details on their use cases).</p>
              </div>
            </div>
          </section>

          <section id="arbitrage" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">Arbitrage</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">Various Arbitrage Techniques</h3>
                <p className="mb-2">Includes Basic Put and Call Arbitrage (&quot;Discounting&quot;), Dividend Arbitrage, Conversions and Reversals, and More on Carrying Costs. Index Arbitrage and Riskless Arbitrage are also discussed.</p>
                <p className="mb-1"><strong>When to consider:</strong></p>
                <ul>
                  <li>These involve capitalizing on <strong>mispricing</strong>.</li>
                  <li><strong>Index arbitrage</strong> can be used when futures on an index are mispriced relative to their fair value.</li>
                  <li><strong>Discounting</strong> with cash-based options is often done near the close of the day to reduce underlying index price risk.</li>
                  <li>These techniques are generally <strong>primarily member firm, not public customer, strategies</strong>.</li>
                  <li><strong>Facilitation</strong> (Institutional Block Positioning) is also primarily for member firms.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="general-management" className="content-section bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-4 border-b pb-2">General Considerations for Strategy Selection & Management</h2>
            <ul className="space-y-4">
              <li>
                <strong>Understanding Risk:</strong> Every strategy has risk. It is crucial to understand the potential effects of early assignments, large dividend payments, striking price adjustments, and the like, especially for advanced strategies. Evaluating a position using <strong>risk measures</strong> (Greeks like delta, gamma, theta, vega) can help predict future performance.
                <ul className="mt-2">
                  <li>Delta measures exposure to stock price changes.</li>
                  <li>Gamma measures the rate of change of delta.</li>
                  <li>Theta measures the effect of time decay.</li>
                  <li>Vega measures exposure to volatility changes.</li>
                </ul>
              </li>
              <li>
                <strong>Follow-Up Action:</strong> Having a plan for follow-up action if the underlying moves is imperative for more rational decisions. This can involve adjusting positions (e.g., adjusting delta to remain neutral, closing out a spread before hitting a break-even point, taking defensive action in a ratio write, managing risk in combination strategies).
              </li>
              <li>
                <strong>Mathematical Analysis:</strong> Mathematical techniques can aid in selecting new positions and understanding how existing ones will behave. Tools include pricing models, probability calculations, hedge ratios (delta), and expected return analysis.
              </li>
              <li>
                <strong>Commission Costs:</strong> Commission costs work against the strategist. Establishing strategies in quantity can help reduce the percentage effect of commissions.
              </li>
              <li>
                <strong>Tax Implications:</strong> While described, <strong>tax strategies should not be confused with profit-oriented strategies</strong>. Tax consequences should never be considered more important than sound strategy management. A tax advisor should be consulted.
              </li>
            </ul>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 p-6 text-center">
        <p>&copy; <span>{new Date().getFullYear()}</span> Options Strategy Navigator. All information is for educational purposes only.</p>
      </footer>
    </div>
  );
} 