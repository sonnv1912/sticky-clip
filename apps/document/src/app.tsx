import { MainNavigator } from '@components/layouts/navigator/main-navigator';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';

export const App = () => {
   return (
      <>
         <MainNavigator />

         <Tooltip
            id='tooltip'
            opacity={1}
            className={clsx('hidden', 'lg:block')}
            style={{
               backgroundColor: '#454545',
               color: 'white',
               zIndex: 9999,
               maxWidth: 500,
               wordBreak: 'break-all',
               boxShadow: '1px 1px 10px rgba(255,255,255,0.2)',
            }}
         />
      </>
   );
};
