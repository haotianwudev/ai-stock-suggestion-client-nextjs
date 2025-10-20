'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cpu, Database, Layers, BarChart2, GitBranch, GanttChartSquare, Server, Lock, ArrowRight, CheckCircle, XCircle, Briefcase, DollarSign, BrainCircuit, Target, Scale, Zap, KeyRound, FileLock2, Code, Activity } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// HELPER COMPONENTS =======================================================

// Section wrapper component
const Section = ({ id, title, subtitle, children, bgColor = 'bg-white' }) => (
  <section id={id} className={`py-20 px-4 md:px-8 ${bgColor}`}>
    <div className="container px-5 py-4 mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-xs text-cyan-600 tracking-widest font-medium title-font mb-1 uppercase">{subtitle}</h2>
        <h1 className="sm:text-4xl text-3xl font-bold title-font text-slate-900 mb-4">{title}</h1>
        <div className="flex mt-6 justify-center">
          <div className="w-24 h-1 rounded-full bg-cyan-500 inline-flex"></div>
        </div>
      </div>
      {children}
    </div>
  </section>
);

// Card component for features and modules
const Card = ({ icon, title, description }) => (
  <div className="p-4 md:w-1/3 flex flex-col text-center items-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-100 text-cyan-500 mb-5 flex-shrink-0 border border-gray-200">
      {icon}
    </div>
    <div className="flex-grow">
      <h2 className="text-slate-900 text-lg title-font font-medium mb-3">{title}</h2>
      <p className="leading-relaxed text-base text-gray-600">{description}</p>
    </div>
  </div>
);

// MAIN SECTIONS ===========================================================

const Hero = () => (
  <section id="home" className="text-gray-600 bg-white body-font">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-5xl text-4xl mb-4 font-extrabold text-slate-900">
          Architecting the Modern<br className="hidden lg:inline-block" /> <span className="text-cyan-600">Hedge Fund Desk</span>
        </h1>
        <p className="mb-8 leading-relaxed text-lg">
          A comprehensive system design for a low to mid-frequency equity portfolio management platform. This site explores the architecture, technology, and strategy required to build a system that moves from data, to idea, to action with maximum speed and confidence.
        </p>
        <div className="flex justify-center">
          <a href="#architecture" className="inline-flex text-white bg-cyan-600 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-700 rounded text-lg transition-colors">
            Explore the Design
          </a>
          <a href="#contact" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg transition-colors">
            Contact Us
          </a>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
          <div className="flex items-center mb-6">
            <Briefcase className="w-8 h-8 text-cyan-500 mr-4" />
            <h3 className="text-2xl font-bold text-slate-900">PM Cockpit</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Gross Exposure</span>
              <span className="font-medium text-gray-800">$150.7M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span>Net Exposure (Long/Short)</span>
              <span className="font-medium text-gray-800">$45.2M</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Daily P&L (USD)</h4>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
              <span className="text-2xl font-bold text-green-500">+$2,134,550.00</span>
              <BarChart2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p><strong>Avg. Cost Basis:</strong> Tracked for unrealized P&L.</p>
            <p><strong>Multi-Currency:</strong> All values converted to base currency.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CoreArchitecture = () => {
  const features = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "PM's Cockpit",
      description: "A unified, real-time, multi-currency view of positions, P&L, and exposures. Eliminates platform switching and serves as the single source of truth for decision-making."
    },
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      title: "Alpha Engine",
      description: "Transforms the PMS into an active idea generation tool with 'what-if' analysis, portfolio optimization, and integrated order generation to seamlessly link thesis to execution."
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Compliance Guardian",
      description: "An embedded, automated compliance engine using a single rule set for both pre-trade and continuous post-trade checks, preventing costly regulatory and internal breaches."
    },
    {
      icon: <GanttChartSquare className="w-10 h-10" />,
      title: "Performance Scorecard",
      description: "Moves beyond simple reporting to explain the 'why' behind returns, using Brinson-Fachler and risk-based P&L attribution models to evaluate manager skill."
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Integrated Risk",
      description: "A forward-looking view of risk using VaR, stress testing, and factor models (e.g., MSCI Barra) to understand how the portfolio might behave under various market conditions."
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Cash Management",
      description: "Provides a clear, real-time view of cash balances, upcoming trade settlements, and projected cash flows from corporate actions to ensure liquidity is managed effectively."
    }
  ];

  return (
    <Section id="features" title="Core Functional Architecture" subtitle="The Strategic Imperative" bgColor="bg-gray-50">
      <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        {features.map((feature, index) => <Card key={index} {...feature} />)}
      </div>
    </Section>
  );
};

