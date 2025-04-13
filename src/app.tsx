import './assets/styles/tailwind.css';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/layout/header';
import { List } from './components/ui/list';
import { SettingModal } from './modals/setting-modal';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const App = () => {
   const [history, setHistory] = useState<ClipboardHistory[]>([]);
   const [loading, setLoading] = useState(false);
   const [openSetting, setOpenSetting] = useState(false);

   const fetchHistory = async () => {
      setLoading(true);

      const data = await window.clipboard.get();

      setLoading(false);

      setHistory(data);
   };

   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
      fetchHistory();

      window.addEventListener('focus', fetchHistory);

      return () => {
         window.removeEventListener('focus', fetchHistory);
      };
   }, []);

   return (
      <div className={clsx('bg-gray-800 text-white h-screen overflow-hidden')}>
         <Header
            fetchHistory={fetchHistory}
            onClickSetting={() => setOpenSetting(true)}
         />

         <List fetchHistory={fetchHistory} items={history} loading={loading} />

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
   );
};

const root = createRoot(document.body);
root.render(<App />);
