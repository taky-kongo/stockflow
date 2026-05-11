import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';

const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <Package size={20} />, label: 'Stock & Produits', active: false },
    { icon: <ShoppingCart size={20} />, label: 'Commandes', active: false },
];

export const Sidebar = () => (
    <aside className="w-64 bg-slate-900 h-screen sticky top-0 text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">S</div>
            <span className="text-xl font-bold tracking-tight">StockFlow</span>
        </div>

        <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
                <a
                    key={item.label}
                    href="#"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                </a>
            ))}
        </nav>
    </aside>
);