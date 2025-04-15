import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

type Props = {
   open?: boolean;
   className?: string;
   onHide?: () => void;
};

export const Modal = ({
   children,
   open,
   className,
   onHide,
}: PropsWithChildren<Props>) => {
   return (
      <AnimatePresence initial={true} mode='popLayout'>
         {open && (
            <motion.div
               key='modal-background'
               className={clsx(
                  'fixed top-0 left-0 right-0 bottom-0 z-50 p-8 bg-fade',
                  'flex items-center justify-center',
               )}
               initial={{ opacity: 0, scale: 1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1 }}
               onClick={() => {
                  onHide?.();
               }}
            >
               <motion.div
                  key='modal'
                  initial={{ opacity: 0, translateY: '100%' }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: '100%' }}
                  className={clsx(
                     'bg-box border border-box-border rounded-xl p-4 flex-1 z-[60] text-paragraph',
                     className,
                  )}
                  onClick={(e) => e.stopPropagation()}
               >
                  {children}
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};
