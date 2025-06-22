'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, Zap, Code, CheckCircle, XCircle, Award, Users, Target, Shield, BookOpen, Menu, X, BarChart3 } from 'lucide-react';

// Vector store comparison data based on the research
const comparisonData = [
  {
    feature: "Architecture Type",
    chroma: "Integrated Database",
    faiss: "C++ Library",
    sklearn: "ML Toolkit Component",
    chromaScore: 5,
    faissScore: 3,
    sklearnScore: 2
  },
  {
    feature: "Metadata Storage",
    chroma: "Native & Integrated",
    faiss: "External DB Required",
    sklearn: "None",
    chromaScore: 5,
    faissScore: 2,
    sklearnScore: 1
  },
  {
    feature: "Metadata Filtering",
    chroma: "Pre-filtering (Efficient)",
    faiss: "Post-filtering (Complex)",
    sklearn: "Not Available",
    chromaScore: 5,
    faissScore: 2,
    sklearnScore: 1
  },
  {
    feature: "Scalability",
    chroma: "Good (Client-Server)",
    faiss: "Excellent (Billions)",
    sklearn: "Poor (Memory-bound)",
    chromaScore: 4,
    faissScore: 5,
    sklearnScore: 1
  },
  {
    feature: "Developer Experience",
    chroma: "Excellent (Full API)",
    faiss: "Fair (Complex Setup)",
    sklearn: "Good (Prototyping)",
    chromaScore: 5,
    faissScore: 3,
    sklearnScore: 4
  },
  {
    feature: "Hierarchical RAG Fit",
    chroma: "Excellent",
    faiss: "Fair (Custom Logic)",
    sklearn: "Unsuitable",
    chromaScore: 5,
    faissScore: 3,
    sklearnScore: 1
  }
];

const navigationItems = [
  { id: 'executive-summary', label: 'Executive Summary', icon: Award },
  { id: 'challenge', label: 'The Challenge', icon: Target },
  { id: 'solutions', label: 'Vector Store Analysis', icon: Database },
  { id: 'comparison', label: 'Feature Comparison', icon: BarChart3 },
  { id: 'recommendation', label: 'Final Recommendation', icon: CheckCircle },
];

const Card = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center">
        {icon}
        <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">{children}</span>
    </h2>
);

const ExecutiveSummary = () => (
    <Card id="executive-summary">
        <SectionTitle icon={<Award size={32} />}>Executive Summary</SectionTitle>
        <div className="space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
                This comprehensive analysis evaluates three vector storage solutions—<strong>Chroma</strong>, <strong>Facebook AI Similarity Search (FAISS)</strong>, and <strong>Scikit-learn</strong>—for building a Retrieval-Augmented Generation (RAG) knowledge base chatbot using Confluence page data.
            </p>
            
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-6 rounded-lg border border-indigo-400/30">
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">🎯 The Core Challenge</h3>
                <p className="text-white">
                    Confluence data exists in a complex, hierarchical structure where pages have parent-child relationships and rich interconnections. Standard RAG techniques that treat documents as isolated chunks destroy this crucial contextual integrity.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30">
                    <div className="flex items-center mb-3">
                        <CheckCircle className="text-green-400 mr-2" size={24} />
                        <h4 className="text-lg font-semibold text-green-300">Winner: Chroma</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Purpose-built AI database with integrated metadata storage and efficient pre-filtering. Ideal architectural fit for hierarchical RAG.
                    </p>
                </div>
                
                <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30">
                    <div className="flex items-center mb-3">
                        <Zap className="text-blue-400 mr-2" size={24} />
                        <h4 className="text-lg font-semibold text-blue-300">Performance: FAISS</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Unparalleled raw speed for vector similarity search, but requires complex custom architecture for metadata handling.
                    </p>
                </div>
                
                <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30">
                    <div className="flex items-center mb-3">
                        <Code className="text-orange-400 mr-2" size={24} />
                        <h4 className="text-lg font-semibold text-orange-300">Prototype: Scikit-learn</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Excellent for learning and small-scale experiments, but unsuitable for production RAG systems due to scalability limitations.
                    </p>
                </div>
            </div>
        </div>
    </Card>
);

