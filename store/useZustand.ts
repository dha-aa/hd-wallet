import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


interface Keys {
  publickey: string;
  privatekey: string;
}

interface MnoState {
  mnemonic: string;
  numberofwal: number;
  keys: Keys[];
  setMnemonic: (mnemonic: string) => void;
  addKey: (key: Keys) => void;
  removeWallet: (index: number) => void;
  clearAllWallets: () => void;
  incrementWalletCount: () => void;
  resetWalletCount: () => void;
}

export const useMnoStore = create<MnoState>()(
  persist(
    (set) => ({
      mnemonic: "",
      numberofwal: 1,
      keys: [],

      setMnemonic: (mnemonic) => set(() => ({ mnemonic, keys: [] })),

      addKey: (key) =>
        set((state) => {
          const isDuplicate = state.keys.some(
            (existingKey) =>
              existingKey.publickey === key.publickey ||
              existingKey.privatekey === key.privatekey
          );

          if (!isDuplicate) {
            return { keys: [...state.keys, key], numberofwal: state.numberofwal + 1 };
          }
          return state;
        }),

      removeWallet: (index) =>
        set((state) => ({
          keys: state.keys.filter((_, i) => i !== index),
          numberofwal: Math.max(1, state.numberofwal - 1),
        })),

      clearAllWallets: () => set(() => ({ keys: [], numberofwal: 1 })),

      incrementWalletCount: () =>
        set((state) => ({ numberofwal: state.numberofwal + 1 })),

      resetWalletCount: () => set(() => ({ numberofwal: 1 })),
    }),
    {
      name: "mno-store",
      storage:  createJSONStorage(() => localStorage),
    }
  )
);
