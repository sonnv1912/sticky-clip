import {
   HEADER_HEIGHT,
   emptyClipboardMessages,
   emptyIdleSearchMessages,
   emptySearchMessages,
} from '@configs/constants';
import { useSearchStore } from '@stores/search-store';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ClipboardItem } from './clipboard-item';
import { Toast } from '@components/ui/toast';
import { useHotkeys } from 'react-hotkeys-hook';

type Props = {
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

export const ListClipboard = ({ items, fetchHistory }: Props) => {
   const { mode, query } = useSearchStore();
   const listRef = useRef<HTMLDivElement>(null);
   const itemRefs = useRef<HTMLDivElement[]>([]);
   const [selected, setSelected] = useState<number>(-1);

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

   const onItemClick = (item: ClipboardHistory) => {
      window.clipboard.copyItem(item);

      fetchHistory();

      toast(<Toast message='Copied to clipboard' />);

      setSelected(0);

      listRef.current.scroll({
         top: 0,
      });
   };

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

   useHotkeys('ArrowDown', (e) => {
      e.preventDefault();

      let index = 0;

      if (selected === -1) {
         setSelected(index);

         return;
      }

      index = selected + 1;

      if (index < items.length) {
         setSelected(index);

         itemRefs.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }

      if (index === items.length) {
         setSelected(0);

         itemRefs.current[0].scrollIntoView();
      }
   });

   useHotkeys('ArrowUp', (e) => {
      e.preventDefault();

      let index = 0;

      if (selected === -1) {
         setSelected(items.length - 1);

         itemRefs.current[items.length - 1].scrollIntoView({
            block: 'end',
         });

         return;
      }

      index = selected - 1;

      if (index > -1) {
         setSelected(index);

         itemRefs.current[index].scrollIntoView({
            behavior: 'smooth',
         });

         return;
      }

      if (index === -1) {
         setSelected(items.length - 1);

         itemRefs.current[items.length - 1].scrollIntoView({
            block: 'end',
         });
      }
   });

   useHotkeys('Enter', () => {
      if (selected) {
         onItemClick(items[selected]);
      }
   });

   return (
      <motion.div
         ref={listRef}
         animate={{ scale: 1, opacity: 1 }}
         style={{
            height: `calc(100vh - ${HEADER_HEIGHT})`,
            scrollbarGutter: 'stable',
         }}
         className={clsx('mt-14 flex flex-col px-4 overflow-auto relative')}
      >
         <AnimatePresence mode='popLayout' initial={true}>
            {items.length === 0 && (
               <code className='text-center text-paragraph absolute top-14 left-10 right-10'>
                  {mode === 'header' ? emptyMessage() : emptySearchMessage()}
               </code>
            )}

            {items.map((item, index) => (
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
                     onItemClick(item);
                  }}
               >
                  <div
                     ref={(ref) => {
                        itemRefs.current[index] = ref;
                     }}
                     className={clsx('pt-4', {
                        'pb-4': index === items.length - 1,
                     })}
                  >
                     <ClipboardItem
                        key={item.id}
                        data={item}
                        active={index === selected}
                        onMarked={() => {
                           window.clipboard.updateItem({
                              ...item,
                              marked: !item.marked,
                           });

                           fetchHistory();
                        }}
                     />
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
