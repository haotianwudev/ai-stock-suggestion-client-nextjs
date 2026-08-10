'use client';

import { BookOpen, BrainCircuit, Briefcase, DollarSign, Home, TrendingUp, Users, Award, Lightbulb, AlertTriangle } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

interface StoryCardProps {
  icon: React.ReactNode;
  title: string;
  story: string;
  lesson: string;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-12 text-center font-serif">
    {children}
  </h2>
);

const StoryCard = ({ icon, title, story, lesson }: StoryCardProps) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden transform hover:-translate-y-2">
    <div className="p-8">
      <div className="flex items-center mb-6">
        <div className="bg-[#A8672E] dark:bg-[#D08F52] dark:bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-full p-3 mr-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight font-serif">{title}</h3>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">The Story</h4>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{story}</p>
        </div>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-gray-700/50 p-5 rounded-lg">
          <h4 className="font-semibold text-lg text-blue-800 dark:text-blue-300 mb-2 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Core Lesson
          </h4>
          <p className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] leading-relaxed">{lesson}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function RichDadPoorDadSummary() {
  const stories = [
    {
      icon: <Users size={28} />,
      title: "The Two Dads",
      story: "Robert Kiyosaki had two father figures: his highly educated but financially struggling 'poor dad' and his friend's father, a school dropout who became a wealthy entrepreneur, his 'rich dad'. They offered conflicting advice on money, with one advocating for a secure job and the other for financial independence.",
      lesson: "Traditional education teaches you to be an employee, while financial education teaches you to have money work for you. Financial literacy is the key to wealth, and it's a subject rarely taught in schools."
    },
    {
      icon: <DollarSign size={28} />,
      title: "The Counterfeit Nickels",
      story: "At age nine, Robert and his friend Mike tried to make money by melting lead toothpaste tubes to cast their own nickels. Though illegal, Robert's father praised their initiative and creativity, encouraging them not to quit their quest to learn about money.",
      lesson: "Making money requires creativity, initiative, and thinking outside the box of conventional employment. This early failure sparked their journey to seek financial mentorship from 'rich dad'."
    },
    {
      icon: <Briefcase size={28} />,
      title: "Working for Free",
      story: "Rich dad hired the boys for a pittance (10 cents/hour) and then had them work for free. This was designed to teach them that life pushes you around and to think beyond earning a paycheck. It forced them to see opportunities instead of just seeking a wage.",
      lesson: "The poor and middle class work for money; the rich have money work for them. Fear and greed control the financial decisions of most people, trapping them in the 'Rat Race'. Managing emotions is crucial for financial intelligence."
    },
    {
      icon: <BookOpen size={28} />,
      title: "The Comic Book Library",
      story: "Seeing an opportunity, the boys collected discarded comic books for free and opened a library in a basement, charging other kids admission. This business generated passive income, earning $9.50 a week without them having to be physically present.",
      lesson: "This was their first real asset. They learned how to create a business that generates money for you, even when you're not working. This is the essence of having money work for you."
    },
    {
      icon: <AlertTriangle size={28} />,
      title: "The Richest Businessmen of 1923",
      story: "A group of the wealthiest businessmen gathered in 1923. Twenty-five years later, after the Great Depression, most had lost their fortunes, died broke, or were imprisoned. Their wealth was not sustainable.",
      lesson: "Simply having money doesn't guarantee long-term security. Financial intelligence—knowing how to manage and grow money through economic shifts—is far more important than the amount of money you have."
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Adapting to Change",
      story: "Kiyosaki contrasts Western Union's failure to buy Alexander Graham Bell's telephone patent with a modern manager terrified of being downsized. The world changes rapidly, and what was once secure is no longer guaranteed.",
      lesson: "Clinging to old ideas and job security is risky in a fast-changing world. Financial IQ requires adapting, seeing new opportunities, and embracing change rather than fearing it."
    },
    {
      icon: <Home size={28} />,
      title: "The CASHFLOW Game",
      story: "A divorced woman playing the CASHFLOW board game got angry when it mirrored her real-life financial struggles—accumulating liabilities ('doodads') instead of assets. The game forced her to confront her own financial illiteracy.",
      lesson: "Experiential learning can powerfully reveal our hidden financial habits. True financial struggle often comes from not understanding the fundamental difference between an asset (puts money in your pocket) and a liability (takes money out)."
    },
    {
      icon: <Award size={28} />,
      title: "Talent is Not Enough",
      story: "A talented reporter wanted to be a best-selling author but was offended when Robert suggested she learn sales. He explained he was a 'best-selling' author, not a 'best-writing' author, because he understood marketing and sales.",
      lesson: "Specialized talent alone is not enough for financial success. You need a broad range of skills, especially sales, marketing, and financial literacy, to turn your talent into a profitable venture."
    },
    {
        icon: <BrainCircuit size={28} />,
        title: "Investing Desire to Foster Genius",
        story: "A friend's son wanted a car. Instead of buying it for him, his father gave him $3,000 to invest in stocks, challenging him to double it to buy the car. The son became deeply engaged in learning about investing, more interested in the 'game' than the car itself.",
        lesson: "Harnessing desire can be a powerful motivator for financial education. Learning to manage and grow money, even through small losses, builds financial intelligence and discipline from a young age."
    },
    {
        icon: <TrendingUp size={28} />,
        title: "College Savings through Real Estate",
        story: "Instead of slowly saving for college, a friend used a small sum to buy a foreclosed house, which generated cash flow. He then leveraged that asset into a larger one (a mini-storage facility), rapidly accelerating his path to his financial goal.",
        lesson: "Financial intelligence allows you to achieve goals much faster than traditional saving. Leveraging assets, understanding tax laws (like 1031 exchanges), and generating cash flow are powerful tools to build wealth."
    }
  ];

  return (
    <ArticleFrame
      slug="rich-dad-poor-dad-book-summary"
      additionalDisclaimer="This summary is for educational purposes only and does not constitute financial advice. The original book contains additional insights and context not covered here."
    >
      {/* Introduction Section */}
      <section className="mb-16 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 font-serif">A Tale of Two Mindsets</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          &ldquo;Rich Dad, Poor Dad&rdquo; is not just a book; it&apos;s a fundamental shift in perspective. Robert Kiyosaki&apos;s journey, guided by two distinct father figures, reveals a powerful truth: financial well-being isn&apos;t about how much you earn, but about how much you understand money. Below are the pivotal stories that illustrate the core philosophy of making money work for you.
        </p>
      </section>

      {/* Key Stories Section */}
      <section className="mb-16">
        <SectionTitle>The Stories That Teach</SectionTitle>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
          {stories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>
      </section>

      {/* Core Concepts Section */}
      <section>
        <SectionTitle>The Core Philosophy</SectionTitle>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 text-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <DollarSign className="mx-auto text-[#1D8A70] dark:text-[#3CBF9C] w-16 h-16 mb-4"/>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-serif">Assets vs. Liabilities</h3>
            <p className="text-gray-600 dark:text-gray-400">An <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">asset</span> puts money in your pocket. A <span className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">liability</span> takes money out. The rich acquire assets; the poor and middle class acquire liabilities they think are assets.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <BrainCircuit className="mx-auto text-[#A8672E] dark:text-[#D08F52] w-16 h-16 mb-4"/>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-serif">Financial IQ</h3>
            <p className="text-gray-600 dark:text-gray-400">It&apos;s not about being smart, it&apos;s about being financially smart. This requires knowledge of accounting, investing, markets, and law. It&apos;s about how much you keep, not how much you make.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <TrendingUp className="mx-auto text-[#A8672E] dark:text-[#D08F52] w-16 h-16 mb-4"/>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 font-serif">Work to Learn</h3>
            <p className="text-gray-600 dark:text-gray-400">Don&apos;t work for money; work to learn new skills. Job security is a thing of the past. Skill security&mdash;especially in sales, marketing, and communication&mdash;is the new path to financial freedom.</p>
          </div>
        </div>
      </section>
    </ArticleFrame>
  );
}
