import {
   HEADER_HEIGHT,
   emptyClipboardMessages,
   emptyIdleSearchMessages,
   emptySearchMessages,
} from '@configs/constants';
import { useSearchStore } from '@stores/search-store';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { ClipboardItem } from './clipboard-item';
import { Toast } from '@components/ui/toast';

type Props = {
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

export const ListClipboard = ({ items, fetchHistory }: Props) => {
   const { mode, query } = useSearchStore();
   const listRef = useRef<HTMLDivElement>(null);

   const emptyMessage = useCallback(() => {
      const index = Math.floor(Math.random() * emptyClipboardMessages.length);

      return emptyClipboardMessages[index];
   }, []);

   const emptySearchMessage = useCallback(() => {
      if (!query) {
         const index = Math.floor(
            Math.random() * emptyIdleSearchMessages.length,
         );
         return emptyIdleSearchMessages[index];
      }

      const index = Math.floor(Math.random() * emptySearchMessages.length);

      return emptySearchMessages[index];
   }, [query]);

   useEffect(() => {
      const scrollToTop = () => {
         listRef.current.scrollTo({
            top: 0,
         });
      };

      window.addEventListener('focus', scrollToTop);

      return () => {
         window.removeEventListener('focus', scrollToTop);
      };
   }, []);

   return (
      <motion.div
         ref={listRef}
         animate={{ scale: 1, opacity: 1 }}
         style={{
            height: `calc(100vh - ${HEADER_HEIGHT})`,
            scrollbarGutter: 'stable',
         }}
         className={clsx(
            'mt-14 flex flex-col gap-6 p-4 overflow-auto relative',
         )}
      >
         <AnimatePresence mode='popLayout' initial={true}>
            {items.length === 0 && (
               <code className='text-center text-[var(--paragraph)] absolute top-14 left-10 right-10'>
                  {mode === 'header' ? emptyMessage() : emptySearchMessage()}
               </code>
            )}

            {items.map((item) => (
               <motion.div
                  key={item.id}
                  layout={true}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  // drag='x'
                  // dragConstraints={{ left: 0, right: 0 }}
                  // dragElastic={0.6}
                  // style={{ transform: `translateX(${x})` }}
                  whileTap={{
                     scale: 0.95,
                  }}
                  // onPanEnd={() => {
                  //    window.clipboard.removeItem(index);
                  //    fetchHistory();
                  // }}
                  onClick={() => {
                     window.clipboard.copyItem(item);

                     fetchHistory();

                     toast(
                        <Toast message='Copied to clipboard' type='success' />,
                     );
                  }}
               >
                  <ClipboardItem
                     key={item.id}
                     data={item}
                     onMarked={() => {
                        window.clipboard.updateItem({
                           ...item,
                           marked: !item.marked,
                        });

                        fetchHistory();
                     }}
                  />
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
