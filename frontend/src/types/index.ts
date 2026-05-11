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

export type StatutProduit = 'OK' | 'ALERTE' | 'RUPTURE';

export interface Produit {
    id: number;
    nom: string;
    sku: string;
    categorie: string;
    quantiteStock: number;
    seuilAlerte: number;
    prixUnitaire: number;
    statut: StatutProduit;
}

export interface LigneCommande {
    produitId: number;
    produitNom?: string; // Optionnel pour l'affichage
    quantiteCommandee: number;
    prixAchatUnitaire: number;
}

export interface CommandeRequest {
    fournisseurNom: string;
    fournisseurContact: string;
    dateLivraisonPrevue: string;
    boutiqueId: number;
    lignes: LigneCommande[];
}