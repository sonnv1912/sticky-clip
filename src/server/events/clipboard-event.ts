import { clipboard, ipcMain, nativeImage } from 'electron';
import { clipboardEvent } from '../../configs/constants';
import { store } from '../../main';

ipcMain.handle(clipboardEvent.get, () => {
   const history = store.get('clipboardHistory', []);

   return history;
});

ipcMain.handle(clipboardEvent.clear, () => {
   store.set('clipboardHistory', []);
});

ipcMain.handle(
   clipboardEvent.copyItem,
   (_e, arg: ClipboardEventParams['copyItem']) => {
      const history = store.get('clipboardHistory', []);
      const foundIndex = history.findIndex((item) => item.id === arg.id);

      if (arg.isImage) {
         const image = nativeImage.createFromDataURL(arg.value);

         clipboard.writeImage(image);
      } else {
         clipboard.writeText(arg.value);
      }

      history.splice(foundIndex, 1);
      history.unshift(arg);

      store.set('clipboardHistory', history);
   },
);

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

ipcMain.handle(
   clipboardEvent.updateItem,
   (_e, arg: ClipboardEventParams['updateItem']) => {
      const history = store.get('clipboardHistory', []);
      const foundIndex = history.findIndex((item) => item.id === arg.id);

      if (foundIndex > -1) {
         history[foundIndex] = arg;

         store.set('clipboardHistory', history);
      }
   },
);
