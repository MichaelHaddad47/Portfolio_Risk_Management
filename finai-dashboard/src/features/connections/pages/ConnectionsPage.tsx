import { useState } from "react"
import PageShell from "../../../components/layout/PageShell"

interface ConnectedPlatform {
	id: string
	name: string
	status: "connected" | "syncing" | "stale" | "needs_attention"
	lastSync: string
	accounts: number
	dataTypes: string[]
	category: string
}

interface AvailableIntegration {
	id: string
	name: string
	category: string
	description: string
	popular?: boolean
}

const sampleConnectedPlatforms: ConnectedPlatform[] = [
	{
		id: "rh1",
		name: "Robinhood",
		status: "connected",
		lastSync: "2 minutes ago",
		accounts: 1,
		dataTypes: ["holdings", "balances", "transactions"],
		category: "Brokerage",
	},
	{
		id: "cb1",
		name: "Coinbase",
		status: "connected",
		lastSync: "5 minutes ago",
		accounts: 2,
		dataTypes: ["holdings", "balances"],
		category: "Exchange",
	},
	{
		id: "fd1",
		name: "Fidelity",
		status: "stale",
		lastSync: "2 hours ago",
		accounts: 1,
		dataTypes: ["holdings", "balances"],
		category: "Brokerage",
	},
	{
		id: "wallet1",
		name: "MetaMask Wallet",
		status: "connected",
		lastSync: "Just now",
		accounts: 3,
		dataTypes: ["holdings"],
		category: "Wallet",
	},
]

const availableIntegrations: AvailableIntegration[] = [
	{ id: "rh", name: "Robinhood", category: "Brokerage", description: "Stocks & Crypto", popular: true },
	{ id: "cb", name: "Coinbase", category: "Exchange", description: "Crypto", popular: true },
	{ id: "etrade", name: "E*TRADE", category: "Brokerage", description: "Stocks & ETFs" },
	{ id: "fidelity", name: "Fidelity", category: "Brokerage", description: "Comprehensive" },
	{ id: "kraken", name: "Kraken", category: "Exchange", description: "Crypto" },
	{ id: "ledger", name: "Ledger", category: "Wallet", description: "Hardware Wallet" },
]

const statusPill = (status: string) => {
	switch (status) {
		case "connected":
			return "text-green-300 bg-green-500/10 border border-green-500/20"
		case "syncing":
			return "text-blue-300 bg-blue-500/10 border border-blue-500/20"
		case "stale":
			return "text-amber-300 bg-amber-500/10 border border-amber-500/20"
		case "needs_attention":
			return "text-red-300 bg-red-500/10 border border-red-500/20"
		default:
			return "text-zinc-400 bg-zinc-500/10 border border-zinc-500/20"
	}
}

