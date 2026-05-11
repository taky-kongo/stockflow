import axios from 'axios';
import type { Produit } from '../types';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

export const getProduits = async (boutiqueId: number): Promise<Produit[]> => {
    const response = await api.get<Produit[]>(`/produits?boutiqueId=${boutiqueId}`);
    return response.data;
};

export const createProduit = async (produit: Partial<Produit> & { boutiqueId: number }) => {
    const response = await api.post('/produits', produit);
    return response.data;
};

export const deleteProduit = async (id: number) => {
    await api.delete(`/produits/${id}`);
};


export const ajusterStock = async (id: number, delta: number) => {
    // On change l'URL pour correspondre à ton @PatchMapping("/{id}/stock")
    const response = await api.patch<Produit>(`/produits/${id}/stock?delta=${delta}`);
    return response.data;
};