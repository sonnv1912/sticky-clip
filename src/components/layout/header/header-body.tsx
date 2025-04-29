import { Button } from '@components/ui/button';
import { SelectTheme } from '@components/ui/select-theme';
import { ThemeModal } from '@modals/theme-modal';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import type { HeaderProps } from '.';
import { Icon } from '../../ui/icon';

type Props = HeaderProps & {
   onClickSearch: () => void;
};

export const HeaderBody = ({
   fetchHistory,
   onClickSetting,
   onClickSearch,
}: Props) => {
   const [showModal, setShowModal] = useState(false);

   return (
      <>
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
                  leftIcon='IcSharpColorLens'
                  variant='transparent'
                  schema='text'
                  dataTooltipIid='select-theme'
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

               <Tooltip
                  id='select-theme'
                  place='bottom-end'
                  // isOpen={true}
                  clickable={true}
               >
                  <SelectTheme
                     onAdd={() => {
                        setShowModal(true);
                     }}
                  />
               </Tooltip>
            </div>
         </div>

         <ThemeModal open={showModal} onHide={() => setShowModal(false)} />
      </>
   );
};
