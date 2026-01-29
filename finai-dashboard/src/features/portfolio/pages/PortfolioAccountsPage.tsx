import PageShell from "../../../components/layout/PageShell"
import Card from "../../../components/ui/Card"

const accounts = ["RRSP", "TFSA", "FHSA", "Non-Registered"]

export default function PortfolioAccountsPage() {
  return (
    <PageShell title="Portfolio">
      <div className="text-zinc-400 mb-6">
        Accounts for RRSP, TFSA, FHSA, and more. Recommendations will use optional income input later.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {accounts.map((account) => (
          <Card key={account}>
            <div className="text-white font-semibold">{account}</div>
            <div className="text-sm text-zinc-400">Account details coming soon.</div>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
