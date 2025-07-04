'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- SVG Icon Components (replaces lucide-react) ---
const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const BarChart2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
const HardDriveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
);
const AlertTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

// Helper component for styled sections
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <section className={`py-12 md:py-20 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
            {children}
        </div>
    </section>
);

// Helper component for content cards
const ContentCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md ${className}`}>
        {children}
    </div>
);

// Helper component for headings
const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 tracking-tight">{children}</h2>;
const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4 tracking-tight">{children}</h3>;
const H4 = ({ children }: { children: React.ReactNode }) => <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-3">{children}</h4>;

// Helper for list items
const ListItem = ({ children }: { children: React.ReactNode }) => <li className="mb-3 pl-4 border-l-2 border-blue-500 text-gray-600">{children}</li>;

// Part 1: Foundational Principles
const Part1 = () => (
    <ContentCard>
        <H2>Part I: The Foundational Principles of Bitcoin</H2>
        <p className="text-lg text-gray-600 mb-6">This part establishes the conceptual groundwork, defining Bitcoin not just as a currency but as a revolutionary technological and economic system. It will differentiate Bitcoin from traditional finance by focusing on its core properties.</p>
        
        <H3>Section 1.1: Defining Bitcoin: More Than Digital Money</H3>
        <p className="mb-4 text-gray-700">At its most fundamental level, Bitcoin (BTC) is a form of digital money, a virtual token representing value that exists on its own peer-to-peer network. Launched in 2009 by a pseudonymous person or group known as Satoshi Nakamoto, Bitcoin was designed to facilitate secure, online transactions directly between users, circumventing the need for traditional financial intermediaries such as banks or credit card companies. This design allows any two people, anywhere in the world, to exchange value at any time without consulting or requiring permission from a third-party institution.</p>
        <p className="mb-4 text-gray-700">Bitcoin's uniqueness stems from several core properties that distinguish it from conventional, or "fiat," currencies like the U.S. dollar.</p>
        <ul className="space-y-3 text-gray-700 mb-4">
            <ListItem><strong className="text-gray-900">Decentralization:</strong> The Bitcoin network is not owned, operated, or controlled by any single entity. It is a distributed system maintained by a vast, voluntary network of computers, called nodes, spread across the globe.</ListItem>
            <ListItem><strong className="text-gray-900">Fixed, Predictable Supply:</strong> Bitcoin has a mathematically enforced, finite supply. The protocol dictates that there will never be more than 21 million bitcoins in existence.</ListItem>
            <ListItem><strong className="text-gray-900">A System Based on Consensus, Not Trust:</strong> The value of a bitcoin is not backed by a physical commodity or a government decree. The system is engineered to be "trustless," meaning participants do not need to trust each other or a central authority for the network to function securely.</ListItem>
        </ul>

        <H3>Section 1.2: The Blockchain: Bitcoin's Immutable Ledger</H3>
        <p className="mb-4 text-gray-700">The underlying technology that makes Bitcoin possible is the blockchain. It can be conceptualized as an advanced, specialized database that stores information in discrete units called "blocks," which are linked together in a permanent, chronological chain.</p>
        <p className="mb-4 text-gray-700">This unique architecture gives the Bitcoin blockchain its defining properties:</p>
         <ul className="space-y-3 text-gray-700">
            <ListItem><strong className="text-gray-900">Immutability:</strong> Once a transaction is confirmed and added to the blockchain, it is functionally permanent and cannot be altered or deleted.</ListItem>
            <ListItem><strong className="text-gray-900">Transparency:</strong> Every transaction ever executed on the network is publicly visible and auditable by anyone.</ListItem>
            <ListItem><strong className="text-gray-900">Decentralized Control:</strong> The ledger is not held in a central server or database. Instead, a complete copy is distributed and maintained across the thousands of nodes in the global network.</ListItem>
        </ul>
    </ContentCard>
);

