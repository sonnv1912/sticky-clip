interface ClipboardAPI {
	get: () => Promise<ClipboardHistory[]>;
	clear: () => void;
	removeItem: (index: ClipboardEventParams["removeItem"]) => void;
	copyItem: (index: ClipboardEventParams["copyItem"]) => void;
}

interface AppAPI {
	exit: () => void;
	hide: () => void;
	setting: () => Promise<Setting>;
	updateSetting: (payload: Partial<Setting>) => void;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface Window {
	clipboard: ClipboardAPI;
	app: AppAPI;
}

declare module "electron-store" {
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
