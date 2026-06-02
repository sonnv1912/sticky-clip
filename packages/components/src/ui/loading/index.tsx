import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import styles from './loading.module.css';

type Props = {
   loading?: boolean;
   size?: number;
};

export const Loading = ({ loading, size = 60 }: PropsWithChildren<Props>) => {
   const lineSize = size / 12;

   return (
      loading && (
         <div className='absolute bottom-0 left-0 right-0 top-0 z-50 bg-black/40'>
            <div
               className={clsx(styles.loader)}
               style={{ width: size, height: size }}
            >
               <div
                  className={clsx(styles.inner, styles.one)}
                  style={{ borderBottom: `${lineSize}px solid #efeffa` }}
               />
               <div
                  className={clsx(styles.inner, styles.two)}
                  style={{ borderRight: `${lineSize}px solid #efeffa` }}
               />
               <div
                  className={clsx(styles.inner, styles.three)}
                  style={{ borderTop: `${lineSize}px solid #efeffa` }}
               />
            </div>
         </div>
      )
   );
};
