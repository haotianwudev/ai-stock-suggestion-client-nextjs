'use client';

import React, { useState, useMemo } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { LevelLadder } from '@/components/articles/article-visuals';
import {
  Search,
  ArrowDownRight,
  Layers,
  Activity,
  TrendingUp,
  TrendingDown,
  Scale,
  ShieldAlert,
  Coins,
  Dna,
  Globe,
  Home,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// --- JARGON DEFINITIONS (Strictly sourced from the paper) ---
const JARGON_DEFINITIONS: Record<string, string> = {
  'Form 13F-HR':
    'Mandatory quarterly SEC filing that discloses only long U.S.-listed equities, American Depositary Receipts (ADRs), and exchange-traded options as of quarter-end (with a 45-day reporting lag), omitting short sales, Treasury futures, currency swaps, private venture stakes, and subsequent trades.',
  'Call Option Notional Value':
    'Form 13F requires institutional managers to report exchange-traded options at the notional market value of the underlying shares controlled rather than the cash premium spent.',
  HHI:
    'Herfindahl-Hirschman Index — a quantitative measure of portfolio concentration across holdings, which more than doubled in Duquesne’s book from 0.049 in Q2 2026 to 0.1110 in Q3 2026.',
  HAMR:
    'Heat-Assisted Magnetic Recording — Seagate’s Mozaic platform (targeting 44TB and 50TB drives, with Mozaic 4+ qualified at the two largest cloud service providers) that underpins its cost-per-terabyte advantage in AI data-center storage.',
  'Fiscal Dominance':
    'A macroeconomic regime where massive peacetime government deficits (~6% of GDP at $40T national debt) collide with monetary policy, and Treasury buybacks of long bonds funded by short-term T-bills act as disguised quantitative easing that fuels inflation.',
  'Forward Guidance':
    'Central bank policy communication providing future rate-path promises or an automatic equity "put" — explicitly dropped by Federal Reserve Chair Kevin Warsh to take rate-cut optionality away from market participants.',
  MRD:
    'Molecular Residual Disease — clinical oncology testing led by Natera’s cell-free DNA (cfDNA) Signatera test to detect microscopic cancer remnants across colorectal, breast, and additional tumor indications.',
  'PURR / HYPE':
    'Hyperliquid Strategies Inc (PURR) is a Nasdaq-listed digital-asset treasury company accumulating ~38.9 million HYPE tokens, the native asset of the Hyperliquid Layer-1 blockchain (70% of decentralized perpetual futures volume).',
};

interface JargonProps {
  term: keyof typeof JARGON_DEFINITIONS;
  label?: string;
}

const Jargon: React.FC<JargonProps> = ({ term, label }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || focused || pinned;
  const definition = JARGON_DEFINITIONS[term];

  return (
    <span className="relative inline-block">
      <span
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setPinned(false);
        }}
        onClick={() => setPinned((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setHovered(false);
            setFocused(false);
            setPinned(false);
          }
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setPinned((prev) => !prev);
          }
        }}
        className="cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52] font-medium focus:outline-none focus:ring-1 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm px-0.5 transition-colors"
      >
        {label || term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 z-50 block font-sans font-normal px-3 py-2.5 rounded-md shadow-xl bg-[#14171B] dark:bg-[#05070A] text-white dark:text-slate-100 text-xs leading-relaxed border border-slate-700 dark:border-slate-800 pointer-events-none text-left"
        >
          <span className="block font-mono text-[11px] uppercase tracking-wider text-[#D08F52] mb-1">
            {term}
          </span>
          {definition}
        </span>
      )}
    </span>
  );
};

// --- FULL 65-LINE Q3 2026 SEC FORM 13F DATA ---
interface HoldingLine {
  rank: number;
  ticker: string;
  name: string;
  secType: string;
  isOption: boolean;
  shares: string;
  valueK: number;
  impliedPrice: string;
  pctTotal: string;
  pctExOpt: string;
  qoqChange: string;
  changeCategory: 'new' | 'added' | 'trimmed' | 'unchanged';
}