// Part 2: Mechanics of the Network
const Part2 = () => (
    <ContentCard>
        <H2>Part II: The Mechanics of the Bitcoin Network</H2>
        <p className="text-lg text-gray-600 mb-6">This part provides a granular, step-by-step examination of how the Bitcoin network actually functions, from the creation of a single transaction to the large-scale process of mining that secures the entire system.</p>

        <H3>Section 2.1: The Lifecycle of a Bitcoin Transaction</H3>
        <p className="mb-4 text-gray-700">A Bitcoin transaction is a multi-stage process that begins with a user's intent to send value and ends with that value being permanently recorded on the blockchain. The lifecycle can be broken down into a series of distinct steps:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4">
            <ListItem><strong className="text-gray-900">Initiation and Creation:</strong> A user initiates a transaction using a wallet, specifying the recipient's address and the amount.</ListItem>
            <ListItem><strong className="text-gray-900">Signing with the Private Key:</strong> The user's wallet applies a digital signature using the owner's private key, proving ownership and integrity.</ListItem>
            <ListItem><strong className="text-gray-900">Broadcasting to the Network:</strong> The signed transaction is sent to the network, spreading rapidly among nodes.</ListItem>
            <ListItem><strong className="text-gray-900">Validation and the Memory Pool (Mempool):</strong> Nodes validate the transaction. If valid, it enters a temporary holding area called the mempool.</ListItem>
            <ListItem><strong className="text-gray-900">Mining and Confirmation:</strong> Miners select transactions from the mempool, include them in a new block, and add it to the blockchain.</ListItem>
            <ListItem><strong className="text-gray-900">Achieving Finality:</strong> Security increases with each subsequent block. Six confirmations (about one hour) is considered highly secure.</ListItem>
        </ol>

        <H3>Section 2.2: Proof-of-Work: Securing the Network Through Mining</H3>
        <p className="mb-4 text-gray-700">The process that validates transactions and secures the Bitcoin network is known as mining. The consensus mechanism is called Proof-of-Work (PoW).</p>
        <p className="mb-4 text-gray-700">PoW is a system that requires participants (miners) to expend a significant amount of computational effort to earn the right to add a new block to the blockchain. This involves solving a difficult cryptographic puzzle through brute force.</p>
        <p className="mb-4 text-gray-700">The system relies on powerful economic incentives:</p>
         <ul className="space-y-3 text-gray-700">
            <ListItem><strong className="text-gray-900">Block Reward:</strong> The successful miner is rewarded with newly created bitcoins.</ListItem>
            <ListItem><strong className="text-gray-900">Transaction Fees:</strong> The miner collects all transaction fees from the transactions included in their block.</ListItem>
        </ul>
    </ContentCard>
);

// Part 3: Transparency and Privacy
const Part3 = () => (
    <ContentCard>
        <H2>Part III: The Bitcoin Ledger: A Study in Transparency and Privacy</H2>
        <p className="text-lg text-gray-600 mb-6">This part dissects the unique information model of Bitcoin, explaining the cryptographic tools that enable it and the deliberate design choices behind what is public and what is private.</p>

        <H3>Section 3.1: Public-Key Cryptography</H3>
        <p className="mb-4 text-gray-700">Bitcoin's security is built on Public-Key Cryptography (PKC), which uses a pair of mathematically linked keys for each user:</p>
         <ul className="space-y-3 text-gray-700 mb-4">
            <ListItem><strong className="text-gray-900">The Private Key:</strong> A secret number that grants the ability to spend bitcoins. It must be kept absolutely secret. Losing it means losing your funds.</ListItem>
            <ListItem><strong className="text-gray-900">The Public Key:</strong> Derived from the private key, it is designed to be shared openly to receive funds. A Bitcoin address is a shorter, hashed version of the public key.</ListItem>
        </ul>

        <H3>Section 3.2: Public by Design: What the World Can See</H3>
        <p className="mb-4 text-gray-700">The Bitcoin blockchain is radically transparent. The following information is publicly accessible:</p>
        <ul className="space-y-3 text-gray-700 mb-4">
            <ListItem>Sending and receiving Bitcoin addresses.</ListItem>
            <ListItem>The exact amount of Bitcoin transferred.</ListItem>
            <ListItem>The timestamp of the block confirming the transaction.</ListItem>
        </ul>
        <p className="text-gray-700">This public auditability is what ensures the collective integrity of the ledger.</p>

        <H3>Section 3.3: Private by Convention: What Remains Hidden</H3>
        <p className="mb-4 text-gray-700">Bitcoin is pseudonymous, not anonymous. It disassociates transactions from real-world identities.</p>
        <p className="mb-4 text-gray-700">The following remains hidden from the blockchain:</p>
         <ul className="space-y-3 text-gray-700">
            <ListItem>Real-world identity (name, address, etc.).</ListItem>
            <ListItem>Private keys.</ListItem>
        </ul>
        <p className="text-gray-700">However, this pseudonymity is fragile. A user's privacy is compromised the moment their real-world identity is linked to one of their Bitcoin addresses, often through regulated exchanges (KYC).</p>
    </ContentCard>
);

