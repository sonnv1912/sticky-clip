import './events/app';
import './events/clipboard';

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
import Store from 'electron-store';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { appEvent, DEFAULT_SETTING } from './configs/constants';
import { uniqBy } from 'lodash';

let lastClipboardText = '';
let lastClipboardImage = '';
let window: BrowserWindow;

export const store = new Store<StoreState>();

const icon = nativeImage.createFromPath(
   app.isPackaged
      ? path.join(__dirname, '../../../FluentColorClipboard16.png')
      : path.join(
           __dirname,
           '../../src/assets/icons/FluentColorClipboardTextEdit20.png',
        ),
);

const show = () => {
   window.show();
   window.focus();
};

const hide = () => {
   window.hide();
};

export const createWindow = () => {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize;
   const windowWidth = app.isPackaged ? 600 : 1200;
   const windowHeight = height;
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
   }).on('blur', () => {
      if (app.isPackaged) {
         hide();
      }
   });

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
      window.setAlwaysOnTop(false);
      window.setResizable(true);
   }

   if (app.isPackaged) {
      app.dock.hide();
   }
};

const createTrackIcon = () => {
   const tray = new Tray(icon.resize({ height: 20, width: 20 }));
   const SETTING = store.get('setting', DEFAULT_SETTING);

   const contextMenu = Menu.buildFromTemplate([
      {
         label: 'Open',
         click: show,
         accelerator: SETTING.shortcut,
      },
      {
         label: 'Quit',
         click: () => {
            app.quit();
         },
      },
   ]);

   tray.setToolTip('StickyClip');
   tray.setContextMenu(contextMenu);
};

const watchClipboard = () => {
   setInterval(() => {
      const SETTING = store.get('setting', DEFAULT_SETTING);
      const CLIPBOARD = store.get('clipboardHistory', []);
      const text = clipboard.readText();
      const image = clipboard.readImage();

      if (text && text !== lastClipboardText) {
         lastClipboardText = text;

         if (CLIPBOARD.length === SETTING.maxItem) {
            CLIPBOARD.pop();
         }

         CLIPBOARD.unshift({
            id: randomUUID(),
            value: text,
            isImage: false,
         });

         store.set('clipboardHistory', uniqBy(CLIPBOARD, 'value'));
      }

      if (!image.isEmpty() && image.toDataURL() !== lastClipboardImage) {
         lastClipboardImage = image.toDataURL();

         if (CLIPBOARD.length === SETTING.maxItem) {
            CLIPBOARD.pop();
         }

         CLIPBOARD.unshift({
            id: randomUUID(),
            value: image.toDataURL(),
            isImage: true,
         });

         store.set('clipboardHistory', uniqBy(CLIPBOARD, 'value'));
      }
   }, 1000);
};

const initEvent = () => {
   const SETTING = store.get('setting', DEFAULT_SETTING);

   ipcMain.handle(appEvent.hide, hide);

   ipcMain.handle(appEvent.show, show);

   if (SETTING.shortcut) {
      globalShortcut.register(SETTING.shortcut, () => {
         if (window.isVisible()) {
            hide();

            return;
         }

         show();
      });
   }
};

app.on('quit', () => {
   globalShortcut.unregisterAll();
});

app.whenReady()
   .then(createWindow)
   .then(createTrackIcon)
   .then(watchClipboard)
   .then(initEvent);
