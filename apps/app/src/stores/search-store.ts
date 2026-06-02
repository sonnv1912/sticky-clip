import { create } from 'zustand';

type State = {
   query: string;
   mode: 'header' | 'search';
};

type Action = {
   setSearchState: (payload: Partial<State>) => void;
};

export const useSearchStore = create<State & Action>((set) => ({
   query: '',
   mode: 'header',
   setSearchState(payload) {
      set((prev) => ({
         ...prev,
         ...payload,
      }));
   },
}));
