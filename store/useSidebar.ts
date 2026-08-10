import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface siderbarType {
  isDisplay: boolean;

  setIsDisplay: () => void;
}

export const useSiderBarStore = create<siderbarType>()(
  devtools((set) => ({
    isDisplay: true,
    setIsDisplay: () => set((state) => ({ isDisplay: !state.isDisplay })),
  })),
);
