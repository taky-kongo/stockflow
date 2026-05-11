// src/components/produits/AddProduitModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AddProduitModal = ({ isOpen, onClose, onSuccess }: any) => {
    const { boutiqueId } = useStore();

    // On ajoute 'categorie' à l'état initial
    const [form, setForm] = useState({
        nom: '',
        sku: 'MAL-',
        categorie: 'Electronique', // Valeur par défaut
        prixUnitaire: 0,
        quantiteStock: 0,
        seuilAlerte: 5
    });

    const categoriesPredefinies = ["Electronique", "Alimentation", "Vêtements", "Divers"];

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.sku.startsWith('MAL-')) {
            alert("Le SKU doit impérativement commencer par MAL-");
            return;
        }
        onSuccess({ ...form, boutiqueId });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">Nouveau Produit</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* CHAMP NOM */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nom du produit</label>
                        <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                               value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} />
                    </div>

                    {/* CHAMP CATEGORIE (Le nouveau !) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                        <select
                            className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.categorie}
                            onChange={e => setForm({...form, categorie: e.target.value})}
                        >
                            {categoriesPredefinies.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* CHAMP SKU */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">SKU (MAL-XXXX)</label>
                        <input required type="text" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                               value={form.sku} onChange={e => setForm({...form, sku: e.target.value.toUpperCase()})} />
                    </div>

                    {/* GRILLE PRIX / STOCK */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Prix (FCFA)</label>
                            <input required type="number" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                   value={form.prixUnitaire} onChange={e => setForm({...form, prixUnitaire: Number(e.target.value)})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stock Initial</label>
                            <input required type="number" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                   value={form.quantiteStock} onChange={e => setForm({...form, quantiteStock: Number(e.target.value)})} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                        Enregistrer dans l'inventaire
                    </button>
                </form>
            </div>
        </div>
    );
};