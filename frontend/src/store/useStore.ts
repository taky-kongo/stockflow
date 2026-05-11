import { create } from 'zustand';

interface AppState {
    boutiqueId: number;
    setBoutiqueId: (id: number) => void;
}

export const useStore = create<AppState>((set) => ({
    boutiqueId: 1,
    setBoutiqueId: (id) => set({ boutiqueId: id }),
}));