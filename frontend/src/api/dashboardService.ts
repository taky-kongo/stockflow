import axios from 'axios';
import type { DashboardData } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const getDashboard = async (boutiqueId: number): Promise<DashboardData> => {
    const response = await api.get<DashboardData>(`/dashboard?boutiqueId=${boutiqueId}`);
    return response.data;
};