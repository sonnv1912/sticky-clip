interface Setting {
   maxItem: number;
   shortcut: string;
   openAtStartup: boolean;
}

interface ClipboardHistory {
   id: string;
   value: string;
   isImage: boolean;
   marked: boolean;
}

interface StoreState {
   clipboardHistory: ClipboardHistory[];
   setting: Setting;
   lastClipboardImage?: string;
   lastClipboardText?: string;
}
