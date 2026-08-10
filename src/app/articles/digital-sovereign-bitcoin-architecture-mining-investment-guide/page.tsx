'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Database, Ticket, Pickaxe, Eye, Globe, TrendingUp, Users, Scale, Server, Key, Lock, ChevronRight, FileText, Hash, Zap, Bitcoin, Fingerprint, Briefcase, Search, ShoppingBag, Shield, Shuffle } from 'lucide-react';

const Section = ({ title, icon: Icon, color, bgInfo, children }: {
  title: string;
  icon: any;
  color: { border: string; text: string };
  bgInfo: { header: string; icon: string };
  children: React.ReactNode;
}) => (
  <div className={`mb-12 rounded-3xl overflow-hidden border-2 ${color.border} bg-white dark:bg-[#0A0D14] shadow-xl transition-all duration-300 hover:shadow-2xl`}>
    <div className={`p-8 ${bgInfo.header} border-b ${color.border}`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${bgInfo.icon} ${color.text}`}>
          <Icon size={32} />
        </div>
        <h2 className={`text-3xl font-bold ${color.text}`}>{title}</h2>
      </div>
    </div>
    <div className="p-8 md:p-12 text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
      {children}
    </div>
  </div>
);

const Callout = ({ title, children, emoji }: {
  title: string;
  children: React.ReactNode;
  emoji: string;
}) => (
  <div className="my-8 p-6 bg-slate-50 dark:bg-[#14171B] rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl">
      {emoji}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2 font-serif">
      <span className="text-2xl">{emoji}</span> {title}
    </h3>
    <div className="text-slate-600 dark:text-slate-400 relative z-10">
      {children}
    </div>
  </div>
);

const InfoCard = ({ title, value, subtext, colorClass }: {
  title: string;
  value: string;
  subtext?: string;
  colorClass: string;
}) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform">
    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</h4>
    <div className={`text-2xl font-bold ${colorClass} mb-1`}>{value}</div>
    {subtext && <p className="text-xs text-slate-500">{subtext}</p>}
  </div>
);

const TableRow = ({ label, value }: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:bg-[#14171B] px-2 rounded transition-colors">
    <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
    <span className="text-slate-600 dark:text-slate-400 text-right">{value}</span>
  </div>
);

export default function BitcoinGuide() {
  return (
    <ArticleFrame slug="digital-sovereign-bitcoin-architecture-mining-investment-guide">
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <InfographicSlot alt="Bitcoin Architecture Infographic" />
      </section>
      
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          {/* 1. Architecture */}
          <Section 
            title="Architecture & Mechanics" 
            icon={Database}
            color={{ border: 'border-blue-100', text: 'text-[#A8672E] dark:text-[#D08F52]' }}
            bgInfo={{ header: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
              <p>To comprehend Bitcoin, one must first grasp the underlying architecture that enables a decentralized network to reach consensus without a central arbiter. It is a protocol for trustless value transfer, secured by thermodynamics and cryptography.</p>
              
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">The Distributed Ledger: A Shared Truth</h3>
              <p>In traditional finance, a ledger is maintained by a centralized entity (like a bank). Bitcoin inverts this by distributing the ledger across a global network of "nodes". Each node possesses an identical copy of the entire transaction history.</p>
              
              <Callout title="Intuitive Explanation: The Notebook" emoji="📒">
                Imagine a vast room filled with thousands of strangers, each holding a notebook. When Alice wants to send money to Bob, she announces it to the room. Everyone opens their notebook, verifies Alice has the funds, and records the transaction. If she tries to spend it twice, the room collectively rejects it based on their records. The "announcement" is a digital broadcast, and the "notebooks" are the blockchain.
              </Callout>
              
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">The UTXO Model: Melted Gold</h3>
              <p>Bitcoin doesn't store "balances" like a bank account. It uses the <strong>Unspent Transaction Output (UTXO)</strong> model.</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">Account Model (Traditional)</h4>
                  <p className="text-sm">Database entry: "Alice Balance: $80". Updates overwrite the previous number.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 ring-2 ring-orange-200">
                  <h4 className="font-bold text-orange-900 mb-2">UTXO Model (Bitcoin)</h4>
                  <p className="text-sm">Alice holds specific "chunks" of digital value. To spend 1 BTC from a 5 BTC chunk, she must "melt" the 5 BTC input and create two new outputs: 1 BTC to Bob, and 4 BTC back to herself as change.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 2. The Computational Lottery */}
          <Section 
            title="The Computational Lottery" 
            icon={Ticket}
            color={{ border: 'border-rose-100', text: 'text-[#BC4128] dark:text-[#E2694A]' }}
            bgInfo={{ header: 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
              <p>To understand how new bitcoin is "found" intuitively, it is helpful to reframe the concept: miners are not searching for coins hidden in a digital landscape. Instead, they are participating in a global, <strong>computational lottery</strong> to earn the right to record the next page of the transaction history.</p>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                {/* Setup */}
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-rose-100 shadow-sm">
                  <h3 className="text-xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2 font-serif">
                    <FileText size={20}/> 1. The Setup (Page & Puzzle)
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">To add a "page" (block) to the notebook, a miner must solve a puzzle based on the page's data.</p>
                  <div className="bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg text-xs font-mono text-slate-500 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex justify-between">
                      <span>Transactions:</span> <span className="text-slate-700 dark:text-slate-300">Alice sent Bob 2 BTC...</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prev Hash:</span> <span className="text-slate-700 dark:text-slate-300">0000...a4f2</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#BC4128] dark:text-[#E2694A] bg-[#BC4128]/10 dark:bg-[#E2694A]/10 px-1 rounded">
                      <span>+ Nonce:</span> <span>(The Variable)</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">The <strong>Nonce</strong> is the only part the miner can freely change to solve the puzzle.</p>
                </div>
                
                {/* Grinder */}
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-rose-100 shadow-sm">
                  <h3 className="text-xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2 font-serif">
                    <Hash size={20}/> 2. The Digital Grinder
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">The miner runs the data through <strong>SHA-256</strong>. It acts like a one-way function.</p>
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-16 text-right text-slate-400">Try 1:</span>
                      <span className="bg-slate-100 px-2 rounded">Nonce "123"</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-slate-500">Hash: 8d9a... (Fail)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-16 text-right text-slate-400">Try 2:</span>
                      <span className="bg-slate-100 px-2 rounded">Nonce "124"</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-slate-500">Hash: c4b1... (Fail)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#BC4128] dark:text-[#E2694A]">
                      <span className="w-16 text-right">Try 1B:</span>
                      <span className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 px-2 rounded">Nonce "984"</span>
                      <span className="text-[#BC4128] dark:text-[#E2694A]">→</span>
                      <span className="">0000... (WIN!)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">The Discovery: Brute Force</h3>
              <p>Because the output is unpredictable, there is no shortcut. The only way to find the correct Nonce is <strong>brute force trial and error</strong>. Modern ASICs (mining computers) act like industrial-grade lottery ticket buyers, generating <strong>trillions of hashes per second</strong>—effectively rolling a billion-sided die over and over hoping for a specific result.</p>
              
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">The Reward: Coinbase Transaction</h3>
              <p>When a miner finds a winning hash (one with enough leading zeros), they broadcast it. As a reward for securing the ledger, the protocol allows them to write a special transaction at the top of the block—called a <strong>coinbase transaction</strong>. This credits the miner with newly minted bitcoin.</p>
              
              <Callout title="Analogy: The Global Lottery" emoji="🎫">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="bg-white dark:bg-[#0A0D14] p-2 rounded-lg shadow-sm">
                      <Ticket size={20} className="text-[#BC4128] dark:text-[#E2694A]"/>
                    </div>
                    <div><strong>The Ticket:</strong> Every hash a computer generates is one lottery ticket.</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-white dark:bg-[#0A0D14] p-2 rounded-lg shadow-sm">
                      <Zap size={20} className="text-[#BC4128] dark:text-[#E2694A]"/>
                    </div>
                    <div><strong>The Price:</strong> The cost of the ticket is electricity (thermodynamics).</div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-white dark:bg-[#0A0D14] p-2 rounded-lg shadow-sm">
                      <Bitcoin size={20} className="text-[#BC4128] dark:text-[#E2694A]"/>
                    </div>
                    <div><strong>The Prize:</strong> The winner gets the privilege of writing history and is paid in new BTC.</div>
                  </li>
                </ul>
              </Callout>
            </div>
          </Section>

          {/* 3. Mining Industry */}
          <Section 
            title="The Mining Industry" 
            icon={Pickaxe}
            color={{ border: 'border-amber-100', text: 'text-amber-700' }}
            bgInfo={{ header: 'bg-amber-50/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <p>While the mechanism is a computational lottery, the industry is a high-stakes arms race. Profitability depends on the cost of electricity and the efficiency of hardware.</p>
            
            <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard title="Consensus" value="Proof of Work" subtext="Energy-based security" colorClass="text-amber-600" />
              <InfoCard title="Algorithm" value="SHA-256" subtext="Cryptographic hashing" colorClass="text-amber-600" />
              <InfoCard title="Hardware" value="ASIC" subtext="Specialized chips" colorClass="text-amber-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">2025 Hardware Standards</h3>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600 dark:text-slate-400">
                  <tr>
                    <th className="p-4">Model</th>
                    <th className="p-4">Hashrate</th>
                    <th className="p-4 hidden sm:table-cell">Power</th>
                    <th className="p-4 text-right">Price (Est.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Antminer S21 Pro', hash: '234 TH/s', power: '3500W', price: '$4,500+' },
                    { name: 'Antminer S21', hash: '200 TH/s', power: '3500W', price: '$3,500+' },
                    { name: 'WhatsMiner M60', hash: '186 TH/s', power: '3400W', price: 'Market' },
                  ].map((miner, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:bg-[#14171B]/80">
                      <td className="p-4 font-bold text-slate-700 dark:text-slate-300">{miner.name}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{miner.hash}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 hidden sm:table-cell">{miner.power}</td>
                      <td className="p-4 text-right font-mono text-amber-700">{miner.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <Callout title="Can you mine at home?" emoji="🏠">
              <p className="mb-2"><strong>Likely No.</strong> Mining is a zero-sum industrial game.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Electricity Cost:</strong> You need &lt;$0.05/kWh to profit. Residential avg is ~$0.15/kWh.</li>
                <li><strong>Noise & Heat:</strong> ASICs are incredibly loud and hot.</li>
                <li><strong>ROI:</strong> Buying bitcoin directly is usually more profitable for individuals.</li>
              </ul>
            </Callout>
          </Section>

          {/* 4. Privacy */}
          <Section 
            title="Privacy & Anonymity" 
            icon={Eye}
            color={{ border: 'border-purple-100', text: 'text-purple-600' }}
            bgInfo={{ header: 'bg-purple-50/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-lg mb-4">While your real-world identity is not stamped on the blockchain, every single transaction you make is broadcast to a public ledger. Because the ledger is permanent, your privacy is protected only as long as your real-world identity cannot be linked to your digital address.</p>
                
                <Callout title="The Pen Name Analogy" emoji="🎭">
                  Think of Bitcoin like writing under a <strong>pseudonym (pen name)</strong>. If you write a book as "Satoshi," the public can read every word, but they don't know it's you. However, if you accept a royalty check into your personal bank account for that book, the bank now links "Satoshi" to <strong>you</strong>. From that moment, your entire history under that name is de-anonymized.
                </Callout>
              </div>
              
              {/* What the Public Knows */}
              <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-serif">
                  <Globe size={20} className="text-purple-500"/> 1. Radical Transparency
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">The network relies on everyone seeing everything to verify trust. Anyone with internet can see:</p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase">The Addresses</div>
                    <div className="font-mono text-purple-600 text-sm truncate px-2">bc1q...kx9j</div>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase">The Amount</div>
                    <div className="font-mono text-purple-600 text-sm">3.45 BTC</div>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-400 uppercase">The Time</div>
                    <div className="font-mono text-purple-600 text-sm">Block 824,101</div>
                  </div>
                </div>
              </div>
              
              {/* Who Can Link You */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-serif">
                  <Fingerprint size={20} className="text-[#BC4128] dark:text-[#E2694A]"/> 2. Who Can Link You?
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl border border-red-100 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/30">
                    <div className="mt-1 text-[#BC4128] dark:text-[#E2694A]">
                      <Briefcase size={24}/>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">The Exchanges (KYC)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Centralized exchanges (Coinbase, Kraken) require ID. Once you withdraw to your wallet, they know that address belongs to you. If they share this with the IRS or FBI, your "pen name" is revealed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl border border-red-100 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/30">
                    <div className="mt-1 text-[#BC4128] dark:text-[#E2694A]">
                      <Search size={24}/>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Chain Analysis Firms</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Firms like Chainalysis use heuristics to track you:</p>
                      <ul className="list-disc pl-4 mt-2 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Common Input Heuristic:</strong> If you pay with 0.5 BTC + 0.3 BTC, analysts assume both inputs belong to the same person.</li>
                        <li><strong>Change Address Detection:</strong> Math reveals which output was payment and which was "change" sent back to you.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl border border-red-100 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/30">
                    <div className="mt-1 text-[#BC4128] dark:text-[#E2694A]">
                      <ShoppingBag size={24}/>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Retailers & Shipping</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Buying physical goods online links your digital wallet directly to your physical home address.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Privacy Tools */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-serif">
                  <Shield size={20} className="text-[#1D8A70] dark:text-[#3CBF9C]"/> 3. Privacy Tools
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-green-100 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/30">
                    <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2 flex items-center gap-2">
                      <Shuffle size={16}/> CoinJoin
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">A protocol that "mixes" coins from multiple users into one large pool. It becomes mathematically difficult to trace which input paid which output.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-green-100 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/30">
                    <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2 flex items-center gap-2">
                      <Zap size={16}/> Lightning Network
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">A Layer-2 solution using "onion routing." Intermediate nodes only know the previous and next hop, not the source or destination.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 5. Decentralization */}
          <Section 
            title="Decentralization & Governance" 
            icon={Globe}
            color={{ border: 'border-indigo-100', text: 'text-[#A8672E] dark:text-[#D08F52]' }}
            bgInfo={{ header: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <p className="mb-6">Who rules Bitcoin? <strong>The Nodes.</strong> Miners produce blocks, but the economic majority of nodes validate them. If a miner breaks the rules, nodes reject the block.</p>
            
            <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b pb-2 font-serif">Case Study: The Block Size War (2015-2017)</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#BC4128] dark:bg-[#E2694A] flex items-center justify-center flex-shrink-0 text-[#BC4128] dark:text-[#E2694A] font-bold">VS</div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">Big Blockers (Miners & Corporations)</h4>
                    <p className="text-sm text-slate-500">Wanted larger blocks (8MB+) for scale. Threatens decentralization by making nodes expensive.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] flex items-center justify-center flex-shrink-0 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Win</div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">Small Blockers (Users & Nodes)</h4>
                    <p className="text-sm text-slate-500">Kept blocks small to ensure anyone can run a node on a laptop. Resulted in SegWit update.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 6. Investment */}
          <Section 
            title="Investment Ecosystem" 
            icon={TrendingUp}
            color={{ border: 'border-emerald-100', text: 'text-[#1D8A70] dark:text-[#3CBF9C]' }}
            bgInfo={{ header: 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <p className="mb-8">In 2025, investors have multiple avenues to access the asset class, ranging from spot ETFs to volatile mining stocks.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* ETFs */}
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-4 flex items-center gap-2 font-serif">
                  <Briefcase size={20}/> Spot ETFs
                </h3>
                <p className="text-sm text-slate-500 mb-4">Safest regulated exposure. Funds hold actual BTC.</p>
                <div className="space-y-2">
                  {[
                    { t: 'IBIT', n: 'iShares Bitcoin Trust', f: '0.12-0.25%' },
                    { t: 'FBTC', n: 'Fidelity Wise Origin', f: '~0.25%' },
                    { t: 'BITB', n: 'Bitwise Bitcoin ETF', f: '0.20%' },
                  ].map((etf, i) => (
                    <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-[#14171B] p-3 rounded-lg">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{etf.t}</span>
                        <span className="text-xs text-slate-500 block">{etf.n}</span>
                      </div>
                      <span className="text-xs font-mono bg-white dark:bg-[#0A0D14] px-2 py-1 rounded border border-slate-200 dark:border-slate-800">{etf.f}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mining Stocks */}
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2 font-serif">
                  <Zap size={20}/> Mining Stocks
                </h3>
                <p className="text-sm text-slate-500 mb-4">High volatility "leveraged" plays.</p>
                <div className="space-y-3">
                  <TableRow label="MARA (Marathon)" value="Hodl Strategy" />
                  <TableRow label="RIOT (Riot Platforms)" value="Energy/Infra" />
                  <TableRow label="CLSK (CleanSpark)" value="Efficiency" />
                  <TableRow label="MSTR (MicroStrategy)" value="Corporate Treasury" />
                </div>
              </div>
            </div>
          </Section>

          {/* 7. Altcoins */}
          <Section 
            title="The Competition" 
            icon={Users}
            color={{ border: 'border-pink-100', text: 'text-pink-600' }}
            bgInfo={{ header: 'bg-pink-50/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Why is Bitcoin still King?</h3>
            <p className="mb-6">Network Effects. Liquidity begets liquidity.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#14171B] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">Bitcoin Cash (BCH)</h4>
                  <span className="text-xs bg-[#BC4128] dark:bg-[#E2694A] text-[#BC4128] dark:text-[#E2694A] px-2 py-1 rounded">Hard Fork</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Increased block size for cheaper payments.</p>
                <div className="text-xs text-slate-500 border-t pt-2 mt-2">
                  <strong>Why less popular?</strong> Low security (hashrate is &lt;1% of Bitcoin), centralization risks, market prefers "Store of Value".
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#14171B] border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">Litecoin (LTC)</h4>
                  <span className="text-xs bg-slate-200 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">Altcoin</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">"Digital Silver", faster blocks (2.5m).</p>
                <div className="text-xs text-slate-500 border-t pt-2 mt-2">
                  <strong>Why less popular?</strong> Redundant due to Lightning Network on Bitcoin.
                </div>
              </div>
            </div>
          </Section>

          {/* 8. Regulation */}
          <Section 
            title="Regulation & Taxes" 
            icon={Scale}
            color={{ border: 'border-teal-100', text: 'text-teal-600' }}
            bgInfo={{ header: 'bg-teal-50/50', icon: 'bg-white dark:bg-[#0A0D14]' }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 font-serif">
                  <FileText size={18} className="text-teal-500"/> Taxation (US)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Bitcoin is treated as <strong>property</strong>. Every trade, sale, or purchase (even coffee) is a taxable event causing Capital Gains or Losses. New reporting rules (Form 1099-DA) mean exchanges report directly to the IRS.</p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2 font-serif">
                  <Lock size={18} className="text-teal-500"/> Self-Custody
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">A major legislative theme in 2025 is the "Right to Self-Custody"—protecting the individual's right to hold their own private keys without third-party interference.</p>
              </div>
            </div>
          </Section>

      </div>
    </ArticleFrame>
  );
}