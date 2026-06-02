import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type Props = {
   label: string;
   labelClassName?: string;
   className?: string;
};

export const TextPair = ({
   label,
   children,
   labelClassName,
   className,
}: PropsWithChildren<Props>) => {
   return (
      <div className={clsx('flex items-center', className)}>
         <p className={clsx('min-w-40 text-sm', labelClassName)}>{label}</p>

         {children}
      </div>
   );
};
