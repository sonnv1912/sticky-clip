import clsx from 'clsx';
import type { ToastContentProps } from 'react-toastify';

type Props = Omit<
   ToastContentProps,
   'closeToast' | 'toastProps' | 'isPaused' | 'isPaused' | 'data'
> & {
   message: string;
   type?: 'info' | 'success' | 'error' | 'warning' | 'default';
};

export const Toast = ({ message, type = 'default' }: Props) => {
   const color = {
      info: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      default: 'bg-card text-paragraph',
   };

   return (
      <div
         className={clsx(
            'p-2 rounded-lg select-none text-sm shadow-blur-10',
            color[type],
         )}
      >
         {message}
      </div>
   );
};
