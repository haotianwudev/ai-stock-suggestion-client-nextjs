'use client';

import React from 'react';
import { ShieldCheck, Users, UserCheck, Banknote, ChevronsUpDown, ArrowRight, Home, Users2, HeartHandshake, Shield, HelpCircle, Briefcase, FileSignature, HandCoins, Gavel, CheckCircle, XCircle, Clock, Lock, EyeOff, Award, AlertTriangle, UserCog } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Helper component for section titles
const SectionTitle = ({ children, as: Component = 'h2' }: { children: React.ReactNode; as?: 'h2' | 'h3' }) => (
  <Component className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-8 tracking-tight">{children}</Component>
);

// Helper component for section paragraphs
const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{children}</p>
);

// Card component for key roles
const RoleCard = ({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children?: React.ReactNode }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
    <div className="flex items-center gap-4 mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 font-serif">{title}</h3>
    </div>
    <p className="text-slate-600 dark:text-slate-400 flex-grow">{description}</p>
    {children}
  </div>
);

// Helper Components
const BenefitItem = ({ icon, title, description }: { icon: React.ReactElement; title: string; description: string }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-slate-200 dark:border-slate-800">
    <div className="mb-4">
      {React.cloneElement(icon, { className: "w-10 h-10" } as any)}
    </div>
    <h3 className="font-semibold text-xl mb-2 text-slate-800 dark:text-slate-200 font-serif">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

const ChecklistItem = ({ text, icon }: { text: string; icon: React.ReactElement }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">
      {React.cloneElement(icon, { className: "w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C]" } as any)}
    </div>
    <p className="text-lg text-slate-700 dark:text-slate-300">{text}</p>
  </div>
);

const MythCard = ({ title, explanation }: { title: string; explanation: string }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-slate-200 dark:border-slate-800">
    <h3 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-200 flex items-center gap-2 font-serif">
      <AlertTriangle className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]"/>
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400">{explanation}</p>
  </div>
);

