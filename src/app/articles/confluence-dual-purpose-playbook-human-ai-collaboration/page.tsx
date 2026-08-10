'use client';

import { ArticleFrame } from '@/components/articles/article-frame';

export default function ConfluenceDualPurposePlaybook() {
  return (
    <ArticleFrame
      slug="confluence-dual-purpose-playbook-human-ai-collaboration"
      additionalDisclaimer="The strategies and recommendations presented are based on industry best practices and research findings. Implementation should be tailored to your organization's specific needs and constraints."
    >
      <div className="space-y-16">
        <section id="principles">
          <h2 className="text-3xl font-bold text-center mb-2 text-blue-900 dark:text-blue-300 font-serif">The 5 Core Principles</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">A successful knowledge base is built on five key pillars that benefit both human users and AI systems simultaneously.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border dark:border-gray-700">
              <div className="text-5xl text-[#A8672E] dark:text-[#D08F52]">🏛️</div>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white font-serif">Architect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Build a clear, logical, and scalable information architecture.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border dark:border-gray-700">
              <div className="text-5xl text-[#A8672E] dark:text-[#D08F52]">⚛️</div>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white font-serif">Atomize</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dedicate each page to a single, focused idea for clarity and AI chunking.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border dark:border-gray-700">
              <div className="text-5xl text-[#A8672E] dark:text-[#D08F52]">✍️</div>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white font-serif">Structure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use semantic formatting like headings, lists, and tables.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border dark:border-gray-700">
              <div className="text-5xl text-[#A8672E] dark:text-[#D08F52]">⚙️</div>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white font-serif">Automate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Leverage templates and macros to enforce consistency effortlessly.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border dark:border-gray-700">
              <div className="text-5xl text-[#A8672E] dark:text-[#D08F52]">📊</div>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white font-serif">Govern</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maintain content with data-driven reviews and archiving.</p>
            </div>
          </div>
        </section>

        <section id="architecture">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-4 text-blue-900 dark:text-blue-300 font-serif">Architecting for Clarity</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">A well-planned Information Architecture (IA) is the foundation of a useful knowledge base. Avoid deep, confusing page trees that frustrate users and confuse AI. Instead, aim for a shallow, logical hierarchy that mirrors how your team thinks and works.</p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 border-2 border-[#1D8A70] dark:border-[#3CBF9C] p-4 rounded-lg bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20">
                  <h4 className="font-bold text-green-800 dark:text-green-300">✓ Good: Shallow & Logical</h4>
                  <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Max 3-4 levels deep, predictable structure, easy navigation.</p>
                </div>
                <div className="flex-1 border-2 border-[#BC4128] dark:border-[#E2694A] p-4 rounded-lg bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20">
                  <h4 className="font-bold text-red-800 dark:text-red-300">✗ Bad: Deep & Chaotic</h4>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">5+ levels deep, inconsistent organization, hard to find anything.</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg h-full flex items-center justify-center border dark:border-gray-700">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-center mb-4 text-blue-900 dark:text-blue-300">Visualizing Page Tree Health</h4>
                <div className="flex justify-around items-end h-48">
                  <div className="text-center">
                    <p className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Ideal</p>
                    <div className="w-16 h-24 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-t-lg shadow-md"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">3 Levels</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-yellow-600 dark:text-yellow-400">Acceptable</p>
                    <div className="w-16 h-32 bg-yellow-500 rounded-t-lg shadow-md"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">4 Levels</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Problematic</p>
                    <div className="w-16 h-48 bg-[#BC4128] dark:bg-[#E2694A] rounded-t-lg shadow-md"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">6+ Levels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="atomicity" className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900 dark:text-blue-300 font-serif">The Power of Atomicity</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">The &ldquo;one idea per page&rdquo; rule is crucial for AI. It transforms messy documents into clean, reliable data chunks for Retrieval-Augmented Generation (RAG), leading to dramatically better AI answers.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="font-semibold text-xl text-center text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-4 font-serif">✗ Before: Monolithic Page</h3>
              <div className="border-2 border-red-300 rounded-lg p-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20">
                <div className="font-bold text-red-800 dark:text-red-300">Q3 Marketing Plan</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">Strategy & Goals...</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">Budget Details...</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">Social Media Calendar...</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">Email Copy...</div>
              </div>
              <div className="text-center text-3xl my-4 text-[#BC4128] dark:text-[#E2694A]">⬇️</div>
              <div className="border-2 border-dashed border-[#BC4128] dark:border-[#E2694A] p-4 rounded-lg bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20">
                <h4 className="font-semibold text-red-800 dark:text-red-300 text-center">Poor AI &ldquo;Chunking&rdquo;</h4>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-inner text-sm text-gray-500 dark:text-gray-400">Chunk 1: ...goals and budget...</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-inner text-sm text-gray-500 dark:text-gray-400">Chunk 2: ...budget and social...</div>
                <p className="text-xs text-center text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mt-2">Context is mixed and unclear.</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-xl text-center text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-4 font-serif">✓ After: Atomic Pages</h3>
              <div className="border-2 border-green-300 rounded-lg p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20">
                <div className="font-bold text-green-800 dark:text-green-300">Q3 Marketing Hub</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">↳ Q3 Campaign: Strategy</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">↳ Q3 Campaign: Budget</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">↳ Q3 Campaign: Calendar</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-sm text-sm text-gray-700 dark:text-gray-300">↳ Q3 Campaign: Email Copy</div>
              </div>
              <div className="text-center text-3xl my-4 text-[#1D8A70] dark:text-[#3CBF9C]">⬇️</div>
              <div className="border-2 border-dashed border-[#1D8A70] dark:border-[#3CBF9C] p-4 rounded-lg bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20">
                <h4 className="font-semibold text-green-800 dark:text-green-300 text-center">Perfect AI &ldquo;Chunking&rdquo;</h4>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-inner text-sm text-gray-700 dark:text-gray-300">Chunk 1: Strategy & Goals</div>
                <div className="mt-2 p-2 bg-white dark:bg-gray-900 rounded shadow-inner text-sm text-gray-700 dark:text-gray-300">Chunk 2: Budget & Resources</div>
                <p className="text-xs text-center text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mt-2">Context is focused and reliable.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="atomic-deep-dive" className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900 dark:text-blue-300 font-serif">The Atomic Principle: A Deeper Dive</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">The core idea is to treat each Confluence page as a single, definitive &ldquo;data record&rdquo; on one specific topic. This prevents confusion for both humans and AI.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-4 font-serif">❌ Vague &ldquo;Before&rdquo; Example</h3>
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
                <h4 className="font-bold text-red-800 dark:text-red-300 mb-3">Page Title: Server Setup</h4>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <p>A long page that starts with purchasing guidelines, moves into initial OS installation steps, then discusses network configuration, security hardening, and finally has a section on troubleshooting common connection issues.</p>
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded mt-4">
                    <p className="font-semibold text-red-800 dark:text-red-300">Problem:</p>
                    <p className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] text-sm">If a user asks the LLM, &ldquo;How do I harden a new server?&rdquo;, the AI has to sift through the entire document, which also contains irrelevant purchasing and OS installation info. This increases the chance of giving a summary that is too broad or inaccurate.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-4 font-serif">✅ Detailed &ldquo;After&rdquo; Example</h3>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">Parent Hub:</h4>
                <div className="bg-white dark:bg-gray-900 p-3 rounded border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] mb-3">
                  <p className="font-medium text-gray-900 dark:text-gray-200">Server Deployment Process Hub</p>
                </div>

                <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Atomic Child Pages:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white dark:bg-gray-900 p-2 rounded border-l-2 border-[#1D8A70] dark:border-[#3CBF9C] text-gray-700 dark:text-gray-300">
                    <strong>HOW-TO:</strong> Procure a New Server
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-2 rounded border-l-2 border-[#1D8A70] dark:border-[#3CBF9C] text-gray-700 dark:text-gray-300">
                    <strong>HOW-TO:</strong> Install Ubuntu Server 22.04 LTS
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-2 rounded border-l-2 border-[#1D8A70] dark:border-[#3CBF9C] text-gray-700 dark:text-gray-300">
                    <strong>GUIDE:</strong> Network Configuration for Production Servers
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-2 rounded border-l-2 border-[#1D8A70] dark:border-[#3CBF9C] text-gray-700 dark:text-gray-300">
                    <strong>CHECKLIST:</strong> Security Hardening for Web Servers
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-2 rounded border-l-2 border-[#1D8A70] dark:border-[#3CBF9C] text-gray-700 dark:text-gray-300">
                    <strong>FAQ:</strong> Troubleshooting Server Connection Issues
                  </div>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded mt-4">
                  <p className="font-semibold text-green-800 dark:text-green-300">Benefit:</p>
                  <p className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] text-sm">When the LLM is asked about security hardening, it can retrieve the CHECKLIST page. The page&apos;s title and content are 100% relevant, providing a clean, unambiguous source for a precise answer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="semantic-formatting" className="bg-slate-50 dark:bg-gray-800/50 p-8 rounded-xl shadow-lg border dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900 dark:text-blue-300 font-serif">Semantic Formatting in Practice</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">Using Confluence&apos;s formatting tools to create a logical structure that both humans and machines can understand.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-4 font-serif">❌ Poorly Formatted &ldquo;Before&rdquo;</h3>
              <div className="bg-white dark:bg-gray-900 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="font-bold text-gray-800 dark:text-gray-200 mb-2">My Section</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  So, to set up the project, you need to first clone the repo. After that, you&apos;ll need to run npm install. This is really important. Also, don&apos;t forget to create a .env file from the .env.example file. The database connection string goes in there. The other thing is the API key for the external service, which you can get from the dev portal. Another point, for testing, use the npm run test command.
                </p>

                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded mt-4">
                  <p className="font-semibold text-red-800 dark:text-red-300">Problem:</p>
                  <p className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] text-xs">The heading gives no context. Steps are buried in a paragraph. Key values are not highlighted. The AI struggles to extract a clear, sequential process from this &ldquo;wall of text.&rdquo;</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-4 font-serif">✅ Well-Formatted &ldquo;After&rdquo;</h3>
              <div className="bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 font-serif">Project Setup Instructions</h2>

                <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-3 mb-4">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">TL;DR: Clone the repo, install dependencies, create your .env file, then run the application.</p>
                </div>

                <h3 className="text-md font-bold text-gray-700 dark:text-gray-300 mb-2 font-serif">Initial Setup</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mb-4 ml-4">
                  <li>• Clone the project repository from Git</li>
                  <li>• Install dependencies: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">npm install</code></li>
                </ul>

                <h3 className="text-md font-bold text-gray-700 dark:text-gray-300 mb-2 font-serif">Environment Configuration</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 mb-4 ml-4">
                  <li>• Copy <strong>.env.example</strong> to <strong>.env</strong></li>
                  <li>• Update: <strong>DATABASE_URL</strong> & <strong>EXTERNAL_API_KEY</strong></li>
                </ul>

                <h3 className="text-md font-bold text-gray-700 dark:text-gray-300 mb-2 font-serif">Running Tests</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Run: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">npm run test</code></p>

                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded mt-4">
                  <p className="font-semibold text-green-800 dark:text-green-300">Benefit:</p>
                  <p className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] text-xs">Hierarchical headings create a document outline. Numbered lists provide explicit sequences. Bolding and code styles make critical entities stand out for both humans and AI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="native-macros" className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-900 dark:text-blue-300 font-serif">Mastering Native Macros for a &ldquo;No-Code&rdquo; Database</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">The Page Properties and Page Properties Report macros create live, queryable dashboards without any coding.</p>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4 font-serif">Example: Tracking All Projects</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-[#A8672E] dark:border-[#D08F52]">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Step 1: Create Template</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Create a &ldquo;Project Plan&rdquo; template with Page Properties macro:</p>
                <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700 text-xs">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left py-1 text-gray-900 dark:text-gray-200">Metadata</th>
                        <th className="text-left py-1 text-gray-900 dark:text-gray-200">Value</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      <tr><td>Project Owner</td><td>[User input]</td></tr>
                      <tr><td>Status</td><td>[Dropdown]</td></tr>
                      <tr><td>Due Date</td><td>[Date picker]</td></tr>
                      <tr><td>Team</td><td>[User input]</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-[#1D8A70] dark:border-[#3CBF9C]">
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">Step 2: Team Creates Pages</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Each new project uses the template and fills out metadata:</p>
                <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700 text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <div><strong>Project Alpha</strong></div>
                  <div>Owner: Jane Smith</div>
                  <div>Status: In Progress</div>
                  <div>Due: March 15, 2025</div>
                  <div>Team: Engineering</div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">Step 3: Dashboard Page</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Use Page Properties Report macro to create live dashboard:</p>
                <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700 text-xs">
                  <div className="font-medium mb-2 text-gray-900 dark:text-gray-200">All Projects Dashboard</div>
                  <div className="text-gray-600 dark:text-gray-400">Auto-generated table with sortable columns showing all project data in real-time</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-3">🎯 Result: No-Code Database</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">Human Benefits:</p>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Live, sortable project dashboard</li>
                    <li>• Consistent project documentation</li>
                    <li>• Easy filtering and searching</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-purple-800 dark:text-purple-300 mb-2">AI Benefits:</p>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Structured, queryable data</li>
                    <li>• Answers complex relational questions</li>
                    <li>• &ldquo;Show me all &lsquo;In Progress&rsquo; Engineering projects&rdquo;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-300 font-serif">Your 3-Phase Implementation Roadmap</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-[#A8672E] dark:bg-[#D08F52] rounded hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              <div className="md:text-right">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-[#A8672E] dark:border-[#D08F52] md:border-l-0 md:border-r-4">
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 font-serif">Phase 1: Foundation</h3>
                  <p className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">(Days 1-30)</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Define your IA, establish naming conventions, and create essential page templates like &lsquo;Meeting Notes&rsquo;.</p>
                  <p className="font-bold mt-3 text-blue-900 dark:text-blue-300">Goal: Establish core rules.</p>
                </div>
              </div>
              <div className="hidden md:block"></div>

              <div className="hidden md:block"></div>
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-[#A8672E] dark:border-[#D08F52]">
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 font-serif">Phase 2: Optimization</h3>
                  <p className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">(Days 30-90)</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Train teams on atomic and semantic principles. Build out high-value pages like FAQs and Glossaries.</p>
                  <p className="font-bold mt-3 text-blue-900 dark:text-blue-300">Goal: Create structured data assets.</p>
                </div>
              </div>

              <div className="md:text-right">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-[#A8672E] dark:border-[#D08F52] md:border-l-0 md:border-r-4">
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 font-serif">Phase 3: Governance</h3>
                  <p className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">(Ongoing)</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Assign &ldquo;Confluence Gardeners,&rdquo; automate review reminders, and use analytics to guide maintenance.</p>
                  <p className="font-bold mt-3 text-blue-900 dark:text-blue-300">Goal: Ensure long-term trust.</p>
                </div>
              </div>
              <div className="hidden md:block"></div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
