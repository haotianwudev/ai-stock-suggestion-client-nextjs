'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  TrendingUp, 
  Shield, 
  PlayCircle, 
  ChevronsRight, 
  X, 
  Landmark, 
  DollarSign, 
  Lightbulb, 
  Wrench,
  ArrowLeft 
} from 'lucide-react';

// Main App Component
export default function WritingNakedPutsGuide() {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (pageName: string) => {
    setPage(pageName);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'strategy', label: 'The Strategy', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'risk', label: 'Risk & Management', icon: <Shield className="w-5 h-5" /> },
    { id: 'gettingStarted', label: 'Getting Started', icon: <PlayCircle className="w-5 h-5" /> },
  ];

  const Sidebar = () => (
    <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-800 text-white transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:top-0 md:h-screen md:w-64`}>
      <div className="p-6 flex justify-between items-center md:justify-center">
        <h1 className="text-2xl font-bold text-emerald-400">Naked Puts 101</h1>
        <button onClick={() => setIsMenuOpen(false)} className="md:hidden text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center py-3 px-6 text-left transition-colors duration-200 ${page === item.id ? 'bg-emerald-500/20 text-emerald-300 border-l-4 border-emerald-400' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                {item.icon}
                <span className="ml-4">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-700/50 rounded-lg">
        <p className="text-xs text-gray-400">Based on "Writing Naked Puts" by Mark D. Wolfinger.</p>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Return to Home Button */}
      <div className="p-4 bg-gray-800/80 backdrop-blur-sm">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      <div className="bg-gray-900 text-gray-100 font-sans flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="md:hidden p-4 bg-gray-800/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between">
            <h1 className="text-xl font-bold text-emerald-400">Naked Puts 101</h1>
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <ChevronsRight className="w-6 h-6" />
            </button>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-10 pt-8">
            <PageContent page={page} navigateTo={navigateTo} />
          </main>
        </div>
      </div>
    </div>
  );
}

// Content for different pages
const PageContent = ({ page, navigateTo }: { page: string, navigateTo: (page: string) => void }) => {
  switch (page) {
    case 'home':
      return <HomePage navigateTo={navigateTo} />;
    case 'strategy':
      return <StrategyPage />;
    case 'risk':
      return <RiskPage />;
    case 'gettingStarted':
      return <GettingStartedPage />;
    default:
      return <HomePage navigateTo={navigateTo} />;
  }
};

// Reusable Card Component
const InfoCard = ({ icon, title, children, className = '' }: { 
  icon: React.ReactNode, 
  title: string, 
  children: React.ReactNode, 
  className?: string 
}) => (
  <div className={`bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 ${className}`}>
    <div className="flex items-center mb-4">
      <div className="p-2 bg-emerald-500/10 rounded-full mr-4 text-emerald-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="text-gray-300 space-y-3">{children}</div>
  </div>
);

// Home Page
const HomePage = ({ navigateTo }: { navigateTo: (page: string) => void }) => (
  <div className="animate-fade-in">
    <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Master the Art of Writing Naked Puts</h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
        Discover a conservative, profitable, and intelligent way to invest. This guide, based on Mark D. Wolfinger's "Writing Naked Puts," demystifies a powerful options strategy.
      </p>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => navigateTo('strategy')}
          className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Explore the Strategy
        </button>
        <button
          onClick={() => navigateTo('risk')}
          className="bg-transparent border-2 border-emerald-500 text-emerald-400 font-bold py-3 px-8 rounded-full hover:bg-emerald-500/10 transition-colors"
        >
          Understand Risks
        </button>
      </div>
    </div>

    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <InfoCard icon={<TrendingUp />} title="A Bullish Strategy">
        <p>Writing naked puts is a bullish strategy, but less risky than owning stocks outright. Profit if the stock rises, stays flat, or even drops slightly.</p>
      </InfoCard>
      <InfoCard icon={<BookOpen />} title="Two Primary Goals">
        <p>Either earn income by collecting the option premium, or acquire stock you want to own at a discount to its current price. A win-win for the strategic investor.</p>
      </InfoCard>
      <InfoCard icon={<Shield />} title="Calculated Risk">
        <p>Often mislabeled as "very risky," this strategy is actually a conservative tool when managed properly. The real danger isn't the option, it's the risk-insensitive trader.</p>
      </InfoCard>
    </div>
     <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">About the Book</h3>
          <p className="text-gray-300 mb-4">This website is a summary of <span className="font-semibold text-white">"Writing Naked Puts"</span> by Mark D. Wolfinger. It's Volume 1 in "The Best Option Strategies" series, aimed at investors who understand basic options and want to add a powerful, profitable strategy to their arsenal.</p>
          <p className="text-sm text-gray-400">Disclaimer: All investment strategies, including writing naked puts, involve risk of loss. This content is for educational purposes and is not financial advice.</p>
        </div>
  </div>
);

// Strategy Page
const StrategyPage = () => (
  <div className="animate-fade-in space-y-8">
    <h2 className="text-4xl font-bold text-emerald-400 border-b-2 border-emerald-500/30 pb-4">The Strategy: Earning & Acquiring</h2>
    
    <InfoCard icon={<TrendingUp />} title="Strategy Objective">
        <p><strong className="text-white">Writing puts is a bullish strategy with two desired outcomes, both considered a "win":</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Earn Trading Profit:</strong> Sell a put option, collect the premium, and hope it expires worthless. The premium is your profit. This is ideal in neutral to mildly bullish markets.</li>
            <li><strong>Buy Stock at a Discount:</strong> Sell a put with a strike price at which you're happy to own a stock. If the stock price drops below the strike, you're "assigned" and buy the shares at your predetermined price, effectively at a discount (strike price - premium received).</li>
        </ul>
        <p className="mt-4 italic text-gray-400">The premium cash is yours to keep upfront, regardless of the outcome.</p>
    </InfoCard>
    
    <InfoCard icon={<ChevronsRight />} title="Key Decisions">
        <p><strong className="text-white">Success depends on making intelligent choices:</strong></p>
        <ul className="list-disc pl-6 mt-2 space-y-3">
            <li><strong>Underlying Stock:</strong> Choose a stock you genuinely want to own. You must believe its price will not fall below your chosen strike price before expiration.</li>
            <li><strong>Strike Price:</strong> This is a trade-off.
                <ul className="list-circle pl-6 mt-1 text-sm">
                    <li><span className="font-semibold text-red-400">Farther Out-of-the-Money (OTM):</span> Lower premium, but lower risk of assignment. Higher probability of profit.</li>
                    <li><span className="font-semibold text-green-400">Closer to the Money:</span> Higher premium, but higher risk of assignment.</li>
                </ul>
            </li>
            <li><strong>Expiration Date:</strong>
                 <ul className="list-circle pl-6 mt-1 text-sm">
                    <li><span className="font-semibold text-red-400">Shorter Term (e.g., 30-45 days):</span> Lower premium, but higher annualized return due to faster time decay (theta). More sensitive to stock price moves (gamma).</li>
                    <li><span className="font-semibold text-green-400">Longer Term:</span> Higher premium (more protection), lower annualized return, less sensitive to price moves.</li>
                </ul>
            </li>
        </ul>
    </InfoCard>
    
    <div className="bg-gray-800 p-6 rounded-lg text-center">
        <h4 className="text-xl font-semibold text-white">Synthetic Equivalence</h4>
        <p className="text-gray-300 mt-2">Did you know? Writing a <strong className="text-emerald-400">Naked Put</strong> has the exact same risk/reward profile as writing a <strong className="text-emerald-400">Covered Call</strong>. This is a fundamental concept in options trading.</p>
    </div>
  </div>
);

// Risk Management Page
const RiskPage = () => (
    <div className="animate-fade-in space-y-8">
        <h2 className="text-4xl font-bold text-red-400 border-b-2 border-red-500/30 pb-4">Risk & Management</h2>

        <InfoCard icon={<Shield />} title="Primary Risk: Declining Stock Price" className="border-red-500/50">
            <p>The main risk is that the underlying stock price falls significantly, just like owning the stock. If the stock drops far below your strike price, you'll be obligated to buy shares that are worth much less than you're paying.</p>
            <p className="mt-2"><strong className="text-white">Protection:</strong> The premium you collect provides a buffer. The stock has to fall below (Strike Price - Premium) before you have an unrealized loss.</p>
        </InfoCard>

        <InfoCard icon={<Wrench />} title="Repair Strategies: When a Trade Goes Wrong" className="border-yellow-500/50">
            <p><strong className="text-white">When a stock moves against you, you have several choices. Don't just hold and hope.</strong></p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Do Nothing:</strong> A valid choice if you are still content to own the stock at your effective price, despite the unrealized loss.</li>
                <li><strong>Close the Position:</strong> Buy back the put to lock in a loss and prevent it from getting worse. This is a crucial part of money management.</li>
                <li><strong>Roll the Position:</strong> Simultaneously buy back your current put and sell a new one with a lower strike price and/or a later expiration date. This can reduce risk or give the trade more time to become profitable.</li>
            </ul>
            <div className="mt-4 p-4 bg-red-900/40 rounded-lg border-l-4 border-red-400 space-y-2">
                <p><strong className="text-red-300">CRUCIAL TIP:</strong> It is mandatory for your success to understand this: <strong className="text-white">Do not stubbornly refuse to take a loss.</strong> Never hold a losing position just because closing it would make the loss real. The loss has already occurred. Only adjust a position if the new trade is one you would happily make as an independent decision.</p>
            </div>
             <div className="mt-4 p-4 bg-yellow-900/40 rounded-lg border-l-4 border-yellow-400">
                <p><strong className="text-yellow-300">TIP ON ROLLING:</strong> Choose the new option that fits your comfort zone. If you don't know which new position you want to own, it is better to close the original trade, accept the loss, and move on.</p>
            </div>
        </InfoCard>

        <InfoCard icon={<DollarSign />} title="Trading Expenses" className="border-yellow-500/50">
            <p>Because this strategy involves frequent trading, <strong className="text-white">commissions matter</strong>. High costs can significantly erode your profits.</p>
            <div className="bg-gray-700/50 p-4 rounded-lg mt-4">
                 <p className="font-semibold text-white mb-2">Example: The Impact of Costs</p>
                 <p>If you sell one put for $0.55 (collecting $55), but your commission is $15 and a potential assignment fee is $20, your net profit shrinks to just $20.</p>
            </div>
            <p className="font-semibold text-white mt-4">Possible Solutions:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Find a less expensive broker. This is the best solution.</li>
                <li>Trade slightly more contracts (without exceeding your risk tolerance).</li>
                <li>Write options with higher premiums (e.g., $1.50 or more).</li>
            </ul>
             <p className="text-xs text-gray-400 mt-3">TIP: Some brokers, like Interactive Brokers, may not charge assignment fees. Do your homework.</p>
             <p className="text-sm text-gray-300 mt-3">Beyond cost, consider broker execution quality and the variety of strategies they allow. A cheap broker with poor fills can cost more in the long run.</p>
        </InfoCard>
        
        <InfoCard icon={<Landmark />} title="Margin Requirements" className="border-blue-500/50">
            <p>When you sell puts that are not cash-backed, you must use margin and post collateral. The initial margin requirement is calculated as follows:</p>
            <ul className="list-decimal pl-6 my-4 space-y-1 bg-gray-900/50 p-4 rounded-lg">
                <li><strong className="text-white">20% of the underlying stock's value</strong></li>
                <li><strong className="text-white">Plus the premium collected</strong></li>
                <li><strong className="text-white">Minus the amount the put is out-of-the-money</strong></li>
            </ul>
            <div className="bg-gray-700/50 p-4 rounded-lg mt-4">
                <p className="font-semibold text-white mb-2">Example Calculation:</p>
                <p>You sell <strong className="text-emerald-400">10 put contracts</strong> on a stock trading at <strong className="text-emerald-400">$28/share</strong>. The strike is <strong className="text-emerald-400">$25</strong> and the premium is <strong className="text-emerald-400">$1.00/share</strong>.</p>
                <ul className="list-none pl-0 mt-3 space-y-2 text-sm">
                  <li className="flex justify-between items-center"><span>1. 20% of Stock Value (1000 shares @ $28):</span> <span className="font-mono text-green-400">$5,600</span></li>
                  <li className="flex justify-between items-center"><span>2. Plus Premium Collected (10 contracts @ $100):</span> <span className="font-mono text-green-400">+ $1,000</span></li>
                  <li className="flex justify-between items-center"><span>3. Minus OTM Amount (($28-$25) * 1000):</span> <span className="font-mono text-red-400">- $3,000</span></li>
                  <li className="border-t border-gray-600 my-2"></li>
                  <li className="flex justify-between items-center font-bold text-base"><span>Total Margin Required:</span> <span className="font-mono text-white">$3,600</span></li>
                </ul>
            </div>
             <p className="text-xs text-gray-400 mt-3">TIP: Margin is often lower (e.g., 15%) when selling puts on broad-based indexes.</p>
        </InfoCard>

        <InfoCard icon={<ChevronsRight />} title="After Assignment: The Next Step" className="border-emerald-500/50">
             <p className="text-lg font-semibold text-white">What do you do after you've been assigned stock?</p>
             <p>If you are assigned shares because your put expired in-the-money, you don't have to just hold the stock and hope. There is a better strategy.</p>
             <div className="mt-4 p-4 bg-emerald-900/40 rounded-lg border-l-4 border-emerald-400">
                <p><strong className="text-emerald-300">TIP:</strong> Now that you own stock, you can move to the other side of the coin: <strong className="text-white">writing covered calls.</strong> You sell someone the right to buy your stock at a specific strike price, and you collect a premium for it. This strategy is the synthetic equivalent of selling a naked put and is the logical next step to continue generating income from your new shares.</p>
            </div>
        </InfoCard>
    </div>
);

// Getting Started Page
const GettingStartedPage = () => (
    <div className="animate-fade-in space-y-8">
        <h2 className="text-4xl font-bold text-green-400 border-b-2 border-green-500/30 pb-4">Getting Started: A Practical Guide</h2>

        <InfoCard icon={<PlayCircle />} title="Step 1: Preparation is Key (For Investors)">
            <p><strong className="text-white">Before you place a single trade, do your homework.</strong></p>
            <ul className="list-decimal pl-6 mt-2 space-y-2">
                <li><strong>Create a Watchlist:</strong> Compile a list of stocks you want to own and the prices you're willing to pay.</li>
                <li><strong>Monitor Put Prices:</strong> Keep an eye on the options you plan to sell so you don't miss an opportunity. Use limit orders (good for the day) to enter your trades.</li>
                <li><strong>Understand Support Levels:</strong> Be aware of technical support levels for your target stocks.</li>
            </ul>
            <div className="mt-4 p-4 bg-emerald-900/40 rounded-lg border-l-4 border-emerald-400 space-y-2">
                <p><strong className="text-emerald-300">TIP:</strong> To hit an effective purchase price after costs, add your commission expense to the premium you need to collect. If you want to buy at $38.80 and commissions are $0.05/share, you need to collect a premium that results in an effective price of $38.75.</p>
                <p><strong className="text-emerald-300">TIP:</strong> Consider writing a put when the stock is slightly *above* a support level. If support holds, you have a profitable trade. If it breaks, you get an early warning to exit with a potentially small loss.</p>
            </div>
        </InfoCard>

        <InfoCard icon={<TrendingUp />} title="Step 2: The Thought Process">
            <p className="text-gray-400 mb-4">The book provides examples of different mindsets for the same scenario to illustrate how to think through a trade.</p>
            <div className="text-center mb-6 p-3 bg-gray-700/60 rounded-lg border border-gray-600">
                <p className="font-semibold text-white">Example Scenario:</p>
                <p className="text-gray-300">Stock UVW is trading @ $41. The August $40 put can be sold for $1.00.</p>
            </div>
             <div className="space-y-6">
                <div>
                    <h4 className="font-semibold text-emerald-300 mb-2">The Experienced Put-Selling Investor's View:</h4>
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-emerald-500 italic text-gray-300">
                        <p>"I've been watching UVW and it is been approaching my target buy price of $39. I'm going to write the Aug 40 puts for a buck ($1.00). In any event, I'm a winner. I'll either own 400 shares at $39, or I'll keep the premium and walk away with $400."</p>
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-emerald-300 mb-2">The Experienced Put-Writing Trader's View:</h4>
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-emerald-500 italic text-gray-300">
                        <p>"The UVW chart looks good here, but the stock may stay in a trading range... Instead of buying stock, I'll write these August 40 puts for $1. Sure, it limits profits, but I want to make some money just in case the stock trades in a narrow range for a while... I'm giving up the chance to make a larger profit in return for a better chance to earn any profit."</p>
                    </div>
                </div>
            </div>
        </InfoCard>
        
        <InfoCard icon={<Lightbulb />} title="Trader-Specific Tips" className="border-yellow-500/50">
            <p className="font-semibold text-white">Traders have different objectives than long-term investors. Keep these points in mind:</p>
             <ul className="list-disc pl-6 mt-4 space-y-3">
                <li><strong className="text-yellow-300">Avoid Very Low-Priced Options:</strong> Don't sell puts for just $0.05 or $0.10. The tiny potential reward doesn't justify the capital risk you are taking on.</li>
                <li><strong className="text-yellow-300">Be Wary of Weeklys:</strong> Very short-term options (like weeklys) offer small premiums. A minor decline in the stock price can cause a large percentage loss on your position. They require more active management.</li>
                <li><strong className="text-yellow-300">Choose Expiration Wisely:</strong> Most traders focus on options expiring in the front two months to benefit from faster time decay. Longer-dated options are generally for investors seeking more premium.</li>
            </ul>
        </InfoCard>

        <InfoCard icon={<ChevronsRight />} title="Step 3: At Expiration Day">
            <p><strong className="text-white">Expiration day is nothing to fear. It's when you realize your profit or your next opportunity.</strong></p>
            
            <div className="mt-4">
                <h4 className="font-semibold text-xl text-green-300 mb-2">If Puts are Out-of-the-Money (OTM)</h4>
                <p>The best course of action is usually to <strong className="text-white">do nothing</strong> and let them expire worthless. Your capital is freed up on Monday for the next trade.</p>
                 <div className="mt-4 p-4 bg-emerald-900/40 rounded-lg border-l-4 border-emerald-400 space-y-2">
                    <p><strong className="text-emerald-300">TIP:</strong> If a new put you want to sell is attractively priced on expiration Friday, consider buying back your current (nearly worthless) put for $0.05 and immediately selling the new one, rather than waiting until Monday.</p>
                     <p><strong className="text-emerald-300">TIP:</strong> The weekend is the ideal time to update your watchlist and prepare for trading on Monday morning.</p>
                </div>
                <p className="text-sm text-gray-400 mt-3">Be careful: Don't sell new puts on a stock before the old ones are covered, even if they're far OTM. An unexpected event could double your position size and risk.</p>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-6">
                <h4 className="font-semibold text-xl text-yellow-300 mb-2">If Puts are In-the-Money (ITM)</h4>
                <p>You have three reasonable alternatives:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>Cover the Position:</strong> Buy back the put to close the trade, realizing a profit or loss.</li>
                    <li><strong>Allow Assignment:</strong> Do nothing and you will buy the stock at the strike price.</li>
                    <li><strong>Roll the Position:</strong> Buy back your current put and sell a new one (usually with a later date and lower strike) to seek additional profits or manage risk.</li>
                </ul>
                <div className="mt-4 p-4 bg-yellow-900/40 rounded-lg border-l-4 border-yellow-400">
                    <p><strong className="text-yellow-300">TIP:</strong> Never roll a position just to be active. Only roll if the new trade is attractive on its own and its profit potential is satisfactory. If not, it's better to cover or take the assignment.</p>
                </div>
            </div>
        </InfoCard>
    </div>
); 