import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
   tab?: string;
   className?: string;
}>;

export const AnimatedPage = ({ children, tab, className }: Props) => {
   return (
      <motion.div
         key={tab}
         transition={{
            duration: 2,
         }}
         exit={{ opacity: 0 }}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className={className}
      >
         {children}
      </motion.div>
   );
};
