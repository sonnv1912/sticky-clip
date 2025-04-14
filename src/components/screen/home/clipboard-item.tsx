import { Button } from '@components/ui/button';
import clsx from 'clsx';
import { motion } from 'motion/react';

type Props = {
   data: ClipboardHistory;
   onClick: () => void;
   onMarked: () => void;
};

export const ClipboardItem = ({ data, onClick, onMarked }: Props) => {
   return (
      <motion.div
         key={data.id}
         layout={true}
         animate={{ opacity: 1 }}
         initial={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className={clsx(
            'p-4 bg-card rounded-2xl cursor-pointer break-all select-none text-sm text-paragraph',
            'hover:shadow-shadow-5 transition-all duration-300 border border-box-border relative',
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
            onClick();
         }}
      >
         {data.isImage && <img alt='' src={data.value} />}

         {!data.isImage && <pre>{data.value}</pre>}

         <Button
            variant='transparent'
            leftIcon='NotoStar'
            iconSize={16}
            onClick={() => {
               onMarked();
            }}
            className={clsx('absolute -top-2 -right-2', {
               grayscale: !data.marked,
               'grayscale-0': data.marked,
            })}
         />
      </motion.div>
   );
};
