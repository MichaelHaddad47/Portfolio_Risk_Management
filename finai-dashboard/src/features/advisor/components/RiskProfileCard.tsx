type Props = {
	report: any
}

export default function RiskProfileCard({ report }: Props) {
	const alignment = report.risk_alignment
	const isAligned = alignment.status === "aligned"

	return (
		<div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
			<h3 className="text-xs font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Risk Profile</h3>
			<div className="space-y-3 text-sm">
				<div className="flex justify-between">
					<span className="text-zinc-400">Classification</span>
					<span className="font-medium text-white capitalize">{report.portfolio_risk_classification}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">Volatility</span>
					<span className="font-medium text-white">{(report.volatility * 100).toFixed(2)}%</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">Max Drawdown</span>
					<span className="font-medium text-red-400">{(report.max_drawdown * 100).toFixed(2)}%</span>
				</div>
				<div className="flex justify-between">
					<span className="text-zinc-400">Sharpe Ratio</span>
					<span className="font-medium text-green-400">{report.sharpe_ratio.toFixed(2)}</span>
				</div>
			</div>
			<div className={`mt-4 pt-3 border-t ${isAligned ? "border-green-500/30" : "border-yellow-500/30"}`}>
				<p className={`text-xs font-medium ${isAligned ? "text-green-400" : "text-yellow-400"}`}>
					{isAligned ? "✓ Aligned" : "⚠ Misaligned"}
				</p>
			</div>
		</div>
	)
}
