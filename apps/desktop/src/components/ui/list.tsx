import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'react-toastify';
import { images } from './image';
import { colors } from 'shared-configs/theme';

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
            height: 'calc(100vh - 58px)',
         }}
         className={clsx('mt-14 flex flex-col gap-6 p-4 overflow-auto')}
      >
         <AnimatePresence mode='popLayout'>
            {items.length === 0 && !loading && (
               <motion.img
                  alt=''
                  layout={true}
                  src={images.NoDataClipboard}
                  animate={{ opacity: 1 }}
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
                  exit={{ opacity: 0 }}
                  className={clsx(
                     'p-4 bg-gray-700 rounded-2xl cursor-pointer break-all select-none',
                  )}
                  // drag='x'
                  // dragConstraints={{ left: 0, right: 0 }}
                  // dragElastic={0.6}
                  // style={{ transform: `translateX(${x})` }}
                  whileHover={{
                     backgroundColor: colors.slate600,
                     scale: 1.02,
                  }}
                  whileTap={{
                     scale: 1,
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

                  {!item.isImage && <p>{item.value}</p>}
               </motion.div>
            ))}
         </AnimatePresence>
      </motion.div>
   );
};
