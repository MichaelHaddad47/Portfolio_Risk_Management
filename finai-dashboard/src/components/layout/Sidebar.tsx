import { NavLink } from "react-router-dom"

export default function Sidebar() {
	return (
		<aside className="w-64 bg-zinc-900 text-white p-4">
			<h2 className="text-lg font-bold mb-6">FINAI</h2>
			<nav className="space-y-2 text-zinc-400">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
					end
				>
					Dashboard
				</NavLink>
				<NavLink
					to="/portfolio"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					Portfolio
				</NavLink>
				<NavLink
					to="/assets"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					Assets
				</NavLink>
				<NavLink
					to="/advisor"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					AI Advisor
				</NavLink>
				<NavLink
					to="/news"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					News & Impact
				</NavLink>
				<NavLink
					to="/scenario"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					Scenario Lab
				</NavLink>
				<NavLink
					to="/alerts"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					Alerts
				</NavLink>
				<NavLink
					to="/connections"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					Connections
				</NavLink>
				<NavLink
					to="/settings"
					className={({ isActive }) =>
						`block hover:text-white ${isActive ? "text-white" : ""}`
					}
				>
					Settings
				</NavLink>
			</nav>
		</aside>
	)
}