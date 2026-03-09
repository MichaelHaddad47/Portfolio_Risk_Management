import { useState } from 'react'
import type { Account } from '../types/portfolio.types'
import { formatCurrency, formatPercent } from '../../../utils/formatCurrency'
import Card from '../../../components/ui/Card'

interface Props {
  account: Account
}

export default function AccountCard({ account }: Props) {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimized':
        return {
          text: 'Optimized',
          color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          icon: '✓',
        }
      case 'underused':
        return {
          text: 'Underused',
          color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
          icon: '⚠',
        }
      case 'overused':
        return {
          text: 'Over Limit',
          color: 'bg-red-500/10 border-red-500/30 text-red-400',
          icon: '!',
        }
      default:
        return {
          text: 'Normal',
          color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          icon: '•',
        }
    }
  }

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'TFSA':
        return '🌱'
      case 'RRSP':
        return '🏦'
      case 'FHSA':
        return '🏡'
      case 'PERSONAL':
        return '💼'
      default:
        return '💰'
    }
  }

  const statusBadge = getStatusBadge(account.status)
  const contributionPercent = (account.contributionUsed / account.contributionLimit) * 100

  return (
    <Card className="hover:border-zinc-700 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{getAccountIcon(account.type)}</div>
          <div>
            <h3 className="text-white font-bold text-lg">{account.name}</h3>
            <p className="text-xs text-zinc-500">{account.purpose}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${statusBadge.color}`}>
          <span>{statusBadge.icon}</span>
          {statusBadge.text}
        </div>
      </div>

      {/* Balance and Performance */}
      <div className="mb-4 pb-4 border-b border-zinc-800">
        <div className="text-sm text-zinc-400 mb-1">Current Balance</div>
        <div className="flex items-baseline gap-3">
          <div className="text-2xl font-bold text-white">{formatCurrency(account.balance)}</div>
          <div className={`text-sm font-medium ${account.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(account.gain)} ({formatPercent(account.gainPercent)})
          </div>
        </div>
      </div>

      {/* Contribution Room */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-zinc-400">Contribution Room</span>
          <span className="text-sm font-semibold text-white">
            {formatCurrency(account.contributionRoom)} remaining
          </span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              contributionPercent >= 90
                ? 'bg-green-500'
                : contributionPercent >= 50
                ? 'bg-blue-500'
                : 'bg-yellow-500'
            }`}
            style={{ width: `${Math.min(contributionPercent, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-zinc-500">
            {formatCurrency(account.contributionUsed)} used
          </span>
          <span className="text-xs text-zinc-500">
            {formatCurrency(account.contributionLimit)} limit
          </span>
        </div>
      </div>

      {/* Tax Benefit */}
      <div className="mb-4 p-3 bg-blue-950/20 border border-blue-900/30 rounded-lg">
        <div className="text-xs text-blue-400 mb-1 uppercase tracking-wide font-semibold">Tax Benefit</div>
        <div className="text-sm text-blue-300">{account.taxBenefit}</div>
      </div>

      {/* Expandable Details */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3 pt-3 border-t border-zinc-800">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Current Role</div>
            <div className="text-sm text-zinc-300 bg-zinc-950/50 p-2 rounded">
              Priority #{account.priority} in your overall portfolio strategy
            </div>
          </div>

          {account.recommendedAction && (
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Recommended Action</div>
              <div className="text-sm text-emerald-300 bg-emerald-950/20 border border-emerald-900/30 p-2 rounded">
                {account.recommendedAction}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full mt-3 py-2 px-4 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-sm text-zinc-400 hover:text-zinc-300 font-medium transition-all"
      >
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
    </Card>
  )
}
