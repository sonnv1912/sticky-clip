import { useSearchStore } from '@stores/search-store';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactElement, useMemo } from 'react';
import { HeaderBody } from './header-body';
import { HeaderSearch } from './header-search';
import { HEADER_HEIGHT } from '@configs/constants';

export type HeaderProps = {
   fetchHistory: () => void;
   onClickSetting: () => void;
};

export const Header = ({ fetchHistory, onClickSetting }: HeaderProps) => {
   const { mode, setSearchState } = useSearchStore();

   const tabs = useMemo<Record<string, ReactElement>>(
      () => ({
         search: <HeaderSearch />,
         header: (
            <HeaderBody
               fetchHistory={fetchHistory}
               onClickSetting={onClickSetting}
               onClickSearch={() =>
                  setSearchState({
                     mode: 'search',
                  })
               }
            />
         ),
      }),
      [fetchHistory, onClickSetting, setSearchState],
   );

   return (
      <div
         className={clsx(
            'fixed top-0 left-0 right-0 z-10 bg-card backdrop-blur-sm px-4',
            'flex items-center w-full border-b-2 border-box-border',
         )}
         style={{
            height: HEADER_HEIGHT,
         }}
      >
         <AnimatePresence initial={false} mode='wait'>
            <motion.div
               key={mode}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className='w-full'
            >
               {tabs[mode]}
            </motion.div>
         </AnimatePresence>
      </div>
   );
};
