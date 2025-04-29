import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type Props = {
   name?: string;
   open?: boolean;
   className?: string;
   onHide?: () => void;
};

export const Modal = ({
   name,
   children,
   open,
   className,
   onHide,
}: PropsWithChildren<Props>) => {
   return (
      open &&
      createPortal(
         <>
            <div
               key={name}
               className={clsx(
                  'fixed left-0 right-0 top-0 bottom-0 z-50 bg-fade',
               )}
               onClick={onHide}
            />

            <div
               className={clsx(
                  'bg-background border border-box-border rounded-xl p-4 flex-1 z-[60] text-paragraph',
                  'overflow-auto fixed -translate-y-2/4 -translate-x-2/4 w-[90vw] max-h-[90vh]',
                  'top-2/4 left-2/4',
                  className,
               )}
            >
               {children}
            </div>
         </>,
         document.body,
      )
   );
};
