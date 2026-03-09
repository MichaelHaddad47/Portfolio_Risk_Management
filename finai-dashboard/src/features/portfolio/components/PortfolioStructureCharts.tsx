import type { Account } from '../types/portfolio.types'
import { formatCurrency } from '../../../utils/formatCurrency'
import Card from '../../../components/ui/Card'

interface Props {
  accounts: Account[]
}

export default function PortfolioStructureCharts({ accounts }: Props) {
  const totalValue = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  // Account distribution
  const accountDistribution = accounts.map((acc) => ({
    type: acc.type,
    name: acc.name,
    value: acc.balance,
    percentage: (acc.balance / totalValue) * 100,
    color: getAccountColor(acc.type),
  }))

  // Registered vs Non-Registered
  const registeredTypes = ['RRSP', 'TFSA', 'FHSA']
  const registeredValue = accounts
    .filter((acc) => registeredTypes.includes(acc.type))
    .reduce((sum, acc) => sum + acc.balance, 0)
  const nonRegisteredValue = totalValue - registeredValue
  const registeredPercent = (registeredValue / totalValue) * 100

  // Contribution room usage
  const contributionData = accounts
    .filter((acc) => acc.type !== 'PERSONAL')
    .map((acc) => ({
      type: acc.type,
      used: acc.contributionUsed,
      remaining: acc.contributionRoom,
      total: acc.contributionLimit,
      usedPercent: (acc.contributionUsed / acc.contributionLimit) * 100,
    }))

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-1">Portfolio Structure & Analytics</h2>
        <p className="text-sm text-zinc-400">
          Visual breakdown of your account distribution and contribution room usage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Account Distribution */}
        <Card>
          <h3 className="text-white font-semibold mb-4">Account Distribution</h3>
          <div className="space-y-3">
            {accountDistribution.map((acc) => (
              <div key={acc.type}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-zinc-300 font-medium">{acc.name}</span>
                  <span className="text-white font-semibold">{formatCurrency(acc.value)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${acc.percentage}%`,
                        backgroundColor: acc.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-zinc-400 w-12 text-right">
                    {acc.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Registered vs Non-Registered */}
        <Card>
          <h3 className="text-white font-semibold mb-4">Registered vs Non-Registered</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              {/* Circular chart simulation */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray={`${registeredPercent * 2.513} 251.3`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="20"
                  strokeDasharray={`${(100 - registeredPercent) * 2.513} 251.3`}
                  strokeDashoffset={`-${registeredPercent * 2.513}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{registeredPercent.toFixed(0)}%</div>
                  <div className="text-xs text-zinc-400">Registered</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-zinc-300">Registered</span>
              </div>
              <span className="text-white font-semibold">{formatCurrency(registeredValue)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-600/10 border border-indigo-600/20 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-sm text-zinc-300">Non-Registered</span>
              </div>
              <span className="text-white font-semibold">{formatCurrency(nonRegisteredValue)}</span>
            </div>
          </div>
        </Card>

        {/* Contribution Room Usage */}
        <Card className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-4">Contribution Room Usage by Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contributionData.map((data) => (
              <div key={data.type} className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="text-zinc-400 text-sm mb-1">{data.type}</div>
                  <div className="text-3xl font-bold text-white">{data.usedPercent.toFixed(0)}%</div>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full ${
                      data.usedPercent >= 90
                        ? 'bg-green-500'
                        : data.usedPercent >= 50
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min(data.usedPercent, 100)}%` }}
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Used:</span>
                    <span className="text-zinc-300 font-medium">{formatCurrency(data.used)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Remaining:</span>
                    <span className="text-emerald-400 font-medium">{formatCurrency(data.remaining)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-zinc-800">
                    <span className="text-zinc-500">Limit:</span>
                    <span className="text-white font-semibold">{formatCurrency(data.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function getAccountColor(type: string): string {
  switch (type) {
    case 'TFSA':
      return '#10b981' // green
    case 'RRSP':
      return '#3b82f6' // blue
    case 'FHSA':
      return '#8b5cf6' // purple
    case 'PERSONAL':
      return '#6366f1' // indigo
    default:
      return '#6b7280' // gray
  }
}
