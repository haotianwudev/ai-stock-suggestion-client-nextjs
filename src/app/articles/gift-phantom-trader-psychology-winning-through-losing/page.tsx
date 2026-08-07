'use client';

import React, { useState } from 'react';
import { Ghost, TrendingUp, ShieldAlert, Brain, ArrowRight, Activity, Clock, Target, Zap, BookOpen, Scale, Users, Lightbulb, CheckCircle2, XCircle, Music, Download } from 'lucide-react';
import { articles } from '@/data/articles';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function PhantomTrader() {
  const [activeRule, setActiveRule] = useState<number | null>(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  const currentArticle = articles.find(article => article.slug === 'gift-phantom-trader-psychology-winning-through-losing');

  const rules = [
    {
      id: 1,
      number: "01",
      title: "The Assumption of Error",
      icon: <ShieldAlert className="w-8 h-8 text-rose-500" />,
      color: "bg-rose-50 border-rose-200",
      accent: "text-rose-600",
      desc: "In a losing game such as trading, we shall start against the majority and assume we are wrong until proven correct.",
      detail: "Positions established must be reduced and removed until or unless the market proves the position correct. Do not wait for a stop-loss. If the market stagnates, exit. Your entry is not a claim of prophecy; it is a hypothesis awaiting validation."
    },
    {
      id: 2,
      number: "02",
      title: "Press Your Winners",
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-200",
      accent: "text-emerald-600",
      desc: "Press your winners correctly without exception. Use the 3:2:1 pyramiding ratio.",
      detail: "Add to positions only when the market confirms your thesis. Use floating profits to finance increased exposure. Never average down on a loser. A winner that isn't pressed is a wasted opportunity."
    },
    {
      id: 3,
      number: "03",
      title: "The Exit Protocol",
      icon: <Zap className="w-8 h-8 text-violet-500" />,
      color: "bg-violet-50 border-violet-200",
      accent: "text-violet-600",
      desc: "Let the market prove us correct to stay, but acknowledge when it no longer proves us correct to exit.",
      detail: "Exit into strength and liquidity. The big money is on the 'surprise side'. Don't wait for the trend to fully reverse before taking profits. If the market stops going up, don't wait for it to go down—just get out."
    }
  ];

  const comparisons = [
    {
      feature: "Mindset",
      standard: "I must be right to make money.",
      phantom: "I must lose small to make money."
    },
    {
      feature: "Losing Positions",
      standard: "Hold and hope it comes back (Averaging Down).",
      phantom: "Cut immediately if not proven correct."
    },
    {
      feature: "Winning Positions",
      standard: "Take quick profits out of fear.",
      phantom: "Add to the winner (Pyramiding)."
    },
    {
      feature: "Market View",
      standard: "Predicting the future.",
      phantom: "Reacting to the present."
    }
  ];

  return (
    <ArticleFrame slug="gift-phantom-trader-psychology-winning-through-losing">
      <div className="max-w-4xl mx-auto mb-16">
        <InfographicSlot url="https://i.imgur.com/2t7ko8v.jpeg" alt="The Gift of the Phantom Trader Infographic" />
      </div>

      <div className="max-w-5xl mx-auto">
          {/* Origins & Credibility */}
          <section className="py-12 bg-white border-b border-slate-100 rounded-2xl mb-8">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h3 className="text-sm font-bold tracking-widest text-indigo-500 uppercase mb-4">The Origin Story</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                In the late 1990s, a legendary trader known only as <span className="font-bold text-slate-900">"The Phantom of the Pits"</span> began posting on the <em>Futures Magazine</em> forums. Later revealed to be Art Simpson, a veteran with 40+ years of experience, his gift was not a "system" of indicators, but a psychological framework for survival. He taught that trading is a losing game, and only those who master losing can win.
              </p>
            </div>
          </section>

          {/* The Core Shift Section */}
          <section className="py-16 px-6 bg-slate-50 rounded-2xl mb-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-slate-900">The "Losing Game" Paradigm</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Most traders operate under the assumption that they are correct until proven wrong. They hold losers hoping for a turnaround. The Phantom inverts this polarity. To survive in the pits, you must assume you are <span className="font-bold text-rose-500">wrong until proven correct</span>.
                  </p>
                  <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-500" />
                      The Execution Gap
                    </h3>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 p-4 rounded-xl">
                      <span>Correct Knowledge</span>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                      <span className="text-rose-500 line-through">Success</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-800 bg-indigo-50 p-4 rounded-xl mt-2 border border-indigo-100">
                      <span>Correct Behavior</span>
                      <ArrowRight className="w-4 h-4 text-indigo-400" />
                      <span className="text-indigo-600">Success</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-3xl transform rotate-3 opacity-10"></div>
                  <div className="bg-white rounded-3xl p-10 shadow-2xl relative border border-slate-100">
                    <h3 className="text-2xl font-bold mb-6 text-slate-900">The Best Loser Philosophy</h3>
                    <blockquote className="text-xl italic text-slate-600 mb-6 border-l-4 border-indigo-500 pl-4">
                      "The Best Loser is the Long-Term Winner. Losing is not a failure of character; it is the overhead cost of doing business."
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl">👻</div>
                      <div>
                        <div className="font-bold text-slate-900">Phantom of the Pits</div>
                        <div className="text-sm text-slate-500">Futures Talk Forum, c. 1997</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="py-12 px-6 bg-white rounded-2xl mb-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">The Behavioral Shift</h2>
                <p className="text-slate-500">Why the majority fail and the Phantom succeeds.</p>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                    <div className="flex items-center gap-3 font-bold text-slate-700 uppercase tracking-wide text-sm md:text-base">
                      <Scale className="w-5 h-5 text-indigo-400" />
                      {item.feature}
                    </div>
                    <div className="flex items-center gap-3 text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base">{item.standard}</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm md:text-base font-medium">{item.phantom}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Rules Section */}
          <section className="py-16 bg-slate-50 relative overflow-hidden rounded-2xl mb-8">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 skew-x-12 transform origin-top-right pointer-events-none"></div>
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">The Three Laws of Survival</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">These rules are designed to strip away the ego and protect capital.</p>
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                {rules.map((rule) => (
                  <div 
                    key={rule.id}
                    className={`group relative p-8 rounded-3xl transition-all duration-300 border hover:-translate-y-2 cursor-pointer ${
                      activeRule === rule.id 
                        ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-2xl scale-105 z-20' 
                        : 'shadow-lg hover:shadow-xl'
                    } ${rule.color} bg-opacity-40 hover:bg-opacity-100 bg-white`}
                    onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl bg-white shadow-sm ${rule.accent}`}>
                        {rule.icon}
                      </div>
                      <span className={`text-6xl font-black opacity-10 ${rule.accent}`}>
                        {rule.number}
                      </span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 ${rule.accent}`}>
                      {rule.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm font-medium">
                      {rule.desc}
                    </p>
                    <div className={`overflow-hidden transition-all duration-500 ${
                      activeRule === rule.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-slate-600 pt-4 border-t border-slate-200/60 leading-relaxed">
                        {rule.detail}
                      </p>
                    </div>
                    <div className={`mt-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${rule.accent} opacity-60 group-hover:opacity-100 transition-opacity`}>
                      {activeRule === rule.id ? 'Click to collapse' : 'Click to learn more'}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Surprise Side */}
          <section className="py-16 px-6 bg-indigo-900 text-white overflow-hidden relative rounded-2xl mb-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-900 to-slate-900"></div>
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wider text-sm border border-indigo-700 px-3 py-1 rounded-full">
                    <Lightbulb className="w-4 h-4" />
                    Advanced Concept
                  </div>
                  <h2 className="text-4xl font-bold">The Surprise Side</h2>
                  <p className="text-xl text-indigo-100 font-light leading-relaxed">
                    "The market will do whatever it has to do to prove the majority wrong."
                  </p>
                  <div className="space-y-4 text-slate-300">
                    <p>The Phantom teaches that big moves happen when the majority is trapped on the wrong side. When they are forced to liquidate, their exit orders fuel the trend in the opposite direction.</p>
                    <p>If a bullish report comes out and the market does not go up, the <span className="text-white font-bold border-b border-indigo-500">surprise side</span> is down. This is often the most explosive move because long holders are trapped.</p>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    The Small Trader's Advantage
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400"></div>
                      <p className="text-sm text-slate-300">
                        <span className="text-white font-semibold">Speed:</span> A small trader can exit a position instantly. A giant fund takes days to unload. Use this speed to abide by Rule 1 strictly.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400"></div>
                      <p className="text-sm text-slate-300">
                        <span className="text-white font-semibold">Invisibility:</span> Your orders do not move the market. You can slide in and out of the "Surprise Side" without detection.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400"></div>
                      <p className="text-sm text-slate-300">
                        <span className="text-white font-semibold">Adaptability:</span> You can reverse position in seconds. The Phantom urges small traders to never mimic the "buy and hold" strategies of institutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Pyramid Strategy */}
          <section className="py-16 px-6 bg-slate-900 text-white overflow-hidden border-t border-slate-800 rounded-2xl mb-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div className="relative order-2 md:order-1">
                  {/* Abstract Pyramid Visual */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-32 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-[0_0_30px_rgba(52,211,153,0.4)] flex items-center justify-center transform hover:scale-105 transition-transform">
                      <span className="font-bold text-lg">1 Unit</span>
                    </div>
                    <div className="w-48 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center opacity-90">
                      <span className="font-bold text-lg">2 Units</span>
                    </div>
                    <div className="w-64 h-24 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-lg flex items-center justify-center opacity-80">
                      <div className="text-center">
                        <span className="font-bold text-lg block">3 Units</span>
                        <span className="text-xs uppercase tracking-widest opacity-70">Initial Entry</span>
                      </div>
                    </div>
                  </div>
                  {/* Background Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px]"></div>
                </div>
                <div className="space-y-8 order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-sm">
                    <Activity className="w-4 h-4" />
                    Strategy Mechanic
                  </div>
                  <h2 className="text-4xl font-bold">The 3:2:1 Pyramiding Ratio</h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    While Rule 1 ensures survival, Rule 2 ensures prosperity. The Phantom's method creates an inverted pyramid where the largest position is at the best price.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1 font-bold">1</div>
                      <p className="text-slate-300">
                        <span className="text-white font-semibold">Initial Entry (3 Units):</span> Enter small compared to account size, but large relative to the pyramid. Assume you are wrong immediately.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1 font-bold">2</div>
                      <p className="text-slate-300">
                        <span className="text-white font-semibold">Validation (2 Units):</span> Add only if the market confirms the trend. This add is funded entirely by the floating profits of the first 3 units.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1 font-bold">3</div>
                      <p className="text-slate-300">
                        <span className="text-white font-semibold">Extension (1 Unit):</span> The final addition. If the trend reverses, the weighted average price ensures you still leave with a profit or small scratch.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Routine Section */}
          <section className="py-16 px-6 bg-indigo-50 rounded-2xl mb-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Behavior Modification Routine</h2>
              <p className="text-slate-500 mt-4">The Phantom treats trading as a performance sport requiring physiological readiness.</p>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100 flex items-start gap-6 hover:shadow-md transition-shadow">
                <div className="bg-orange-100 p-4 rounded-xl text-orange-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Physical Activation</h3>
                  <p className="text-slate-600 text-sm">10-20 minutes of exercise at least one hour before the open. Oxygenates the brain and reduces stress hormones (cortisol) for rapid decision making.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100 flex items-start gap-6 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Spiritual Grounding</h3>
                  <p className="text-slate-600 text-sm">Giving thanks to a higher power reduces the ego. Acknowledging lack of control over the market makes accepting losses easier. "I am not the master of the market."</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100 flex items-start gap-6 hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-4 rounded-xl text-purple-600">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Rule Rehearsal</h3>
                  <p className="text-slate-600 text-sm">Visualize taking a loss before the market opens. Desensitize the fear response so you can execute Rule 1 without hesitation. Say aloud: "I will cut my loss."</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100 flex items-start gap-6 hover:shadow-md transition-shadow">
                <div className="bg-pink-100 p-4 rounded-xl text-pink-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">The Time Stop</h3>
                  <p className="text-slate-600 text-sm">If the market goes sideways, it has failed to prove you correct. Exit. Do not wait for a technical stop to be hit. Stagnation is invalidation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Book Download Section */}
          <section className="py-12 px-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl mb-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Get the Complete Book</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                Download the "Phantom of the Pits" book that contains Art Simpson's complete trading philosophy and methodology. This legendary work has guided countless traders to profitability.
              </p>
              <a 
                href="https://tradertom.com/resource/the-phantom-of-the-pits/"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white font-bold py-6 px-12 rounded-xl text-xl hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="inline mr-3 w-6 h-6" />
                Download "Phantom of the Pits"
              </a>
              <p className="text-sm text-slate-500 mt-4">Free download courtesy of TraderTom.com</p>
            </div>
          </section>

          {/* Podcast Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl my-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Listen to the Podcast</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Dive deeper into the Phantom's philosophy with our comprehensive podcast episode covering the key concepts and practical applications.
            </p>
            <div className="flex justify-center">
              {currentArticle?.podcastUrl && (
                <a 
                  href={currentArticle.podcastUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <Music className="inline mr-2" />
                  Listen to Podcast
                </a>
              )}
            </div>
          </div>
      </div>
    </ArticleFrame>
  );
}