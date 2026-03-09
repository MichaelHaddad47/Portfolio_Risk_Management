type Props = {
	report: any
}

export default function CorrelationCard({ report }: Props) {
	const corr = report.correlation_analysis

	return (
		<div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
			<h3 className="text-xs font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Correlation</h3>
			<div className="space-y-3">
				<div>
					<p className="text-xs text-zinc-400 mb-2">Average Pairwise</p>
					<p className="text-2xl font-bold text-white">{corr.average_pairwise_correlation.toFixed(2)}</p>
				</div>
				<p className="text-xs text-zinc-300 italic">{corr.assessment}</p>
			</div>
		</div>
	)
}
