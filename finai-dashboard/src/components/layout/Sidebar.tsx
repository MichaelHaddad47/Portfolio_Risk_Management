import { NavLink } from "react-router-dom"

export default function Sidebar() {
	return (
		<aside className="w-64 bg-zinc-900 border-r border-zinc-800 text-white p-6">
			<div className="mb-8">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">FI</span>
					</div>
					<div>
						<h2 className="text-lg font-bold text-white">FINAI</h2>
						<p className="text-xs text-zinc-500">Intelligence Overlay</p>
					</div>
				</div>
			</div>
			<nav className="space-y-1 text-zinc-400">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
					end
				>
					📊 Dashboard
				</NavLink>
				<NavLink
					to="/portfolio"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					💼 Portfolio
				</NavLink>
				<NavLink
					to="/assets"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					📈 Assets
				</NavLink>
				<NavLink
					to="/advisor"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					🤖 AI Advisor
				</NavLink>
				<NavLink
					to="/news"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					📰 News & Impact
				</NavLink>
				<NavLink
					to="/scenario"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					🧪 Scenario Lab
				</NavLink>
				<NavLink
					to="/alerts"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					🔔 Alerts
				</NavLink>
				<NavLink
					to="/connections"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					🔗 Connections
				</NavLink>
				<NavLink
					to="/settings"
					className={({ isActive }) =>
						`block py-2 px-3 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors ${
							isActive ? "bg-zinc-800 text-white font-medium" : ""
						}`
					}
				>
					⚙️ Settings
				</NavLink>
			</nav>
		</aside>
	)
}