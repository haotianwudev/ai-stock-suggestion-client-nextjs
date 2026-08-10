'use client';

import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, BarController, PointElement, LineElement, ScatterController, BubbleController, Title, Tooltip, Legend, ArcElement, DoughnutController } from 'chart.js';
import { ArticleFrame } from '@/components/articles/article-frame';

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, PointElement, LineElement, ScatterController, BubbleController, Title, Tooltip, Legend, ArcElement, DoughnutController);

// Data from the Report
const stablecoinTypesData = {
    'fiat': {
        id: 'fiat',
        name: 'Fiat-Collateralized',
        examples: 'USDT, USDC, PYUSD',
        backing: 'Backed 1:1 by reserves of fiat currency (e.g., USD) and highly liquid assets (e.g., U.S. T-bills) held by a central issuer.',
        centralization: 9,
        risk: 3,
        riskProfile: 'Lower Risk. Risks include issuer insolvency, mismanagement of reserves, and lack of transparency. Not FDIC insured.'
    },
    'commodity': {
        id: 'commodity',
        name: 'Commodity-Collateralized',
        examples: 'PAXG, XAUT',
        backing: 'Backed by reserves of physical commodities, most commonly gold, held in audited vaults.',
        centralization: 8,
        risk: 5,
        riskProfile: 'Lower to Moderate Risk. Value is subject to the price volatility of the underlying commodity. Also includes issuer and custodian risk.'
    },
    'crypto': {
        id: 'crypto',
        name: 'Crypto-Collateralized',
        examples: 'DAI, sUSD',
        backing: 'Backed by an over-collateralized basket of other cryptocurrencies held on-chain and managed by smart contracts.',
        centralization: 3,
        risk: 8,
        riskProfile: 'High Risk. Risks include smart contract vulnerabilities, volatility of underlying crypto collateral, and liquidation events.'
    },
    'algorithmic': {
        id: 'algorithmic',
        name: 'Algorithmic',
        examples: 'UST (collapsed), AMPL',
        backing: 'Not backed by collateral. Uses algorithms to dynamically manage token supply to maintain a price peg.',
        centralization: 2,
        risk: 10,
        riskProfile: 'Extreme Risk. Prone to "death spirals" and catastrophic failure due to reliance on fragile economic incentives. Largely discredited model.'
    }
};

const yieldData = {
    cefi: [
        { name: 'Ledn (USDC)', apy: 8.5, type: 'CeFi' },
        { name: 'Nexo (USDT)', apy: 16.0, type: 'CeFi' },
        { name: 'Kraken (USDC)', apy: 5.5, type: 'CeFi' },
        { name: 'Coinbase (USDC)', apy: 4.1, type: 'CeFi' },
    ],
    defi: [
        { name: 'Aave (DAI)', apy: 11.6, type: 'DeFi' },
        { name: 'Compound (USDC)', apy: 7.2, type: 'DeFi' },
        { name: 'Curve (Stable Pool)', apy: 2.0, type: 'DeFi' },
        { name: 'Uniswap (Stable Pool)', apy: 1.5, type: 'DeFi' },
    ],
    tradfi: [
        { name: 'High-Yield Savings', apy: 4.66, type: 'TradFi' },
        { name: 'Certificate of Deposit', apy: 4.60, type: 'TradFi' },
        { name: 'Money Market Fund', apy: 4.22, type: 'TradFi' },
    ]
};

