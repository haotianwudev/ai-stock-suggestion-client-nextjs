'use client';

import { ArrowRight, ArrowLeft, BookOpen, BrainCircuit, Briefcase, DollarSign, Home, TrendingUp, Users, Award, Lightbulb, AlertTriangle, Music } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Type definitions
interface SectionTitleProps {
  children: React.ReactNode;
}

interface StoryCardProps {
  icon: React.ReactNode;
  title: string;
  story: string;
  lesson: string;
}

// Helper component for section titles
const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-12 text-center">
    {children}
  </h2>
);

// Helper component for story cards
const StoryCard = ({ icon, title, story, lesson }: StoryCardProps) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden transform hover:-translate-y-2">
    <div className="p-8">
      <div className="flex items-center mb-6">
        <div className="bg-blue-500 dark:bg-blue-600 text-white rounded-full p-3 mr-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h3>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">The Story</h4>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{story}</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-700/50 p-5 rounded-lg">
          <h4 className="font-semibold text-lg text-blue-800 dark:text-blue-300 mb-2 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Core Lesson
          </h4>
          <p className="text-blue-700 dark:text-blue-400 leading-relaxed">{lesson}</p>
        </div>
      </div>
    </div>
  </div>
);

// Main Page Component
export default function RichDadPoorDadSummary() {
  const currentArticle = articles.find(article => article.slug === 'rich-dad-poor-dad-book-summary');

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
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
      
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        {/* Return to Home Button */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        <main>
          {/* Hero Section */}
          <section className="relative text-center py-24 md:py-32 bg-gradient-to-br from-blue-600 to-indigo-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600 text-white">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Book Summary
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight">Rich Dad, Poor Dad</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-200">Key Stories and Lessons in Financial Liberation</p>
            </div>
          </section>

          {/* Podcast CTA Section */}
          {currentArticle?.podcastUrl && (
            <section className="py-12 bg-green-50 dark:bg-green-900/20">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Music className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                    <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-200">Listen First, Then Read</h2>
                  </div>
                  <p className="text-lg text-green-700 dark:text-green-300 mb-6 leading-relaxed">
                    Start your financial education journey with our podcast discussion on "Financial Literacy and the Rat Race" - then dive into the key stories below.
                  </p>
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Music className="inline mr-2" />
                    Listen to Podcast First
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* Introduction Section */}
          <section className="py-20 md:py-24">
              <div className="container mx-auto px-6">
                  <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">A Tale of Two Mindsets</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                          "Rich Dad, Poor Dad" is not just a book; it's a fundamental shift in perspective. Robert Kiyosaki's journey, guided by two distinct father figures, reveals a powerful truth: financial well-being isn't about how much you earn, but about how much you understand money. Below are the pivotal stories that illustrate the core philosophy of making money work for you.
                      </p>
                  </div>
              </div>
          </section>

          {/* Key Stories Section */}
          <section className="py-20 md:py-24 bg-gray-100 dark:bg-gray-900/70">
            <div className="container mx-auto px-6">
              <SectionTitle>The Stories That Teach</SectionTitle>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
                {stories.map((story, index) => (
                  <StoryCard key={index} {...story} />
                ))}
              </div>
            </div>
          </section>

          {/* Core Concepts Section */}
          <section className="py-20 md:py-24">
              <div className="container mx-auto px-6">
                  <SectionTitle>The Core Philosophy</SectionTitle>
                  <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 text-center">
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                          <DollarSign className="mx-auto text-green-500 w-16 h-16 mb-4"/>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Assets vs. Liabilities</h3>
                          <p className="text-gray-600 dark:text-gray-400">An <span className="font-bold text-green-600 dark:text-green-400">asset</span> puts money in your pocket. A <span className="font-bold text-red-600 dark:text-red-400">liability</span> takes money out. The rich acquire assets; the poor and middle class acquire liabilities they think are assets.</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                          <BrainCircuit className="mx-auto text-blue-500 w-16 h-16 mb-4"/>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Financial IQ</h3>
                          <p className="text-gray-600 dark:text-gray-400">It's not about being smart, it's about being financially smart. This requires knowledge of accounting, investing, markets, and law. It's about how much you keep, not how much you make.</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
                          <TrendingUp className="mx-auto text-indigo-500 w-16 h-16 mb-4"/>
                          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Work to Learn</h3>
                          <p className="text-gray-600 dark:text-gray-400">Don't work for money; work to learn new skills. Job security is a thing of the past. Skill security—especially in sales, marketing, and communication—is the new path to financial freedom.</p>
                      </div>
                  </div>
              </div>
          </section>

          {/* Educational Disclaimer */}
          <section className="py-12 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Educational Content</h3>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  This summary is for educational purposes only and does not constitute financial advice. Please consult with qualified financial professionals before making investment decisions. The original book contains additional insights and context not covered in this summary.
                </p>
              </div>
            </div>
          </section>


        </main>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-black text-gray-400 py-8">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="text-sm mt-2">This is an unofficial summary and analysis inspired by the book "Rich Dad, Poor Dad" by Robert T. Kiyosaki.</p>
          </div>
        </footer>
      </div>
    </>
  );
} 