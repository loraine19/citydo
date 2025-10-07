// src/application/stores/UxStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cryptedStorage } from '../../infrastructure/services/storageService';

interface UxStore {
  color: string;
  setColor: (color: string) => void;
  getColor: (path?: string) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
  navBottom: boolean;
  setNavBottom: (value: boolean) => void;
  hideNavBottom: boolean;
  setHideNavBottom: (value: boolean) => void;

}

const storage = new cryptedStorage();

export const useUxStore = create<UxStore, [['zustand/persist', UxStore]]>(
  persist((set) => {
    return {
      dark: false,
      setDark: (value: boolean) => set(() => ({ dark: value })),
      navBottom: true,
      setNavBottom: (value: boolean) => set(() => ({ navBottom: value })),
      hideNavBottom: false,
      setHideNavBottom: (value: boolean) => set(() => ({ hideNavBottom: value })),
      color: 'slate',
      setColor: (color: string) => set({ color }),

      getColor: (path?: string) => {
        let color = 'slate';
        if (path) {
          const type = new URLSearchParams(path.split("/")[1]).toString().replace("=", '');
          switch (type) {
            case 'service':
              color = 'sky';
              break;
            case 'evenement':
              color = 'cyan';
              break;
            case 'groupe':
              color = 'teal';
              break;
            case 'annonce':
              color = 'rose';
              break;
            case 'vote':
            case 'cagnotte':
            case 'sondage':
            case 'notification':
              color = 'orange';
              break;
            case 'chat':
              color = 'cyan';
              break;

            case 'sign':
            case 'flag':
            case 'conciliation':
              color = 'error';
              break;
            default:
              color = 'slate';
          }
        }
        set({ color });
      }
    }
  },
    {
      name: 'ux',
      storage: createJSONStorage(() => storage),
    }
  )
);
