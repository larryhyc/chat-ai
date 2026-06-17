import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatState {
  message: string;
  setMessage: (msg: string) => void;
  clearMessage: () => void;
}

export const useChatStore = create<ChatState>()(
  devtools((set) => ({
    message: '',
    setMessage: (msg) => set({ message: msg }),
    clearMessage: () => set({ message: '' }),
  })),
);
