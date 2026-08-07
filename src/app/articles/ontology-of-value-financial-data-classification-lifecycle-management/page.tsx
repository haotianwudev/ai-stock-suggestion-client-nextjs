'use client';

import React, { useState } from 'react';
import { Database, Shield, Globe, Layers, Activity, PieChart, TrendingUp, AlertTriangle, Server, FileText, CheckCircle, ArrowRight, Calculator, Clock, Briefcase, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Reusable Components ---
const SectionHeader = ({ title, subtitle, icon: Icon, colorClass }: { title: string; subtitle: string; icon: React.ElementType; colorClass: string }) => (
  <div className={`mb-8 border-l-4 ${colorClass} pl-6 py-2`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${colorClass.replace('border-', 'bg-').replace('600', '100')} text-${colorClass.split('-')[1]}-700`}>
        <Icon size={28} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
    </div>
    <p className="text-lg text-slate-600 max-w-3xl">{subtitle}</p>
  </div>
);

const ConceptCard = ({ title, description, children, accentColor }: { title: string; description: string; children?: React.ReactNode; accentColor: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className={`h-1 w-full bg-${accentColor}-500`} />
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">{title}</h3>
      <div className="text-slate-600 mb-4 text-sm leading-relaxed">{description}</div>
      {children && <div className="mt-4 pt-4 border-t border-slate-100">{children}</div>}
    </div>
  </div>
);

const DetailList = ({ items }: { items: Array<{ label: string; text: string }> }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
        <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
        <span>
          <strong className="font-semibold text-slate-900">{item.label}:</strong> {item.text}
        </span>
      </li>
    ))}
  </ul>
);

export default function OntologyOfValueArticle() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  return (
    <ArticleFrame slug="ontology-of-value-financial-data-classification-lifecycle-management">
      <InfographicSlot alt="Ontology of Value Infographic" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          
          {/* Introduction */}
          <section className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                In the modern financial ecosystem, data is not merely information—it is the <strong>structural DNA</strong> that enables every transaction, valuation, and risk calculation. From the moment a security is issued to its final settlement, a complex web of identifiers, classifications, and temporal records governs its existence.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                This comprehensive guide explores the <strong>ontology of financial value</strong>: the systematic classification and lifecycle management of financial instruments, entities, transactions, and positions. Whether you're building a trading platform, implementing a portfolio management system, or simply seeking to understand how institutional finance operates at the data layer, this framework provides the foundational architecture.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-lg font-bold text-indigo-900 mb-2">What You'll Master</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Product Master:</strong> Global identification standards (ISIN, CUSIP, FIGI) and asset-specific attributes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Entity & Account Hierarchies:</strong> From households to sleeves, understanding ownership structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Transaction Lifecycle:</strong> ISO 20022 migration and structured event processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Tax Lot Accounting:</strong> Cost basis methodologies and corporate action mathematics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>The Three Books:</strong> IBOR, ABOR, and PBOR—separating trading, accounting, and performance views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Performance Attribution:</strong> TWRR vs MWRR and GIPS compliance frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Risk Architecture:</strong> VaR, stress testing, and liquidity classification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                    <span><strong>Data Engineering:</strong> Master Data Management (MDM) and bitemporal design patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 1: Product Master */}
          <section id="product-master">
            <SectionHeader 
              title="The Product Master" 
              subtitle="The central nervous system of any investment platform. It defines the universe of tradable assets and their behavioral attributes."
              icon={Shield}
              colorClass="border-blue-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                The <strong>Product Master</strong> is the authoritative registry of all tradable instruments within a financial system. It serves as the single source of truth for security attributes, from basic identifiers to complex behavioral characteristics. Without a robust Product Master, downstream processes—trading, risk management, compliance reporting—become impossible.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Think of it as the "birth certificate" for every financial instrument. Before a security can be traded, valued, or reported, it must first be <em>defined</em>. This definition includes not just "what it is" (equity, bond, derivative), but also "how it behaves" (coupon frequency, voting rights, embedded options).
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800">Global Identification Standards</h3>
                <p className="text-slate-600">Before an instrument can be classified, it must be uniquely identified across global markets. Multiple identification schemes exist, each serving different regulatory and operational purposes.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ConceptCard 
                    title="ISIN" 
                    description="International Securities Identification Number. ISO 6166 standard. 12-character alphanumeric code (2-letter country + 9-digit identifier + check digit). Essential for cross-border trading and MiFID II reporting. Example: US0378331005 (Apple Inc.)." 
                    accentColor="blue" 
                  />
                  <ConceptCard 
                    title="CUSIP" 
                    description="Committee on Uniform Securities Identification Procedures. 9-character alphanumeric code used in North America. Crucial for settlement within the DTC (Depository Trust Company) ecosystem. Managed by CUSIP Global Services (CGS)." 
                    accentColor="blue" 
                  />
                  <ConceptCard 
                    title="FIGI" 
                    description="Financial Instrument Global Identifier. An open standard maintained by Bloomberg that remains persistent across corporate actions, unlike tickers which can change. Enables cross-platform instrument matching without vendor lock-in." 
                    accentColor="blue" 
                  />
                  <ConceptCard 
                    title="LEI" 
                    description="Legal Entity Identifier of the issuer. 20-character alphanumeric code. Mandatory under Dodd-Frank and EMIR for tracking counterparty risk and regulatory reporting. Links instruments to their ultimate parent entities." 
                    accentColor="blue" 
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-blue-900 mb-2">Why Multiple Identifiers?</h4>
                  <p className="text-sm text-blue-800">
                    Different markets and regulators mandate different standards. A robust system maintains <strong>cross-reference mappings</strong> between ISIN, CUSIP, SEDOL, FIGI, and Bloomberg Ticker to ensure seamless data integration across vendors and jurisdictions.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Asset Class Attributes</h3>
                <p className="text-slate-600 mb-6">
                  Beyond identification, each asset class requires <strong>specific behavioral metadata</strong> to enable accurate valuation, risk analysis, and compliance reporting. The Product Master must capture these nuances.
                </p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-bold text-blue-700 mb-3">
                      <TrendingUp size={20} /> Equities
                    </h4>
                    <div className="pl-4 border-l-2 border-blue-100">
                      <DetailList items={[
                        { label: "Voting Rights", text: "Essential for proxy voting workflows. Distinguishes common (voting) from preferred (non-voting) shares. Critical for ESG engagement strategies." },
                        { label: "Free Float", text: "Percentage of shares available for public trading (excludes insider holdings). Inputs for liquidity risk models and index weighting methodologies (e.g., MSCI uses free-float adjusted market cap)." },
                        { label: "GICS/ICB", text: "Global Industry Classification Standard (MSCI/S&P) or Industry Classification Benchmark (FTSE). Sector classification driving rotation strategies, factor attribution, and benchmark construction." },
                        { label: "ADR/GDR Ratio", text: "For depositary receipts, the conversion ratio to underlying shares. Example: Alibaba ADR (BABA) represents 8 ordinary shares." },
                        { label: "Dividend Policy", text: "Frequency (quarterly, annual), ex-dividend dates, and payment dates. Required for income forecasting and total return calculations." }
                      ]} />
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-bold text-blue-700 mb-3">
                      <Activity size={20} /> Fixed Income
                    </h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Bonds are <strong>contractual cash flow machines</strong>. The Product Master must encode the legal terms that govern these flows.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-blue-50 text-blue-900 font-semibold">
                          <tr>
                            <th className="px-4 py-2 rounded-l-lg">Attribute</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2 rounded-r-lg">Usage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-50">
                          <tr>
                            <td className="px-4 py-3 font-medium">Coupon Logic</td>
                            <td className="px-4 py-3 text-slate-600">Fixed, Floating (LIBOR+spread), Zero-Coupon</td>
                            <td className="px-4 py-3 text-slate-600">Calculating Accrued Interest (AI)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Day Count Convention</td>
                            <td className="px-4 py-3 text-slate-600">30/360, Act/Act, Act/360, Act/365</td>
                            <td className="px-4 py-3 text-slate-600">Critical for settlement amount precision</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Embedded Options</td>
                            <td className="px-4 py-3 text-slate-600">Callable, Putable, Convertible</td>
                            <td className="px-4 py-3 text-slate-600">Calc Yield-to-Worst, OAS, Convexity</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Seniority</td>
                            <td className="px-4 py-3 text-slate-600">Senior Secured, Senior Unsecured, Subordinated</td>
                            <td className="px-4 py-3 text-slate-600">Recovery rate assumptions in default scenarios</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Credit Rating</td>
                            <td className="px-4 py-3 text-slate-600">S&P, Moody's, Fitch composite</td>
                            <td className="px-4 py-3 text-slate-600">Regulatory capital requirements (Basel III)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-bold text-blue-700 mb-3">
                      <Globe size={20} /> Derivatives
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Options, futures, and swaps require <strong>contract specifications</strong> that define payoff structures.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li><strong>Underlying Asset:</strong> Link to Product Master entry (e.g., SPY for SPY options)</li>
                        <li><strong>Contract Multiplier:</strong> 100 shares per equity option, $1000 per S&P 500 futures point</li>
                        <li><strong>Exercise Style:</strong> American (anytime), European (expiry only), Bermudan (specific dates)</li>
                        <li><strong>Settlement Method:</strong> Physical delivery vs. cash settlement</li>
                        <li><strong>Margin Requirements:</strong> Initial and maintenance margin for futures/options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="text-blue-900 font-bold flex items-center gap-2 mb-3">
                <Globe size={18} /> Regulatory Classifications: SFDR
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                The EU's <strong>Sustainable Finance Disclosure Regulation (SFDR)</strong> mandates product-level sustainability classification. This metadata is now a <em>required field</em> for any fund sold in Europe.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-3 rounded-lg shadow-sm flex-1 min-w-[200px]">
                  <strong className="block text-slate-800 mb-1">Article 6</strong>
                  <span className="text-sm text-slate-500">Integrates sustainability risks only. No explicit ESG promotion.</span>
                </div>
                <div className="bg-emerald-50 px-4 py-3 rounded-lg shadow-sm flex-1 min-w-[200px] border border-emerald-100">
                  <strong className="block text-emerald-800 mb-1">Article 8 (Light Green)</strong>
                  <span className="text-sm text-emerald-600">Promotes environmental/social characteristics. Must disclose how characteristics are met.</span>
                </div>
                <div className="bg-emerald-100 px-4 py-3 rounded-lg shadow-sm flex-1 min-w-[200px] border border-emerald-200">
                  <strong className="block text-emerald-900 mb-1">Article 9 (Dark Green)</strong>
                  <span className="text-sm text-emerald-700">Sustainable investment is the objective. Strictest reporting requirements.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Visual Summary Infographic */}
          <section className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Visual Framework: The Complete Data Architecture</h2>
              <p className="text-center text-slate-600 mb-6 max-w-3xl mx-auto">
                This comprehensive infographic maps the entire financial data ecosystem—from product identification to performance measurement. Click to explore in full-screen mode.
              </p>
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl border border-slate-300 cursor-pointer group relative bg-white"
                onClick={() => setIsImageViewerOpen(true)}
              >
                <img 
                  src="https://i.imgur.com/V1PQ2CD.jpeg" 
                  alt="The Ontology of Value - Complete Financial Data Architecture" 
                  className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                />
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
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                  <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                    Click to view full screen
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FullScreenImageViewer
            src="https://i.imgur.com/V1PQ2CD.jpeg"
            alt="The Ontology of Value - Complete Financial Data Architecture"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />

          {/* Section 2: Entity & Account Master */}
          <section id="entity-master">
            <SectionHeader 
              title="Entity & Account Master" 
              subtitle="Defining who is trading and where assets reside. The backbone of client reporting and compliance."
              icon={Layers}
              colorClass="border-emerald-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                While the Product Master defines <em>what</em> is being traded, the <strong>Entity & Account Master</strong> defines <em>who</em> owns it and <em>where</em> it resides. This hierarchical structure enables everything from consolidated wealth reporting to regulatory compliance (KYC/AML) to tax optimization strategies.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Modern wealth management platforms support <strong>multi-level account hierarchies</strong> that mirror real-world ownership structures: from households (family wealth) down to sleeves (sub-account allocations within Unified Managed Accounts).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">The Account Hierarchy</h3>
                <p className="text-sm text-slate-600 mb-4">
                  A <strong>four-tier structure</strong> that balances operational flexibility with regulatory requirements:
                </p>
                <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                    <h4 className="font-bold text-slate-900">1. Client / Household</h4>
                    <p className="text-sm text-slate-500">
                      Top-level owner (e.g., "The Smith Family"). Aggregates Total Wealth across all accounts. Used for relationship management and consolidated reporting. Links to CRM systems.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-white"></div>
                    <h4 className="font-bold text-slate-900">2. Custodial Account</h4>
                    <p className="text-sm text-slate-500">
                      Legal vessel at a custodian bank (e.g., Pershing, Schwab). This is the level for <strong>Form 1099-B</strong> tax reporting. Each account has a unique account number and legal registration (Individual, Joint, IRA, Trust).
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-300 ring-4 ring-white"></div>
                    <h4 className="font-bold text-slate-900">3. Portfolio / Strategy</h4>
                    <p className="text-sm text-slate-500">
                      Logical grouping within an account (e.g., "US Growth Equity", "Fixed Income Core"). Enables <strong>model portfolio</strong> assignment and performance attribution by strategy. Not a legal entity.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-200 ring-4 ring-white"></div>
                    <h4 className="font-bold text-slate-900">4. Sleeve / Sub-Account</h4>
                    <p className="text-sm text-slate-500">
                      Virtual partition for <strong>Unified Managed Accounts (UMAs)</strong>. Enables multi-manager strategies within a single custodial account. Critical for avoiding <em>wash sales</em> across sleeves while maintaining tax-lot isolation.
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-900 mb-2">Why This Matters</h4>
                  <p className="text-sm text-emerald-800">
                    <strong>Aggregation flexibility:</strong> Report at household level for wealth planning, but trade and reconcile at custodial account level for operational accuracy. Performance attribution happens at portfolio level, while tax optimization occurs at sleeve level.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Legal Entity Controls & Compliance</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Every entity in the system must be classified for <strong>regulatory compliance</strong>. These attributes drive automated screening, reporting, and risk management workflows.
                </p>
                
                <ConceptCard 
                  title="KYC & AML" 
                  description="Know Your Customer and Anti-Money Laundering. Mandatory classification for High Risk entities, PEP (Politically Exposed Persons), or Sanctioned individuals/countries." 
                  accentColor="emerald" 
                >
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Risk Tiers:</strong> Low, Medium, High, Prohibited</p>
                    <p><strong>Screening:</strong> OFAC, EU Sanctions, UN Sanctions lists</p>
                    <p><strong>Refresh Frequency:</strong> Daily for High Risk, Quarterly for others</p>
                  </div>
                </ConceptCard>

                <ConceptCard 
                  title="FATCA / CRS" 
                  description="Foreign Account Tax Compliance Act (US) and Common Reporting Standard (OECD). Tax residency classification to facilitate global tax information exchange." 
                  accentColor="emerald" 
                >
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>W-8/W-9 Forms:</strong> Capture tax residency and withholding status</p>
                    <p><strong>Reportable Accounts:</strong> Automatic exchange with tax authorities</p>
                    <p><strong>Withholding Rates:</strong> 0%, 15%, 30% based on treaty status</p>
                  </div>
                </ConceptCard>

                <ConceptCard 
                  title="Counterparty Risk" 
                  description="Linking issuers to ultimate parents (e.g., Apple Inc. → Apple Inc. Parent) to view total corporate family exposure and concentration risk." 
                  accentColor="emerald" 
                >
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>LEI Hierarchy:</strong> Map subsidiaries to ultimate parent</p>
                    <p><strong>Exposure Limits:</strong> Aggregate across all entities in corporate tree</p>
                    <p><strong>Credit Events:</strong> Propagate ratings changes up/down hierarchy</p>
                  </div>
                </ConceptCard>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <Shield size={16} /> Regulatory Reporting
                  </h4>
                  <p className="text-sm text-emerald-800">
                    Entity Master data feeds directly into <strong>Form PF</strong> (SEC), <strong>AIFMD</strong> (EU), and <strong>MiFID II</strong> transaction reporting. Incomplete or inaccurate entity data can result in regulatory fines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Transaction Lifecycle */}
          <section id="transactions">
            <SectionHeader 
              title="Transaction Lifecycle" 
              subtitle="The atomic events of the financial system. Moving from unstructured text to structured ISO 20022 data."
              icon={ArrowRight}
              colorClass="border-amber-500"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                Transactions are the <strong>atomic events</strong> that change portfolio state. Every buy, sell, dividend, corporate action, or fee must be captured, classified, and processed through a standardized lifecycle. The industry is undergoing a historic migration from legacy messaging formats to <strong>ISO 20022</strong>—a shift that enables richer data capture and automated reconciliation.
              </p>
            </div>
            
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-8 mb-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-32 bg-amber-500 opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">ISO 20022 Standard</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    The industry is migrating from <strong>ISO 15022 (MT)</strong> to <strong>ISO 20022 (MX)</strong>. This shift moves from unstructured text blocks to rich, structured XML/JSON data models capable of carrying "Ultimate Debtor", detailed remittance info, and regulatory identifiers.
                  </p>
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
                    <h4 className="text-amber-300 font-bold mb-2">Why It Matters</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• <strong>Straight-Through Processing (STP):</strong> Automated reconciliation without manual intervention</li>
                      <li>• <strong>Regulatory Compliance:</strong> Embedded LEI, transaction IDs for MiFID II/EMIR</li>
                      <li>• <strong>Cross-Border Payments:</strong> SWIFT gpi tracking, FX transparency</li>
                      <li>• <strong>Corporate Actions:</strong> Structured election instructions (e.g., stock vs. cash dividend)</li>
                    </ul>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="bg-slate-800 px-4 py-2 rounded border border-slate-700">
                      <span className="block text-xs text-slate-400 uppercase tracking-wide">Legacy</span>
                      <span className="font-mono text-red-300">MT Format</span>
                    </div>
                    <div className="flex items-center text-slate-500">
                      <ArrowRight size={20}/>
                    </div>
                    <div className="bg-slate-800 px-4 py-2 rounded border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      <span className="block text-xs text-amber-400 uppercase tracking-wide">Modern</span>
                      <span className="font-mono text-green-300">MX Format</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-200 mb-4">Core Transaction Types</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="bg-slate-800 p-3 rounded flex justify-between items-center border-l-2 border-blue-500">
                      <div>
                        <span className="block font-semibold">Trade Activity</span>
                        <span className="text-xs text-slate-400">Buy, Sell, Short, Cover</span>
                      </div>
                      <span className="text-xs bg-blue-900/50 px-2 py-1 rounded">T+2 Settlement</span>
                    </div>
                    <div className="bg-slate-800 p-3 rounded flex justify-between items-center border-l-2 border-green-500">
                      <div>
                        <span className="block font-semibold">Income Activity</span>
                        <span className="text-xs text-slate-400">Dividends, Interest, Coupons</span>
                      </div>
                      <span className="text-xs bg-green-900/50 px-2 py-1 rounded">Cash Flow</span>
                    </div>
                    <div className="bg-slate-800 p-3 rounded flex justify-between items-center border-l-2 border-purple-500">
                      <div>
                        <span className="block font-semibold">Corporate Actions</span>
                        <span className="text-xs text-slate-400">Splits, Mergers, Spin-offs</span>
                      </div>
                      <span className="text-xs bg-purple-900/50 px-2 py-1 rounded">Mandatory/Voluntary</span>
                    </div>
                    <div className="bg-slate-800 p-3 rounded flex justify-between items-center border-l-2 border-orange-500">
                      <div>
                        <span className="block font-semibold">Cash Activity</span>
                        <span className="text-xs text-slate-400">Deposits, Withdrawals, Fees</span>
                      </div>
                      <span className="text-xs bg-orange-900/50 px-2 py-1 rounded">Non-Trade</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Transaction State Machine</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Every transaction progresses through a <strong>state machine</strong> from initiation to final settlement:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <strong className="text-slate-900">Pending</strong>
                      <p className="text-xs text-slate-500">Order submitted, awaiting execution</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <strong className="text-slate-900">Executed</strong>
                      <p className="text-xs text-slate-500">Trade confirmed, price locked</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <strong className="text-slate-900">Settled</strong>
                      <p className="text-xs text-slate-500">Cash and securities exchanged (T+2)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">4</div>
                    <div>
                      <strong className="text-slate-900">Reconciled</strong>
                      <p className="text-xs text-slate-500">Matched with custodian statement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Critical Transaction Attributes</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-amber-400 pl-3">
                    <strong className="text-slate-900">Trade Date vs. Settlement Date</strong>
                    <p className="text-slate-600">Trade Date (T) = when price is locked. Settlement Date (T+2 for equities) = when ownership transfers. Critical for accrual accounting.</p>
                  </div>
                  <div className="border-l-2 border-amber-400 pl-3">
                    <strong className="text-slate-900">Gross vs. Net Amount</strong>
                    <p className="text-slate-600">Gross = principal. Net = principal ± fees ± accrued interest. Settlement systems use Net Amount.</p>
                  </div>
                  <div className="border-l-2 border-amber-400 pl-3">
                    <strong className="text-slate-900">Transaction ID (UTI)</strong>
                    <p className="text-slate-600">Unique Transaction Identifier. Required for EMIR/Dodd-Frank reporting. Must be globally unique and persistent.</p>
                  </div>
                  <div className="border-l-2 border-amber-400 pl-3">
                    <strong className="text-slate-900">Counterparty</strong>
                    <p className="text-slate-600">Who is on the other side? Broker, exchange, or internal transfer. Links to Entity Master for credit risk.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Tax Lot Accounting */}
          <section id="tax-lots">
            <SectionHeader 
              title="Tax Lot Accounting" 
              subtitle="The micro-structure of holdings. Managing distinct purchase events, cost basis, and selection methodologies."
              icon={Calculator}
              colorClass="border-rose-500"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                A <strong>tax lot</strong> is a distinct purchase event with its own acquisition date, quantity, and cost basis. When you sell shares, the IRS requires you to specify <em>which</em> lots you're selling—a decision that can dramatically impact your tax liability. This is where <strong>lot selection methodologies</strong> become critical.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Modern portfolio management systems maintain <strong>lot-level granularity</strong> to enable tax-loss harvesting, wash sale detection, and optimal liquidation strategies. The difference between FIFO and HIFO can mean thousands of dollars in tax savings.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-rose-50 px-6 py-4 border-b border-rose-100 flex justify-between items-center">
                    <h3 className="font-bold text-rose-900">Lot Selection Methodologies</h3>
                    <span className="text-xs font-medium bg-white px-2 py-1 rounded text-rose-600 border border-rose-200">Impacts Realized Gain</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-6 py-3 text-left">Method</th>
                        <th className="px-6 py-3 text-left">Utility</th>
                        <th className="px-6 py-3 text-left">Tax Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-800">FIFO <span className="text-slate-400 font-normal">(First-In, First-Out)</span></td>
                        <td className="px-6 py-4 text-slate-600">Simplicity; Regulatory Default</td>
                        <td className="px-6 py-4 text-slate-600">Often highest tax in rising markets.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-800">LIFO <span className="text-slate-400 font-normal">(Last-In, First-Out)</span></td>
                        <td className="px-6 py-4 text-slate-600">Volatile Markets</td>
                        <td className="px-6 py-4 text-slate-600">Minimizes gains in rising markets.</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-800">HIFO <span className="text-slate-400 font-normal">(Highest-In, First-Out)</span></td>
                        <td className="px-6 py-4 text-slate-600">Tax Loss Harvesting</td>
                        <td className="px-6 py-4 text-slate-600">Maximizes realized losses.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4">Corporate Action Math: Tax-Free Spin-Off</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    When a company spins off a subsidiary (e.g., PayPal from eBay), the IRS requires you to <strong>allocate your original cost basis</strong> between the parent and the new entity based on their relative fair market values on the distribution date.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2 border border-slate-200">
                    <p className="text-slate-500 mb-2">// Allocate basis based on Relative Fair Market Value (FMV)</p>
                    <p>1. Total_Value = Parent_FMV + Sub_FMV</p>
                    <p>2. Ratio_Parent = Parent_FMV / Total_Value</p>
                    <p>3. Ratio_Sub = Sub_FMV / Total_Value</p>
                    <div className="h-px bg-slate-300 my-2"></div>
                    <p className="font-bold text-indigo-600">New_Parent_Basis = Old_Basis × Ratio_Parent</p>
                    <p className="font-bold text-indigo-600">New_Sub_Basis = Old_Basis × Ratio_Sub</p>
                  </div>
                  <div className="mt-4 bg-rose-50 border border-rose-200 rounded p-3">
                    <p className="text-xs text-rose-800">
                      <strong>Example:</strong> You bought 100 shares of Parent Co. for $10,000. After spin-off, Parent trades at $80 and Sub at $20. Total value = $10,000. Ratio_Parent = 80%, Ratio_Sub = 20%. New basis: Parent = $8,000, Sub = $2,000.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4">Wash Sale Detection</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    The <strong>Wash Sale Rule</strong> (IRS Section 1091) disallows a loss deduction if you repurchase a "substantially identical" security within 30 days before or after the sale. The disallowed loss is added to the cost basis of the new lot.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded p-4">
                    <h4 className="font-bold text-amber-900 mb-2">Detection Algorithm</h4>
                    <div className="text-xs text-amber-800 space-y-1 font-mono">
                      <p>FOR each sale with loss:</p>
                      <p>&nbsp;&nbsp;Check purchases in [Sale_Date - 30, Sale_Date + 30]</p>
                      <p>&nbsp;&nbsp;IF same CUSIP OR substantially identical:</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;Disallow loss</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;Add disallowed loss to new lot basis</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;Extend holding period</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    <strong>Substantially Identical:</strong> Options on same stock, convertible bonds, ETFs tracking same index. <em>Not</em> substantially identical: Different companies in same sector, different share classes (e.g., GOOG vs. GOOGL).
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-rose-500 text-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-bold text-xl mb-2">Cost Basis</h3>
                  <p className="opacity-90 text-sm mb-4">Original purchase price adjusted for fees, commissions, and corporate actions. Crucial distinction:</p>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-3 rounded backdrop-blur-sm">
                      <strong className="block text-amber-200">Covered Securities</strong>
                      <span className="text-xs">Broker must report cost basis to IRS on Form 1099-B. <br/>(Equities acquired post-2011, Mutual Funds post-2012, Options post-2014).</span>
                    </div>
                    <div className="bg-white/10 p-3 rounded backdrop-blur-sm">
                      <strong className="block text-blue-200">Non-Covered Securities</strong>
                      <span className="text-xs">Investor is responsible for tracking and reporting cost basis. Common for pre-2011 holdings or inherited securities.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">Holding Period</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Determines tax treatment: <strong>Short-term</strong> (≤1 year) taxed as ordinary income. <strong>Long-term</strong> (&gt;1 year) receives preferential capital gains rates (0%, 15%, or 20%).
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-red-50 border border-red-200 rounded p-2">
                      <strong className="text-red-900">Short-Term</strong>
                      <p className="text-red-700">Up to 37% tax rate</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <strong className="text-green-900">Long-Term</strong>
                      <p className="text-green-700">0-20% tax rate</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-3">Adjusted Cost Basis</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Original basis must be adjusted for:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• <strong>Stock Splits:</strong> Divide basis by split ratio</li>
                    <li>• <strong>Return of Capital:</strong> Reduce basis (not taxable until basis = $0)</li>
                    <li>• <strong>Wash Sales:</strong> Add disallowed loss to new lot</li>
                    <li>• <strong>Reinvested Dividends:</strong> Each reinvestment creates new lot</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Position Management */}
          <section id="position-management">
            <SectionHeader 
              title="Position Management" 
              subtitle="The Three Books of Record. Separating views based on time and purpose."
              icon={Briefcase}
              colorClass="border-violet-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                In institutional finance, there is no single "position" number. Instead, systems maintain <strong>three parallel books</strong>, each serving a distinct purpose and operating on different time horizons. Understanding this separation is critical for reconciliation, performance measurement, and regulatory compliance.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The <strong>IBOR/ABOR/PBOR</strong> framework emerged from the need to balance real-time trading decisions (IBOR) with accounting accuracy (ABOR) and performance analytics (PBOR). Each book has different data sources, update frequencies, and stakeholders.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <ConceptCard 
                title="IBOR" 
                description="Investment Book of Record" 
                accentColor="violet"
              >
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-violet-700">Focus:</span> Trading / Decision Support</p>
                  <p><span className="font-bold text-violet-700">Time:</span> Real-Time (T+0, intraday)</p>
                  <p><span className="font-bold text-violet-700">Data Source:</span> Order Management System (OMS), Execution Management System (EMS)</p>
                  <p className="text-slate-500 border-t pt-2 mt-2">
                    Includes <strong>pending orders</strong> and intraday executions. Critical for preventing overdrafts and compliance with position limits. Used by portfolio managers and traders for real-time risk monitoring.
                  </p>
                  <div className="bg-violet-50 p-2 rounded mt-2">
                    <p className="text-xs text-violet-800"><strong>Example Use Case:</strong> Pre-trade compliance checks (e.g., "Will this order violate sector concentration limits?")</p>
                  </div>
                </div>
              </ConceptCard>

              <ConceptCard 
                title="ABOR" 
                description="Accounting Book of Record" 
                accentColor="violet"
              >
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-violet-700">Focus:</span> Reporting / NAV Calculation</p>
                  <p><span className="font-bold text-violet-700">Time:</span> T+1 / End-of-Day (Historical)</p>
                  <p><span className="font-bold text-violet-700">Data Source:</span> Custodian statements, reconciled transactions</p>
                  <p className="text-slate-500 border-t pt-2 mt-2">
                    Reconciled with custodian. Used for <strong>official client statements</strong>, regulatory filings (Form ADV, 13F), and fund accounting (NAV calculation). Must match custodian records to the penny.
                  </p>
                  <div className="bg-violet-50 p-2 rounded mt-2">
                    <p className="text-xs text-violet-800"><strong>Example Use Case:</strong> Daily NAV calculation for mutual funds, client quarterly statements</p>
                  </div>
                </div>
              </ConceptCard>

              <ConceptCard 
                title="PBOR" 
                description="Performance Book of Record" 
                accentColor="violet"
              >
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-violet-700">Focus:</span> Analytics / Attribution</p>
                  <p><span className="font-bold text-violet-700">Time:</span> Time-Weighted Series (snapshots at cash flow events)</p>
                  <p><span className="font-bold text-violet-700">Data Source:</span> ABOR + market prices + cash flow timestamps</p>
                  <p className="text-slate-500 border-t pt-2 mt-2">
                    Requires <strong>snapshots at every cash flow event</strong> to calculate TWRR accurately. Used for performance attribution, manager evaluation, and GIPS compliance. Separates manager skill from client timing.
                  </p>
                  <div className="bg-violet-50 p-2 rounded mt-2">
                    <p className="text-xs text-violet-800"><strong>Example Use Case:</strong> Quarterly performance attribution reports showing sector allocation vs. security selection effects</p>
                  </div>
                </div>
              </ConceptCard>
            </div>

            <div className="mt-8 bg-violet-50 border border-violet-200 rounded-xl p-6">
              <h3 className="font-bold text-violet-900 mb-4">Why Three Books?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-violet-800">IBOR</strong>
                  <p className="text-violet-700">Optimized for <em>speed</em>. May include unconfirmed trades. Traders need to see positions update instantly.</p>
                </div>
                <div>
                  <strong className="text-violet-800">ABOR</strong>
                  <p className="text-violet-700">Optimized for <em>accuracy</em>. Only settled, reconciled transactions. Accountants need to match custodian statements.</p>
                </div>
                <div>
                  <strong className="text-violet-800">PBOR</strong>
                  <p className="text-violet-700">Optimized for <em>analytics</em>. Requires historical snapshots. Performance analysts need time-series data.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Performance */}
          <section id="performance">
            <SectionHeader 
              title="Performance Measurement" 
              subtitle="Distinguishing between manager skill and investor timing."
              icon={PieChart}
              colorClass="border-teal-500"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                Performance measurement is <strong>not</strong> simply "ending value minus beginning value." The challenge: external cash flows (deposits/withdrawals) distort returns. A portfolio that receives a large deposit right before a market crash will show poor returns—but that's not the manager's fault.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The solution: <strong>TWRR vs. MWRR</strong>. TWRR (Time-Weighted Return) isolates manager skill by neutralizing cash flow timing. MWRR (Money-Weighted Return) captures the investor's actual experience, including their timing decisions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Return Methodologies</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-teal-700 text-lg mb-2">
                      <Clock size={20}/> TWRR (Time-Weighted Return)
                    </h4>
                    <p className="text-slate-600 mb-3">
                      Evaluates <strong>Manager Skill</strong>. Eliminates the impact of external cash flows by breaking the period into sub-periods and geometrically linking returns.
                    </p>
                    <div className="bg-teal-50 border border-teal-200 rounded p-4">
                      <p className="text-sm font-mono text-teal-900 mb-2">
                        TWRR = [(1 + R₁) × (1 + R₂) × ... × (1 + Rₙ)] - 1
                      </p>
                      <p className="text-xs text-teal-700">
                        Where Rᵢ = return for sub-period i (between cash flows)
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      <strong>Use Case:</strong> Manager evaluation, GIPS compliance, comparing to benchmarks
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-teal-700 text-lg mb-2">
                      <Briefcase size={20}/> MWRR (Money-Weighted Return)
                    </h4>
                    <p className="text-slate-600 mb-3">
                      Evaluates <strong>Investor Experience</strong>. Equivalent to Internal Rate of Return (IRR). Weights return by capital invested—sensitive to timing of deposits/withdrawals.
                    </p>
                    <div className="bg-teal-50 border border-teal-200 rounded p-4">
                      <p className="text-sm font-mono text-teal-900 mb-2">
                        0 = -PV + CF₁/(1+r) + CF₂/(1+r)² + ... + FV/(1+r)ⁿ
                      </p>
                      <p className="text-xs text-teal-700">
                        Solve for r (the MWRR)
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      <strong>Use Case:</strong> Client reporting, evaluating investor's actual dollar-weighted returns
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <h4 className="font-bold text-teal-900 mb-2">Key Difference</h4>
                  <p className="text-sm text-teal-800">
                    If an investor adds capital right before a market crash, MWRR will be <em>lower</em> than TWRR (bad timing). If they add capital right before a rally, MWRR will be <em>higher</em> (good timing). TWRR is unaffected by these flows.
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                <h3 className="font-bold text-teal-900 mb-4">GIPS Standards & Cash Flows</h3>
                <p className="text-sm text-teal-800 mb-4">
                  The <strong>Global Investment Performance Standards (GIPS)</strong> mandate specific treatment of cash flows to ensure comparability across managers.
                </p>
                <ul className="space-y-4">
                  <li className="bg-white p-4 rounded shadow-sm">
                    <strong className="block text-slate-800">External Cash Flow</strong>
                    <span className="text-sm text-slate-500">Capital transferring in/out of the portfolio. Must be client-directed (not manager-initiated).</span>
                  </li>
                  <li className="bg-white p-4 rounded shadow-sm border-l-4 border-teal-400">
                    <strong className="block text-slate-800">Large Cash Flow (&gt;10% of portfolio value)</strong>
                    <span className="text-sm text-slate-500">Firm <strong>MUST</strong> revalue portfolio on the day of the flow to ensure TWRR accuracy. This creates a new sub-period.</span>
                  </li>
                  <li className="bg-white p-4 rounded shadow-sm border-l-4 border-teal-600">
                    <strong className="block text-slate-800">Significant Cash Flow (&gt;30% of portfolio value)</strong>
                    <span className="text-sm text-slate-500">Firm <strong>may</strong> temporarily remove portfolio from composite to prevent distortion of composite returns.</span>
                  </li>
                </ul>

                <div className="mt-4 bg-white p-4 rounded shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2">Modified Dietz Method</h4>
                  <p className="text-xs text-slate-600 mb-2">
                    An approximation of TWRR that doesn't require daily valuations. Weights cash flows by the proportion of the period they were invested:
                  </p>
                  <div className="bg-slate-50 p-2 rounded font-mono text-xs text-slate-700">
                    R = (EMV - BMV - CF) / (BMV + Σ(CFᵢ × Wᵢ))
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Where Wᵢ = (Days remaining after CFᵢ) / (Total days in period)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Risk Management */}
          <section id="risk">
            <SectionHeader 
              title="Risk Management" 
              subtitle="Forecasting potential losses using IBOR positions and market data."
              icon={AlertTriangle}
              colorClass="border-orange-500"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                Risk management transforms <strong>IBOR positions</strong> (what you own) and <strong>Product Master attributes</strong> (how assets behave) into forward-looking loss forecasts. The goal: answer "What could go wrong?" before it does.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Modern risk systems combine <strong>statistical models</strong> (VaR), <strong>scenario analysis</strong> (stress testing), and <strong>liquidity classification</strong> to provide a multi-dimensional view of portfolio vulnerability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ConceptCard 
                title="VaR (Value at Risk)" 
                description="What is the maximum loss over time horizon T at confidence level X?" 
                accentColor="orange"
              >
                <div className="text-xs text-slate-700 space-y-2">
                  <p className="font-bold text-orange-700 bg-orange-50 p-2 rounded">
                    <strong>Inputs:</strong> Current Positions + Historical Prices or Volatility Matrices
                  </p>
                  <div className="space-y-1">
                    <p><strong>Parametric VaR:</strong> Assumes normal distribution. Fast but fails in tail events.</p>
                    <p><strong>Historical VaR:</strong> Uses actual historical returns. No distribution assumption.</p>
                    <p><strong>Monte Carlo VaR:</strong> Simulates thousands of scenarios. Captures non-linear risks (options).</p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded mt-2">
                    <p className="font-mono text-xs">
                      95% VaR = $1M means: "95% confident we won't lose more than $1M tomorrow"
                    </p>
                  </div>
                </div>
              </ConceptCard>

              <ConceptCard 
                title="Stress Testing" 
                description="Subjecting portfolio to hypothetical extremes (e.g., '2008 Crisis', 'Fed +200bps')." 
                accentColor="orange"
              >
                <div className="text-xs text-slate-700 space-y-2">
                  <p className="font-bold text-orange-700 bg-orange-50 p-2 rounded">
                    <strong>Req:</strong> Full Revaluation using Product Master attributes (Duration, Convexity, Beta)
                  </p>
                  <div className="space-y-1">
                    <p><strong>Historical Scenarios:</strong> Replay 2008, COVID-19, 1987 crash</p>
                    <p><strong>Hypothetical Scenarios:</strong> "What if rates rise 3%?" "What if VIX spikes to 80?"</p>
                    <p><strong>Reverse Stress:</strong> "What scenario would cause a 20% loss?"</p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded mt-2">
                    <p><strong>Regulatory:</strong> CCAR (Fed), EBA (EU) mandate annual stress tests for banks</p>
                  </div>
                </div>
              </ConceptCard>

              <ConceptCard 
                title="Liquidity Risk (LCR)" 
                description="Classifying assets by ability to convert to cash without material price impact." 
                accentColor="orange"
              >
                <div className="text-xs text-slate-700 space-y-2">
                  <p className="font-bold text-orange-700 bg-orange-50 p-2 rounded">
                    <strong>Metrics:</strong> Bid-Ask Spread, Average Daily Volume (ADV), Depth of Book
                  </p>
                  <div className="space-y-1">
                    <p><strong>Tier 1 (High Liquidity):</strong> Large-cap equities, US Treasuries. Can liquidate in hours.</p>
                    <p><strong>Tier 2 (Medium):</strong> Small-cap stocks, IG corporate bonds. Days to liquidate.</p>
                    <p><strong>Tier 3 (Low):</strong> Private equity, real estate, distressed debt. Months to liquidate.</p>
                  </div>
                  <div className="bg-orange-50 p-2 rounded mt-2">
                    <p><strong>Liquidity Coverage Ratio (LCR):</strong> Basel III requires banks to hold enough liquid assets to survive 30-day stress</p>
                  </div>
                </div>
              </ConceptCard>
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-orange-900 mb-4">Integrated Risk Dashboard</h3>
              <p className="text-sm text-orange-800 mb-4">
                Modern risk systems aggregate these metrics into a <strong>unified dashboard</strong> that updates in real-time as positions change:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded shadow-sm">
                  <strong className="text-slate-900">Market Risk</strong>
                  <p className="text-slate-600">VaR, Greeks (Delta, Gamma, Vega), Duration, Convexity</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <strong className="text-slate-900">Credit Risk</strong>
                  <p className="text-slate-600">Counterparty exposure, credit ratings, CDS spreads</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <strong className="text-slate-900">Liquidity Risk</strong>
                  <p className="text-slate-600">Days-to-liquidate, bid-ask costs, market depth</p>
                </div>
                <div className="bg-white p-4 rounded shadow-sm">
                  <strong className="text-slate-900">Concentration Risk</strong>
                  <p className="text-slate-600">Single-name limits, sector exposure, geographic concentration</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Architecture */}
          <section id="architecture">
            <SectionHeader 
              title="Data Architecture" 
              subtitle="System design principles: Master Data Management and Bitemporality."
              icon={Server}
              colorClass="border-cyan-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 leading-relaxed">
                All the concepts above—Product Master, Entity Master, Transactions, Tax Lots—must be <strong>engineered into a coherent data architecture</strong>. Two design patterns are critical: <strong>Master Data Management (MDM)</strong> for resolving conflicting data sources, and <strong>Bitemporal Design</strong> for preserving audit trails.
              </p>
            </div>
            
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">The Golden Copy (MDM)</h3>
                  <p className="text-slate-300 mb-4">
                    Solves the "dueling data" problem. A centralized system ingests data from Bloomberg, Reuters, FactSet, etc., and applies <strong>Survivorship Rules</strong> to determine the single source of truth.
                  </p>
                  <div className="bg-slate-800 p-4 rounded border border-slate-700 font-mono text-sm text-cyan-200 mb-4">
                    IF Asset_Class == 'Fixed Income' <br/>
                    &nbsp;&nbsp;THEN Source Rating FROM S&P <br/>
                    ELSE IF Asset_Class == 'Equity' <br/>
                    &nbsp;&nbsp;THEN Source Sector FROM MSCI <br/>
                    ELSE IF Asset_Class == 'Derivative' <br/>
                    &nbsp;&nbsp;THEN Source Greeks FROM Bloomberg
                  </div>
                  <div className="bg-cyan-900/30 border border-cyan-700 rounded p-4">
                    <h4 className="text-cyan-300 font-bold mb-2">Why MDM Matters</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• <strong>Data Conflicts:</strong> Bloomberg says Apple's sector is "Technology", MSCI says "Communication Services"</li>
                      <li>• <strong>Vendor Outages:</strong> If primary source fails, automatically failover to secondary</li>
                      <li>• <strong>Audit Trail:</strong> Track which vendor provided each field and when</li>
                      <li>• <strong>Data Quality:</strong> Centralized validation rules (e.g., "Price cannot be negative")</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">Bitemporal Design</h3>
                  <p className="text-slate-300 mb-4">
                    Tracking <strong>two timelines</strong> for every record to preserve complete audit trails and enable "as-of" queries.
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-cyan-900 p-2 rounded text-cyan-400 shrink-0">
                        <Clock size={16}/>
                      </div>
                      <div>
                        <strong className="block text-white">Valid Time (Business Time)</strong>
                        <span className="text-sm text-slate-400">The real-world date the data applies to. Example: "Apple's price on Jan 2, 2025 was $180"</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-cyan-900 p-2 rounded text-cyan-400 shrink-0">
                        <Server size={16}/>
                      </div>
                      <div>
                        <strong className="block text-white">Transaction Time (System Time)</strong>
                        <span className="text-sm text-slate-400">The date the data was entered into the system. Example: "We discovered the error and corrected it on Jan 10, 2025"</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-900/30 border border-cyan-700 rounded p-4">
                    <h4 className="text-cyan-300 font-bold mb-2">Critical Use Cases</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• <strong>Regulatory Audits:</strong> "Show me what you knew on Dec 31, 2024" (query by Transaction Time)</li>
                      <li>• <strong>Performance Recalculation:</strong> "Recalc returns using corrected prices" (query by Valid Time)</li>
                      <li>• <strong>Error Correction:</strong> Fix historical data without losing record of the mistake</li>
                      <li>• <strong>Compliance:</strong> Prove you acted on information available at the time</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Data Lake vs. Data Warehouse</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800 p-4 rounded border border-slate-700">
                    <h4 className="text-white font-bold mb-2">Data Lake (Raw Storage)</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Store <strong>everything</strong> in native format (JSON, CSV, Parquet). Schema-on-read. Used for ML training, exploratory analysis.
                    </p>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>• <strong>Tech:</strong> S3, Azure Data Lake, Snowflake</p>
                      <p>• <strong>Use:</strong> Historical tick data, unstructured research reports</p>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded border border-slate-700">
                    <h4 className="text-white font-bold mb-2">Data Warehouse (Curated)</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Store <strong>cleaned, transformed</strong> data in relational schema. Schema-on-write. Optimized for BI queries and reporting.
                    </p>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>• <strong>Tech:</strong> Redshift, BigQuery, Databricks</p>
                      <p>• <strong>Use:</strong> Daily NAV, client statements, regulatory filings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
    </ArticleFrame>
  );
}
