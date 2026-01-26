interface Props {
label: string
value: string
subtext?: string
trend?: "up" | "down" | "neutral"
}


export default function Metric({ label, value, subtext, trend }: Props) {
const trendColor =
trend === "up"
? "text-green-500"
: trend === "down"
? "text-red-500"
: "text-zinc-400"


return (
<div>
<div className="text-zinc-400 text-sm mb-1">{label}</div>
<div className="text-2xl font-semibold">{value}</div>
{subtext && (
<div className={`text-sm mt-1 ${trendColor}`}>{subtext}</div>
)}
</div>
)
}