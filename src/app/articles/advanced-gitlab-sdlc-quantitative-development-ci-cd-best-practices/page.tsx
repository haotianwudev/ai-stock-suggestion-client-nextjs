'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2, BookOpen, GitBranch, Shield, Activity, Database, Users, Rocket, Cpu, FileCode, Terminal, Lock, CheckCircle2, FileJson } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-200">
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {children}
    </main>
  </div>
);

interface SectionProps {
  id: string;
  title: string;
  icon: React.ElementType;
  colorClass: { bg: string; text: string; border: string; accent: string };
  children: React.ReactNode;
}

const Section = ({ id, title, icon: Icon, colorClass, children }: SectionProps) => (
  <section id={id} className="scroll-mt-12">
    <div className={`flex items-center gap-4 mb-8 pb-4 border-b-2 ${colorClass.border}`}>
      <div className={`p-3 rounded-2xl ${colorClass.bg} text-white shadow-lg`}>
        <Icon size={32} strokeWidth={2} />
      </div>
      <h2 className={`text-3xl md:text-4xl font-extrabold ${colorClass.text}`}>
        {title}
      </h2>
    </div>
    <div className="space-y-6 text-lg leading-relaxed text-slate-700">
      {children}
    </div>
  </section>
);

const SectionColors = {
  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-900', border: 'border-indigo-100', accent: 'bg-indigo-50' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-900', border: 'border-emerald-100', accent: 'bg-emerald-50' },
  violet: { bg: 'bg-violet-600', text: 'text-violet-900', border: 'border-violet-100', accent: 'bg-violet-50' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-900', border: 'border-amber-100', accent: 'bg-amber-50' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-900', border: 'border-rose-100', accent: 'bg-rose-50' },
  cyan: { bg: 'bg-cyan-600', text: 'text-cyan-900', border: 'border-cyan-100', accent: 'bg-cyan-50' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-900', border: 'border-blue-100', accent: 'bg-blue-50' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-900', border: 'border-orange-100', accent: 'bg-orange-50' },
};

interface DefinitionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: keyof typeof SectionColors;
}

const DefinitionCard = ({ title, description, icon: Icon, color }: DefinitionCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white ${SectionColors[color].bg}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-base">{description}</p>
  </div>
);

interface RoleCardProps {
  role: string;
  output: string;
  background: string;
  stack: string;
  workflow: string;
  compensation: string;
  trajectory: string;
  theme: string;
}

const RoleCard = ({ role, output, background, stack, workflow, compensation, trajectory, theme }: RoleCardProps) => (
  <div className={`rounded-2xl p-8 border-t-8 shadow-lg bg-white flex flex-col h-full border-${theme}-500`}>
    <h3 className={`text-2xl font-black mb-6 text-${theme}-700`}>{role}</h3>
    <div className="space-y-4 flex-grow">
      <div><strong className="block text-slate-900 text-sm uppercase tracking-wide mb-1">Primary Output</strong> <span className="text-slate-700">{output}</span></div>
      <div><strong className="block text-slate-900 text-sm uppercase tracking-wide mb-1">Academic Background</strong> <span className="text-slate-700">{background}</span></div>
      <div><strong className="block text-slate-900 text-sm uppercase tracking-wide mb-1">Core Tech Stack</strong> <span className="text-slate-700 font-mono text-sm">{stack}</span></div>
      <div><strong className="block text-slate-900 text-sm uppercase tracking-wide mb-1">Daily Workflow</strong> <span className="text-slate-700">{workflow}</span></div>
      <div className="pt-4 border-t border-slate-100">
        <strong className="block text-slate-900 text-sm uppercase tracking-wide mb-1">Compensation (Entry)</strong> <span className={`font-bold text-${theme}-600`}>{compensation}</span>
      </div>
      <div>
        <strong className="block text-slate-900 text-sm uppercase tracking-wide mb-1">Trajectory</strong> <span className="text-slate-700">{trajectory}</span>
      </div>
    </div>
  </div>
);

interface HighlightBlockProps {
  children: React.ReactNode;
  colorTheme: { border: string; accent: string };
}

const HighlightBlock = ({ children, colorTheme }: HighlightBlockProps) => (
  <blockquote className={`p-6 my-6 rounded-r-2xl border-l-4 ${colorTheme.border} ${colorTheme.accent} italic text-slate-800`}>
    {children}
  </blockquote>
);

