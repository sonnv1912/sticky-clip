import { Button } from '@components/ui/button';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const SWIPE_THRESHOLD = 150;

type Props = {
   data: ClipboardHistory;
   active?: boolean;
   index: number;
   onItemClick: (item: ClipboardHistory) => void;
   onSwipeLeft: (index: number) => void;
   onSwipeRight: (index: number) => void;
   isDragging: boolean;
   onDragStart: (index: number) => void;
   onDragStateChange: (index: number, state: 'left' | 'right' | null) => void;
   onSwipeEnd: (index: number, offset: { x: number; y: number }) => void;
};

export const ClipboardItem = ({
   data,
   active,
   index,
   onItemClick,
   onSwipeLeft,
   onSwipeRight,
   isDragging,
   onDragStart,
   onDragStateChange,
   onSwipeEnd,
}: Props) => {
   const [dragState, setDragState] = useState<'left' | 'right' | null>(null);

   const handleDragStart = () => {
      setDragState(null);
      onDragStart(index);
   };

   const handleDrag = (
      _: unknown,
      info: { offset: { x: number; y: number } },
   ) => {
      if (Math.abs(info.offset.x) > 30) {
         const newDragState = info.offset.x > 0 ? 'right' : 'left';
         setDragState(newDragState);
         onDragStateChange(index, newDragState);
      } else {
         setDragState(null);
         onDragStateChange(index, null);
      }
   };

   const handleDragEnd = (
      _: unknown,
      info: { offset: { x: number; y: number } },
   ) => {
      setDragState(null);
      onDragStateChange(index, null);
      onSwipeEnd(index, { x: info.offset.x, y: info.offset.y });

      if (Math.abs(info.offset.x) < SWIPE_THRESHOLD) {
         return;
      }

      if (info.offset.x > SWIPE_THRESHOLD) {
         onSwipeRight(index);
      } else if (info.offset.x < -SWIPE_THRESHOLD) {
         onSwipeLeft(index);
      }
   };

   const handleTap = () => {
      if (!isDragging) {
         onItemClick(data);
      }
   };

   return (
      <motion.div
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
         onDragStart={handleDragStart}
         onDrag={handleDrag}
         onDragEnd={handleDragEnd}
         onTap={handleTap}
         className={'relative'}
      >
         <div className={clsx('pt-4')}>
            <div
               className={twMerge(
                  clsx(
                     'p-3 rounded-xl bg-card cursor-pointer break-all select-none text-sm transition-colors  text-paragraph',
                     'hover:shadow-blur-10 max-h-40 overflow-hidden transition-all duration-300 border border-box-border relative z-1',
                     {
                        'shadow-blur-10': active,
                        'bg-gray-500': data.marked && dragState === 'right',
                        'bg-yellow-500': !data.marked && dragState === 'right',
                        'bg-red-500': dragState === 'left',
                     },
                  ),
               )}
            >
               {data.isImage && (
                  <img alt='' src={data.value} className='rounded-xl mx-auto' />
               )}

               {!data.isImage && <pre>{data.value}</pre>}

               <Button
                  variant='transparent'
                  leftIcon='NotoStar'
                  iconSize={16}
                  className={clsx('absolute -top-2 -right-2 z-10', {
                     grayscale: !data.marked,
                     'grayscale-0': data.marked,
                  })}
               />
            </div>
         </div>
      </motion.div>
   );
};
