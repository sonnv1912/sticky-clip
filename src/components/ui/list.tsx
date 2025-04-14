import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'react-toastify';
import { images } from './image';
import { HEADER_HEIGHT } from '@configs/constants';

type Props = {
   loading: boolean;
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

export const List = ({ loading, items, fetchHistory }: Props) => {
   return (
      <motion.div
         animate={{ scale: 1, opacity: 1 }}
         style={{
            height: `calc(100vh - ${HEADER_HEIGHT})`,
         }}
         className={clsx('mt-14 flex flex-col gap-6 p-4 overflow-auto')}
      >
         <AnimatePresence mode='popLayout' initial={true}>
            {items.length === 0 && !loading && (
               <motion.img
                  alt=''
                  layout={true}
                  src={images.NoDataClipboard}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='mx-auto mt-12'
                  style={{
                     width: 170,
                     height: 200,
                  }}
               />
            )}

            {items.map((item) => (
               <motion.div
                  key={item.id}
                  layout={true}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={clsx(
                     'p-4 bg-card rounded-2xl cursor-pointer break-all select-none text-sm text-paragraph',
                     'hover:shadow-shadow-5 transition-all duration-300 border border-box-border',
                  )}
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

                     toast.success('Copied to clipboard');
                  }}
               >
                  {item.isImage && <img alt='' src={item.value} />}

                  {!item.isImage && <pre>{item.value}</pre>}
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
