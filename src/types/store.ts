export type Setting = {
   maxItem: number;
   shortcut: string;
};

export type StoreState = {
   clipboardHistory: { id: string; value: string }[];
   setting: Setting;
};
