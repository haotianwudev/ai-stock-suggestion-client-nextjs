'use client';

import { useState } from 'react';
import { Database, Cpu, Activity, ShieldCheck, Zap, Globe, Layers, BarChart3, GitBranch, Network, Binary, Workflow, Search, CheckCircle2, AlertCircle, ArrowRight, Code2, Settings2, ShieldAlert, Terminal, Server, Brain, Target, FunctionSquare, GitMerge, Microscope, BoxSelect, Cloud, HardDrive, Lock, Wifi, Radio, RefreshCw, Scale, FileWarning, PieChart, Calculator, LayoutGrid, Sliders, TrendingDown, Anchor, Clock, FileText, Table, History } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Shared Components ---
interface SectionHeaderProps {
  icon: React.ComponentType<any>;
  title: string;
  colorClass: string;
  subtitle?: string;
}

const SectionHeader = ({ icon: Icon, title, colorClass, subtitle }: SectionHeaderProps) => (
  <div className="mb-10 mt-8">
    <div className={`flex items-center gap-3 mb-2 p-4 rounded-xl ${colorClass} bg-opacity-10`}>
      <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
      <h2 className={`text-3xl font-bold ${colorClass.replace('bg-', 'text-')}`}>{title}</h2>
    </div>
    {subtitle && <p className="text-slate-500 ml-4 border-l-2 border-slate-200 pl-4 italic">{subtitle}</p>}
  </div>
);

interface TechBadgeProps {
  children: React.ReactNode;
  color?: string;
}

const TechBadge = ({ children, color = "slate" }: TechBadgeProps) => (
  <span className={`px-2 py-1 bg-${color}-100 text-${color}-700 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-${color}-200`}>
    {children}
  </span>
);

interface DetailCardProps {
  title: string;
  icon: React.ComponentType<any>;
  items: string[];
  color: string;
}

const DetailCard = ({ title, icon: Icon, items, color }: DetailCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 transition-all group h-full">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
        <Icon size={20} />
      </div>
      <h4 className="font-bold text-slate-800">{title}</h4>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-slate-600 flex gap-2 items-start">
          <div className={`w-1.5 h-1.5 rounded-full bg-${color}-400 mt-1.5 shrink-0`} />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface TabButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: React.ComponentType<any>;
  color?: string;
}

