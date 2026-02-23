interface Props {
title: string
}


export default function Header({ title }: Props) {
return (
<header className="border-b border-zinc-800 p-6 bg-black">
<h1 className="text-2xl font-bold text-white">{title}</h1>
</header>
)
}