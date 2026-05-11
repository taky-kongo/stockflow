// src/pages/Stock.tsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import {getProduits, deleteProduit, ajusterStock, createProduit} from '../api/produitService';
import { AddProduitModal } from '../components/produits/AddProduitModal';

export const Stock = () => {
    const { boutiqueId } = useStore();
    const queryClient = useQueryClient();

    // États pour le filtrage et pagination
    const [search, setSearch] = useState('');
    const [categorieFilter, setCategorieFilter] = useState('');
    const [statutFilter, setStatutFilter] = useState('');
    const [page, setPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: produits} = useQuery({
        queryKey: ['produits', boutiqueId],
        queryFn: () => getProduits(boutiqueId)
    });

    // Mutation : Ajustement rapide (+/-)
    const adjustMutation = useMutation({
        mutationFn: ({ id, delta }: { id: number, delta: number }) => ajusterStock(id, delta),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produits'] })
    });

    // 1. Ajoute la mutation de création ici
    const createMutation = useMutation({
        mutationFn: createProduit,
        onSuccess: () => {
            // Rafraîchir la liste des produits après l'ajout
            queryClient.invalidateQueries({ queryKey: ['produits', boutiqueId] });
            setIsModalOpen(false); // Fermer la modale
        },
        onError: (error: any) => {
            alert("Erreur lors de la création du produit : " + (error.response?.data?.message || "Erreur inconnue"));
        }
    });

// 2. Vérifie que ton bouton dans le JSX appelle bien cette mutation
// (C'était déjà dans le code précédent, mais assure-toi de la correspondance)
    <AddProduitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data: any) => createMutation.mutate(data)}
    />

    // Mutation : Suppression avec gestion d'erreur
    const deleteMutation = useMutation({
        mutationFn: deleteProduit,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['produits'] }),
        onError: (error: any) => {
            const msg = error.response?.data?.message || "Impossible de supprimer : ce produit est lié à une commande active.";
            alert(msg);
        }
    });

    const confirmDelete = (id: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.")) {
            deleteMutation.mutate(id);
        }
    };

    // Logique de filtrage Frontend (en attendant la pagination Backend)
    const categories = Array.from(new Set(produits?.map(p => p.categorie) || []));
    const filteredProduits = produits?.filter(p => {
        const matchesSearch = p.nom.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
        const matchesCat = categorieFilter === '' || p.categorie === categorieFilter;
        const matchesStatut = statutFilter === '' || p.statut === statutFilter;
        return matchesSearch && matchesCat && matchesStatut;
    });

    // Pagination (20 par page)
    const pageSize = 20;
    const paginatedItems = filteredProduits?.slice(page * pageSize, (page + 1) * pageSize);

    const getStatutBadge = (p: any) => {
        if (p.quantiteStock <= 0) return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">RUPTURE</span>;
        if (p.quantiteStock < p.seuilAlerte) return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">ALERTE</span>;
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">OK</span>;
    };

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Inventaire des Produits</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition-all">
                    <Plus size={20} /> Nouveau Produit
                </button>
            </div>

            {/* Barre de filtrage avancée */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Rechercher par nom ou SKU..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="border border-slate-200 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500" value={categorieFilter} onChange={e => setCategorieFilter(e.target.value)}>
                    <option value="">Toutes les catégories</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select className="border border-slate-200 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500" value={statutFilter} onChange={e => setStatutFilter(e.target.value)}>
                    <option value="">Tous les statuts</option>
                    <option value="OK">OK</option>
                    <option value="ALERTE">Alerte</option>
                    <option value="RUPTURE">Rupture</option>
                </select>
            </div>

            {/* Tableau paginé */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4">Produit & SKU</th>
                        <th className="px-6 py-4">Catégorie</th>
                        <th className="px-6 py-4 text-center">Quantité</th>
                        <th className="px-6 py-4 text-center">Seuil</th>
                        <th className="px-6 py-4">Prix</th>
                        <th className="px-6 py-4 text-center">Statut</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {paginatedItems?.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-800">{p.nom}</div>
                                <div className="text-xs font-mono text-slate-400">{p.sku}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-600 text-sm">{p.categorie}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-3">
                                    <button onClick={() => adjustMutation.mutate({id: p.id, delta: -1})} className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600">-</button>
                                    <span className="font-bold w-8 text-center">{p.quantiteStock}</span>
                                    <button onClick={() => adjustMutation.mutate({id: p.id, delta: 1})} className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-600">+</button>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center text-slate-500">{p.seuilAlerte}</td>
                            <td className="px-6 py-4 font-medium">{p.prixUnitaire.toLocaleString()} FCFA</td>
                            <td className="px-6 py-4 text-center">{getStatutBadge(p)}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => confirmDelete(p.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Affichage de {paginatedItems?.length} sur {filteredProduits?.length} produits</span>
                    <div className="flex gap-2">
                        <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="p-2 border border-slate-200 rounded hover:bg-white disabled:opacity-30"><ChevronLeft size={20}/></button>
                        <button disabled={(page + 1) * pageSize >= (filteredProduits?.length || 0)} onClick={() => setPage(p => p + 1)} className="p-2 border border-slate-200 rounded hover:bg-white disabled:opacity-30"><ChevronRight size={20}/></button>
                    </div>
                </div>
            </div>

            <AddProduitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={(data: any) => createMutation.mutate(data)} />
        </div>
    );
};