export default function ComprehensiveGuideTrustsPage() {
  return (
    <ArticleFrame
      slug="comprehensive-guide-trusts-estate-planning"
      additionalDisclaimer="This information is for educational purposes only and does not constitute legal or financial advice on trusts or estate planning. Consult with qualified estate planning professionals."
    >
      <div className="text-slate-800 dark:text-slate-200">
        <InfographicSlot alt="Comprehensive Guide to Trusts Infographic" />

        {/* Section 1: Anatomy of a Trust */}
        <section id="anatomy" className="py-12">
          <SectionTitle>The Anatomy of a Trust</SectionTitle>
          <Paragraph>
            A trust is a formal fiduciary relationship where one party, the trustee, holds legal title to property with a binding obligation to manage it for another&apos;s benefit. Unlike a will, which becomes a public court record upon death, a trust agreement is a private document, shielding your financial affairs from the public eye.
          </Paragraph>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <RoleCard
              icon={<FileSignature className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
              title="The Grantor (or Settlor)"
              description="The architect of the trust. This individual creates the trust, defines its rules, and provides the initial funding by transferring assets into it."
            />

            <RoleCard
              icon={<ShieldCheck className="w-8 h-8 text-[#1D8A70] dark:text-[#3CBF9C]" />}
              title="The Trustee"
              description="The manager and administrator. This person or institution accepts legal title to the assets and has a fiduciary duty—the highest standard of care under the law—to act solely in the best interests of the beneficiaries."
            >
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300">Key Fiduciary Duties:</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <li><strong>Duty of Loyalty:</strong> No self-dealing; must avoid conflicts of interest.</li>
                  <li><strong>Duty of Prudence:</strong> Must manage assets responsibly.</li>
                </ul>
              </div>
            </RoleCard>

            <RoleCard
              icon={<Users className="w-8 h-8 text-purple-600" />}
              title="The Beneficiary"
              description="The recipient of the trust's benefits. This is the person, group, or entity for whom the trust was created, holding the right to enjoy the trust property as specified in the trust document."
            />
          </div>

          <div className="mt-12 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r-lg">
            <h4 className="font-bold text-xl text-blue-800 mb-2">The Power of Succession</h4>
            <p className="text-[#A8672E] dark:text-[#D08F52]">
              In a revocable living trust, the grantor often serves all three roles initially. The key is naming a <span className="font-semibold">successor trustee</span> who automatically takes over upon the grantor&apos;s death or incapacity, avoiding court intervention entirely. This seamless transfer of control is what makes a trust a superior tool for probate avoidance and incapacity planning.
            </p>
          </div>
        </section>

        {/* Section 2: Foundational Choices */}
        <section id="types" className="py-12">
          <SectionTitle>Revocable vs. Irrevocable Trusts</SectionTitle>
          <Paragraph>
            The first major decision in creating a trust is choosing between a revocable and an irrevocable structure. This choice represents a core trade-off between retaining lifetime control and achieving a higher degree of asset protection and tax efficiency. Most trusts created for estate planning are initially revocable.
          </Paragraph>

          <div className="overflow-x-auto mt-12">
            <table className="w-full min-w-max text-left border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Feature</th>
                  <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Revocable Trust</th>
                  <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Irrevocable Trust</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0A0D14]">
                <tr>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium">Modification Ability</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[#1D8A70] dark:text-[#3CBF9C]">
                      <CheckCircle className="w-5 h-5"/> Can be changed or revoked.
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[#BC4128] dark:text-[#E2694A]">
                      <XCircle className="w-5 h-5"/> Generally cannot be changed.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium">Asset Control</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5"/> Grantor maintains full control.
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5"/> Grantor relinquishes control.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium">Asset Protection</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[#BC4128] dark:text-[#E2694A]">
                      <XCircle className="w-5 h-5"/> None from grantor&apos;s creditors.
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-[#1D8A70] dark:text-[#3CBF9C]">
                      <Shield className="w-5 h-5"/> Yes, shielded from future creditors.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium">Tax Treatment</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">Ignored for tax purposes. Grantor reports income on personal return (1040).</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">Separate legal entity. Often requires its own Tax ID (EIN) and files its own return (1041).</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium">Estate Tax</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">Included in taxable estate.</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">Removed from taxable estate.</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium">Primary Use</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">Probate avoidance &amp; incapacity planning.</td>
                  <td className="p-4 border-b border-slate-200 dark:border-slate-800">Estate tax reduction &amp; asset protection.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-16">
            <SectionTitle as="h3">Living vs. Testamentary Trusts</SectionTitle>
            <Paragraph>
              Another key distinction is timing. A &ldquo;living trust&rdquo; (inter vivos) is created during your lifetime, while a &ldquo;testamentary trust&rdquo; is created by your will after death. This fundamentally changes its relationship with the court system.
            </Paragraph>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 font-serif">
                  <Clock className="text-[#A8672E] dark:text-[#D08F52]"/> Living (Inter Vivos) Trust
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Created and funded while you are alive. A Revocable Living Trust is the most common estate planning tool. Assets transferred to it bypass probate, allowing for fast, private, and less expensive distribution.
                </p>
                <div className="flex items-center gap-2 font-medium text-[#1D8A70] dark:text-[#3CBF9C]">
                  <CheckCircle className="w-5 h-5"/> Avoids Probate
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 font-serif">
                  <Gavel className="text-[#A8672E] dark:text-[#D08F52]"/> Testamentary Trust
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Created by the terms of your will after you die. It does not avoid probate; the will must be probated first, and only then are assets moved into the trust. Often used to manage assets for minor children.
                </p>
                <div className="flex items-center gap-2 font-medium text-[#BC4128] dark:text-[#E2694A]">
                  <XCircle className="w-5 h-5"/> Does Not Avoid Probate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Catalogue of Trust Solutions */}
        <section className="py-12">
          <SectionTitle>A Catalogue of Specialized Trusts</SectionTitle>
          <Paragraph>
            Beyond the foundational types, trusts can be crafted as highly specialized instruments to achieve specific financial and familial goals.
          </Paragraph>

          <div className="space-y-6 mt-12">
            <details className="p-6 bg-white dark:bg-[#0A0D14] rounded-lg shadow-sm group border" open>
              <summary className="flex justify-between items-center font-semibold cursor-pointer text-lg text-slate-800 dark:text-slate-200">
                Trusts for Family &amp; Beneficiary Support
                <ChevronsUpDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-4 text-slate-600 dark:text-slate-400 space-y-4">
                <p><strong>Special Needs Trusts (SNTs):</strong> Holds funds for a person with disabilities without compromising their eligibility for needs-based government aid like SSI and Medicaid.</p>
                <p><strong>Spendthrift Trusts:</strong> Protects an inheritance for a financially irresponsible beneficiary by giving the trustee sole discretion over distributions, shielding assets from the beneficiary&apos;s creditors.</p>
                <p><strong>QTIP Trusts (Qualified Terminable Interest Property):</strong> Ideal for blended families. Provides income for a surviving spouse for life, after which remaining assets pass to the grantor&apos;s own children, ensuring they are not disinherited.</p>
              </div>
            </details>

            <details className="p-6 bg-white dark:bg-[#0A0D14] rounded-lg shadow-sm group border">
              <summary className="flex justify-between items-center font-semibold cursor-pointer text-lg text-slate-800 dark:text-slate-200">
                Trusts for Tax Minimization &amp; Wealth Transfer
                <ChevronsUpDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-4 text-slate-600 dark:text-slate-400 space-y-4">
                <p><strong>Irrevocable Life Insurance Trusts (ILITs):</strong> Owns a life insurance policy to remove the death benefit from the grantor&apos;s taxable estate, providing tax-free liquidity to heirs to pay estate taxes or other expenses.</p>
                <p><strong>Grantor Retained Annuity Trusts (GRATs):</strong> An advanced strategy where a grantor places appreciating assets into a trust and receives an annuity payment for a set term. Any appreciation above a set IRS rate passes to beneficiaries free of gift or estate tax.</p>
                <p><strong>Dynasty Trusts:</strong> Designed to last for multiple generations, shielding family wealth from estate taxes, creditors, and divorcing spouses at each generational level.</p>
              </div>
            </details>

            <details className="p-6 bg-white dark:bg-[#0A0D14] rounded-lg shadow-sm group border">
              <summary className="flex justify-between items-center font-semibold cursor-pointer text-lg text-slate-800 dark:text-slate-200">
                Trusts for Asset Protection &amp; Specific Goals
                <ChevronsUpDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-4 text-slate-600 dark:text-slate-400 space-y-4">
                <p><strong>Domestic Asset Protection Trusts (DAPTs):</strong> An irrevocable trust established in one of the few U.S. states with specific enabling legislation (e.g., Nevada, South Dakota), allowing the grantor to be a beneficiary while still protecting assets from creditors.</p>
                <p><strong>Qualified Personal Residence Trusts (QPRTs):</strong> Allows you to transfer your primary or secondary residence into a trust, removing its value from your estate at a discounted gift tax value while you continue to live there for a set term.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Section 4: Strategic Financial Advantages */}
        <section id="benefits" className="py-12">
          <SectionTitle>Key Financial &amp; Personal Advantages</SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <BenefitItem
              icon={<Gavel className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Avoid Probate"
              description="Assets in a living trust bypass the slow (9-24 months), expensive (3-8% of estate value), and public court process of probate."
            />
            <BenefitItem
              icon={<UserCog className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Incapacity Management"
              description="A successor trustee can manage your finances seamlessly if you become unable to do so, avoiding costly and intrusive court-appointed guardianship."
            />
            <BenefitItem
              icon={<Lock className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Control Over Distributions"
              description="Dictate how and when heirs receive their inheritance (e.g., at certain ages or for specific purposes like education), protecting it from being squandered."
            />
            <BenefitItem
              icon={<Banknote className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Minimize Estate Taxes"
              description="Properly structured irrevocable trusts can remove assets from your taxable estate, saving significant amounts for your heirs (especially crucial for large estates)."
            />
            <BenefitItem
              icon={<Shield className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Creditor & Asset Protection"
              description="Irrevocable trusts can shield assets from your future creditors, lawsuits, and legal judgments, preserving them for your beneficiaries."
            />
            <BenefitItem
              icon={<HeartHandshake className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Blended Family Harmony"
              description="Trusts can ensure your current spouse is cared for while guaranteeing your children from a prior marriage receive their inheritance."
            />
            <BenefitItem
              icon={<Award className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Special Needs Planning"
              description="Provide for a loved one with disabilities without jeopardizing their eligibility for essential government benefits."
            />
            <BenefitItem
              icon={<EyeOff className="text-[#A8672E] dark:text-[#D08F52]" />}
              title="Privacy"
              description="Keep your family's financial affairs, assets, and beneficiary information out of the public record, protecting them from solicitations or disputes."
            />
          </div>
        </section>

        {/* Section 5: Is a Trust Right for You? */}
        <section id="assessment" className="py-12">
          <SectionTitle>Do You Need a Trust?</SectionTitle>
          <Paragraph>
            The decision to create a trust should be driven by your specific life circumstances and goals, not just a net worth figure. For many, the desire to avoid probate for their family is reason enough. If any of the following apply, you are a strong candidate for a trust.
          </Paragraph>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mt-12">
            <ChecklistItem text="You own real estate (a trust avoids probate for each property)." icon={<Home />} />
            <ChecklistItem text="You have minor children or grandchildren you want to provide for." icon={<Users2 />} />
            <ChecklistItem text="You are concerned about future mental or physical incapacity." icon={<HelpCircle />} />
            <ChecklistItem text="You have complex family dynamics (e.g., a blended family)." icon={<HeartHandshake />} />
            <ChecklistItem text="You own a business and want to ensure a smooth transition." icon={<Briefcase />} />
            <ChecklistItem text="You have a beneficiary with special needs or poor financial habits." icon={<Award />} />
            <ChecklistItem text="You value privacy in your personal and financial affairs." icon={<EyeOff />} />
            <ChecklistItem text="Your total estate may be subject to federal or state estate taxes." icon={<HandCoins />} />
          </div>
        </section>

        {/* Section 6: Implementation & Costs */}
        <section id="setup" className="py-12">
          <SectionTitle>Setup, Funding, and Choosing a Trustee</SectionTitle>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300 font-serif">The Critical Step: Funding</h3>
                <Paragraph>
                  A signed trust document is inert until it is &ldquo;funded&rdquo;&mdash;the process of legally re-titling assets into its name. Failure to fund the trust is the most common estate planning mistake. This step, best guided by an attorney, is what enables the trust to fulfill its purpose.
                </Paragraph>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 mt-1 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0"/>
                    <span><strong>Real Estate:</strong> Transfer ownership by recording a new deed.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 mt-1 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0"/>
                    <span><strong>Bank/Brokerage Accounts:</strong> Retitle accounts into the trust&apos;s name.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 mt-1 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0"/>
                    <span><strong>Retirement Accounts:</strong> Name the trust as a beneficiary (do not retitle ownership). This requires careful tax planning.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300 font-serif">The Safety Net: The Pour-Over Will</h3>
                <Paragraph>
                  A Pour-Over Will is a special type of will created alongside a living trust. Its sole purpose is to act as a safety net, &ldquo;catching&rdquo; any assets you forgot to transfer into your trust and directing them to be added after your death. While these assets must still go through probate, the will ensures they ultimately end up in the trust and are distributed according to its terms.
                </Paragraph>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300 font-serif">Choosing Your Successor Trustee</h3>
                <Paragraph>
                  This is one of the most important decisions you&apos;ll make. Your successor trustee will step in to manage the trust upon your incapacity or death.
                </Paragraph>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-lg mb-2">Individual Trustee</h4>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                      <li><strong>Pros:</strong> Knows your family, no fees, more flexible.</li>
                      <li><strong>Cons:</strong> May lack expertise, potential for family conflict, can be biased.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Corporate Trustee</h4>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                      <li><strong>Pros:</strong> Professional, impartial, experienced, regulated.</li>
                      <li><strong>Cons:</strong> Fees (1-2% of AUM), may be less personal/flexible.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-300 font-serif">Understanding the Costs</h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 mt-1 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0"/>
                    <span><strong>Initial Setup:</strong> Typically $2,000 - $5,000 with a qualified attorney for a standard living trust package (including pour-over will).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 mt-1 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0"/>
                    <span><strong>Ongoing Fees:</strong> Virtually none while you are the trustee. After your death, corporate trustees charge ~1-2% of assets annually. Individual trustees may or may not take a fee.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Myths & Misconceptions */}
        <section id="myths" className="py-12">
          <SectionTitle>Common Trust Myths Debunked</SectionTitle>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <MythCard
              title="Myth: Trusts are only for the super-rich."
              explanation="Fact: While trusts are essential for managing estate taxes for the wealthy, their primary benefit for most people is probate avoidance. If you own a home, a trust can save your heirs thousands of dollars and months of time, regardless of your other assets."
            />
            <MythCard
              title="Myth: I lose control of my assets if I create a trust."
              explanation="Fact: This is only true for irrevocable trusts. With a Revocable Living Trust, you retain 100% control. You can buy, sell, and manage assets just as you did before. You can amend or even dissolve the trust at any time."
            />
            <MythCard
              title="Myth: A will is good enough to avoid probate."
              explanation="Fact: A will does not avoid probate; it is essentially a set of instructions for the probate court. Only assets titled in a trust's name or passed directly via beneficiary designation (like a 401k) can skip the probate process."
            />
            <MythCard
              title="Myth: Creating a trust is a one-time event."
              explanation="Fact: An estate plan should be a living document. It's crucial to review your trust every 3-5 years or after major life events (marriage, divorce, birth of a child, significant financial change) to ensure it still reflects your wishes."
            />
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