const Challenge = () => (
    <Card id="challenge">
        <SectionTitle icon={<Target size={32} />}>The Hierarchical Data Challenge</SectionTitle>
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">🏗️ Confluence's Complex Structure</h3>
                <p className="text-gray-300 mb-4">
                    Unlike simple document collections, Confluence data forms a rich, interconnected graph where context is everything:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <h4 className="font-bold text-cyan-300 mb-2">📄 Page Hierarchies</h4>
                        <p className="text-gray-400 text-sm">Tree structures with explicit parent-child relationships creating contextual meaning</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <h4 className="font-bold text-cyan-300 mb-2">🏢 Spaces & Teams</h4>
                        <p className="text-gray-400 text-sm">Organizational boundaries that group related knowledge and define access patterns</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <h4 className="font-bold text-cyan-300 mb-2">🏷️ Rich Metadata</h4>
                        <p className="text-gray-400 text-sm">Labels, authors, dates, permissions that provide essential filtering context</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <h4 className="font-bold text-cyan-300 mb-2">🔗 Hyperlink Graph</h4>
                        <p className="text-gray-400 text-sm">Dense interconnections that span hierarchies and create knowledge pathways</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-4">⚠️ The Contextual Integrity Problem</h3>
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30">
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <XCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="font-semibold text-red-300">Naive Chunking Destroys Context</h4>
                                <p className="text-gray-300 text-sm mt-1">Standard document splitting severs the vital link between text and its hierarchical position</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <XCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="font-semibold text-red-300">Retrieval Ambiguity</h4>
                                <p className="text-gray-300 text-sm mt-1">A chunk saying "The limit is 100 requests per minute" is useless without knowing it's from "Production API Billing Documentation"</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <XCircle className="text-red-400 mr-3 mt-1 flex-shrink-0" size={20} />
                            <div>
                                <h4 className="font-semibold text-red-300">Lost Knowledge Graphs</h4>
                                <p className="text-gray-300 text-sm mt-1">The rich interconnections that humans use to navigate knowledge are completely ignored</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

const Solutions = () => (
    <Card id="solutions">
        <SectionTitle icon={<Database size={32} />}>Vector Store Deep Dive</SectionTitle>
        <div className="space-y-12">
            {/* Chroma */}
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 p-8 rounded-xl border border-green-400/30">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                        <Database className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-300">Chroma</h3>
                        <p className="text-green-200">AI-Native Vector Database</p>
                    </div>
                </div>
                <p className="text-gray-300 mb-6">
                    A purpose-built AI application database that integrates high-performance HNSW indexing with robust, native metadata storage and efficient pre-query filtering.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="flex items-center text-lg font-semibold text-green-400 mb-3">
                            <CheckCircle size={20} className="mr-2"/> Key Strengths
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Native metadata co-location with vectors</li>
                            <li>• Efficient pre-filtering (queries filtered before vector search)</li>
                            <li>• Full database API with CRUD operations</li>
                            <li>• Excellent developer experience and documentation</li>
                            <li>• Client-server architecture for scalability</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center text-lg font-semibold text-red-400 mb-3">
                            <XCircle size={20} className="mr-2"/> Considerations
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Slightly lower raw performance than FAISS at extreme scale</li>
                            <li>• Newer ecosystem compared to established alternatives</li>
                            <li>• Limited indexing algorithm options vs FAISS</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* FAISS */}
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/20 p-8 rounded-xl border border-blue-400/30">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                        <Zap className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-blue-300">FAISS</h3>
                        <p className="text-blue-200">High-Performance Vector Library</p>
                    </div>
                </div>
                <p className="text-gray-300 mb-6">
                    A C++ library offering unparalleled speed for raw vector similarity search, with extensive indexing options and proven scalability to billions of vectors.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="flex items-center text-lg font-semibold text-green-400 mb-3">
                            <CheckCircle size={20} className="mr-2"/> Key Strengths
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Blazing fast unfiltered vector search</li>
                            <li>• Proven at billion-vector scale</li>
                            <li>• Extensive, highly tunable indexing algorithms</li>
                            <li>• GPU acceleration support</li>
                            <li>• Battle-tested in production</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center text-lg font-semibold text-red-400 mb-3">
                            <XCircle size={20} className="mr-2"/> Major Limitations
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>• No native metadata storage</li>
                            <li>• Requires separate database for metadata</li>
                            <li>• Complex application-level synchronization</li>
                            <li>• Filtering requires post-processing workarounds</li>
                            <li>• High engineering overhead</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Scikit-learn */}
            <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/20 p-8 rounded-xl border border-orange-400/30">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                        <Code className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-orange-300">Scikit-learn</h3>
                        <p className="text-orange-200">ML Toolkit Component</p>
                    </div>
                </div>
                <p className="text-gray-300 mb-6">
                    A familiar machine learning toolkit component excellent for prototyping and educational purposes, but fundamentally unsuitable for production RAG systems.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="flex items-center text-lg font-semibold text-green-400 mb-3">
                            <CheckCircle size={20} className="mr-2"/> Good For
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Extremely simple to start with</li>
                            <li>• Perfect for learning and experimentation</li>
                            <li>• No external dependencies</li>
                            <li>• Familiar sklearn interface</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center text-lg font-semibold text-red-400 mb-3">
                            <XCircle size={20} className="mr-2"/> Critical Limitations
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Does not scale (curse of dimensionality)</li>
                            <li>• Memory-bound, single-machine only</li>
                            <li>• No database features (concurrency, persistence)</li>
                            <li>• Unsuitable for production environments</li>
                            <li>• No metadata handling capabilities</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

