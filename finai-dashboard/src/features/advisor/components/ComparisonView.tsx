type Props = {
    original: any
    modified: any
    onClose: () => void
}

export default function ComparisonView({ original, modified, onClose }: Props) {
    const metrics = [
        { label: "Risk Level", key: "portfolio_risk_classification", format: (v: any) => v.toUpperCase() },
        { label: "Volatility", key: "volatility", format: (v: any) => `${(v * 100).toFixed(2)}%` },
        { label: "Sharpe Ratio", key: "sharpe_ratio", format: (v: any) => v.toFixed(2) },
        { label: "Max Drawdown", key: "max_drawdown", format: (v: any) => `${(v * 100).toFixed(2)}%` },
        { label: "Diversification", key: "diversification", format: (v: any) => v.diversification_score.toFixed(0) },
        { label: "Avg Correlation", key: "correlation_analysis", format: (v: any) => v.average_pairwise_correlation.toFixed(2) },
    ]

    const getDifference = (original: any, modified: any, key: string) => {
        let origVal = original[key]
        let modVal = modified[key]
        if (typeof origVal === "object") {
            origVal = origVal[Object.keys(origVal)[0]] || 0
            modVal = modVal[Object.keys(modVal)[0]] || 0
        }
        const diff = modVal - origVal
        return { diff, improved: diff < 0 ? "✓" : diff > 0 ? "↑" : "=" }
    }

    return (
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white">Portfolio Comparison</h3>
                <button onClick={onClose} className="text-zinc-400 hover:text-white text-lg transition">×</button>
            </div>
            <div className="space-y-2">
                {metrics.map((m, idx) => {
                    const { diff, improved } = getDifference(original, modified, m.key)
                    return (
                        <div key={idx} className="bg-zinc-700/50 rounded p-3 flex items-center justify-between">
                            <span className="text-sm text-zinc-300">{m.label}</span>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-xs text-zinc-400">Original</p>
                                    <p className="text-sm font-medium text-white">{m.format(original[m.key])}</p>
                                </div>
                                <div className="text-center">
                                    <p className={`text-lg font-bold ${diff < 0 ? "text-green-400" : diff > 0 ? "text-red-400" : "text-zinc-400"}`}>{improved}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-zinc-400">New</p>
                                    <p className="text-sm font-medium text-white">{m.format(modified[m.key])}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}