import { useState } from 'react'
import type { PortfolioHolding } from '../types/scenario.types'

interface PortfolioEditorProps {
	holdings: PortfolioHolding[]
	onUpdateHoldings: (holdings: PortfolioHolding[]) => void
	totalValue: number
}

export function PortfolioEditorForScenario({ holdings, onUpdateHoldings, totalValue }: PortfolioEditorProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedHoldings, setEditedHoldings] = useState<PortfolioHolding[]>(holdings)
	const [newStock, setNewStock] = useState<{
		symbol: string
		quantity: number
		currentValue: number
		assetClass: 'stock' | 'etf' | 'crypto' | 'bond' | 'commodity'
	}>({
		symbol: '',
		quantity: 1,
		currentValue: 0,
		assetClass: 'stock'
	})

	const [editFixedTotal, setEditFixedTotal] = useState(0)

	const handleStartEdit = () => {
		setEditedHoldings([...holdings])
		setEditFixedTotal(totalValue || holdings.reduce((s, h) => s + h.currentValue, 0))
		setIsEditing(true)
	}

	const handleCancelEdit = () => {
		setEditedHoldings([...holdings])
		setIsEditing(false)
		setNewStock({ symbol: '', quantity: 1, currentValue: 0, assetClass: 'stock' })
	}

	const handleSaveEdit = () => {
		onUpdateHoldings(editedHoldings)
		setIsEditing(false)
		setNewStock({ symbol: '', quantity: 1, currentValue: 0, assetClass: 'stock' })
	}

	const handleRemoveHolding = (symbol: string) => {
		setEditedHoldings(editedHoldings.filter(h => h.symbol !== symbol))
	}

	const handleUpdateHolding = (symbol: string, field: keyof PortfolioHolding, value: any) => {
		setEditedHoldings(editedHoldings.map(h => 
			h.symbol === symbol ? { ...h, [field]: value } : h
		))
	}

	const handleAddStock = () => {
		if (!newStock.symbol || newStock.currentValue <= 0) return
		
		const holding: PortfolioHolding = {
			symbol: newStock.symbol.toUpperCase(),
			quantity: newStock.quantity || 1,
			currentValue: newStock.currentValue,
			assetClass: newStock.assetClass
		}
		
		setEditedHoldings([...editedHoldings, holding])
		setNewStock({ symbol: '', quantity: 1, currentValue: 0, assetClass: 'stock' })
	}

	const assetClassOptions = [
		{ value: 'stock', label: 'Stock' },
		{ value: 'etf', label: 'ETF' },
		{ value: 'crypto', label: 'Crypto' },
		{ value: 'bond', label: 'Bond' },
		{ value: 'commodity', label: 'Commodity' }
	]

	if (!isEditing) {
		const averagePosition = holdings.length ? totalValue / holdings.length : 0
		const largestHolding = holdings.reduce((max, h) => (h.currentValue > max.currentValue ? h : max), holdings[0] ?? {
			symbol: '--',
			quantity: 0,
			currentValue: 0,
			assetClass: 'stock' as const,
		})

		return (
			<div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
				<div className="flex items-center justify-between mb-5">
					<div>
						<div className="text-zinc-500 text-sm mb-1">Portfolio for Testing</div>
						<div className="text-3xl font-bold text-white">
							${totalValue.toLocaleString('en-US')}
						</div>
					</div>
					<button
						onClick={handleStartEdit}
						className="px-4 py-2.5 bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 border border-zinc-500/70 text-white rounded-lg transition-all font-semibold shadow-md"
					>
						Edit Portfolio
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
					<div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3">
						<div className="text-xs text-zinc-500 mb-1">Assets</div>
						<div className="text-xl font-bold text-white">{holdings.length}</div>
					</div>
					<div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3">
						<div className="text-xs text-zinc-500 mb-1">Avg Position</div>
						<div className="text-xl font-bold text-white">
							${averagePosition.toLocaleString('en-US', { maximumFractionDigits: 0 })}
						</div>
					</div>
					<div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-3">
						<div className="text-xs text-zinc-500 mb-1">Largest Holding</div>
						<div className="text-xl font-bold text-white">{largestHolding.symbol}</div>
					</div>
				</div>

				<div className="flex gap-2.5 flex-wrap justify-center">
					{holdings.slice(0, 10).map(holding => (
						<div 
							key={holding.symbol}
							className="inline-flex items-center gap-2.5 px-3 py-2 bg-gradient-to-t from-black to-zinc-800 border border-zinc-700 rounded-full text-sm transition-transform duration-200 hover:-translate-y-1"
						>
							<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold text-zinc-200 border border-zinc-700">
								{holding.symbol.slice(0, 3)}
							</span>
							<span className="font-semibold text-white">{holding.symbol}</span>
							<span className="text-zinc-500">
								${(holding.currentValue / 1000).toFixed(0)}K
							</span>
						</div>
					))}
					{holdings.length > 10 && (
						<div className="px-3 py-2 bg-gradient-to-t from-black to-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-400">
							+{holdings.length - 10} more
						</div>
					)}
				</div>
			</div>
		)
	}

	const editedTotalValue = editedHoldings.reduce((sum, h) => sum + h.currentValue, 0)

	const totalAllocPct = editFixedTotal > 0 ? (editedTotalValue / editFixedTotal) * 100 : 0
	const pctOk = Math.abs(totalAllocPct - 100) < 0.6

	const handlePctChange = (symbol: string, pct: number) => {
		const newVal = (Math.max(0, Math.min(pct, 100)) / 100) * editFixedTotal
		setEditedHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, currentValue: newVal } : h))
	}

	const handleValueChange = (symbol: string, val: number) => {
		setEditedHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, currentValue: Math.max(0, val) } : h))
	}

	const handleFillToHundred = (symbol: string) => {
		const otherSum = editedHoldings.filter(h => h.symbol !== symbol).reduce((s, h) => s + h.currentValue, 0)
		const remaining = Math.max(0, editFixedTotal - otherSum)
		setEditedHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, currentValue: remaining } : h))
	}

	return (
		<div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-5">
				<div>
					<div className="text-zinc-500 text-sm mb-1">Editing Portfolio</div>
					<div className="text-2xl font-bold text-white">
						${editedTotalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
					</div>
				</div>
				<div className="flex items-center gap-3">
					<span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${pctOk ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
						{totalAllocPct.toFixed(1)}%{!pctOk && ' ≠ 100%'}
					</span>
					<button onClick={handleCancelEdit} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors text-sm">
						Cancel
					</button>
					<button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-semibold text-sm">
						Save Changes
					</button>
				</div>
			</div>

			{/* Column headers */}
			<div className="flex items-center gap-3 px-4 mb-2 text-xs text-zinc-600 font-medium uppercase tracking-wide">
				<div className="w-14 shrink-0">Symbol</div>
				<div className="w-24">Allocation %</div>
				<div className="w-32 ml-2">Value ($)</div>
			</div>

			{/* Holding rows */}
			<div className="space-y-2 max-h-[360px] overflow-y-auto mb-5">
				{editedHoldings.map(holding => {
					const pct = editFixedTotal > 0 ? (holding.currentValue / editFixedTotal) * 100 : 0
					return (
						<div key={holding.symbol} className="flex items-center gap-3 bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3">
							<div className="w-14 shrink-0">
								<span className="font-mono font-bold text-white text-sm">{holding.symbol}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<input
									type="number"
									min={0}
									max={100}
									step={0.1}
									value={parseFloat(pct.toFixed(1))}
									onChange={e => handlePctChange(holding.symbol, parseFloat(e.target.value) || 0)}
									className="w-20 px-2 py-1.5 bg-zinc-900 text-white rounded border border-zinc-700 text-sm text-right focus:outline-none focus:border-zinc-500"
								/>
								<span className="text-zinc-500 text-sm">%</span>
							</div>
							<div className="flex items-center gap-1.5">
								<span className="text-zinc-600 text-sm">$</span>
								<input
									type="number"
									min={0}
									step={100}
									value={Math.round(holding.currentValue)}
									onChange={e => handleValueChange(holding.symbol, parseFloat(e.target.value) || 0)}
									className="w-28 px-2 py-1.5 bg-zinc-900 text-white rounded border border-zinc-700 text-sm focus:outline-none focus:border-zinc-500"
								/>
							</div>
							<button
								onClick={() => handleFillToHundred(holding.symbol)}
								className="shrink-0 px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
								title={`Set ${holding.symbol} to fill remaining allocation to 100%`}
							>
								Fill →100%
							</button>
							<button
								onClick={() => handleRemoveHolding(holding.symbol)}
								className="shrink-0 p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded"
								title="Remove"
							>
								<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					)
				})}
			</div>

			{/* Add Asset */}
			<div className="border-t border-zinc-800 pt-4">
				<div className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wide">Add Asset</div>
				<div className="flex items-end gap-3 flex-wrap">
					<div>
						<label className="text-xs text-zinc-500 mb-1 block">Symbol</label>
						<input
							type="text"
							value={newStock.symbol}
							onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
							placeholder="AAPL"
							className="w-24 px-3 py-2 bg-zinc-900 text-white rounded border border-zinc-700 text-sm focus:outline-none focus:border-zinc-500"
						/>
					</div>
					<div>
						<label className="text-xs text-zinc-500 mb-1 block">Value ($)</label>
						<input
							type="number"
							value={newStock.currentValue || ''}
							onChange={(e) => setNewStock({ ...newStock, currentValue: parseFloat(e.target.value) || 0 })}
							className="w-32 px-3 py-2 bg-zinc-900 text-white rounded border border-zinc-700 text-sm focus:outline-none focus:border-zinc-500"
						/>
					</div>
					<div>
						<label className="text-xs text-zinc-500 mb-1 block">Type</label>
						<select
							value={newStock.assetClass}
							onChange={(e) => setNewStock({ ...newStock, assetClass: e.target.value as 'stock' | 'etf' | 'crypto' | 'bond' | 'commodity' })}
							className="px-3 py-2 bg-zinc-900 text-white rounded border border-zinc-700 text-sm focus:outline-none focus:border-zinc-500"
						>
							{assetClassOptions.map(opt => (
								<option key={opt.value} value={opt.value}>{opt.label}</option>
							))}
						</select>
					</div>
					<button
						onClick={handleAddStock}
						disabled={!newStock.symbol || newStock.currentValue <= 0}
						className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
					>
						+ Add
					</button>
				</div>
			</div>
		</div>
	)
}