const Comparison = () => (
    <Card id="comparison">
        <SectionTitle icon={<BarChart3 size={32} />}>Feature Comparison Matrix</SectionTitle>
        <div className="space-y-6">
            <p className="text-gray-300">
                A detailed comparison across the critical dimensions that matter for hierarchical RAG implementation:
            </p>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="text-left p-4 text-cyan-300 font-semibold">Feature / Criterion</th>
                            <th className="text-center p-4 text-green-300 font-semibold">Chroma</th>
                            <th className="text-center p-4 text-blue-300 font-semibold">FAISS</th>
                            <th className="text-center p-4 text-orange-300 font-semibold">Scikit-learn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonData.map((row, index) => (
                            <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium text-white">{row.feature}</td>
                                <td className="p-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-green-300 font-medium mb-1">{row.chroma}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < row.chromaScore ? 'bg-green-400' : 'bg-gray-600'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-blue-300 font-medium mb-1">{row.faiss}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < row.faissScore ? 'bg-blue-400' : 'bg-gray-600'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-orange-300 font-medium mb-1">{row.sklearn}</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < row.sklearnScore ? 'bg-orange-400' : 'bg-gray-600'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
);

const Recommendation = () => (
    <Card id="recommendation">
        <SectionTitle icon={<CheckCircle size={32} />}>Final Recommendation</SectionTitle>
        <div className="space-y-8">
            <div className="text-center p-8 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl border border-green-400/40">
                <Award className="mx-auto text-green-400 mb-4" size={48} />
                <h3 className="text-3xl font-bold text-green-300 mb-4">Chroma is the Clear Winner</h3>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    For building a knowledge base chatbot on hierarchical Confluence data, Chroma provides the optimal balance of 
                    architectural fit, developer experience, and performance characteristics.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-green-400/30">
                    <Shield className="text-green-400 mb-3" size={32} />
                    <h4 className="text-lg font-bold text-white mb-3">Superior Architectural Fit</h4>
                    <p className="text-gray-300 text-sm">
                        Native co-location of vectors and metadata with efficient pre-filtering is purpose-built for advanced retrieval patterns like Parent-Document Retrieval and Graph RAG.
                    </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-400/30">
                    <Users className="text-blue-400 mb-3" size={32} />
                    <h4 className="text-lg font-bold text-white mb-3">Reduced Engineering Overhead</h4>
                    <p className="text-gray-300 text-sm">
                        The "batteries-included" database approach eliminates infrastructure complexity, allowing teams to focus on retrieval quality rather than plumbing.
                    </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-400/30">
                    <Zap className="text-purple-400 mb-3" size={32} />
                    <h4 className="text-lg font-bold text-white mb-3">Pragmatic Performance</h4>
                    <p className="text-gray-300 text-sm">
                        While FAISS is faster in isolation, Chroma's integrated approach often delivers lower end-to-end latency for filter-heavy hierarchical queries.
                    </p>
                </div>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-lg border border-amber-400/30">
                <h4 className="font-bold text-amber-300 mb-3">⚠️ Important Considerations</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                    <li>• This recommendation is based on total cost of ownership, not raw performance benchmarks</li>
                    <li>• For use cases requiring billion-vector scale with minimal filtering, FAISS may still be preferred</li>
                    <li>• Always prototype with your specific data and query patterns before final architecture decisions</li>
                    <li>• Consider hybrid approaches where appropriate (e.g., Chroma for filtered queries, FAISS for similarity-only)</li>
                </ul>
            </div>

            <div className="text-center pt-4">
                <a
                    href="https://docs.google.com/document/d/e/2PACX-1vRNp3AVzpmT2-wxQRg1Pzo8T5mufZuDibJ8peKXR6WldkPJHhuwxGOmeUgAH4FxmRqcsySRbxgBngYL/pub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read Full Research Document
                </a>
            </div>
        </div>
    </Card>
);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-cyan-600 text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <nav className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-md border-r border-white/10 p-6 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-80`}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-300 mb-6">Table of Contents</h3>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default function VectorStorageConfluenceRAG() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <div className="relative isolate overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_top_right,_#1e3a8a_20%,_transparent_100%)] opacity-30"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

        {/* Header */}
        <header className="py-6 px-4 border-b border-white/10 relative">
          <div className="container max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-200 border border-purple-400">
                  Deep Research
                </span>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">
                Vector Storage Solutions for Confluence RAG
              </h1>
              <p className="mt-2 text-lg text-gray-300">A Comparative Analysis of Chroma, FAISS, and Scikit-learn</p>
              <p className="mt-2 text-sm text-gray-400">Building knowledge base chatbots on hierarchical enterprise data</p>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="md:ml-80 px-4 py-8 md:py-12">
          <div className="container max-w-4xl mx-auto space-y-12">
            <ExecutiveSummary />
            <Challenge />
            <Solutions />
            <Comparison />
            <Recommendation />
          </div>
        </main>

        {/* Footer */}
        <footer className="md:ml-80 text-center py-6 mt-12 border-t border-white/10">
          <div className="container max-w-4xl mx-auto px-4">
            <p className="text-sm text-gray-500 mb-4">
              This analysis is for informational and educational purposes only. 
              Technology recommendations should be validated against your specific use case and requirements.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Source:</strong> Based on comprehensive research analysis available in the{' '}
              <a 
                href="https://docs.google.com/document/d/e/2PACX-1vRNp3AVzpmT2-wxQRg1Pzo8T5mufZuDibJ8peKXR6WldkPJHhuwxGOmeUgAH4FxmRqcsySRbxgBngYL/pub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                full research document
              </a>.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
} 