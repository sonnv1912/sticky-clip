import type { env } from '@packages/configs/env';
import type { Release } from '@packages/types/data';
import { create } from 'zustand';

type State = Partial<{
   [key in keyof typeof env.repo]: Release;
}>;

type Action = {
   setRelease: (repo: keyof typeof env.repo, payload?: Release) => void;
   getMacDownload: (repo: keyof typeof env.repo) => string | undefined;
   getWinDownload: (repo: keyof typeof env.repo) => string | undefined;
};

export const useLatestRelease = create<State & Action>((set, get) => ({
   getMacDownload(repo) {
      const result = get()?.[repo]?.assets.find((t) => t.name.includes('dmg'));

      return result?.browser_download_url;
   },
   getWinDownload(repo) {
      const result = get()?.[repo]?.assets.find((t) => t.name.includes('exe'));

      return result?.browser_download_url;
   },
   setRelease(repo, payload) {
      set({
         [repo]: payload,
      });
   },
}));
