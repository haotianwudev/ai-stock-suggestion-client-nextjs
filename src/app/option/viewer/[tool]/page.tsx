import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import OptionsTabClient from '../../[tab]/client';

/**
 * Per-tool URLs for the Options Viewer's three tools.
 *
 * The default tool ('chain') deliberately has NO route here: it lives at the bare
 * /option/viewer, handled by the [tab] route. Giving it a second URL would serve identical
 * content from two paths, so /option/viewer/chain permanently redirects there instead.
 */
const validTools = ['builder', 'vrp'] as const;

const metadataMap: Record<string, Metadata> = {
  builder: {
    title: 'SPX Payoff Builder',
    description:
      'Build any multi-leg SPX position from a real option chain — presets, net Greeks, solved implied volatility, probability of profit, and a today-vs-expiration payoff comparison.',
    keywords: [
      'SPX payoff builder',
      'options payoff diagram',
      'multi-leg options',
      'net greeks',
      'probability of profit',
      'options strategy builder',
    ],
  },
  vrp: {
    title: 'VRP Research',
    description:
      'Variance risk premium research for SPX: the daily volatility regime, implied versus realized volatility, VIX distribution analysis, and a non-overlapping harvest backtest with selectable holding periods.',
    keywords: [
      'variance risk premium',
      'VRP',
      'volatility regime',
      'implied vs realized volatility',
      'VIX',
      'short volatility backtest',
    ],
  },
};

export function generateStaticParams() {
  return validTools.map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const base = metadataMap[tool];
  if (!base) return {};

  // `title` is left bare: the root layout applies template "%s | SOPHIE Daddy Quant Blog",
  // so appending a suffix here would render it twice. og/twitter titles bypass the template
  // and so carry the brand explicitly.
  const fullTitle = `${base.title} | SOPHIE Daddy Quant Blog`;
  return {
    ...base,
    openGraph: {
      title: fullTitle,
      description: base.description ?? undefined,
      url: `https://www.sophie-ai-finance.com/option/viewer/${tool}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: base.description ?? undefined,
      site: '@sophies_daddy',
    },
    alternates: {
      canonical: `https://www.sophie-ai-finance.com/option/viewer/${tool}`,
    },
  };
}

export default async function OptionsViewerToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;

  // The default tool has a canonical home at /option/viewer. 308 rather than 307 so any link
  // that reaches this alias consolidates onto the canonical URL instead of splitting signal
  // across two paths serving identical content.
  if (tool === 'chain') permanentRedirect('/option/viewer');

  if (!validTools.includes(tool as (typeof validTools)[number])) {
    notFound();
  }

  return <OptionsTabClient tab="viewer" tool={tool} />;
}
