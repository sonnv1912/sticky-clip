import './assets/styles/main.css';

import { Toast } from '@components/ui/toast';
import { useAppStore } from '@stores/app-store';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { useHotkeys } from 'react-hotkeys-hook';
import { Header } from './components/layout/header';
import { ListClipboard } from './components/screen/home/list-clipboard';
import { SettingModal } from './modals/setting-modal';
import { ViewModal } from './modals/view-modal';
import { useSearchStore } from './stores/search-store';

const App = () => {
   const [history, setHistory] = useState<ClipboardHistory[]>([]);
   const [openSetting, setOpenSetting] = useState(false);
   const [viewItem, setViewItem] = useState<ClipboardHistory>();
   const { query } = useSearchStore();
   const { theme, themeCollection } = useAppStore();
   const setSearchState = useSearchStore((state) => state.setSearchState);

   const fetchHistory = useCallback(async () => {
      let result = await window.clipboard.get();

      if (query) {
         result = result.filter((t) => t.value.toLowerCase().includes(query));
      }

      setHistory(result);
   }, [query]);

   useEffect(() => {
      fetchHistory();

      window.addEventListener('focus', fetchHistory);

      return () => {
         window.removeEventListener('focus', fetchHistory);
      };
   }, [fetchHistory]);

   useEffect(() => {
      const event = toast.onChange((item) => {
         if (item.status === 'added') {
            window.app.onHide(() => {
               toast.dismiss(item.id);
            });
         }
      });

      return () => event();
   }, []);

   useEffect(() => {
      const themeValue = themeCollection[theme];

      for (const key of Object.keys(themeValue)) {
         document.documentElement.style.setProperty(
            `--${key}`,
            themeValue[key as keyof ThemeValue],
         );
      }
   }, [theme, themeCollection]);

   useHotkeys('esc', () => {
      window.app.hide();
   });

   useHotkeys('*', (e) => {
      if (e.key === '/') {
         setSearchState({
            mode: 'search',
         });
      }
   });

   const handleContextMenu = (item: ClipboardHistory) => {
      setViewItem(item);
   };

   if (!document.documentElement.style[0]) {
      return null;
   }

   return (
      <div className={clsx('bg-background h-screen overflow-hidden')}>
         <Header
            fetchHistory={fetchHistory}
            onClickSetting={() => setOpenSetting(true)}
         />

         <ListClipboard
            fetchHistory={fetchHistory}
            items={history}
            onContextMenu={handleContextMenu}
         />

         <SettingModal
            open={openSetting}
            onHide={() => setOpenSetting(false)}
            onSuccess={() => {
               fetchHistory();

               setOpenSetting(false);

               toast(<Toast message='Your settings have worked' />);
            }}
         />

         <ViewModal
            open={!!viewItem}
            item={viewItem}
            onHide={() => setViewItem(undefined)}
         />

         <ToastContainer
            position='bottom-center'
            autoClose={1500}
            newestOnTop={true}
            closeButton={false}
            pauseOnFocusLoss={false}
            hideProgressBar={true}
            pauseOnHover={false}
            draggable={false}
            closeOnClick={true}
            toastStyle={{
               width: 'fit-content',
               padding: 0,
               height: 'fit-content',
               minHeight: 'fit-content',
               backgroundColor: 'transparent',
               bottom: 24,
            }}
         />

         <Tooltip
            id='tooltip'
            style={{
               zIndex: 90,
            }}
         />
      </div>
   );
};

const root = createRoot(document.body);

root.render(<App />);
