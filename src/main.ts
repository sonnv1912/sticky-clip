import {
   BrowserWindow,
   Menu,
   Tray,
   app,
   clipboard,
   globalShortcut,
   ipcMain,
   nativeImage,
   screen,
} from 'electron';
import started from 'electron-squirrel-startup';
import Store from 'electron-store';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import type { StoreState } from './types/store';
import { appEvent } from './configs/constants';

import './events/clipboard';
import './events/app';

let lastClipboardText = '';
let window: BrowserWindow;

export const store = new Store<StoreState>();
const MAX = 100;

const icon = nativeImage.createFromPath(
   app.isPackaged
      ? path.join(__dirname, '../../../FluentColorClipboard16.png')
      : path.join(
           __dirname,
           '../../src/assets/icons/FluentColorClipboard16.png',
        ),
);

if (started) {
   app.quit();
}

const show = () => {
   window.show();
   window.focus();
};

const hide = () => {
   window.hide();
};

const createWindow = () => {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize;
   const windowWidth = 600;
   const windowHeight = 600;
   const x = Math.round((width - windowWidth) / 2);
   const y = height - windowHeight;

   window = new BrowserWindow({
      x,
      y,
      icon,
      width: windowWidth,
      height: windowHeight,
      frame: false,
      center: true,
      roundedCorners: true,
      resizable: false,
      alwaysOnTop: true,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
      },
   }).on('blur', hide);

   app.dock.setIcon(icon);

   if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
   } else {
      window.loadFile(
         path.join(
            __dirname,
            `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
         ),
      );
   }

   if (!app.isPackaged) {
      window.webContents.openDevTools();
   }

   app.dock.hide();
};

const createTrackIcon = () => {
   const tray = new Tray(icon.resize({ height: 20, width: 20 }));

   const contextMenu = Menu.buildFromTemplate([
      {
         label: 'Hiện cửa sổ',
         click: show,
      },
      {
         label: 'Thoát',
         click: () => {
            app.quit();
         },
      },
   ]);

   tray.setToolTip('Clipboard Manager');
   tray.setContextMenu(contextMenu);
};

const watchClipboard = () => {
   setInterval(() => {
      const text = clipboard.readText();
      const history = store.get('clipboardHistory', []);

      if (text && text !== lastClipboardText) {
         lastClipboardText = text;

         if (history.length === MAX) {
            history.pop();
         }

         history.unshift({
            id: randomUUID(),
            value: text,
         });

         store.set('clipboardHistory', history);
      }
   }, 1000);
};

const initEvent = () => {
   ipcMain.handle(appEvent.hide, hide);

   ipcMain.handle(appEvent.show, show);

   globalShortcut.register('Shift+Control+V', () => {
      if (window.isVisible()) {
         hide();

         return;
      }

      show();
   });

   store.set('dirname', __dirname);
};

app.on('quit', () => {
   // globalShortcut.unregisterAll();
});

app.whenReady()
   .then(createWindow)
   .then(createTrackIcon)
   .then(watchClipboard)
   .then(initEvent);
