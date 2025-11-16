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
import { sortByMarked } from './utils/common';

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

const createWindow = () => {
   const { width, height } = screen.getPrimaryDisplay().workAreaSize;
   const windowWidth = app.isPackaged ? 550 : 550;
   const windowHeight = app.isPackaged ? 700 : height;
   const x = Math.round((width - windowWidth) / 2);
   const y = height - windowHeight;

   window = new BrowserWindow({
      x,
      y,
      icon,
      width: windowWidth,
      title: app.isPackaged ? 'Sticky Clip' : 'Sticky Clip Develop',
      height: windowHeight,
      resizable: !app.isPackaged,
      roundedCorners: true,
      frame: !app.isPackaged,
      show: false,
      backgroundColor: '#232323',
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
      },
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

   if (process.platform === 'darwin' && app.isPackaged) {
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
      const setting = store.get('setting', DEFAULT_SETTING);
      const clipboardHistory = store.get('clipboardHistory', []);
      const text = clipboard.readText();
      const image = clipboard.readImage();

      if (text && text !== lastClipboardText) {
         lastClipboardText = text;

         if (clipboardHistory.length === setting.maxItem) {
            clipboardHistory.pop();
         }

         clipboardHistory.unshift({
            id: randomUUID(),
            value: text,
            isImage: false,
            marked: false,
         });

         store.set(
            'clipboardHistory',
            uniqBy(sortByMarked(clipboardHistory), 'value'),
         );
      }

      if (!image.isEmpty() && image.toDataURL() !== lastClipboardImage) {
         lastClipboardImage = image.toDataURL();

         if (clipboardHistory.length === setting.maxItem) {
            clipboardHistory.pop();
         }

         clipboardHistory.unshift({
            id: randomUUID(),
            value: image.toDataURL(),
            isImage: true,
            marked: false,
         });

         store.set(
            'clipboardHistory',
            uniqBy(sortByMarked(clipboardHistory), 'value'),
         );
      }
   }, 1000);
};

const registerShortcut = () => {
   const setting = store.get('setting', DEFAULT_SETTING);

   if (setting.shortcut) {
      globalShortcut.unregisterAll();

      globalShortcut.register(setting.shortcut.replaceAll(' ', ''), () => {
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
      const clipboardHistory = store.get('clipboardHistory');
      const setting = store.get('setting');

      store.set('setting', {
         ...setting,
         ...arg,
      });

      if (arg.shortcut !== setting.shortcut) {
         registerShortcut();
      }

      if (clipboardHistory.length > arg.maxItem) {
         store.set('clipboardHistory', clipboardHistory.slice(0, arg.maxItem));
      }
   });

   window.on('ready-to-show', () => {
      show();
   });

   window.on('blur', () => {
      window.webContents.send('on-hide');

      if (app.isPackaged) {
         hide();
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
