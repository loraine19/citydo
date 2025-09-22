// src/application/stores/NavStore.ts
import { create } from 'zustand';

interface NavStore {
  searchSection: React.ReactNode | null;
  setSearchSection: (value: React.ReactNode | null) => void;
  tabSection: React.ReactNode | null;
  setTabSection: (value: React.ReactNode | null) => void;
  detailSection: React.ReactNode | null;
  setDetailSection: (value: React.ReactNode | null) => void;

}


export const useNavStore = create<NavStore>((set) => {
  return {
    searchSection: null,
    setSearchSection: (value: React.ReactNode | null) => set(() => ({ searchSection: value })),
    tabSection: null,
    setTabSection: (value: React.ReactNode | null) => set(() => ({ tabSection: value })),
    detailSection: null,
    setDetailSection: (value: React.ReactNode | null) => set(() => ({ detailSection: value })),

  };
});