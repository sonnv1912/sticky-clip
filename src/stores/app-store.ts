import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
   theme: 'dark' | 'light';
};

type Action = {
   setAppState: (payload: Partial<State>) => void;
};

export const useAppStore = create<State & Action>()(
   persist(
      (set) => ({
         theme: 'dark',
         setAppState(payload) {
            set((prev) => ({
               ...prev,
               ...payload,
            }));
         },
      }),
      {
         name: 'app',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
