import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'react-toastify';
import { images } from '../../ui/image';
import { HEADER_HEIGHT } from '@configs/constants';
import { ClipboardItem } from './clipboard-item';

type Props = {
   loading: boolean;
   items: ClipboardHistory[];
   fetchHistory: () => void;
};

export const ListClipboard = ({ loading, items, fetchHistory }: Props) => {
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