const SystemArchitecture = () => (
  <Section id="architecture" title="System Architecture Blueprint" subtitle="Foundational Design">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">ARCHITECTURAL PATTERN</h2>
        <h1 className="text-slate-900 text-3xl title-font font-medium mb-4">The Modular Monolith</h1>
        <p className="leading-relaxed mb-4 text-gray-600">
          We chose a Modular Monolith to balance initial development speed with long-term maintainability. It provides the operational simplicity of a single deployable unit while enforcing strong internal boundaries, preventing technical debt. This approach serves as a perfect transitional architecture, allowing modules to be extracted into microservices if future needs demand it.
        </p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Pattern</span>
          <span className="ml-auto text-slate-900">Modular Monolith</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Key Benefit</span>
          <span className="ml-auto text-slate-900">Low operational complexity, high cohesion</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Scalability</span>
          <span className="ml-auto text-slate-900">Moderate, with clear path to Microservices</span>
        </div>
        <h2 className="text-slate-900 text-2xl title-font font-medium mt-8 mb-4">Central Nervous System: EDA, CQRS & Event Sourcing</h2>
        <p className="leading-relaxed mb-4 text-gray-600">
          An <strong>Event-Driven Architecture (EDA)</strong> using Apache Kafka acts as the system's core communication backbone, decoupling components. This is enhanced by <strong>CQRS</strong> (Command Query Responsibility Segregation), which separates the write and read operations, and <strong>Event Sourcing</strong>, which stores every state change as an immutable event. This combination creates a highly auditable, scalable, and resilient system where the event log serves as the ultimate, verifiable system of truth.
        </p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div className="flex items-center">
            <span className="mr-3 text-slate-900">Key Patterns</span>
            <div className="relative">
              <span className="mr-2 rounded border border-gray-300 py-1 px-2 text-gray-700">EDA</span>
              <span className="mr-2 rounded border border-gray-300 py-1 px-2 text-gray-700">CQRS</span>
              <span className="rounded border border-gray-300 py-1 px-2 text-gray-700">Event Sourcing</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg border border-gray-200 bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <Layers className="w-24 h-24 text-cyan-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">Monolith &rarr; Modular &rarr; Microservices</h3>
          <p className="text-gray-500 mt-2">An evolutionary path that manages complexity and technical debt.</p>
        </div>
      </div>
    </div>
  </Section>
);

