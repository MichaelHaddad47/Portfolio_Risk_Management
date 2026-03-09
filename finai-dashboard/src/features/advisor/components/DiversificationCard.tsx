type Props = {
	report: any
}

export default function DiversificationCard({ report }: Props) {
	const div = report.diversification
	const score = div.diversification_score

	return (
		<div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
			<h3 className="text-xs font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Diversification</h3>
			<div className="space-y-3">
				<div>
					<div className="flex justify-between mb-2">
						<span className="text-sm text-zinc-400">Score</span>
						<span className="text-sm font-bold text-white">{score.toFixed(0)}/100</span>
					</div>
					<div className="w-full bg-zinc-700/50 rounded-full h-1.5 overflow-hidden">
						<div
							className={`h-full rounded-full transition ${
								score > 70 ? "bg-green-500" : score > 50 ? "bg-yellow-500" : "bg-red-500"
							}`}
							style={{ width: `${Math.min(score, 100)}%` }}
						/>
					</div>
				</div>
				<div className="flex justify-between text-sm pt-2 border-t border-zinc-700">
					<span className="text-zinc-400">Effective Assets</span>
					<span className="font-medium text-white">{div.effective_number_of_assets.toFixed(1)}/{div.actual_number_of_assets}</span>
				</div>
			</div>
		</div>
	)
}
