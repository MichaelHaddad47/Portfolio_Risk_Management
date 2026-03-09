import { useState } from 'react'
import type { UserProfile } from '../types/portfolio.types'
import Card from '../../../components/ui/Card'

interface Props {
  profile: UserProfile
  onUpdate: (profile: UserProfile) => void
}

export default function PortfolioProfile({ profile, onUpdate }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const profileCompleteness = calculateCompleteness(profile)

  const handleChange = (field: keyof UserProfile, value: any) => {
    onUpdate({ ...profile, [field]: value })
  }

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Portfolio Profile</h2>
          <p className="text-sm text-zinc-400">
            Complete your profile to receive personalized contribution strategies and account recommendations
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Completeness Indicator */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Profile Completeness</span>
          <span className="text-sm font-bold text-white">{profileCompleteness}%</span>
        </div>
        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${profileCompleteness}%` }}
          />
        </div>
        <p className="text-xs text-zinc-500 mt-2">
          {profileCompleteness === 100
            ? 'Your profile is complete! You\'ll receive the most accurate recommendations.'
            : 'Complete more fields to unlock better personalized recommendations'}
        </p>
      </Card>

      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Investor Profile */}
          <Card>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">👤</span>
              Investor Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Annual Income (before tax)</label>
                <input
                  type="number"
                  value={profile.annualIncome || ''}
                  onChange={(e) => handleChange('annualIncome', Number(e.target.value))}
                  placeholder="e.g., 75000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Age</label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                  placeholder="e.g., 32"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Province</label>
                <select
                  value={profile.province || ''}
                  onChange={(e) => handleChange('province', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select province</option>
                  <option value="ON">Ontario</option>
                  <option value="QC">Quebec</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="PE">Prince Edward Island</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Risk Tolerance</label>
                <div className="flex gap-2">
                  {['conservative', 'moderate', 'aggressive'].map((risk) => (
                    <button
                      key={risk}
                      onClick={() => handleChange('riskTolerance', risk)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        profile.riskTolerance === risk
                          ? 'bg-blue-600 text-white border-2 border-blue-500'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Investing Experience</label>
                <div className="flex gap-2">
                  {['beginner', 'intermediate', 'advanced'].map((exp) => (
                    <button
                      key={exp}
                      onClick={() => handleChange('investingExperience', exp)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        profile.investingExperience === exp
                          ? 'bg-blue-600 text-white border-2 border-blue-500'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {exp.charAt(0).toUpperCase() + exp.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Goals & Priorities */}
          <Card>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              Goals & Priorities
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Investment Goal</label>
                <select
                  value={profile.investmentGoal || ''}
                  onChange={(e) => handleChange('investmentGoal', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select goal</option>
                  <option value="growth">Growth (maximize returns)</option>
                  <option value="balanced">Balanced (growth with stability)</option>
                  <option value="income">Income (regular cash flow)</option>
                  <option value="preservation">Preservation (protect capital)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Time Horizon</label>
                <div className="flex gap-2">
                  {[
                    { value: 'short', label: '< 5 years' },
                    { value: 'medium', label: '5-15 years' },
                    { value: 'long', label: '15+ years' },
                  ].map((horizon) => (
                    <button
                      key={horizon.value}
                      onClick={() => handleChange('timeHorizon', horizon.value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        profile.timeHorizon === horizon.value
                          ? 'bg-blue-600 text-white border-2 border-blue-500'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {horizon.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Target Retirement Age</label>
                <input
                  type="number"
                  value={profile.targetRetirementAge || ''}
                  onChange={(e) => handleChange('targetRetirementAge', Number(e.target.value))}
                  placeholder="e.g., 65"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-300">Planning to buy first home?</span>
                <button
                  onClick={() => handleChange('hasHomePurchaseGoal', !profile.hasHomePurchaseGoal)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    profile.hasHomePurchaseGoal ? 'bg-blue-600' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      profile.hasHomePurchaseGoal ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
                <span className="text-sm text-zinc-300">Debt reduction is priority?</span>
                <button
                  onClick={() => handleChange('hasDebtPriority', !profile.hasDebtPriority)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    profile.hasDebtPriority ? 'bg-blue-600' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      profile.hasDebtPriority ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Liquidity Needs</label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((liquidity) => (
                    <button
                      key={liquidity}
                      onClick={() => handleChange('liquidityNeed', liquidity)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        profile.liquidityNeed === liquidity
                          ? 'bg-blue-600 text-white border-2 border-blue-500'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {liquidity.charAt(0).toUpperCase() + liquidity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Contribution Capacity */}
          <Card className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">💵</span>
              Contribution Capacity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Monthly Contribution Budget</label>
                <input
                  type="number"
                  value={profile.monthlyContributionBudget || ''}
                  onChange={(e) => handleChange('monthlyContributionBudget', Number(e.target.value))}
                  placeholder="e.g., 1000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-zinc-500 mt-1">Amount you can invest monthly</p>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Lump Sum Available</label>
                <input
                  type="number"
                  value={profile.lumpSumAvailable || ''}
                  onChange={(e) => handleChange('lumpSumAvailable', Number(e.target.value))}
                  placeholder="e.g., 5000"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-zinc-500 mt-1">One-time amount ready to invest</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function calculateCompleteness(profile: UserProfile): number {
  const fields = [
    'annualIncome',
    'age',
    'province',
    'riskTolerance',
    'investingExperience',
    'monthlyContributionBudget',
    'investmentGoal',
    'timeHorizon',
    'targetRetirementAge',
    'liquidityNeed',
  ]

  const completedFields = fields.filter((field) => {
    const value = profile[field as keyof UserProfile]
    return value !== undefined && value !== null && value !== ''
  }).length

  return Math.round((completedFields / fields.length) * 100)
}