const riskEvents = [
    { date: 'Mar 2022', asset: 'Ronin Network', type: 'Hack / Exploit', loss: '$625 Million', cause: 'Breach of the bridge supporting the Axie Infinity game; stolen funds included USDC.' },
    { date: 'May 2022', asset: 'TerraUSD (UST)', type: 'De-Peg / Collapse', loss: '$45 Billion', cause: 'Algorithmic "death spiral" triggered by panic withdrawals from Anchor Protocol.' },
    { date: 'Feb 2023', asset: 'Binance USD (BUSD)', type: 'Regulatory Action', loss: 'Wind-down', cause: 'Issuer (Paxos) was ordered by regulators to halt all new minting of the token.' },
    { date: 'Mar 2023', asset: 'USD Coin (USDC)', type: 'De-Peg Event', loss: 'Drop to $0.88', cause: 'Issuer (Circle) revealed $3.3B in reserves were held at the collapsing Silicon Valley Bank.' },
    { date: 'Mar 2023', asset: 'Euler Finance', type: 'Hack / Exploit', loss: '$197 Million', cause: 'Flash loan attack exploited a vulnerability in the lending protocol, draining funds including DAI and USDC.' },
    { date: 'Jul 2023', asset: 'Curve Finance', type: 'Hack / Exploit', loss: 'Millions at risk', cause: 'A vulnerability in the Vyper programming language used by some liquidity pools was exploited.' },
    { date: 'Jan 2024', asset: 'TrueUSD (TUSD)', type: 'De-Peg Event', loss: 'Drop to $0.926', cause: 'Market concerns regarding the transparency and security of its reserve attestations.' },
    { date: 'Jul 2025', asset: 'Arcadia Finance', type: 'Hack / Exploit', loss: '$3.5 Million', cause: 'A vulnerability in the protocol\'s "Rebalancer contract" was exploited to drain USDC and USDS.' },
];

const riskReturnData = [
    { label: 'High-Yield Savings', risk: 1, return: 4.66, insurance: 'FDIC Insured' },
    { label: 'Certificate of Deposit', risk: 1, return: 4.60, insurance: 'FDIC Insured' },
    { label: 'Money Market Fund', risk: 2, return: 4.22, insurance: 'SIPC Protected (not insured)' },
    { label: 'CeFi Lending', risk: 7, return: 8.0, insurance: 'Uninsured' },
    { label: 'DeFi Lending', risk: 8, return: 11.0, insurance: 'Uninsured' },
    { label: 'DeFi Yield Farming', risk: 9, return: 15.0, insurance: 'Uninsured' },
];

const regulationData = [
    {
        icon: '🔒',
        title: '1:1 Reserve Mandate',
        text: 'Issuers must back tokens 1-to-1 with cash or short-term U.S. treasuries. Risky assets and algorithmic models are prohibited.'
    },
    {
        icon: '🧾',
        title: 'Mandatory Audits',
        text: 'Issuers must publish monthly, audited reports on their reserves, certified by senior executives.'
    },
    {
        icon: '🚫',
        title: 'No Interest Payments',
        text: 'The Act prohibits issuers from paying interest. Yield must be earned on 3rd-party platforms, separating the asset from the risk activity.'
    },
    {
        icon: '🏦',
        title: 'Permitted Issuers Only',
        text: 'Only federally-insured banks or entities with a special charter from the OCC or qualified state regulator can issue stablecoins.'
    }
];

const checklistData = {
    asset: [
        'Is the issuer compliant with the GENIUS Act or equivalent (e.g., MiCA)?',
        'Does the issuer publish monthly, independently audited reserve reports?',
        'Are reserves composed only of cash and short-term government securities?',
        'Has the stablecoin maintained its peg during past market stress events?',
    ],
    platform: [
        '(CeFi) What is the platform\'s reputation, history, and regulatory jurisdiction?',
        '(CeFi) Does the platform provide its own proof-of-reserves?',
        '(DeFi) Has the protocol been audited by multiple reputable security firms?',
        '(DeFi) How long has the protocol operated without a major exploit (Lindy effect)?',
        '(DeFi) Do I fully understand the risk of impermanent loss for this specific strategy?',
    ]
};

