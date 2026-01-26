interface Props {
title: string
}


export default function Header({ title }: Props) {
return (
<header className="border-b border-zinc-800 p-4 bg-black">
<h1 className="text-xl font-semibold text-white">{title}</h1>
</header>
)
}