export default function ConnectionsPage() {
	const [expandedId, setExpandedId] = useState<string | null>(null)
	const [showConnectModal, setShowConnectModal] = useState(false)

	const connectedCount = sampleConnectedPlatforms.filter((p) => p.status === "connected").length
	const needsAttention = sampleConnectedPlatforms.filter((p) => p.status === "stale" || p.status === "needs_attention").length

	return (
		<PageShell title="Connections">
			{/* Header */}
			<div className="flex items-baseline justify-between mb-8">
				<div>
					<h1 className="text-3xl font-light tracking-tight text-white mb-2">Connections</h1>
					<p className="text-sm text-zinc-400">Manage your linked accounts and data sources</p>
				</div>
				<button
					onClick={() => setShowConnectModal(true)}
					className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
				>
					Add Connection
				</button>
			</div>

			{/* Two-Column Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column: Connected Accounts */}
				<div className="lg:col-span-2 space-y-8">
					{/* Connected Accounts Section */}
					<section>
						<div className="flex items-baseline justify-between mb-4">
							<h2 className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Connected Accounts</h2>
							<span className="text-xs text-zinc-500">{connectedCount} active</span>
						</div>

						<div className="rounded-lg border border-zinc-800/50 overflow-hidden">
							{sampleConnectedPlatforms.length > 0 ? (
								<div className="divide-y divide-zinc-800/30">
									{sampleConnectedPlatforms.map((platform) => (
										<div
											key={platform.id}
											className="px-6 py-4 hover:bg-zinc-900/50 transition-colors"
										>
											<div className="flex items-start justify-between gap-4">
												{/* Left: Logo Area + Info */}
												<div className="flex gap-4 flex-1 min-w-0">
													{/* Logo Placeholder */}
													<div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-300">
														{platform.name.slice(0, 2).toUpperCase()}
													</div>

													{/* Content */}
													<div className="flex-1 min-w-0">
														<h3 className="text-sm font-medium text-white mb-1">{platform.name}</h3>
														<p className="text-xs text-zinc-500 mb-2">
															{platform.category} • {platform.accounts} account{platform.accounts > 1 ? "s" : ""} • Synced {platform.lastSync}
														</p>

														{/* Expandable Details */}
														{expandedId === platform.id && (
															<div className="mt-3 pt-3 border-t border-zinc-800/50 space-y-3">
																<div>
																	<p className="text-xs text-zinc-600 uppercase tracking-wide mb-2">Data Available</p>
																	<div className="flex flex-wrap gap-2">
																		{platform.dataTypes.map((type) => (
																			<span
																				key={type}
																				className="text-xs px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded"
																			>
																				{type}
																			</span>
																		))}
																	</div>
																</div>
																<div className="flex gap-2 pt-2">
																	<button className="text-xs px-3 py-1.5 border border-zinc-700/50 rounded hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors">
																		Sync Now
																	</button>
																	<button className="text-xs px-3 py-1.5 border border-zinc-700/50 rounded hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors">
																		Manage
																	</button>
																	<button className="text-xs px-3 py-1.5 border border-red-500/20 text-red-300 rounded hover:border-red-500/40 hover:bg-red-500/5 transition-colors">
																		Disconnect
																	</button>
																</div>
															</div>
														)}
													</div>
												</div>

												{/* Right: Status + Toggle */}
												<div className="flex items-center gap-4 flex-shrink-0">
													<span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium ${statusPill(platform.status)}`}>
														{platform.status === "connected" ? "Connected" : platform.status === "stale" ? "Stale" : "Issue"}
													</span>
													<button
														onClick={() => setExpandedId(expandedId === platform.id ? null : platform.id)}
														className="text-zinc-400 hover:text-zinc-300 transition-colors"
													>
														{expandedId === platform.id ? "−" : "+"}
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="px-6 py-12 text-center text-zinc-500 text-sm">
									No connected accounts yet. Add your first connection to get started.
								</div>
							)}
						</div>
					</section>

					{/* Available Integrations */}
					<section>
						<h2 className="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">Available Integrations</h2>

						<div className="grid grid-cols-2 gap-4">
							{availableIntegrations.map((integration) => {
								const isConnected = sampleConnectedPlatforms.some((p) => p.name.toLowerCase() === integration.name.toLowerCase())
								return (
									<div
										key={integration.id}
										className="border border-zinc-800/50 rounded-lg p-4 hover:border-zinc-700/50 hover:bg-zinc-900/30 transition-colors"
									>
										{/* Logo Area */}
										<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300 mb-3">
											{integration.name.slice(0, 2).toUpperCase()}
										</div>

										<h3 className="text-sm font-medium text-white mb-1">{integration.name}</h3>
										<p className="text-xs text-zinc-500 mb-3">{integration.description}</p>

										{integration.popular && (
											<p className="text-xs text-blue-300 mb-3">★ Popular</p>
										)}

										{isConnected ? (
											<div className="text-xs px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-300 rounded text-center font-medium">
												Connected
											</div>
										) : (
											<button className="w-full text-xs px-3 py-1.5 border border-zinc-700/50 rounded hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors">
												Connect
											</button>
										)}
									</div>
								)
							})}
						</div>
					</section>
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* Connection Status */}
					<section className="rounded-lg border border-zinc-800/50 p-6 bg-black/20">
						<h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">Status</h3>

						<div className="space-y-3">
							<div className="flex items-start gap-2">
								<div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
								<div>
									<p className="text-sm text-white font-medium">All Healthy</p>
									<p className="text-xs text-zinc-500 mt-0.5">{connectedCount} active connections</p>
								</div>
							</div>

							{needsAttention > 0 && (
								<div className="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded">
									<div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></div>
									<div>
										<p className="text-xs text-amber-200 font-medium">{needsAttention} needs attention</p>
									</div>
								</div>
							)}
						</div>

						<div className="mt-6 space-y-2">
							<button className="w-full text-xs px-3 py-2 border border-zinc-700/50 rounded hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors">
								Sync All
							</button>
							<button className="w-full text-xs px-3 py-2 border border-zinc-700/50 rounded hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors">
								Reauthenticate
							</button>
						</div>
					</section>

					{/* Permissions */}
					<section className="rounded-lg border border-zinc-800/50 p-6 bg-black/20">
						<h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">Permissions</h3>

						<div className="space-y-3 text-xs">
							<div className="flex items-start gap-2">
								<span className="text-green-400 font-bold mt-0.5">✓</span>
								<div>
									<p className="text-white font-medium">Read Holdings</p>
									<p className="text-zinc-500 mt-0.5">Access portfolio</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<span className="text-green-400 font-bold mt-0.5">✓</span>
								<div>
									<p className="text-white font-medium">Read Transactions</p>
									<p className="text-zinc-500 mt-0.5">View history</p>
								</div>
							</div>

							<div className="flex items-start gap-2">
								<span className="text-zinc-600 font-bold mt-0.5">−</span>
								<div>
									<p className="text-zinc-400 font-medium">Execute Trades</p>
									<p className="text-zinc-600 mt-0.5">Not enabled</p>
								</div>
							</div>
						</div>
					</section>

					{/* Security */}
					<section className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6">
						<h3 className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-3">Security</h3>
						<p className="text-xs text-blue-200 leading-relaxed">
							All connections use industry-standard encryption. We never store your login credentials.
						</p>
					</section>
				</div>
			</div>

			{/* Add Connection Modal */}
			{showConnectModal && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-lg">
						<h2 className="text-lg font-medium text-white mb-6">Add Connection</h2>

						<div className="grid grid-cols-2 gap-3 mb-6 max-h-64 overflow-y-auto">
							{availableIntegrations.map((integration) => (
								<button
									key={integration.id}
									className="p-4 border border-zinc-700/50 rounded-lg hover:border-zinc-600 hover:bg-zinc-800/50 transition-colors text-center"
								>
									<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 mx-auto mb-2">
										{integration.name.slice(0, 2).toUpperCase()}
									</div>
									<p className="text-xs font-medium text-white">{integration.name}</p>
									<p className="text-xs text-zinc-500 mt-1">{integration.category}</p>
								</button>
							))}
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => setShowConnectModal(false)}
								className="flex-1 px-4 py-2 text-sm border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
							>
								Cancel
							</button>
							<button className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
								Continue
							</button>
						</div>
					</div>
				</div>
			)}
		</PageShell>
	)
}
