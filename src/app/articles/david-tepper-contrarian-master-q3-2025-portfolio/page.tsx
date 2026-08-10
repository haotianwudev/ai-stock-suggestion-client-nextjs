'use client';

import React from 'react';
import { Target, Users, Globe, BrainCircuit, TrendingUp, TrendingDown, BookOpen, AlertOctagon, Briefcase, Scissors, Clock, CheckCircle, XCircle, MoveRight } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Reusable Components
const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`bg-white dark:bg-[#0A0D14] shadow-xl rounded-2xl p-6 sm:p-10 ${className}`}>
    {children}
  </section>
);

const Quote = ({ children, source }: { children: React.ReactNode; source?: string }) => (
  <blockquote className="my-6 p-4 border-l-4 border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 italic text-slate-700 dark:text-slate-300">
    <p className="text-lg font-medium">&ldquo;{children}&rdquo;</p>
    {source && <cite className="block mt-2 text-sm text-slate-500">- {source}</cite>}
  </blockquote>
);

const Pill = ({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'yellow' | 'purple' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

const getChangeClass = (changeType: string) => {
  switch (changeType) {
    case 'Major Add':
    case 'Add':
    case 'New Buy':
      return 'text-[#1D8A70] dark:text-[#3CBF9C] font-semibold';
    case 'Trim':
    case 'Major Trim':
    case 'Exit':
      return 'text-[#BC4128] dark:text-[#E2694A] font-semibold';
    default:
      return 'text-slate-500';
  }
};

// Page Components
const HomePage = ({ id }: { id?: string }) => (
  <div className="space-y-8" id={id}>
    <Section>
      <div className="text-center">
        <Pill color="blue">Hedge Fund Titan</Pill>
        
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          An Analytical Profile of a Modern Market Master: Philosophy, Performance, and Portfolio.
        </p>
      </div>
      <div className="mt-10 text-lg text-slate-700 dark:text-slate-300 space-y-6">
        <p>
          David Tepper, the founder and president of Appaloosa Management, stands as one of the most successful and closely-watched hedge fund managers of his generation. His reputation was forged in the fires of market crises, where he demonstrated an almost preternatural ability to identify value in the most distressed, feared, and misunderstood assets on the planet.
        </p>
        <p>
          This report provides an exhaustive analysis of David Tepper, from his formative experiences to the core philosophical tenets that define his investment doctrine. We will dissect his greatest triumphs, his notable defeats, and his (hypothetical) Q3 2025 portfolio.
        </p>
      </div>
      <div className="mt-12 text-center">
        <a
          href="#philosophy"
          className="px-8 py-3 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white text-lg font-semibold shadow-lg hover:bg-[#A8672E] dark:bg-[#D08F52] transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block"
        >
          Explore His Philosophy
          <MoveRight className="inline-block ml-2 h-5 w-5" />
        </a>
      </div>
    </Section>
  </div>
);

const CareerPage = ({ id }: { id?: string }) => (
  <div className="space-y-8" id={id}>
    <Section>
      
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        David Tepper&apos;s investment philosophy is not a learned academic theory; it is a direct extension of his personality and life experiences.
      </p>
      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52] font-serif">The Path to Goldman</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            Born in Pittsburgh, Tepper&apos;s early life provided hints of an analytical mind. After earning his MBA from Carnegie Mellon University (now the Tepper School of Business), his career accelerated. He landed at Goldman Sachs in 1985, joining its high-yield debt team.
          </p>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            He became head trader within six months, focusing on bankruptcies and special situations. He played a major role in Goldman&apos;s survival after the 1987 crash by buying the underlying bonds of crippled financial institutions.
          </p>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <h2 className="text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52] font-serif">The Catalyst: The &ldquo;Snub&rdquo; and Appaloosa</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            After eight years, Tepper was passed up for partner at Goldman, reportedly because his &ldquo;&lsquo;loud and profane&rsquo; manner&rdquo; was incompatible with the firm&apos;s culture. This rejection was the primary causal event that forged his independent, aggressive investment identity.
          </p>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            In 1993, he co-founded Appaloosa Management with $57 million. The firm, specializing in distressed debt, was an immediate success, delivering a 57% return in its first six months. This validated his independent approach and set the stage for a legendary career.
          </p>
        </div>
      </div>
    </Section>
  </div>
);

const PhilosophyPage = ({ id }: { id?: string }) => {
  const pillars = [
    {
      title: "Specialist in Distress",
      description: "At its core, Appaloosa is a distressed debt specialist. Tepper seeks fundamentally sound companies facing temporary, not terminal, problems. He analyzes the full capital stack to find the specific, mispriced security.",
      icon: Target,
      color: "blue" as const,
    },
    {
      title: "The Art of Contrarianism",
      description: "Tepper's most famous trait. He makes bold, contrarian bets when market sentiment is at its worst. His philosophy: 'Those who keep their heads while others are panicking usually do well.' This is not a blind gamble; it's based on intense research.",
      icon: Users,
      color: "green" as const,
    },
    {
      title: "Macro-Awareness (The Catalyst)",
      description: "Tepper's secret weapon. He avoids value traps by identifying a macro-level catalyst, often from government or central bank actions. His 2009 trades were a bet on the U.S. government's response, not just on the banks themselves.",
      icon: Globe,
      color: "yellow" as const,
    },
    {
      title: "Concentrated, Unemotional Conviction",
      description: "Tepper runs a concentrated portfolio, making big bets on his best ideas. This requires being 'pretty unemotional' and patient. His patience is for his *thesis* to play out. Once the catalyst fires (or fails), the exit is decisive.",
      icon: BrainCircuit,
      color: "purple" as const,
    },
  ];

  return (
    <div className="space-y-8" id={id}>
      <Section>
        
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Tepper&apos;s success is built on a disciplined, repeatable, and deeply personal set of principles.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-slate-50 dark:bg-[#14171B] rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${pillar.color}-100 text-${pillar.color}-600`}>
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200 font-serif">{pillar.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const TradesPage = ({ id }: { id?: string }) => (
  <div className="space-y-8" id={id}>
    <Section>
      
      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C] flex items-center font-serif">
            <TrendingUp className="w-7 h-7 mr-2" />
            The Trade of a Generation: Conquering the 2008 Crisis
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            The 2008 global financial crisis was the event Tepper&apos;s philosophy was built for. As investors dumped bank stocks, fearing nationalization would &ldquo;wipe out shareholders,&rdquo; Tepper read the macro situation differently. He did not believe the government would nationalize.
          </p>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            While others panicked, Tepper aggressively bought shares and debt in the most troubled banks, including Citigroup (at $0.97) and Bank of America (at $2.53). This was the quintessential Tepper trade: distressed, contrarian, macro-aware, and high-conviction.
          </p>
          <Quote>
            By the end of 2009, Appaloosa Management had generated a <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C]">$7 billion profit</span>. Tepper&apos;s personal payday was estimated at $4 billion. It is regarded as one of the &ldquo;greatest market trades ever made.&rdquo;
          </Quote>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <h2 className="text-2xl font-semibold text-[#BC4128] dark:text-[#E2694A] flex items-center font-serif">
            <TrendingDown className="w-7 h-7 mr-2" />
            A History of Scars: Instructive Defeats
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            Tepper&apos;s journey has not been without significant setbacks. During the dot-com bubble, he was &ldquo;not immune to the technology euphoria&rdquo; and Appaloosa &ldquo;suffered significant losses&rdquo; in 2000, reinforcing the dangers of momentum investing.
          </p>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            More recently, the fund &ldquo;struggled with positions in energy companies&rdquo; during the 2015-2016 oil price collapse. These setbacks highlighted the need for rigorous risk management, even with high-conviction positions, and demonstrated his ability to learn, adapt, and emerge stronger.
          </p>
        </div>
      </div>
    </Section>
  </div>
);

const PortfolioPage = ({ id }: { id?: string }) => (
  <div className="space-y-8" id={id}>
    <Section>
      
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        A deep dive into Appaloosa&apos;s hypothetical Q3 2025 13F filing, revealing Tepper&apos;s strategy in action.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52] font-serif">High-Level Overview</h2>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <li className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg shadow-sm">
            <span className="block text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]">$7.38 Billion</span>
            <span className="text-slate-600 dark:text-slate-400">Total Portfolio Value</span>
          </li>
          <li className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg shadow-sm">
            <span className="block text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]">+14.4%</span>
            <span className="text-slate-600 dark:text-slate-400">Increase from Q2 2025</span>
          </li>
          <li className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg shadow-sm">
            <span className="block text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]">57.59%</span>
            <span className="text-slate-600 dark:text-slate-400">Top 10 Holdings %</span>
          </li>
        </ul>
      </div>
    </Section>
    <Section>
      <h2 className="text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52] mb-6 font-serif">
        Portfolio Comparison: Q2 2025 vs. Q3 2025
      </h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-slate-100 text-left text-slate-600 dark:text-slate-400">
            <tr>
              <th className="p-4 font-semibold">Ticker</th>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Q3 2025 Shares</th>
              <th className="p-4 font-semibold">Share Change (Qty)</th>
              <th className="p-4 font-semibold">% Change</th>
              <th className="p-4 font-semibold">Q3 Portfolio %</th>
              <th className="p-4 font-semibold">Change Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">BABA</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Alibaba Group</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">6,450,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">~-617,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">-8.73%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">15.61%</td>
              <td className={`p-4 ${getChangeClass('Trim')}`}>Trim</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">AMZN</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Amazon.com</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">2,500,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">~-200,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">-7.41%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">7.43%</td>
              <td className={`p-4 ${getChangeClass('Trim')}`}>Trim</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">WHR</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Whirlpool Corp</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">5,500,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+5,233,908</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+1966.95%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">5.85%</td>
              <td className={`p-4 ${getChangeClass('Major Add')}`}>Major Add</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">NVDA</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Nvidia Corp</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">1,900,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">~+150,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+8.57%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">4.80%</td>
              <td className={`p-4 ${getChangeClass('Add')}`}>Add</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">GOOG</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Alphabet (C)</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">1,500,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">-510,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">-25.37%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">4.58%</td>
              <td className={`p-4 ${getChangeClass('Trim')}`}>Trim</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">QCOM</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Qualcomm Inc</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">2,071,200</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+1,488,200</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+255.71%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">~3.40%</td>
              <td className={`p-4 ${getChangeClass('Major Add')}`}>Major Add</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">AMD</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Adv. Micro Devices</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">950,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+950,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">New</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">2.08%</td>
              <td className={`p-4 ${getChangeClass('New Buy')}`}>New Buy</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">AAL</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">American Airlines</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">9,250,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">+9,250,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">New</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">1.41%</td>
              <td className={`p-4 ${getChangeClass('New Buy')}`}>New Buy</td>
            </tr>
            <tr className="hover:bg-slate-50 dark:bg-[#14171B]">
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">INTC</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">Intel Corp</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">0</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">-8,000,000</td>
              <td className="p-4 text-slate-700 dark:text-slate-300">-100%</td>
              <td className="p-4 font-medium text-slate-900 dark:text-slate-100">0.00%</td>
              <td className={`p-4 ${getChangeClass('Exit')}`}>Exit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
    <Section>
      <h2 className="text-2xl font-semibold text-[#A8672E] dark:text-[#D08F52] mb-6 font-serif">
        The Four Key Q3 2025 Narratives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl shadow-sm">
          <Pill color="yellow">Bottom-Fishing</Pill>
          <h3 className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-200 font-serif">
            1. The New Bet on Whirlpool (WHR)
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            A massive 1,966% increase, making it his 3rd largest holding. This is a classic, deeply contrarian bet on a &ldquo;battered&rdquo; company down 43% YTD.
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            <span className="font-semibold">The Catalyst:</span> Expiring tariffs on foreign rivals and a cyclical call on a housing recovery.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl shadow-sm">
          <Pill color="purple">Rebalancing</Pill>
          <h3 className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-200 font-serif">
            2. The China Rebalance (BABA, KWEB)
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Not a retreat, but a sophisticated risk-management rotation. He trimmed his #1 holding (BABA) while massively increasing his stake in the KWEB China ETF by 85%.
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            <span className="font-semibold">The Thesis:</span> He&apos;s locking in gains on BABA while maintaining his macro-thematic conviction in a broad Chinese tech recovery, but in a more diversified way.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl shadow-sm">
          <Pill color="blue">AI Rotation</Pill>
          <h3 className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-200 font-serif">
            3. The AI/Semiconductor Rotation
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            A massive &ldquo;pair trade&rdquo; on AI leadership. He <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">exited his entire 8-million-share Intel (INTC) stake</span>.
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            <span className="font-semibold">The Pivot:</span> He rotated that capital into the *winners*, initiating a new position in AMD and increasing his QCOM stake by 255%.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl shadow-sm">
          <Pill color="green">The 2009 Echo</Pill>
          <h3 className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-200 font-serif">
            4. Buying Beaten-Down Banks &amp; Airlines
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            A direct echo of his 2009 playbook. He initiated new positions in American Airlines (AAL), KeyCorp (KEY), and Truist Financial (TFC).
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            <span className="font-semibold">The Thesis:</span> Buying &ldquo;fear&rdquo; in distressed, &ldquo;old economy&rdquo; sectors, looking past near-term headwinds (debt, credit concerns) for a long-term cyclical recovery.
          </p>
        </div>
      </div>
    </Section>
  </div>
);

