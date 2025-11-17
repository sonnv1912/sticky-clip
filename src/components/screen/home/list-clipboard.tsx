import { Toast } from '@components/ui/toast';
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
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'react-toastify';
import { ClipboardItem } from './clipboard-item';

type Props = {
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

export const ListClipboard = ({ items, fetchHistory }: Props) => {
   const { mode, query } = useSearchStore();
   const listRef = useRef<HTMLDivElement>(null);
   const itemRefs = useRef<HTMLDivElement[]>([]);
   const [selected, setSelected] = useState<number>(-1);
   const [isDragging, setIsDragging] = useState<{ [key: number]: boolean }>({});

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

   const handleDragStart = (index: number) => {
      setIsDragging((prev) => ({ ...prev, [index]: true }));
   };

   const handleSwipeEnd = (
      index: number,
      _offset: { x: number; y: number },
   ) => {
      // Clear dragging state after a small delay to prevent click events
      setTimeout(() => {
         setIsDragging((prev) => ({ ...prev, [index]: false }));
      }, 100);
   };

   const handleSwipeRight = (index: number) => {
      // Swipe right - mark item
      const item = items[index];

      window.clipboard.updateItem({
         ...item,
         marked: !item.marked,
      });

      fetchHistory();

      toast(
         <Toast
            message={item.marked ? 'Unmarked item' : 'Marked item'}
            type={item.marked ? 'default' : 'warning'}
         />,
      );
   };

   const handleSwipeLeft = (index: number) => {
      // Swipe left - delete item
      window.clipboard.removeItem(index);

      fetchHistory();

      toast(<Toast message='Deleted item' type='error' />);
   };

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
            block: 'start',
            behavior: 'smooth',
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
         className={clsx(
            'mt-14 flex flex-col px-4 overflow-y-auto overflow-x-hidden relative',
         )}
      >
         <AnimatePresence mode='sync' initial={true}>
            {items.length === 0 && (
               <code className='text-center text-paragraph absolute top-14 left-10 right-10'>
                  {mode === 'header' ? emptyMessage() : emptySearchMessage()}
               </code>
            )}

            {items.map((item, index) => (
               <div
                  key={item.id}
                  ref={(ref) => {
                     itemRefs.current[index] = ref;
                  }}
                  className={clsx({
                     'pb-4': index === items.length - 1,
                  })}
               >
                  <ClipboardItem
                     data={item}
                     active={index === selected}
                     index={index}
                     onItemClick={onItemClick}
                     onSwipeLeft={handleSwipeLeft}
                     onSwipeRight={handleSwipeRight}
                     isDragging={isDragging[index] || false}
                     onDragStart={handleDragStart}
                     onSwipeEnd={handleSwipeEnd}
                  />
               </div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
