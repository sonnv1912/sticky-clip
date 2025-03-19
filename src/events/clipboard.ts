import { ipcMain } from 'electron';
import { clipboardEvent } from '../configs/constants';
import type { ClipboardEventParams } from '../types/event';
import { store } from '../main';

ipcMain.handle(clipboardEvent.get, () => {
   return store.get('clipboardHistory', []);
});

ipcMain.handle(clipboardEvent.clear, () => {
   store.set('clipboardHistory', []);
});

ipcMain.handle(
   clipboardEvent.removeItem,
   (_e, arg: ClipboardEventParams['removeItem']) => {
      const history = store.get('clipboardHistory', []);

      if (history.length > 0) {
         history.splice(arg, 1);

         store.set('clipboardHistory', history);
      }
   },
);