const TabButton = ({ active, label, onClick, icon: Icon, color = "purple" }: TabButtonProps) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-lg transition-all border whitespace-nowrap ${
      active 
        ? `bg-${color}-600 text-white border-${color}-600 shadow-md transform scale-105` 
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

interface CodeBlockProps {
  label: string;
  code: string;
}

const CodeBlock = ({ label, code }: CodeBlockProps) => (
  <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-indigo-300 my-3 border border-slate-800 shadow-inner">
    <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
      <span className="text-slate-500 font-bold">{label}</span>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-slate-700" />
      </div>
    </div>
    <pre className="overflow-x-auto whitespace-pre-wrap">{code}</pre>
  </div>
);

export default function AlphaFactoryArticle() {
  const [activeModelTab, setActiveModelTab] = useState('architectures');
  const [activeArchTab, setActiveArchTab] = useState('physical');
  const [activeBacktestTab, setActiveBacktestTab] = useState('engine');
  const [activeRiskTab, setActiveRiskTab] = useState('solver');
  const [activeDataTab, setActiveDataTab] = useState('lakehouse');

  return (
    <ArticleFrame slug="alpha-factory-technical-blueprint-quantitative-hedge-funds">
      
      <InfographicSlot alt="Alpha Factory System Architecture Infographic" />

      {/* I. Architecture */}
      <section id="architecture">
        <SectionHeader 
          icon={Layers} 
          title="I. System Architecture" 
          subtitle="The Hybrid Cloud Topology: Optimizing for both Latency and Capacity."
          colorClass="bg-blue-600" 
        />
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12">
          {/* Arch Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 overflow-x-auto">
            <TabButton 
              active={activeArchTab === 'physical'} 
              label="Physical Topology" 
              icon={Server} 
              onClick={() => setActiveArchTab('physical')} 
              color="blue" 
            />
            <TabButton 
              active={activeArchTab === 'logical'} 
              label="Logical Microservices" 
              icon={BoxSelect} 
              onClick={() => setActiveArchTab('logical')} 
              color="blue" 
            />
            <TabButton 
              active={activeArchTab === 'network'} 
              label="Network Stack" 
              icon={Wifi} 
              onClick={() => setActiveArchTab('network')} 
              color="blue" 
            />
          </div>
          <div className="p-8 min-h-[500px]">
            {/* Tab 1: Physical Topology */}
            {activeArchTab === 'physical' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">The Hybrid Model</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We cannot run everything in the Cloud due to latency, nor everything On-Prem due to cost. The architecture is split into two distinct zones connected by a secure leased line.
                    </p>
                    <div className="grid gap-4">
                      <div className="p-4 bg-slate-800 rounded-xl text-white border border-slate-700 shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <HardDrive className="text-emerald-400" />
                          <h4 className="font-bold">Zone A: Co-location (On-Prem)</h4>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">NY4 / NJ2 Data Centers. Directly cross-connected to exchanges.</p>
                        <div className="flex gap-2">
                          <TechBadge color="emerald">C++ 20</TechBadge>
                          <TechBadge color="emerald">FPGA</TechBadge>
                          <TechBadge color="emerald">&lt; 5µs Latency</TechBadge>
                        </div>
                      </div>
                      <div className="flex justify-center -my-2 z-10">
                        <div className="bg-slate-200 text-slate-500 text-xs px-3 py-1 rounded-full font-mono border border-slate-300">
                          10Gbps Direct Connect (The Airlock)
                        </div>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <div className="flex items-center gap-3 mb-2">
                          <Cloud className="text-indigo-600" />
                          <h4 className="font-bold text-indigo-900">Zone B: The Cloud (AWS/GCP)</h4>
                        </div>
                        <p className="text-sm text-indigo-800 mb-3">Elastic compute for research, massive data storage, and non-latency sensitive tasks.</p>
                        <div className="flex gap-2">
                          <TechBadge color="indigo">Python</TechBadge>
                          <TechBadge color="indigo">Kubernetes</TechBadge>
                          <TechBadge color="indigo">Petabytes</TechBadge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-white px-4 py-1 rounded shadow text-xs font-bold text-slate-500">NASDAQ / NYSE</div>
                      <div className="mt-8 border-2 border-slate-300 border-dashed rounded-xl p-4 relative">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">Co-Location Pod</div>
                        <div className="flex gap-2 justify-center">
                          <div className="w-16 h-20 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] flex-col gap-1">
                            <Radio size={14} className="text-green-400"/>
                            Market<br/>Data
                          </div>
                          <div className="w-16 h-20 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] flex-col gap-1">
                            <Cpu size={14} className="text-blue-400"/>
                            OEMS
                          </div>
                        </div>
                      </div>
                      <div className="h-12 border-l-2 border-slate-300 border-dashed mx-auto"></div>
                      <div className="border-2 border-indigo-200 rounded-xl p-4 bg-indigo-50/50">
                        <div className="text-xs font-bold text-indigo-400 uppercase mb-2 text-center">Research Cloud</div>
                        <div className="flex gap-2 justify-center">
                          <div className="w-24 h-16 bg-white border border-indigo-200 rounded flex items-center justify-center text-indigo-800 text-xs font-bold shadow-sm">Data Lake</div>
                          <div className="w-24 h-16 bg-white border border-indigo-200 rounded flex items-center justify-center text-indigo-800 text-xs font-bold shadow-sm">Alpha Gen</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 2: Logical Microservices */}
            {activeArchTab === 'logical' && (
              <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2 lg:col-span-4 mb-4">
                  <p className="text-slate-600">
                    The monolith is dead. The system is composed of specialized, single-responsibility engines communicating via high-performance messaging buses (Aeron / ZeroMQ).
                  </p>
                </div>
                <DetailCard 
                  title="Ticker Plant"
                  icon={Radio}
                  color="green"
                  items={[
                    "Protocol Normalization (SBE/FIX -> Internal Structs).",
                    "Book Building (L3 -> L2 -> L1).",
                    "Multicast Distribution to Strategy Engines."
                  ]}
                />
                <DetailCard 
                  title="Alpha Engine"
                  icon={Brain}
                  color="purple"
                  items={[
                    "Receives normalized market data.",
                    "Computes features & runs inference.",
                    "Emits 'Target Portfolios' (Not orders!)."
                  ]}
                />
                <DetailCard 
                  title="Risk Sidecar"
                  icon={ShieldCheck}
                  color="red"
                  items={[
                    "Pre-trade checks (< 5µs).",
                    "Fat-finger limits.",
                    "Kill switch functionality.",
                    "Runs locally on the execution server."
                  ]}
                />
                <DetailCard 
                  title="Smart Router (SOR)"
                  icon={Network}
                  color="blue"
                  items={[
                    "Takes target portfolio diffs.",
                    "Slices orders (TWAP/VWAP/POV).",
                    "Routes to specific venues (Dark Pools vs Lit)."
                  ]}
                />
              </div>
            )}
            
            {/* Tab 3: Network Stack */}
            {activeArchTab === 'network' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">The Latency War</h3>
                    <p className="text-slate-600 mb-6">
                      In the co-location zone, the OS kernel is the enemy. Context switches cost microseconds. We bypass the kernel entirely.
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 border border-slate-200 rounded-lg">
                        <div className="bg-slate-100 p-3 rounded-full h-fit">
                          <Zap size={20} className="text-yellow-600"/>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800">Kernel Bypass (Solarflare/Mellanox)</h5>
                          <p className="text-sm text-slate-600 mt-1">
                            Using `ef_vi` or `DPDK` to map the Network Interface Card (NIC) memory directly to the user-space application, skipping the Linux TCP/IP stack.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-4 border border-slate-200 rounded-lg">
                        <div className="bg-slate-100 p-3 rounded-full h-fit">
                          <Cpu size={20} className="text-blue-600"/>
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800">CPU Pinning & Isolation</h5>
                          <p className="text-sm text-slate-600 mt-1">
                            Isolating specific CPU cores for the critical path (Exchange Handler) and disabling interrupts (IRQs) on those cores to prevent jitter.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CodeBlock 
                      label="network_config.profile" 
                      code={`# Solarflare OpenOnload Profile
onload_set output_profile latency
onload_set profile_custom_spin 1000000
onload_set tcp_nodelay 1

# CPU Isolation (Grub)
isolcpus=2-10 nohz_full=2-10 rcu_nocbs=2-10

# Thread Pinning (C++)
cpu_set_t cpuset;
CPU_ZERO(&cpuset);
CPU_SET(isolated_core_id, &cpuset);
pthread_setaffinity_np(thread, sizeof(cpu_set_t), &cpuset);`} 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* II. The Data Foundation (EXPANDED) */}
      <section id="data">
        <SectionHeader 
          icon={Database} 
          title="II. The Data Foundation" 
          subtitle="The lifeblood of the fund. Ensuring Point-in-Time correctness and cleanliness."
          colorClass="bg-emerald-600" 
        />
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12">
          {/* Data Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 overflow-x-auto">
            <TabButton 
              active={activeDataTab === 'lakehouse'} 
              label="Architecture" 
              icon={Server} 
              onClick={() => setActiveDataTab('lakehouse')} 
              color="emerald" 
            />
            <TabButton 
              active={activeDataTab === 'bitemporal'} 
              label="Bitemporality" 
              icon={Clock} 
              onClick={() => setActiveDataTab('bitemporal')} 
              color="emerald" 
            />
            <TabButton 
              active={activeDataTab === 'microstructure'} 
              label="Microstructure" 
              icon={Binary} 
              onClick={() => setActiveDataTab('microstructure')} 
              color="emerald" 
            />
            <TabButton 
              active={activeDataTab === 'symbology'} 
              label="Security Master" 
              icon={FileText} 
              onClick={() => setActiveDataTab('symbology')} 
              color="emerald" 
            />
          </div>
          <div className="p-8 min-h-[500px]">
            {/* Tab 1: Architecture (Lakehouse) */}
            {activeDataTab === 'lakehouse' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">The 3-Tier Storage Model</h3>
                    <p className="text-slate-600">We optimize storage for access patterns. Trading engines need nanoseconds; researchers need terabytes.</p>
                    <div className="grid gap-4">
                      <div className="p-4 border border-emerald-100 bg-emerald-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap size={16} className="text-emerald-600"/>
                          <span className="font-bold text-emerald-900">Tier 1: Hot (kdb+ / Redis)</span>
                        </div>
                        <p className="text-xs text-emerald-800">In-memory. Last 24 hours of ticks. Used for live signals and real-time dashboards.</p>
                      </div>
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <HardDrive size={16} className="text-slate-600"/>
                          <span className="font-bold text-slate-900">Tier 2: Warm (Parquet / Delta Lake)</span>
                        </div>
                        <p className="text-xs text-slate-600">NVMe SSDs. Recent history (5 years). Used for daily retraining of models.</p>
                      </div>
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Cloud size={16} className="text-slate-400"/>
                          <span className="font-bold text-slate-500">Tier 3: Cold (S3 Glacier)</span>
                        </div>
                        <p className="text-xs text-slate-500">Object Store. Full history (20+ years). Used for deep-dive research.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CodeBlock 
                      label="storage_policy.py" 
                      code={`# Data Movement Logic
def migrate_data():
    # 1. Capture realtime feed
    ticks = kdb.query("select from quote where time > -5m")
    
    # 2. End of Day: Flush to Delta Lake
    if market_status == 'CLOSED':
        df = kdb.query("select from quote where date=.z.d")
        df.write.format("delta").save("/mnt/lake/quotes")
        
    # 3. Optimistic Z-Ordering for fast retrieval
    spark.sql("OPTIMIZE quotes ZORDER BY (symbol, time)")`} 
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 2: Bitemporal */}
            {activeDataTab === 'bitemporal' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Point-in-Time Correctness</h3>
                <p className="text-slate-600 mb-6">
                  Crucial for fundamental data. If a company restates earnings, the database changes, but your backtest must know what the value <strong>was</strong> on the trading day, not what it is now.
                </p>
                <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-mono text-xs uppercase">
                      <tr>
                        <th className="p-4">Entity</th>
                        <th className="p-4">Metric</th>
                        <th className="p-4 text-emerald-600 font-bold">Value</th>
                        <th className="p-4">Valid From (Event)</th>
                        <th className="p-4">Valid To</th>
                        <th className="p-4 text-blue-600 font-bold">Transaction Time (Known At)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-mono">AAPL</td>
                        <td className="p-4">EPS</td>
                        <td className="p-4 font-bold">1.20</td>
                        <td className="p-4">2023-01-01</td>
                        <td className="p-4 text-slate-400">NULL</td>
                        <td className="p-4 text-blue-600 font-mono">2023-02-15 16:05:00</td>
                      </tr>
                      <tr className="bg-rose-50 hover:bg-rose-100">
                        <td className="p-4 font-mono">AAPL</td>
                        <td className="p-4">EPS</td>
                        <td className="p-4 font-bold text-rose-700">1.18</td>
                        <td className="p-4">2023-01-01</td>
                        <td className="p-4 text-slate-400">NULL</td>
                        <td className="p-4 text-blue-600 font-mono">2023-03-10 09:30:00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex gap-2 text-xs text-slate-500">
                  <AlertCircle size={14} className="text-rose-500"/>
                  <span>On Feb 20th, the system believes EPS is 1.20. On March 11th, it knows it was restated to 1.18. A backtest running on Feb 20th <strong>MUST</strong> see 1.20.</span>
                </div>
              </div>
            )}
            
            {/* Tab 3: Microstructure */}
            {activeDataTab === 'microstructure' && (
              <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Level 3 Order Book</h3>
                  <p className="text-slate-600 mb-4">
                    We don't just use price (L1). We reconstruct the full book (L3) from raw multicast messages (Add/Modify/Delete) to see the queue position of every order.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                      <Binary size={16} className="text-indigo-500"/>
                      <span className="text-sm font-mono">Msg Type 'A': Add Order (ID: 101, Size: 100)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                      <Binary size={16} className="text-indigo-500"/>
                      <span className="text-sm font-mono">Msg Type 'E': Execute Order (ID: 101, Size: 50)</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                      <Binary size={16} className="text-indigo-500"/>
                      <span className="text-sm font-mono">Msg Type 'D': Delete Order (ID: 101)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-white font-mono text-xs">
                  <div className="flex justify-between border-b border-slate-700 pb-2 mb-2">
                    <span className="text-green-400 font-bold">BIDS</span>
                    <span className="text-slate-500">DEPTH OF MARKET</span>
                    <span className="text-rose-400 font-bold">ASKS</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between opacity-50">
                      <span>100 @ 150.01</span>
                      <span>500 @ 150.05</span>
                    </div>
                    <div className="flex justify-between opacity-70">
                      <span>250 @ 150.02</span>
                      <span>200 @ 150.04</span>
                    </div>
                    <div className="flex justify-between font-bold bg-slate-800 p-1 rounded">
                      <span className="text-green-400">1,500 @ 150.03</span>
                      <span className="text-rose-400">50 @ 150.03</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700 text-center text-slate-400 italic">
                    Imbalance: Strong Buy Pressure
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 4: Symbology */}
            {activeDataTab === 'symbology' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">The Master Security ID</h3>
                    <p className="text-slate-600 mb-6">
                      Tickers change (e.g., Facebook `FB` &rarr; `META`). If you query "FB" today, you get nothing. We map everything to a permanent internal ID (e.g., `SID_10492`) to maintain a continuous time series.
                    </p>
                    <DetailCard 
                      title="Corporate Actions"
                      icon={History}
                      color="indigo"
                      items={[
                        "Splits (1:10): Price drops 90%, but value is same. Must backwards-adjust history.",
                        "Dividends: Price drops by dividend amount. Must adjust.",
                        "Mergers: Ticker disappears. History mapped to acquirer or stops."
                      ]}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <CodeBlock 
                      label="symbology_map.json" 
                      code={`{
  "SID_10492": {
    "name": "Meta Platforms",
    "mappings": [
      {
        "ticker": "FB",
        "exchange": "NASDAQ",
        "start_date": "2012-05-18",
        "end_date": "2022-06-08"
      },
      {
        "ticker": "META",
        "exchange": "NASDAQ",
        "start_date": "2022-06-09",
        "end_date": null
      }
    ],
    "adjustments": [
      {
        "date": "2024-02-01", 
        "type": "DIVIDEND", 
        "amount": 0.50
      }
    ]
  }
}`} 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* III. Machine Learning Design */}
      <section className="scroll-mt-24" id="ml-design">
        <SectionHeader 
          icon={Cpu} 
          title="III. Machine Learning Design" 
          subtitle="From feature engineering to meta-labeling: The Deep Dive."
          colorClass="bg-purple-600" 
        />
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12">
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 overflow-x-auto">
            <TabButton 
              active={activeModelTab === 'architectures'} 
              label="The Model Arsenal" 
              icon={Brain} 
              onClick={() => setActiveModelTab('architectures')} 
            />
            <TabButton 
              active={activeModelTab === 'labeling'} 
              label="Labeling & Targets" 
              icon={Target} 
              onClick={() => setActiveModelTab('labeling')} 
            />
            <TabButton 
              active={activeModelTab === 'loss'} 
              label="Custom Loss Functions" 
              icon={FunctionSquare} 
              onClick={() => setActiveModelTab('loss')} 
            />
            <TabButton 
              active={activeModelTab === 'ensemble'} 
              label="Meta-Labeling" 
              icon={GitMerge} 
              onClick={() => setActiveModelTab('ensemble')} 
            />
          </div>
          <div className="p-8 min-h-[500px]">
            {/* Tab 1: Architectures */}
            {activeModelTab === 'architectures' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">State-of-the-Art Architectures</h3>
                    <p className="text-slate-600">
                      Modern quants moved beyond simple Linear Regression years ago. We now utilize a hybrid approach, combining the interpretability of tree-based models with the feature-extraction power of deep learning.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                          <Network size={16}/> TabNet & ResNets
                        </h4>
                        <p className="text-sm text-indigo-800 mt-1">
                          Neural networks adapted for tabular data. They use attention mechanisms to select relevant features instance-wise, offering interpretability similar to decision trees.
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <h4 className="font-bold text-purple-900 flex items-center gap-2">
                          <GitBranch size={16}/> Graph Neural Networks (GNNs)
                        </h4>
                        <p className="text-sm text-purple-800 mt-1">
                          Used for supply chain analysis. Stocks are nodes, and supplier/customer relationships are edges. Shocks to one node propagate through the graph to predict impact on connected entities.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          <BoxSelect size={16}/> Transformer Encoders
                        </h4>
                        <p className="text-sm text-slate-700 mt-1">
                          Applied to time-series (replacing LSTMs). We use "Time2Vec" positional encodings to capture periodicities in market microstructure.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-700 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-mono text-purple-400 font-bold text-sm uppercase tracking-widest">Model_Pipeline_Config.json</h4>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"/>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"/>
                      </div>
                    </div>
                    <div className="space-y-6 relative">
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-800" />
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 text-[10px]">1</div>
                        <span className="block font-bold text-indigo-300">Input Layer</span>
                        <span className="text-xs text-slate-400">Rank-Gauss Normalization + Lagged Returns</span>
                      </div>
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 text-[10px]">2</div>
                        <span className="block font-bold text-purple-300">Feature Extraction</span>
                        <span className="text-xs text-slate-400">Autoencoder (Denoising) &rarr; Bottleneck Layer (64 dims)</span>
                      </div>
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 text-[10px]">3</div>
                        <span className="block font-bold text-emerald-300">Prediction Head</span>
                        <span className="text-xs text-slate-400">Gradient Boosted Trees (LGBM) on Bottleneck Features</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 2: Labeling */}
            {activeModelTab === 'labeling' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">The Triple-Barrier Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-slate-600 mb-6">
                      Fixed-time horizons (e.g., "return after 5 days") are flawed because they ignore the path taken. We use the <strong>Triple-Barrier Method</strong> to label data based on volatility.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center font-bold">1</div>
                        <div>
                          <span className="font-bold text-slate-900">Upper Barrier (Profit Take)</span>
                          <p className="text-sm text-slate-500">Dynamic threshold based on daily volatility (e.g., $2\sigma$).</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold">2</div>
                        <div>
                          <span className="font-bold text-slate-900">Lower Barrier (Stop Loss)</span>
                          <p className="text-sm text-slate-500">If price hits this first, label is -1. Models specific risk scenarios.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</div>
                        <div>
                          <span className="font-bold text-slate-900">Vertical Barrier (Time Limit)</span>
                          <p className="text-sm text-slate-500">If neither price barrier is hit by time $T$, the label is 0 (or sign of return).</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-center">
                    <div className="relative w-full h-64 border-l border-b border-slate-400 p-4">
                      {/* Barriers */}
                      <div className="absolute top-10 left-0 right-0 border-t-2 border-dashed border-green-400 text-xs text-green-600 text-right pr-2">Profit Take (+2σ)</div>
                      <div className="absolute bottom-10 left-0 right-0 border-t-2 border-dashed border-red-400 text-xs text-red-600 text-right pr-2">Stop Loss (-2σ)</div>
                      <div className="absolute top-0 bottom-0 right-10 border-r-2 border-dashed border-blue-400 text-xs text-blue-600 text-right pr-2 pt-2">Time Barrier</div>
                      {/* Fake Price Path */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path d="M 0 128 Q 50 100, 100 140 T 200 110 T 300 80" fill="none" stroke="#6366f1" strokeWidth="3" />
                        <circle cx="300" cy="80" r="4" fill="#6366f1" />
                        <text x="310" y="80" className="text-xs fill-slate-500">Touch!</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 3: Loss Functions */}
            {activeModelTab === 'loss' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Beyond MSE: Custom Utility</h3>
                    <p className="text-slate-600 mb-4">
                      Standard Loss functions (MSE, LogLoss) optimize for accuracy, but we care about risk-adjusted returns (Sharpe). We implement differentiable versions of financial metrics directly into the neural network's backpropagation.
                    </p>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                      <h4 className="font-bold text-yellow-800 mb-1">Differentiable Sharpe Ratio</h4>
                      <p className="text-sm text-yellow-900 opacity-80">
                        We treat the output of the neural net as position weights, calculate the Sharpe ratio of that portfolio batch, and negate it as the Loss.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CodeBlock 
                      label="custom_loss.py" 
                      code={`def sharpe_loss(y_true, y_pred):
    # y_pred are the weights (positions)
    # y_true are the realized returns
    portfolio_rets = tf.reduce_sum(y_pred * y_true, axis=1)
    expected_ret = tf.reduce_mean(portfolio_rets)
    volatility = tf.math.reduce_std(portfolio_rets)
    
    # Add epsilon for numerical stability
    sharpe = expected_ret / (volatility + 1e-6)
    return -sharpe  # Minimize negative Sharpe`} 
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 4: Ensemble */}
            {activeModelTab === 'ensemble' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Meta-Labeling (The Sizing Model)</h3>
                    <p className="text-slate-600 mb-6">
                      One model predicts the <strong>Side</strong> (Long/Short), while a secondary model predicts the <strong>Probability of Success</strong> (Bet Size).
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg shadow-sm">
                        <div className="bg-slate-100 p-2 rounded font-bold text-slate-600">Primary Model</div>
                        <ArrowRight className="text-slate-400" size={16} />
                        <div className="text-sm">High Recall, Low Precision. "This looks like a buy."</div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg shadow-sm bg-indigo-50 border-indigo-100">
                        <div className="bg-indigo-100 p-2 rounded font-bold text-indigo-600">Meta Model</div>
                        <ArrowRight className="text-indigo-400" size={16} />
                        <div className="text-sm text-indigo-900">Filters false positives. "Is the Primary Model correct?"</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-xl text-center text-white">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-4">Ensemble Logic</h4>
                    <div className="font-mono text-sm space-y-2">
                      <div className="opacity-50">side = primary_model.predict(X)</div>
                      <div className="opacity-50">prob = meta_model.predict(X_meta)</div>
                      <div className="text-green-400 font-bold pt-4 border-t border-slate-700 mt-4">final_position = side * prob * volatility_scaler</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Microscope size={14} /> Research Environment v4.1
            </div>
            <div>Auto-ML Status: <span className="text-green-600 font-bold">ACTIVE</span></div>
          </div>
        </div>
      </section>

      {/* IV. The Backtesting Engine */}
      <section id="backtesting">
        <SectionHeader 
          icon={Workflow} 
          title="IV. Backtesting & Simulation" 
          subtitle="The Time Machine: From Vectorized Prototypes to Event-Driven Reality."
          colorClass="bg-amber-600" 
        />
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12">
          {/* Backtest Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 overflow-x-auto">
            <TabButton 
              active={activeBacktestTab === 'engine'} 
              label="Event-Driven Engine" 
              icon={RefreshCw} 
              onClick={() => setActiveBacktestTab('engine')} 
              color="amber" 
            />
            <TabButton 
              active={activeBacktestTab === 'costs'} 
              label="Transaction Costs" 
              icon={Scale} 
              onClick={() => setActiveBacktestTab('costs')} 
              color="amber" 
            />
            <TabButton 
              active={activeBacktestTab === 'bias'} 
              label="Bias Detector" 
              icon={FileWarning} 
              onClick={() => setActiveBacktestTab('bias')} 
              color="amber" 
            />
            <TabButton 
              active={activeBacktestTab === 'metrics'} 
              label="Advanced Metrics" 
              icon={PieChart} 
              onClick={() => setActiveBacktestTab('metrics')} 
              color="amber" 
            />
          </div>
          <div className="p-8 min-h-[500px]">
            {/* Tab 1: Event Driven Engine */}
            {activeBacktestTab === 'engine' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">Vectorized vs. Event-Driven</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Retail backtests often use "Vectorized" calculations (pandas), which are fast but prone to look-ahead bias. Professional backtests use an <strong>Event-Driven</strong> loop that processes data one tick at a time, exactly mimicking the live execution environment.
                    </p>
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="min-w-[40px] h-10 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800">!</div>
                      <div className="text-sm text-amber-900">
                        <strong>The Cardinal Rule:</strong> Your backtester code should be identical to your live trading code. They should share the same `Strategy` and `ExecutionHandler` classes.
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-700 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-amber-400 text-sm font-bold">engine_core.py</span>
                      <span className="text-xs text-slate-500">Event Loop</span>
                    </div>
                    <div className="font-mono text-xs space-y-2">
                      <div className="text-purple-400">while True:</div>
                      <div className="pl-4 text-slate-300">if events_queue.empty(): break</div>
                      <div className="pl-4 text-blue-300">event = events_queue.get()</div>
                      <div className="pl-4"></div>
                      <div className="pl-4 text-slate-300">if event.type == 'MARKET':</div>
                      <div className="pl-8 text-green-300">strategy.calculate_signal(event)</div>
                      <div className="pl-4 text-slate-300">elif event.type == 'ORDER':</div>
                      <div className="pl-8 text-green-300">risk_system.check(event)</div>
                      <div className="pl-8 text-green-300">broker.execute_order(event)</div>
                      <div className="pl-4 text-slate-300">elif event.type == 'FILL':</div>
                      <div className="pl-8 text-green-300">portfolio.update_positions(event)</div>
                    </div>
                  </div>
                </div>
                {/* Flow Diagram */}
                <div className="mt-12 flex justify-between items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                      <Database size={20}/>
                    </div>
                    Data
                  </div>
                  <ArrowRight size={20} className="text-slate-300"/>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Brain size={20}/>
                    </div>
                    Strategy
                  </div>
                  <ArrowRight size={20} className="text-slate-300"/>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <ShieldCheck size={20}/>
                    </div>
                    Risk
                  </div>
                  <ArrowRight size={20} className="text-slate-300"/>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Zap size={20}/>
                    </div>
                    Execution
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 2: Transaction Costs */}
            {activeBacktestTab === 'costs' && (
              <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Implementation Shortfall</h3>
                  <p className="text-slate-600 mb-6">
                    The difference between "Paper Returns" and "Live Returns" is cost. We model this using the <strong>Square-Root Law</strong> of market impact.
                  </p>
                  <ul className="space-y-4">
                    <li className="p-4 border border-slate-100 rounded-lg shadow-sm">
                      <span className="block font-bold text-slate-700">1. Spread Cost</span>
                      <span className="text-sm text-slate-500">Paying the bid-ask spread to cross the line. Constant cost.</span>
                    </li>
                    <li className="p-4 border border-slate-100 rounded-lg shadow-sm bg-amber-50 border-amber-100">
                      <span className="block font-bold text-amber-900">2. Market Impact (Slippage)</span>
                      <span className="text-sm text-amber-800">Your trade moves the price against you. Proportional to {"$\\sigma \\cdot \\sqrt{\\frac{OrderSize}{DailyVolume}}$"}.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-8 bg-slate-900 rounded-2xl text-center">
                  <div className="text-slate-400 text-xs uppercase tracking-widest mb-4">Total Cost Formula</div>
                  <div className="text-2xl text-white font-mono mb-6">{"$Cost = \\frac{s}{2} + \\sigma \\cdot 0.1 \\cdot \\left(\\frac{Q}{V}\\right)^{0.5}$"}</div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 font-mono">
                    <div>s = Spread</div>
                    <div>σ = Volatility</div>
                    <div>Q/V = % of Vol</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 3: Bias Detector */}
            {activeBacktestTab === 'bias' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">The 7 Sins of Simulation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DetailCard 
                    title="Survivorship Bias"
                    icon={AlertCircle}
                    color="red"
                    items={[
                      "Problem: Testing only on stocks that exist today.",
                      "Reality: Failed companies (Enron, Lehman) are missing.",
                      "Fix: Use 'Delisted' datasets."
                    ]}
                  />
                  <DetailCard 
                    title="Look-Ahead Bias"
                    icon={Search}
                    color="red"
                    items={[
                      "Problem: Using data not available at the time of trade.",
                      "Example: Trading at Open using the day's High.",
                      "Fix: Lag all data by 1 tick or 1 day."
                    ]}
                  />
                  <DetailCard 
                    title="Restatement Bias"
                    icon={RefreshCw}
                    color="red"
                    items={[
                      "Problem: Using current Macro data (GDP) for past dates.",
                      "Reality: GDP is revised months later.",
                      "Fix: Point-in-Time (PIT) databases."
                    ]}
                  />
                </div>
              </div>
            )}
            
            {/* Tab 4: Advanced Metrics */}
            {activeBacktestTab === 'metrics' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">Beyond the Sharpe Ratio</h3>
                    <p className="text-slate-600">
                      Standard Sharpe Ratios are easily gamed by "p-hacking" (running 1000 backtests and picking the lucky one). We use <strong>Deflated Sharpe Ratio (DSR)</strong> to adjust for the number of trials.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <span className="block text-xs text-slate-500 uppercase font-bold">Sortino Ratio</span>
                        <span className="text-lg font-bold text-slate-700">Downside Vol Only</span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <span className="block text-xs text-slate-500 uppercase font-bold">Calmar Ratio</span>
                        <span className="text-lg font-bold text-slate-700">Return / MaxDD</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4">Probabilistic Sharpe Ratio (PSR)</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>Calculates the probability that the True Sharpe is greater than 0, given the skewness and kurtosis of the returns.</p>
                      <div className="mt-4 p-3 bg-green-50 text-green-800 rounded text-center font-bold">Target: PSR {'>'} 95%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* V. Portfolio Optimizer */}
      <section id="optimizer">
        <SectionHeader 
          icon={BarChart3} 
          title="V. Risk & Convex Optimization" 
          subtitle="The Final Step: Turning Alpha into a Portfolio."
          colorClass="bg-rose-600" 
        />
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12">
          {/* Optimization Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 overflow-x-auto">
            <TabButton 
              active={activeRiskTab === 'solver'} 
              label="The Solver" 
              icon={Calculator} 
              onClick={() => setActiveRiskTab('solver')} 
              color="rose" 
            />
            <TabButton 
              active={activeRiskTab === 'factors'} 
              label="Factor Models" 
              icon={LayoutGrid} 
              onClick={() => setActiveRiskTab('factors')} 
              color="rose" 
            />
            <TabButton 
              active={activeRiskTab === 'constraints'} 
              label="Constraints" 
              icon={Sliders} 
              onClick={() => setActiveRiskTab('constraints')} 
              color="rose" 
            />
            <TabButton 
              active={activeRiskTab === 'tail'} 
              label="Tail Risk" 
              icon={TrendingDown} 
              onClick={() => setActiveRiskTab('tail')} 
              color="rose" 
            />
          </div>
          <div className="p-8 min-h-[500px]">
            {/* Tab 1: The Solver */}
            {activeRiskTab === 'solver' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">Convex Optimization (MVO)</h3>
                    <p className="text-slate-600">
                      We don't pick stocks; we pick weights. The optimizer solves for the optimal weights $w$ that maximize expected return minus a risk penalty, subject to constraints.
                    </p>
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                      <h4 className="font-bold text-rose-900 mb-2">The Objective Function</h4>
                      <div className="text-lg font-mono text-rose-800 mb-2">{"Maximize: $\\mu^T w - \\lambda w^T \\Sigma w$"}</div>
                      <ul className="text-xs text-rose-700 space-y-1 font-mono">
                        <li>{"$\\mu$"} = Expected Returns (Alpha)</li>
                        <li>{"$\\Sigma$"} = Covariance Matrix (Risk)</li>
                        <li>{"$\\lambda$"} = Risk Aversion Parameter</li>
                      </ul>
                    </div>
                    <p className="text-sm text-slate-500 italic">*Because the problem is Convex, we are guaranteed to find the global maximum efficiently.</p>
                  </div>
                  <div className="flex-1">
                    <CodeBlock 
                      label="portfolio_opt.py" 
                      code={`import cvxpy as cp

# 1. Variables
w = cp.Variable(n_assets)

# 2. Risk Model (Factor)
# Sigma = B*Cov_f*B.T + D
risk = cp.quad_form(w, Sigma)

# 3. Objective (Utility)
# Maximize Alpha - Risk - TransactionCosts
objective = cp.Maximize(mu @ w - gamma * risk)

# 4. Constraints
constraints = [
    cp.sum(w) == 0,     # Dollar Neutral
    cp.sum(cp.abs(w)) <= 2.0, # 2x Leverage
    w <= 0.05,          # Max Pos Size
    w >= -0.05
]

# 5. Solve
prob = cp.Problem(objective, constraints)
prob.solve(solver=cp.ECOS)`} 
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 2: Factor Models */}
            {activeRiskTab === 'factors' && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">The Curse of Dimensionality</h3>
                    <p className="text-slate-600 mb-6">
                      For 2,000 stocks, a full covariance matrix has 2 million entries ($N^2/2$). We don't have enough data to estimate this. Instead, we use a <strong>Factor Model</strong>.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
                      <div className="text-center font-mono text-lg text-slate-800 mb-2">{"$r_i = \\beta_i F + \\epsilon_i$"}</div>
                      <p className="text-center text-xs text-slate-500">Stock Return = (Exposure × Factor Return) + Specific Return</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <TechBadge color="rose">Market</TechBadge>
                      <TechBadge color="rose">Momentum</TechBadge>
                      <TechBadge color="rose">Value</TechBadge>
                      <TechBadge color="rose">Size</TechBadge>
                      <TechBadge color="rose">Volatility</TechBadge>
                      <TechBadge color="rose">Sector</TechBadge>
                    </div>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h4 className="font-bold text-slate-800 mb-4 text-center">Risk Decomposition</h4>
                    <div className="relative h-48 w-full flex items-end gap-2 justify-center px-8">
                      <div className="w-1/3 bg-rose-400 rounded-t-lg relative group h-[80%] flex items-end justify-center">
                        <span className="text-white font-bold text-xs mb-2">Systematic</span>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-t-lg"/>
                      </div>
                      <div className="w-1/3 bg-indigo-400 rounded-t-lg relative group h-[20%] flex items-end justify-center">
                        <span className="text-white font-bold text-xs mb-2">Idiosyncratic</span>
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-t-lg"/>
                      </div>
                    </div>
                    <div className="text-center text-xs text-slate-500 mt-4">
                      We hedge the <span className="text-rose-600 font-bold">Pink</span> to keep the <span className="text-indigo-600 font-bold">Blue</span> (Pure Alpha).
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tab 3: Constraints */}
            {activeRiskTab === 'constraints' && (
              <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailCard 
                  title="Leverage Limits"
                  icon={Scale}
                  color="orange"
                  items={[
                    "Gross Leverage: Sum of absolute weights.",
                    "Typical Limit: 2.0x to 4.0x NAV.",
                    "Reason: Limits blowout risk during crashes."
                  ]}
                />
                <DetailCard 
                  title="Turnover Constraint"
                  icon={RefreshCw}
                  color="orange"
                  items={[
                    "Limit: |w_new - w_old| < X%",
                    "Reason: Transaction costs will eat 100% of Alpha if not constrained.",
                    "Trade-off: Speed vs Cost."
                  ]}
                />
                <DetailCard 
                  title="Neutrality"
                  icon={Anchor}
                  color="orange"
                  items={[
                    "Dollar Neutral: Longs = Shorts.",
                    "Beta Neutral: Zero correlation to S&P 500.",
                    "Sector Neutral: No betting on 'Tech' vs 'Energy'."
                  ]}
                />
              </div>
            )}
            
            {/* Tab 4: Tail Risk */}
            {activeRiskTab === 'tail' && (
              <div className="animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-800">VaR vs. CVaR</h3>
                    <p className="text-slate-600">We optimize for the "average day," but we survive based on the "worst day."</p>
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-slate-300 pl-4">
                        <span className="block font-bold text-slate-700">Value at Risk (VaR 95%)</span>
                        <span className="text-sm text-slate-500">"We are 95% sure we won't lose more than $1M." (Ignores how bad the other 5% is).</span>
                      </div>
                      <div className="p-4 border-l-4 border-rose-500 pl-4 bg-rose-50">
                        <span className="block font-bold text-rose-900">Expected Shortfall (CVaR)</span>
                        <span className="text-sm text-rose-800">"If things go bad (the 5%), we expect to lose $5M." (The average of the tail).</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-bold">*Pro Tip: CVaR is convex, so it can be added to the optimizer!</p>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200">
                    {/* CSS Chart for Normal Dist vs Fat Tail */}
                    <div className="relative h-40 w-full flex items-end justify-center">
                      <div className="w-2 bg-slate-200 h-full mx-auto relative z-10"/> {/* Mean */}
                      {/* Simplified Bell Curve Shape via CSS Clip paths or SVGs is hard, using simple bars */}
                      <div className="absolute bottom-0 w-full h-full flex items-end justify-between gap-1 opacity-50">
                        {[1,2,5,10,25,50,80,95,100,95,80,50,25,10,5,2,1].map((h, i) => (
                          <div key={i} className={`w-full bg-indigo-500 rounded-t-sm`} style={{height: `${h}%`}} />
                        ))}
                      </div>
                      <div className="absolute bottom-0 left-0 w-[15%] h-[30%] bg-rose-500 opacity-80 animate-pulse rounded-t-sm" title="Tail Risk" />
                      <div className="absolute top-2 left-2 text-xs font-bold text-rose-600">Fat Tail Zone</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </ArticleFrame>
  );
}