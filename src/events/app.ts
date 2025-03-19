import { ipcMain, app } from 'electron';
import { appEvent } from '../configs/constants';

ipcMain.handle(appEvent.info, () => {
   return {
      dirname: __dirname,
   };
});

ipcMain.handle(appEvent.exit, () => {
   return app.exit();
});
