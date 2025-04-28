import clsx from 'clsx';
import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

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
      open &&
      createPortal(
         <motion.div
            key='modal-background'
            className={clsx(
               'fixed left-0 right-0 top-0 bottom-0 z-50  bg-fade',
               'flex items-center justify-center px-8',
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
                  'overflow-auto',
                  className,
               )}
               style={{
                  maxHeight: '90vh',
               }}
               onClick={(e) => e.stopPropagation()}
            >
               {children}
            </motion.div>
         </motion.div>,
         document.getElementById('root'),
      )
   );
};
