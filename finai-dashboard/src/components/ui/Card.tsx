interface Props {
title?: string
children: React.ReactNode
className?: string
}


export default function Card({ title, children, className = "" }: Props) {
return (
<div className={`bg-zinc-900 border border-zinc-800 rounded-xl p-4 ${className}`}>
{title && (
<div className="text-sm text-zinc-400 mb-4 uppercase tracking-wide font-medium">
{title}
</div>
)}
{children}
</div>
)
}