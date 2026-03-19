import { useState } from "react"
import PageShell from "../../../components/layout/PageShell"

interface Alert {
	id: string
	title: string
	type: "price" | "portfolio" | "risk" | "diversification" | "volatility" | "connection"
	asset?: string
	condition: string
	threshold?: string
	status: "active" | "paused" | "triggered"
	priority: "low" | "medium" | "high"
	deliveryMethods: ("email" | "push" | "in-app")[]
	lastTriggered?: string
	createdAt: string
}

interface TriggeredAlert {
	id: string
	title: string
	severity: "info" | "warning" | "critical"
	message: string
	asset?: string
	timestamp: string
	delivered: boolean
}

const sampleAlerts: Alert[] = [
	{
		id: "1",
		title: "BTC Price Target",
		type: "price",
		asset: "BTC",
		condition: "Falls below",
		threshold: "$58,000",
		status: "active",
		priority: "high",
		deliveryMethods: ["email", "in-app"],
		lastTriggered: "2 hours ago",
		createdAt: "2026-02-15",
	},
	{
		id: "2",
		title: "Tech Concentration Limit",
		type: "diversification",
		condition: "Exceeds",
		threshold: "65%",
		status: "active",
		priority: "medium",
		deliveryMethods: ["in-app"],
		createdAt: "2026-02-10",
	},
	{
		id: "3",
		title: "Portfolio Risk Score",
		type: "risk",
		condition: "Rises above",
		threshold: "75",
		status: "paused",
		priority: "high",
		deliveryMethods: ["email", "push", "in-app"],
		createdAt: "2026-02-01",
	},
	{
		id: "4",
		title: "NVDA Volatility Spike",
		type: "volatility",
		asset: "NVDA",
		condition: "Unusual movement detected",
		status: "active",
		priority: "high",
		deliveryMethods: ["in-app"],
		createdAt: "2026-02-18",
	},
]

const sampleTriggeredAlerts: TriggeredAlert[] = [
	{
		id: "t1",
		title: "BTC crossed below target",
		severity: "critical",
		message: "BTC fell to $57,800, below your $58,000 threshold",
		asset: "BTC",
		timestamp: "2 hours ago",
		delivered: true,
	},
	{
		id: "t2",
		title: "Robinhood sync delayed",
		severity: "warning",
		message: "Robinhood account sync has been delayed for 18 minutes",
		timestamp: "35 minutes ago",
		delivered: true,
	},
	{
		id: "t3",
		title: "Portfolio up 2.3%",
		severity: "info",
		message: "Your portfolio reached a new daily high of $142,500",
		timestamp: "1 hour ago",
		delivered: true,
	},
	{
		id: "t4",
		title: "NVDA volatility detected",
		severity: "warning",
		message: "NVDA moved 6.2% in one hour, significantly above normal levels",
		asset: "NVDA",
		timestamp: "3 hours ago",
		delivered: true,
	},
]

const statusPill = (status: string) => {
	switch (status) {
		case "active":
			return "text-green-300 bg-green-500/10 border border-green-500/20"
		case "paused":
			return "text-zinc-400 bg-zinc-500/10 border border-zinc-500/20"
		case "triggered":
			return "text-amber-300 bg-amber-500/10 border border-amber-500/20"
		default:
			return "text-zinc-400 bg-zinc-500/10 border border-zinc-500/20"
	}
}

const severityDot = (severity: string) => {
	switch (severity) {
		case "critical":
			return "bg-red-400"
		case "warning":
			return "bg-amber-400"
		case "info":
			return "bg-blue-400"
		default:
			return "bg-zinc-400"
	}
}

