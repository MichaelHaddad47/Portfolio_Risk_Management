export default function Sidebar() {
return (
<aside className="w-64 bg-zinc-900 text-white p-4">
<h2 className="text-lg font-bold mb-6">FINAI</h2>
<nav className="space-y-2 text-zinc-400">
<div className="hover:text-white cursor-pointer">Dashboard</div>
<div className="hover:text-white cursor-pointer">Portfolio</div>
<div className="hover:text-white cursor-pointer">Assets</div>
<div className="hover:text-white cursor-pointer">Settings</div>
</nav>
</aside>
)
}