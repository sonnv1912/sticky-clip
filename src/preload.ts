import { contextBridge, ipcRenderer } from 'electron';
import type { ClipboardEventParams } from './types/event';
import { appEvent, clipboardEvent } from './configs/constants';

contextBridge.exposeInMainWorld('clipboard', {
   get: () => ipcRenderer.invoke(clipboardEvent.get),
   clear: () => ipcRenderer.invoke(clipboardEvent.clear),

   copyItem: (payload: ClipboardEventParams['copyItem']) =>
      ipcRenderer.invoke(clipboardEvent.copyItem, payload),

   removeItem: (payload: ClipboardEventParams['removeItem']) =>
      ipcRenderer.invoke(clipboardEvent.removeItem, payload),
});

contextBridge.exposeInMainWorld('app', {
   exit: () => ipcRenderer.invoke(appEvent.exit),
   hide: () => ipcRenderer.invoke(appEvent.hide),
   setting: () => ipcRenderer.invoke(appEvent.setting),

   updateSetting: (data: Setting) =>
      ipcRenderer.invoke(appEvent.updateSetting, data),
});
