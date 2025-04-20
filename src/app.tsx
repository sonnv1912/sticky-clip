import './assets/styles/main.css';

import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/layout/header';
import { ListClipboard } from './components/screen/home/list-clipboard';
import { SettingModal } from './modals/setting-modal';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { useSearchStore } from './stores/search-store';
import { useAppStore } from '@stores/app-store';

const App = () => {
   const [history, setHistory] = useState<ClipboardHistory[]>([]);
   const [openSetting, setOpenSetting] = useState(false);
   const { query } = useSearchStore();
   const { theme } = useAppStore();

   const fetchHistory = useCallback(async () => {
      let result = await window.clipboard.get();

      if (query) {
         result = result.filter((t) => t.value.toLowerCase().includes(query));
      }

      if (result.some((t) => t.marked)) {
         result = result.sort((a, b) => {
            if (a.marked === b.marked) {
               return 0;
            }

            return a.marked ? -1 : 1;
         });
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

   return (
      <div className={theme}>
         <div className={clsx('bg-box h-screen overflow-hidden')}>
            <Header
               fetchHistory={fetchHistory}
               onClickSetting={() => setOpenSetting(true)}
            />

            <ListClipboard fetchHistory={fetchHistory} items={history} />

            <SettingModal
               open={openSetting}
               onHide={() => setOpenSetting(false)}
               onSuccess={() => {
                  fetchHistory();

                  setOpenSetting(false);
               }}
            />

            <ToastContainer
               position='bottom-center'
               autoClose={500}
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
               }}
            />

            <Tooltip
               id='tooltip'
               style={{
                  zIndex: 90,
               }}
            />
         </div>
      </div>
   );
};

const root = createRoot(document.body);

root.render(<App />);
