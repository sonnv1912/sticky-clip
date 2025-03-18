import { ipcMain, app } from 'electron';
import { appEvent } from '../configs/constants';

ipcMain.handle(appEvent.exit, () => {
   return app.exit();
});
