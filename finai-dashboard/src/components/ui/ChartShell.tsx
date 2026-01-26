interface Props {
title: string
height?: number
}


export default function ChartShell({ title, height = 300 }: Props) {
return (
<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
<div className="text-sm text-zinc-400 mb-2 uppercase tracking-wide">
{title}
</div>
<div
className="flex items-center justify-center text-zinc-600"
style={{ height }}
>
Chart will render here
</div>
</div>
)
}