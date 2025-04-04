interface ClipboardStore {
   get: () => Promise<ClipboardHistory[]>;
   clear: () => void;
   removeItem: (index: ClipboardEventParams['removeItem']) => void;
   copyItem: (index: ClipboardEventParams['copyItem']) => void;
}

interface AppStore {
   isDev: boolean;

   exit: () => void;
   hide: () => void;

   setting: () => Promise<Setting>;
   updateSetting: (payload: Partial<Setting>) => void;
}
