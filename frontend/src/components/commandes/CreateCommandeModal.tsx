// src/components/commandes/CreateCommandeModal.tsx
import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Produit, LigneCommande } from '../../types';

export const CreateCommandeModal = ({ isOpen, onClose, produits, onSave }: any) => {
    const { boutiqueId } = useStore();
    const [form, setForm] = useState({ fournisseurNom: '', fournisseurContact: '', dateLivraisonPrevue: '' });
    const [lignes, setLignes] = useState<LigneCommande[]>([]);

    if (!isOpen) return null;

    const addLigne = () => {
        setLignes([...lignes, { produitId: 0, quantiteCommandee: 1, prixAchatUnitaire: 0 }]);
    };

    const updateLigne = (index: number, field: keyof LigneCommande, value: any) => {
        const newLignes = [...lignes];
        newLignes[index] = { ...newLignes[index], [field]: value };
        setLignes(newLignes);
    };

    const removeLigne = (index: number) => setLignes(lignes.filter((_, i) => i !== index));

    const handleSubmit = () => {
        if (lignes.length === 0) return alert("Minimum 1 ligne requise");
        onSave({ ...form, boutiqueId, lignes });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">Nouvelle Commande Fournisseur</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    {/* Infos Fournisseur */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fournisseur</label>
                            <input className="w-full border rounded-lg p-2" type="text" onChange={e => setForm({...form, fournisseurNom: e.target.value})} placeholder="Nom" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact</label>
                            <input className="w-full border rounded-lg p-2" type="text" onChange={e => setForm({...form, fournisseurContact: e.target.value})} placeholder="Email/Tel" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Livraison Prévue</label>
                            <input className="w-full border rounded-lg p-2" type="date" onChange={e => setForm({...form, dateLivraisonPrevue: e.target.value})} />
                        </div>
                    </div>

                    {/* Lignes de commande */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-slate-700">Produits commandés</h3>
                            <button onClick={addLigne} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-md flex items-center gap-1 font-bold hover:bg-blue-100">
                                <Plus size={16}/> Ajouter un produit
                            </button>
                        </div>

                        <div className="border rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 font-bold border-b">
                                <tr>
                                    <th className="p-3">Produit (Recherche)</th>
                                    <th className="p-3 w-24 text-center">Qté</th>
                                    <th className="p-3 w-40">Prix Achat</th>
                                    <th className="p-3 w-10"></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y">
                                {lignes.map((ligne, index) => (
                                    <tr key={index}>
                                        <td className="p-2">
                                            <select
                                                className="w-full p-1.5 border rounded-md"
                                                onChange={e => updateLigne(index, 'produitId', Number(e.target.value))}
                                            >
                                                <option value="0">Sélectionner produit...</option>
                                                {produits?.map((p: Produit) => (
                                                    <option key={p.id} value={p.id}>{p.nom} ({p.sku})</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-2">
                                            <input className="w-full p-1.5 border rounded-md text-center" type="number" min="1"
                                                   value={ligne.quantiteCommandee} onChange={e => updateLigne(index, 'quantiteCommandee', Number(e.target.value))} />
                                        </td>
                                        <td className="p-2 text-right">
                                            <input className="w-full p-1.5 border rounded-md" type="number" placeholder="0"
                                                   onChange={e => updateLigne(index, 'prixAchatUnitaire', Number(e.target.value))} />
                                        </td>
                                        <td className="p-2">
                                            <button onClick={() => removeLigne(index)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 font-bold text-slate-600">Annuler</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 shadow-lg">
                        Créer la commande
                    </button>
                </div>
            </div>
        </div>
    );
};