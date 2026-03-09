import { useEffect, useState } from "react"
import PageShell from "../../../components/layout/PageShell"
import RiskProfileCard from "../components/RiskProfileCard"
import DiversificationCard from "../components/DiversificationCard"
import CorrelationCard from "../components/CorrelationCard"
import RiskConcentrationCard from "../components/RiskConcentrationCard"
import PCAClusteringCard from "../components/PCAClusteringCard"
import InsightsPanel from "../components/InsightsPanel"
import ComparisonView from "../components/ComparisonView"
import PortfolioPieChart from "../components/PortfolioPieChart"

type PortfolioReport = {
    assets: string[]
    portfolio_risk_classification: string
    risk_alignment: {
        status: string
        user_risk_tolerance: string
        portfolio_risk_classification: string
    }
    volatility: number
    max_drawdown: number
    sharpe_ratio: number
    individual_volatility: Record<string, number>
    diversification: {
        diversification_score: number
        effective_number_of_assets: number
        actual_number_of_assets: number
    }
    correlation_analysis: {
        average_pairwise_correlation: number
        assessment: string
    }
    risk_concentration: {
        top_contributors: Array<{ ticker: string; risk_contribution_pct: number }>
        full_distribution: Record<string, number>
    }
    pca_clustering: {
        explained_variance: number[]
        asset_loadings: Record<string, Record<string, number>>
        clusters: Record<string, string[]>
    }
}

type PortfolioItem = {
    Ticker: string
    Shares: number
    Price?: number
}

