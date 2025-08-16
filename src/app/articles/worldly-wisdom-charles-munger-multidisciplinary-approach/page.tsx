'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for icons
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

// Card component for displaying main themes
const ThemeCard = ({ title, content, children }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    {content && <p className="text-gray-600 mb-4 leading-relaxed">{content}</p>}
    {children}
  </div>
);

// Quote component
const Quote = ({ text, author }) => (
  <blockquote className="bg-gray-100 border-l-4 border-blue-800 p-6 my-6 rounded-r-lg shadow-sm">
    <p className="text-xl italic text-gray-700">"{text}"</p>
    <cite className="block text-right text-gray-600 mt-3 font-semibold">- {author}</cite>
  </blockquote>
);

// Highlight component for key terms
const Highlight = ({ children, color = 'yellow' }) => {
  const colors = {
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
  };
  return <span className={`px-2 py-1 rounded-md font-semibold ${colors[color]}`}>{children}</span>;
};

export default function MungerWisdomArticle() {
  const [activeTab, setActiveTab] = useState('themes');
  const currentArticle = articles.find(article => article.slug === 'worldly-wisdom-charles-munger-multidisciplinary-approach');

  const renderContent = () => {
    switch (activeTab) {
      case 'introduction':
        return <IntroductionContent />;
      case 'themes':
        return <ThemesContent />;
      case 'quotes':
        return <QuotesContent />;
      default:
        return <IntroductionContent />;
    }
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

      <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
        {/* Return to Home Button */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Badges */}
        <div className="relative">
          {/* Deep Research Badge - Top Left */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              Deep Research
            </span>
          </div>
          
          {/* Podcast Badge - Top Right */}
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <Music className="w-3 h-3 mr-1" />
              Podcast
            </span>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">The Worldly Wisdom of Charles T. Munger</h1>
            <p className="text-xl text-gray-600 mt-4">A Multidisciplinary Approach to Life, Learning, and Decision-Making</p>
          </div>

          {/* YouTube Video Section */}
          {
            <div className="mb-12 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Watch: Charlie Munger's Wisdom in Action</h2>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/5qiescI6ZiA?si=I2QcIBz1_3sMIMp9`}
                  title="Charlie Munger Wisdom Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                ></iframe>
              </div>
              <p className="text-gray-600 text-center mt-4">
                Explore Charlie Munger's timeless wisdom and mental models in this comprehensive video discussion.
              </p>
            </div>
          }

          <div className="bg-white rounded-lg shadow-md mb-8 sticky top-0 z-10">
            <nav className="flex justify-center p-2 space-x-1 md:space-x-4">
              <TabButton title="Introduction" isActive={activeTab === 'introduction'} onClick={() => setActiveTab('introduction')} />
              <TabButton title="Main Themes" isActive={activeTab === 'themes'} onClick={() => setActiveTab('themes')} />
              <TabButton title="Key Quotes" isActive={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')} />
            </nav>
          </div>

          <div className="animate-fade-in">
            {renderContent()}
          </div>

          {/* Call to Action Section */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-800 to-blue-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Continue Your Learning Journey</h2>
            <p className="text-xl mb-6">Dive deeper into Charlie Munger's wisdom with our podcast discussion</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.youtubeUrl && (
                <a 
                  href={currentArticle.youtubeUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <svg className="inline mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
                </a>
              )}
              
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
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-400">
              <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const TabButton = ({ title, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-2 text-sm md:text-base font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${
      isActive ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'
    }`}
  >
    {title}
  </button>
);

const IntroductionContent = () => (
  <div className="space-y-8">
    <ThemeCard title="Executive Summary">
      <p className="text-gray-700 leading-relaxed mb-4">
        This briefing synthesizes the core principles from "Poor Charlie's Almanack," the essential wit and wisdom of Charles T. Munger. Often described as Warren Buffett's "silent partner," Munger champions a unique <Highlight>multidisciplinary approach</Highlight> to problem-solving. His philosophy is a masterclass in rationality, emphasizing continuous learning, objective self-criticism, and the avoidance of common psychological pitfalls.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Munger's wisdom is not merely theoretical but deeply practical, honed through a lifetime of rigorous application across diverse fields. From his modest Omaha childhood to his prodigious financial success, he has demonstrated that true understanding comes from stitching together insights from many disciplines into a coherent whole. This website explores the foundational ideas that constitute his powerful framework for thinking.
      </p>
    </ThemeCard>

    <ThemeCard title="What is an Almanack?">
      <p className="text-gray-700 leading-relaxed mb-4">
        The title "Poor Charlie's Almanack" is a tribute to Benjamin Franklin's famous "Poor Richard's Almanack," which was published for 25 years in the American colonies. Historically, an almanac was an annual publication containing a calendar, weather forecasts, astronomical data, and other practical information.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Franklin, however, enriched his almanac with a wealth of proverbs, witty sayings, and practical advice, turning it into a beloved source of wisdom. In the same spirit, "Poor Charlie's Almanack" is a compilation of Charles Munger's most important ideas, delivered through his speeches and writings. It is a modern collection of <Highlight color="blue">timeless, practical wisdom</Highlight> for navigating business and life.
      </p>
    </ThemeCard>

    <ThemeCard title="A Guide to Reading 'Poor Charlie's Almanack'" content="Approaching this book is not like reading a novel; it's an exercise in mental cultivation. Here are some suggestions for getting the most out of it:">
      <ul className="list-disc list-inside text-gray-600 space-y-3 mt-4">
        <li><strong>Read Slowly and Actively:</strong> Don't rush. Pause to think about the concepts. Munger's ideas are dense and often counterintuitive. Ask yourself how his mental models apply to your own experiences.</li>
        <li><strong>Embrace Redundancy:</strong> Munger purposefully repeats his core ideas in different contexts. He believes that for deep "fluency," <Highlight color="blue">repetition is the heart of instruction</Highlight>. Pay attention to how the same concept is applied to different problems.</li>
        <li><strong>Focus on the "Why":</strong> Munger constantly asks "Why?". This is the cornerstone of his method. For every principle or story, try to understand the underlying reasons for its effectiveness.</li>
        <li><strong>Make Friends with the "Eminent Dead":</strong> Munger learns from figures like Benjamin Franklin, Samuel Johnson, and Einstein. Think of the book as a conversation with some of history's greatest minds.</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="A Glimpse into the Man: The Making of a Worldly Wiseman" content="The Almanack is not just a collection of ideas, but a reflection of a remarkable life.">
      <p className="text-gray-700 leading-relaxed mb-4">
        Charlie Munger's journey began in Omaha, Nebraska, where as a teenager he worked at Buffett & Son, a grocery store owned by Warren Buffett's grandfather. There, he learned early lessons about hard work and the "evils of socialism" from the strict disciplinarian, Ernest Buffett.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        His life was marked by both intellectual triumphs and profound personal tragedy. He endured the loss of his nine-year-old son, Teddy, to leukemia—a devastating experience that shaped his perspective. A friend remembers Charlie visiting his dying son and then <Highlight color="blue">walking the streets of Pasadena crying</Highlight>. Yet, he persevered, channeling his energy into learning and building.
      </p>
      <p className="text-gray-700 leading-relaxed">
        He eventually left a successful law career, encouraged by Warren Buffett, who told him that law was a fine hobby but that Charlie could do much better. Their partnership, built on a handshake, would become one of the most successful in business history.
      </p>
    </ThemeCard>
  </div>
);

const ThemesContent = () => (
  <div className="space-y-8">
    <ThemeCard title="The Latticework of Mental Models" content="This is Munger's foundational concept. To achieve 'worldly wisdom,' you must acquire the big ideas from the big disciplines and hang them on a 'latticework' in your head.">
      <ul className="list-disc list-inside text-gray-600 space-y-3">
        <li><strong>Interdisciplinary Thinking:</strong> He criticizes academia for its <Highlight>"extreme balkanization into disciplines"</Highlight> and argues that real-world problems cross these artificial boundaries. "If the facts don't hang together on a latticework of theory, you don't have them in a usable form."</li>
        <li><strong>Multiple Models:</strong> Relying on one or two models is a disaster. "You become the equivalent of a chiropractor, who, of course, is the great boob in medicine."</li>
        <li><strong>Key Disciplines:</strong> He draws heavily from Mathematics ("If you don't get this...mathematics of elementary probability into your repertoire, then you go through a long life like a <Highlight color="yellow">one legged man in an ass kicking contest</Highlight>."), Physics (breakpoints, critical mass), Biology (Darwinian synthesis), Psychology (cognitive biases), and Microeconomics (advantages of scale).</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="The Power of Inversion" content="A powerful problem-solving tool. Instead of asking how to achieve a goal, turn the question on its head and ask what to avoid. This was a technique he learned from the great algebraist Carl Jacobi.">
      <p className="text-gray-600 mb-4">
        In a famous commencement speech, instead of telling graduates how to be happy, Munger detailed the prescriptions for <Highlight color="blue">guaranteed misery in life</Highlight>: 1) Ingesting chemicals to alter mood, 2) Envy, and 3) Resentment. By knowing what causes failure, you know what to avoid. To improve India, Munger suggests first asking, <Highlight>"How can I hurt India?"</Highlight> This approach helps identify pitfalls in investing, business, and life.
      </p>
      <Quote text="All I want to know is where I'm going to die, so I'll never go there." author="Charles T. Munger" />
    </ThemeCard>

    <ThemeCard title="The Psychology of Human Misjudgment" content="Munger believes a deep understanding of cognitive biases is 'an ungodly important subject.' He compiled a checklist of 25 standard causes of human misjudgment. He criticizes psychology textbooks for their lack of synthesis and for ignoring crucial concepts like envy and denial. A key concept is the Lollapalooza Effect, where multiple biases act in concert to produce extreme outcomes.">
      <ul className="list-disc list-inside text-gray-600 space-y-4 mt-4">
        <li><strong>Reward- and Punishment-Superresponse Tendency:</strong> "Perhaps the most important rule in management is 'Get the incentives right.'" He cites <Highlight>Federal Express</Highlight>, which solved its late-night sorting problem by paying workers by the shift, not the hour. At <Highlight color="blue">Xerox</Highlight>, Joe Wilson discovered a new machine was selling poorly because the sales commission structure perversely incentivized selling the older, inferior model.</li>
        <li><strong>Incentive-Caused Bias:</strong> The subconscious bias where "what is good for the professional is good for the client." Munger tells the story of a surgeon who performed an excessive number of gallbladder removals. The surgeon wasn't consciously fraudulent; he had rationalized that the gallbladder was the <Highlight color="blue">"source of all medical evil,"</Highlight> a belief conveniently aligned with his financial self-interest.</li>
        <li><strong>Deprival-Superreaction Tendency:</strong> The irrational and intense reaction to loss. This explains why gamblers dig deeper holes and why Coca-Cola's "New Coke" launch was a fiasco—customers felt the original formula was being <Highlight color="yellow">taken away from them</Highlight>.</li>
        <li><strong>Social-Proof Tendency:</strong> The automatic tendency to think and act as others do. This can lead to herd mentality and contagious bad behavior, such as the <Highlight>"Serpico syndrome"</Highlight> where honest police officers face ostracism in a corrupt department.</li>
        <li><strong>Authority-Misinfluence Tendency:</strong> The tendency to follow leaders, even when they are wrong, as starkly demonstrated in the famous <Highlight color="blue">Milgram experiment</Highlight>, where ordinary people administered what they thought were painful electric shocks under orders from an authority figure.</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="Investment Philosophy: Sit-on-Your-Ass Investing" content="Munger's approach is disciplined, focused, and long-term. He famously influenced Buffett to evolve from Ben Graham's 'cigar butt' investing (buying mediocre businesses at cheap prices) to focusing on great businesses.">
      <ul className="list-disc list-inside text-gray-600 space-y-3">
        <li><strong>Focus, Not Diversification:</strong> "A portfolio of three companies is plenty of diversification." They "bet big when they have the odds."</li>
        <li><strong>"Near Cinch" Opportunities:</strong> They look for <Highlight>"1-foot fences with big rewards on the other side,"</Highlight> not for solving hard problems.</li>
        <li><strong>Great Businesses at Fair Prices:</strong> Seek dominant franchises with sustainable competitive advantages, or <Highlight>"moats,"</Highlight> like Coca-Cola, Gillette, and GEICO. Munger illustrates the opposite with a story about a textile business. When a new, more efficient loom was invented, Warren Buffett knew it was a bad investment, because in a commodity business, all the savings would be passed on to the customer, not the owner.</li>
        <li><strong>Avoid "Febezzlement":</strong> A term Munger coined for the "functional equivalent of embezzlement," referring to the wealth stripped away by the unnecessary costs of high-priced investment management.</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="Ethics and Practical Morality" content="For Munger, ethics are not a separate category but are interwoven with worldly wisdom. He warns against 'heavy ideology' which 'makes you a bit nuts' and turns one into a 'lousy thinker.'">
      <ul className="list-disc list-inside text-gray-600 space-y-3 mt-4">
        <li><Highlight color="green">"Deserve What You Want":</Highlight> "The safest way to try to get what you want is to try to deserve what you want. It's such a simple idea. It's the golden rule."</li>
        <li><Highlight color="green">Reliability:</Highlight> "If you're unreliable, it doesn't matter what your virtues are, you're going to crater immediately." He praises McDonald's for teaching reliability to millions of teenagers in their first jobs.</li>
        <li><Highlight color="green">Avoiding "Slop":</Highlight> Munger believes systems should be designed to be "hard to cheat." He criticizes laws that make fraud easy, like California's workers' compensation system, which he says leads to a widespread "miasma of disastrous behavior."</li>
        <li><strong>Tolerating Unfairness for the Greater Good:</strong> He cites the Navy's <Highlight color="blue">"no-fault" rule</Highlight> for captains whose ships run aground. While potentially unfair to an individual captain, the strict rule enhances the safety of the entire system by making every captain hyper-vigilant.</li>
      </ul>
    </ThemeCard>
  </div>
);

const QuotesContent = () => (
  <div className="bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Facts and Quotes</h2>
    <div className="space-y-6">
      <Quote text="In my whole life, I have known no wise people (over a broad subject matter area) who didn't read all the time – none, zero." author="Charles T. Munger" />
      
      <Quote text="It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent." author="Charles T. Munger" />
      
      <Quote text="I've never seen a management consultant's report that didn't end with the same advice: 'This problem needs more management consulting services.'" author="Charles T. Munger" />
      
      <Quote text="The iron rule of nature is: you get what you reward for. If you want ants to come, you put sugar on the floor." author="Charles T. Munger" />
      
      <Quote text="You're the easiest person to fool." author="Richard Feynman, cited by Munger" />
      
      <Quote text="Life and its various passages can be hard, brutally hard. The three things I have found helpful in coping with its challenges are: Have low expectations. Have a sense of humor. Surround yourself with the love of friends and family." author="Charles T. Munger" />

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-blue-800 mb-3">Key Investment Principles</h3>
        <ul className="space-y-2 text-gray-700">
          <li>&bull; <strong>Circle of Competence:</strong> Stay within your area of expertise</li>
          <li>&bull; <strong>Margin of Safety:</strong> Buy with a significant discount to intrinsic value</li>
          <li>&bull; <strong>Long-term Thinking:</strong> "Our favorite holding period is forever"</li>
          <li>&bull; <strong>Quality over Quantity:</strong> Focus on exceptional businesses</li>
          <li>&bull; <strong>Patience:</strong> Wait for the right opportunities</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
        <h3 className="text-xl font-bold text-green-800 mb-3">The Four Pillars of Worldly Wisdom</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h4 className="font-semibold text-green-700">1. Mental Models</h4>
            <p className="text-sm">Build a latticework of interdisciplinary knowledge</p>
          </div>
          <div>
            <h4 className="font-semibold text-green-700">2. Inversion</h4>
            <p className="text-sm">Think backwards to avoid failure</p>
          </div>
          <div>
            <h4 className="font-semibold text-green-700">3. Psychology</h4>
            <p className="text-sm">Understand cognitive biases and human misjudgment</p>
          </div>
          <div>
            <h4 className="font-semibold text-green-700">4. Ethics</h4>
            <p className="text-sm">Deserve what you want through reliability and integrity</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);