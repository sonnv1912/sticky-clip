import { contextBridge, ipcRenderer } from 'electron';
import type { ClipboardEventParams } from './types/event';
import { appEvent, clipboardEvent } from './configs/constants';

contextBridge.exposeInMainWorld('clipboard', {
   get: () => ipcRenderer.invoke(clipboardEvent.get),
   clear: () => ipcRenderer.invoke(clipboardEvent.clear),

   removeItem: (index: ClipboardEventParams['removeItem']) =>
      ipcRenderer.invoke(clipboardEvent.removeItem, index),
});

contextBridge.exposeInMainWorld('app', {
   exit: () => ipcRenderer.invoke(appEvent.exit),
   hide: () => ipcRenderer.invoke(appEvent.hide),
});
