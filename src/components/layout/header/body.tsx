import { Button } from '@components/ui/button';
import { Icon } from '../../ui/icon';
import type { HeaderProps } from '../header';

type Props = HeaderProps & {
   onClickSearch: () => void;
};

export const HeaderBody = ({
   fetchHistory,
   onClickSetting,
   onClickSearch,
}: Props) => {
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

            <p className='select-none font-bold text-sky-500'>StickyClip</p>
         </div>

         <div className='flex items-center gap-4'>
            <Button
               leftIcon='IconParkOutlineSearch'
               variant='transparent'
               schema='white'
               onClick={onClickSearch}
            />

            <Button
               leftIcon='MaterialSymbolsSettingsRounded'
               variant='transparent'
               schema='white'
               onClick={onClickSetting}
            />

            <Button
               leftIcon='MaterialSymbolsDelete'
               variant='transparent'
               schema='white'
               onClick={() => {
                  window.clipboard.clear();

                  fetchHistory();
               }}
            />
         </div>
      </div>
   );
};
