type Props = {
	report: any
}

export default function RiskConcentrationCard({ report }: Props) {
	const conc = report.risk_concentration

	return (
		<div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
			<h3 className="text-xs font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Risk Contributors</h3>
			<div className="space-y-3">
				{conc.top_contributors.map((item: any, idx: number) => (
					<div key={idx}>
						<div className="flex justify-between mb-1">
							<span className="text-sm text-white">{item.ticker}</span>
							<span className="text-xs font-bold text-zinc-300">{item.risk_contribution_pct.toFixed(1)}%</span>
						</div>
						<div className="w-full bg-zinc-700/50 rounded-full h-1 overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
								style={{ width: `${item.risk_contribution_pct}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
