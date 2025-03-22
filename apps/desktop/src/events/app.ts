import { app, ipcMain } from 'electron';
import { appEvent } from '../configs/constants';
import { store } from '../main';
import type { Setting } from '../types/store';

ipcMain.handle(appEvent.setting, () => {
   const SETTING = store.get('setting');

   return {
      dirname: __dirname,
      ...SETTING,
   };
});

ipcMain.handle(appEvent.exit, () => {
   return app.exit();
});

ipcMain.handle(appEvent.updateSetting, (_e, arg: Setting) => {
   const CLIPBOARD = store.get('clipboardHistory');
   const SETTING = store.get('setting');

   store.set('setting', {
      ...SETTING,
      ...arg,
   });

   if (arg.shortcut !== SETTING.shortcut) {
      app.relaunch();
      app.exit();
   }

   if (CLIPBOARD.length > arg.maxItem) {
      store.set('clipboardHistory', CLIPBOARD.slice(0, arg.maxItem));
   }
});