// Helper Components
const NavItem = ({ section, activeSection, setActiveSection, children, icon }) => (
    <button
        onClick={() => setActiveSection(section)}
        className={`flex items-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${activeSection === section
                ? 'bg-slate-800 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0A0D14] hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
            }`}
    >
        <span className="mr-2 text-lg">{icon}</span>
        {children}
    </button>
);

const SectionCard = ({ children, className = '', ...props }) => (
    <div className={`bg-white dark:bg-[#0A0D14] rounded-xl shadow-md p-6 md:p-8 ${className}`} {...props}>
        {children}
    </div>
);

const SectionTitle = ({ children }) => (
    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2 font-serif">{children}</h2>
);

const SectionSubtitle = ({ children }) => (
    <p className="text-slate-500 mb-8 max-w-3xl">{children}</p>
);

const Modal = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-2xl max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-[#BC4128] dark:text-[#E2694A] font-serif">{event.asset}</h3>
                        <p className="text-sm text-slate-500 font-medium">{event.date} - {event.type}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 text-2xl">&times;</button>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="font-bold text-slate-700 dark:text-slate-300">Approximate Loss:</p>
                        <p className="text-lg text-slate-900 dark:text-slate-100">{event.loss}</p>
                    </div>
                    <div>
                        <p className="font-bold text-slate-700 dark:text-slate-300">Cause of Event:</p>
                        <p className="text-slate-600 dark:text-slate-400">{event.cause}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Chart Components
const TypesChart = ({ selectedType }) => {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartInstanceRef.current = new ChartJS(ctx, {
            type: 'bubble',
            data: {
                datasets: Object.values(stablecoinTypesData).map(type => ({
                    label: type.name,
                    data: [{ x: type.centralization, y: type.risk }],
                    backgroundColor: type.id === selectedType ? 'rgba(59, 130, 246, 0.8)' : 'rgba(107, 114, 128, 0.5)',
                    borderColor: type.id === selectedType ? 'rgba(59, 130, 246, 1)' : 'rgba(107, 114, 128, 0.8)',
                    borderWidth: 2,
                    radius: type.id === selectedType ? 15 : 8,
                    hoverRadius: type.id === selectedType ? 18 : 12,
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 400, easing: 'easeInOutCubic' },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (context) => context.dataset.label } },
                    title: { display: true, text: 'Centralization vs. Inherent Risk', font: { size: 16, family: 'Inter' }, color: '#334155' }
                },
                scales: {
                    x: { min: 0, max: 10, title: { display: true, text: 'Decentralization → Centralization', color: '#475569' } },
                    y: { min: 0, max: 11, title: { display: true, text: 'Low Risk → Extreme Risk', color: '#475569' } }
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [selectedType]);

    return (
        <div className="chart-container relative h-80 md:h-96 w-full max-w-2xl mx-auto">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

const YieldChart = ({ view }) => {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const datasets = {
            crypto: [
                ...yieldData.cefi.map(d => ({ ...d, color: 'rgba(59, 130, 246, 0.7)' })),
                ...yieldData.defi.map(d => ({ ...d, color: 'rgba(16, 185, 129, 0.7)' }))
            ],
            comparison: [
                { name: 'CeFi Lending (Avg)', apy: 8.5, color: 'rgba(59, 130, 246, 0.7)' },
                { name: 'DeFi Lending (Avg)', apy: 11.6, color: 'rgba(16, 185, 129, 0.7)' },
                { name: 'High-Yield Savings', apy: 4.66, color: 'rgba(239, 68, 68, 0.7)' },
            ]
        };

        const currentData = view === 'crypto' ? datasets.crypto : datasets.comparison;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartInstanceRef.current = new ChartJS(ctx, {
            type: 'bar',
            data: {
                labels: currentData.map(d => d.name),
                datasets: [{
                    label: 'Reported APY (%)',
                    data: currentData.map(d => d.apy),
                    backgroundColor: currentData.map(d => d.color),
                    borderColor: currentData.map(d => d.color.replace('0.7', '1')),
                    borderWidth: 1,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: view === 'crypto' ? 'CeFi vs. DeFi APYs (July 2025)' : 'Crypto Yields vs. Traditional Savings',
                        font: { size: 16, family: 'Inter' },
                        color: '#334155'
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Annual Percentage Yield (APY %)', color: '#475569' },
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [view]);

    return (
        <div className="chart-container relative h-96 w-full max-w-4xl mx-auto">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

const RiskReturnChart = () => {
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartInstanceRef.current = new ChartJS(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Risk vs. Return',
                    data: riskReturnData.map(d => ({ x: d.risk, y: d.return })),
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: 'rgba(220, 38, 38, 1)',
                    pointRadius: 10,
                    pointHoverRadius: 12,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const item = riskReturnData[context.dataIndex];
                                return `${item.label}: ${item.return}% APY (${item.insurance})`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Risk vs. Return Spectrum',
                        font: { size: 16, family: 'Inter' },
                        color: '#334155'
                    }
                },
                scales: {
                    x: { min: 0, max: 10, title: { display: true, text: 'Risk of Principal Loss (Qualitative)', color: '#475569' } },
                    y: { min: 0, title: { display: true, text: 'Potential Return (APY %)', color: '#475569' } }
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-container relative h-80 md:h-96 w-full max-w-2xl mx-auto">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

// Main Section Components
const WelcomeSection = ({ setActiveSection }) => (
    <div>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mb-8">
            An interactive analysis of profiting from digital dollars, understanding the inherent risks, and navigating the new era of regulation.
            This guide translates a comprehensive report into an explorable experience.
        </p>
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] text-blue-800 p-4 rounded-r-lg mb-8">
            <p>
                <strong className="font-bold">Core Concept:</strong> Stablecoins are digital assets designed to maintain a stable value by pegging to a reference asset, like the U.S. dollar. They bridge traditional finance and the digital world.
            </p>
        </div>
        <button
            onClick={() => setActiveSection('types')}
            className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-transform transform hover:scale-105"
        >
            Start Exploring: Types of Stablecoins &rarr;
        </button>
    </div>
);

const TypesSection = () => {
    const [selectedType, setSelectedType] = useState('fiat');
    const type = stablecoinTypesData[selectedType];

    return (
        <div>
            <SectionTitle>A Taxonomy of Stablecoins</SectionTitle>
            <SectionSubtitle>
                Understand the different engines of stability. The mechanism used to maintain the price peg is the most critical differentiator and directly determines an asset&apos;s risk profile.
            </SectionSubtitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                    {Object.values(stablecoinTypesData).map(t => (
                        <button
                            key={t.id}
                            onClick={() => setSelectedType(t.id)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${selectedType === t.id
                                    ? 'border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 shadow-lg scale-105'
                                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0D14] hover:border-[#A8672E] dark:border-[#D08F52] hover:shadow-md'
                                }`}
                        >
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 font-serif">{t.name}</h3>
                            <p className="text-sm text-slate-500">Examples: {t.examples}</p>
                        </button>
                    ))}
                </div>

                <SectionCard key={selectedType} className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 font-serif">{type.name}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Backing Mechanism:</h4>
                            <p className="text-slate-600 dark:text-slate-400">{type.backing}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Inherent Risk Profile:</h4>
                            <p className="text-slate-600 dark:text-slate-400">{type.riskProfile}</p>
                        </div>
                    </div>
                </SectionCard>
            </div>

            <div className="mt-12">
                <TypesChart selectedType={selectedType} />
            </div>
        </div>
    );
};

const ProfitSection = () => {
    const [view, setView] = useState('crypto');

    return (
        <div>
            <SectionTitle>The Investor&apos;s Playbook</SectionTitle>
            <SectionSubtitle>
                Profit from stablecoins is not from appreciation (they are designed to be stable), but from earning yield.
                This yield is compensation for the risks you take on external platforms.
            </SectionSubtitle>

            <div className="flex justify-center mb-8 space-x-2 bg-slate-200 p-1 rounded-lg">
                <button
                    onClick={() => setView('crypto')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${view === 'crypto' ? 'bg-white dark:bg-[#0A0D14] text-slate-800 dark:text-slate-200 shadow' : 'text-slate-600 dark:text-slate-400'
                        }`}
                >
                    CeFi vs. DeFi
                </button>
                <button
                    onClick={() => setView('comparison')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${view === 'comparison' ? 'bg-white dark:bg-[#0A0D14] text-slate-800 dark:text-slate-200 shadow' : 'text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Crypto vs. TradFi
                </button>
            </div>

            <SectionCard>
                <YieldChart view={view} />
                <div className="mt-4 text-center text-sm text-slate-500">
                    {view === 'crypto'
                        ? 'CeFi platforms (blue) offer user-friendliness but have counterparty risk. DeFi platforms (green) offer transparency but have smart contract risk.'
                        : 'The yield spread between crypto and traditional savings may not justify the massive leap in risk and lack of FDIC insurance.'
                    }
                </div>
            </SectionCard>
        </div>
    );
};

const RiskSection = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showUstCaseStudy, setShowUstCaseStudy] = useState(false);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setModalOpen(true);
    };

    return (
        <div>
            <SectionTitle>A Sobering Reality of Risk</SectionTitle>
            <SectionSubtitle>
                The promise of stability can be fragile. The world of stablecoins is fraught with risks that have led to catastrophic losses.
                Unlike bank deposits, there is no FDIC insurance.
            </SectionSubtitle>

            <SectionCard className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 text-center font-serif">Historical De-Pegs & Hacks</h3>
                <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0">
                    {riskEvents.map((event, index) => (
                        <div key={index} className="mb-8 ml-8 cursor-pointer group" onClick={() => handleEventClick(event)}>
                            <div className="absolute -left-[11px] w-5 h-5 bg-slate-200 rounded-full border-4 border-white group-hover:bg-[#BC4128] dark:bg-[#E2694A] transition-colors"></div>
                            <p className="text-sm font-semibold text-[#BC4128] dark:text-[#E2694A]">{event.date}</p>
                            <h4 className="font-bold text-slate-700 dark:text-slate-300">{event.asset}</h4>
                            <p className="text-sm text-slate-500">{event.type} - <span className="font-medium">{event.loss}</span></p>
                        </div>
                    ))}
                </div>
            </SectionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SectionCard>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 text-center font-serif">Case Study: The Terra/UST Collapse</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        The most infamous failure, wiping out ~$45 billion and triggering a market-wide crisis.
                        It demonstrated the fatal flaws of algorithmic designs and unsustainable yields.
                    </p>
                    <button
                        onClick={() => setShowUstCaseStudy(!showUstCaseStudy)}
                        className="text-[#A8672E] dark:text-[#D08F52] font-semibold text-sm"
                    >
                        {showUstCaseStudy ? 'Show Less' : 'Read the Anatomy of the Collapse'}
                    </button>
                    {showUstCaseStudy && (
                        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            <p><strong className="text-slate-700 dark:text-slate-300">Flawed Mechanism:</strong> An algorithmic link to LUNA token was meant to maintain the peg. Selling UST forced hyper-inflation of LUNA, creating a &ldquo;death spiral.&rdquo;</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">Unsustainable Yield:</strong> The Anchor Protocol&apos;s artificial ~20% APY created massive, concentrated demand for UST, making the entire ecosystem a single point of failure.</p>
                            <p><strong className="text-slate-700 dark:text-slate-300">The Aftermath:</strong> Within a week, UST was worthless and LUNA&apos;s price fell to zero, destroying investor wealth and leading to the failure of major crypto firms.</p>
                        </div>
                    )}
                </SectionCard>

                <SectionCard>
                    <RiskReturnChart />
                </SectionCard>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} event={selectedEvent} />
        </div>
    );
};

const RegulationSection = () => (
    <div>
        <SectionTitle>The New Regulatory Paradigm</SectionTitle>
        <SectionSubtitle>
            In response to market failures, the U.S. passed the GENIUS Act in July 2025.
            This landmark law fundamentally reshapes the stablecoin landscape to protect consumers.
        </SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regulationData.map((item, index) => (
                <SectionCard key={index} className="flex items-start">
                    <div className="text-4xl mr-4 mt-1">{item.icon}</div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1 font-serif">{item.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{item.text}</p>
                    </div>
                </SectionCard>
            ))}
        </div>
    </div>
);

const ChecklistSection = () => {
    const CheckboxItem = ({ children }) => {
        const [checked, setChecked] = useState(false);

        return (
            <label className="flex items-start p-3 rounded-lg hover:bg-slate-50 dark:bg-[#14171B] transition-colors cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-[#A8672E] dark:text-[#D08F52] focus:ring-blue-500"
                />
                <span className={`ml-3 text-slate-700 dark:text-slate-300 ${checked ? 'line-through text-slate-400' : ''}`}>
                    {children}
                </span>
            </label>
        );
    };

    return (
        <div>
            <SectionTitle>Investor Due Diligence Checklist</SectionTitle>
            <SectionSubtitle>
                Use this framework to evaluate stablecoin opportunities. A disciplined, risk-first approach is essential.
            </SectionSubtitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SectionCard>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Evaluating the Stablecoin Asset</h3>
                    <div className="space-y-2">
                        {checklistData.asset.map((item, i) => <CheckboxItem key={i}>{item}</CheckboxItem>)}
                    </div>
                </SectionCard>

                <SectionCard>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Evaluating the Yield Platform</h3>
                    <div className="space-y-2">
                        {checklistData.platform.map((item, i) => <CheckboxItem key={i}>{item}</CheckboxItem>)}
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

// Main App Component
export default function StablecoinGuide() {
    const [activeSection, setActiveSection] = useState('welcome');

    const renderSection = () => {
        switch (activeSection) {
            case 'welcome':
                return <WelcomeSection setActiveSection={setActiveSection} />;
            case 'types':
                return <TypesSection />;
            case 'profit':
                return <ProfitSection />;
            case 'risk':
                return <RiskSection />;
            case 'regulation':
                return <RegulationSection />;
            case 'checklist':
                return <ChecklistSection />;
            default:
                return <WelcomeSection setActiveSection={setActiveSection} />;
        }
    };

    return (
        <ArticleFrame
            slug="investors-guide-stablecoins-profiting-digital-dollars"
            additionalDisclaimer="Stablecoin investments carry significant risks including total loss of principal."
        >
            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>

            <nav className="flex flex-wrap gap-2 mb-10">
                <NavItem section="welcome" activeSection={activeSection} setActiveSection={setActiveSection} icon="👋">
                    Welcome
                </NavItem>
                <NavItem section="types" activeSection={activeSection} setActiveSection={setActiveSection} icon="⚙️">
                    Types of Coins
                </NavItem>
                <NavItem section="profit" activeSection={activeSection} setActiveSection={setActiveSection} icon="📈">
                    Profit Playbook
                </NavItem>
                <NavItem section="risk" activeSection={activeSection} setActiveSection={setActiveSection} icon="⚠️">
                    Risk Analysis
                </NavItem>
                <NavItem section="regulation" activeSection={activeSection} setActiveSection={setActiveSection} icon="🏛️">
                    Regulation Hub
                </NavItem>
                <NavItem section="checklist" activeSection={activeSection} setActiveSection={setActiveSection} icon="✅">
                    Investor Checklist
                </NavItem>
            </nav>

            {renderSection()}
        </ArticleFrame>
    );
}