// Part 4: Practical Guide
const Part4 = () => (
    <ContentCard>
        <H2>Part IV: A Practical Guide to Acquiring, Storing, and Trading Bitcoin</H2>
        <p className="text-lg text-gray-600 mb-6">This part transitions from theory to practice, providing a comprehensive guide for individuals looking to personally interact with the Bitcoin ecosystem.</p>

        <H3>Section 4.1: Choosing Your Bitcoin Wallet</H3>
        <p className="mb-4 text-gray-700">A wallet is a digital keychain that manages your keys. The key decision is custody:</p>
         <ul className="space-y-3 text-gray-700 mb-4">
            <ListItem><strong className="text-gray-900">Custodial Wallets (e.g., on Exchanges):</strong> A third party holds your keys. Convenient but you don't control your funds ("not your keys, not your coins").</ListItem>
            <ListItem><strong className="text-gray-900">Non-Custodial Wallets:</strong> You control your keys, granting you full sovereignty but also full responsibility.
                 <ul className="list-disc list-inside mt-2 pl-6 text-gray-600">
                     <li><strong className="text-blue-600">Hot Wallets (Online):</strong> Software wallets (desktop/mobile) connected to the internet. Convenient but less secure.</li>
                     <li><strong className="text-blue-600">Cold Wallets (Offline):</strong> Hardware or paper wallets. The most secure method for long-term storage.</li>
                 </ul>
            </ListItem>
        </ul>

        <H3>Section 4.2: Methods of Acquiring Bitcoin</H3>
         <ul className="space-y-3 text-gray-700 mb-4">
            <ListItem><strong className="text-gray-900">Centralized Exchanges (CEXs):</strong> The most common method. Requires identity verification (KYC).</ListItem>
            <ListItem><strong className="text-gray-900">Peer-to-Peer (P2P) Platforms:</strong> Direct trading between users, offering more privacy and payment options.</ListItem>
            <ListItem><strong className="text-gray-900">Bitcoin ATMs:</strong> Physical kiosks for buying Bitcoin with cash. Convenient but with very high fees.</ListItem>
        </ul>

        <H3>Section 4.3: Introduction to Bitcoin Trading</H3>
        <p className="mb-4 text-gray-700">Common trading strategies include:</p>
         <ul className="space-y-3 text-gray-700">
            <ListItem><strong className="text-gray-900">HODL (Buy and Hold):</strong> A long-term investment philosophy.</ListItem>
            <ListItem><strong className="text-gray-900">Day Trading:</strong> Short-term trades to capitalize on small price fluctuations.</ListItem>
            <ListItem><strong className="text-gray-900">Swing Trading:</strong> Capturing larger price movements over days or weeks.</ListItem>
        </ul>
    </ContentCard>
);

