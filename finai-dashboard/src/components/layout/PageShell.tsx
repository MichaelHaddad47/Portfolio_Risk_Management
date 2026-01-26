import Sidebar from "./Sidebar"
import Header from "./Header"


interface Props {
title: string
children: React.ReactNode
}


export default function PageShell({ title, children }: Props) {
return (
<div className="flex min-h-screen bg-black">
<Sidebar />
<div className="flex-1 flex flex-col">
<Header title={title} />
<main className="p-6 text-white flex-1">{children}</main>
</div>
</div>
)
}