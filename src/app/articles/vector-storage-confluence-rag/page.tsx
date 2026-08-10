'use client';

import { Database, Zap, Code, CheckCircle, XCircle, Award, Users, Target, Shield, BarChart3 } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

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

const Card = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={`bg-gray-50 dark:bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 flex items-center font-serif">
    {icon}
    <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-300 dark:to-blue-400">{children}</span>
  </h2>
);

const ExecutiveSummary = () => (
  <Card id="executive-summary">
    <SectionTitle icon={<Award size={32} className="text-cyan-700 dark:text-cyan-300" />}>Executive Summary</SectionTitle>
    <div className="space-y-6 text-gray-700 dark:text-gray-300">
      <p className="text-lg leading-relaxed">
        This comprehensive analysis evaluates three vector storage solutions&mdash;<strong>Chroma</strong>, <strong>Facebook AI Similarity Search (FAISS)</strong>, and <strong>Scikit-learn</strong>&mdash;for building a Retrieval-Augmented Generation (RAG) knowledge base chatbot using Confluence page data.
      </p>

      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 p-6 rounded-lg border border-indigo-300 dark:border-[#A8672E] dark:border-[#D08F52]/30">
        <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-3 font-serif">🎯 The Core Challenge</h3>
        <p className="text-gray-900 dark:text-white">
          Confluence data exists in a complex, hierarchical structure where pages have parent-child relationships and rich interconnections. Standard RAG techniques that treat documents as isolated chunks destroy this crucial contextual integrity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-6 rounded-lg border border-green-300 dark:border-[#1D8A70] dark:border-[#3CBF9C]/30">
          <div className="flex items-center mb-3">
            <CheckCircle className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mr-2" size={24} />
            <h4 className="text-lg font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-300">Winner: Chroma</h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Purpose-built AI database with integrated metadata storage and efficient pre-filtering. Ideal architectural fit for hierarchical RAG.
          </p>
        </div>

        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-300 dark:border-[#A8672E] dark:border-[#D08F52]/30">
          <div className="flex items-center mb-3">
            <Zap className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mr-2" size={24} />
            <h4 className="text-lg font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300">Performance: FAISS</h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Unparalleled raw speed for vector similarity search, but requires complex custom architecture for metadata handling.
          </p>
        </div>

        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-300 dark:border-[#BC4128] dark:border-[#E2694A]/30">
          <div className="flex items-center mb-3">
            <Code className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mr-2" size={24} />
            <h4 className="text-lg font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-orange-300">Prototype: Scikit-learn</h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Excellent for learning and small-scale experiments, but unsuitable for production RAG systems due to scalability limitations.
          </p>
        </div>
      </div>
    </div>
  </Card>
);

const Challenge = () => (
  <Card id="challenge">
    <SectionTitle icon={<Target size={32} className="text-cyan-700 dark:text-cyan-300" />}>The Hierarchical Data Challenge</SectionTitle>
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-serif">🏗️ Confluence&apos;s Complex Structure</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Unlike simple document collections, Confluence data forms a rich, interconnected graph where context is everything:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">📄 Page Hierarchies</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Tree structures with explicit parent-child relationships creating contextual meaning</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">🏢 Spaces & Teams</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Organizational boundaries that group related knowledge and define access patterns</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">🏷️ Rich Metadata</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Labels, authors, dates, permissions that provide essential filtering context</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <h4 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">🔗 Hyperlink Graph</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Dense interconnections that span hierarchies and create knowledge pathways</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-serif">⚠️ The Contextual Integrity Problem</h3>
        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-6 rounded-lg border border-red-300 dark:border-[#BC4128] dark:border-[#E2694A]/30">
          <div className="space-y-4">
            <div className="flex items-start">
              <XCircle className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-red-300">Naive Chunking Destroys Context</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">Standard document splitting severs the vital link between text and its hierarchical position</p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-red-300">Retrieval Ambiguity</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">A chunk saying &ldquo;The limit is 100 requests per minute&rdquo; is useless without knowing it&apos;s from &ldquo;Production API Billing Documentation&rdquo;</p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-red-300">Lost Knowledge Graphs</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">The rich interconnections that humans use to navigate knowledge are completely ignored</p>
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
    <SectionTitle icon={<Database size={32} className="text-cyan-700 dark:text-cyan-300" />}>Vector Store Deep Dive</SectionTitle>
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/20 p-8 rounded-xl border border-green-300 dark:border-[#1D8A70] dark:border-[#3CBF9C]/30">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-lg flex items-center justify-center mr-4">
            <Database className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-300 font-serif">Chroma</h3>
            <p className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-200">AI-Native Vector Database</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          A purpose-built AI application database that integrates high-performance HNSW indexing with robust, native metadata storage and efficient pre-query filtering.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="flex items-center text-lg font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3">
              <CheckCircle size={20} className="mr-2"/> Key Strengths
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Native metadata co-location with vectors</li>
              <li>• Efficient pre-filtering (queries filtered before vector search)</li>
              <li>• Full database API with CRUD operations</li>
              <li>• Excellent developer experience and documentation</li>
              <li>• Client-server architecture for scalability</li>
            </ul>
          </div>
          <div>
            <h4 className="flex items-center text-lg font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-3">
              <XCircle size={20} className="mr-2"/> Considerations
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Slightly lower raw performance than FAISS at extreme scale</li>
              <li>• Newer ecosystem compared to established alternatives</li>
              <li>• Limited indexing algorithm options vs FAISS</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-300 dark:border-[#A8672E] dark:border-[#D08F52]/30">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#A8672E] dark:bg-[#D08F52] rounded-lg flex items-center justify-center mr-4">
            <Zap className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 font-serif">FAISS</h3>
            <p className="text-[#A8672E] dark:text-[#D08F52] dark:text-blue-200">High-Performance Vector Library</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          A C++ library offering unparalleled speed for raw vector similarity search, with extensive indexing options and proven scalability to billions of vectors.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="flex items-center text-lg font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3">
              <CheckCircle size={20} className="mr-2"/> Key Strengths
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Blazing fast unfiltered vector search</li>
              <li>• Proven at billion-vector scale</li>
              <li>• Extensive, highly tunable indexing algorithms</li>
              <li>• GPU acceleration support</li>
              <li>• Battle-tested in production</li>
            </ul>
          </div>
          <div>
            <h4 className="flex items-center text-lg font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-3">
              <XCircle size={20} className="mr-2"/> Major Limitations
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• No native metadata storage</li>
              <li>• Requires separate database for metadata</li>
              <li>• Complex application-level synchronization</li>
              <li>• Filtering requires post-processing workarounds</li>
              <li>• High engineering overhead</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/20 p-8 rounded-xl border border-orange-300 dark:border-[#BC4128] dark:border-[#E2694A]/30">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#BC4128] dark:bg-[#E2694A] rounded-lg flex items-center justify-center mr-4">
            <Code className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-orange-300 font-serif">Scikit-learn</h3>
            <p className="text-[#BC4128] dark:text-[#E2694A] dark:text-orange-200">ML Toolkit Component</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          A familiar machine learning toolkit component excellent for prototyping and educational purposes, but fundamentally unsuitable for production RAG systems.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="flex items-center text-lg font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3">
              <CheckCircle size={20} className="mr-2"/> Good For
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Extremely simple to start with</li>
              <li>• Perfect for learning and experimentation</li>
              <li>• No external dependencies</li>
              <li>• Familiar sklearn interface</li>
            </ul>
          </div>
          <div>
            <h4 className="flex items-center text-lg font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-3">
              <XCircle size={20} className="mr-2"/> Critical Limitations
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
    <SectionTitle icon={<BarChart3 size={32} className="text-cyan-700 dark:text-cyan-300" />}>Feature Comparison Matrix</SectionTitle>
    <div className="space-y-6">
      <p className="text-gray-700 dark:text-gray-300">
        A detailed comparison across the critical dimensions that matter for hierarchical RAG implementation:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-white/20">
              <th className="text-left p-4 text-cyan-700 dark:text-cyan-300 font-semibold">Feature / Criterion</th>
              <th className="text-center p-4 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-300 font-semibold">Chroma</th>
              <th className="text-center p-4 text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 font-semibold">FAISS</th>
              <th className="text-center p-4 text-[#BC4128] dark:text-[#E2694A] dark:text-orange-300 font-semibold">Scikit-learn</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-300 font-medium mb-1">{row.chroma}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < row.chromaScore ? 'bg-[#1D8A70] dark:bg-[#3CBF9C]' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[#A8672E] dark:text-[#D08F52] dark:text-blue-300 font-medium mb-1">{row.faiss}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < row.faissScore ? 'bg-[#A8672E] dark:bg-[#D08F52]' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[#BC4128] dark:text-[#E2694A] dark:text-orange-300 font-medium mb-1">{row.sklearn}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full mr-1 ${i < row.sklearnScore ? 'bg-[#BC4128] dark:bg-[#E2694A]' : 'bg-gray-300 dark:bg-gray-600'}`} />
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
    <SectionTitle icon={<CheckCircle size={32} className="text-cyan-700 dark:text-cyan-300" />}>Final Recommendation</SectionTitle>
    <div className="space-y-8">
      <div className="text-center p-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl border border-green-300 dark:border-[#1D8A70] dark:border-[#3CBF9C]/40">
        <Award className="mx-auto text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-4" size={48} />
        <h3 className="text-3xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-green-300 mb-4 font-serif">Chroma is the Clear Winner</h3>
        <p className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto">
          For building a knowledge base chatbot on hierarchical Confluence data, Chroma provides the optimal balance of
          architectural fit, developer experience, and performance characteristics.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-green-300 dark:border-[#1D8A70] dark:border-[#3CBF9C]/30">
          <Shield className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-3" size={32} />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Superior Architectural Fit</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Native co-location of vectors and metadata with efficient pre-filtering is purpose-built for advanced retrieval patterns like Parent-Document Retrieval and Graph RAG.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-blue-300 dark:border-[#A8672E] dark:border-[#D08F52]/30">
          <Users className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-3" size={32} />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Reduced Engineering Overhead</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            The &ldquo;batteries-included&rdquo; database approach eliminates infrastructure complexity, allowing teams to focus on retrieval quality rather than plumbing.
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg border border-purple-300 dark:border-purple-400/30">
          <Zap className="text-purple-600 dark:text-purple-400 mb-3" size={32} />
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Pragmatic Performance</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            While FAISS is faster in isolation, Chroma&apos;s integrated approach often delivers lower end-to-end latency for filter-heavy hierarchical queries.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-300 dark:border-amber-400/30">
        <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-3">⚠️ Important Considerations</h4>
        <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
          <li>• This recommendation is based on total cost of ownership, not raw performance benchmarks</li>
          <li>• For use cases requiring billion-vector scale with minimal filtering, FAISS may still be preferred</li>
          <li>• Always prototype with your specific data and query patterns before final architecture decisions</li>
          <li>• Consider hybrid approaches where appropriate (e.g., Chroma for filtered queries, FAISS for similarity-only)</li>
        </ul>
      </div>
    </div>
  </Card>
);

export default function VectorStorageConfluenceRAG() {
  return (
    <ArticleFrame
      slug="vector-storage-confluence-rag"
      additionalDisclaimer="Technology recommendations should be validated against your specific use case and requirements."
    >
      <div className="space-y-12">
        <ExecutiveSummary />
        <Challenge />
        <Solutions />
        <Comparison />
        <Recommendation />
      </div>
    </ArticleFrame>
  );
}
