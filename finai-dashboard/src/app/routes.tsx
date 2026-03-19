import { Routes, Route } from "react-router-dom"
import DashboardPage from "../features/dashboard/pages/DashboardPage"
import PortfolioPage from "../features/portfolio/pages/PortfolioPage"
import AddStockPage from "../features/portfolio/pages/AddStockPage"
import AssetDetailsPage from "../features/portfolio/pages/AssetDetailsPage"
import PortfolioAccountsPage from "../features/portfolio/pages/PortfolioAccountsPage"
import RiskDetailsPage from "../features/risk/pages/RiskDetailsPage"
import PageShell from "../components/layout/PageShell"
import AdvisorPage from "../features/advisor/pages/AdvisorPage"
import ScenarioLabPage from "../features/scenario/pages/ScenarioLabPage"
import AlertsPage from "../features/alerts/pages/AlertsPage"
import ConnectionsPage from "../features/connections/pages/ConnectionsPage"
import SettingsPage from "../features/settings/pages/SettingsPage"

type StubProps = {
	title: string
	subtitle: string
}

function StubPage({ title, subtitle }: StubProps) {
	return (
		<PageShell title={title}>
			<div className="text-zinc-400">{subtitle}</div>
		</PageShell>
	)
}

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<DashboardPage />} />
			<Route path="/portfolio" element={<PortfolioAccountsPage />} />
			<Route path="/assets" element={<PortfolioPage />} />
			<Route path="/portfolio/add" element={<AddStockPage />} />
			<Route path="/portfolio/:id" element={<AssetDetailsPage />} />
			<Route path="/assets/:id" element={<AssetDetailsPage />} />
			<Route path="/risk" element={<RiskDetailsPage />} />
			<Route
				path="/advisor"
				element={<AdvisorPage />}
			/>
			<Route
				path="/news"
				element={
					<StubPage
						title="News & Impact"
						subtitle="Market news and impact summaries will appear here."
					/>
				}
			/>
			<Route
				path="/scenario"
				element={<ScenarioLabPage />}
			/>
			<Route
				path="/alerts"
				element={<AlertsPage />}
			/>
			<Route
				path="/connections"
				element={<ConnectionsPage />}
			/>
			<Route
				path="/settings"
				element={<SettingsPage />}
			/>
		</Routes>
	)
}