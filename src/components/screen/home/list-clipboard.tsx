import {
   HEADER_HEIGHT,
   emptyClipboardMessages,
   emptyIdleSearchMessages,
   emptySearchMessages,
} from '@configs/constants';
import { useSearchStore } from '@stores/search-store';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { ClipboardItem } from './clipboard-item';

type Props = {
   loading: boolean;
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

export const ListClipboard = ({ loading, items, fetchHistory }: Props) => {
   const { mode, query } = useSearchStore();

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

   return (
      <motion.div
         animate={{ scale: 1, opacity: 1 }}
         style={{
            height: `calc(100vh - ${HEADER_HEIGHT})`,
         }}
         className={clsx(
            'mt-14 flex flex-col gap-6 p-4 overflow-auto relative',
         )}
      >
         <AnimatePresence mode='popLayout' initial={true}>
            {items.length === 0 && !loading && (
               <code className='text-center text-paragraph absolute top-14 left-10 right-10'>
                  {mode === 'header' ? emptyMessage() : emptySearchMessage()}
               </code>
            )}

            {items.map((item) => (
               <ClipboardItem
                  key={item.id}
                  data={item}
                  onClick={() => {
                     window.clipboard.copyItem(item);

                     fetchHistory();

                     toast.success('Copied to clipboard');
                  }}
                  onMarked={() => {
                     window.clipboard.updateItem({
                        ...item,
                        marked: !item.marked,
                     });

                     fetchHistory();
                  }}
               />
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
