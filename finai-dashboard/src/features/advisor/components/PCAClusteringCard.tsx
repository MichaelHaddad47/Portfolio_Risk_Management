import { useState } from "react"

type Props = {
	report: any
}

export default function PCAClusteringCard({ report }: Props) {
	const pca = report.pca_clustering
	const [expandedCluster, setExpandedCluster] = useState<string | null>(null)

	return (
		<div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-6">
			<div>
				<h3 className="text-sm font-semibold text-zinc-100 mb-2">🧠 AI Pattern Recognition</h3>
				<p className="text-xs text-zinc-400">
					Machine learning analysis of your portfolio's hidden risk factors and behavioral patterns.
				</p>
			</div>

			{/* PCA Explanation */}
			<div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
				<h4 className="text-xs font-semibold text-blue-200 mb-2">📊 Principal Component Analysis (PCA)</h4>
				<p className="text-xs text-blue-300 mb-2">
					PCA identifies the main "invisible hands" pushing your portfolio. These are the dominant market factors:
				</p>
				<div className="space-y-2">
					{pca.explained_variance.map((variance: number, idx: number) => (
						<div key={idx} className="flex items-center gap-2">
							<span className="text-xs text-zinc-400 w-12 font-medium">Factor {idx + 1}</span>
							<div className="flex-1 bg-zinc-800 rounded h-2">
								<div
									className="h-2 rounded bg-blue-500"
									style={{ width: `${variance * 100}%` }}
								/>
							</div>
							<span className="text-xs font-medium text-zinc-100 w-14 text-right">
								{(variance * 100).toFixed(1)}%
							</span>
						</div>
					))}
				</div>
				<p className="text-xs text-blue-300 mt-3">
					The first factor explains {(pca.explained_variance[0] * 100).toFixed(1)}% of all portfolio movement. Higher
					percentage = simpler portfolio.
				</p>
			</div>

			{/* Clustering Explanation */}
			<div className="bg-purple-900/20 border border-purple-800 rounded-lg p-3">
				<h4 className="text-xs font-semibold text-purple-200 mb-2">🔗 Asset Clustering</h4>
				<p className="text-xs text-purple-300 mb-3">
					Assets grouped by behavior similarity. Similar groups move together and behave predictably.
				</p>
				<div className="space-y-2">
					{Object.entries(pca.clusters).map(([clusterId, assets]: any) => (
						<div key={clusterId} className="bg-zinc-800/50 rounded">
							<button
								onClick={() =>
									setExpandedCluster(
										expandedCluster === clusterId ? null : clusterId
									)
								}
								className="w-full text-left p-2 hover:bg-zinc-700/50 transition flex justify-between items-center"
							>
								<p className="text-xs font-medium text-zinc-300">
									Group {clusterId} ({assets.length} assets)
								</p>
								<span className="text-xs">
									{expandedCluster === clusterId ? "▼" : "▶"}
								</span>
							</button>
							{expandedCluster === clusterId && (
								<div className="p-2 border-t border-zinc-700">
									<div className="flex flex-wrap gap-1 mb-2">
										{assets.map((asset: string) => (
											<span
												key={asset}
												className="text-xs bg-purple-700 text-purple-200 px-2 py-1 rounded"
											>
												{asset}
											</span>
										))}
									</div>
									<p className="text-xs text-zinc-400">
										These assets tend to move together. If one drops, others likely will too.
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Key Insight */}
			<div className="bg-green-900/20 border border-green-800 rounded-lg p-3">
				<p className="text-xs text-green-200">
					💡 <strong>Insight:</strong> If all your assets are in one cluster, you lack true diversification. Aim for assets
					spread across multiple clusters.
				</p>
			</div>
		</div>
	)
}
