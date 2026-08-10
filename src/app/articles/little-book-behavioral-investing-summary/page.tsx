'use client';

import { useState } from 'react';
import { ChevronsDown, ChevronsUp, BookOpen, BarChart2 } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper function to generate a unique ID for keys
const uniqueId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

// Data for the website
const executiveSummary = {
  title: "Executive Summary",
  content: `"The Little Book of Behavioral Investing" argues that the biggest obstacle to investment success is not market complexity or lack of information, but human psychology itself. Investors, including professionals, are consistently undermined by innate behavioral biases and mental pitfalls, leading to suboptimal decisions and significant underperformance compared to passive indices. The book introduces a two-system model of the brain (X-system for emotional/automatic thought and C-system for logical/deliberate thought) to explain these biases. It emphasizes that while these biases are deeply ingrained, a conscious focus on process, pre-commitment, skepticism, and a contrarian mindset can help investors overcome their "worst enemy"—themselves.`
};

const keyThemes = [
  {
    id: 'theme-1',
    title: '1. The Primacy of Human Behavioral Biases',
    content: 'Investors are "predictably irrational." Their emotions and hard-wired decision-making processes, evolved for ancient environments, are poorly suited for modern investing. This leads to significant underperformance, as shown by Dalbar studies.',
    details: [
      'Core Argument: Investors\' emotions and ancient survival instincts lead to poor financial decisions.',
      'Empirical Evidence: Dalbar studies show individual investors vastly underperform market indices due to poor timing.',
      'X-system vs. C-system: The emotional (X-system) brain often overpowers the logical (C-system) brain.',
      'Bias Blind Spot: People recognize biases in others but not in themselves.',
      'Self-Control Depletion: Willpower is a finite resource, making systemic solutions necessary.'
    ],
    storiesAndExamples: [
      'The Spock vs. McCoy Analogy: Our brains have two systems: the logical, deliberate "Mr. Spock" (C-system) and the emotional, automatic "Dr. McCoy" (X-system). The X-system is our default and often hijacks rational thought.',
      'The Bat and Ball Problem: A bat and ball cost $1.10. The bat costs $1.00 more than the ball. How much is the ball? The intuitive answer is $0.10, but the correct answer is $0.05. This Cognitive Reflection Task shows how our automatic brain gets it wrong.',
      'Willpower as a Muscle: In one study, people who had to resist eating fresh-baked cookies gave up on a subsequent difficult puzzle much faster than those who didn\'t have to exert self-control. This shows that relying on willpower alone to fight bias is a losing battle.'
    ],
    color: 'bg-sky-100',
    borderColor: 'border-sky-500'
  },
  {
    id: 'theme-2',
    title: '2. The Power of Pre-Commitment',
    content: 'Humans are poor at predicting their behavior under emotional stress (the "empathy gap"). The solution is to pre-commit to investment decisions in a calm, rational state.',
    details: [
      'Empathy Gap: We fail to predict how stress will influence our decisions.',
      'Procrastination: Delaying difficult tasks leads to worse outcomes.',
      'Solution: Pre-commit to actions when in a "cold, rational state."',
      'Example (Sir John Templeton): Used "wish lists" and standing buy orders to remove emotion from crisis-driven buying.',
      'Example (Bear Market "Battle Plans"): Having a pre-set plan for reinvestment counters fear-induced inaction.'
    ],
    storiesAndExamples: [
      'The Thirst Study: People asked *before* a workout underestimate how much they would regret forgetting water compared to those asked *after* a workout. This demonstrates the "empathy gap" – our inability to predict our feelings in a different emotional state.',
      'Sir John Templeton\'s "Wish List": The legendary investor kept a list of great companies that were too expensive. He placed standing buy orders at much lower prices, so that when a market crash inevitably occurred, the orders would execute automatically, removing the need for emotional courage in the heat of the moment.'
    ],
    color: 'bg-amber-100',
    borderColor: 'border-amber-500'
  },
  {
    id: 'theme-3',
    title: '3. The Pervasiveness of Optimism and Overconfidence',
    content: 'Most people believe they are above average, an optimism that is resistant to facts. This overconfidence leads to excessive trading and poor returns.',
    details: [
      'Over-Optimism: A high percentage of professional fund managers believe they are above average.',
      'Illusion of Control: People mistake randomness for control, especially with many choices or early success.',
      'Overconfidence in Experts: People prefer confident advisors, regardless of their accuracy.',
      'Impact on Investing: Overconfidence leads to excessive trading, eroding returns. Men tend to trade more and earn less.',
      'Blind Obedience to Authority: People tend to follow "expert" advice, even when irrational.'
    ],
    storiesAndExamples: [
      'The "Above Average" Effect: When polled, 74% of professional fund managers believe they are "above average" at their jobs. This illustrates a mathematically impossible level of optimism.',
      'Doctors vs. Weathermen: When doctors are 90% confident in a diagnosis, they are correct only 15% of the time. Weathermen, who get constant feedback, are much better calibrated. We are drawn to confidence, not accuracy.',
      'Keynes\' Beauty Contest: Professional investors often don\'t pick what they think is best, but what they think *other people think* is best. This second-guessing leads to herd behavior and poor outcomes.'
    ],
    color: 'bg-teal-100',
    borderColor: 'border-[#A8672E] dark:border-[#D08F52]'
  },
  {
    id: 'theme-4',
    title: '4. The Folly of Forecasting',
    content: 'Financial forecasting is largely futile. Instead of predicting, investors should focus on preparation, understanding intrinsic value, and knowing where they are in a market cycle.',
    details: [
      'Forecasting\'s Futility: Forecasts are based on multiple low-accuracy assumptions.',
      'Evidence of Failure: Economists fail to predict recessions; analyst predictions are wildly inaccurate.',
      'Reasons for Forecasting: Demand from investors and a range of excuses for failure.',
      'Solution (Prepare, Don\'t Predict): Focus on understanding a business\'s intrinsic worth.',
      'Reverse-Engineered DCF: Determine what growth is implied by the current price and assess its feasibility.'
    ],
    storiesAndExamples: [
      'The Anchor of Irrelevant Numbers: When judges were asked to roll dice (a random number) before deciding on a prison sentence, the number on the dice influenced the length of the sentence they gave, demonstrating the power of anchoring to any available number, even a useless one.',
      'Analyst Track Record: Analysts are, on average, wrong by a staggering 94% when first forecasting a company\'s earnings two years out. Their five-year growth forecasts are no better than random chance.'
    ],
    color: 'bg-rose-100',
    borderColor: 'border-[#BC4128] dark:border-[#E2694A]'
  },
  {
    id: 'theme-5',
    title: '5. Information Overload and the Signal-to-Noise Problem',
    content: 'More information does not lead to better decisions; it often just increases confidence. The key is to focus on the few essential characteristics of a business.',
    details: [
      'The Illusion of Knowledge: More information boosts confidence but not accuracy.',
      'Limited Processing Capacity: Too much information can lead to poorer choices.',
      '"Placebic" Information: People are swayed by familiar-looking but meaningless information.',
      'Solution (Focus on Essentials): Identify and concentrate on the few factors that truly matter.',
      'Checklists: Simple checklists can ensure focus on critical, diagnostic information.'
    ],
    storiesAndExamples: [
      'The Bookmaker Study: Experienced horse-racing bookmakers were given increasing amounts of information. Their accuracy did not improve after the first 5 pieces of data, but their confidence soared. More data made them more confident, not more right.',
      'The Emergency Room Checklist: A Michigan hospital dramatically improved its ability to correctly diagnose heart attacks not by providing more data, but by giving doctors a simple checklist focusing on the few truly diagnostic variables, helping them ignore the "pseudo-diagnostic" noise.'
    ],
    color: 'bg-indigo-100',
    borderColor: 'border-[#A8672E] dark:border-[#D08F52]'
  },
  {
    id: 'theme-6',
    title: '6. Confirmation Bias',
    content: 'People tend to seek and interpret information that confirms their existing beliefs. The solution is to actively seek disconfirming evidence, or "kill the company."',
    details: [
      'Confirmatory Bias: The tendency to favor information that confirms pre-existing beliefs.',
      'Biased Assimilation: New information is viewed as supporting one\'s hypothesis, leading to polarization.',
      'Solution ("Kill the Company"): Actively seek information that would disprove your investment thesis.',
      'Devil\'s Advocate: Assigning someone to argue the opposing viewpoint helps challenge beliefs.'
    ],
    storiesAndExamples: [
      'The 2-4-6 Puzzle: Subjects are given the number sequence 2-4-6 and asked to discover the rule. They typically test confirming sequences (e.g., 8-10-12) rather than disconfirming ones (e.g., 1-2-3 or 3-2-1). The actual rule is "any ascending numbers," but it is rarely found because people don\'t try to prove themselves wrong.',
      'Bruce Berkowitz\'s "Kill the Company" Strategy: The successful manager of Fairholme Capital intentionally tries to find reasons *not* to own a stock. He tries to "kill" his best ideas. If he can\'t, he invests.'
    ],
    color: 'bg-lime-100',
    borderColor: 'border-lime-500'
  },
  {
    id: 'theme-7',
    title: '7. Conservatism and the Sunk Cost Fallacy',
    content: 'Investors hold onto existing views for too long (conservatism) and are influenced by past, unrecoverable costs (sunk cost fallacy).',
    details: [
      'Conservatism: The tendency to adjust views too slowly in the face of new evidence.',
      'Sunk Cost Fallacy: Allowing past expenses to influence current decisions.',
      'Solution (Blank Sheet of Paper): Ask "Would I open this position today?"',
      'Radical Action (Michael Steinhardt): Periodically selling the entire portfolio to gain a "clean slate."'
    ],
    storiesAndExamples: [
      'The Stealth Plane Project: When asked if they would invest the final 10% in a project that is already 90% complete but now obsolete, most say yes. When asked if they would start the same obsolete project with the same amount of money, most say no. The only difference is the "sunk cost" of the prior investment.',
      'Michael Steinhardt\'s "Clean Slate": To fight his own conservatism, the legendary hedge fund manager would periodically sell his entire portfolio. This forced him to rebuild it from scratch with only his highest-conviction ideas, free from the baggage of past decisions.'
    ],
    color: 'bg-cyan-100',
    borderColor: 'border-cyan-500'
  },
  {
    id: 'theme-8',
    title: '8. The Siren Song of Stories vs. Facts',
    content: 'Humans are swayed by compelling narratives, often overpaying for hope and ignoring quantifiable facts. Investment safety must be based on study and standards.',
    details: [
      'Narrative Fallacy: The human vulnerability to compact stories over raw truths.',
      'Price as a Story: High prices can create an illusion of quality.',
      'Capitalizing Hope: Investors consistently overpay for growth, especially in IPOs.',
      'Solution (Focus on Facts): Prioritize quantifiable facts over emotionally appealing stories.'
    ],
    storiesAndExamples: [
      'The Expensive Painkiller: In one experiment, a placebo pill priced at $2.50 was reported as far more effective than the exact same pill priced at 10 cents. The price told a more compelling "story" of quality than the underlying facts.',
      'The IPO Trap: Initial Public Offerings (IPOs) almost always have great stories about future growth. Historically, however, the average IPO has massively underperformed the market in the three years after listing. Investors buy the story, not the facts.'
    ],
    color: 'bg-fuchsia-100',
    borderColor: 'border-fuchsia-500'
  },
  {
    id: 'theme-9',
    title: '9. Myopia, Action Bias, and Patience',
    content: 'Investors often focus on the short-term and feel an urge to act, even when inaction is optimal. The solution is patience and waiting for high-probability opportunities.',
    details: [
      'Myopia: A short-term focus on daily fluctuations rather than long-term fundamentals.',
      'Action Bias: The urge to "do something" rather than nothing.',
      'Solution (Patience): Wait for clear, high-probability investment opportunities ("fat pitches").',
      '"Coffee Can Portfolio": A "passively active" strategy of buying and holding, avoiding over-trading.'
    ],
    storiesAndExamples: [
      'The Goalkeeper\'s Dilemma: On penalty kicks, goalkeepers almost always dive left or right. However, they have a much higher save percentage when they stay in the center. They dive because it feels better to be "doing something" than to stand still and watch the ball go by. This is the action bias.',
      'Warren Buffett\'s "Fat Pitch": Buffett compares investing to baseball, but a version where you have no called strikes. You can wait indefinitely for the perfect, easy-to-hit pitch (a "fat pitch"). The key is having the patience to do nothing until that opportunity arrives.'
    ],
    color: 'bg-orange-100',
    borderColor: 'border-[#BC4128] dark:border-[#E2694A]'
  },
  {
    id: 'theme-10',
    title: '10. Groupthink and Contrarianism',
    content: 'People tend to conform to group opinions, even when incorrect. Superior performance requires doing something different from the majority.',
    details: [
      'Conformity: Going against the crowd can trigger fear and even physical pain.',
      'Group Polarization: Groups tend to move to more extreme positions.',
      'Groupthink: A deterioration of mental efficiency and moral judgment due to group pressures.',
      'Solution (Be a Contrarian): Buy what others are selling and sell what others are buying.'
    ],
    storiesAndExamples: [
      'The Asch Experiment: In a famous experiment, subjects were asked to match the length of a line with one of three choices. When a group of actors intentionally chose the wrong line, the real subject conformed to the obviously incorrect majority view about a third of the time.',
      'The Pain of Non-Conformity: Neuroscience shows that when you disagree with a group, your brain activates the amygdala (the fear center) and regions associated with physical pain. It is literally painful to be a contrarian.'
    ],
    color: 'bg-emerald-100',
    borderColor: 'border-[#1D8A70] dark:border-[#3CBF9C]'
  },
  {
    id: 'theme-11',
    title: '11. Loss Aversion and the Endowment Effect',
    content: 'The pain of loss is felt more intensely than the pleasure of an equivalent gain, leading to suboptimal decisions like holding losers and selling winners.',
    details: [
      'Loss Aversion: The pain of loss is 2-2.5 times stronger than the pleasure of gain.',
      'Disposition Effect: The tendency to hold losing stocks and sell winning stocks.',
      'Endowment Effect: Owning something makes you value it more highly.',
      'Solution (Stop Losses & Re-evaluation): Use pre-commitment and objectively ask "Would I buy this today?"'
    ],
    storiesAndExamples: [
      'The Monkey Market: Even capuchin monkeys exhibit loss aversion. When given a choice between a safe grape and a gamble that could result in two grapes or zero, they prefer the safe bet. But when framed as starting with two grapes and potentially losing one, they take the risk to avoid the feeling of loss.',
      'The Coffee Mug Study: In a classic experiment, students given a free coffee mug would only sell it for about $7 on average. Students without a mug would only pay about $3 for it. Simply owning the object (the endowment effect) more than doubled its perceived value.'
    ],
    color: 'bg-violet-100',
    borderColor: 'border-violet-500'
  },
  {
    id: 'theme-12',
    title: '12. The Critical Importance of Process over Outcome',
    content: 'Decisions should be judged by the quality of the process, not the outcome. Good processes can have bad outcomes (bad luck) and vice versa.',
    details: [
      'Outcome Bias: Judging a decision by its outcome rather than the process.',
      'Learning from Mistakes: Self-attribution and hindsight bias prevent learning.',
      'Solution (Focus on Process): Control the investment process, not the outcome.',
      'Investment Diary: Keep a written record of decisions and the reasons behind them.'
    ],
    storiesAndExamples: [
      'The Blackjack Hand: A player correctly hits on 16 against a dealer\'s 7 (a good process) but gets a 10 and busts (a bad outcome). The casino pit boss, focused on process, knows the player made the right decision. Investors must learn to think like the pit boss, not the emotional player.',
      'The Investment Diary: To combat outcome bias and hindsight bias ("I knew it all along!"), keep a journal of *why* you made an investment decision at the time. This allows for an honest review of your process, separating skill from luck.'
    ],
    color: 'bg-pink-100',
    borderColor: 'border-pink-500'
  }
];

