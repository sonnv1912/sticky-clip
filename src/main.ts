import './server/events/app-event';
import './server/events/clipboard-event';

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
import { uniqBy } from 'lodash';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { DEFAULT_SETTING, appEvent } from './configs/constants';

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
      center: true,
      roundedCorners: true,
      frame: !app.isPackaged,
      resizable: !app.isPackaged,
      show: false,
      backgroundColor: '#232323',
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
      },
   }).on('blur', () => {
      if (app.isPackaged) {
         hide();
      }
   });

   window.once('ready-to-show', () => {
      show();
   });

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

   if (process.platform === 'darwin') {
      app.setActivationPolicy('accessory');
   }
};

const createTrackIcon = () => {
   const tray = new Tray(icon.resize({ height: 20, width: 20 }));

   const contextMenu = Menu.buildFromTemplate([
      {
         label: 'Open',
         click: () => {
            show();
         },
      },
      {
         label: 'Quit',
         click: () => {
            app.quit();
         },
      },
   ]);

   tray.setToolTip('Sticky Clip');
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
            marked: false,
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
            marked: false,
         });

         store.set('clipboardHistory', uniqBy(CLIPBOARD, 'value'));
      }
   }, 1000);
};

const registerShortcut = () => {
   const SETTING = store.get('setting', DEFAULT_SETTING);

   if (SETTING.shortcut) {
      globalShortcut.unregisterAll();

      globalShortcut.register(SETTING.shortcut, () => {
         if (window.isVisible()) {
            hide();

            return;
         }

         show();
      });
   }
};

const initEvent = () => {
   registerShortcut();

   ipcMain.handle(appEvent.hide, hide);

   ipcMain.handle(appEvent.show, show);

   ipcMain.handle(appEvent.updateSetting, (_e, arg: Setting) => {
      const CLIPBOARD = store.get('clipboardHistory');
      const SETTING = store.get('setting');

      store.set('setting', {
         ...SETTING,
         ...arg,
      });

      if (arg.shortcut !== SETTING.shortcut) {
         registerShortcut();
      }

      if (CLIPBOARD.length > arg.maxItem) {
         store.set('clipboardHistory', CLIPBOARD.slice(0, arg.maxItem));
      }
   });
};

app.on('quit', () => {
   globalShortcut.unregisterAll();
});

app.whenReady()
   .then(createWindow)
   .then(createTrackIcon)
   .then(watchClipboard)
   .then(initEvent);
