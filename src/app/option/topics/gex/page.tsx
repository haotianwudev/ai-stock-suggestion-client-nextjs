import { Metadata } from 'next';
import OptionsTabClient from '../../[tab]/client';

export const metadata: Metadata = {
  title: 'Gamma Exposure (GEX) | Options Education | SOPHIE\'s Daddy Quant Blog',
  description: 'Understanding how market makers\' gamma exposure influences market volatility and price movements, creating predictable trading patterns.',
  keywords: 'gamma exposure, GEX, market makers, options trading, volatility, gamma hedging, market structure',
  openGraph: {
    title: 'Gamma Exposure (GEX) | Options Education',
    description: 'Understanding how market makers\' gamma exposure influences market volatility and price movements, creating predictable trading patterns.',
    type: 'article',
    siteName: 'SOPHIE\'s Daddy Quant Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamma Exposure (GEX) | Options Education',
    description: 'Understanding how market makers\' gamma exposure influences market volatility and price movements, creating predictable trading patterns.',
    site: '@sophies_daddy',
  },
};

export default function GEXPage() {
  return <OptionsTabClient tab="topics" subtopic="gex" />;
}