'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ConfluenceDualPurposePlaybook() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header with Navigation */}
                <div className="flex items-center gap-4 mb-8">
                    <Link 
                        href="/" 
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Home
                    </Link>
                    
                    {/* Badges */}
                    <div className="flex gap-2 ml-auto">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            Deep Research
                        </span>
                    </div>
                </div>

                {/* Article Title and Metadata */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Dual-Purpose Playbook: Confluence for Human and AI
                    </h1>
                    <p className="text-xl text-slate-600 mb-4">
                        A deep research guide to architecting high-performance Confluence knowledge bases
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                        <span>June 27, 2025</span>
                        <span>•</span>
                        <a 
                            href="https://docs.google.com/document/d/1OJ8dJDCetyLUlENiFTPWQaOgZmviRMhROQs304dPyZA/edit?tab=t.0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View Full Research Document
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="text-slate-800 bg-white font-sans rounded-2xl overflow-hidden shadow-xl">
                    <main className="container mx-auto p-4 md:p-8">

                        <header className="text-center py-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">The Dual-Purpose Playbook</h1>
                            <p className="mt-4 text-lg md:text-xl text-blue-700 max-w-3xl mx-auto">Architecting a High-Performance Confluence Knowledge Base for Human and AI Collaboration</p>
                        </header>

                        <section id="principles" className="mb-16">
                            <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">The 5 Core Principles</h2>
                            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">A successful knowledge base is built on five key pillars that benefit both human users and AI systems simultaneously.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
                                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border">
                                    <div className="text-5xl text-blue-500">🏛️</div>
                                    <h3 className="text-xl font-bold mt-4 mb-2">Architect</h3>
                                    <p className="text-sm text-gray-600">Build a clear, logical, and scalable information architecture.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border">
                                    <div className="text-5xl text-blue-500">⚛️</div>
                                    <h3 className="text-xl font-bold mt-4 mb-2">Atomize</h3>
                                    <p className="text-sm text-gray-600">Dedicate each page to a single, focused idea for clarity and AI chunking.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border">
                                    <div className="text-5xl text-blue-500">✍️</div>
                                    <h3 className="text-xl font-bold mt-4 mb-2">Structure</h3>
                                    <p className="text-sm text-gray-600">Use semantic formatting like headings, lists, and tables.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border">
                                    <div className="text-5xl text-blue-500">⚙️</div>
                                    <h3 className="text-xl font-bold mt-4 mb-2">Automate</h3>
                                    <p className="text-sm text-gray-600">Leverage templates and macros to enforce consistency effortlessly.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform border">
                                    <div className="text-5xl text-blue-500">📊</div>
                                    <h3 className="text-xl font-bold mt-4 mb-2">Govern</h3>
                                    <p className="text-sm text-gray-600">Maintain content with data-driven reviews and archiving.</p>
                                </div>
                            </div>
                        </section>

                        <section id="architecture" className="mb-16">
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="bg-white p-8 rounded-xl shadow-lg border">
                                    <h2 className="text-3xl font-bold mb-4 text-blue-900">Architecting for Clarity</h2>
                                    <p className="text-gray-600 mb-6">A well-planned Information Architecture (IA) is the foundation of a useful knowledge base. Avoid deep, confusing page trees that frustrate users and confuse AI. Instead, aim for a shallow, logical hierarchy that mirrors how your team thinks and works.</p>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 border-2 border-green-400 p-4 rounded-lg bg-green-50">
                                            <h4 className="font-bold text-green-800">✓ Good: Shallow & Logical</h4>
                                            <p className="text-sm text-green-700">Max 3-4 levels deep, predictable structure, easy navigation.</p>
                                        </div>
                                        <div className="flex-1 border-2 border-red-400 p-4 rounded-lg bg-red-50">
                                            <h4 className="font-bold text-red-800">✗ Bad: Deep & Chaotic</h4>
                                            <p className="text-sm text-red-700">5+ levels deep, inconsistent organization, hard to find anything.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-xl shadow-lg h-full flex items-center justify-center border">
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-center mb-4 text-blue-900">Visualizing Page Tree Health</h4>
                                        <div className="flex justify-around items-end h-48">
                                            <div className="text-center">
                                                <p className="font-semibold text-green-600">Ideal</p>
                                                <div className="w-16 h-24 bg-green-500 rounded-t-lg shadow-md"></div>
                                                <p className="text-sm text-gray-500 mt-1">3 Levels</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-yellow-600">Acceptable</p>
                                                <div className="w-16 h-32 bg-yellow-500 rounded-t-lg shadow-md"></div>
                                                 <p className="text-sm text-gray-500 mt-1">4 Levels</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-red-600">Problematic</p>
                                                <div className="w-16 h-48 bg-red-500 rounded-t-lg shadow-md"></div>
                                                 <p className="text-sm text-gray-500 mt-1">6+ Levels</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </section>

                        <section id="atomicity" className="mb-16 bg-white p-8 rounded-xl shadow-lg border">
                            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">The Power of Atomicity</h2>
                            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">The "one idea per page" rule is crucial for AI. It transforms messy documents into clean, reliable data chunks for Retrieval-Augmented Generation (RAG), leading to dramatically better AI answers.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div>
                                    <h3 className="font-semibold text-xl text-center text-red-700 mb-4">✗ Before: Monolithic Page</h3>
                                    <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
                                        <div className="font-bold text-red-800">Q3 Marketing Plan</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">Strategy & Goals...</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">Budget Details...</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">Social Media Calendar...</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">Email Copy...</div>
                                    </div>
                                    <div className="text-center text-3xl my-4 text-red-500">⬇️</div>
                                    <div className="border-2 border-dashed border-red-400 p-4 rounded-lg bg-red-50">
                                        <h4 className="font-semibold text-red-800 text-center">Poor AI "Chunking"</h4>
                                        <div className="mt-2 p-2 bg-white rounded shadow-inner text-sm text-gray-500">Chunk 1: ...goals and budget...</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-inner text-sm text-gray-500">Chunk 2: ...budget and social...</div>
                                        <p className="text-xs text-center text-red-600 mt-2">Context is mixed and unclear.</p>
                                    </div>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-xl text-center text-green-700 mb-4">✓ After: Atomic Pages</h3>
                                    <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                                        <div className="font-bold text-green-800">Q3 Marketing Hub</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">↳ Q3 Campaign: Strategy</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">↳ Q3 Campaign: Budget</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">↳ Q3 Campaign: Calendar</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-sm text-sm">↳ Q3 Campaign: Email Copy</div>
                                    </div>
                                    <div className="text-center text-3xl my-4 text-green-500">⬇️</div>
                                    <div className="border-2 border-dashed border-green-400 p-4 rounded-lg bg-green-50">
                                         <h4 className="font-semibold text-green-800 text-center">Perfect AI "Chunking"</h4>
                                        <div className="mt-2 p-2 bg-white rounded shadow-inner text-sm text-gray-700">Chunk 1: Strategy & Goals</div>
                                        <div className="mt-2 p-2 bg-white rounded shadow-inner text-sm text-gray-700">Chunk 2: Budget & Resources</div>
                                        <p className="text-xs text-center text-green-600 mt-2">Context is focused and reliable.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="atomic-deep-dive" className="mb-16 bg-white p-8 rounded-xl shadow-lg border">
                            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">The Atomic Principle: A Deeper Dive</h2>
                            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">The core idea is to treat each Confluence page as a single, definitive "data record" on one specific topic. This prevents confusion for both humans and AI.</p>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-red-700 mb-4">❌ Vague "Before" Example</h3>
                                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                                        <h4 className="font-bold text-red-800 mb-3">Page Title: Server Setup</h4>
                                        <div className="text-sm text-gray-700 space-y-2">
                                            <p>A long page that starts with purchasing guidelines, moves into initial OS installation steps, then discusses network configuration, security hardening, and finally has a section on troubleshooting common connection issues.</p>
                                            <div className="bg-red-100 p-3 rounded mt-4">
                                                <p className="font-semibold text-red-800">Problem:</p>
                                                <p className="text-red-700 text-sm">If a user asks the LLM, "How do I harden a new server?", the AI has to sift through the entire document, which also contains irrelevant purchasing and OS installation info. This increases the chance of giving a summary that is too broad or inaccurate.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-green-700 mb-4">✅ Detailed "After" Example</h3>
                                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                                        <h4 className="font-bold text-green-800 mb-3">Parent Hub:</h4>
                                        <div className="bg-white p-3 rounded border-l-4 border-green-500 mb-3">
                                            <p className="font-medium">Server Deployment Process Hub</p>
                                        </div>
                                        
                                        <h4 className="font-bold text-green-800 mb-2">Atomic Child Pages:</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="bg-white p-2 rounded border-l-2 border-green-400">
                                                <strong>HOW-TO:</strong> Procure a New Server
                                            </div>
                                            <div className="bg-white p-2 rounded border-l-2 border-green-400">
                                                <strong>HOW-TO:</strong> Install Ubuntu Server 22.04 LTS
                                            </div>
                                            <div className="bg-white p-2 rounded border-l-2 border-green-400">
                                                <strong>GUIDE:</strong> Network Configuration for Production Servers
                                            </div>
                                            <div className="bg-white p-2 rounded border-l-2 border-green-400">
                                                <strong>CHECKLIST:</strong> Security Hardening for Web Servers
                                            </div>
                                            <div className="bg-white p-2 rounded border-l-2 border-green-400">
                                                <strong>FAQ:</strong> Troubleshooting Server Connection Issues
                                            </div>
                                        </div>
                                        
                                        <div className="bg-green-100 p-3 rounded mt-4">
                                            <p className="font-semibold text-green-800">Benefit:</p>
                                            <p className="text-green-700 text-sm">When the LLM is asked about security hardening, it can retrieve the CHECKLIST page. The page's title and content are 100% relevant, providing a clean, unambiguous source for a precise answer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="semantic-formatting" className="mb-16 bg-slate-50 p-8 rounded-xl shadow-lg border">
                            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">Semantic Formatting in Practice</h2>
                            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">Using Confluence's formatting tools to create a logical structure that both humans and machines can understand.</p>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-red-700 mb-4">❌ Poorly Formatted "Before"</h3>
                                    <div className="bg-white border-2 border-red-200 rounded-lg p-6">
                                        <div className="font-bold text-gray-800 mb-2">My Section</div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            So, to set up the project, you need to first clone the repo. After that, you'll need to run npm install. This is really important. Also, don't forget to create a .env file from the .env.example file. The database connection string goes in there. The other thing is the API key for the external service, which you can get from the dev portal. Another point, for testing, use the npm run test command.
                                        </p>
                                        
                                        <div className="bg-red-100 p-3 rounded mt-4">
                                            <p className="font-semibold text-red-800">Problem:</p>
                                            <p className="text-red-700 text-xs">The heading gives no context. Steps are buried in a paragraph. Key values are not highlighted. The AI struggles to extract a clear, sequential process from this "wall of text."</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-green-700 mb-4">✅ Well-Formatted "After"</h3>
                                    <div className="bg-white border-2 border-green-200 rounded-lg p-6">
                                        <h2 className="text-lg font-bold text-gray-800 mb-3">Project Setup Instructions</h2>
                                        
                                        <div className="bg-blue-100 border-l-4 border-blue-500 p-3 mb-4">
                                            <p className="text-sm font-medium text-blue-800">TL;DR: Clone the repo, install dependencies, create your .env file, then run the application.</p>
                                        </div>
                                        
                                        <h3 className="text-md font-bold text-gray-700 mb-2">1. Initial Setup</h3>
                                        <ul className="text-sm text-gray-600 mb-4 ml-4">
                                            <li>• Clone the project repository from Git</li>
                                            <li>• Install dependencies: <code className="bg-gray-200 px-1 rounded">npm install</code></li>
                                        </ul>
                                        
                                        <h3 className="text-md font-bold text-gray-700 mb-2">2. Environment Configuration</h3>
                                        <ul className="text-sm text-gray-600 mb-4 ml-4">
                                            <li>• Copy <strong>.env.example</strong> to <strong>.env</strong></li>
                                            <li>• Update: <strong>DATABASE_URL</strong> & <strong>EXTERNAL_API_KEY</strong></li>
                                        </ul>
                                        
                                        <h3 className="text-md font-bold text-gray-700 mb-2">3. Running Tests</h3>
                                        <p className="text-sm text-gray-600">Run: <code className="bg-gray-200 px-1 rounded">npm run test</code></p>
                                        
                                        <div className="bg-green-100 p-3 rounded mt-4">
                                            <p className="font-semibold text-green-800">Benefit:</p>
                                            <p className="text-green-700 text-xs">Hierarchical headings create a document outline. Numbered lists provide explicit sequences. Bolding and code styles make critical entities stand out for both humans and AI.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="native-macros" className="mb-16 bg-white p-8 rounded-xl shadow-lg border">
                            <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">Mastering Native Macros for a "No-Code" Database</h2>
                            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">The Page Properties and Page Properties Report macros create live, queryable dashboards without any coding.</p>
                            
                            <div className="max-w-4xl mx-auto">
                                <h3 className="text-xl font-bold text-blue-800 mb-4">Example: Tracking All Projects</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                        <h4 className="font-bold text-blue-800 mb-3">Step 1: Create Template</h4>
                                        <p className="text-sm text-gray-700 mb-3">Create a "Project Plan" template with Page Properties macro:</p>
                                        <div className="bg-white p-3 rounded border text-xs">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left py-1">Metadata</th>
                                                        <th className="text-left py-1">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-600">
                                                    <tr><td>Project Owner</td><td>[User input]</td></tr>
                                                    <tr><td>Status</td><td>[Dropdown]</td></tr>
                                                    <tr><td>Due Date</td><td>[Date picker]</td></tr>
                                                    <tr><td>Team</td><td>[User input]</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                                        <h4 className="font-bold text-green-800 mb-3">Step 2: Team Creates Pages</h4>
                                        <p className="text-sm text-gray-700 mb-3">Each new project uses the template and fills out metadata:</p>
                                        <div className="bg-white p-3 rounded border text-xs space-y-1">
                                            <div><strong>Project Alpha</strong></div>
                                            <div>Owner: Jane Smith</div>
                                            <div>Status: In Progress</div>
                                            <div>Due: March 15, 2025</div>
                                            <div>Team: Engineering</div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                                        <h4 className="font-bold text-purple-800 mb-3">Step 3: Dashboard Page</h4>
                                        <p className="text-sm text-gray-700 mb-3">Use Page Properties Report macro to create live dashboard:</p>
                                        <div className="bg-white p-3 rounded border text-xs">
                                            <div className="font-medium mb-2">All Projects Dashboard</div>
                                            <div className="text-gray-600">Auto-generated table with sortable columns showing all project data in real-time</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
                                    <h4 className="font-bold text-blue-900 mb-3">🎯 Result: No-Code Database</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium text-blue-800 mb-2">Human Benefits:</p>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>• Live, sortable project dashboard</li>
                                                <li>• Consistent project documentation</li>
                                                <li>• Easy filtering and searching</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-medium text-purple-800 mb-2">AI Benefits:</p>
                                            <ul className="text-gray-700 space-y-1">
                                                <li>• Structured, queryable data</li>
                                                <li>• Answers complex relational questions</li>
                                                <li>• "Show me all 'In Progress' Engineering projects"</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="roadmap" className="mb-16">
                            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Your 3-Phase Implementation Roadmap</h2>
                            <div className="relative">
                                <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-blue-600 rounded hidden md:block"></div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                    <div className="md:text-right">
                                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 md:border-l-0 md:border-r-4">
                                            <h3 className="text-2xl font-bold text-blue-900">Phase 1: Foundation</h3>
                                            <p className="font-semibold text-blue-700">(Days 1-30)</p>
                                            <p className="mt-2 text-gray-600">Define your IA, establish naming conventions, and create essential page templates like 'Meeting Notes'.</p>
                                            <p className="font-bold mt-3 text-blue-900">Goal: Establish core rules.</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block"></div> 

                                    <div className="hidden md:block"></div>
                                    <div>
                                         <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                                            <h3 className="text-2xl font-bold text-blue-900">Phase 2: Optimization</h3>
                                            <p className="font-semibold text-blue-700">(Days 30-90)</p>
                                            <p className="mt-2 text-gray-600">Train teams on atomic and semantic principles. Build out high-value pages like FAQs and Glossaries.</p>
                                             <p className="font-bold mt-3 text-blue-900">Goal: Create structured data assets.</p>
                                        </div>
                                    </div>
                                   
                                    <div className="md:text-right">
                                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 md:border-l-0 md:border-r-4">
                                            <h3 className="text-2xl font-bold text-blue-900">Phase 3: Governance</h3>
                                            <p className="font-semibold text-blue-700">(Ongoing)</p>
                                            <p className="mt-2 text-gray-600">Assign "Confluence Gardeners," automate review reminders, and use analytics to guide maintenance.</p>
                                             <p className="font-bold mt-3 text-blue-900">Goal: Ensure long-term trust.</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block"></div>
                                </div>
                            </div>
                        </section>

                    </main>
                    
                    <footer className="text-center py-8 bg-blue-900 text-white">
                        <p>Transform your Confluence instance into a powerful, intelligent knowledge ecosystem.</p>
                    </footer>
                </div>

                {/* Research Disclaimer */}
                <div className="mt-12 p-6 bg-slate-100 rounded-xl border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Educational Research</h3>
                    <p className="text-slate-600 text-sm">
                        This deep research article is for educational purposes. The strategies and recommendations presented are based on industry best practices and research findings. Implementation should be tailored to your organization's specific needs and constraints.
                    </p>
                </div>
            </div>
        </div>
    );
}