const DataArchitecture = () => (
  <Section id="data" title="Data Sourcing & Pipelines" subtitle="The System's Lifeblood" bgColor="bg-gray-50">
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      {/* Data Sources */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Consolidated Data Sources</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-center">
            <Database className="w-5 h-5 mr-3 text-cyan-500"/>
            Market Data (Bloomberg, Reuters)
          </li>
          <li className="flex items-center">
            <Database className="w-5 h-5 mr-3 text-cyan-500"/>
            Security Masters (DTCC)
          </li>
          <li className="flex items-center">
            <Database className="w-5 h-5 mr-3 text-cyan-500"/>
            Corporate Actions (LSEG)
          </li>
          <li className="flex items-center">
            <Database className="w-5 h-5 mr-3 text-cyan-500"/>
            Execution Feeds (FIX Protocol)
          </li>
          <li className="flex items-center">
            <Database className="w-5 h-5 mr-3 text-cyan-500"/>
            Alternative & ESG Data
          </li>
        </ul>
      </div>
      <div className="hidden md:block">
        <ArrowRight className="w-12 h-12 text-cyan-500" />
      </div>
      {/* Ingestion Engine */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
        <Zap className="w-16 h-16 mx-auto mb-4 text-cyan-500"/>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Kafka Ingestion Engine</h3>
        <p className="text-gray-600 mb-4">
          A fault-tolerant, high-performance data pipeline built on <strong>Apache Kafka</strong>. It provides a durable, replayable log for all system events, enhanced by <strong>Kafka Connect</strong> for reliability and <strong>Schema Registry</strong> for data governance.
        </p>
        <span className="inline-block bg-cyan-100 text-cyan-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Producers</span>
        <span className="inline-block bg-cyan-100 text-cyan-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Topics</span>
        <span className="inline-block bg-cyan-100 text-cyan-800 text-sm font-medium px-2.5 py-0.5 rounded">Consumers</span>
      </div>
      <div className="hidden md:block">
        <ArrowRight className="w-12 h-12 text-cyan-500" />
      </div>
      {/* Database Storage */}
      <div className="w-full md:w-1/4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Polyglot Persistence</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-center">
            <Server className="w-5 h-5 mr-3 text-cyan-500"/>
            <strong>TimescaleDB</strong> for high-volume market data.
          </li>
          <li className="flex items-center">
            <Server className="w-5 h-5 mr-3 text-cyan-500"/>
            <strong>PostgreSQL</strong> for transactional trades & positions.
          </li>
        </ul>
      </div>
    </div>
  </Section>
);

const TechStack = () => {
  const stack = [
    { 
      name: 'Java', 
      category: 'Backend', 
      icon: <Cpu className="w-8 h-8"/>, 
      reason: "For core services, risk engines, and APIs. Its strong typing, concurrency features, and mature ecosystem provide a balance of performance and long-term robustness." 
    },
    { 
      name: 'Python', 
      category: 'Quants', 
      icon: <BrainCircuit className="w-8 h-8"/>, 
      reason: "The lingua franca for quantitative research, backtesting, and data science, leveraging libraries like NumPy, Pandas, and PyPortfolioOpt for rapid iteration." 
    },
    { 
      name: 'C++', 
      category: 'Low-Latency', 
      icon: <Zap className="w-8 h-8"/>, 
      reason: "Used surgically for performance-critical components like the FIX engine, where direct memory control and minimal latency for execution data are paramount." 
    },
    { 
      name: 'React & Next.js', 
      category: 'Frontend', 
      icon: <Layers className="w-8 h-8"/>, 
      reason: "For building a highly performant, data-intensive web UI. Paired with a specialized grid library like Ext JS for handling large, real-time datasets." 
    },
    { 
      name: 'Kafka', 
      category: 'Data Pipeline', 
      icon: <GitBranch className="w-8 h-8"/>, 
      reason: "The de facto standard for real-time, distributed event streaming, forming the system's asynchronous, decoupled communication backbone." 
    },
    { 
      name: 'PostgreSQL', 
      category: 'Database', 
      icon: <Database className="w-8 h-8"/>, 
      reason: "A mature, reliable RDBMS for transactional data like trades and positions, ensuring ACID compliance and data consistency for the system of record." 
    },
    { 
      name: 'TimescaleDB', 
      category: 'Database', 
      icon: <BarChart2 className="w-8 h-8"/>, 
      reason: "A high-performance time-series database extension for PostgreSQL, optimized for storing and querying vast amounts of time-stamped market data efficiently." 
    },
    { 
      name: 'OpenAPI', 
      category: 'API', 
      icon: <Briefcase className="w-8 h-8"/>, 
      reason: "For designing and documenting REST APIs in a disciplined, API-first approach, enabling parallel development and automated testing." 
    },
  ];

  return (
    <Section id="tech" title="Technology Stack & Implementation" subtitle="The Engine Room">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stack.map((tech, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-cyan-500 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4 inline-flex items-center justify-center rounded-full bg-gray-100 text-cyan-500">
                {tech.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{tech.name}</h3>
                <p className="text-sm text-cyan-600">{tech.category}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{tech.reason}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Security = () => {
  const securityGroups = [
    { 
      title: "Authentication & Access Control",
      icon: <KeyRound className="w-8 h-8 text-cyan-500" />,
      items: [
        "Multi-Factor Authentication (MFA) for all user access.",
        "Principle of Least Privilege & Role-Based Access Control (RBAC).",
        "OAuth 2.0 for securing API endpoints with short-lived tokens."
      ]
    },
    { 
      title: "Data Protection",
      icon: <FileLock2 className="w-8 h-8 text-cyan-500" />,
      items: [
        "Encryption in Transit using strong SSL/TLS protocols.",
        "Encryption at Rest for all databases and stored files (AES-256).",
        "Secure key management using a dedicated service like AWS KMS."
      ]
    },
    { 
      title: "Application Security",
      icon: <Code className="w-8 h-8 text-cyan-500" />,
      items: [
        "Secure coding practices to prevent SQL injection, XSS, etc.",
        "Regular vulnerability scanning and third-party penetration testing.",
        "Continuous dependency scanning for third-party libraries."
      ]
    },
    { 
      title: "Audit & Monitoring",
      icon: <Activity className="w-8 h-8 text-cyan-500" />,
      items: [
        "Comprehensive, immutable audit trails for all significant actions.",
        "Centralized logging into a SIEM for real-time threat detection.",
        "Fault tolerance patterns like Circuit Breakers and Exponential Backoff."
      ]
    }
  ];

  return (
    <Section id="security" title="Security & Availability" subtitle="Fortifying the System" bgColor="bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                {group.icon}
                <h3 className="text-xl font-bold text-slate-900 ml-4">{group.title}</h3>
              </div>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                {group.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Implementation = () => {
  const roadmapPhases = [
    {
      phase: 1,
      title: "Foundation & Core Data",
      duration: "Months 1-6",
      deliverables: ["Kafka & DB Setup", "Security Master Service", "Data Ingestion Pipelines", "Core Position Keeping"]
    },
    {
      phase: 2,
      title: "Minimum Viable Product (MVP)",
      duration: "Months 7-12",
      deliverables: ["PM Cockpit UI (P&L, Exposure)", "Pre-Trade Compliance Engine", "Basic Order Generation & EMS Link"]
    },
    {
      phase: 3,
      title: "Advanced Analytics & Risk",
      duration: "Months 13-18",
      deliverables: ["Performance Attribution (Brinson)", "VaR & Stress Testing Module", "Portfolio Optimization Tools"]
    },
    {
      phase: 4,
      title: "Continuous Improvement",
      duration: "Ongoing",
      deliverables: ["Alternative Data Integration", "AI/ML Model Integration", "User-Driven Enhancements", "Strategic Refactoring"]
    },
  ];

  return (
    <Section id="roadmap" title="Implementation Roadmap" subtitle="Strategic Outlook">
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-center text-gray-600 mb-16">
        For a 'Build' decision, a phased, incremental implementation is critical to manage risk and deliver value early. This approach avoids a 'big bang' release, allowing for continuous user feedback and adaptation throughout the development lifecycle.
      </p>
      <div className="container mx-auto">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-gray-300 h-full border" style={{left: '50%'}}></div>
          {roadmapPhases.map((item, index) => (
            <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-cyan-500 shadow-xl w-12 h-12 rounded-full">
                <h1 className="mx-auto font-bold text-lg text-white">{item.phase}</h1>
              </div>
              <div className="order-1 bg-white border border-gray-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-slate-900 text-xl">
                  {item.title} <span className="text-sm text-cyan-600">({item.duration})</span>
                </h3>
                <ul className="text-sm leading-snug tracking-wide text-gray-600 list-disc list-inside">
                  {item.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer id="contact" className="text-gray-600 bg-gray-50 body-font border-t border-gray-200">
    <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-slate-900">
        <Scale className="w-10 h-10 text-white p-2 bg-cyan-600 rounded-full" />
        <span className="ml-3 text-xl">Portfolio Systems Inc.</span>
      </a>
      <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        {/* Social media links can go here */}
      </span>
    </div>
  </footer>
);

// MAIN APP COMPONENT ======================================================

export default function ArchitectingModernHedgeFundDesk() {
  const currentArticle = articles.find(article => article.slug === 'architecting-modern-hedge-fund-desk-system-design');

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
      
      <div className="bg-white">
        {/* Return to Home Button */}
        <div className="container mx-auto px-4 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
          
          {/* Deep Research Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              Deep Research
            </span>
          </div>
        </div>

        <main>
          <Hero />
          <CoreArchitecture />
          <SystemArchitecture />
          <DataArchitecture />
          <TechStack />
          <Security />
          <Implementation />
        </main>
        <Footer />
      </div>
    </>
  );
}
