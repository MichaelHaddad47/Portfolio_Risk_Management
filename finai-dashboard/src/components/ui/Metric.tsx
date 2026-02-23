interface Props {
label: string
value: string
subtext?: string
trend?: "up" | "down" | "neutral"
}


export default function Metric({ label, value, subtext, trend }: Props) {
const trendColor =
trend === "up"
? "text-green-400"
: trend === "down"
? "text-red-400"
: "text-zinc-400"


return (
<div>
<div className="text-zinc-400 text-sm mb-1 uppercase tracking-wide">{label}</div>
<div className="text-3xl font-bold text-white mb-1">{value}</div>
{subtext && (
<div className={`text-sm ${trendColor}`}>{subtext}</div>
)}
</div>
)
}