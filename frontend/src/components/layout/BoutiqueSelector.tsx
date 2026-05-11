// src/components/layout/BoutiqueSelector.tsx
import { Store } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const BoutiqueSelector = () => {
    const { boutiqueId, setBoutiqueId } = useStore();

    const boutiques = [
        { id: 1, name: 'Malick - Abidjan' },
        { id: 2, name: 'Malick - Dakar' },
        { id: 3, name: 'Malick - Paris' },
    ];

    return (
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm">
            <Store size={18} className="text-blue-600" />
            <select
                value={boutiqueId}
                onChange={(e) => setBoutiqueId(Number(e.target.value))}
                className="text-sm font-semibold bg-transparent border-none focus:ring-0 cursor-pointer text-slate-700"
            >
                {boutiques.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                ))}
            </select>
        </div>
    );
};