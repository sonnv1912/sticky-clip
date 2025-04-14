import { create } from 'zustand';

type State = {
   theme: 'dark' | 'light';
};

type Action = {
   setAppState: (payload: Partial<State>) => void;
};

export const useAppStore = create<State & Action>((set) => ({
   theme: 'dark',
   setAppState(payload) {
      set((prev) => ({
         ...prev,
         ...payload,
      }));
   },
}));
