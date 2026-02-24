import PageShell from "../../../components/layout/PageShell"
import Card from "../../../components/ui/Card"
import Metric from "../../../components/ui/Metric"
import PortfolioChart from "../components/PortfolioChart"


export default function DashboardPage() {
  return (
    <PageShell title="Unified Intelligence Dashboard">
      {/* Status bar */}
      <div className="flex items-center gap-4 mb-6 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Last synced 2 minutes ago</span>
        </div>
        <span>•</span>
        <span>4 platforms connected</span>
  </div>

  {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <Metric
            label="Total Portfolio Value"
            value="$132,622"
            subtext="+28,114.5 (26.9%)"
            trend="up"
          />
        </Card>

        <Card>
          <Metric
            label="Portfolio Risk Score"
            value="66"
            subtext="Moderate risk"
            trend="neutral"
          />
        </Card>

        <Card>
          <Metric
            label="Diversification Score"
            value="100"
            subtext="Well diversified"
            trend="up"
          />
        </Card>

        <Card>
          <Metric
            label="Total Assets"
            value="7"
            subtext="4 platforms"
            trend="up"
          />
        </Card>
      </div>

      {/* Chart and AI Brief */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <PortfolioChart />
        </div>

        <Card title="AI Daily Brief">
          <div className="space-y-3">
            <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-3 text-sm">
              <p className="text-blue-200">
                Your portfolio is up 2.3% today driven by strong performance in tech sector. NVDA showing exceptional gains.
              </p>
            </div>
            <div className="bg-yellow-950/30 border border-yellow-800/50 rounded-lg p-3 text-sm">
              <p className="text-yellow-200">
                High tech concentration detected (65%). Consider rebalancing to reduce sector risk.
              </p>
            </div>
            <div className="bg-green-950/30 border border-green-800/50 rounded-lg p-3 text-sm">
              <p className="text-green-200">
                Federal Reserve rate hold signals positive outlook for equities. Good time to maintain positions.
              </p>
            </div>
          </div>
        </Card>
  </div>

  {/* Placeholder below chart and AI brief */}
      <div className="mt-4">
        <Card>
          <div className="h-40 flex items-center justify-center rounded-lg bg-zinc-900/40 border border-zinc-800/50 text-sm text-zinc-400">
            Placeholder for future content
          </div>
        </Card>
      </div>

    </PageShell>
  )
}