const ALL_65_HOLDINGS: HoldingLine[] = [
  { rank: 1, ticker: 'NTRA', name: 'Natera Inc', secType: 'COM (Equity)', isOption: false, shares: '3,160,666', valueK: 1306335, impliedPrice: '$413.31', pctTotal: '29.22%', pctExOpt: '31.49%', qoqChange: 'Trimmed -0.80% (-25,640 sh)', changeCategory: 'trimmed' },
  { rank: 2, ticker: 'STX', name: 'Seagate Technology Hldngs Pl', secType: 'ORD SHS (Equity)', isOption: false, shares: '341,790', valueK: 315247, impliedPrice: '$922.34', pctTotal: '7.05%', pctExOpt: '7.60%', qoqChange: 'Added +180.16% (+219,790 sh)', changeCategory: 'added' },
  { rank: 3, ticker: 'AMZN', name: 'Amazon Com Inc', secType: 'COM (Equity)', isOption: false, shares: '772,600', valueK: 192493, impliedPrice: '$249.15', pctTotal: '4.31%', pctExOpt: '4.64%', qoqChange: 'Added +42.65% (+231,000 sh)', changeCategory: 'added' },
  { rank: 4, ticker: 'FOXA', name: 'Fox Corp', secType: 'CL A COM (Equity)', isOption: false, shares: '3,046,050', valueK: 190835, impliedPrice: '$62.65', pctTotal: '4.27%', pctExOpt: '4.60%', qoqChange: 'Added +38.17% (+841,450 sh)', changeCategory: 'added' },
  { rank: 5, ticker: 'YPF', name: 'YPF Sociedad Anonima', secType: 'SPON ADS (Equity)', isOption: false, shares: '3,541,897', valueK: 177555, impliedPrice: '$50.13', pctTotal: '3.97%', pctExOpt: '4.28%', qoqChange: 'Added +12.84% (+403,000 sh)', changeCategory: 'added' },
  { rank: 6, ticker: 'U', name: 'Unity Software Inc', secType: 'COM (Equity)', isOption: false, shares: '3,956,385', valueK: 161935, impliedPrice: '$40.93', pctTotal: '3.62%', pctExOpt: '3.90%', qoqChange: 'Added +435.53% (+3,217,585 sh)', changeCategory: 'added' },
  { rank: 7, ticker: 'SE', name: 'Sea Ltd', secType: 'SPON ADS (Equity)', isOption: false, shares: '1,592,765', valueK: 155072, impliedPrice: '$97.36', pctTotal: '3.47%', pctExOpt: '3.74%', qoqChange: 'Added +44.81% (+492,860 sh)', changeCategory: 'added' },
  { rank: 8, ticker: 'EWZ', name: 'iShares Inc MSCI Brazil ETF', secType: 'ETF (Equity)', isOption: false, shares: '3,377,570', valueK: 125814, impliedPrice: '$37.25', pctTotal: '2.81%', pctExOpt: '3.03%', qoqChange: 'Trimmed -1.71% (-58,600 sh)', changeCategory: 'trimmed' },
  { rank: 9, ticker: 'INSM', name: 'Insmed Inc', secType: 'COM PAR $.01 (Equity)', isOption: false, shares: '1,092,650', valueK: 124715, impliedPrice: '$114.14', pctTotal: '2.79%', pctExOpt: '3.01%', qoqChange: 'Trimmed -23.31% (-332,040 sh)', changeCategory: 'trimmed' },
  { rank: 10, ticker: 'AMZN', name: 'Amazon Com Inc (Call)', secType: 'COM (Call Option)', isOption: true, shares: '459,300', valueK: 114435, impliedPrice: '$249.15', pctTotal: '2.56%', pctExOpt: '—', qoqChange: 'Unchanged (459,300 call sh)', changeCategory: 'unchanged' },
  { rank: 11, ticker: 'STX', name: 'Seagate Technology Hldngs (Call)', secType: 'ORD SHS (Call Option)', isOption: true, shares: '98,000', valueK: 90389, impliedPrice: '$922.34', pctTotal: '2.02%', pctExOpt: '—', qoqChange: 'New Position (+98,000 call sh)', changeCategory: 'new' },
  { rank: 12, ticker: 'RVMD', name: 'Revolution Medicines Inc', secType: 'COM (Equity)', isOption: false, shares: '436,287', valueK: 89552, impliedPrice: '$205.26', pctTotal: '2.00%', pctExOpt: '2.16%', qoqChange: 'Added +9.18% (+36,700 sh)', changeCategory: 'added' },
  { rank: 13, ticker: 'TBBB', name: 'BBB Foods Inc', secType: 'CL A COM (Equity)', isOption: false, shares: '1,647,408', valueK: 86720, impliedPrice: '$52.64', pctTotal: '1.94%', pctExOpt: '2.09%', qoqChange: 'Trimmed -43.23% (-1,254,325 sh)', changeCategory: 'trimmed' },
  { rank: 14, ticker: 'STM', name: 'STMicroelectronics N V', secType: 'NY REGISTRY (Equity)', isOption: false, shares: '1,615,380', valueK: 86197, impliedPrice: '$53.36', pctTotal: '1.93%', pctExOpt: '2.08%', qoqChange: 'Trimmed -47.94% (-1,487,500 sh)', changeCategory: 'trimmed' },
  { rank: 15, ticker: 'NAMS', name: 'NewAmsterdam Pharma Co', secType: 'ORD SHS (Equity)', isOption: false, shares: '3,357,146', valueK: 81646, impliedPrice: '$24.32', pctTotal: '1.83%', pctExOpt: '1.97%', qoqChange: 'Added +9.35% (+287,000 sh)', changeCategory: 'added' },
  { rank: 16, ticker: 'CDW', name: 'CDW Corp', secType: 'COM (Equity)', isOption: false, shares: '575,750', valueK: 73788, impliedPrice: '$128.16', pctTotal: '1.65%', pctExOpt: '1.78%', qoqChange: 'Trimmed -22.61% (-168,200 sh)', changeCategory: 'trimmed' },
  { rank: 17, ticker: 'INSM', name: 'Insmed Inc (Call)', secType: 'COM (Call Option)', isOption: true, shares: '550,000', valueK: 62777, impliedPrice: '$114.14', pctTotal: '1.40%', pctExOpt: '—', qoqChange: 'Trimmed -59.26% (-800,000 call sh)', changeCategory: 'trimmed' },
  { rank: 18, ticker: 'SGI', name: 'Somnigroup International Inc', secType: 'COM (Equity)', isOption: false, shares: '993,600', valueK: 61712, impliedPrice: '$62.11', pctTotal: '1.38%', pctExOpt: '1.49%', qoqChange: 'New Position (+993,600 sh)', changeCategory: 'new' },
  { rank: 19, ticker: 'NEM', name: 'Newmont Corp', secType: 'COM (Equity)', isOption: false, shares: '380,400', valueK: 43875, impliedPrice: '$115.34', pctTotal: '0.98%', pctExOpt: '1.06%', qoqChange: 'New Position (+380,400 sh)', changeCategory: 'new' },
  { rank: 20, ticker: 'B', name: 'Barrick Mining Corp', secType: 'COM SHS (Equity)', isOption: false, shares: '1,054,600', valueK: 42891, impliedPrice: '$40.67', pctTotal: '0.96%', pctExOpt: '1.03%', qoqChange: 'New Position (+1,054,600 sh)', changeCategory: 'new' },
  { rank: 21, ticker: 'AEM', name: 'Agnico Eagle Mines Ltd', secType: 'COM (Equity)', isOption: false, shares: '231,050', valueK: 42345, impliedPrice: '$183.27', pctTotal: '0.95%', pctExOpt: '1.02%', qoqChange: 'New Position (+231,050 sh)', changeCategory: 'new' },
  { rank: 22, ticker: 'BTDR', name: 'Bitdeer Technologies Group', secType: 'CL A ORD (Equity)', isOption: false, shares: '3,781,493', valueK: 39668, impliedPrice: '$10.49', pctTotal: '0.89%', pctExOpt: '0.96%', qoqChange: 'Trimmed -7.20% (-293,500 sh)', changeCategory: 'trimmed' },
  { rank: 23, ticker: 'CPNG', name: 'Coupang Inc', secType: 'CL A (Equity)', isOption: false, shares: '2,667,485', valueK: 36998, impliedPrice: '$13.87', pctTotal: '0.83%', pctExOpt: '0.89%', qoqChange: 'Held / Unchanged', changeCategory: 'unchanged' },
  { rank: 24, ticker: 'WDC', name: 'Western Digital Corp', secType: 'COM (Equity)', isOption: false, shares: '80,960', valueK: 36793, impliedPrice: '$454.46', pctTotal: '0.82%', pctExOpt: '0.89%', qoqChange: 'New Position (+80,960 sh)', changeCategory: 'new' },
  { rank: 25, ticker: 'PURR', name: 'Hyperliquid Strategies Inc', secType: 'COM (Equity)', isOption: false, shares: '2,941,500', valueK: 36092, impliedPrice: '$12.27', pctTotal: '0.81%', pctExOpt: '0.87%', qoqChange: 'Held / Q3 Stake', changeCategory: 'unchanged' },
  { rank: 26, ticker: 'FOX', name: 'Fox Corp', secType: 'CL B COM (Equity)', isOption: false, shares: '632,600', valueK: 35615, impliedPrice: '$56.30', pctTotal: '0.80%', pctExOpt: '0.86%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 27, ticker: 'FLR', name: 'Fluor Corp', secType: 'COM (Equity)', isOption: false, shares: '723,000', valueK: 34617, impliedPrice: '$47.88', pctTotal: '0.77%', pctExOpt: '0.83%', qoqChange: 'Trimmed -26.39%', changeCategory: 'trimmed' },
  { rank: 28, ticker: 'CDW', name: 'CDW Corp (Call)', secType: 'COM (Call Option)', isOption: true, shares: '250,000', valueK: 32040, impliedPrice: '$128.16', pctTotal: '0.72%', pctExOpt: '—', qoqChange: 'Held / Active Call Line', changeCategory: 'unchanged' },
  { rank: 29, ticker: 'SKY', name: 'Champion Homes Inc', secType: 'COM (Equity)', isOption: false, shares: '371,200', valueK: 31812, impliedPrice: '$85.70', pctTotal: '0.71%', pctExOpt: '0.77%', qoqChange: 'Added +45.91%', changeCategory: 'added' },
  { rank: 30, ticker: 'APP', name: 'AppLovin Corp', secType: 'COM CL A (Equity)', isOption: false, shares: '109,460', valueK: 31790, impliedPrice: '$290.43', pctTotal: '0.71%', pctExOpt: '0.77%', qoqChange: 'New Position (+109,460 sh)', changeCategory: 'new' },
  { rank: 31, ticker: 'CVCO', name: 'Cavco Industries Inc', secType: 'COM (Equity)', isOption: false, shares: '56,620', valueK: 31722, impliedPrice: '$560.26', pctTotal: '0.71%', pctExOpt: '0.76%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 32, ticker: 'DAKT', name: 'Daktronics Inc', secType: 'COM (Equity)', isOption: false, shares: '1,794,035', valueK: 31198, impliedPrice: '$17.39', pctTotal: '0.70%', pctExOpt: '0.75%', qoqChange: 'Added +59.74%', changeCategory: 'added' },
  { rank: 33, ticker: 'SPCX', name: 'Space Exploration Techn Corp', secType: 'CL A COM (Equity)', isOption: false, shares: '202,125', valueK: 30493, impliedPrice: '$150.86', pctTotal: '0.68%', pctExOpt: '0.73%', qoqChange: 'New Position (+202,125 sh)', changeCategory: 'new' },
  { rank: 34, ticker: 'ROKU', name: 'Roku Inc', secType: 'COM CL A (Equity)', isOption: false, shares: '184,055', valueK: 28028, impliedPrice: '$152.28', pctTotal: '0.63%', pctExOpt: '0.68%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 35, ticker: 'TTMI', name: 'TTM Technologies Inc', secType: 'COM (Equity)', isOption: false, shares: '221,505', valueK: 27210, impliedPrice: '$122.84', pctTotal: '0.61%', pctExOpt: '0.66%', qoqChange: 'New Position (+221,505 sh)', changeCategory: 'new' },
  { rank: 36, ticker: 'RYTM', name: 'Rhythm Pharmaceuticals Inc', secType: 'COM (Equity)', isOption: false, shares: '269,900', valueK: 25699, impliedPrice: '$95.22', pctTotal: '0.57%', pctExOpt: '0.62%', qoqChange: 'Added +32.55%', changeCategory: 'added' },
  { rank: 37, ticker: 'HUM', name: 'Humana Inc', secType: 'COM (Equity)', isOption: false, shares: '65,220', valueK: 24886, impliedPrice: '$381.57', pctTotal: '0.56%', pctExOpt: '0.60%', qoqChange: 'New / Re-initiated (+65,220 sh)', changeCategory: 'new' },
  { rank: 38, ticker: 'TSLA', name: 'Tesla Inc (Call)', secType: 'COM (Call Option)', isOption: true, shares: '63,000', valueK: 22353, impliedPrice: '$354.81', pctTotal: '0.50%', pctExOpt: '—', qoqChange: 'Active Call Line', changeCategory: 'unchanged' },
  { rank: 39, ticker: 'ADMA', name: 'ADMA Biologics Inc', secType: 'COM (Equity)', isOption: false, shares: '2,212,810', valueK: 22194, impliedPrice: '$10.03', pctTotal: '0.50%', pctExOpt: '0.53%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 40, ticker: 'RIOT', name: 'Riot Platforms Inc', secType: 'COM (Equity)', isOption: false, shares: '905,600', valueK: 18248, impliedPrice: '$20.15', pctTotal: '0.41%', pctExOpt: '0.44%', qoqChange: 'Added +19.98%', changeCategory: 'added' },
  { rank: 41, ticker: 'BLTE', name: 'Belite Bio Inc', secType: 'SPON ADS (Equity)', isOption: false, shares: '106,100', valueK: 18018, impliedPrice: '$169.82', pctTotal: '0.40%', pctExOpt: '0.43%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 42, ticker: 'BEAM', name: 'Beam Therapeutics Inc', secType: 'COM (Equity)', isOption: false, shares: '699,700', valueK: 17108, impliedPrice: '$24.45', pctTotal: '0.38%', pctExOpt: '0.41%', qoqChange: 'Added +355.53%', changeCategory: 'added' },
  { rank: 43, ticker: 'JBS', name: 'JBS N.V.', secType: 'CL A SHS (Equity)', isOption: false, shares: '1,406,200', valueK: 15876, impliedPrice: '$11.29', pctTotal: '0.36%', pctExOpt: '0.38%', qoqChange: 'Added +114.39%', changeCategory: 'added' },
  { rank: 44, ticker: 'RSP', name: 'Invesco S&P 500 Equal Wt ETF', secType: 'ETF (Equity)', isOption: false, shares: '74,400', valueK: 15477, impliedPrice: '$208.02', pctTotal: '0.35%', pctExOpt: '0.37%', qoqChange: 'Common Shares Held (Calls Exited)', changeCategory: 'trimmed' },
  { rank: 45, ticker: 'RLAY', name: 'Relay Therapeutics Inc', secType: 'COM (Equity)', isOption: false, shares: '852,600', valueK: 15389, impliedPrice: '$18.05', pctTotal: '0.34%', pctExOpt: '0.37%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 46, ticker: 'PLTR', name: 'Palantir Technologies Inc', secType: 'CL A (Equity)', isOption: false, shares: '80,100', valueK: 14983, impliedPrice: '$187.05', pctTotal: '0.34%', pctExOpt: '0.36%', qoqChange: 'New Position (+80,100 sh)', changeCategory: 'new' },
  { rank: 47, ticker: 'TSM', name: 'Taiwan Semiconductor Mfg', secType: 'SPON ADS (Equity)', isOption: false, shares: '32,700', valueK: 14917, impliedPrice: '$456.18', pctTotal: '0.33%', pctExOpt: '0.36%', qoqChange: 'Trimmed -94.45% (-556,980 sh)', changeCategory: 'trimmed' },
  { rank: 48, ticker: 'RGEN', name: 'Repligen Corp', secType: 'COM (Equity)', isOption: false, shares: '77,400', valueK: 14879, impliedPrice: '$192.24', pctTotal: '0.33%', pctExOpt: '0.36%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 49, ticker: 'SNX', name: 'TD SYNNEX Corporation', secType: 'COM (Equity)', isOption: false, shares: '56,500', valueK: 14512, impliedPrice: '$256.85', pctTotal: '0.32%', pctExOpt: '0.35%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 50, ticker: 'CRH', name: 'CRH Plc', secType: 'ORD (Equity)', isOption: false, shares: '159,355', valueK: 13195, impliedPrice: '$82.80', pctTotal: '0.30%', pctExOpt: '0.32%', qoqChange: 'Trimmed -71.21% (-394,200 sh)', changeCategory: 'trimmed' },
  { rank: 51, ticker: 'NUVB', name: 'Nuvation Bio Inc', secType: 'COM CL A (Equity)', isOption: false, shares: '2,269,900', valueK: 12711, impliedPrice: '$5.60', pctTotal: '0.28%', pctExOpt: '0.31%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 52, ticker: 'PANW', name: 'Palo Alto Networks Inc', secType: 'COM (Equity)', isOption: false, shares: '30,000', valueK: 11919, impliedPrice: '$397.30', pctTotal: '0.27%', pctExOpt: '0.29%', qoqChange: 'Trimmed from Q2', changeCategory: 'trimmed' },
  { rank: 53, ticker: 'PCT', name: 'PureCycle Technologies Inc', secType: 'COM (Equity)', isOption: false, shares: '2,681,415', valueK: 11825, impliedPrice: '$4.41', pctTotal: '0.26%', pctExOpt: '0.29%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 54, ticker: 'NSIT', name: 'Insight Enterprises Inc', secType: 'COM (Equity)', isOption: false, shares: '67,100', valueK: 10489, impliedPrice: '$156.32', pctTotal: '0.23%', pctExOpt: '0.25%', qoqChange: 'Held / Active Stake', changeCategory: 'unchanged' },
  { rank: 55, ticker: 'SKE', name: 'Skeena Resources Ltd', secType: 'COM (Equity)', isOption: false, shares: '300,200', valueK: 8925, impliedPrice: '$29.73', pctTotal: '0.20%', pctExOpt: '0.22%', qoqChange: 'New / Gold Explorer Stake', changeCategory: 'new' },
  { rank: 56, ticker: 'KRSA', name: 'Korsana Biosciences Inc', secType: 'COM (Equity)', isOption: false, shares: '278,561', valueK: 8914, impliedPrice: '$32.00', pctTotal: '0.20%', pctExOpt: '0.21%', qoqChange: 'Biotech Stake', changeCategory: 'unchanged' },
  { rank: 57, ticker: 'OLMA', name: 'Olema Pharmaceuticals Inc', secType: 'COM (Equity)', isOption: false, shares: '986,827', valueK: 8526, impliedPrice: '$8.64', pctTotal: '0.19%', pctExOpt: '0.21%', qoqChange: 'Biotech Stake', changeCategory: 'unchanged' },
  { rank: 58, ticker: 'MKSI', name: 'MKS Inc', secType: 'COM (Equity)', isOption: false, shares: '31,920', valueK: 8470, impliedPrice: '$265.35', pctTotal: '0.19%', pctExOpt: '0.20%', qoqChange: 'New Position (+31,920 sh)', changeCategory: 'new' },
  { rank: 59, ticker: 'RKT', name: 'Rocket Companies Inc', secType: 'COM CL A (Equity)', isOption: false, shares: '652,220', valueK: 7507, impliedPrice: '$11.51', pctTotal: '0.17%', pctExOpt: '0.18%', qoqChange: 'US Mortgage / Housing Stake', changeCategory: 'unchanged' },
  { rank: 60, ticker: 'COGT', name: 'Cogent Biosciences Inc', secType: 'COM (Equity)', isOption: false, shares: '221,112', valueK: 7080, impliedPrice: '$32.02', pctTotal: '0.16%', pctExOpt: '0.17%', qoqChange: 'Biotech Stake', changeCategory: 'unchanged' },
  { rank: 61, ticker: 'MLTX', name: 'MoonLake Immunotherapeutics', secType: 'CL A ORD (Equity)', isOption: false, shares: '494,000', valueK: 5780, impliedPrice: '$11.70', pctTotal: '0.13%', pctExOpt: '0.14%', qoqChange: 'Biotech Stake', changeCategory: 'unchanged' },
  { rank: 62, ticker: 'LLY', name: 'Eli Lilly & Co', secType: 'COM (Equity)', isOption: false, shares: '3,800', valueK: 4397, impliedPrice: '$1,157.11', pctTotal: '0.10%', pctExOpt: '0.11%', qoqChange: 'Residual Biotech / Pharma Stake', changeCategory: 'unchanged' },
  { rank: 63, ticker: 'AUR', name: 'Aurora Innovation Inc', secType: 'CL A COM (Equity)', isOption: false, shares: '633,700', valueK: 3511, impliedPrice: '$5.54', pctTotal: '0.08%', pctExOpt: '0.08%', qoqChange: 'Autonomous Trucking Stake', changeCategory: 'unchanged' },
  { rank: 64, ticker: 'DBVT', name: 'DBV Technologies S A', secType: 'SPON ADS (Equity)', isOption: false, shares: '173,028', valueK: 2035, impliedPrice: '$11.76', pctTotal: '0.05%', pctExOpt: '0.05%', qoqChange: 'Biotech Stake', changeCategory: 'unchanged' },
  { rank: 65, ticker: 'WVE', name: 'Wave Life Sciences Inc', secType: 'SHS (Equity)', isOption: false, shares: '173,000', valueK: 640, impliedPrice: '$3.70', pctTotal: '0.01%', pctExOpt: '0.02%', qoqChange: 'Biotech Stake', changeCategory: 'unchanged' },
];

// --- TOP 10 COMBINED ISSUERS DATA ---
const TOP_10_COMBINED = [
  {
    issuer: 'Natera Inc (NTRA)',
    valM: '$1,306.34M',
    pctTotal: '29.22%',
    pctExOpt: '31.49%',
    detail: '3,160,666 common shares (-0.80% QoQ); surged 52.3% from $271.44 (6/30) to $413.31 (9/30)',
  },
  {
    issuer: 'Seagate Technology (STX + STX Calls)',
    valM: '$405.64M',
    pctTotal: '9.07%',
    pctExOpt: '7.60% (eq)',
    detail: '341,790 ordinary shares ($315.25M, +180.16% QoQ) + 98,000 new call option shares ($90.39M) at $922.34',
  },
  {
    issuer: 'Amazon.com Inc (AMZN + AMZN Calls)',
    valM: '$306.93M',
    pctTotal: '6.87%',
    pctExOpt: '4.64% (eq)',
    detail: '772,600 common shares ($192.49M, +42.65% QoQ) + 459,300 unchanged call option shares ($114.44M) at $249.15',
  },
  {
    issuer: 'Fox Corporation (FOXA + FOX)',
    valM: '$226.45M',
    pctTotal: '5.07%',
    pctExOpt: '5.46%',
    detail: '3,046,050 Class A shares ($190.84M, +38.17% QoQ) + 632,600 Class B shares ($35.62M)',
  },
  {
    issuer: 'Insmed Inc (INSM + INSM Calls)',
    valM: '$187.49M',
    pctTotal: '4.19%',
    pctExOpt: '3.01% (eq)',
    detail: '1,092,650 common shares ($124.72M, -23.31% QoQ) + 550,000 call option shares ($62.78M, -59.26% QoQ)',
  },
  {
    issuer: 'YPF Sociedad Anónima (YPF)',
    valM: '$177.56M',
    pctTotal: '3.97%',
    pctExOpt: '4.28%',
    detail: '3,541,897 ADR shares (+12.84% / +403,000 shares over Q2’s 3,138,897 shares)',
  },
  {
    issuer: 'Unity Software Inc (U)',
    valM: '$161.94M',
    pctTotal: '3.62%',
    pctExOpt: '3.90%',
    detail: '3,956,385 common shares (+435.53% / +3,217,585 shares from 738,800 shares in Q2)',
  },
  {
    issuer: 'Sea Limited (SE)',
    valM: '$155.07M',
    pctTotal: '3.47%',
    pctExOpt: '3.74%',
    detail: '1,592,765 ADR shares (+44.81% / +492,860 shares from 1,099,905 shares in Q2)',
  },
  {
    issuer: 'iShares MSCI Brazil ETF (EWZ)',
    valM: '$125.81M',
    pctTotal: '2.81%',
    pctExOpt: '3.03%',
    detail: '3,377,570 ETF shares (-1.71% QoQ); 100% of Q2’s 4,228,000 call option shares ($145.9M notional) liquidated',
  },
  {
    issuer: 'CDW Corporation (CDW + CDW Calls)',
    valM: '$105.83M',
    pctTotal: '2.37%',
    pctExOpt: '1.78% (eq)',
    detail: '575,750 common shares ($73.79M, -22.61% QoQ) + 250,000 call option shares ($32.04M)',
  },
];

export default function DruckenmillerQ32026Article() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'new' | 'added' | 'trimmed' | 'options'>('all');
  const [showAllHoldings, setShowAllHoldings] = useState(false);

  const filteredHoldings = useMemo(() => {
    return ALL_65_HOLDINGS.filter((item) => {
      const matchesSearch =
        item.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.qoqChange.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'new') return item.changeCategory === 'new';
      if (filterType === 'added') return item.changeCategory === 'added';
      if (filterType === 'trimmed') return item.changeCategory === 'trimmed';
      if (filterType === 'options') return item.isOption;
      return true;
    });
  }, [searchQuery, filterType]);

  const displayedHoldings = showAllHoldings ? filteredHoldings : filteredHoldings.slice(0, 20);

  return (
    <ArticleFrame
      slug="stanley-druckenmiller-q3-2026-13f-portfolio-overhaul"
      additionalDisclaimer="SEC Form 13F-HR filings reflect only long U.S.-listed equity, ADR, and exchange-traded option holdings as of quarter-end (September 30, 2026) with a 45-day reporting lag, and omit short sales, Treasury futures, currency swaps, private venture holdings, and subsequent Q4 trades."
    >
      <div className="max-w-5xl mx-auto space-y-12 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#A8672E]/20 dark:selection:bg-[#D08F52]/20">

        {/* FILING METADATA STRIP & COMPACT STAT ROW */}
        <section className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A8672E] dark:text-[#D08F52]">
            <span>Duquesne Family Office LLC (CIK: 0001536411)</span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span>Accession No. 0001536411-26-000011</span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span>Filed Nov 16, 2026 (Q3 Ended Sept 30, 2026)</span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Filed after market close on November 16, 2026 by General Counsel Sue Meng, Duquesne Family Office&apos;s Q3 2026{' '}
            <Jargon term="Form 13F-HR" /> discloses a sweeping structural overhaul across{' '}
            <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">$4.47 billion</span> in reportable U.S.-listed equity and call-option holdings&mdash;compressing from 95 line items to 65 lines across 60 distinct issuers as U.S. fiscal deficits collide with a maturing, capital-intensive AI cycle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-2">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-4 min-w-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Q3 13F Total Value
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl font-semibold text-slate-950 dark:text-white">
                $4,470,867k
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                <span>-14.20% QoQ (-$739,989k vs Q2)</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-4 min-w-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Ex-Options Cash Equity
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl font-semibold text-slate-950 dark:text-white">
                $4,148,873k
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">
                <Activity className="w-3.5 h-3.5 shrink-0" />
                <span>Only -4.72% QoQ (vs $4,354,220k)</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-4 min-w-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Call Option Notional
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl font-semibold text-slate-950 dark:text-white">
                $321,994k
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">
                <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                <span>-62.41% QoQ (7.20% of Q3 book)</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-4 min-w-0">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Top 10 Combined Issuers
              </div>
              <div className="mt-1 font-mono tabular-nums text-xl font-semibold text-[#A8672E] dark:text-[#D08F52]">
                70.66%
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400">
                <Layers className="w-3.5 h-3.5 shrink-0 text-[#A8672E] dark:text-[#D08F52]" />
                <span>$3,158.9M &bull; HHI 0.1110 (2.26x Q2)</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXECUTIVE TAKEAWAYS: FOUR STRATEGIC AXES */}
        <section className="rounded-xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-white dark:bg-[#11151E] p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-serif text-xl sm:text-2xl text-slate-950 dark:text-white">
              Executive Summary: Four Strategic Axes of the Q3 Overhaul
            </h2>
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52]">
              42 Exits &bull; 16 New &bull; 16 Adds &bull; 15 Trims
            </span>
          </div>

          <ul className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A] shrink-0" />
              <div>
                <strong className="text-slate-950 dark:text-white">Front-End Foundry &amp; Hyperscaler Exit:</strong>{' '}
                Slashed Taiwan Semiconductor (<span className="font-mono">TSM</span>) by{' '}
                <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">-94.45%</span>, cut STMicroelectronics (<span className="font-mono">STM</span>) by{' '}
                <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">-47.94%</span>, and liquidated <span className="font-mono">100%</span> of <span className="font-mono">AMD</span>, SanDisk (<span className="font-mono">SNDK</span>), Lam Research (<span className="font-mono">LRCX</span>), Arm (<span className="font-mono">ARM</span>), and Alphabet (<span className="font-mono">GOOGL</span>, exited after AI capex pushed Q3 free cash flow negative).
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] shrink-0" />
              <div>
                <strong className="text-slate-950 dark:text-white">Rotation into AI Data-Center Storage &amp; Application Monetizers:</strong>{' '}
                Boosted Seagate Technology (<span className="font-mono">STX</span>) equity by{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+180.16%</span> ($315.2M) plus <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">$90.4M</span> in <span className="font-mono">STX</span> call options, initiated Western Digital (<span className="font-mono">WDC</span>, $36.8M), surged Unity Software (<span className="font-mono">U</span>) by{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+435.53%</span> ($161.9M), and opened new stakes in AppLovin (<span className="font-mono">APP</span>), Palantir (<span className="font-mono">PLTR</span>), TTM Technologies (<span className="font-mono">TTMI</span>), and newly public SpaceX (<span className="font-mono">SPCX</span>).
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52] shrink-0" />
              <div>
                <strong className="text-slate-950 dark:text-white">Macro Index De-Optioning &amp; Hard-Asset Debasement Hedge:</strong>{' '}
                Extinguished <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">$514.9M</span> in macro index and tech call options (<span className="font-mono">RSP</span>, <span className="font-mono">EWZ</span>, <span className="font-mono">IWM</span>, <span className="font-mono">SPY</span>, and <span className="font-mono">META</span> calls) ahead of Fed tightening, while deploying{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">$138.04M</span> (3.09% of book) across four gold miners (<span className="font-mono">NEM</span>, <span className="font-mono">B</span>, <span className="font-mono">AEM</span>, <span className="font-mono">SKE</span>).
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] shrink-0" />
              <div>
                <strong className="text-slate-950 dark:text-white">Idiosyncratic Anchor Compounding:</strong>{' '}
                Allowed genetic diagnostics leader Natera (<span className="font-mono">NTRA</span>) to expand to{' '}
                <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">29.22%</span> of the entire 13F book (<span className="font-mono tabular-nums">$1,306,335k</span>; 31.49% of ex-options equity), trimming just 0.80% (-25,640 shares) as the stock rallied 52.3% in Q3.
              </div>
            </li>
          </ul>
        </section>

        {/* SECTION 1: PORTFOLIO COMPRESSION, DE-OPTIONING & CONCENTRATION */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white">
              Executive Breakdown of Duquesne Family Office&apos;s Q3 2026 Form 13F Filing
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Disaggregating common equity versus <Jargon term="Call Option Notional Value" /> reveals that Duquesne&apos;s cash-equity book remained remarkably stable while gross derivatives leverage was stripped out.
            </p>
          </div>

          {/* TWO-COLUMN REGIME COMPARISON: Q2 2026 vs Q3 2026 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="font-serif text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                  Q2 2026 Regime (Ended June 30)
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Broad Call Leverage
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Total Reported 13F Book:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$5,210,856k (95 lines)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Ex-Options Cash Equity:</span>
                  <span>$4,354,220k (83.56% of book)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Call Option Notional Exposure:</span>
                  <span className="text-[#BC4128] dark:text-[#E2694A]">$856,636k (16.44% of book)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Top 10 Individual Lines:</span>
                  <span>45.8% (53.2% grouped)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Concentration Index (HHI):</span>
                  <span>0.049 across 90&ndash;95 positions</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Macro Index Call Lines:</span>
                  <span className="text-right">RSP ($174.7M), EWZ ($145.9M), IWM ($99.1M), SPY ($67.2M)</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#A8672E]/40 dark:border-[#D08F52]/40 bg-white dark:bg-[#11151E] p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                  Q3 2026 Regime (Ended Sept 30)
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#A8672E]/15 dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52]">
                  De-Optioned Barbell
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Total Reported 13F Book:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$4,470,867k (65 lines / 60 issuers)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Ex-Options Cash Equity:</span>
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C]">$4,148,873k (92.80% of book)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Call Option Notional Exposure:</span>
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C]">$321,994k (7.20% &bull; 5 lines left)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Top 5 / Top 10 / Top 20 Lines:</span>
                  <span>48.82% / 64.07% (68.44% ex-opt) / 82.8%</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Concentration Index (HHI):</span>
                  <span className="text-[#A8672E] dark:text-[#D08F52] font-semibold">0.1110 (70.66% in Top 10 Issuers)</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="font-sans text-slate-500 dark:text-slate-400">Remaining 5 Call Lines:</span>
                  <span>AMZN, STX, INSM, CDW, TSLA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* DARK MONOSPACE FORMULA PANEL: De-Optioning & Concentration Math */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 space-y-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[#D08F52] border-b border-slate-800 pb-2.5 font-mono text-xs sm:text-sm">
              <span className="uppercase tracking-wider font-semibold">
                Quantitative Decomposition: Headline 13F Decline vs. Cash-Equity Stability
              </span>
              <span>SEC Form 13F Accounting</span>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {/* Worked Example 1: Disaggregating Total Book vs Notional Options */}
              <div className="space-y-3">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">
                  1. Disaggregating Total Book vs. Notional Options
                </div>
                <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                  <MathBlock
                    math="\Delta \text{Book}_{\text{Total}} = \Delta \text{Equity}_{\text{Ex-Opt}} + \Delta \text{Call}_{\text{Notional}}"
                    className="text-sm sm:text-base text-white"
                  />
                  <div className="border-t border-slate-800 pt-2.5 space-y-1.5 font-mono text-xs tabular-nums">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                      <span><InlineMath math="\Delta" /> Total 13F Book ($4,470,867k &minus; $5,210,856k)</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right">-$739,989k (-14.20%)</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                      <span><InlineMath math="\Delta" /> Call Notional ($321,994k &minus; $856,636k)</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right text-[#E2694A]">-$534,642k (-62.41%)</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                      <span><InlineMath math="\Delta" /> Ex-Opt Equity ($4,148,873k &minus; $4,354,220k)</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right text-[#3CBF9C]">-$205,347k (-4.72%)</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline pt-2 border-t border-slate-800 text-sm font-bold text-white">
                      <span>Share of Decline from Option Unwind</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right text-[#3CBF9C]">72.25% ($534.6M / $740.0M)</span>
                    </div>
                  </div>
                  <p className="border-t border-slate-800 pt-2.5 text-xs font-sans text-slate-300 leading-relaxed">
                    <span className="text-[#3CBF9C] font-mono">&rarr;</span> Nearly three-quarters of the headline Q3 13F decline resulted from extinguishing macro ETF &amp; mega-cap call options ($514.9M in RSP, EWZ, IWM, SPY, META calls) rather than liquidating core equity capital.
                  </p>
                </div>
              </div>

              {/* Worked Example 2: Issuer Consolidation & HHI */}
              <div className="space-y-3">
                <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">
                  2. Issuer Consolidation &amp; Herfindahl-Hirschman Index (<Jargon term="HHI" />)
                </div>
                <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                  <MathBlock
                    math="\text{HHI} = \sum_{i=1}^{N} w_i^2"
                    className="text-sm sm:text-base text-white"
                  />
                  <p className="text-[11px] font-sans text-slate-400">
                    Where <InlineMath math="w_i" /> is the combined portfolio weight of unique issuer <InlineMath math="i" /> across <InlineMath math="N = 60" /> consolidated issuers.
                  </p>
                  <div className="border-t border-slate-800 pt-2.5 space-y-1.5 font-mono text-xs tabular-nums">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                      <span>Top 10 Combined Issuers ($3,158.9M / $4,470.9M)</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right">70.66% of Total Book</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                      <span>Anchor Weight (<InlineMath math="w_{\text{NTRA}}" /> = $1,306,335k / $4,470,867k)</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right">29.22% (<InlineMath math="w_{\text{NTRA}}^2 = 0.0854" />)</span>
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline pt-2 border-t border-slate-800 text-sm font-bold text-white">
                      <span>Consolidated Q3 HHI (vs. 0.049 in Q2)</span>
                      <span className="text-[#D08F52]">=</span>
                      <span className="text-right text-[#3CBF9C]">0.1110 (2.26x Q2)</span>
                    </div>
                  </div>
                  <p className="border-t border-slate-800 pt-2.5 text-xs font-sans text-slate-300 leading-relaxed">
                    <span className="text-[#3CBF9C] font-mono">&rarr;</span> Combining split equity/call lines (<span className="text-[#D08F52] font-mono">STX, AMZN, INSM, CDW</span>) and dual share classes (<span className="text-[#D08F52] font-mono">FOXA + FOX</span>) reveals portfolio concentration more than doubled from Q2 to Q3.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TOP 10 COMBINED ISSUERS TABLE */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-white">
              Top 10 Combined Issuers (70.66% of Total Portfolio / $3,158.9 Million)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E]">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Combined Issuer</th>
                    <th className="py-3 px-4 text-right">Combined Value</th>
                    <th className="py-3 px-4 text-right">% Total Book</th>
                    <th className="py-3 px-4 text-right">% Ex-Options</th>
                    <th className="py-3 px-4">Q3 Composition &amp; Activity Breakdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                  {TOP_10_COMBINED.map((item, idx) => (
                    <tr key={item.issuer} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-400 dark:text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {item.issuer}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-900 dark:text-white">
                        {item.valM}
                      </td>
                      <td className="py-3 px-4 text-right text-[#A8672E] dark:text-[#D08F52] font-semibold">
                        {item.pctTotal}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600 dark:text-slate-400">
                        {item.pctExOpt}
                      </td>
                      <td className="py-3 px-4 font-sans text-xs text-slate-600 dark:text-slate-300">
                        {item.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* COMPLETE 65-LINE Q3 2026 SEC FORM 13F INFORMATION TABLE */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900 dark:text-white">
                  Complete 65-Line Q3 2026 SEC Form 13F Information Table
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  All 65 holdings (60 Equity / 5 Call Option lines) across 60 issuers as of September 30, 2026. Filter by Q3 transaction activity or search ticker/issuer.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowAllHoldings(true);
                    }}
                    placeholder="Search ticker or issuer..."
                    aria-label="Search ticker or issuer"
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] text-slate-900 dark:text-white focus:outline-none focus:border-[#A8672E] dark:focus:border-[#D08F52]"
                  />
                </div>

                <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-0.5 text-xs font-mono">
                  {(['all', 'new', 'added', 'trimmed', 'options'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setFilterType(tab);
                        setShowAllHoldings(true);
                      }}
                      className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                        filterType === tab
                          ? 'bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-slate-950 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-3">Ticker</th>
                    <th className="py-3 px-3">Issuer Name</th>
                    <th className="py-3 px-3">Security Class</th>
                    <th className="py-3 px-3 text-right">Shares / Underlying</th>
                    <th className="py-3 px-3 text-right">Q3 Value ($000)</th>
                    <th className="py-3 px-3 text-right">Implied 9/30 Price</th>
                    <th className="py-3 px-3 text-right">% Total ($4.47B)</th>
                    <th className="py-3 px-3 text-right">% Ex-Opt ($4.15B)</th>
                    <th className="py-3 px-3">QoQ Share Change vs. Q2 2026</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono tabular-nums">
                  {displayedHoldings.map((row) => {
                    const badgeColor =
                      row.changeCategory === 'new'
                        ? 'text-[#A8672E] dark:text-[#D08F52] font-semibold'
                        : row.changeCategory === 'added'
                        ? 'text-[#1D8A70] dark:text-[#3CBF9C]'
                        : row.changeCategory === 'trimmed'
                        ? 'text-[#BC4128] dark:text-[#E2694A]'
                        : 'text-slate-500 dark:text-slate-400';

                    return (
                      <tr
                        key={`${row.rank}-${row.ticker}`}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-slate-400 dark:text-slate-500">{row.rank}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-950 dark:text-white">
                          {row.ticker}
                        </td>
                        <td className="py-2.5 px-3 font-sans text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          {row.name}
                        </td>
                        <td className="py-2.5 px-3 text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {row.isOption ? (
                            <span className="px-1.5 py-0.5 rounded bg-[#A8672E]/15 dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] font-semibold">
                              {row.secType}
                            </span>
                          ) : (
                            row.secType
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-700 dark:text-slate-300">
                          {row.shares}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-slate-900 dark:text-white">
                          ${row.valueK.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-600 dark:text-slate-400">
                          {row.impliedPrice}
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-slate-900 dark:text-white">
                          {row.pctTotal}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500 dark:text-slate-400">
                          {row.pctExOpt}
                        </td>
                        <td className={`py-2.5 px-3 font-sans text-xs whitespace-nowrap ${badgeColor}`}>
                          {row.qoqChange}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900 font-mono text-xs font-semibold text-slate-950 dark:text-white">
                    <td className="py-3 px-3" colSpan={2}>Total</td>
                    <td className="py-3 px-3 font-sans">65 Reported Lines (60 Issuers)</td>
                    <td className="py-3 px-3">60 Equity / 5 Call</td>
                    <td className="py-3 px-3 text-right">&mdash;</td>
                    <td className="py-3 px-3 text-right">$4,470,867</td>
                    <td className="py-3 px-3 text-right">&mdash;</td>
                    <td className="py-3 px-3 text-right">100.00%</td>
                    <td className="py-3 px-3 text-right">100.00%</td>
                    <td className="py-3 px-3 text-[#BC4128] dark:text-[#E2694A]">
                      -$739,989k (-14.20%) vs. Q2
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {filteredHoldings.length > 20 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllHoldings((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#11151E] text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:border-[#A8672E] dark:hover:border-[#D08F52] transition-colors"
                >
                  {showAllHoldings ? (
                    <>
                      <span>Collapse to Top 20 Holdings</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Show All {filteredHoldings.length} Reported Lines</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        <InfographicSlot alt="Stanley Druckenmiller Duquesne Family Office Q3 2026 Form 13F Portfolio Overhaul Infographic" />

        {/* SECTION 2: CONSOLIDATING THE RESEARCH — WHY DRUCKENMILLER MADE THE Q3 CHANGES */}
        <section className="space-y-8 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white">
              Consolidating the Research: Why Druckenmiller Made the Q3 Portfolio Changes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Synthesizing Druckenmiller&apos;s trading methodology&mdash;<em>&ldquo;invest, then investigate,&rdquo;</em> asymmetric sizing where liquidity and earnings revisions align, and zero-ego exits when free-cash-flow conversion deteriorates.
            </p>
          </div>

          {/* PILLAR 1: AI VALUE-CHAIN ROTATION */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-slate-900 dark:text-white">
              The AI Value-Chain Rotation: Exiting Compute Foundries and FCF-Burning Hyperscalers for Mass-Capacity Storage and Application Monetizers
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              Having rotated out of Nvidia (<span className="font-mono">NVDA</span>) by late 2024 and avoided holding a single share of <span className="font-mono">NVDA</span>, <span className="font-mono">MSFT</span>, <span className="font-mono">AVGO</span> (exited Q2), <span className="font-mono">MU</span>, or <span className="font-mono">INTC</span> (exited Q2) in Q2 or Q3 2026, Duquesne reduced its combined chip and storage allocation from 11 lines worth <span className="font-mono tabular-nums">$852.6M</span> (16.4% of Q2 book) to 7 lines worth <span className="font-mono tabular-nums">$579.2M</span> (13.0% of Q3 book) while inverting the mix from logic chips to nearline storage (<Jargon term="HAMR" />).
            </p>

            {/* TWO-COLUMN COMPARISON CARD: AI STACK EXITS vs INFLOWS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LEFT: LIQUIDATIONS */}
              <div className="rounded-xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-[#11151E] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="font-serif text-base font-medium text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    Liquidated / Slashed: Front-End Chips &amp; FCF Burners
                  </span>
                  <TrendingDown className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A]" />
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">TSM (-94.45%):</strong>{' '}
                    Sold <span className="font-mono tabular-nums">556,980</span> ADS shares (<span className="font-mono tabular-nums">$254.1M</span> at implied 9/30 price) from #2 Q2 holding (589,680 sh / $281.6M), leaving a 32,700-share stub ($14.9M, 0.33%). Locked in <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+73.97%</span> gain over ~$229.14 average buy price.
                  </li>
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">STM (-47.94%):</strong>{' '}
                    Cut #3 Q2 holding from 3,102,880 to 1,615,380 shares (reducing value from <span className="font-mono tabular-nums">$232.4M</span> to <span className="font-mono tabular-nums">$86.2M</span>).
                  </li>
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">100% Chip &amp; Equipment Exits:</strong>{' '}
                    Fully liquidated <span className="font-mono">AMD</span> (72,900 sh / $42.3M in Q2 after rallying from ~$66.93 entry toward $449), <span className="font-mono">SNDK</span> (34,900 sh / $79.4M after capturing <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+257.9%</span> peak gain from ~$112.20 basis), <span className="font-mono">LRCX</span> ($18.9M), <span className="font-mono">RMBS</span>, <span className="font-mono">ENTG</span>, <span className="font-mono">ARM</span>, and <span className="font-mono">NVTS</span>.
                  </li>
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">GOOGL (-100% FCF-Burn Exit):</strong>{' '}
                    Liquidated all <span className="font-mono tabular-nums">336,300</span> shares (<span className="font-mono tabular-nums">$120.2M</span> / 2.31% in Q2 at ~$357.37 basis) as AI infrastructure capex&mdash;leasing ~110,000 Nvidia GPUs from SpaceX/xAI and a $17B takeover of Crusoe&apos;s Wyoming AI project&mdash;pushed Q3 free cash flow negative.
                  </li>
                </ul>
              </div>

              {/* RIGHT: INFLOWS */}
              <div className="rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-[#11151E] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="font-serif text-base font-medium text-[#1D8A70] dark:text-[#3CBF9C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    Accumulated: Nearline HDD Storage &amp; AI Monetizers
                  </span>
                  <TrendingUp className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">Enterprise HDD Storage ($442.4M / 9.90% of Book):</strong>{' '}
                    Up from $197.1M (3.8% in Q2). Boosted <span className="font-mono">STX</span> common shares <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+180.16%</span> (to 341,790 sh / $315.25M), initiated <span className="font-mono">STX</span> calls on 98,000 sh ($90.39M), and opened <span className="font-mono">WDC</span> at 80,960 sh ($36.79M).
                  </li>
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">AI Application Layer &amp; PCBs:</strong>{' '}
                    Increased Unity (<span className="font-mono">U</span>) by <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+435.53%</span> (3,956,385 sh / $161.94M), initiated AppLovin (<span className="font-mono">APP</span>, 109,460 sh / $31.79M), Palantir (<span className="font-mono">PLTR</span>, 80,100 sh / $14.98M), PCB maker TTM Technologies (<span className="font-mono">TTMI</span>, 221,505 sh / $27.21M), and <span className="font-mono">MKSI</span> ($8.47M).
                  </li>
                  <li>
                    <strong className="font-mono text-slate-900 dark:text-white">Cloud &amp; Orbital Compute (AMZN + SPCX):</strong>{' '}
                    Added <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+42.65%</span> to <span className="font-mono">AMZN</span> shares ($192.49M + $114.44M calls) and initiated 202,125 Class A shares of SpaceX (<span className="font-mono">SPCX</span>, <span className="font-mono tabular-nums">$30.49M</span> / 0.68% weight at $150.86 implied 9/30 price).
                  </li>
                </ul>
              </div>
            </div>

            {/* DARK MONOSPACE PANEL: SEAGATE vs SPACEX FUNDAMENTAL EQUATIONS */}
            <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 space-y-4 font-mono text-xs sm:text-sm tabular-nums">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[#D08F52] border-b border-slate-800 pb-2">
                <span className="uppercase tracking-wider font-semibold">
                  Fundamental Sizing Contrast: Seagate (9.07% Combined) vs. SpaceX (0.68% Starter)
                </span>
                <span>Cash Conversion vs. Venture Scale</span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <div className="text-[#3CBF9C] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    Seagate Technology (STX) &mdash; Fiscal Q3 2026 Fundamentals:
                  </div>
                  <div className="text-slate-300">&bull; Revenue: $3.11B (Data center = 80% / $2.5B, +55% YoY; ~90% of 199 EB shipped)</div>
                  <div className="text-slate-300">&bull; Q4 Guidance: Revenue $3.45B &plusmn; $100M | Non-GAAP Diluted EPS $5.00 &plusmn; $0.20</div>
                  <div className="text-slate-300">&bull; Profitability: Record 47.0% Non-GAAP Gross Margin | Non-GAAP Net Income $934M (+129% YoY, $4.10 EPS)</div>
                  <div className="text-slate-300">&bull; Cash &amp; Balance Sheet: $1.1B Operating Cash Flow | $953M Free Cash Flow | Retired $641M debt (0.7x net leverage) | $191M capital returned | ~31.7x P/E, 0.53x PEG</div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[#D08F52] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    SpaceX (SPCX) &mdash; Post-xAI Merger &amp; June 12, 2026 IPO Metrics:
                  </div>
                  <div className="text-slate-300">&bull; Corporate Events: Feb 2026 all-stock xAI merger (~$1.25T val); June 12, 2026 Nasdaq IPO ($75B raised at $135/sh, ~$1.77T val); Aug 2026 acquisition of Cursor AI parent Anysphere</div>
                  <div className="text-slate-300">&bull; Starlink Engine: $11.4B FY25 revenue (+$4.4B profit; subs growing from 10M to ~17M in 2026)</div>
                  <div className="text-slate-300">&bull; Consolidated Risk: -$4.94B FY25 net loss (-$3.2B at xAI) | Prospectus cites $28.5T TAM ($26.5T AI services) | ~115x sales &rarr; Sized strictly at 0.68% ($30.49M)</div>
                </div>
              </div>
            </div>
          </div>

          {/* PILLAR 2: MACRO & FISCAL DOMINANCE THESIS */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-slate-900 dark:text-white">
              The Macro &amp; Fiscal Dominance Thesis: &ldquo;Let the Bond Market Speak&rdquo; and the Kevin Warsh Fed
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              In August 2026, a rare public policy dispute emerged between Druckenmiller and his two most prominent former mentees: U.S. Treasury Secretary Scott Bessent (Soros Fund Management alum) and Federal Reserve Chair Kevin Warsh (former Duquesne partner), driving Duquesne&apos;s exit from <span className="font-mono tabular-nums">$514.9M</span> in index call options and airlines while initiating <span className="font-mono tabular-nums">$138.04M</span> in gold miners.
            </p>

            {/* TWO-COLUMN DICHOTOMY: BESSENT TREASURY vs WARSH FED & DRUCKENMILLER REBUKE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-[#11151E] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-serif text-base font-medium text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    Scott Bessent Treasury: Disguised QE &amp; Price Management
                  </span>
                  <Scale className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A]" />
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Aug 19, 2026 Intervention:</strong> Treasury doubled longer-dated government debt buyback operations from <span className="font-mono tabular-nums">$2B</span> to at least <span className="font-mono tabular-nums">$4B</span> per operation amid a bond sell-off.
                  </li>
                  <li>
                    <strong>Fiscal Arithmetic (<Jargon term="Fiscal Dominance" />):</strong> U.S. national debt crossed <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">$40 trillion</span> that exact week, with peacetime deficits near <span className="font-mono tabular-nums font-semibold">6% of GDP</span> (~$1.99T in FY2026, +$217B YoY) at <span className="font-mono tabular-nums">4.1%</span> full employment.
                  </li>
                  <li>
                    <strong>Aug 24 WSJ Op-Ed (<em>&ldquo;Let the Bond Market Speak&rdquo;</em>):</strong> Druckenmiller warned that funding long-bond buybacks with short-term T-bills is <em>&ldquo;economically, a small dose of quantitative easing run out of the Treasury rather than the Fed&rdquo;</em> and <em>&ldquo;price management &mdash; and a mistake far larger than $4 billion suggests.&rdquo;</em>
                  </li>
                  <li>
                    <strong>The 5.5% Invoice Quote:</strong> <em>&ldquo;Term out the debt honestly and pay the price the market sets. If the 30-year must trade at 5.5% to clear, that isn&apos;t a crisis. It is an invoice.&rdquo;</em>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-white dark:bg-[#11151E] p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-serif text-base font-medium text-[#A8672E] dark:text-[#D08F52] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                    Kevin Warsh Fed: No Forward Guidance &amp; Portfolio Response
                  </span>
                  <ShieldAlert className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>Ending the Fed Autopilot:</strong> Declaring <em>&ldquo;inflation is a choice&rdquo;</em> and dropping <Jargon term="Forward Guidance" />, Warsh&apos;s FOMC voted 12-0 on Sept 16, 2026 to hike rates by <span className="font-mono tabular-nums font-semibold">+25 bps to 3.75%&ndash;4.00%</span> (first hike since July 2023), linking sticky inflation to AI capex aggregate demand.
                  </li>
                  <li>
                    <strong>100% Liquidation of Macro Index Calls:</strong> Exited <span className="font-mono">RSP</span> ($174.7M), <span className="font-mono">EWZ</span> ($145.9M), <span className="font-mono">IWM</span> ($99.1M), and <span className="font-mono">SPY</span> ($67.2M) call options as 10-year yields pushed above 4.7%&ndash;5.0% (real rates 2.4%&ndash;2.5%).
                  </li>
                  <li>
                    <strong>Cyclical &amp; Airline Exits:</strong> With diesel fuel up 51% to $5.68/gal earlier in 2026, exited United Airlines (<span className="font-mono">UAL</span>, 794,795 sh / $108.1M) and Delta (<span className="font-mono">DAL</span>, $56.3M), and cut <span className="font-mono">CRH</span> (-71.21%) and Fluor (<span className="font-mono">FLR</span>, -26.39%).
                  </li>
                  <li>
                    <strong>$138.04M Gold Mining Basket (3.09% Weight):</strong> Bought near September spot gold lows ($3,850&ndash;$3,900/oz; $3,852 on Sept 10): Newmont (<span className="font-mono">NEM</span>, $43.88M), Barrick (<span className="font-mono">B</span>, $42.89M), Agnico Eagle (<span className="font-mono">AEM</span>, $42.35M), and Skeena Resources (<span className="font-mono">SKE</span>, $8.93M).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PILLAR 3: IDIOSYNCRATIC SECULAR ALPHA SLEEVES */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-slate-900 dark:text-white">
              Idiosyncratic Secular Alpha: Biotech/Precision Oncology, LatAm Reform, Bedding Consolidation, and On-Chain Perpetuals
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SLEEVE 1: BIOTECH */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-medium text-slate-950 dark:text-white flex items-center gap-2">
                    <Dna className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />
                    Precision Oncology &amp; Biotech (20 Lines)
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                    $1,853.28M (41.45%)
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>
                    &bull; <strong>Natera (<span className="font-mono">NTRA</span>, $1,306.34M / 29.22%):</strong> Built around ~$123.30&ndash;$132.81 average cost basis; cell-free DNA (cfDNA) <em>Signatera</em> <Jargon term="MRD" /> cancer test governed by Medicare/MolDX adoption rather than GDP or rates.
                  </li>
                  <li>
                    &bull; <strong>High-Conviction Clinical Peers:</strong> Insmed (<span className="font-mono">INSM</span>, $187.49M combined after trimming 23.3% of shares and 59.3% of calls following a +32% gain), Revolution Medicines (<span className="font-mono">RVMD</span>, +9.18% to $89.55M; up +132.1% over holding period), NewAmsterdam Pharma (<span className="font-mono">NAMS</span>, +9.35% to $81.65M).
                  </li>
                  <li>
                    &bull; <strong>Targeted Additions:</strong> Rhythm Pharmaceuticals (<span className="font-mono">RYTM</span>, +32.55% to $25.70M), Beam Therapeutics (<span className="font-mono">BEAM</span>, +355.53% to $17.11M), and re-initiated Humana (<span className="font-mono">HUM</span>, 65,220 sh / $24.89M).
                  </li>
                </ul>
              </div>

              {/* SLEEVE 2: LATAM & EM CONSUMER */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-medium text-slate-950 dark:text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />
                    LatAm Macro &amp; Asian E-Commerce
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#A8672E] dark:text-[#D08F52]">
                    $598.04M (13.38%)
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>
                    &bull; <strong>Latin America ($405.97M / 9.08%):</strong> Increased Argentine energy leader <span className="font-mono">YPF</span> by +12.84% to 3,541,897 ADS shares ($177.56M, #5 equity line).
                  </li>
                  <li>
                    &bull; <strong>Brazil &amp; Mexico Rebalancing:</strong> Shifted Brazil from leveraged calls to cash equities&mdash;holding $125.81M in <span className="font-mono">EWZ</span> shares while increasing protein producer <span className="font-mono">JBS</span> by +114.39% ($15.88M); trimmed Mexican discount grocer <span className="font-mono">TBBB</span> by -43.23% to $86.72M.
                  </li>
                  <li>
                    &bull; <strong>Asian E-Commerce ($192.07M / 4.30%):</strong> Boosted Sea Limited (<span className="font-mono">SE</span>) by +44.81% to $155.07M and held Coupang (<span className="font-mono">CPNG</span>) at $37.00M.
                  </li>
                </ul>
              </div>

              {/* SLEEVE 3: CONTRARIAN US BEDDING & HOUSING */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-medium text-slate-950 dark:text-white flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />
                    U.S. Bedding &amp; Manufactured Housing
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#A8672E] dark:text-[#D08F52]">
                    $132.75M (2.97%)
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>
                    &bull; <strong>Somnigroup International (<span className="font-mono">SGI</span>, $61.71M / 1.38%):</strong> Largest new non-tech equity initiation in Q3 (993,600 shares)&mdash;vertically integrated bedding powerhouse uniting Tempur Sealy, Mattress Firm, Dreams, and Leggett &amp; Platt.
                  </li>
                  <li>
                    &bull; <strong>Manufactured Homes &amp; Mortgage:</strong> Paired with Champion Homes (<span className="font-mono">SKY</span>, increased +45.91% to $31.81M), Cavco Industries (<span className="font-mono">CVCO</span>, $31.72M), and Rocket Companies (<span className="font-mono">RKT</span>, $7.51M).
                  </li>
                </ul>
              </div>

              {/* SLEEVE 4: ON-CHAIN PERPETUALS & CRYPTO */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-medium text-slate-950 dark:text-white flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />
                    On-Chain Perpetuals &amp; Digital Assets
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">
                    $94.01M (2.10%)
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li>
                    &bull; <strong>Hyperliquid Ecosystem (<Jargon term="PURR / HYPE" />):</strong> Held 2,941,500 shares of <span className="font-mono">PURR</span> ($36.09M), holding ~38.9M <span className="font-mono">HYPE</span> tokens on the Layer-1 blockchain generating &gt;$800M in annualized fees and ~$197.6M in annualized USDC reserve income.
                  </li>
                  <li>
                    &bull; <strong>Post-Q3 Private Venture Bridge (Oct 29, 2026):</strong> Co-invested alongside NYSE parent Intercontinental Exchange (<span className="font-mono">ICE</span>) in <span className="font-mono">trade[XYZ]</span> ($650B+ cumulative volume) to build a regulated 24/7 U.S. perpetual futures market; also held Bitdeer (<span className="font-mono">BTDR</span>, $39.67M) and Riot (<span className="font-mono">RIOT</span>, +19.98% to $18.25M).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ECHOES IN RECENT MARKET CONDITIONS (MID-NOVEMBER 2026 REALITY CHECK) */}
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white">
              Echoes in Recent Market Conditions: Mid-November 2026 Reality Check
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Evaluating Duquesne&apos;s September 30, 2026 snapshot across the subsequent 48 days through Tuesday, November 17, 2026&mdash;ahead of tomorrow&apos;s October FOMC minutes release (Wednesday, Nov 18 at 14:00 ET).
            </p>
          </div>

          {/* MACRO & BOND VIGILANTE TRACKER */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 space-y-4 font-mono text-xs sm:text-sm tabular-nums">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[#D08F52] border-b border-slate-800 pb-2">
              <span className="uppercase tracking-wider font-semibold">
                Q4 2026 Macro &amp; Monetary Timeline (Sept 16 &ndash; Nov 17, 2026)
              </span>
              <span>CME FedWatch &amp; Treasury Benchmarks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[11px]">OCT 27&ndash;28 FOMC HOLD</div>
                <div className="text-base font-semibold text-white mt-0.5">3.75% &ndash; 4.00%</div>
                <div className="text-[11px] text-slate-300 mt-1 font-sans">
                  10-2 vote (Cook &amp; Hammack dissented for +25 bps hike); Warsh called pause &ldquo;information-rich&rdquo; amid &ldquo;strong pace&rdquo; of expansion.
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Q3 GDP / OCT JOBS / CPI</div>
                <div className="text-base font-semibold text-[#D08F52] mt-0.5">3.4% GDP &bull; 4.1% U-3</div>
                <div className="text-[11px] text-slate-300 mt-1 font-sans">
                  Oct 29 GDP printed at 3.4%; Nov 6 jobs held at 4.1% unemployment; Nov 10 hot October CPI reinforced tightening.
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[11px]">TREASURY YIELDS (NOV 13)</div>
                <div className="text-base font-semibold text-[#E2694A] mt-0.5">10Y: 5.15% | 2Y: 4.88%</div>
                <div className="text-[11px] text-slate-300 mt-1 font-sans">
                  10Y rose from 4.2% (early 2026) and 4.7% (Aug 24 op-ed) past 5.15%; 2Y jumped +35 bps in a single week.
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400 text-[11px]">DEC 8&ndash;9 FOMC HIKE ODDS</div>
                <div className="text-base font-semibold text-[#3CBF9C] mt-0.5">92% (+25bp) &bull; 8% (+50bp)</div>
                <div className="text-[11px] text-slate-300 mt-1 font-sans">
                  As of 05:12 GMT Nov 17; The Conference Board projects rate hikes in both Dec 2026 and March 2027.
                </div>
              </div>
            </div>
          </div>

          {/* MULTI-POINT RANGE TRACKER: 2026 TREASURY YIELD ESCALATION */}
          <LevelLadder
            points={[
              { label: 'Early 2026 10Y', value: '4.20%', position: 9.4, tone: 'pos' },
              { label: 'Aug 24 WSJ Op-Ed', value: '4.70%', position: 40.6, tone: 'neutral' },
              { label: 'Nov 13 10Y Close', value: '5.15%', position: 68.8, tone: 'neg' },
              { label: '30Y Invoice Level', value: '5.50%', position: 90.6, tone: 'neg' },
            ]}
            caption="2026 U.S. long-end yield progression: from 4.20% at the start of the year through Druckenmiller's August 24 warning (4.70% 10Y) to 5.15% on November 13, approaching his 5.50% 30-year clearing-price 'invoice'."
          />

          {/* TWO-COLUMN REGIME CARD: VALIDATED TECH EXITS vs ACTIVE HOLDINGS STRESS-TEST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT: AVOIDED TECH DRAWDOWNS */}
            <div className="rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-[#11151E] p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="font-serif text-base font-medium text-[#1D8A70] dark:text-[#3CBF9C] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                  Protective Value of Q3 Exits (Late-Oct / Early-Nov Reset)
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C]" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Broad tech sell-offs hit on Oct 30, Nov 2, and Nov 5 (when the S&amp;P 500 fell <span className="font-mono tabular-nums">-4.4%</span> in a single day on AI valuation concerns):
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">SanDisk (SNDK &mdash; 100% Exited in Q3):</strong>{' '}
                  Plunged by <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">nearly two-thirds (~66.7%)</span> from its late-June peak after Duquesne sold all 34,900 shares ($79.4M).
                </li>
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">Alphabet (GOOGL &mdash; 100% Exited in Q3):</strong>{' '}
                  Slid <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">~30%</span> from its mid-May peak, including an <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">18% drop after September 30</span> (and -4.07% on Nov 16&ndash;17) amid negative Q3 FCF and its $17B Crusoe Wyoming AI data-center takeover.
                </li>
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">AMD (100% Exited in Q3):</strong>{' '}
                  Fell <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">-22%</span> from its October 6 closing high through November 16.
                </li>
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">Nvidia (NVDA &mdash; Avoided in Q2 &amp; Q3):</strong>{' '}
                  Dropped <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">~30%</span> from its October 6 record intraday high of <span className="font-mono tabular-nums">$243.37</span> to <span className="font-mono tabular-nums">~$162.86</span> by mid-November.
                </li>
              </ul>
            </div>

            {/* RIGHT: Q4 STRESS-TEST ON RETAINED HOLDINGS */}
            <div className="rounded-xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-white dark:bg-[#11151E] p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="font-serif text-base font-medium text-[#BC4128] dark:text-[#E2694A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                  Q4 Stress-Test Across Active Holdings (45-Day Lag Reality)
                </span>
                <AlertTriangle className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A]" />
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">Natera (NTRA &mdash; 29.22% Weight):</strong>{' '}
                  Fell <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">-27.7%</span> from its $413.31 Q3 close to <span className="font-mono tabular-nums font-semibold">$298.77</span> on Nov 16 (-31.7% from Oct high; -14.59% on Nov 6 to $310.67 and -6.37% on Nov 16) after a wider Q3 GAAP EPS loss (-$0.42 vs -$0.26 to -$0.28 est) and CEO transition, though still up <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">&gt;140%</span> above Duquesne&apos;s ~$123.30 cost basis.
                </li>
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">Seagate (STX &mdash; 9.07% Combined):</strong>{' '}
                  After Wedbush reiterated Outperform (<span className="font-mono tabular-nums">$1,000 PT</span>) on Oct 28, shares pulled back from $922.34 (9/30) toward <span className="font-mono tabular-nums">~$809</span> (-11.56% drawdown window alongside a +9.18% 5-day rebound Nov 6&ndash;13).
                </li>
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">SpaceX (SPCX &mdash; 0.68% Weight):</strong>{' '}
                  Following a Democratic sweep in the Nov midterms, Tesla and SpaceX lost &gt;$420B in combined value over two days on congressional probe fears; <span className="font-mono">SPCX</span> traded at <span className="font-mono tabular-nums">$135.00&ndash;$139.98</span> ($1.87T&ndash;$1.89T cap) on Nov 15&ndash;17 (-38.3% from $225.64 June 16 peak; -7.8% vs Q3 mark) as rival Anthropic targets a $1.0T&ndash;$1.3T IPO this week.
                </li>
                <li>
                  <strong className="font-mono text-slate-900 dark:text-white">Hyperliquid Strategies (PURR &mdash; 0.81% Weight):</strong>{' '}
                  After surging to $12.29 on Oct 29&ndash;30 (52-wk high $14.76), fell <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] font-semibold">~42%</span> from late Sept to <span className="font-mono tabular-nums">$8.16&ndash;$8.70</span> (Nov 13&ndash;16) amid $1.52B weekly crypto ETF outflows ($1.07B BTC, $398.85M ETH), MARA selling 13,597 BTC ($1.1B), and BTC dropping -13.6% to ~$65,006&mdash;even as underlying <span className="font-mono">HYPE</span> held at $66.00&ndash;$66.90 (&gt;180% YTD).
                </li>
              </ul>
            </div>
          </div>

          {/* DARK MONOSPACE PANEL: NATERA POST-EARNINGS MARK-TO-MARKET MATH */}
          <div className="rounded-xl bg-[#14171B] dark:bg-[#05070A] text-white p-5 sm:p-6 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[#D08F52] border-b border-slate-800 pb-2 font-mono text-xs sm:text-sm">
              <span className="uppercase tracking-wider font-semibold">
                Worked Example: Natera (NTRA) Q3 Operational Beat vs. Q4 Mark-to-Market Pullback
              </span>
              <span>Reported Nov 5, 2026</span>
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2 p-4 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs tabular-nums">
                <div className="text-[#3CBF9C] font-semibold uppercase tracking-wider mb-1">
                  Q3 Operational Strength (Nov 5 Release)
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>Q3 Revenue ($793.98M actual vs $707.54M est)</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right text-[#3CBF9C]">+$86.44M Beat (+34.1% YoY)</span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>Signatera MRD Tests (of 1,093,100 total tests)</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right">339,500 (+60.9% YoY)</span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>FY26 Revenue Guidance (+$140M midpoint raise)</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right">$3.005B&ndash;$3.035B</span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>Gross Margin (Non-GAAP / GAAP) &amp; Cash Flow</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right">63.2% / 64.7% (+$5.7M CF)</span>
                </div>
                <p className="border-t border-slate-800 pt-2.5 text-xs font-sans text-slate-300 leading-relaxed">
                  <span className="text-[#3CBF9C] font-mono">&rarr;</span> Sequential Signatera volume rose +32,700 tests while management reiterated 70%+ long-term gross margin and $2,000+ ASP targets.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs tabular-nums">
                <div className="text-[#E2694A] font-semibold uppercase tracking-wider mb-1">
                  GAAP EPS Miss &amp; Implied Duquesne Valuation Impact
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>Q3 GAAP / Adj EPS (R&amp;D $242.4M; smaller true-ups)</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right text-[#E2694A]">-$0.42 / -$0.39 (vs -$0.26 est)</span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>Share Price Delta ($298.77 Nov 16 &minus; $413.31 Sep 30)</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right text-[#E2694A]">-$114.54/sh (-27.71%)</span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline text-slate-300">
                  <span>Mark-to-Market on 3,160,666 sh ($1,306.34M &rarr; $944.31M)</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right text-[#E2694A]">-$362.03M Pullback</span>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-2.5 items-baseline pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Net Gain vs. ~$123.30 Avg Cost Basis</span>
                  <span className="text-[#D08F52]">=</span>
                  <span className="text-right text-[#3CBF9C]">+142.3% (+$175.47/sh)</span>
                </div>
                <p className="border-t border-slate-800 pt-2.5 text-xs font-sans text-slate-300 leading-relaxed">
                  <span className="text-[#3CBF9C] font-mono">&rarr;</span> R&amp;D expanded from $173.4M (Q3 2025) to $242.4M alongside smaller revenue true-ups ($32.3M vs $55.1M), compressing near-term GAAP EPS even as clinical volume accelerated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT INVESTORS CAN LEARN FROM DRUCKENMILLER'S RECENT BETS */}
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-950 dark:text-white">
              What Investors Can Learn from Druckenmiller&apos;s Recent Bets and Changes
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Five actionable institutional principles distilled from Duquesne&apos;s Q3 2026 repositioning and its 3-year track record (+223% cumulative / 47.8% annualized 13F return per HedgeFollow).
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11151E] shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-4 w-1/4">Strategic Principle</th>
                  <th className="py-3.5 px-4 w-1/3">Duquesne Q3 2026 Execution</th>
                  <th className="py-3.5 px-4">Actionable Takeaway for Investors in Late 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-serif font-medium text-slate-950 dark:text-white align-top">
                    Migrate Dynamically Along the AI S-Curve
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top font-mono text-xs tabular-nums">
                    Sold 94.5% of TSM, 47.9% of STM, and 100% of AMD, LRCX, ARM, and SNDK; boosted STX shares +180.2% (+$90.4M calls), bought WDC, TTMI, U (+435.5%), APP, and PLTR.
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top">
                    Do not treat &ldquo;AI&rdquo; as a static buy-and-hold monolith. Rotate toward physical bottlenecks with multi-year contract visibility (HAMR nearline storage through 2027&ndash;2028, advanced PCBs) and software platforms monetizing AI today.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-serif font-medium text-slate-950 dark:text-white align-top">
                    Enforce Free-Cash-Flow Discipline (Zero Ego)
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top font-mono text-xs tabular-nums">
                    Exited entire $120.2M GOOGL stake one quarter after doubling it (~$357 basis) as AI capex pushed Q3 FCF negative; also exited UAL ($108.1M) after tripling it in Q2 (~$128 basis).
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top">
                    With 72% LTM turnover and top-20 holdings averaging under 7 months (2.4 quarters overall), never anchor to cost basis. In a 5.15% 10-year yield environment, cut open-ended capex burners immediately and favor immediate FCF conversion (STX, AMZN).
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-serif font-medium text-slate-950 dark:text-white align-top">
                    Strip Out Index Beta When the &ldquo;Fed Put&rdquo; Fades
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top font-mono text-xs tabular-nums">
                    Cut call-option notional by 62.4% (-$534.6M), liquidating 100% of SPY, IWM, RSP, and EWZ call options ahead of Q4 rate volatility.
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top">
                    Under a Kevin Warsh Fed that has dropped forward guidance and is hiking into 3.4% GDP growth and sticky inflation, leveraged index beta is vulnerable. Replace broad index calls with idiosyncratic alpha (NTRA, RVMD) and gold miners (NEM, B, AEM).
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-serif font-medium text-slate-950 dark:text-white align-top">
                    Pair High-Conviction Concentration with Strict Sizing Caps
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top font-mono text-xs tabular-nums">
                    Concentrated 70.66% in top 10 issuers (NTRA at 29.22%, STX at 9.07%), while capping richly valued SPCX at 0.68% and PLTR at 0.34%.
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top">
                    Outperformance stems from letting secular winners compound into 10%&ndash;30% weights while keeping high-multiple, money-losing IPOs (SPCX at ~115x sales and -$4.94B FY25 net loss) as disciplined sub-1% starter positions.
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-4 font-serif font-medium text-slate-950 dark:text-white align-top">
                    Account for 13F Blind Spots and the 45-Day Lag
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top font-mono text-xs tabular-nums">
                    Q3 13F reflects Sept 30 holdings; since then, NTRA fell 27.7% after Nov 5 earnings and PURR fell ~42% from late Sept, while private trade[XYZ] equity was bought Oct 29.
                  </td>
                  <td className="py-4 px-4 text-slate-700 dark:text-slate-300 align-top">
                    Never blindly clone a delayed 13F headline. Evaluate whether post-quarter pullbacks offer a lower entry price than the Sept 30 mark (e.g., NTRA at $298.77 vs $413.31), and remember short positions (such as short long-dated Treasuries) are invisible on Form 13F.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TWO-COLUMN BARBELL BLUEPRINT SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-white dark:bg-[#11151E] p-5 space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                Fiscal Dominance Barbell &mdash; Left Wing (41.45% + 9.90%)
              </div>
              <div className="font-serif text-lg text-slate-950 dark:text-white">
                Non-Correlated Biotech &amp; Contracted AI Bottlenecks
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1">
                <li>&bull; <strong>Clinical Diagnostics &amp; Oncology ($1.85B):</strong> <span className="font-mono">NTRA</span>, <span className="font-mono">INSM</span>, <span className="font-mono">RVMD</span>, <span className="font-mono">NAMS</span>&mdash;revenues driven by Signatera volume (+60.9% YoY) and trial readouts rather than 10-year yields.</li>
                <li>&bull; <strong>Supply-Constrained AI Storage ($442.4M):</strong> <span className="font-mono">STX</span> and <span className="font-mono">WDC</span>&mdash;47% gross margins, 0.53x PEG, and build-to-order nearline exabyte contracts locked through 2027&ndash;2028.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 bg-white dark:bg-[#11151E] p-5 space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current shrink-0" />
                Fiscal Dominance Barbell &mdash; Right Wing (12.17% + Cash Flow)
              </div>
              <div className="font-serif text-lg text-slate-950 dark:text-white">
                Hard-Asset Debasement Hedges &amp; Real-Economy Cash Flow
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1">
                <li>&bull; <strong>Precious-Metals Miners ($138.0M):</strong> <span className="font-mono">NEM</span>, <span className="font-mono">B</span>, <span className="font-mono">AEM</span>, <span className="font-mono">SKE</span>&mdash;direct operating leverage to sovereign debt debasement as national debt crosses $40T.</li>
                <li>&bull; <strong>LatAm Commodities &amp; Cash Leaders:</strong> <span className="font-mono">YPF</span> ($177.6M), <span className="font-mono">EWZ</span> ($125.8M), <span className="font-mono">JBS</span> ($15.9M), <span className="font-mono">FOXA</span>/<span className="font-mono">FOX</span> ($226.5M), and <span className="font-mono">CDW</span> ($105.8M) generating resilient real-asset cash flows.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
