import { Button } from '@components/ui/button';
import { Icon } from '../../ui/icon';
import type { HeaderProps } from '.';
import { useAppStore } from '@stores/app-store';

type Props = HeaderProps & {
   onClickSearch: () => void;
};

export const HeaderBody = ({
   fetchHistory,
   onClickSetting,
   onClickSearch,
}: Props) => {
   const { setAppState, theme } = useAppStore();

   // Fast, Friendly, Easy to use
   // Your clipboard manager
   // Sticky Clip
   return (
      <div className='flex items-center justify-between'>
         <div className='flex items-center gap-1'>
            <Icon
               name={
                  window.app.isDev
                     ? 'FluentColorClipboardTextEdit20'
                     : 'FluentColorClipboard16'
               }
            />

            <p className='select-none font-bold text-sky-500'>Sticky Clip</p>
         </div>

         <div className='flex items-center gap-4'>
            <Button
               size='md'
               leftIcon='IconParkOutlineSearch'
               variant='transparent'
               schema='text'
               onClick={onClickSearch}
            />

            <Button
               size='md'
               leftIcon='MaterialSymbolsSettingsRounded'
               variant='transparent'
               schema='text'
               onClick={onClickSetting}
            />

            <Button
               size='md'
               leftIcon='MaterialSymbolsDelete'
               variant='transparent'
               schema='text'
               onClick={() => {
                  window.clipboard.clear();

                  fetchHistory();
               }}
            />

            <Button
               size='md'
               leftIcon={
                  theme === 'dark'
                     ? 'MaterialSymbolsSunnyRounded'
                     : 'MaterialSymbolsMoonStarsRounded'
               }
               variant='transparent'
               schema='text'
               onClick={() => {
                  setAppState({
                     theme: theme === 'dark' ? 'light' : 'dark',
                  });
               }}
            />
         </div>
      </div>
   );
};
