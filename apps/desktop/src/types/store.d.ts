interface Setting {
   maxItem: number;
   shortcut: string;
}

interface ClipboardHistory {
   id: string;
   value: string;
   isImage: boolean;
}

interface StoreState {
   clipboardHistory: ClipboardHistory[];
   setting: Setting;
}
