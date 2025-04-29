import { defaultTheme } from '@configs/constants';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
   theme: string;
   themeCollection: Theme;
};

type Action = {
   setAppState: (payload: Partial<State>) => void;
};

export const useAppStore = create<State & Action>()(
   persist(
      (set) => ({
         theme: 'dark',
         themeCollection: defaultTheme,
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
