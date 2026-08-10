'use client';

import React from 'react';
import { Database, Shield, Globe, Layers, Activity, PieChart, TrendingUp, AlertTriangle, Server, FileText, CheckCircle, ArrowRight, Calculator, Clock, Briefcase, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function OntologyOfValueArticle() {
  return (
    <ArticleFrame slug="ontology-of-value-financial-data-classification-lifecycle-management">
      <div className="pb-24">
        <InfographicSlot alt="Ontology of Value Infographic" />
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="py-16">
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              In the modern financial ecosystem, data is not merely information—it is the <strong>structural DNA</strong> that enables every transaction, valuation, and risk calculation. From the moment a security is issued to its final settlement, a complex web of identifiers, classifications, and temporal records governs its existence.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              This comprehensive guide explores the <strong>ontology of financial value</strong>: the systematic classification and lifecycle management of financial instruments, entities, transactions, and positions. Whether you're building a trading platform, implementing a portfolio management system, or simply seeking to understand how institutional finance operates at the data layer, this framework provides the foundational architecture.
            </p>
            
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-4 font-serif">What You'll Master</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Product Master:</strong> Global identification standards (ISIN, CUSIP, FIGI) and asset-specific attributes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Entity & Account Hierarchies:</strong> From households to sleeves, understanding ownership structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Transaction Lifecycle:</strong> ISO 20022 migration and structured event processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Tax Lot Accounting:</strong> Cost basis methodologies and corporate action mathematics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>The Three Books:</strong> IBOR, ABOR, and PBOR—separating trading, accounting, and performance views</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Performance Attribution:</strong> TWRR vs MWRR and GIPS compliance frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Risk Architecture:</strong> VaR, stress testing, and liquidity classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-0.5 shrink-0" />
                  <span><strong>Data Engineering:</strong> Master Data Management (MDM) and bitemporal design patterns</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 1: Product Master */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Product Master</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The <strong>Product Master</strong> is the authoritative registry of all tradable instruments within a financial system. It serves as the single source of truth for security attributes, from basic identifiers to complex behavioral characteristics.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Think of it as the "birth certificate" for every financial instrument. Before a security can be traded, valued, or reported, it must first be <em>defined</em>. This definition includes not just "what it is" (equity, bond, derivative), but also "how it behaves".
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Global Identification Standards</h3>
            <ComparisonGrid>
              <ComparisonCard title="ISIN" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  International Securities Identification Number. ISO 6166 standard. 12-character alphanumeric code. Essential for cross-border trading and MiFID II reporting. Example: US0378331005 (Apple Inc.).
                </p>
              </ComparisonCard>
              <ComparisonCard title="CUSIP" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Committee on Uniform Securities Identification Procedures. 9-character alphanumeric code used in North America. Crucial for settlement within the DTC ecosystem.
                </p>
              </ComparisonCard>
              <ComparisonCard title="FIGI" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Financial Instrument Global Identifier. An open standard maintained by Bloomberg that remains persistent across corporate actions, unlike tickers which can change.
                </p>
              </ComparisonCard>
              <ComparisonCard title="LEI" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Legal Entity Identifier of the issuer. 20-character alphanumeric code. Mandatory under Dodd-Frank and EMIR for tracking counterparty risk.
                </p>
              </ComparisonCard>
            </ComparisonGrid>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-10">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 font-serif text-lg">Why Multiple Identifiers?</h4>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                Different markets and regulators mandate different standards. A robust system maintains <strong>cross-reference mappings</strong> between ISIN, CUSIP, SEDOL, FIGI, and Bloomberg Ticker to ensure seamless data integration across vendors and jurisdictions.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Asset Class Attributes</h3>
            <div className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
                  <TrendingUp className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" /> Equities
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Voting Rights:</strong> Essential for proxy voting workflows. Distinguishes common from preferred shares.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Free Float:</strong> Percentage of shares available for public trading. Inputs for liquidity risk models.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>GICS/ICB:</strong> Sector classification driving rotation strategies, factor attribution, and benchmark construction.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Dividend Policy:</strong> Frequency (quarterly, annual), ex-dividend dates, and payment dates.</p>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
                  <Activity className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C]" /> Fixed Income
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Bonds are <strong>contractual cash flow machines</strong>. The Product Master must encode the legal terms that govern these flows.</p>
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-semibold">
                      <tr>
                        <th className="px-4 py-3">Attribute</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Usage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                      <tr>
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Coupon Logic</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Fixed, Floating, Zero-Coupon</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Calculating Accrued Interest (AI)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Day Count Convention</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">30/360, Act/Act, Act/360, Act/365</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Critical for settlement amount precision</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Embedded Options</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Callable, Putable, Convertible</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Calc Yield-to-Worst, OAS, Convexity</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">Seniority</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Senior Secured, Subordinated</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Recovery rate assumptions in default scenarios</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
                  <Globe className="w-5 h-5 text-purple-500" /> Derivatives
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Options, futures, and swaps require <strong>contract specifications</strong> that define payoff structures.</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Underlying Asset:</strong> Link to Product Master entry (e.g., SPY for SPY options)</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Contract Multiplier:</strong> 100 shares per equity option, $1000 per S&P 500 futures point</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Exercise Style:</strong> American (anytime), European (expiry only), Bermudan (specific dates)</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800 mt-10">
              <h4 className="text-emerald-900 dark:text-emerald-300 font-bold flex items-center gap-2 mb-3 font-serif text-lg">
                <Globe className="w-5 h-5" /> Regulatory Classifications: SFDR
              </h4>
              <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed mb-6">
                The EU's <strong>Sustainable Finance Disclosure Regulation (SFDR)</strong> mandates product-level sustainability classification. This metadata is now a <em>required field</em> for any fund sold in Europe.
              </p>
              <ComparisonGrid>
                <ComparisonCard title="Article 6" tone="neutral">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Integrates sustainability risks only. No explicit ESG promotion.</p>
                </ComparisonCard>
                <ComparisonCard title="Article 8 (Light Green)" tone="pos">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Promotes environmental/social characteristics. Must disclose how characteristics are met.</p>
                </ComparisonCard>
                <ComparisonCard title="Article 9 (Dark Green)" tone="pos">
                  <p className="text-sm text-slate-700 dark:text-slate-300">Sustainable investment is the objective. Strictest reporting requirements.</p>
                </ComparisonCard>
              </ComparisonGrid>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Visual Framework Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif text-center">Visual Framework: The Complete Data Architecture</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              This comprehensive infographic maps the entire financial data ecosystem—from product identification to performance measurement.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <img src="https://i.imgur.com/V1PQ2CD.jpeg" alt="The Ontology of Value - Complete Financial Data Architecture" className="w-full h-auto" />
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 2: Entity & Account Master */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Entity & Account Master</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              While the Product Master defines <em>what</em> is being traded, the <strong>Entity & Account Master</strong> defines <em>who</em> owns it and <em>where</em> it resides. This hierarchical structure enables everything from consolidated wealth reporting to regulatory compliance to tax optimization strategies.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Modern wealth management platforms support <strong>multi-level account hierarchies</strong> that mirror real-world ownership structures: from households down to sleeves.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">The Account Hierarchy</h3>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10">
              <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-300 dark:before:bg-slate-700">
                <div className="relative">
                  <div className="absolute -left-[36px] top-1 w-4 h-4 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] ring-4 ring-slate-50 dark:ring-slate-900"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">1. Client / Household</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Top-level owner (e.g., "The Smith Family"). Aggregates Total Wealth across all accounts. Used for relationship management and consolidated reporting. Links to CRM systems.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[36px] top-1 w-4 h-4 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] ring-4 ring-slate-50 dark:ring-slate-900"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">2. Custodial Account</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Legal vessel at a custodian bank. This is the level for <strong>Form 1099-B</strong> tax reporting. Each account has a unique account number and legal registration (Individual, Joint, IRA, Trust).
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[36px] top-1 w-4 h-4 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] ring-4 ring-slate-50 dark:ring-slate-900"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">3. Portfolio / Strategy</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Logical grouping within an account (e.g., "US Growth Equity", "Fixed Income Core"). Enables <strong>model portfolio</strong> assignment and performance attribution by strategy. Not a legal entity.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[36px] top-1 w-4 h-4 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] ring-4 ring-slate-50 dark:ring-slate-900"></div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">4. Sleeve / Sub-Account</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Virtual partition for <strong>Unified Managed Accounts (UMAs)</strong>. Enables multi-manager strategies within a single custodial account. Critical for avoiding wash sales across sleeves.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Legal Entity Controls & Compliance</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Every entity in the system must be classified for <strong>regulatory compliance</strong>. These attributes drive automated screening, reporting, and risk management workflows.
            </p>
            
            <ComparisonGrid>
              <ComparisonCard title="KYC & AML" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Know Your Customer and Anti-Money Laundering. Mandatory classification for High Risk entities, PEP, or Sanctioned individuals.</p>
                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <li><strong>Risk Tiers:</strong> Low, Medium, High, Prohibited</li>
                  <li><strong>Screening:</strong> OFAC, EU Sanctions lists</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="FATCA / CRS" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Tax residency classification to facilitate global tax information exchange.</p>
                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <li><strong>W-8/W-9 Forms:</strong> Capture tax residency</li>
                  <li><strong>Withholding Rates:</strong> 0%, 15%, 30% based on treaty</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Counterparty Risk" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Linking issuers to ultimate parents to view total corporate family exposure and concentration risk.</p>
                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <li><strong>LEI Hierarchy:</strong> Map subsidiaries to parent</li>
                  <li><strong>Exposure Limits:</strong> Aggregate across all entities</li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 3: Transaction Lifecycle */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Transaction Lifecycle</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Transactions are the <strong>atomic events</strong> that change portfolio state. Every buy, sell, dividend, corporate action, or fee must be captured, classified, and processed through a standardized lifecycle. The industry is undergoing a historic migration from legacy messaging formats to <strong>ISO 20022</strong>.
            </p>

            <div className="bg-slate-900 rounded-2xl p-8 mb-10 border border-slate-800">
              <h3 className="text-2xl font-bold text-amber-400 mb-4 font-serif">ISO 20022 Standard</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                The industry is migrating from <strong>ISO 15022 (MT)</strong> to <strong>ISO 20022 (MX)</strong>. This shift moves from unstructured text blocks to rich, structured XML/JSON data models capable of carrying "Ultimate Debtor", detailed remittance info, and regulatory identifiers.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 text-center">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Legacy</div>
                  <div className="font-mono text-[#BC4128] dark:text-[#E2694A] text-lg">MT Format</div>
                </div>
                <ArrowRight className="w-8 h-8 text-slate-600 dark:text-slate-400 shrink-0" />
                <div className="bg-slate-800 p-4 rounded-xl border border-amber-500/30 flex-1 text-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <div className="text-xs text-amber-500/70 uppercase tracking-widest font-bold mb-1">Modern</div>
                  <div className="font-mono text-[#1D8A70] dark:text-[#3CBF9C] text-lg">MX Format</div>
                </div>
              </div>

              <h4 className="text-slate-200 font-bold mb-4 font-serif">Core Transaction Types</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-[#A8672E] dark:border-[#D08F52]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Trade Activity</span>
                    <span className="text-xs bg-[#A8672E] dark:bg-[#D08F52]/20 text-blue-300 px-2 py-1 rounded">T+2 Settled</span>
                  </div>
                  <span className="text-sm text-slate-400">Buy, Sell, Short, Cover</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-[#1D8A70] dark:border-[#3CBF9C]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Income Activity</span>
                    <span className="text-xs bg-[#1D8A70] dark:bg-[#3CBF9C]/20 text-emerald-300 px-2 py-1 rounded">Cash Flow</span>
                  </div>
                  <span className="text-sm text-slate-400">Dividends, Interest, Coupons</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Corporate Actions</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Mandatory/Vol</span>
                  </div>
                  <span className="text-sm text-slate-400">Splits, Mergers, Spin-offs</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">Cash Activity</span>
                    <span className="text-xs bg-[#BC4128] dark:bg-[#E2694A]/20 text-orange-300 px-2 py-1 rounded">Non-Trade</span>
                  </div>
                  <span className="text-sm text-slate-400">Deposits, Withdrawals, Fees</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Transaction State Machine</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-10">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold text-lg mx-auto mb-3">1</div>
                <strong className="block text-slate-900 dark:text-white mb-2">Pending</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400">Order submitted, awaiting execution</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg mx-auto mb-3">2</div>
                <strong className="block text-slate-900 dark:text-white mb-2">Executed</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400">Trade confirmed, price locked</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg mx-auto mb-3">3</div>
                <strong className="block text-slate-900 dark:text-white mb-2">Settled</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400">Cash and securities exchanged (T+2)</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] flex items-center justify-center font-bold text-lg mx-auto mb-3">4</div>
                <strong className="block text-slate-900 dark:text-white mb-2">Reconciled</strong>
                <p className="text-xs text-slate-600 dark:text-slate-400">Matched with custodian statement</p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4: Tax Lot Accounting */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Tax Lot Accounting</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              A <strong>tax lot</strong> is a distinct purchase event with its own acquisition date, quantity, and cost basis. When you sell shares, the IRS requires you to specify <em>which</em> lots you're selling—a decision that can dramatically impact your tax liability.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Lot Selection Methodologies</h3>
            <ComparisonGrid>
              <ComparisonCard title="FIFO (First-In, First-Out)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Simplicity; Regulatory Default</p>
                <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Tax Impact:</strong> Often highest tax in rising markets.</p>
              </ComparisonCard>
              <ComparisonCard title="LIFO (Last-In, First-Out)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Useful in Volatile Markets</p>
                <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Tax Impact:</strong> Minimizes gains in rising markets.</p>
              </ComparisonCard>
              <ComparisonCard title="HIFO (Highest-In, First-Out)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Optimized for Tax Loss Harvesting</p>
                <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Tax Impact:</strong> Maximizes realized losses.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <div className="mt-10 bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Corporate Action Math: Tax-Free Spin-Off</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                When a company spins off a subsidiary (e.g., PayPal from eBay), the IRS requires you to <strong>allocate your original cost basis</strong> between the parent and the new entity based on their relative fair market values on the distribution date.
              </p>
              
              <FormulaPanel 
                title="Basis Allocation Formula"
                formula="New\\_Parent\\_Basis = Old\\_Basis \\times \\frac{Parent\\_FMV}{Total\\_Value}"
                legend={[
                  { label: "Total_Value", value: "Parent_FMV + Sub_FMV" }
                ]}
              />
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 5: The Three Books */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Three Books of Record</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              A single "position" does not exist in institutional finance. Instead, different functional areas require different views of the portfolio based on timing, settlement, and valuation rules.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="IBOR (Investment Book of Record)" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2"><strong>User:</strong> Portfolio Managers, Traders</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Real-time view of available cash and securities based on <em>Trade Date</em>. Includes pending trades. Optimized for speed and trading decisions.</p>
              </ComparisonCard>
              <ComparisonCard title="ABOR (Accounting Book of Record)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2"><strong>User:</strong> Accountants, Custodians</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">End-of-day view based on <em>Settlement Date</em>. Only includes completed transfers. Optimized for absolute accuracy and reconciliation.</p>
              </ComparisonCard>
              <ComparisonCard title="PBOR (Performance Book of Record)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2"><strong>User:</strong> Performance Analysts, Clients</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Historical time-series view. Requires perfect historical snapshots and GIPS-compliant valuation rules. Optimized for analytics and TWRR calculation.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 6: Performance */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <PieChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Performance Measurement</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Performance measurement is <strong>not</strong> simply "ending value minus beginning value." The challenge: external cash flows (deposits/withdrawals) distort returns. A portfolio that receives a large deposit right before a market crash will show poor returns—but that's not the manager's fault.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The solution: <strong>TWRR vs. MWRR</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">TWRR (Time-Weighted)</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Evaluates <strong>Manager Skill</strong>. Eliminates the impact of external cash flows by breaking the period into sub-periods and geometrically linking returns.
                </p>
                <FormulaPanel 
                  title="TWRR Formula"
                  formula="TWRR = [(1 + R_1) \\times ... \\times (1 + R_n)] - 1"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">MWRR (Money-Weighted)</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Evaluates <strong>Investor Experience</strong>. Equivalent to Internal Rate of Return (IRR). Weights return by capital invested—sensitive to timing of deposits/withdrawals.
                </p>
                <FormulaPanel 
                  title="MWRR Formula (Solve for r)"
                  formula="0 = -PV + \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t} + \\frac{FV}{(1+r)^n}"
                />
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 7: Risk Management */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Risk Management</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Risk management transforms <strong>IBOR positions</strong> (what you own) and <strong>Product Master attributes</strong> (how assets behave) into forward-looking loss forecasts. The goal: answer "What could go wrong?" before it does.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="VaR (Value at Risk)" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">What is the maximum loss over time horizon T at confidence level X?</p>
                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <li><strong>Parametric VaR:</strong> Assumes normal distribution.</li>
                  <li><strong>Historical VaR:</strong> Uses actual historical returns.</li>
                  <li><strong>Monte Carlo:</strong> Simulates thousands of scenarios.</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Stress Testing" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Subjecting portfolio to hypothetical extremes (e.g., '2008 Crisis').</p>
                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <li><strong>Historical:</strong> Replay 2008, COVID-19.</li>
                  <li><strong>Hypothetical:</strong> "What if VIX spikes to 80?"</li>
                  <li><strong>Reverse Stress:</strong> "What breaks the portfolio?"</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Liquidity Risk (LCR)" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Classifying assets by ability to convert to cash.</p>
                <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <li><strong>Tier 1:</strong> Large-cap equities (Hours)</li>
                  <li><strong>Tier 2:</strong> IG corporate bonds (Days)</li>
                  <li><strong>Tier 3:</strong> Private equity (Months)</li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 8: Architecture */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Server className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Data Architecture</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              All the concepts above—Product Master, Entity Master, Transactions, Tax Lots—must be <strong>engineered into a coherent data architecture</strong>. Two design patterns are critical: <strong>Master Data Management (MDM)</strong> for resolving conflicting data sources, and <strong>Bitemporal Design</strong> for preserving audit trails.
            </p>

            <div className="bg-slate-900 rounded-2xl p-8 mb-10 border border-slate-800">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-serif">Bitemporal Design</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Tracking <strong>two timelines</strong> for every record to preserve complete audit trails and enable "as-of" queries.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-cyan-400" />
                    <h4 className="font-bold text-white text-lg">Valid Time</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    The real-world date the data applies to. Example: "Apple's price on Jan 2, 2025 was $180". Used for performance recalculation.
                  </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="w-6 h-6 text-cyan-400" />
                    <h4 className="font-bold text-white text-lg">Transaction Time</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    The date the data was entered into the system. Example: "We discovered the error and corrected it on Jan 10, 2025". Used for regulatory audits.
                  </p>
                </div>
              </div>
            </div>

          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