export default function AdvancedGitLabSDLCArticle() {
  const currentArticle = articles.find(article => article.slug === 'advanced-gitlab-sdlc-quantitative-development-ci-cd-best-practices');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          {/* Deep Research Badge */}
          <div className="absolute top-8 left-6">
            <span className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg shadow-lg">
              Deep Research
            </span>
          </div>

          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-4">
              <Terminal size={16} /> Best Practices Tutorial
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-emerald-700 tracking-tight leading-tight">
              Advanced GitLab SDLC for Quant Dev
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              A comprehensive guide to managing Git version control and CI/CD pipelines specifically tailored for quantitative engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/g45Lazn.jpeg" 
            alt="GitLab SDLC Infographic" 
            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
          {/* Full-screen button overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageViewerOpen(true);
            }}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            title="View full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          {/* Click hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              Click to view full screen
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src="https://i.imgur.com/g45Lazn.jpeg"
        alt="GitLab SDLC Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      <PageContainer>
        {/* Introduction */}
        <Section title="Introduction to the Paradigm" icon={BookOpen} colorClass={SectionColors.indigo}>
          <p>
            Quantitative finance sits at the complex intersection of advanced mathematics, statistics, and high-performance software engineering. The operational success of a quantitative trading firm is fundamentally predicated on its ability to rapidly translate theoretical mathematical models into reliable, low-latency, and highly scalable production software systems.
          </p>
          <HighlightBlock colorTheme={SectionColors.indigo}>
            In unregulated software environments, development teams might occasionally embrace a philosophy of moving fast and breaking things; however, in the financial sector, deploying a flawed algorithmic model or encountering a seemingly minor latency regression can precipitate catastrophic trading losses, severe regulatory censures, and irreversible reputational damage.
          </HighlightBlock>
          <p>
            The implementation of a unified DevSecOps platform transforms the theoretical workflow into a repeatable, auditable process. By tying together source code control, code reviews, automated testing, and production deployments into a single ecosystem, firms enable dozens of internal teams to migrate to daily production releases, drastically minimizing the time-to-market for new financial engineering solutions.
          </p>
        </Section>

        {/* Foundational Terminology */}
        <Section title="Foundational SDLC Terminology" icon={CheckCircle2} colorClass={SectionColors.emerald}>
          <p className="mb-8">
            To establish a unified analytical framework for quantitative systems development, several foundational definitions and methodologies must be thoroughly understood. These form the bedrock of modern software engineering.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DefinitionCard 
              title="SDLC" 
              icon={GitBranch} 
              color="emerald"
              description="The Software Development Life Cycle represents the overarching, structured process encompassing the planning, creation, testing, deployment, and ongoing maintenance of a software application. It ensures complex logic is auditable, reliable, and secure."
            />
            <DefinitionCard 
              title="Continuous Integration (CI)" 
              icon={Terminal} 
              color="blue"
              description="A practice where developers merge code into a central repository frequently. Every commit automatically triggers builds and tests to identify bugs, type-check errors, and integration failures within minutes."
            />
            <DefinitionCard 
              title="Continuous Delivery (CD)" 
              icon={Rocket} 
              color="violet"
              description="Extends CI by automating releases. The codebase is perpetually maintained in a deployable state, but a final documented human approval (four-eyes review) is strictly required before live production deployment."
            />
            <DefinitionCard 
              title="Software Artifacts" 
              icon={FileJson} 
              color="amber"
              description="Immutable, compiled packages generated by a successful CI pipeline. An artifact tested in staging must be deployed identically, bit-for-bit, to production to eliminate environmental discrepancies."
            />
            <DefinitionCard 
              title="Feature Flags" 
              icon={Activity} 
              color="rose"
              description="Configuration mechanisms allowing developers to deploy inactive code to production. Facilitates 'dark launching' algorithms to a fraction of traffic, with instant disablement if market behavior is unexpected."
            />
          </div>
        </Section>

        {/* Tripartite Structure */}
        <Section title="The Tripartite Structure of Quant Teams" icon={Users} colorClass={SectionColors.violet}>
          <p>
            The modern quantitative trading ecosystem is broadly supported by three distinct but highly interdependent specialized roles. Understanding their specific workflows is essential for designing an SDLC that avoids operational friction.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <RoleCard 
              theme="violet"
              role="Quant Researcher"
              output="Trading signals, predictive models, backtests."
              background="PhD in Mathematics, Statistics, Physics, or ML."
              stack="Python (Pandas, NumPy, SciPy), R, MATLAB, Jupyter."
              workflow="Data exploration, feature engineering, hypothesis testing."
              compensation="$250k - $400k"
              trajectory="Senior Researcher → Portfolio Manager"
            />
            <RoleCard 
              theme="blue"
              role="Quant Developer"
              output="Production systems, data pipelines, low-latency infrastructure."
              background="BS/MS in Computer Science, Systems Engineering."
              stack="C++, Python, Java, Rust, OCaml, FPGA."
              workflow="Systems architecture, performance optimization, CI/CD management."
              compensation="$200k - $350k"
              trajectory="Staff Engineer → Tech Lead → CTO"
            />
            <RoleCard 
              theme="emerald"
              role="Quant Trader"
              output="P&L generation, risk management, execution monitoring."
              background="BS/MS in Mathematics, CS, or Quant Finance."
              stack="Python for scripting, proprietary dashboards, SQL."
              workflow="Pre-market risk assessment, live portfolio monitoring, intervention."
              compensation="$300k - $450k"
              trajectory="Senior Trader → Desk Head → Portfolio Manager"
            />
          </div>
        </Section>

        {/* Version Control */}
        <Section title="Version Control & Branching" icon={GitBranch} colorClass={SectionColors.amber}>
          <p>
            A stringent commit discipline is essential for maintaining repository hygiene. Code commits must be kept rigorously atomic and incremental. An atomic commit represents a single, indivisible unit of work without blending multiple unrelated changes.
          </p>
          <HighlightBlock colorTheme={SectionColors.amber}>
            Industry best practices dictate writing descriptive commit messages utilizing the imperative mood and present tense (e.g., stating "Add mean reversion signal" instead of "Added mean reversion signal"). Explain <strong>why</strong> the change was made; the syntax explains <strong>what</strong>.
          </HighlightBlock>
          <h3 className="text-2xl font-bold mt-8 mb-4 text-amber-900">Branching Strategies</h3>
          <ul className="list-disc list-inside space-y-3 marker:text-amber-500 ml-4">
            <li><strong>Trunk-Based Development:</strong> Highly favored for velocity. Developers work on short-lived feature branches lasting hours, merging directly into <code className="bg-amber-100 px-2 py-1 rounded text-sm">main</code> frequently, backed by rigorous CI testing.</li>
            <li><strong>GitLab/GitHub Flow:</strong> A structured middle ground utilizing feature branches, formal Merge Requests, rigorous peer review, and merging upon explicit approval.</li>
            <li><strong>Monorepo vs. Multi-repo:</strong> Small teams favor single product repos. Enterprise scale environments use Monorepos with advanced tools (Nx, Turborepo) to share quant libraries and unify CI pipelines.</li>
          </ul>
        </Section>

        {/* Jupyter Challenges */}
        <Section title="Overcoming Jupyter Notebook Challenges" icon={FileCode} colorClass={SectionColors.cyan}>
          <p>
            Quantitative researchers overwhelmingly utilize Jupyter Notebooks. However, because they are deeply nested JSON documents containing code, markdown, and heavy binary outputs (plots, images), they present severe difficulties for Git diffing and merging.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-cyan-100 mt-6">
            <h3 className="text-xl font-bold text-cyan-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-cyan-500" /> Automated Tooling Solutions
            </h3>
            <div className="space-y-6">
              <div>
                <strong className="text-slate-900 block mb-1">1. nbstripout</strong>
                <p className="text-sm">Acts as an automated Git filter or pre-commit hook that strips all output data and execution metadata before commits. Eliminates graphical diff noise and prevents data leaks.</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">2. Jupytext</strong>
                <p className="text-sm">Establishes bidirectional synchronization between the <code className="bg-cyan-100 px-2 py-1 rounded text-sm">.ipynb</code> notebook and a plain text Python script. Git tracks the plain text script for clean code reviews while researchers use the notebook.</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">3. ReviewNB & nbdime</strong>
                <p className="text-sm">Tools designed specifically for diffing and merging notebook JSON structures visually, allowing side-by-side rendering and inline commenting within Merge Requests.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Data Management */}
        <Section title="Managing Datasets & ML Models" icon={Database} colorClass={SectionColors.orange}>
          <p>
            Quant strategies rely on vast arrays of historical data and massive ML models. Git is fundamentally incapable of storing massive binary files. To manage large assets effectively, teams strictly decouple code versioning from data versioning.
          </p>
          
          <div className="overflow-x-auto mt-8 rounded-xl shadow-lg border border-slate-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Feature</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Git LFS</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Data Version Control (DVC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">Primary Use Case</td>
                  <td className="p-4 text-slate-600">Transparent, generalized file storage.</td>
                  <td className="p-4 text-slate-600 font-medium">Large storage, ML pipelines, experiment tracking.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">Storage Backend</td>
                  <td className="p-4 text-slate-600">Requires dedicated LFS servers.</td>
                  <td className="p-4 text-slate-600 font-medium">Cloud-agnostic (S3, GCP, NAS) without middlemen.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">Workflow</td>
                  <td className="p-4 text-slate-600">Implicit via standard <code className="bg-slate-100 px-2 py-1 rounded text-sm">git pull</code>.</td>
                  <td className="p-4 text-slate-600 font-medium">Explicit via <code className="bg-slate-100 px-2 py-1 rounded text-sm">dvc pull</code> alongside Git.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold text-slate-800">Pipeline Tracking</td>
                  <td className="p-4 text-slate-600">None. Isolated objects.</td>
                  <td className="p-4 text-slate-600 font-medium">Native dependency graphs via <code className="bg-slate-100 px-2 py-1 rounded text-sm">dvc.yaml</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* CI/CD Architecture */}
        <Section title="Architecting CI/CD & Performance Testing" icon={Cpu} colorClass={SectionColors.rose}>
          <p>
            A robust CI pipeline must operate with extreme velocity. Verification sequences should ideally execute in under ten minutes. The typical workflow includes deep static analysis (Ruff, mypy), unit testing (pytest), integration testing against mocked databases, and abbreviated historical backtest regressions.
          </p>
          
          <h3 className="text-2xl font-bold mt-8 mb-4 text-rose-900">Optimization Strategies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
              <strong className="block text-rose-800 mb-2 font-bold">Directed Acyclic Graphs (DAGs)</strong>
              <p className="text-sm text-rose-900/80">Abandoning strict sequential stages using the <code className="bg-rose-100 px-2 py-1 rounded text-sm">needs:</code> keyword. Jobs execute instantly when prerequisites are met, maximizing parallelization.</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
              <strong className="block text-rose-800 mb-2 font-bold">Advanced Caching</strong>
              <p className="text-sm text-rose-900/80">Persisting Python PIP directories or Docker layers in S3 buckets for instant access by globally distributed runners.</p>
            </div>
          </div>

          <p>
            <strong>Load & Performance Testing:</strong> In High-Frequency Trading (HFT), latency is unforgiving. GitLab automates load testing using tools like <code className="bg-rose-100 px-2 py-1 rounded text-sm">k6</code> to simulate concurrent API load, generating artifacts that visually compare 95th percentile (P95) latency regressions directly inside the Merge Request.
          </p>
        </Section>

        {/* Security & Governance */}
        <Section title="Security, Governance & Continuous Compliance" icon={Shield} colorClass={SectionColors.blue}>
          <p>
            Financial institutions require strict adherence to the "Four Eyes" principle—a segregation of duties ensuring no single individual can author, approve, and deploy code independently.
          </p>
          <HighlightBlock colorTheme={SectionColors.blue}>
            Continuous Compliance Control Protocol (C3P) resolves the friction between CI/CD velocity and regulatory frameworks by embedding hard programmatic gates into the pipeline.
          </HighlightBlock>
          
          <ul className="space-y-4 text-slate-700 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <li className="flex gap-4">
              <Lock className="text-blue-500 shrink-0 mt-1" size={20} />
              <div><strong>Prevent Author Approval:</strong> Project settings explicitly prevent authors (and subsequent committers) from approving their own Merge Requests.</div>
            </li>
            <li className="flex gap-4">
              <Users className="text-blue-500 shrink-0 mt-1" size={20} />
              <div><strong>Code Owner Approvals:</strong> <code className="bg-blue-100 px-2 py-1 rounded text-sm">CODEOWNERS</code> files map sensitive directories (like C++ execution engines) to experts whose explicit approval is mathematically mandated.</div>
            </li>
            <li className="flex gap-4">
              <Shield className="text-blue-500 shrink-0 mt-1" size={20} />
              <div><strong>Advanced SAST & DAST:</strong> Real-time static and dynamic vulnerability scanning. Secret Detection aggressively blocks <code className="bg-blue-100 px-2 py-1 rounded text-sm">git pushes</code> containing identifiable API keys.</div>
            </li>
          </ul>
        </Section>

        {/* Competitive Advantage */}
        <footer className="mt-20 pt-10 border-t border-slate-200 text-center pb-12">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 text-white rounded-full mb-6 shadow-xl shadow-indigo-200">
            <Rocket size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">The Competitive Advantage</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Embracing a fully modernized, automated SDLC transforms quantitative infrastructure from a mere operational necessity into a highly distinct, durable competitive advantage. It marries exploratory data science with uncompromising software reliability.
          </p>
        </footer>

        {/* Google Doc Call-to-Action */}
        {currentArticle?.googleDoc && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Read the Full Research Paper</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Paper
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm pt-12 border-t border-slate-200">
          <p>© 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
        </div>
      </PageContainer>
    </>
  );
}
