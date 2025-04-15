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
   const [loading, setLoading] = useState(false);
   const [openSetting, setOpenSetting] = useState(false);
   const { query } = useSearchStore();
   const { theme } = useAppStore();

   const fetchHistory = useCallback(async () => {
      setLoading(true);

      const data = await window.clipboard.get();

      setLoading(false);

      const filtered = data.filter((t) =>
         t.value.toLowerCase().includes(query),
      );

      const sorted = filtered.sort((a, b) => {
         if (a.marked === b.marked) {
            return 0;
         }

         return a.marked ? -1 : 1;
      });

      setHistory(sorted);
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

            <ListClipboard
               fetchHistory={fetchHistory}
               items={history}
               loading={loading}
            />

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
               autoClose={1000}
               newestOnTop={true}
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
