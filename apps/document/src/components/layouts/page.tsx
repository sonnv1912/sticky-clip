import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export const Page = ({
   children,
   className,
}: PropsWithChildren<{ className?: string }>) => {
   return (
      <div
         className={clsx(
            'flex min-h-screen flex-col gap-16 p-8',
            'md:p-12',
            'lg:p-20',
            className,
         )}
      >
         {children}
      </div>
   );
};
