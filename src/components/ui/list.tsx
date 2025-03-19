import clsx from 'clsx';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import NoDataClipboard from '../../assets/images/no-data-clipboard.png';
import type { History } from '../../types/data/history';
import { colors } from '../../assets/themes/colors';

type Props = {
   loading: boolean;
   items: History[];
   fetchHistory: () => void;
};

export const List = ({ loading, items, fetchHistory }: Props) => {
   const x = useMotionValue(0);

   return (
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
            {history.length === 0 && !loading && (
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

            {items.map((item, index) => (
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
                  whileHover={{
                     backgroundColor: colors.slate600,
                     scale: 1.05,
                  }}
                  whileTap={{
                     scale: 1,
                  }}
                  className={clsx(
                     'p-4 bg-gray-700 rounded-2xl cursor-pointer break-all select-none',
                  )}
                  onPanEnd={() => {
                     window.clipboard.removeItem(index);
                     fetchHistory();
                  }}
                  onClick={() => {
                     navigator.clipboard.writeText(item.value);
                     fetchHistory();
                  }}
               >
                  {index + 1} - {item.value}
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
