export type StatutCommande = 'EN_ATTENTE' | 'CONFIRMEE' | 'LIVREE' | 'ANNULEE';

export interface Produit {
    id: number;
    sku: string;
    nom: string;
    prixUnitaire: number;
    quantiteStock: number;
    seuilAlerte: number;
}

export interface DashboardData {
    resume: {
        totalProduits: number;
        produitsOk: number;
        produitsEnAlerte: number;
        produitsEnRupture: number;
        valeurTotaleStock: number;
    };
    alertesCritiques: Produit[];
    totalCommandesEnAttente: number;
    commandesEnRetard: number;
    commandesRecentes: any[];
}