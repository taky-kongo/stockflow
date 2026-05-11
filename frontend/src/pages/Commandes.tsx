import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingBag, Plus, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import {
    getCommandes,
    livrerCommande,
    createCommande,
    confirmerCommande,
    annulerCommande
} from '../api/commandeService';
import { getProduits } from '../api/produitService';
import { CreateCommandeModal } from '../components/commandes/CreateCommandeModal';

export const Commandes = () => {
    const { boutiqueId } = useStore();
    const queryClient = useQueryClient();
    const [statutFilter, setStatutFilter] = useState('TOUT');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Récupération des données
    const { data: commandes } = useQuery({
        queryKey: ['commandes', boutiqueId],
        queryFn: () => getCommandes(boutiqueId)
    });
    const { data: produits } = useQuery({
        queryKey: ['produits', boutiqueId],
        queryFn: () => getProduits(boutiqueId)
    });

    // Mutation unique pour gérer tous les changements de statut
    const updateStatutMutation = useMutation({
        mutationFn: async ({ id, statut }: { id: number, statut: string }) => {
            if (statut === 'LIVREE') return livrerCommande(id);
            if (statut === 'CONFIRMEE') return confirmerCommande(id);
            if (statut === 'ANNULEE') return annulerCommande(id);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['commandes'] });
            // Si on livre, le stock change, donc on rafraîchit aussi les produits
            if (variables.statut === 'LIVREE') {
                queryClient.invalidateQueries({ queryKey: ['produits'] });
                alert("✅ Commande LIVRÉE : Le stock a été mis à jour avec succès !");
            }
        },
        onError: (error: any) => {
            alert("Erreur : " + (error.response?.data?.message || "L'action a échoué"));
        }
    });

    const createMutation = useMutation({
        mutationFn: createCommande,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['commandes'] });
            setIsModalOpen(false);
        }
    });

    const filtered = commandes?.filter((c: any) => statutFilter === 'TOUT' || c.statut === statutFilter);

    // Fonction pour afficher les boutons d'action selon le statut
    const renderActions = (c: any) => {
        if (c.statut === 'LIVREE' || c.statut === 'ANNULEE') return null;

        return (
            <div className="flex gap-2">
                {c.statut === 'EN_ATTENTE' && (
                    <>
                        <button
                            onClick={(e) => { e.preventDefault(); updateStatutMutation.mutate({ id: c.id, statut: 'CONFIRMEE' })}}
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700"
                        >
                            <CheckCircle size={14}/> CONFIRMER
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); if(window.confirm("Annuler ?")) updateStatutMutation.mutate({ id: c.id, statut: 'ANNULEE' })}}
                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200"
                        >
                            <XCircle size={14}/> ANNULER
                        </button>
                    </>
                )}

                {c.statut === 'CONFIRMEE' && (
                    <button
                        onClick={(e) => { e.preventDefault(); updateStatutMutation.mutate({ id: c.id, statut: 'LIVREE' })}}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition-all shadow-md"
                    >
                        <Truck size={16} /> MARQUER COMME LIVRÉE
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="p-8 space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Commandes Fournisseurs</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all">
                    <Plus size={20}/> Nouvelle Commande
                </button>
            </header>

            {/* Filtres par Onglets */}
            <div className="flex border-b border-slate-200">
                {['TOUT', 'EN_ATTENTE', 'CONFIRMEE', 'LIVREE', 'ANNULEE'].map(s => (
                    <button
                        key={s} onClick={() => setStatutFilter(s)}
                        className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${statutFilter === s ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                        {s.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Liste des commandes */}
            <div className="grid gap-4">
                {filtered?.map((c: any) => (
                    <details key={c.id} className="bg-white border rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                        <summary className="p-5 flex justify-between items-center cursor-pointer list-none">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${c.statut === 'LIVREE' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                    <ShoppingBag size={24}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{c.fournisseurNom}</h3>
                                    <p className="text-xs text-slate-400">Prévue le {c.dateLivraisonPrevue} • {c.lignes?.length} produits</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded text-[10px] font-black uppercase border ${
                                    c.statut === 'LIVREE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                        c.statut === 'CONFIRMEE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                }`}>
                                    {c.statut}
                                </span>
                                {renderActions(c)}
                            </div>
                        </summary>

                        <div className="px-5 pb-5 border-t bg-slate-50/50">
                            <table className="w-full text-sm mt-4 text-left">
                                <thead className="text-slate-400 font-bold uppercase text-[10px]">
                                <tr>
                                    <th className="py-2">Produit</th>
                                    <th className="py-2 text-center">Quantité</th>
                                    <th className="py-2 text-right">Prix Unit. Achat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {c.lignes?.map((l: any, i: number) => (
                                    <tr key={i} className="border-t border-slate-100">
                                        <td className="py-3 font-medium text-slate-700">{l.produitNom}</td>
                                        <td className="py-3 text-center font-bold">{l.quantiteCommandee}</td>
                                        <td className="py-3 text-right">{l.prixAchatUnitaire.toLocaleString()} FCFA</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </details>
                ))}
            </div>

            <CreateCommandeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                produits={produits}
                onSave={(data: any) => createMutation.mutate(data)}
            />
        </div>
    );
};