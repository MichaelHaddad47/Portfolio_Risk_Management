import { Routes, Route } from "react-router-dom"
import DashboardPage from "../features/dashboard/pages/DashboardPage"
import PortfolioPage from "../features/portfolio/pages/PortfolioPage"



export default function AppRoutes() {
return (
<Routes>
<Route path="/" element={<DashboardPage />} />
<Route path="/portfolio" element={<PortfolioPage />} />
</Routes>
)
}