// Part 5: Risks and Security
const Part5 = () => (
    <ContentCard>
        <H2>Part V: Navigating the Risks and Mastering Security</H2>
        <p className="text-lg text-gray-600 mb-6">This final part is a critical guide to risk management and personal security. It aims to equip the reader with the knowledge to protect their assets in a high-stakes, often adversarial, environment.</p>

        <H3>Section 5.1: Understanding the Inherent Risks</H3>
         <ul className="space-y-3 text-gray-700 mb-4">
            <ListItem><strong className="text-gray-900">Market and Price Volatility:</strong> Bitcoin's value is subject to rapid and dramatic fluctuations.</ListItem>
            <ListItem><strong className="text-gray-900">Regulatory and Legal Risks:</strong> The legal framework is immature and constantly changing.</ListItem>
            <ListItem><strong className="text-gray-900">Security Risks:</strong> The ecosystem is a prime target for hacking, fraud, and theft.</ListItem>
            <ListItem><strong className="text-gray-900">Operational Risks:</strong> The loss of your private keys means the permanent loss of your funds.</ListItem>
            <ListItem><strong className="text-gray-900">Lack of Investor Protection:</strong> No equivalent to FDIC insurance for crypto holdings.</ListItem>
        </ul>

        <H3>Section 5.2: Essential Security Best Practices</H3>
        <p className="mb-4 text-gray-700">Mastering Bitcoin security is about mastering personal operational security (OpSec).</p>
        <ul className="space-y-3 text-gray-700">
            <ListItem><strong className="text-gray-900">Protect Your Private Keys:</strong> The golden rule. Never share them. Prioritize cold storage (hardware wallets) for significant amounts.</ListItem>
            <ListItem><strong className="text-gray-900">Fortify Your Access:</strong> Use strong, unique passwords and enable Two-Factor Authentication (2FA) everywhere.</ListItem>
            <ListItem><strong className="text-gray-900">Create Redundancy:</strong> Make multiple, offline backups of your seed phrase and store them in secure, separate locations.</ListItem>
            <ListItem><strong className="text-gray-900">Maintain Vigilance:</strong> Beware of phishing scams, keep software updated, and avoid publicly discussing your holdings.</ListItem>
        </ul>
    </ContentCard>
);

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => (
    <>
        <Section className="relative text-center overflow-hidden min-h-[60vh] flex items-center justify-center bg-white">
             <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tighter animate-fade-in-down">Bitcoin Deconstructed</h1>
                <p className="text-lg md:text-xl text-blue-600 max-w-3xl mx-auto animate-fade-in-up">A Comprehensive Analysis of its Technology, Privacy, and Practical Trading.</p>
             </div>
        </Section>
        <Section className="bg-gray-50">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <HomeCard 
                    icon={<BookOpenIcon />}
                    title="Foundations"
                    description="Understand what Bitcoin is, its core properties like decentralization, and the blockchain technology that powers it."
                    onClick={() => setPage('part1')}
                />
                <HomeCard 
                    icon={<BarChart2Icon />}
                    title="Network Mechanics"
                    description="Explore the lifecycle of a transaction and the Proof-of-Work mining process that secures the network."
                    onClick={() => setPage('part2')}
                />
                <HomeCard 
                    icon={<ShieldIcon />}
                    title="Privacy & Transparency"
                    description="Learn what information is public on the ledger versus what remains private, and why this design is crucial."
                    onClick={() => setPage('part3')}
                />
                <HomeCard 
                    icon={<HardDriveIcon />}
                    title="Practical Guide"
                    description="A hands-on guide to choosing a wallet, acquiring Bitcoin, and the basics of trading strategies."
                    onClick={() => setPage('part4')}
                />
                <HomeCard 
                    icon={<AlertTriangleIcon />}
                    title="Risks & Security"
                    description="Navigate the inherent risks of the ecosystem and master the essential security practices to protect your assets."
                    onClick={() => setPage('part5')}
                />
                 <div className="flex items-center justify-center text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500">More than just a currency, Bitcoin is a paradigm shift in finance and technology. Dive in to learn more.</p>
                </div>
            </div>
        </Section>
    </>
);

const HomeCard = ({ icon, title, description, onClick }: { icon: React.ReactElement; title: string; description: string; onClick: () => void }) => (
    <div 
        onClick={onClick} 
        className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-start"
    >
        <div className="mb-4 text-blue-600 h-10 w-10">{React.cloneElement(icon, { className: "h-8 w-8" })}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 flex-grow">{description}</p>
    </div>
);

