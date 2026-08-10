'use client';

import { ArticleFrame } from '@/components/articles/article-frame';

// --- CONTENT DATA (summary extracted for web) ---
const contentData = {
	parts: [
		{
			partTitle: 'Part I: The Strategic Mandate of the Hedge Fund CTO',
			sections: [
				{
					id: 'p1s1',
					title: "Section 1: Architect of Alpha: The CTO's Role in a Small Fund",
					content: [
						'The function of a modern hedge fund CTO is not a support role but a direct driver of competitive advantage and profitability. Within the lean structure of a small firm, the CTO\'s influence is amplified, demanding a unique blend of hands-on technical prowess, strategic business acumen, and leadership.',
						"In a small hedge fund, the CTO operates as a 'player-coach,' actively designing, building, and maintaining the stack while leading the team.",
						"Decisions carry outsized impact: platform choices and early architecture set the trajectory for scalability and institutional readiness.",
						'The CTO is pivotal in capital raising due diligence, articulating technology strategy, security posture, and operational resilience.',
						'Continuously optimize workflows across research → execution → post-trade to ensure auditability, security, and resilience.'
					],
					table: {
						headers: ['Responsibility Area', 'Small Fund CTO (Player-Coach)', 'Large Fund CTO (Delegator/Specialist)'],
						rows: [
							['Strategic Planning', 'Develops and executes strategy; often writes the first version of the code.', 'Sets high-level vision; delegates implementation to specialized teams.'],
							['Team Management', 'Directly manages, mentors, and codes with generalists.', 'Manages managers and specialists; less direct involvement.'],
							['Hands-on Involvement', 'Extremely high; lead architect and problem-solver.', 'Lower; focus on management and budgets.'],
							['Budgetary Control', 'Constrained budget with high marginal impact per dollar.', 'Large, complex budgets with finance support.'],
							['Vendor Management', 'Directly negotiates a few critical vendors.', 'Oversees procurement across many vendors.'],
							['Investor Engagement', 'Direct role in diligence and capital raising.', 'Rare direct investor interaction.'],
							['Risk of Failure', 'High; a single bad choice can be existential.', 'Distributed across many layers of redundancy.']
						]
					}
				},
				{
					id: 'p1s2',
					title: 'Section 2: The Build, Buy, or Outsource Calculus',
					content: [
						"Build offers bespoke edge but is capital- and time-intensive and creates key-person risk.",
						"Buy accelerates time-to-market; CTO becomes integrator and procurement lead (e.g., OEMS).",
						'Outsource operationally critical but non-differentiating functions (Managed IT, CISOaaS).',
						"Winning model: build the 'secret sauce', buy institutional platforms, outsource commodity IT."
					]
				}
			]
		},
		{
			partTitle: 'Part II: Core Technical Knowledge Base',
			sections: [
				{
					id: 'p2s4',
					title: 'Section 4: Anatomy of a Mid-Frequency Trading System',
					content: [
						'A modern MFT platform spans pre-trade research and checks, at-trade execution (data normalization → strategy engine → OMS/EMS), and post-trade capture, reconciliation, and settlement.',
						'Reconciliation engine and a single source of truth via MDM + messaging bus are essential.'
					]
				},
				{
					id: 'p2s5',
					title: 'Section 5: The Modern Quantitative Technology Stack',
					content: [
						"Bilingual stack: Python for research/analytics; C++/Rust for execution hotpaths.",
						'Time-series storage: kdb+ or TimeScaleDB for massive ordered data.',
					],
					table: {
						headers: ['Functional Area', 'Primary Technology', 'Key Considerations/Rationale'],
						rows: [
							['Strategy Research & Backtesting', 'Python (Pandas, NumPy, scikit-learn, VectorBT)', 'High productivity and ecosystem.'],
							['Core Trading Engine & Execution', 'C++, Rust', 'Low-latency hotpath.'],
							['Market Data Handling', 'C++, FPGA', 'High throughput/low latency feed handling.'],
							['Time-Series Data Storage', 'kdb+, TimeScaleDB', 'Optimized for ticks/bars.'],
							['Risk & Portfolio Management', 'Python/Java/C# or vendor', 'Mix of in-house and vendor.'],
							['UI/Dashboards', 'React web or C# (XAML)', 'Real-time positions/P&L/risk.']
						]
					}
				},
				{
					id: 'p2s6',
					title: 'Section 6: Infrastructure: Performance and Security',
					content: [
						'On-prem: ultimate control/latency (co-lo) but high CapEx.',
						'Cloud: elastic OpEx for research/backtests; higher network latency.',
						'Hybrid: latency-sensitive on-prem; research in cloud for cost-efficient scale.'
					],
					table: {
						headers: ['Decision Factor', 'On-Premise', 'Public Cloud', 'Hybrid Cloud'],
						rows: [
							['Performance/Latency', 'Highest; co-lo', 'Higher; network dependent', 'Low latency for execution; elastic research'],
							['Scalability & Agility', 'Low; slow scale', 'High; minutes to scale', 'High via cloud elasticity'],
							['Security & Control', 'Max control', 'Shared responsibility', 'Balanced control'],
							['Upfront Cost (CapEx)', 'Very high', 'Very low', 'Moderate'],
							['Ongoing Cost (OpEx)', 'Maintenance, power, staff', 'Subscription; can grow', 'Optimized via bursts']
						]
					}
				},
				{
					id: 'p2s7',
					title: 'Section 7: Data and Connectivity: The Lifeblood',
					content: [
						'Direct exchange feeds for lowest latency vs. consolidated vendor feeds.',
						'The FIX protocol is the universal standard; robust FIX engine signals operational maturity.'
					]
				}
			]
		}
	]
};

// --- REUSABLE COMPONENTS ---
const Table = ({ data }: { data: any }) => {
	if (!data || !data.headers || !data.rows) return null;
	return (
		<div className="mt-8 flow-root">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-100">
								<tr>
									{data.headers.map((header: string, index: number) => (
										<th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{header}</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white dark:bg-[#0A0D14]">
								{data.rows.map((row: string[], rowIndex: number) => (
									<tr key={rowIndex}>
										{row.map((cell: string, cellIndex: number) => (
											<td key={cellIndex} className="whitespace-normal px-6 py-4 text-sm text-gray-600 align-top">{cell}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

const ContentSection = ({ section }: { section: any }) => (
	<div id={section.id} className="mb-16 scroll-mt-24">
		<h3 className="text-3xl font-bold text-gray-800 border-b border-[#A8672E] dark:border-[#D08F52] pb-3 mb-6 font-serif">{section.title}</h3>
		<div className="space-y-4 text-lg text-gray-700 leading-relaxed">
			{section.content.map((paragraph: string, index: number) => (
				<p key={index}>{paragraph}</p>
			))}
		</div>
		{section.table && <Table data={section.table} />}
	</div>
);

export default function Page() {
	return (
		<ArticleFrame slug="small-hedge-fund-cto-technology-leadership-quant-trading">
			{contentData.parts.map((part: any, partIndex: number) => (
				<div key={partIndex} className="mb-12">
					<h2 className="text-sm font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-widest mb-8 pb-2 border-b-2 border-teal-200 font-serif">{part.partTitle}</h2>
					{part.sections.map((section: any) => (
						<ContentSection key={section.id} section={section} />
					))}
				</div>
			))}
		</ArticleFrame>
	);
}