export default function AlertsPage() {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [alerts] = useState<Alert[]>(sampleAlerts)

	const activeCount = alerts.filter((a) => a.status === "active").length

	return (
		<PageShell title="Alerts">
			{/* Header */}
			<div className="flex items-baseline justify-between mb-8">
				<div>
					<h1 className="text-3xl font-light tracking-tight text-white mb-2">Alerts</h1>
					<p className="text-sm text-zinc-400">Monitor and manage your portfolio alerts in one place</p>
				</div>
				<button
					onClick={() => setShowCreateModal(true)}
					className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
				>
					Create Alert
				</button>
			</div>

			{/* Two-Column Main Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left Column: Alert Rules + Recent Activity */}
				<div className="lg:col-span-2 space-y-8">
					{/* Alert Rules Section */}
					<section>
						<div className="flex items-baseline justify-between mb-4">
							<h2 className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Active Rules</h2>
							<span className="text-xs text-zinc-500">{activeCount} active</span>
						</div>

						<div className="rounded-lg border border-zinc-800/50 overflow-hidden">
							{alerts.length > 0 ? (
								<div className="divide-y divide-zinc-800/30">
									{alerts.map((alert) => (
										<div
											key={alert.id}
											className="px-6 py-4 hover:bg-zinc-900/50 transition-colors group flex items-stretch justify-between gap-6"
										>
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-3 mb-1">
													<h3 className="text-sm font-medium text-white truncate">{alert.title}</h3>
													{alert.asset && (
														<span className="text-xs px-2 py-0.5 bg-zinc-800/60 text-zinc-300 rounded whitespace-nowrap font-mono">
															{alert.asset}
														</span>
													)}
												</div>
												<p className="text-xs text-zinc-500 mb-2">
													{alert.condition}
													{alert.threshold && ` ${alert.threshold}`}
												</p>
												<div className="flex items-center gap-4 text-xs text-zinc-600">
													<span>{alert.deliveryMethods.join(", ")}</span>
													{alert.lastTriggered && <span>Last triggered {alert.lastTriggered}</span>}
												</div>
											</div>

											<div className="flex items-center gap-2">
												<span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-medium ${statusPill(alert.status)}`}>
													{alert.status === "active" ? "Active" : alert.status === "paused" ? "Paused" : "Triggered"}
												</span>
												<div className="hidden group-hover:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
													<button className="px-3 py-1 text-xs text-zinc-400 hover:text-white transition-colors">Edit</button>
													<button className="px-3 py-1 text-xs text-zinc-400 hover:text-white transition-colors">Delete</button>
												</div>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="px-6 py-12 text-center text-zinc-500 text-sm">
									No active rules. Create your first alert to get started.
								</div>
							)}
						</div>
					</section>

					{/* Recent Activity */}
					<section>
						<h2 className="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">Recent Activity</h2>

						<div className="rounded-lg border border-zinc-800/50 divide-y divide-zinc-800/30 max-h-80 overflow-y-auto">
							{sampleTriggeredAlerts.length > 0 ? (
								sampleTriggeredAlerts.map((alert) => (
									<div key={alert.id} className="px-6 py-4 hover:bg-zinc-900/50 transition-colors">
										<div className="flex items-start gap-3">
											<div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${severityDot(alert.severity)}`}></div>
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between gap-2 mb-1">
													<h4 className="text-sm text-white font-medium truncate">{alert.title}</h4>
													<span className="text-xs text-zinc-500 flex-shrink-0">{alert.timestamp}</span>
												</div>
												<p className="text-xs text-zinc-400 leading-relaxed">{alert.message}</p>
												{alert.asset && (
													<p className="text-xs text-zinc-600 mt-2 font-mono">{alert.asset}</p>
												)}
											</div>
										</div>
									</div>
								))
							) : (
								<div className="px-6 py-12 text-center text-zinc-500 text-sm">
									No recent activity
								</div>
							)}
						</div>
					</section>
				</div>

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* Delivery Preferences */}
					<section className="rounded-lg border border-zinc-800/50 p-6 bg-black/20">
						<h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider mb-4">Delivery</h3>

						<div className="space-y-4">
							{[
								{ label: "In-App", enabled: true },
								{ label: "Email", enabled: true },
								{ label: "Push", enabled: false },
							].map((channel) => (
								<div key={channel.label} className="flex items-center justify-between">
									<span className="text-xs text-zinc-400">{channel.label}</span>
									<div
										className={`w-8 h-4 rounded-full transition-colors ${
											channel.enabled ? "bg-green-600" : "bg-zinc-700"
										}`}
									></div>
								</div>
							))}
						</div>

						<button className="w-full mt-6 px-3 py-2 text-xs text-zinc-300 border border-zinc-700/50 rounded-lg hover:border-zinc-600 hover:bg-zinc-900/50 transition-colors">
							Test Notification
						</button>
					</section>

					{/* Suggested Alerts */}
					<section className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6">
						<h3 className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-4">Suggestions</h3>
						<div className="space-y-3 text-xs text-zinc-300">
							<div className="flex gap-2">
								<span className="flex-shrink-0 text-blue-400 font-bold">•</span>
								<p>Tech concentration is 72%. Consider adding a diversification alert.</p>
							</div>
							<div className="flex gap-2">
								<span className="flex-shrink-0 text-blue-400 font-bold">•</span>
								<p>BTC volatility is 25% above 30-day average. Enable volatility tracking.</p>
							</div>
						</div>
					</section>
				</div>
			</div>

			{/* Create Alert Modal */}
			{showCreateModal && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 w-full max-w-md">
						<h2 className="text-lg font-medium text-white mb-6">Create Alert</h2>

						<div className="space-y-4 mb-6">
							<div>
								<label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 block">Type</label>
								<select className="w-full bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none transition-colors">
									<option>Price Target</option>
									<option>Portfolio Value</option>
									<option>Risk Score</option>
									<option>Concentration</option>
									<option>Volatility</option>
									<option>Connection Status</option>
								</select>
							</div>

							<div>
								<label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 block">Asset</label>
								<input
									type="text"
									placeholder="BTC, NVDA, or Portfolio"
									className="w-full bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors"
								/>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 block">Condition</label>
									<select className="w-full bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none transition-colors">
										<option>Above</option>
										<option>Below</option>
										<option>Crosses</option>
										<option>Changes</option>
									</select>
								</div>

								<div>
									<label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2 block">Value</label>
									<input
										type="text"
										placeholder="$60,000"
										className="w-full bg-zinc-800 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors"
									/>
								</div>
							</div>

							<div>
								<label className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-3 block">Notify Via</label>
								<div className="space-y-2">
									{["In-App", "Email", "Push"].map((method) => (
										<label key={method} className="flex items-center gap-3 cursor-pointer">
											<input type="checkbox" defaultChecked={method !== "Push"} className="w-4 h-4 rounded bg-zinc-800 border-zinc-700" />
											<span className="text-sm text-zinc-300">{method}</span>
										</label>
									))}
								</div>
							</div>
						</div>

						<div className="p-3 bg-zinc-800/30 border border-zinc-700/30 rounded-lg text-xs text-zinc-400 mb-6">
							Notify when BTC drops below $60,000
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => setShowCreateModal(false)}
								className="flex-1 px-4 py-2 text-sm border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
							>
								Cancel
							</button>
							<button className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
								Create
							</button>
						</div>
					</div>
				</div>
			)}
		</PageShell>
	)
}
