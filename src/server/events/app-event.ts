import { app, ipcMain } from 'electron';
import { appEvent } from '../../configs/constants';
import { store } from '../../main';

ipcMain.handle(appEvent.setting, () => {
   const SETTING = store.get('setting');

   return SETTING;
});

ipcMain.handle(appEvent.exit, () => {
   return app.exit();
});
