// src/api/commandeService.ts
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

export const getCommandes = async (boutiqueId: number) => {
    const response = await api.get(`/commandes?boutiqueId=${boutiqueId}`);
    return response.data;
};

export const livrerCommande = async (id: number) => {
    const response = await api.post(`/commandes/${id}/livrer`);
    return response.data;
};

export const createCommande = async (commande: any) => {
    const response = await api.post('/commandes', commande);
    return response.data;
};

export const confirmerCommande = async (id: number) => {
    // On envoie un objet { statut: "CONFIRMEE" } dans le body (2ème argument d'axios.patch)
    const response = await api.patch(`/commandes/${id}/statut`, { statut: "CONFIRMEE" });
    return response.data;
};

export const annulerCommande = async (id: number) => {
    const response = await api.patch(`/commandes/${id}/statut`, { statut: "ANNULEE" });
    return response.data;
};