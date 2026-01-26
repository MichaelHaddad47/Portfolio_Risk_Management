import PageShell from "../../../components/layout/PageShell"
import Card from "../../../components/ui/Card"
import Metric from "../../../components/ui/Metric"
import ChartShell from "../../../components/ui/ChartShell"


export default function DashboardPage() {
  return (
    <PageShell title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <Metric
            label="Portfolio Value"
            value="$132,622"
            subtext="+26.9%"
            trend="up"
          />
        </Card>

        <Card>
          <Metric
            label="Risk Score"
            value="66"
            subtext="Moderate"
            trend="neutral"
          />
        </Card>

        <Card>
          <Metric
            label="Diversification"
            value="Strong"
            subtext="7 assets"
            trend="up"
          />
        </Card>

        <Card>
          <Metric
            label="Platforms"
            value="4"
            subtext="Connected"
            trend="up"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartShell title="Portfolio Performance (6M)" />
        </div>

        <Card title="AI Daily Brief">
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>Tech sector showing strong momentum</li>
            <li className="text-yellow-400">
              High tech exposure detected
            </li>
            <li className="text-green-400">
              Rates outlook positive
            </li>
          </ul>
        </Card>
      </div>
    </PageShell>
  )
}
