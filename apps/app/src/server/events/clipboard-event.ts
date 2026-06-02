import { clipboard, ipcMain, nativeImage } from 'electron';
import { clipboardEvent } from '../../configs/constants';
import { store } from '../../main';
import { sortByMarked } from '@/utils/common';
import { unionBy } from 'lodash';

ipcMain.handle(clipboardEvent.get, () => {
   const clipboardHistory = store.get('clipboardHistory', []);

   return clipboardHistory;
});

ipcMain.handle(clipboardEvent.clear, () => {
   store.set('clipboardHistory', []);
});

ipcMain.handle(
   clipboardEvent.copyItem,
   (_e, arg: ClipboardEventParams['copyItem']) => {
      const clipboardHistory = store.get('clipboardHistory', []);
      const foundIndex = clipboardHistory.findIndex(
         (item) => item.id === arg.id,
      );
      const originalItem = clipboardHistory[foundIndex];

      if (arg.isImage) {
         const image = nativeImage.createFromDataURL(arg.value);

         clipboard.writeImage(image);
         store.set('lastClipboardImage', image.toDataURL());
      } else {
         clipboard.writeText(arg.value);
         store.set('lastClipboardText', arg.value);
      }

      clipboardHistory.splice(foundIndex, 1);

      // Preserve the original item's marked state
      const updatedItem = { ...arg, marked: originalItem?.marked || false };
      clipboardHistory.unshift(updatedItem);

      store.set(
         'clipboardHistory',
         unionBy(sortByMarked(clipboardHistory), 'value'),
      );
   },
);

ipcMain.handle(
   clipboardEvent.removeItem,
   (_e, arg: ClipboardEventParams['removeItem']) => {
      const clipboardHistory = store.get('clipboardHistory', []);

      if (clipboardHistory.length >= 0) {
         clipboardHistory.splice(arg, 1);

         store.set('clipboardHistory', clipboardHistory);
      }
   },
);

ipcMain.handle(
   clipboardEvent.updateItem,
   (_e, arg: ClipboardEventParams['updateItem']) => {
      const clipboardHistory = store.get('clipboardHistory', []);
      const foundIndex = clipboardHistory.findIndex(
         (item) => item.id === arg.id,
      );

      if (foundIndex > -1) {
         clipboardHistory[foundIndex] = arg;

         store.set('clipboardHistory', sortByMarked(clipboardHistory));
      }
   },
);
