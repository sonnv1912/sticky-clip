import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Icon } from './components/icon';
import { AnimatePresence, motion, useMotionValue } from 'motion/react';
import NoDataClipboard from '../src/assets/images/no-data-clipboard.png';

const root = createRoot(document.body);

const App = () => {
   const [history, setHistory] = useState<{ id: string; value: string }[]>([]);
   const x = useMotionValue(0);

   const fetchHistory = async () => {
      const data = await window.clipboard.get();

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
         <div className='flex items-center justify-between fixed top-0 left-0 right-0 z-10 bg-gray-800 p-4'>
            <div
               className='cursor-pointer'
               onClick={() => {
                  window.app.hide();
               }}
            >
               <Icon name='MaterialSymbolsCloseRounded' />
            </div>

            <p>My Clipboard</p>

            <div
               className='cursor-pointer'
               onClick={() => {
                  window.clipboard.clear();

                  fetchHistory();
               }}
            >
               <Icon name='MaterialSymbolsDelete' />
            </div>
         </div>

         <motion.div
            animate={{ scale: 1, opacity: 1 }}
            style={{
               height: 'calc(100vh - 56px)',
            }}
            className={clsx(
               'mt-14 flex flex-col gap-6 p-4 overflow-auto',
               '[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-gray-800',
               '[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-md',
            )}
         >
            <AnimatePresence mode='popLayout'>
               {history.length === 0 && (
                  <motion.img
                     alt=''
                     layout={true}
                     src={NoDataClipboard}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className='mx-auto mt-12'
                     style={{
                        width: 170,
                        height: 200,
                     }}
                  />
               )}

               {history.map((item, index) => (
                  <motion.div
                     key={item.id}
                     layout={true}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0, transform: `translateX(-${x}px)` }}
                     transition={{ type: 'tween' }}
                     drag='x'
                     dragConstraints={{ left: 0, right: 0 }}
                     dragElastic={0.6}
                     style={{ transform: `translateX(${x})` }}
                     className={clsx(
                        'p-4 bg-gray-700 rounded-2xl cursor-pointer break-all ab',
                        'select-none',
                        'hover:bg-slate-600 hover:scale-[1.02]',
                        'active:scale-100',
                     )}
                     onPanEnd={() => {
                        window.clipboard.removeItem(index);
                        fetchHistory();
                     }}
                     onClick={() => {
                        navigator.clipboard.writeText(item.value);
                     }}
                  >
                     {item.value}
                  </motion.div>
               ))}
            </AnimatePresence>
         </motion.div>
      </div>
   );
};

root.render(<App />);