export default function AdvisorPage() {
    const [report, setReport] = useState<PortfolioReport | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [riskTolerance, setRiskTolerance] = useState("medium")
    const [lookbackDays, setLookbackDays] = useState(504)
    const [activeTab, setActiveTab] = useState<"overview" | "details" | "sampling" | "ml">("overview")
    const [originalReport, setOriginalReport] = useState<PortfolioReport | null>(null)
    const [showComparison, setShowComparison] = useState(false)

    // Sampling state
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
        { Ticker: "AAPL", Shares: 10, Price: 150 },
        { Ticker: "MSFT", Shares: 10, Price: 300 },
        { Ticker: "GOOGL", Shares: 5, Price: 140 },
        { Ticker: "TSLA", Shares: 8, Price: 250 },
    ])
    const [newTicker, setNewTicker] = useState("")
    const [newShares, setNewShares] = useState(10)
    const [newPrice, setNewPrice] = useState(100)

    const fetchAnalysis = async (portfolioData?: any) => {
        setLoading(true)
        setError(null)
        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"
            const response = await fetch(`${apiUrl}/api/portfolio/analyze`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    risk_tolerance: riskTolerance,
                    lookback_days: lookbackDays,
                    portfolio_data: portfolioData,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || `Server error: ${response.status}`)
            }

            const data = await response.json()
            setReport(data.data)
        } catch (err) {
            console.error("Error:", err)
            setError(err instanceof Error ? err.message : "Connection failed")
        } finally {
            setLoading(false)
        }
    }

    const getTotalValue = () => {
        return portfolio.reduce((sum, item) => sum + (item.Shares * (item.Price || 0)), 0)
    }

    const getHoldings = () => {
        const total = getTotalValue()
        return portfolio.map(item => ({
            ...item,
            Value: item.Shares * (item.Price || 0),
            Percentage: total > 0 ? ((item.Shares * (item.Price || 0)) / total * 100) : 0,
        }))
    }

    const addStock = () => {
        if (newTicker.trim() && newShares > 0 && newPrice > 0) {
            setPortfolio([...portfolio, { Ticker: newTicker.toUpperCase(), Shares: newShares, Price: newPrice }])
            setNewTicker("")
            setNewShares(10)
            setNewPrice(100)
        }
    }

    const removeStock = (index: number) => {
        setPortfolio(portfolio.filter((_, i) => i !== index))
    }

    const updateStock = (index: number, field: keyof PortfolioItem, value: any) => {
        const updated = [...portfolio]
        updated[index][field] = value
        setPortfolio(updated)
    }

    const handleSampleAnalyze = async () => {
        const holdings = getHoldings()
        const normalized = holdings.map(item => ({
            Ticker: item.Ticker,
            Weight: item.Percentage / 100,
        }))
        setOriginalReport(report)
        await fetchAnalysis(normalized)
        setShowComparison(true)
    }

    useEffect(() => {
        fetchAnalysis()
    }, [])

    const holdings = getHoldings()
    const totalValue = getTotalValue()

    return (
        <PageShell title="">
            <div className="w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-1">Portfolio Analysis</h1>
                    <p className="text-sm text-zinc-400">Risk metrics, diversification & AI insights</p>
                </div>

                <div className="bg-zinc-800/50 rounded-lg p-4 mb-6 border border-zinc-700">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-2">Risk Tolerance</label>
                            <select
                                value={riskTolerance}
                                onChange={(e) => setRiskTolerance(e.target.value)}
                                className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="low">Conservative</option>
                                <option value="medium">Balanced</option>
                                <option value="high">Aggressive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 mb-2">Period (days)</label>
                            <input
                                type="number"
                                value={lookbackDays}
                                onChange={(e) => setLookbackDays(Number(e.target.value))}
                                className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                min="30"
                                max="1000"
                            />
                        </div>
                        <div className="flex gap-2 items-end">
                            <button
                                onClick={() => fetchAnalysis()}
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-1.5 rounded transition"
                            >
                                Analyze
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 text-red-300 text-sm">
                        {error}
                    </div>
                )}

                {loading && !report && (
                    <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mb-3" />
                        Analyzing portfolio...
                    </div>
                )}

                {report && (
                    <>
                        <div className="flex gap-0 border-b border-zinc-700 mb-6 overflow-x-auto">
                            {(["overview", "details", "sampling", "ml"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-[2px] whitespace-nowrap ${
                                        activeTab === tab
                                            ? "text-blue-400 border-blue-500"
                                            : "text-zinc-400 border-transparent hover:text-zinc-300"
                                    }`}
                                >
                                    {tab === "overview" && "Overview"}
                                    {tab === "details" && "Details"}
                                    {tab === "sampling" && "Sampling"}
                                    {tab === "ml" && "AI Analysis"}
                                </button>
                            ))}
                        </div>

                        {activeTab === "overview" && (
                            <div className="space-y-4">
                                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                                    <h3 className="text-xs font-semibold text-zinc-300 mb-3 uppercase tracking-wider">Assets</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {report.assets.map((asset) => (
                                            <span key={asset} className="bg-blue-500/20 border border-blue-500/40 text-blue-300 px-3 py-1 rounded text-xs font-medium">
                                                {asset}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <div className="bg-zinc-800/30 rounded-lg p-3 border border-zinc-700">
                                        <p className="text-xs text-zinc-400 mb-1">Risk Level</p>
                                        <p className="text-lg font-bold text-white capitalize">{report.portfolio_risk_classification}</p>
                                    </div>
                                    <div className="bg-zinc-800/30 rounded-lg p-3 border border-zinc-700">
                                        <p className="text-xs text-zinc-400 mb-1">Volatility</p>
                                        <p className="text-lg font-bold text-orange-400">{(report.volatility * 100).toFixed(1)}%</p>
                                    </div>
                                    <div className="bg-zinc-800/30 rounded-lg p-3 border border-zinc-700">
                                        <p className="text-xs text-zinc-400 mb-1">Sharpe</p>
                                        <p className="text-lg font-bold text-green-400">{report.sharpe_ratio.toFixed(2)}</p>
                                    </div>
                                </div>

                                <InsightsPanel report={report} />
                            </div>
                        )}

                        {activeTab === "details" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <RiskProfileCard report={report} />
                                <DiversificationCard report={report} />
                                <CorrelationCard report={report} />
                                <RiskConcentrationCard report={report} />
                            </div>
                        )}

                        {activeTab === "sampling" && (
                            <div className="space-y-6">
                                {showComparison && originalReport && (
                                    <div>
                                        <ComparisonView
                                            original={originalReport}
                                            modified={report}
                                            onClose={() => setShowComparison(false)}
                                        />
                                    </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                                        <h3 className="text-sm font-semibold text-white mb-4">📊 Current</h3>
                                        <p className="text-xs text-zinc-400">Current portfolio analysis</p>
                                    </div>
                                    <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                                        <h3 className="text-sm font-semibold text-white mb-4">🎯 Sample</h3>
                                        <p className="text-xs font-medium text-green-400">Total: ${totalValue.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                                    <h3 className="text-sm font-semibold text-white mb-4">Portfolio Allocation</h3>
                                    {holdings.length > 0 && <PortfolioPieChart holdings={holdings} />}
                                </div>

                                <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700">
                                    <h3 className="text-sm font-semibold text-white mb-4">Holdings</h3>
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {holdings.map((item, idx) => (
                                            <div key={idx} className="bg-zinc-700/50 rounded p-3">
                                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center">
                                                    <div>
                                                        <p className="text-xs text-zinc-400">Ticker</p>
                                                        <input type="text" value={item.Ticker} onChange={(e) => updateStock(idx, "Ticker", e.target.value.toUpperCase())} className="w-full bg-zinc-600 border border-zinc-500 rounded px-2 py-1 text-sm text-white font-medium" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-zinc-400">Shares</p>
                                                        <input type="number" value={item.Shares} onChange={(e) => updateStock(idx, "Shares", parseFloat(e.target.value) || 0)} className="w-full bg-zinc-600 border border-zinc-500 rounded px-2 py-1 text-sm text-white" min="0" step="0.1" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-zinc-400">Price</p>
                                                        <input type="number" value={item.Price} onChange={(e) => updateStock(idx, "Price", parseFloat(e.target.value) || 0)} className="w-full bg-zinc-600 border border-zinc-500 rounded px-2 py-1 text-sm text-white" min="0" step="0.01" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-zinc-400">Value</p>
                                                        <p className="text-sm font-bold text-green-400">${item.Value.toFixed(2)}</p>
                                                    </div>
                                                    <div className="flex items-end gap-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-zinc-400">%</p>
                                                            <p className="text-sm font-bold text-white">{item.Percentage.toFixed(1)}%</p>
                                                        </div>
                                                        <button onClick={() => removeStock(idx)} className="bg-red-600/20 hover:bg-red-600/40 text-red-400 p-1.5 rounded text-lg transition">−</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                                    <h3 className="text-sm font-semibold text-white mb-4">Add Stock</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                        <input type="text" value={newTicker} onChange={(e) => setNewTicker(e.target.value)} placeholder="Ticker" className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-white placeholder-zinc-500" />
                                        <input type="number" value={newShares} onChange={(e) => setNewShares(parseFloat(e.target.value) || 0)} placeholder="Shares" className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-white placeholder-zinc-500" min="0" step="0.1" />
                                        <input type="number" value={newPrice} onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)} placeholder="Price" className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-sm text-white placeholder-zinc-500" min="0" step="0.01" />
                                        <button onClick={addStock} className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition">Add Stock</button>
                                    </div>
                                </div>

                                <button onClick={handleSampleAnalyze} disabled={loading || portfolio.length === 0} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition">
                                    {loading ? "Analyzing..." : "Compare with Current"}
                                </button>
                            </div>
                        )}

                        {activeTab === "ml" && (
                            <PCAClusteringCard report={report} />
                        )}
                    </>
                )}
            </div>
        </PageShell>
    )
}