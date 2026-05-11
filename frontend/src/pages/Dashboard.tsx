import { useQuery } from '@tanstack/react-query';
import { Package, AlertTriangle, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import { getDashboard } from '../api/dashboardService';
import { StatCard } from '../components/dashboard/StatCard';
import { useStore } from '../store/useStore';
import { BoutiqueSelector } from '../components/layout/BoutiqueSelector';

export const Dashboard = () => {
    const { boutiqueId } = useStore();

    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard', boutiqueId], // Le cache se videra dès qu'on change de boutique !
        queryFn: () => getDashboard(boutiqueId)
    });

    if (isLoading) return <div className="p-8 text-center animate-pulse">Chargement du Dashboard...</div>;
    if (error) return <div className="p-8 text-red-500">Erreur lors de la récupération des données</div>;

    return (
        <div className="p-8 bg-slate-50 min-h-screen space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord</h1>
                    <p className="text-slate-500 text-sm">Vue d'ensemble de votre activité</p>
                </div>
                <BoutiqueSelector /> {/* Notre nouveau sélecteur 👇 */}
            </header>

            {/* 📊 Section Résumé (StatCards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Produits"
                    value={data?.resume.totalProduits || 0}
                    icon={<Package size={24} />}
                />
                <StatCard
                    label="En Alerte"
                    value={data?.resume.produitsEnAlerte || 0}
                    icon={<AlertTriangle size={24} className="text-amber-500" />}
                />
                <StatCard
                    label="Commandes en attente"
                    value={data?.totalCommandesEnAttente || 0}
                    icon={<Clock size={24} className="text-blue-500" />}
                />
                <StatCard
                    label="Valeur du Stock"
                    value={`${data?.resume.valeurTotaleStock.toLocaleString()} FCFA`}
                    icon={<TrendingUp size={24} className="text-emerald-500" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 🚨 Alertes Critiques (Tableau) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-500" />
                        <h2 className="font-semibold text-slate-800">Alertes Critiques de Stock</h2>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-3">Produit</th>
                            <th className="px-6 py-3">SKU</th>
                            <th className="px-6 py-3">Stock Actuel</th>
                            <th className="px-6 py-3">Seuil</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {data?.alertesCritiques.map((produit) => (
                            <tr key={produit.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{produit.nom}</td>
                                <td className="px-6 py-4 text-slate-500">{produit.sku}</td>
                                <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                      {produit.quantiteStock}
                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{produit.seuilAlerte}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* 📦 Commandes Récentes (List) */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <ShoppingCart size={20} className="text-blue-500" />
                        Commandes Récentes
                    </h2>
                    <div className="space-y-4">
                        {data?.commandesRecentes.map((commande) => (
                            <div key={commande.id} className="flex justify-between items-start p-3 rounded-lg border border-slate-50 bg-slate-50/50">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{commande.fournisseurNom}</p>
                                </div>
                                <span className={`text-[10px] uppercase px-2 py-1 rounded font-bold ${
                                    commande.statut === 'EN_ATTENTE' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                  {commande.statut}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};