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
import { Icon } from '@components/ui/icon';
import { useHotkeys } from 'react-hotkeys-hook';

const SWIPE_THRESHOLD = 100;

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
   const [dragStates, setDragStates] = useState<{
      [key: number]: 'left' | 'right' | null;
   }>({});

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
      setDragStates((prev) => ({ ...prev, [index]: null }));
      setIsDragging((prev) => ({ ...prev, [index]: true }));
   };

   const handleDrag = (
      index: number,
      info: { offset: { x: number; y: number } },
   ) => {
      if (Math.abs(info.offset.x) > 30) {
         setDragStates((prev) => ({
            ...prev,
            [index]: info.offset.x > 0 ? 'right' : 'left',
         }));
      } else {
         setDragStates((prev) => ({ ...prev, [index]: null }));
      }
   };

   const handleSwipeEnd = (index: number, offset: { x: number; y: number }) => {
      setDragStates((prev) => ({ ...prev, [index]: null }));

      // Clear dragging state after a small delay to prevent click events
      setTimeout(() => {
         setIsDragging((prev) => ({ ...prev, [index]: false }));
      }, 100);

      if (Math.abs(offset.x) < SWIPE_THRESHOLD) {
         return;
      }

      if (offset.x > SWIPE_THRESHOLD) {
         // Swipe right - mark item
         const item = items[index];

         window.clipboard.updateItem({
            ...item,
            marked: !item.marked,
         });

         fetchHistory();

         toast(
            <Toast message={item.marked ? 'Unmarked item' : 'Marked item'} />,
         );
      } else if (offset.x < -SWIPE_THRESHOLD) {
         // Swipe left - delete item
         window.clipboard.removeItem(index);

         fetchHistory();

         toast(<Toast message='Deleted item' />);
      }
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
         className={clsx(
            'mt-14 flex flex-col px-4 overflow-y-auto overflow-x-hidden relative',
         )}
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
                  drag='x'
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  whileTap={{
                     scale: 0.95,
                  }}
                  onDragStart={() => handleDragStart(index)}
                  onDrag={(_, info) => handleDrag(index, info)}
                  onDragEnd={(_, info) => {
                     handleSwipeEnd(index, {
                        x: info.offset.x,
                        y: info.offset.y,
                     });
                  }}
                  onTap={() => {
                     if (!isDragging[index]) {
                        onItemClick(item);
                     }
                  }}
                  className={clsx('transition-colors duration-150 relative', {
                     'bg-green-500/10': dragStates[index] === 'right',
                     'bg-red-500/10': dragStates[index] === 'left',
                  })}
               >
                  {/* Swipe indicators */}
                  <AnimatePresence>
                     {dragStates[index] === 'right' && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.5 }}
                           className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-green-500 text-white rounded-full p-2'
                        >
                           <Icon name='NotoStar' size={20} />
                        </motion.div>
                     )}
                     {dragStates[index] === 'left' && (
                        <motion.div
                           initial={{ opacity: 0, scale: 0.5 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.5 }}
                           className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-red-500 text-white rounded-full p-2'
                        >
                           <Icon name='MaterialSymbolsDelete' size={20} />
                        </motion.div>
                     )}
                  </AnimatePresence>

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
                     />
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
