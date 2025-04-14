interface ClipboardStore {
   get: () => Promise<ClipboardHistory[]>;
   clear: () => void;
   removeItem: (payload: ClipboardEventParams['removeItem']) => void;
   copyItem: (payload: ClipboardEventParams['copyItem']) => void;
   updateItem: (payload: ClipboardEventParams['updateItem']) => void;
}

interface AppStore {
   isDev: boolean;

   exit: () => void;
   hide: () => void;

   setting: () => Promise<Setting>;
   updateSetting: (payload: Partial<Setting>) => void;
}
