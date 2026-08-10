'use client';

import { useState, FC, ReactNode } from 'react';
import { ChevronDown, BookOpen, Target, BrainCircuit, BarChart, Lightbulb, UserCheck } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

interface SectionAccordionProps {
  id: string;
  title: string;
  isOpen: boolean;
  toggle: () => void;
  icon: ReactNode;
  children: ReactNode;
}
const SectionAccordion: FC<SectionAccordionProps> = ({ title, isOpen, toggle, icon, children }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <button
      onClick={toggle}
      className="w-full p-6 text-left flex justify-between items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
    >
      <div className="flex items-center space-x-4">
        <div className="text-cyan-600 dark:text-cyan-400">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">{title}</h2>
      </div>
      <ChevronDown
        className={`w-6 h-6 text-cyan-600 dark:text-cyan-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-full' : 'max-h-0'} overflow-hidden`}>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

interface ChapterProps {
  id: string;
  title: string;
  openSection: string | null;
  toggleSection: (id: string) => void;
  children: ReactNode;
}
const Chapter: FC<ChapterProps> = ({ id, title, openSection, toggleSection, children }) => (
  <div className="mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    <button
      onClick={() => toggleSection(id)}
      className="w-full p-4 text-left flex justify-between items-center bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-colors duration-300"
    >
      <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 font-serif">{title}</h3>
      <ChevronDown
        className={`w-5 h-5 text-cyan-700 dark:text-cyan-300 transform transition-transform duration-300 ${openSection === id ? 'rotate-180' : ''}`}
      />
    </button>
    <div className={`transition-all duration-500 ease-in-out ${openSection === id ? 'max-h-[10000px]' : 'max-h-0'} overflow-hidden`}>
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </div>
  </div>
);

const SpecialMindset: FC<{ title: string, children: ReactNode }> = ({ title, children }) => (
  <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 border-l-4 border-cyan-400 p-6 rounded-r-lg">
    <h4 className="flex items-center text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-3">
      <BrainCircuit className="w-5 h-5 mr-3" />
      {title}
    </h4>
    <div className="text-gray-700 dark:text-gray-300 space-y-3">{children}</div>
  </div>
);

const IntroductionContent: FC = () => (
  <div className="space-y-4 text-gray-700 dark:text-gray-300">
    <p>The book&apos;s introduction immediately confronts a dangerous myth: that trading is an easy path to quick riches. It argues that becoming a successful full-time trader is a profession that demands skill, knowledge, and a proper education. The author criticizes the &ldquo;destructive mindset&rdquo; born from the 1990s tech bubble, which fostered the illusion that anyone, regardless of experience, could effortlessly get rich from trading.</p>
    <SpecialMindset title="The Core Mindset: Thinking Differently">
      <p>The central thesis is that a trader&apos;s mindset is more critical than any single strategy. This isn&apos;t just about confidence or trying hard; it&apos;s a more subtle shift in thinking. The winning mindset involves:</p>
      <ul className="list-disc list-inside ml-4 space-y-2">
        <li>Believing there are multiple ways to view any situation.</li>
        <li>Recognizing that the most obvious choice is often not the best one.</li>
        <li>Prioritizing logical thought and planning over emotional reactions or assumptions.</li>
        <li>Committing to self-examination and being willing to change methods based on logical analysis, not gut feelings.</li>
      </ul>
      <p className="mt-2">The author&apos;s goal is to illuminate these habitual, often flawed, ways of thinking to empower traders to make smarter, more deliberate decisions.</p>
    </SpecialMindset>
  </div>
);

const Part1Content: FC<{ openSection: string | null; toggleSection: (id: string) => void; }> = ({ openSection, toggleSection }) => (
  <div className="space-y-4">
    <Chapter id="part1_chap1" title="Chapter 1: The Nature of Risk" openSection={openSection} toggleSection={toggleSection}>
      <p>This chapter establishes that risk is an inseparable part of trading. While the goal is profit, many traders are blinded by greed, failing to see the dangers they face. The author introduces the &ldquo;greatest risk of all&rdquo;: the <strong>bias blind spot</strong>. This is our innate inability to recognize our own cognitive distortions. These biases include:</p>
      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
        <li><strong>Confirmation Bias:</strong> Seeking out information that confirms our existing beliefs.</li>
        <li><strong>Optimism Bias:</strong> Believing we are less likely to experience negative events.</li>
        <li><strong>Self-Serving Bias:</strong> Attributing successes to our skill and failures to bad luck.</li>
        <li><strong>Loss Aversion:</strong> Feeling the pain of a loss more intensely than the pleasure of an equal gain.</li>
        <li><strong>Herd Mentality:</strong> Following the crowd, assuming they know more.</li>
      </ul>
      <SpecialMindset title="Trader's Mindset on Risk">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Respect for Risk:</strong> A successful trader develops a profound and healthy respect for risk.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Risk Management as Key Skill:</strong> Your primary job is not picking winners, but managing risk effectively.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Self-Awareness:</strong> The path to improvement begins with being open to the idea that some of your core beliefs about the market might be wrong.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Controlling Position Size:</strong> The only surefire way to prevent blowing up your account is to ensure no single position can cause catastrophic damage.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
    <Chapter id="part1_chap2" title="Chapter 2: Set Aside your Current Mindset" openSection={openSection} toggleSection={toggleSection}>
      <p>Traders don&apos;t start as blank slates; they bring preconceived notions that can be detrimental. The author uses his own painful experience as a market maker to illustrate this. He once held large naked short option positions for &ldquo;bragging rights,&rdquo; refusing to close them even when they were nearly worthless. This led to a harsh lesson: <strong>&ldquo;size kills.&rdquo;</strong> Owning positions with minimal potential gain but massive potential loss is pure gambling, not trading.</p>
      <SpecialMindset title="Trader's Mindset on Adaptation">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Abandoning Harmful Ideas:</strong> The book&apos;s purpose is to help you identify and discard these self-sabotaging beliefs.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Learning from Experience:</strong> You must learn from painful lessons (yours or others&apos;) and adapt your strategy.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Prioritizing Risk Reduction:</strong> When a trade goes against you, the primary goal of any adjustment must be to reduce risk. Worrying about turning it into a profit comes second.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Accepting Normal Losses:</strong> If you make a trade with a 90% probability of success, you should expect to lose 10% of the time. These are not &ldquo;bad luck,&rdquo; but a normal part of the statistical process. The goal is to minimize the damage on those inevitable losses.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
    <Chapter id="part1_chap3" title="Chapter 3: Trader Mindsets" openSection={openSection} toggleSection={toggleSection}>
      <p>Your personal habits and traits are magnified in the trading arena. A person who is generally careless with their personal finances will likely struggle with the discipline required for money management in trading. Those who are impulsive in life will be impulsive with their trades.</p>
      <SpecialMindset title="Trader's Mindset on Personal Habits">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Discipline:</strong> Trading is an exercise in discipline, especially regarding position sizing and sticking to a plan.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Emotional Control:</strong> Traders ruled by fear and greed are doomed. You must learn to recognize and manage these emotions to think clearly under pressure.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Self-Awareness:</strong> Know your comfort zone. Do not trade strategies or sizes that cause you to lose sleep. Expand this zone slowly, with experience.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Trading as a Business:</strong> Treat your trading with the same seriousness you would any other professional enterprise. This includes record-keeping, analysis, and continuous learning.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Realistic Self-Assessment:</strong> The winning mindset also includes recognizing if you don&apos;t have the temperament for active trading. In that case, becoming a good long-term investor is the true victory.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
    <Chapter id="part1_chap4" title="Chapter 4: Bragging Rights" openSection={openSection} toggleSection={toggleSection}>
      <p>This chapter dissects &ldquo;signaling,&rdquo; the psychological trap of taking on excessive risk to impress others. This is common in group settings where traders might feel pressure to appear bold or successful. The fundamental flaw is that greater risk only provides the *possibility* of a larger reward; it never guarantees it and often leads to lower returns over time due to blow-ups.</p>
      <SpecialMindset title="Trader's Mindset on Growth">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Avoiding Signaling:</strong> As a retail trader, you have no one to impress. Your focus should be solely on your P&amp;L, not on telling a good story.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Survival First:</strong> A beginner&apos;s primary job is not to make a fortune, but to survive. This means focusing on avoiding critical mistakes, learning the craft, and protecting capital.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Gradual Growth:</strong> The goal is to survive, not thrive, in the beginning. Only after you have a proven track record of consistency should you consider gradually increasing position size or exploring more complex strategies.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
  </div>
);

const Part2Content: FC<{ openSection: string | null; toggleSection: (id: string) => void; }> = ({ openSection, toggleSection }) => (
  <div className="space-y-4">
    <Chapter id="part2_chap5" title="Chapter 5: Choosing an Option Strategy" openSection={openSection} toggleSection={toggleSection}>
      <p>This chapter argues forcefully that <strong>the trader makes money, not the strategy.</strong> A great strategy in the hands of an undisciplined trader will still fail. A key part of mastering any strategy is understanding its specific risk management techniques (e.g., how you manage an iron condor is different from how you manage a long call).</p>
      <SpecialMindset title="Trader's Mindset on Strategy">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Trader over Strategy:</strong> Your skill, discipline, and mindset are far more important than the specific strategy you choose.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Strategic Flexibility:</strong> Don&apos;t be a one-trick pony. When market conditions (like high implied volatility) make your favorite strategy unsuitable, you must be able to adapt or sit on the sidelines.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Comfort Zone Awareness:</strong> It&apos;s tempting to jump to new or complex strategies seen online. Do not do this if it pushes you outside your comfort zone, especially as a newer trader. The goal is to gradually expand this zone, not leap out of it.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Holistic Decision-Making:</strong> Opening a trade is more than just picking some options. A complete trade plan includes strike selection, expiration, position size, a profit target, and, most importantly, a plan for when to adjust or exit if the trade goes wrong.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Avoiding &ldquo;Safe&rdquo; Illusions:</strong> Selling far out-of-the-money (FOTM) options seems safe due to the high probability of success. However, the risk is asymmetric: you collect a tiny premium for the risk of a massive loss, making effective adjustments nearly impossible.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
    <Chapter id="part2_chap6" title="Chapter 6: The Iron Condor Mindset" openSection={openSection} toggleSection={toggleSection}>
      <p>This chapter tackles a common, inefficient mindset for trading iron condors. The losing trader views the condor as two separate spreads (a call spread and a put spread). When the market moves against one side, they rush to close that side to &ldquo;lock in a profit,&rdquo; believing they&apos;ve been clever. This is a dangerous illusion. The two spreads are a single, hedged position. Closing one side removes the hedge and dramatically increases the risk of the remaining position.</p>
      <SpecialMindset title="The Winning Iron Condor Mindset">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Treat as a Single Position:</strong> The condor is a single position. Each of the four legs serves a specific purpose. There is no &ldquo;profit&rdquo; when exiting only half of it.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Patience in Moving Markets:</strong> Understand that a trending market will likely cause an unrealized loss. Don&apos;t panic and dismantle the structure.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Strategic Half-Covering:</strong> The only time to cover one side is when its value has decayed so much (e.g., to a nickel or dime) that it no longer provides a useful hedge. Think of it as canceling an insurance policy that no longer offers meaningful protection.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Purpose of Long Options:</strong> The long options in a condor are not there to make money. They are bought for one reason only: to provide insurance that defines and limits your maximum loss.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Separating Directional Plays:</strong> If you suddenly become bullish or bearish, do not try to twist your iron condor into a directional trade. Close the condor if you must, and open a new, separate trade that is designed for a directional move.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
    <Chapter id="part2_chap7" title="Chapter 7: Weekly Iron Condors" openSection={openSection} toggleSection={toggleSection}>
      <p>Weekly options are seductive due to their rapid time decay (theta), offering the potential for quick profits. However, they carry immense risk due to rapid gamma changes. This means that as the underlying moves, the position&apos;s delta can change dramatically, leading to explosive losses in a very short time.</p>
      <SpecialMindset title="Weeklys Mindset: High-Alert Trading">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">High Attention Required:</strong> These are not &ldquo;set and forget&rdquo; trades. If you have a full-time job or cannot watch the market closely, you should trade them in very small size, or not at all.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">No Rolling:</strong> The mechanics and risks of weeklys make rolling to a future expiration a bad idea. Close the trade and reassess.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Take Profits Quickly:</strong> Do not get greedy. The goal is not to earn every last penny of premium. When your profit target is hit, get out. The risk of holding on for a few extra dollars is not worth it.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Minimize Holding Period:</strong> Avoid holding over weekends. A surprise news event can turn a winner into a maximum loss before you can react.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Exit Before Expiration:</strong> Never hold into the final moments of expiration. Plan to exit when the spread&apos;s value is low, accepting that you won&apos;t get the full premium.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
  </div>
);

const Part3Content: FC<{ openSection: string | null; toggleSection: (id: string) => void; }> = ({ openSection, toggleSection }) => (
  <div className="space-y-4">
    <Chapter id="part3_chap8" title="Chapter 8: The Greeks" openSection={openSection} toggleSection={toggleSection}>
      <p>The Greeks (Delta, Gamma, Theta, Vega) are not just academic concepts; they are the language of risk for an option trader. They are tools that measure how a position&apos;s value will change based on movements in the underlying price, time, and volatility. Understanding them is not optional.</p>
      <SpecialMindset title="The Greeks Mindset">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Don&apos;t Skip the Basics:</strong> A winning mindset involves doing the foundational work. Learning the Greeks is part of that work.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Risk Measurement Tool:</strong> The Greeks do one thing: measure risk. They tell you what will happen if the stock goes up $1 (Delta), how much that delta will change (Gamma), how much you&apos;ll make or lose from time passing (Theta), and how sensitive you are to volatility changes (Vega).</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Confident Decision-Making:</strong> Knowing how much money you stand to make or lose under various scenarios is what allows you to trade with confidence and ensure your positions are within your personal comfort zone.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
    <Chapter id="part3_chap9" title="Chapter 9: Time Decay (Theta)" openSection={openSection} toggleSection={toggleSection}>
      <p>For option sellers, time decay (positive theta) feels like a steady income stream. But it&apos;s not free money. It&apos;s the compensation for taking on risk, specifically negative gamma. This means that while you profit from time passing, you are vulnerable to large, accelerating losses if the underlying asset makes a significant move against you. For option buyers, theta is a constant headwind.</p>
      <SpecialMindset title="Theta Mindset">
        <ul className="list-disc list-inside space-y-2">
          <li><strong className="text-cyan-700 dark:text-cyan-300">Proactive Risk Management:</strong> Because of the negative gamma risk, you must be willing to take defensive action (like reducing size or closing the trade) when a position is threatened.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Avoid Wishful Thinking:</strong> The thought that &ldquo;the market has moved far enough, it can&apos;t go any further&rdquo; is a &ldquo;financial death wish.&rdquo; It can, and it will.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">Prioritize Survival:</strong> The correct mindset is to accept uncertainty. When a trade becomes too risky, you get out. This allows you to survive and trade another day, even if it means taking a loss now.</li>
          <li><strong className="text-cyan-700 dark:text-cyan-300">No Free Money:</strong> A winning streak in a quiet market can make you feel invincible. Remember that theta is your reward for taking risk. The risk is always present, and a winning streak can end abruptly.</li>
        </ul>
      </SpecialMindset>
    </Chapter>
  </div>
);

const Part4Content: FC<{ openSection: string | null; toggleSection: (id: string) => void; }> = ({ openSection, toggleSection }) => {
  const chapters = [
    {
      id: 10,
      title: 'What can I earn as a Trader?',
      content: <p>The most common question from aspiring traders is, &ldquo;How much can I expect to earn?&rdquo; The author labels this the &ldquo;wrong question&rdquo; because it presupposes easy success. The right question is, &ldquo;What work must I do to become skillful?&rdquo; Earning a living requires significant capital (the book suggests at least $200,000 for a realistic chance) and realistic expectations. High-risk strategies don&apos;t promise large rewards; they promise a high probability of blowing up.</p>,
      mindsetTitle: "Mindset on Expectations",
      mindset: [
        "<strong>Education First:</strong> 'I will not rush into trading. My education comes first.'",
        "<strong>Sufficient Capital:</strong> 'I will not attempt to trade options with a tiny bankroll... If I expect to earn a living, I need at least $200,000.'",
        "<strong>Effort Required:</strong> 'I do not anticipate success with little effort. Trading requires knowledge and skill and I will acquire knowledge and practice to develop the skills.'",
        "<strong>Percentage Return Focus:</strong> 'I want to earn money. However, I know that I should think of my earnings in terms of a percentage return on my bankroll, and I will not target a specific number of dollars.' A realistic target for a newer trader is 1% per month.",
        "<strong>Discipline and Traits:</strong> Success requires discipline, risk recognition, patience, and emotional control."
      ]
    },
    {
      id: 11,
      title: 'Trading to Recover Losses',
      content: <p>This chapter presents a classic, dangerous scenario: a trader holds a losing position (e.g., long calls that are now worthless) and decides to sell naked puts to &ldquo;pay for&rdquo; the original loss. This is &ldquo;revenge trading&rdquo; and it&apos;s a losing mindset. The new trade is not based on a sound market opinion but on an emotional desire to fix a past mistake, often compounding the error.</p>,
      mindsetTitle: "Mindset on Losses",
      mindset: [
        "<strong>No Revenge Trading:</strong> 'When I lose money, I never believe that the specific stock or index 'owes' me anything and I avoid the trap of seeking revenge.'",
        "<strong>Focus on New Opportunities:</strong> 'My objective as a trader is to earn money... All dollars earned spend the same. I let the losses go and seek a better trade – when I'm ready.'",
        "<strong>'Hope' is Not a Strategy:</strong> Hope is a four-letter word in trading. Relying on it is a path to ruin.",
        "<strong>Discipline over Emotions:</strong> The emotional urge of 'not wanting to take a loss' is a primary cause of account destruction. Pride and confirmation bias lead you to justify holding a bad trade.",
        "<strong>Independent Decision Making:</strong> The only question that matters is: 'Based on the current situation, would I enter this trade now?' If the answer is no, you should exit."
      ]
    },
    {
      id: 12,
      title: 'Being Right vs. Making Money',
      content: <p>The ego-driven need to be &ldquo;right&rdquo; about a market prediction can be a trader&apos;s worst enemy, often overriding the primary goal of making money. The author recounts his own past stubbornness, holding short options to expiration for pennies just to prove he was right. Successful traders are adaptable; they understand that market conditions and their own needs change.</p>,
      mindsetTitle: "Mindset on Ego",
      mindset: [
        "<strong>Prioritize Making Money:</strong> 'Successful trading is about making money…not about being right.'",
        "<strong>Adaptability:</strong> Be willing to change even your most 'cherished beliefs' about a stock or the market when new information arises.",
        "<strong>Accept Being Wrong:</strong> When the market proves your thesis wrong, don't take it personally. Exiting the trade, cutting risk, and accepting the reality that the trade is a loser *is* the 'right' decision.",
        "<strong>Prevent Large Losses:</strong> The goal is to prevent the large losses that cripple your ability to continue trading. This comes from appropriate position sizing and considering worst-case scenarios.",
        "<strong>Self-Knowledge:</strong> Know your personal comfort zone regarding risk (e.g., handling negative gamma, max loss) and choose strategies that align with your personality."
      ]
    },
    {
      id: 13,
      title: 'Option Trading and Slippage',
      content: <p>Option markets often have wide bid-ask spreads. The difference between the midpoint and where your order actually gets filled is &ldquo;slippage.&rdquo; It&apos;s a hidden cost of trading. While income-generating strategies that are held for a while can overcome this cost through theta decay, it&apos;s still a crucial factor to manage.</p>,
      mindsetTitle: "Mindset on Trading Costs",
      mindset: [
        "<strong>Strategic Trade Frequency:</strong> Because of slippage and commissions, avoid frivolous, low-conviction trades.",
        "<strong>Theta is Earned, Not Given:</strong> 'We are not entitled to time decay profits.' It is earned by taking risk and managing positions well, not a guaranteed rebate against costs.",
        "<strong>Risk Management First, Costs Second:</strong> 'Never delay a needed adjustment or exit because of trading costs. Slippage is part of the cost of doing business.' When you are in a danger zone, the cost to get out is irrelevant."
      ]
    },
    {
      id: 14,
      title: 'Holding a Losing Trade',
      content: <p>This chapter highlights the danger of trading something you don&apos;t understand, especially when it seems &ldquo;too good to be true,&rdquo; like high premiums on OTM options before an earnings announcement. It illustrates how pride and confirmation bias can lead a trader to refuse to take a small, manageable loss, turning it into a much larger one.</p>,
      mindsetTitle: 'Mindset on Understanding & Pride',
      mindset: [
        "<strong>Trade Only What You Understand:</strong> 'If anything about an option seems 'wrong,' do not trade it.' This includes understanding why a premium might be unusually high.",
        "<strong>Due Diligence:</strong> 'Always verify important dates like earnings releases.' Options are priced for a reason.",
        "<strong>No Refusal to Take a Loss:</strong> 'Not wanting to take a loss is a dangerous mindset.' If a small loss makes you irrational, you have a fundamental problem.",
        "<strong>Current Situation Dictates:</strong> 'Decisions should be based on the position's current value and risk, not on past profitability or original cost.'",
        "<strong>No Free Lunch:</strong> 'There is no such thing as a free lunch. There is no free money.'"
      ]
    },
    {
      id: 15,
      title: 'When to Exit',
      content: <p>Traders constantly face the dilemma: take a profit now or hold for more? The mistake is allowing the size of the current profit (or loss) to influence the decision. A position should be held only if it remains a good trade based on current conditions, regardless of its history.</p>,
      mindsetTitle: 'Mindset on Exiting',
      mindset: [
        "<strong>Present-Focused Decision:</strong> 'It does not matter whether you have a current profit or loss... You own a position right this moment. Do you like it? ... Nothing else matters.'",
        "<strong>Accept Recovery as Profit:</strong> 'An adjustment that turns a larger loss into a smaller one... should be seen as a 'real gain' or a 'good result.''",
        "<strong>Business Mentality:</strong> 'Trading is a business, not a gambling casino. Own 'good inventory' (positions) and be willing to exit those that are no longer suitable.'"
      ]
    },
    {
      id: 16,
      title: 'Adjusting. How Much Should I Invest?',
      content: <p>This chapter addresses the difficult decision of investing more money to adjust a losing trade. A losing mindset refuses to adjust if the cost exceeds the original premium collected or if the best possible outcome is still a small loss. This is flawed thinking, anchored to the original trade&apos;s cost.</p>,
      mindsetTitle: 'Mindset on Adjusting Capital',
      mindset: [
        "<strong>Focus on Future Profitability:</strong> 'It is better to own a good position when it is available at a good price, rather than refuse to own it because it was built from a previous, losing trade.'",
        "<strong>Disregard Original Cost:</strong> 'The original premium should play no role in the adjust/exit decision.' The decision is between today's choices: exit at today's price or adjust at today's price.",
        "<strong>Investment in Good Positions:</strong> 'Buying good positions at a favorable price with a decent risk/reward ratio– isn't that how we select our trades?' An adjustment should be viewed as opening a new, desirable position."
      ]
    },
    {
      id: 17,
      title: 'Maximum Allowable Loss',
      content: <p>Establishing a &ldquo;max loss&rdquo; point in your trade plan is a critical disciplinary tool. It&apos;s the line in the sand that prevents disaster. Many traders fail here, becoming stubborn and hoping for a recovery as a loss mounts, holding until &lsquo;there is no point in exiting now.&rsquo;</p>,
      mindsetTitle: 'Mindset on Maximum Loss',
      mindset: [
        "<strong>Pre-determined Exit Point:</strong> 'Establish a maximum possible loss and get out no later than when that loss is achieved.'",
        "<strong>Trade Plan as Guidance:</strong> 'Writing a trade plan makes difficult decisions easier by pre-determining actions under stress.'",
        "<strong>Honest Assessment of Adjustment:</strong> 'If an adjustment is made, it must be a 'real' fix that severely cuts imminent risk... Don't just adjust to avoid booking a loss.'",
        "<strong>Discipline as Foundation:</strong> 'If you lack the discipline to cut losses... then please adopt and always use that 'max loss' rule.'"
      ]
    },
    {
      id: 18,
      title: 'The Killer Blind Spot',
      content: <p>The &ldquo;killer blind spot&rdquo; is the failure to truly recognize risk, especially the belief that an out-of-the-money (OTM) option poses no danger as long as it remains OTM. A trader might see an OTM short put lose 500% of its initial premium value and still think, &ldquo;I&apos;m fine, the stock is still above my strike.&rdquo; This gambler&apos;s mindset ignores the massive unrealized loss and the real danger of further adverse moves.</p>,
      mindsetTitle: "Mindset on Hidden Risk",
      mindset: [
        "<strong>Comprehensive Risk Understanding:</strong> You must know how much is at risk and the real chances of losing it for every single position.",
        "<strong>Beyond OTM = Safe:</strong> An OTM option whose value has exploded against you is a screaming danger signal, regardless of its in/out-of-money status. It is a real, unrealized loss.",
        "<strong>Position Size vs. Probability:</strong> Selling a huge number of 'safe' limited-loss spreads can be far riskier than selling a small number of naked options, because the probability of a max loss event on the large position is much higher.",
        "<strong>Controlled Risk for Naked Options:</strong> As a rookie, avoid naked options. After gaining experience, selling them in an appropriately small size can be a valid strategy."
      ]
    },
    {
      id: 19,
      title: 'Rolling for a Credit',
      content: <p>A common, dangerous rule some traders follow is to &ldquo;always collect cash when making an adjustment.&rdquo; This often leads them to roll a losing position into a new, even riskier position just to generate a small credit. This is a form of the Martingale strategy and will eventually lead to ruin. It creates the false sense of security that no loss has been taken.</p>,
      mindsetTitle: "Mindset on Adjustments",
      mindset: [
        "<strong>Risk Management Trumps Cash:</strong> 'Risk management trumps everything else.' It is always better to exit a bad position than to roll it into another bad position for a tiny credit.",
        "<strong>Willingness to Pay:</strong> Be willing to pay a debit to adjust a trade if it effectively reduces your risk. Good insurance is not free.",
        "<strong>Quality of Adjusted Position:</strong> An adjustment is only successful if the new position is one you would be happy to own, independent of the old one, and it has less risk.",
        "<strong>Honest Bookkeeping:</strong> When you roll, you are closing one trade (for a loss) and opening a new one. Acknowledge this reality.",
        "<strong>Exit When Unsuitable:</strong> 'I must answer yes to this: Is this the position I want to own now? If 'no' then I do not adjust... I exit and find something new.'"
      ]
    },
    {
      id: 20,
      title: 'The Trade or the Trade Plan. Which is More Important?',
      content: <p>This chapter explores the relationship between the trade idea and the plan to manage it. The author suggests most traders rightly prioritize finding a good trade that suits their market outlook first, and then devise a trade plan to manage the risk of that specific trade. The plan serves the trade, not the other way around.</p>,
      mindsetTitle: 'Mindset on Plans vs. Trades',
      mindset: [
        "<strong>Importance of Trade Plan:</strong> 'The trade plan is an important part of any successful trader's modus operandi.' It provides discipline under stress.",
        "<strong>Trade-Centric Approach:</strong> 'The trade itself is more important [than the plan].' Do not choose a trade simply because it's easy to manage.",
        "<strong>Risk Management's Role:</strong> 'Risk management is not the driving force behind writing a trade plan; it is the method used to protect assets. The profit source should come from the trade selection.'",
        "<strong>Clear Profit Path:</strong> 'Don't make a trade if the path to profits is not clear.'"
      ]
    },
    {
      id: 21,
      title: 'A Truly Terrible Trade',
      content: <p>This chapter illustrates a common error: letting an existing losing position dictate a new trade. For example, a trader who is short calls and then becomes bullish might simply buy back the calls, leaving them with a long call position they never would have chosen as an optimal bullish trade. The new trade is born of convenience, not quality.</p>,
      mindsetTitle: 'Mindset on New Trades',
      mindset: [
        "<strong>Separate Decisions:</strong> 'If I want to own call options... as a directional play, I will choose the best option to buy... My decision will not be influenced by existing positions.'",
        "<strong>Optimal New Trade:</strong> 'Focus on opening a new, bullish trade that gives the best chance to profit now, and then, as a separate decision, decide how to handle the existing bearish position.'",
        "<strong>Avoid Convenience over Quality:</strong> 'I will not own an inferior position just because it is convenient.'"
      ]
    },
    {
      id: 22,
      title: 'The Ultimate Winning Mindset',
      content: <p>The ultimate advice is profoundly simple yet incredibly difficult for many to follow: <strong>&ldquo;When you win the game, stop playing.&rdquo;</strong> This means recognizing when you have accumulated &ldquo;enough&rdquo; money to meet your financial goals and not squandering it by taking unnecessary risks. Overconfidence born from success is a primary cause of giving back hard-won gains.</p>,
      mindsetTitle: "The Ultimate Mindset",
      mindset: [
        "<strong>Know When to Stop:</strong> Do not let greed turn you from a successful accumulator of wealth into a gambler who loses it all.",
        "<strong>Respect for Capital:</strong> Treat your capital with the utmost respect, especially after a big winning streak when you feel invincible.",
        "<strong>Size Kills:</strong> Even experienced traders can be ruined by trading too large. Gradually increase size with experience, but never get carried away.",
        "<strong>Beware of Invincibility:</strong> Winning streaks are often due to being in sync with the market's conditions, not because you have become a trading god. They always end."
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {chapters.map(chap => (
        <Chapter key={chap.id} id={`part4_chap${chap.id}`} title={`Chapter ${chap.id}: ${chap.title}`} openSection={openSection} toggleSection={toggleSection}>
          <div className="text-gray-700 dark:text-gray-300 space-y-3">{chap.content}</div>
          <SpecialMindset title={chap.mindsetTitle}>
            <ul className="list-disc list-inside space-y-2">
              {chap.mindset.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>)}
            </ul>
          </SpecialMindset>
        </Chapter>
      ))}
    </div>
  );
};

const AppendicesContent: FC = () => (
  <div className="space-y-4 text-gray-700 dark:text-gray-300">
    <p>The appendices reinforce the core psychological themes. Dr. Brett Steenbarger&apos;s analogy of a baseball player is powerful: a professional player doesn&apos;t have an emotional breakdown after every strikeout. They focus on their batting average over the entire season and their long-term career. Traders must adopt the same mindset.</p>
    <SpecialMindset title="Final Psychological Considerations">
      <ul className="list-disc list-inside ml-4 space-y-2">
        <li><strong className="text-cyan-700 dark:text-cyan-300">Long-Term Focus:</strong> Don&apos;t get emotionally attached to the outcome of any single trade. Focus on your performance over a large number of trades.</li>
        <li><strong className="text-cyan-700 dark:text-cyan-300">Embrace Discomfort:</strong> Overcoming biases like fear of missing out (FOMO) or fear of taking a loss is uncomfortable. You must embrace this temporary discomfort for long-term gain.</li>
        <li><strong className="text-cyan-700 dark:text-cyan-300">Losses are Part of the Game:</strong> Allowing losses to run is the single biggest obstacle to success for most traders. The mindset &ldquo;It is okay to take a loss&rdquo; is fundamental.</li>
        <li><strong className="text-cyan-700 dark:text-cyan-300">No Marriage to Positions:</strong> &ldquo;Do not get married to any position.&rdquo; The only reason to own a position is because it is a good one to own right now.</li>
        <li><strong className="text-cyan-700 dark:text-cyan-300">Continuous Improvement:</strong> Changing your mindset is not a one-time event. It requires constant effort, self-reflection, and a belief that these ideas are worthwhile.</li>
      </ul>
    </SpecialMindset>
  </div>
);

export default function OptionTradersMindsetsPage() {
  const [openSection, setOpenSection] = useState<string | null>('introduction');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <BookOpen className="w-6 h-6" />, content: <IntroductionContent /> },
    { id: 'part1', title: 'Part I: Background Thoughts', icon: <BrainCircuit className="w-6 h-6" />, content: <Part1Content openSection={openSection} toggleSection={toggleSection} /> },
    { id: 'part2', title: 'Part II: Strategies', icon: <Target className="w-6 h-6" />, content: <Part2Content openSection={openSection} toggleSection={toggleSection} /> },
    { id: 'part3', title: 'Part III: The Greeks', icon: <BarChart className="w-6 h-6" />, content: <Part3Content openSection={openSection} toggleSection={toggleSection} /> },
    { id: 'part4', title: 'Part IV: Mindsets that can be Changed', icon: <Lightbulb className="w-6 h-6" />, content: <Part4Content openSection={openSection} toggleSection={toggleSection} /> },
    { id: 'appendices', title: 'Appendices: Psychology', icon: <UserCheck className="w-6 h-6" />, content: <AppendicesContent /> },
  ];

  return (
    <ArticleFrame
      slug="option-traders-mindset-book-summary"
      additionalDisclaimer="The author may hold positions in the securities discussed. This content is for educational purposes only and not a recommendation to buy or sell any security."
    >
      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.id} id={section.id} className="scroll-mt-24">
            <SectionAccordion
              id={section.id}
              title={section.title}
              isOpen={openSection?.startsWith(section.id) || false}
              toggle={() => toggleSection(section.id)}
              icon={section.icon}
            >
              {section.content}
            </SectionAccordion>
          </div>
        ))}
      </div>
    </ArticleFrame>
  );
}
