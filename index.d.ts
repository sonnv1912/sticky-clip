// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface Window {
   clipboard: ClipboardStore;
   app: AppStore;
}

declare module 'electron-store' {
   class Store<T> {
      constructor(options?: { defaults?: T });
      get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K];
      set<K extends keyof T>(key: K, value: T[K]): void;
      has(key: keyof T): boolean;
      delete(key: keyof T): void;
      clear(): void;
   }

   export = Store;
}
