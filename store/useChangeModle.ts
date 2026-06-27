import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChangeModelState {
  provider: string;
  model: string;

  setProvider: (provider: string) => void;
  setModel: (model: string) => void;
}

export const useChangeModelStore = create<ChangeModelState>()(
  devtools((set) => ({
    provider: 'ZAI',
    model: 'GLM-4-FlashX',
    setProvider: (provider) => set({ provider: provider }),
    setModel: (model) => set({ model: model }),
  })),
);