// Accordion Item Component
const AccordionItem = ({ theme, isOpen, onToggle }) => {
  return (
    <div className={`mb-4 border-l-4 ${theme.borderColor} rounded-r-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out`}>
      <button
        onClick={onToggle}
        className={`w-full text-left p-5 ${theme.color} hover:bg-opacity-90 focus:outline-none flex justify-between items-center transition-colors duration-300`}
      >
        <h3 className="text-xl font-semibold text-gray-800 font-serif">{theme.title}</h3>
        <div className="transform transition-transform duration-300">
          {isOpen ? <ChevronsUp className="text-gray-700" /> : <ChevronsDown className="text-gray-600" />}
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-6 bg-white dark:bg-[#0A0D14]">
          <p className="text-gray-700 mb-5 italic border-l-2 border-gray-300 pl-4">{theme.content}</p>
          <div className="mb-6">
            <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center">
              <BarChart2 size={20} className="mr-2 text-gray-600"/>
              Key Concepts
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {theme.details.map((detail) => (
                <li key={uniqueId()}>{detail}</li>
              ))}
            </ul>
          </div>
          {theme.storiesAndExamples && (
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center">
                <BookOpen size={20} className="mr-2 text-gray-600"/>
                Stories, Examples & Anecdotes
              </h4>
              <ul className="space-y-3 text-gray-600">
                {theme.storiesAndExamples.map((story) => (
                  <li key={uniqueId()} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    {story}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function LittleBookBehavioralInvestingSummary() {
  const [openId, setOpenId] = useState('theme-1');

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <ArticleFrame slug="little-book-behavioral-investing-summary">
      {/* Executive Summary Section */}
      <section className="mb-16 bg-white dark:bg-[#0A0D14] p-8 rounded-xl shadow-xl border-t-4 border-[#A8672E] dark:border-[#D08F52]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">Executive Summary</h2>
        <p className="text-gray-700 leading-relaxed text-lg">{executiveSummary.content}</p>
      </section>

      {/* Key Themes Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-serif">Key Themes & Most Important Ideas</h2>
        <div>
          {keyThemes.map(theme => (
            <AccordionItem
              key={theme.id}
              theme={theme}
              isOpen={openId === theme.id}
              onToggle={() => handleToggle(theme.id)}
            />
          ))}
        </div>
      </section>
    </ArticleFrame>
  );
}
