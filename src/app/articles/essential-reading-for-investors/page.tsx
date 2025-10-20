'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function EssentialReadingForInvestors() {
  const currentArticle = articles.find(article => article.slug === 'essential-reading-for-investors');

  const investingBooks = [
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      image: "https://m.media-amazon.com/images/I/419Tm1NaD8L._SY445_SX342_PQ35_.jpg",
      description: "Explores the strange ways people think about money and teaches you how to make better sense of one of life's most important topics. It's not about what you know, but how you behave."
    },
    {
      title: "Richer, Wiser, Happier",
      author: "William Green",
      image: "https://m.media-amazon.com/images/I/41+LPrfA77L._SY445_SX342_PQ35_.jpg",
      description: "Through in-depth interviews with legendary investors like Munger, Pabrai, and Templeton, Green distills timeless wisdom on how to succeed in markets and life by thinking rationally and patiently."
    },
    {
      title: "The Most Important Thing",
      author: "Howard Marks",
      image: "https://m.media-amazon.com/images/I/41ZQzhtHjOL._SY445_SX342_PQ35_.jpg",
      description: "Marks shares his investment philosophy, emphasizing the importance of second-level thinking, understanding risk, and learning from past cycles to gain a durable edge."
    },
    {
      title: "Good Stocks Cheap",
      author: "Kenneth Jeffrey Marshall",
      image: "https://m.media-amazon.com/images/I/41uRqWrtEHL._SY445_SX342_PQ35_.jpg",
      description: "Provides a clear, actionable framework for value investing, integrating finance, strategy, and psychology to help you identify and invest in excellent companies at a discount."
    },
    {
      title: "Education of a Value Investor",
      author: "Guy Spier",
      image: "https://m.media-amazon.com/images/I/915mh+AG6ZL._SY466_.jpg",
      description: "A personal journey from a sharp-elbowed hedge funder to a thoughtful value investor. Spier shares how he created an environment to foster rational decision-making, inspired by Warren Buffett."
    },
    {
      title: "Little Book of Behavioral Investing",
      author: "James Montier",
      image: "https://m.media-amazon.com/images/I/51eyPEzFKCL._SY445_SX342_PQ35_.jpg",
      description: "Montier reveals the most common psychological barriers to successful investing, such as emotion and overconfidence, and provides practical advice on how not to be your own worst enemy."
    },
    {
      title: "Mastering The Market Cycle",
      author: "Howard Marks",
      image: "https://m.media-amazon.com/images/I/41QDeDcCxXL._SY445_SX342_PQ35_.jpg",
      description: "Marks argues that while you can't predict the future, you can gain a significant advantage by understanding where we are in the market cycle and positioning your portfolio accordingly."
    },
    
    {
      title: "Poor Charlie's Almanack",
      author: "Peter D. Kaufman",
      image: "https://m.media-amazon.com/images/I/81HHPBQH9dL._SY425_.jpg",
      description: "A collection of Charlie Munger's talks, showcasing his multidisciplinary approach to thinking and developing a \"latticework of mental models\" for rational decision-making."
    },

  ];

  const lifeMindsetBooks = [
    {
      title: "Same as Ever",
      author: "Morgan Housel",
      image: "https://m.media-amazon.com/images/I/41hGIXCtMuL._SY445_SX342_PQ35_.jpg",
      description: "A look at the timeless truths about human behavior. Housel argues that while technology and events change, human nature—greed, fear, risk—remains the same, offering lessons for life and investing."
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
      description: "A practical guide to building good habits and breaking bad ones. Clear shows how tiny, 1% improvements can compound into remarkable results over time through a reliable system."
    },
    {
      title: "Ego Is the Enemy",
      author: "Ryan Holiday",
      image: "https://m.media-amazon.com/images/I/41FlvhqC1tL._SY445_SX342_PQ35_.jpg",
      description: "Holiday argues that our ego is the primary obstacle to success and mastery. Through historical examples, he shows how humility and resilience are essential at every stage of life."
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      image: "https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF1000,1000_QL80_.jpg",
      description: "A counterintuitive approach to living a good life. Manson argues we should choose what to care about, embrace our faults, and find meaning in struggle rather than chasing fleeting happiness."
    },
    {
      title: "Stolen Focus",
      author: "Johann Hari",
      image: "https://m.media-amazon.com/images/I/71+6rdW61qL._SY466_.jpg",
      description: "Investigates why our ability to pay attention is collapsing. Hari explores the external forces, from technology to diet, that are hijacking our focus and how we can start to reclaim it."
    },
    {
      title: "Clear Thinking",
      author: "Shane Parrish",
      image: "https://m.media-amazon.com/images/I/81VkXnkh7ZL._SY466_.jpg",
      description: "Parrish provides mental models and practical advice for making better decisions. The book teaches you to see the world with more clarity by understanding your own biases and defaults."
    }
  ];

  const BookCard = ({ book }: { book: typeof investingBooks[0] }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative w-full h-80 bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={book.image} 
          alt={book.title} 
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-2 leading-tight">{book.title}</h3>
        <p className="text-gray-600 mb-4 text-sm font-medium">{book.author}</p>
        <p className="text-gray-700 text-sm flex-grow leading-relaxed">{book.description}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Essential Reading for Value Investors</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A curated list of books for value investors and deep thinkers. Some are about investing, while others explore life, psychology, and the art of clear thinking.
            </p>
          </header>

          {/* Investing & Finance Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-blue-500 pb-2">
              Investing & Finance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {investingBooks.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          </div>

          {/* Life & Mindset Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-green-500 pb-2">
              Life & Mindset
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lifeMindsetBooks.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-12">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Educational Disclaimer:</strong> This reading list is for educational purposes only and does not constitute investment advice. Always do your own research and consult with qualified professionals before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-6 mt-16">
          <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
} 
