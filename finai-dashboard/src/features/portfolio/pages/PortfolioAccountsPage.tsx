import PageShell from "../../../components/layout/PageShell"
import { usePortfolio } from "../hooks/usePortfolio"
import PortfolioHeader from "../components/PortfolioHeader"
import BestNextMoves from "../components/BestNextMoves"
import PortfolioProfile from "../components/PortfolioProfile"
import ContributionPlanSection from "../components/ContributionPlanSection"
import PortfolioStructureCharts from "../components/PortfolioStructureCharts"
import AccountCard from "../components/AccountCard"
import PortfolioInsights from "../components/PortfolioInsights"

export default function PortfolioAccountsPage() {
  const {
    accounts,
    profile,
    summary,
    recommendations,
    contributionPlans,
    insights,
    isLoading,
    updateProfile,
  } = usePortfolio()

  if (isLoading) {
    return (
      <PageShell title="Portfolio">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-zinc-400">Loading portfolio intelligence...</div>
          </div>
        </div>
      </PageShell>
    )
  }

  if (!summary) {
    return (
      <PageShell title="Portfolio">
        <div className="text-zinc-400">Unable to load portfolio data</div>
      </PageShell>
    )
  }

  return (
    <PageShell title="">
      <div className="space-y-0">
        {/* 1. Portfolio Header with Summary Metrics */}
        <PortfolioHeader summary={summary} />

        {/* 2. Best Next Moves */}
        <BestNextMoves recommendations={recommendations} />

        {/* 3. Portfolio Profile */}
        <PortfolioProfile profile={profile} onUpdate={updateProfile} />

        {/* 4. Recommended Contribution Plan */}
        <ContributionPlanSection
          contributionPlans={contributionPlans}
          monthlyBudget={profile.monthlyContributionBudget || 0}
        />

        {/* 5. Portfolio Structure & Allocation */}
        <PortfolioStructureCharts accounts={accounts} />

        {/* 6. Detailed Account Intelligence Modules */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-1">Account Intelligence</h2>
            <p className="text-sm text-zinc-400">
              Detailed breakdown of each account with optimization insights
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        </div>

        {/* 7. Portfolio Opportunities & Friction */}
        <PortfolioInsights insights={insights} />

        {/* Bottom CTA */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-blue-800/30 rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to optimize your portfolio structure?
            </h3>
            <p className="text-zinc-400 mb-4">
              Complete your profile to unlock personalized contribution strategies and account recommendations
            </p>
            <div className="flex justify-center gap-3">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Update Profile
              </button>
              <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors">
                View Full Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