const Navbar = ({ page, setPage }: { page: string; setPage: (page: string) => void }) => {
    const navItems = [
        { id: 'home', label: 'Home', icon: <HomeIcon /> },
        { id: 'part1', label: 'Foundations', icon: <BookOpenIcon /> },
        { id: 'part2', label: 'Mechanics', icon: <BarChart2Icon /> },
        { id: 'part3', label: 'Privacy', icon: <ShieldIcon /> },
        { id: 'part4', label: 'Guide', icon: <HardDriveIcon /> },
        { id: 'part5', label: 'Risks', icon: <AlertTriangleIcon /> },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage('home')}>
                         <svg className="w-8 h-8 text-blue-600" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3.2c-7.04 0-12.8 5.76-12.8 12.8s5.76 12.8 12.8 12.8 12.8-5.76 12.8-12.8S23.04 3.2 16 3.2zm0 23.04c-5.632 0-10.24-4.608-10.24-10.24S10.368 5.76 16 5.76c5.632 0 10.24 4.608 10.24 10.24S21.632 26.24 16 26.24z" fill="currentColor"></path><path d="M17.28 20.48h-2.56v-2.56H12.8v-2.56h1.92V12.8h2.56v2.56h1.92v2.56h-1.92v2.56zm-1.28-7.68c-.704 0-1.28-.576-1.28-1.28s.576-1.28 1.28-1.28 1.28.576 1.28 1.28-.576 1.28-1.28 1.28zm0 8.96c-.704 0-1.28-.576-1.28-1.28s.576-1.28 1.28-1.28 1.28.576 1.28 1.28-.576 1.28-1.28 1.28z" fill="currentColor"></path></svg>
                        <span className="text-xl font-bold text-gray-800 tracking-wider">Bitcoin Explained</span>
                    </div>
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setPage(item.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${page === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Nav Menu */}
            {isMenuOpen && (
                <div className="md:hidden pb-4 px-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setPage(item.id); setIsMenuOpen(false); }}
                            className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-md text-base font-medium transition-colors duration-200 ${page === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                        >
                           {React.cloneElement(item.icon, { className: "w-5 h-5" })}<span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

const FooterComponent = () => (
    <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto py-8 px-4 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE's Daddy Blog. Educational content for informational purposes only.</p>
            <p className="text-sm mt-2">This website provides a summary based on public information and does not constitute financial advice.</p>
        </div>
    </footer>
);

// Component for global styles
const GlobalStyles = () => (
    <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
        .animate-fade-in-down {
            animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out 0.4s forwards;
            opacity: 0;
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}} />
);

const InteractiveBitcoinApp = () => {
    const [page, setPage] = useState('home');

    // Simple router to render the correct page component
    const renderPage = () => {
        switch (page) {
            case 'part1': return <Section className="bg-gray-50"><Part1 /></Section>;
            case 'part2': return <Section className="bg-gray-50"><Part2 /></Section>;
            case 'part3': return <Section className="bg-gray-50"><Part3 /></Section>;
            case 'part4': return <Section className="bg-gray-50"><Part4 /></Section>;
            case 'part5': return <Section className="bg-gray-50"><Part5 /></Section>;
            case 'home':
            default:
                return <HomePage setPage={setPage} />;
        }
    };
    
    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
            <GlobalStyles />
            <Navbar page={page} setPage={setPage} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <FooterComponent />
        </div>
    );
};

export default function BitcoinDeconstructedPage() {
  const currentArticle = articles.find(article => article.slug === 'bitcoin-deconstructed-comprehensive-analysis');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
      
      {/* Article Header */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          
          {/* Navigation and Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Article Title with Badges */}
          <div className="relative mb-8">
            {/* Deep Research Badge - Top Left */}
            <div className="absolute -top-2 -left-2 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Deep Research
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-blue-600">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                Bitcoin Deconstructed: A Comprehensive Analysis
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                A deep dive into Bitcoin's technology, privacy model, and practical trading guide. Explore the mathematical foundations, cryptographic security, and essential practices for navigating the Bitcoin ecosystem.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Blockchain Technology</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Cryptography</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Trading Guide</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Security</span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span>Published on July 3, 2025</span>
                <span>•</span>
                <span>Deep Research Analysis</span>
                <span>•</span>
                <a 
                  href="https://docs.google.com/document/d/e/2PACX-1vSHNybSnIYhdCeQmvHgIW4cLB-IxL1CgFwwci3Rrj9osF9wyZ9euAI9M0pxcvryx9uFhQa0iC61tLne/pub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Full Research Document
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Bitcoin App */}
          <div className="mb-8">
            <InteractiveBitcoinApp />
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Educational Disclaimer</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  This content is for educational purposes only and does not constitute financial advice. Bitcoin and cryptocurrency investments carry significant risks including potential total loss of capital. Always conduct your own research and consider your risk tolerance before making any investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Risk Warning</h3>
                <p className="mt-1 text-sm text-red-700">
                  Bitcoin is highly volatile and speculative. The value can fluctuate dramatically. Never invest more than you can afford to lose. This analysis is based on current information and market conditions which can change rapidly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
} 