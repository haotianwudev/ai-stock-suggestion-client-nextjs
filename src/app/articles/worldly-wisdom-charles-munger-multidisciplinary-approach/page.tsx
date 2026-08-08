'use client';

import { useState } from 'react';
import { ArticleFrame } from '@/components/articles/article-frame';

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
    <p className="text-xl italic text-gray-700">&ldquo;{text}&rdquo;</p>
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
        This briefing synthesizes the core principles from &ldquo;Poor Charlie&apos;s Almanack,&rdquo; the essential wit and wisdom of Charles T. Munger. Often described as Warren Buffett&apos;s &ldquo;silent partner,&rdquo; Munger champions a unique <Highlight>multidisciplinary approach</Highlight> to problem-solving. His philosophy is a masterclass in rationality, emphasizing continuous learning, objective self-criticism, and the avoidance of common psychological pitfalls.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Munger&apos;s wisdom is not merely theoretical but deeply practical, honed through a lifetime of rigorous application across diverse fields. From his modest Omaha childhood to his prodigious financial success, he has demonstrated that true understanding comes from stitching together insights from many disciplines into a coherent whole. This website explores the foundational ideas that constitute his powerful framework for thinking.
      </p>
    </ThemeCard>

    <ThemeCard title="What is an Almanack?">
      <p className="text-gray-700 leading-relaxed mb-4">
        The title &ldquo;Poor Charlie&apos;s Almanack&rdquo; is a tribute to Benjamin Franklin&apos;s famous &ldquo;Poor Richard&apos;s Almanack,&rdquo; which was published for 25 years in the American colonies. Historically, an almanac was an annual publication containing a calendar, weather forecasts, astronomical data, and other practical information.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Franklin, however, enriched his almanac with a wealth of proverbs, witty sayings, and practical advice, turning it into a beloved source of wisdom. In the same spirit, &ldquo;Poor Charlie&apos;s Almanack&rdquo; is a compilation of Charles Munger&apos;s most important ideas, delivered through his speeches and writings. It is a modern collection of <Highlight color="blue">timeless, practical wisdom</Highlight> for navigating business and life.
      </p>
    </ThemeCard>

    <ThemeCard title="A Guide to Reading 'Poor Charlie's Almanack'" content="Approaching this book is not like reading a novel; it's an exercise in mental cultivation. Here are some suggestions for getting the most out of it:">
      <ul className="list-disc list-inside text-gray-600 space-y-3 mt-4">
        <li><strong>Read Slowly and Actively:</strong> Don&apos;t rush. Pause to think about the concepts. Munger&apos;s ideas are dense and often counterintuitive. Ask yourself how his mental models apply to your own experiences.</li>
        <li><strong>Embrace Redundancy:</strong> Munger purposefully repeats his core ideas in different contexts. He believes that for deep &ldquo;fluency,&rdquo; <Highlight color="blue">repetition is the heart of instruction</Highlight>. Pay attention to how the same concept is applied to different problems.</li>
        <li><strong>Focus on the &ldquo;Why&rdquo;:</strong> Munger constantly asks &ldquo;Why?&rdquo;. This is the cornerstone of his method. For every principle or story, try to understand the underlying reasons for its effectiveness.</li>
        <li><strong>Make Friends with the &ldquo;Eminent Dead&rdquo;:</strong> Munger learns from figures like Benjamin Franklin, Samuel Johnson, and Einstein. Think of the book as a conversation with some of history&apos;s greatest minds.</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="A Glimpse into the Man: The Making of a Worldly Wiseman" content="The Almanack is not just a collection of ideas, but a reflection of a remarkable life.">
      <p className="text-gray-700 leading-relaxed mb-4">
        Charlie Munger&apos;s journey began in Omaha, Nebraska, where as a teenager he worked at Buffett &amp; Son, a grocery store owned by Warren Buffett&apos;s grandfather. There, he learned early lessons about hard work and the &ldquo;evils of socialism&rdquo; from the strict disciplinarian, Ernest Buffett.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        His life was marked by both intellectual triumphs and profound personal tragedy. He endured the loss of his nine-year-old son, Teddy, to leukemia&mdash;a devastating experience that shaped his perspective. A friend remembers Charlie visiting his dying son and then <Highlight color="blue">walking the streets of Pasadena crying</Highlight>. Yet, he persevered, channeling his energy into learning and building.
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
        <li><strong>Interdisciplinary Thinking:</strong> He criticizes academia for its <Highlight>&ldquo;extreme balkanization into disciplines&rdquo;</Highlight> and argues that real-world problems cross these artificial boundaries. &ldquo;If the facts don&apos;t hang together on a latticework of theory, you don&apos;t have them in a usable form.&rdquo;</li>
        <li><strong>Multiple Models:</strong> Relying on one or two models is a disaster. &ldquo;You become the equivalent of a chiropractor, who, of course, is the great boob in medicine.&rdquo;</li>
        <li><strong>Key Disciplines:</strong> He draws heavily from Mathematics (&ldquo;If you don&apos;t get this...mathematics of elementary probability into your repertoire, then you go through a long life like a <Highlight color="yellow">one legged man in an ass kicking contest</Highlight>.&rdquo;), Physics (breakpoints, critical mass), Biology (Darwinian synthesis), Psychology (cognitive biases), and Microeconomics (advantages of scale).</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="The Power of Inversion" content="A powerful problem-solving tool. Instead of asking how to achieve a goal, turn the question on its head and ask what to avoid. This was a technique he learned from the great algebraist Carl Jacobi.">
      <p className="text-gray-600 mb-4">
        In a famous commencement speech, instead of telling graduates how to be happy, Munger detailed the prescriptions for <Highlight color="blue">guaranteed misery in life</Highlight>: 1) Ingesting chemicals to alter mood, 2) Envy, and 3) Resentment. By knowing what causes failure, you know what to avoid. To improve India, Munger suggests first asking, <Highlight>&ldquo;How can I hurt India?&rdquo;</Highlight> This approach helps identify pitfalls in investing, business, and life.
      </p>
      <Quote text="All I want to know is where I'm going to die, so I'll never go there." author="Charles T. Munger" />
    </ThemeCard>

    <ThemeCard title="The Psychology of Human Misjudgment" content="Munger believes a deep understanding of cognitive biases is 'an ungodly important subject.' He compiled a checklist of 25 standard causes of human misjudgment. He criticizes psychology textbooks for their lack of synthesis and for ignoring crucial concepts like envy and denial. A key concept is the Lollapalooza Effect, where multiple biases act in concert to produce extreme outcomes.">
      <ul className="list-disc list-inside text-gray-600 space-y-4 mt-4">
        <li><strong>Reward- and Punishment-Superresponse Tendency:</strong> &ldquo;Perhaps the most important rule in management is &lsquo;Get the incentives right.&rsquo;&rdquo; He cites <Highlight>Federal Express</Highlight>, which solved its late-night sorting problem by paying workers by the shift, not the hour. At <Highlight color="blue">Xerox</Highlight>, Joe Wilson discovered a new machine was selling poorly because the sales commission structure perversely incentivized selling the older, inferior model.</li>
        <li><strong>Incentive-Caused Bias:</strong> The subconscious bias where &ldquo;what is good for the professional is good for the client.&rdquo; Munger tells the story of a surgeon who performed an excessive number of gallbladder removals. The surgeon wasn&apos;t consciously fraudulent; he had rationalized that the gallbladder was the <Highlight color="blue">&ldquo;source of all medical evil,&rdquo;</Highlight> a belief conveniently aligned with his financial self-interest.</li>
        <li><strong>Deprival-Superreaction Tendency:</strong> The irrational and intense reaction to loss. This explains why gamblers dig deeper holes and why Coca-Cola&apos;s &ldquo;New Coke&rdquo; launch was a fiasco&mdash;customers felt the original formula was being <Highlight color="yellow">taken away from them</Highlight>.</li>
        <li><strong>Social-Proof Tendency:</strong> The automatic tendency to think and act as others do. This can lead to herd mentality and contagious bad behavior, such as the <Highlight>&ldquo;Serpico syndrome&rdquo;</Highlight> where honest police officers face ostracism in a corrupt department.</li>
        <li><strong>Authority-Misinfluence Tendency:</strong> The tendency to follow leaders, even when they are wrong, as starkly demonstrated in the famous <Highlight color="blue">Milgram experiment</Highlight>, where ordinary people administered what they thought were painful electric shocks under orders from an authority figure.</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="Investment Philosophy: Sit-on-Your-Ass Investing" content="Munger's approach is disciplined, focused, and long-term. He famously influenced Buffett to evolve from Ben Graham's 'cigar butt' investing (buying mediocre businesses at cheap prices) to focusing on great businesses.">
      <ul className="list-disc list-inside text-gray-600 space-y-3">
        <li><strong>Focus, Not Diversification:</strong> &ldquo;A portfolio of three companies is plenty of diversification.&rdquo; They &ldquo;bet big when they have the odds.&rdquo;</li>
        <li><strong>&ldquo;Near Cinch&rdquo; Opportunities:</strong> They look for <Highlight>&ldquo;1-foot fences with big rewards on the other side,&rdquo;</Highlight> not for solving hard problems.</li>
        <li><strong>Great Businesses at Fair Prices:</strong> Seek dominant franchises with sustainable competitive advantages, or <Highlight>&ldquo;moats,&rdquo;</Highlight> like Coca-Cola, Gillette, and GEICO. Munger illustrates the opposite with a story about a textile business. When a new, more efficient loom was invented, Warren Buffett knew it was a bad investment, because in a commodity business, all the savings would be passed on to the customer, not the owner.</li>
        <li><strong>Avoid &ldquo;Febezzlement&rdquo;:</strong> A term Munger coined for the &ldquo;functional equivalent of embezzlement,&rdquo; referring to the wealth stripped away by the unnecessary costs of high-priced investment management.</li>
      </ul>
    </ThemeCard>

    <ThemeCard title="Ethics and Practical Morality" content="For Munger, ethics are not a separate category but are interwoven with worldly wisdom. He warns against 'heavy ideology' which 'makes you a bit nuts' and turns one into a 'lousy thinker.'">
      <ul className="list-disc list-inside text-gray-600 space-y-3 mt-4">
        <li><Highlight color="green">&ldquo;Deserve What You Want&rdquo;:</Highlight> &ldquo;The safest way to try to get what you want is to try to deserve what you want. It&apos;s such a simple idea. It&apos;s the golden rule.&rdquo;</li>
        <li><Highlight color="green">Reliability:</Highlight> &ldquo;If you&apos;re unreliable, it doesn&apos;t matter what your virtues are, you&apos;re going to crater immediately.&rdquo; He praises McDonald&apos;s for teaching reliability to millions of teenagers in their first jobs.</li>
        <li><Highlight color="green">Avoiding &ldquo;Slop&rdquo;:</Highlight> Munger believes systems should be designed to be &ldquo;hard to cheat.&rdquo; He criticizes laws that make fraud easy, like California&apos;s workers&apos; compensation system, which he says leads to a widespread &ldquo;miasma of disastrous behavior.&rdquo;</li>
        <li><strong>Tolerating Unfairness for the Greater Good:</strong> He cites the Navy&apos;s <Highlight color="blue">&ldquo;no-fault&rdquo; rule</Highlight> for captains whose ships run aground. While potentially unfair to an individual captain, the strict rule enhances the safety of the entire system by making every captain hyper-vigilant.</li>
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
          <li>&bull; <strong>Long-term Thinking:</strong> &ldquo;Our favorite holding period is forever&rdquo;</li>
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

export default function MungerWisdomArticle() {
  const [activeTab, setActiveTab] = useState('themes');

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
    <ArticleFrame slug="worldly-wisdom-charles-munger-multidisciplinary-approach">
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
    </ArticleFrame>
  );
}