const LessonsPage = ({ id }: { id?: string }) => {
  const lessons = [
    {
      title: "Do Your Homework, Then Have Courage",
      description: "Contrarianism is not gambling; it's the result of rigorous, independent analysis. Have the courage to act on your research, not on the market's fear.",
      icon: BookOpen,
    },
    {
      title: "Fear Creates Opportunity (Be Prepared)",
      description: "Market crashes are opportunities to be exploited. Cultivate emotional discipline and maintain a 'shopping list' of quality companies to buy when others are panicking.",
      icon: AlertOctagon,
    },
    {
      title: "Understand the Macro-Catalyst",
      description: "A cheap stock without a catalyst is a value trap. Ask the 'Tepper Question': What external event (Fed, government, regulation) will force the market to recognize the value you see?",
      icon: Briefcase,
    },
    {
      title: "Be Concentrated, Not Stubborn",
      description: "High conviction isn't emotional attachment. Be willing to cut losses decisively when the thesis breaks. Tepper's 100% exit from Intel is a prime example.",
      icon: Scissors,
    },
    {
      title: "The Hardest Thing to Do Is Nothing",
      description: "Patience is a two-part strategy. First, wait for the 'fat pitch' (the perfect opportunity). Second, have the patience to hold through volatility as your thesis plays out.",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8" id={id}>
      <Section>
        
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          The Q3 2025 portfolio is a &ldquo;barbell&rdquo; strategy, perfectly balancing the two eras of his career.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-[#A8672E] dark:text-[#D08F52] font-serif">The &ldquo;2009 Playbook&rdquo; (Value)</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              One side of the barbell holds his classic &ldquo;bottom-fishing&rdquo; plays on distressed, unloved companies.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <XCircle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mr-2" /> Whirlpool (WHR)
              </li>
              <li className="flex items-center">
                <XCircle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mr-2" /> American Airlines (AAL)
              </li>
              <li className="flex items-center">
                <XCircle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mr-2" /> Regional Banks (KEY, TFC)
              </li>
            </ul>
          </div>
          <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C] font-serif">The &ldquo;Modern Playbook&rdquo; (Growth)</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              The other side holds his macro-aware, opportunistic bets on high-growth technology and global markets.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] mr-2" /> China Macro (BABA, KWEB)
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] mr-2" /> AI Winners (NVDA, AMD, AMZN)
              </li>
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Powerful, practical lessons from the Tepper Playbook.
        </p>
        <ol className="mt-8 space-y-6">
          {lessons.map((lesson, index) => (
            <li key={index} className="flex">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 font-serif">{lesson.title}</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{lesson.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
};

// Main App Component
export default function DavidTepperArticle() {
  return (
    <ArticleFrame
      slug="david-tepper-contrarian-master-q3-2025-portfolio"
      additionalDisclaimer="The Q3 2025 portfolio data in this analysis is hypothetical and illustrative, created for educational purposes only. It does not represent actual, verified 13F filing data."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-slate-800 dark:text-slate-200">
        <HomePage id="home" />
        <CareerPage id="career" />
        <PhilosophyPage id="philosophy" />
        <TradesPage id="trades" />
        <PortfolioPage id="portfolio" />
        <LessonsPage id="lessons" />
      </div>
    </ArticleFrame>
  );
}
